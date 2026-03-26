'use client';

import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Users, Crown, ArrowUpRight, Zap, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CryptoTicker from '@/components/CryptoTicker';
import { CONFIG } from '@/lib/config';
import Reactions from '@/components/Reactions';

type Category = 'all' | 'smart_money' | 'kol' | 'degen';

interface Trader {
  rank: number;
  wallet: string;
  label: string;
  avatar: string;
  pnl: number;
  pnlPct: number;
  winRate: number;
  trades: number;
  lastActive: string;
  tags: string[];
}

interface RecentTrade {
  token: string;
  pnlPct: number;
  pnlSol: number;
  win: boolean;
  ts: string;
}

interface GlobalStats {
  totalTrades: number;
  wins: number;
  totalPnlSol: number;
  winRatePct: number;
}

// Fallback data when Redis has no trades yet
const FALLBACK_TRADERS: Trader[] = [
  { rank: 1, wallet: '7xKX...mP9q', label: 'SOL Whale Alpha', avatar: '🐋', pnl: 48200, pnlPct: 142, winRate: 78, trades: 12, lastActive: '2m ago', tags: ['smart_money'] },
  { rank: 2, wallet: 'DeFi...4kWz', label: 'Jupiter Maxi', avatar: '🦅', pnl: 31500, pnlPct: 89, winRate: 65, trades: 28, lastActive: '8m ago', tags: ['degen'] },
  { rank: 3, wallet: '9bRt...xN2e', label: 'Meme Lord', avatar: '🐸', pnl: 22800, pnlPct: 67, winRate: 52, trades: 45, lastActive: '15m ago', tags: ['kol', 'degen'] },
  { rank: 4, wallet: 'CqKp...7vYh', label: 'Quiet Giant', avatar: '🏔️', pnl: 18400, pnlPct: 34, winRate: 82, trades: 6, lastActive: '1h ago', tags: ['smart_money'] },
  { rank: 5, wallet: 'FmWx...3dLz', label: 'DCA Machine', avatar: '🤖', pnl: 12100, pnlPct: 23, winRate: 71, trades: 18, lastActive: '25m ago', tags: ['smart_money'] },
  { rank: 6, wallet: 'AjNv...8pQw', label: 'Raydium Sniper', avatar: '🎯', pnl: 9800, pnlPct: 19, winRate: 58, trades: 32, lastActive: '40m ago', tags: ['degen'] },
  { rank: 7, wallet: 'XkLm...2bRf', label: 'NFT Flipper', avatar: '🖼️', pnl: 7500, pnlPct: 15, winRate: 44, trades: 55, lastActive: '3h ago', tags: ['kol'] },
  { rank: 8, wallet: 'BnPq...6wTx', label: 'Yield Hunter', avatar: '🌾', pnl: 5200, pnlPct: 11, winRate: 76, trades: 8, lastActive: '2h ago', tags: ['smart_money'] },
];

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'smart_money', label: 'Smart Money' },
  { id: 'kol', label: 'KOL' },
  { id: 'degen', label: 'Degen' },
];

function formatPnl(n: number): string {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

export default function LeaderboardPage() {
  const [category, setCategory] = useState<Category>('all');
  const [traders, setTraders] = useState<Trader[]>(FALLBACK_TRADERS);
  const [recentTrades, setRecentTrades] = useState<RecentTrade[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalStats>({ totalTrades: 0, wins: 0, totalPnlSol: 0, winRatePct: 0 });
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard');
      if (!res.ok) return;
      const data = await res.json();

      if (data.hasLiveData && data.traders.length > 0) {
        setTraders(data.traders);
        setIsLive(true);
      }
      if (data.recentTrades) setRecentTrades(data.recentTrades);
      if (data.globalStats) setGlobalStats(data.globalStats);
      setLastUpdate(new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }));
    } catch {
      // Keep fallback data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  const filtered = traders.filter(t =>
    category === 'all' || t.tags.includes(category)
  );

  return (
    <main className="min-h-screen bg-dark-950">
      <CryptoTicker />
      <Navbar />

      <section className="pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-4">
              <Trophy className="w-4 h-4" />
              <span>{isLive ? 'Live Rankings' : 'Rankings'}</span>
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-3">
              Smart Money Leaderboard
            </h1>
            <p className="text-dark-300 max-w-2xl mx-auto">
              Track the most profitable Solana wallets in real-time.
              See what smart money buys — before the pump.
            </p>
          </div>

          {/* Global Stats Bar */}
          {globalStats.totalTrades > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="glass-card rounded-xl p-3 text-center border border-dark-700/30">
                <div className="text-xs text-dark-400 mb-1">Total Trades</div>
                <div className="text-lg font-bold text-white">{globalStats.totalTrades.toLocaleString()}</div>
              </div>
              <div className="glass-card rounded-xl p-3 text-center border border-dark-700/30">
                <div className="text-xs text-dark-400 mb-1">Win Rate</div>
                <div className={`text-lg font-bold ${globalStats.winRatePct >= 50 ? 'text-green-400' : 'text-red-400'}`}>
                  {globalStats.winRatePct}%
                </div>
              </div>
              <div className="glass-card rounded-xl p-3 text-center border border-dark-700/30">
                <div className="text-xs text-dark-400 mb-1">Total P/L</div>
                <div className={`text-lg font-bold ${globalStats.totalPnlSol >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {globalStats.totalPnlSol >= 0 ? '+' : ''}{globalStats.totalPnlSol.toFixed(2)} SOL
                </div>
              </div>
              <div className="glass-card rounded-xl p-3 text-center border border-dark-700/30">
                <div className="text-xs text-dark-400 mb-1">Traders</div>
                <div className="text-lg font-bold text-white">{traders.length}</div>
              </div>
            </div>
          )}

          {/* Filters + Refresh */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            {/* Category tabs */}
            <div className="flex gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    category === cat.id
                      ? 'bg-apex-500/20 text-apex-400 border border-apex-500/30'
                      : 'bg-dark-800/50 text-dark-400 border border-dark-700/30 hover:border-dark-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Refresh + status */}
            <div className="flex items-center gap-3">
              {lastUpdate && (
                <span className="text-xs text-dark-500">Updated {lastUpdate}</span>
              )}
              <button
                onClick={fetchLeaderboard}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800/50 text-dark-400 text-xs border border-dark-700/30 hover:border-dark-600 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Top 3 Podium */}
          {filtered.length >= 3 && (
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
              {[filtered[1], filtered[0], filtered[2]].map((trader, i) => {
                const position = i === 1 ? 1 : i === 0 ? 2 : 3;
                const medals = ['🥈', '🥇', '🥉'];
                const heights = ['h-32', 'h-40', 'h-28'];
                const borderColors = [
                  'border-gray-400/30',
                  'border-amber-400/40',
                  'border-amber-700/30',
                ];

                return (
                  <div
                    key={trader.wallet}
                    className={`glass-card rounded-2xl p-3 sm:p-4 border ${borderColors[i]} flex flex-col items-center justify-end ${heights[i]} relative`}
                  >
                    {position === 1 && (
                      <Crown className="absolute -top-3 w-6 h-6 text-amber-400" />
                    )}
                    <span className="text-2xl sm:text-3xl mb-1">{trader.avatar}</span>
                    <span className="text-xs sm:text-sm font-bold text-white truncate max-w-full">{trader.label}</span>
                    <span className="text-[10px] text-dark-500 mb-1">{trader.wallet}</span>
                    <span className="text-xs sm:text-sm font-bold text-green-400">+{formatPnl(trader.pnl)}</span>
                    <span className="text-[10px] text-dark-400">{trader.winRate}% WR</span>
                    <span className="text-lg mt-1">{medals[i]}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Recent Trades Feed */}
          {recentTrades.length > 0 && (
            <div className="mb-6 glass-card rounded-2xl p-4 border border-dark-700/30">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-apex-400" />
                <span className="text-sm font-semibold text-white">Recent Trades</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {recentTrades.map((trade, i) => (
                  <div key={i} className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-800/50 border border-dark-700/20">
                    <span className={`text-xs font-bold ${trade.win ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.win ? '✅' : '❌'}
                    </span>
                    <span className="text-xs text-white font-medium">{trade.token}</span>
                    <span className={`text-xs font-bold ${trade.pnlPct >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.pnlPct >= 0 ? '+' : ''}{trade.pnlPct.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ranking Table */}
          <div className="glass-card rounded-2xl overflow-hidden border border-dark-700/30">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 bg-dark-800/30 text-xs text-dark-400 uppercase tracking-wider font-semibold">
              <div className="col-span-1">Rank</div>
              <div className="col-span-3">Trader</div>
              <div className="col-span-2 text-right">P/L</div>
              <div className="col-span-1 text-right">Win%</div>
              <div className="col-span-1 text-right">Trades</div>
              <div className="col-span-2 text-right">Active</div>
              <div className="col-span-2 text-right">Action</div>
            </div>

            {/* Rows */}
            {filtered.map((trader) => (
              <div
                key={trader.wallet}
                className="grid grid-cols-12 gap-2 px-4 py-3 sm:py-4 border-t border-dark-800/30 hover:bg-dark-800/20 transition-colors items-center"
              >
                {/* Rank */}
                <div className="col-span-2 sm:col-span-1">
                  <span className={`text-sm font-bold ${
                    trader.rank <= 3 ? 'text-amber-400' : 'text-dark-400'
                  }`}>
                    #{trader.rank}
                  </span>
                </div>

                {/* Trader info */}
                <div className="col-span-6 sm:col-span-3 flex items-center gap-2 min-w-0">
                  <span className="text-xl shrink-0">{trader.avatar}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{trader.label}</div>
                    <div className="text-[10px] text-dark-500">{trader.wallet} · {trader.lastActive}</div>
                  </div>
                </div>

                {/* P/L */}
                <div className="col-span-4 sm:col-span-2 text-right">
                  <div className="text-sm font-bold text-green-400">+{formatPnl(trader.pnl)}</div>
                  <div className="text-[10px] text-green-400/70">+{trader.pnlPct}%</div>
                </div>

                {/* Win Rate - desktop */}
                <div className="hidden sm:block sm:col-span-1 text-right">
                  <span className={`text-sm font-medium ${
                    trader.winRate >= 70 ? 'text-green-400' :
                    trader.winRate >= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>{trader.winRate}%</span>
                </div>

                {/* Trades - desktop */}
                <div className="hidden sm:block sm:col-span-1 text-right text-sm text-dark-300">
                  {trader.trades}
                </div>

                {/* Active - desktop */}
                <div className="hidden sm:block sm:col-span-2 text-right text-sm text-dark-300">
                  {trader.lastActive}
                </div>

                {/* Action - desktop */}
                <div className="hidden sm:flex sm:col-span-2 justify-end gap-1.5">
                  <a
                    href={`https://gmgn.ai/sol/address/${trader.wallet}?ref=cBB5zbUF`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-all border border-green-500/20"
                  >
                    Copy <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a
                    href={`${CONFIG.telegram.apexBot}?start=track`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-apex-500/10 text-apex-400 text-xs font-medium hover:bg-apex-500/20 transition-all border border-apex-500/20"
                  >
                    Track <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Reactions - full width row below */}
                <div className="col-span-12 -mt-1">
                  <Reactions traderId={trader.wallet} />
                </div>
              </div>
            ))}

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="px-4 py-8 text-center text-dark-400 text-sm">
                No traders found in this category yet.
              </div>
            )}
          </div>

          {/* Live Data Badge */}
          {!isLive && (
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs">
                Showing demo data — live rankings update as trades come in
              </span>
            </div>
          )}

          {/* CTA Bottom */}
          <div className="mt-8 text-center">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-apex-500/20">
              <h3 className="text-xl font-bold text-white mb-2">Track These Wallets for Free</h3>
              <p className="text-dark-300 text-sm mb-4 max-w-lg mx-auto">
                Get instant alerts when these wallets make a trade.
                AI grades every signal so you only see the best opportunities.
              </p>
              <a
                href={CONFIG.telegram.apexBot}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
              >
                <Zap className="w-4 h-4" />
                Start Tracking — Free on Telegram
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
