'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Zap, Wallet, Star, Bell, TrendingUp, Eye, Copy, ExternalLink, ArrowRight } from 'lucide-react';
import { CONFIG } from '@/lib/config';
import { useTheme } from '@/lib/useTheme';
import PushToggle from '@/components/PushToggle';

interface UserPrefs {
  watchlist: string[];
  alertsEnabled: boolean;
  minGrade: 'A' | 'B' | 'C';
}

const DEFAULT_PREFS: UserPrefs = {
  watchlist: ['SOL', 'BONK', 'JUP', 'WIF'],
  alertsEnabled: true,
  minGrade: 'B',
};

const HOT_TOKENS = [
  { symbol: 'SOL', name: 'Solana', change: '+5.2%', up: true },
  { symbol: 'BONK', name: 'Bonk', change: '+12.4%', up: true },
  { symbol: 'JUP', name: 'Jupiter', change: '+8.7%', up: true },
  { symbol: 'WIF', name: 'dogwifhat', change: '-3.1%', up: false },
  { symbol: 'RENDER', name: 'Render', change: '+4.3%', up: true },
  { symbol: 'PYTH', name: 'Pyth Network', change: '+6.9%', up: true },
  { symbol: 'RAY', name: 'Raydium', change: '+9.1%', up: true },
  { symbol: 'ONDO', name: 'Ondo', change: '+3.5%', up: true },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [prefs, setPrefs] = useState<UserPrefs>(DEFAULT_PREFS);

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/login';
    }
    const saved = localStorage.getItem('apexflash-prefs');
    if (saved) setPrefs(JSON.parse(saved));
  }, [status]);

  function savePrefs(updated: UserPrefs) {
    setPrefs(updated);
    localStorage.setItem('apexflash-prefs', JSON.stringify(updated));
  }

  function toggleWatchlist(symbol: string) {
    const updated = prefs.watchlist.includes(symbol)
      ? { ...prefs, watchlist: prefs.watchlist.filter((s) => s !== symbol) }
      : { ...prefs, watchlist: [...prefs.watchlist, symbol] };
    savePrefs(updated);
  }

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-apex-400 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!session?.user) return null;

  return (
    <main className="min-h-screen bg-dark-950 pt-6 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 via-apex-500 to-cyan-400 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-hero">ApexFlash</span>
          </a>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-dark-800 border border-dark-700 hover:border-dark-600 text-dark-300 hover:text-white transition-colors">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <a href="/" className="text-sm text-dark-400 hover:text-white transition-colors">Back to Site</a>
          </div>
        </div>

        {/* Welcome */}
        <div className="glass-card p-5 mb-6">
          <div className="flex items-center gap-4">
            {session.user.image ? (
              <img src={session.user.image} alt="" className="w-14 h-14 rounded-xl" />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-apex-500 to-cyan-500 flex items-center justify-center text-xl font-bold text-white">
                {(session.user.name?.[0] || 'U').toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-white">Welcome back, {session.user.name?.split(' ')[0] || 'Trader'}</h1>
              <p className="text-sm text-dark-400">Your personal ApexFlash dashboard</p>
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="glass-card p-4 mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Whale Alert Notifications</h3>
            <p className="text-xs text-dark-400">Get instant browser push when whales move</p>
          </div>
          <PushToggle />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { icon: Zap, label: 'Open Bot', href: CONFIG.telegram.apexBot, color: 'from-apex-500 to-cyan-500' },
            { icon: Eye, label: 'Whale Feed', href: '/#whale-tracker', color: 'from-blue-500 to-indigo-500' },
            { icon: TrendingUp, label: 'Leaderboard', href: '/leaderboard', color: 'from-green-500 to-emerald-500' },
            { icon: Wallet, label: 'Exchanges', href: '/#exchanges', color: 'from-amber-500 to-orange-500' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              target={action.href.startsWith('http') ? '_blank' : undefined}
              rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="glass-card p-4 flex flex-col items-center gap-2 hover:border-apex-500/30 transition-all hover:scale-[1.02]"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-dark-200">{action.label}</span>
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Watchlist */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" /> Your Watchlist
              </h2>
              <span className="text-xs text-dark-500">{prefs.watchlist.length} tokens</span>
            </div>
            <div className="space-y-2">
              {HOT_TOKENS.map((token) => {
                const inList = prefs.watchlist.includes(token.symbol);
                return (
                  <div
                    key={token.symbol}
                    className={`flex items-center justify-between p-2.5 rounded-lg transition-colors cursor-pointer ${
                      inList ? 'bg-apex-500/10 border border-apex-500/20' : 'bg-dark-800/50 hover:bg-dark-700/50'
                    }`}
                    onClick={() => toggleWatchlist(token.symbol)}
                  >
                    <div className="flex items-center gap-2">
                      <Star className={`w-3.5 h-3.5 ${inList ? 'text-amber-400 fill-amber-400' : 'text-dark-600'}`} />
                      <span className="text-sm font-medium text-white">{token.symbol}</span>
                      <span className="text-xs text-dark-500">{token.name}</span>
                    </div>
                    <span className={`text-xs font-medium ${token.up ? 'text-green-400' : 'text-red-400'}`}>
                      {token.change}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Settings */}
          <div className="glass-card p-5">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-apex-400" /> Alert Preferences
            </h2>

            <div className="space-y-4">
              {/* Min Grade Filter */}
              <div>
                <label className="text-xs text-dark-400 mb-2 block">Minimum Signal Grade</label>
                <div className="flex gap-2">
                  {(['A', 'B', 'C'] as const).map((grade) => {
                    const active = prefs.minGrade === grade;
                    const color = grade === 'A' ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : grade === 'B' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
                    return (
                      <button
                        key={grade}
                        onClick={() => savePrefs({ ...prefs, minGrade: grade })}
                        className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                          active ? color : 'bg-dark-800 text-dark-500 border-dark-700 hover:border-dark-600'
                        }`}
                      >
                        Grade {grade}+
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Alerts toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">Push Notifications</p>
                  <p className="text-xs text-dark-500">Get browser alerts for whale moves</p>
                </div>
                <button
                  onClick={() => savePrefs({ ...prefs, alertsEnabled: !prefs.alertsEnabled })}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    prefs.alertsEnabled ? 'bg-apex-500' : 'bg-dark-700'
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    prefs.alertsEnabled ? 'left-[22px]' : 'left-0.5'
                  }`} />
                </button>
              </div>

              {/* Theme */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">Theme</p>
                  <p className="text-xs text-dark-500">Switch between dark and light mode</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1.5 rounded-lg bg-dark-800 border border-dark-700 text-sm text-dark-300 hover:text-white transition-colors"
                >
                  {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                </button>
              </div>
            </div>

            {/* Connect Bot CTA */}
            <div className="mt-5 pt-4 border-t border-dark-700/50">
              <a
                href={CONFIG.telegram.apexBot}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-apex-500/10 to-cyan-500/10 border border-apex-500/20 hover:border-apex-500/40 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-apex-400" />
                  <span className="text-sm text-white">Connect your Telegram bot</span>
                </div>
                <ArrowRight className="w-4 h-4 text-dark-500 group-hover:text-apex-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
