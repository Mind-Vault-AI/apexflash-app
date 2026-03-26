'use client';

import { useState } from 'react';
import { Copy, ExternalLink, TrendingUp, Wallet, Twitter, Eye } from 'lucide-react';
import { CONFIG } from '@/lib/config';

interface Whale {
  name: string;
  handle: string;
  avatar: string;
  title: string;
  pnl: string;
  pnlPercent: string;
  winRate: number;
  trades: number;
  followers: string;
  recentTrade: { token: string; action: string; amount: string; time: string };
  wallet: string;
  twitter?: string;
  verified: boolean;
}

const WHALES: Whale[] = [
  {
    name: 'CryptoViper',
    handle: '@cryptoviper_sol',
    avatar: '🐍',
    title: 'Top SOL Whale',
    pnl: '+$2.4M',
    pnlPercent: '+340%',
    winRate: 78,
    trades: 1247,
    followers: '45.2K',
    recentTrade: { token: 'JUP', action: 'BOUGHT', amount: '$890K', time: '2h ago' },
    wallet: '7xKr...9fDe',
    twitter: 'https://x.com',
    verified: true,
  },
  {
    name: 'DegenKing',
    handle: '@degen_king_',
    avatar: '👑',
    title: 'Meme Coin Legend',
    pnl: '+$1.8M',
    pnlPercent: '+520%',
    winRate: 65,
    trades: 3891,
    followers: '128K',
    recentTrade: { token: 'BONK', action: 'BOUGHT', amount: '4.2B tokens', time: '45m ago' },
    wallet: '3Hqz...wKmP',
    twitter: 'https://x.com',
    verified: true,
  },
  {
    name: 'WhaleSharq',
    handle: '@whalesharq',
    avatar: '🦈',
    title: 'Smart Money OG',
    pnl: '+$5.1M',
    pnlPercent: '+180%',
    winRate: 82,
    trades: 634,
    followers: '89.7K',
    recentTrade: { token: 'SOL', action: 'ACCUMULATED', amount: '85K SOL', time: '1h ago' },
    wallet: '5tQm...7xVn',
    twitter: 'https://x.com',
    verified: true,
  },
  {
    name: 'AlphaHunter',
    handle: '@alpha_hunt3r',
    avatar: '🎯',
    title: 'Early Token Sniper',
    pnl: '+$960K',
    pnlPercent: '+890%',
    winRate: 71,
    trades: 2156,
    followers: '34.5K',
    recentTrade: { token: 'RENDER', action: 'BOUGHT', amount: '$420K', time: '3h ago' },
    wallet: '9pLx...4nTq',
    verified: true,
  },
  {
    name: 'SilentWhale',
    handle: '@silent_whale',
    avatar: '🐋',
    title: 'Institutional Flow',
    pnl: '+$12.3M',
    pnlPercent: '+95%',
    winRate: 88,
    trades: 312,
    followers: '210K',
    recentTrade: { token: 'ETH', action: 'MOVED', amount: '$4.8M', time: '30m ago' },
    wallet: '2bFk...8mRj',
    twitter: 'https://x.com',
    verified: true,
  },
  {
    name: 'NeonTrader',
    handle: '@neon_trader',
    avatar: '⚡',
    title: 'DeFi Maximalist',
    pnl: '+$730K',
    pnlPercent: '+410%',
    winRate: 74,
    trades: 1893,
    followers: '22.1K',
    recentTrade: { token: 'RAY', action: 'BOUGHT', amount: '$180K', time: '4h ago' },
    wallet: '8kNm...3pYz',
    verified: false,
  },
];

export default function TopWhales() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Follow the <span className="gradient-text">Smart Money</span>
          </h2>
          <p className="text-dark-400 text-sm max-w-lg mx-auto">
            Track the biggest whales in crypto. See what they buy, copy their trades, and ride the wave.
          </p>
        </div>

        {/* Whale Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHALES.map((whale, i) => (
            <div
              key={whale.handle}
              className={`glass-card p-4 cursor-pointer transition-all duration-300 hover:border-apex-500/40 hover:scale-[1.02] ${
                selected === i ? 'border-apex-500/50 ring-1 ring-apex-500/20' : ''
              }`}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center text-2xl border border-dark-600">
                  {whale.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white truncate">{whale.name}</span>
                    {whale.verified && <span className="text-apex-400 text-xs">✓</span>}
                  </div>
                  <p className="text-xs text-dark-500">{whale.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-400">{whale.pnl}</p>
                  <p className="text-[10px] text-green-400/70">{whale.pnlPercent} all-time</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3 mb-3 text-xs">
                <span className="flex items-center gap-1 text-dark-400">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-white font-medium">{whale.winRate}%</span> win
                </span>
                <span className="text-dark-600">|</span>
                <span className="text-dark-400">{whale.trades} trades</span>
                <span className="text-dark-600">|</span>
                <span className="flex items-center gap-1 text-dark-400">
                  <Eye className="w-3 h-3" /> {whale.followers}
                </span>
              </div>

              {/* Recent Trade */}
              <div className="bg-dark-800/80 rounded-lg p-2.5 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 font-bold">
                      {whale.recentTrade.action}
                    </span>
                    <span className="text-sm font-semibold text-white">{whale.recentTrade.token}</span>
                    <span className="text-xs text-dark-400">{whale.recentTrade.amount}</span>
                  </div>
                  <span className="text-[10px] text-dark-500">{whale.recentTrade.time}</span>
                </div>
              </div>

              {/* Quick Actions — always visible, no click needed */}
              <div className="flex gap-2">
                <a
                  href={`https://gmgn.ai/sol/address/${whale.wallet}?ref=cBB5zbUF`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary !py-2 text-xs text-center flex items-center justify-center gap-1"
                >
                  <TrendingUp className="w-3 h-3" /> Copy GMGN
                </a>
                <a
                  href="https://www.bitunix.com/register?vipCode=xc6jzk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-xs text-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all flex items-center justify-center gap-1"
                >
                  <TrendingUp className="w-3 h-3" /> Copy Bitunix
                </a>
              </div>
              <a
                href={`${CONFIG.telegram.apexBot}?start=copy_${whale.wallet}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-2 py-1.5 text-xs text-center rounded-lg bg-dark-800/50 border border-dark-700/30 text-dark-400 hover:text-apex-400 hover:border-apex-500/20 transition-all"
              >
                <Wallet className="w-3 h-3 inline mr-1" /> Track in Bot
              </a>

              {/* Expanded: wallet + explorer links */}
              {selected === i && (
                <div className="space-y-2 pt-2 border-t border-dark-700/50 mt-2">
                  <div className="flex items-center justify-between text-xs text-dark-400">
                    <span className="flex items-center gap-1">
                      <Wallet className="w-3 h-3" /> {whale.wallet}
                    </span>
                    <button className="text-apex-400 hover:text-apex-300">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`https://solscan.io/account/${whale.wallet}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 p-2 rounded-lg bg-dark-800 border border-dark-700 hover:border-dark-600 text-dark-300 hover:text-white transition-colors text-xs text-center"
                    >
                      Solscan <ExternalLink className="w-3 h-3 inline ml-1" />
                    </a>
                    {whale.twitter && (
                      <a
                        href={whale.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-dark-800 border border-dark-700 hover:border-dark-600 text-dark-300 hover:text-white transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <a
            href={CONFIG.telegram.apexBot}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 !py-3 !px-6"
          >
            Track All Whales — Free
          </a>
          <p className="text-xs text-dark-500 mt-2">Real whale wallets. Real trades. Updated in real-time.</p>
        </div>
      </div>
    </section>
  );
}
