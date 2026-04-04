'use client';

import { useState, useEffect } from 'react';
import { CONFIG } from '@/lib/config';
import { ArrowRight, Zap, Users, TrendingUp, Trophy, Shield, Eye, BarChart3 } from 'lucide-react';

export default function Hero() {
  const [stats, setStats] = useState({ users: 3, volume: '$39K+', winRate: 50, tradesToday: 0 });

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setStats(s => ({ ...s, ...data })); })
      .catch(() => {});

    const statsInterval = setInterval(() => {
      fetch('/api/stats')
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (data) setStats(s => ({ ...s, ...data })); })
        .catch(() => {});
    }, 60000);

    return () => { clearInterval(statsInterval); };
  }, []);

  return (
    <section className="relative pt-16 pb-2 sm:pt-24 sm:pb-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-apex-900/20 via-dark-950 to-dark-950" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-apex-500/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-6 items-center">

          {/* LEFT: Above the fold — EVERYTHING that matters */}
          <div>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-apex-500/10 border border-apex-500/20 text-apex-400 text-xs font-medium mb-2">
              <span className="w-2 h-2 rounded-full bg-apex-400 animate-pulse" />
              Live whale tracking — Solana + Ethereum
            </div>

            {/* Heading — compact */}
            <h1 className="text-[1.6rem] sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight mb-2 leading-[1.1] gradient-hero">
              Whale Spotted <span className="emoji-reset">🐋</span> Bot Executes <span className="emoji-reset">⚡</span><br className="sm:hidden" /> You Profit
            </h1>

            {/* One-liner value prop */}
            <p className="text-sm sm:text-base text-dark-300 max-w-lg mb-3 leading-snug">
              AI detects whale token swaps and features the new <strong className="text-white">Godmode Infinity (v3.15.2)</strong> Zero-Loss Autonomous Engine. 1-tap fast buy or let it trade 24/7 for you. <strong className="text-white">Free on Telegram.</strong>
            </p>

            {/* CTA — big and clear */}
            <a
              href={CONFIG.telegram.apexBot}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base sm:text-lg inline-flex !py-3 !px-6 sm:!py-3.5 sm:!px-7 mb-3"
            >
              <Zap className="w-5 h-5" />
              Let the Bot Trade For You — Free
              <ArrowRight className="w-5 h-5" />
            </a>

            {/* 3 Trust bullets — MUST be above fold */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-dark-300">
                <Shield className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span>Auto Stop-Loss</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-dark-300">
                <Eye className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>1-Tap Execution</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-dark-300">
                <BarChart3 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{stats.winRate}% Win Rate</span>
              </div>
            </div>

            {/* Micro trust line */}
            <p className="text-[10px] sm:text-xs text-dark-500 mb-2">30-second setup. No download. No credit card. Bot does the work.</p>

            {/* Stats bar — compact */}
            <div className="flex items-center gap-3 sm:gap-5 text-xs flex-wrap">
              <div className="flex items-center gap-1.5 text-dark-400">
                <Users className="w-3.5 h-3.5 text-apex-400" />
                <strong className="text-white">20</strong> trades executed
              </div>
              <div className="flex items-center gap-1.5 text-dark-400">
                <TrendingUp className="w-3.5 h-3.5 text-apex-400" />
                <strong className="text-white">{stats.volume}</strong> tracked
              </div>
              {stats.winRate > 0 && (
                <div className="flex items-center gap-1.5 text-dark-400">
                  <Trophy className="w-3.5 h-3.5 text-green-400" />
                  <strong className="text-green-400">{stats.winRate}%</strong> win rate
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Live whale feed — desktop only */}
          <div className="hidden lg:block">
            <div className="glass-card p-5 max-w-md ml-auto">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-apex-400 animate-pulse" />
                  <span className="text-sm font-semibold text-white">Live Whale Feed</span>
                </div>
                <span className="text-xs text-dark-500">Just now</span>
              </div>

              <div className="space-y-2">
                {[
                  { text: 'Whale bought 2.1M BONK via Jupiter', grade: 'A', emoji: '🚨' },
                  { text: 'Smart money accumulated 85,000 SOL', grade: 'A', emoji: '🐋' },
                  { text: 'DEX whale: $1.2M JUP swap detected', grade: 'B', emoji: '🔥' },
                  { text: 'OKX withdrawal: 5,000 ETH to cold', grade: 'B', emoji: '🟢' },
                  { text: 'Binance hot wallet: $50M outflow', grade: 'C', emoji: '⚪' },
                ].map((whale, i) => {
                  const gradeColor = whale.grade === 'A' ? 'text-green-400 bg-green-500/20' :
                    whale.grade === 'B' ? 'text-cyan-400 bg-cyan-500/20' : 'text-yellow-400 bg-yellow-500/20';
                  return (
                    <a
                      key={i}
                      href={CONFIG.telegram.apexBot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-2 rounded-lg text-sm cursor-pointer transition-all hover:scale-[1.01] ${
                        i === 0 ? 'bg-apex-500/10 border border-apex-500/20 text-apex-300' : 'bg-dark-800/50 text-dark-400 hover:bg-dark-700/50'
                      }`}
                    >
                      <span className="text-sm shrink-0">{whale.emoji}</span>
                      <span className={`flex-1 text-xs ${i === 0 ? 'font-medium' : ''}`}>{whale.text}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${gradeColor}`}>{whale.grade}</span>
                    </a>
                  );
                })}
              </div>

              <a
                href={CONFIG.telegram.apexBot}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full btn-primary !py-2 text-sm text-center"
              >
                Let the Bot Trade These For You
              </a>
            </div>
          </div>
        </div>

        {/* Exchange trust bar — compact */}
        <div className="mt-2 pt-2 sm:mt-4 sm:pt-3 border-t border-dark-800/30">
          <div className="flex items-center justify-center gap-4 sm:gap-8 text-[10px] sm:text-xs font-medium">
            <span className="text-dark-600 hidden sm:inline">Tracking whales on</span>
            {[
              { name: 'Bitunix', url: 'https://www.bitunix.com/register?vipCode=xc6jzk' },
              { name: 'Gate.io', url: 'https://www.gate.io/signup/VFFHXVFDUG' },
              { name: 'OKX', url: 'https://www.okx.com/join/APEXFLASH' },
              { name: 'MEXC', url: 'https://www.mexc.com/register?inviteCode=BPM0e8Rm' },
              { name: 'BloFin', url: 'https://www.blofin.com/register?referral=b996a0111c1b4497b53d9b3cc82e4539' },
              { name: 'Binance', url: 'https://accounts.binance.com/register' },
            ].map((ex) => (
              <a key={ex.name} href={ex.url} target="_blank" rel="noopener noreferrer" className="text-dark-500 hover:text-apex-400 transition-colors">
                {ex.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
