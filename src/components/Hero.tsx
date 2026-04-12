'use client';

import { useEffect, useState } from 'react';
import { CONFIG } from '@/lib/config';
import { trackEvent } from '@/lib/tracking';
import { ArrowRight, Zap } from 'lucide-react';

interface LiveStats {
  users: number;
  signals: number | null;
  volume: string;
  tradesToday?: number;
  winRate?: number;
}

export default function Hero() {
  const [stats, setStats] = useState<LiveStats>({ users: 0, signals: null, volume: '$39K+' });

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((d: LiveStats) => {
        setStats({
          users: d.users || 0,
          signals: d.signals ?? null,
          volume: d.volume || '$39K+',
          tradesToday: d.tradesToday,
          winRate: d.winRate,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-apex-900/30 via-dark-950 to-dark-950" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-apex-500/8 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">

          {/* Live social proof badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-apex-500/10 border border-apex-500/20 text-apex-400 text-sm font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {stats.signals !== null
              ? `${stats.signals.toLocaleString()}+ whale signals tracked`
              : '🔴 LIVE — whale scanner active 24/7'}
          </div>

          {/* Heading — urgency + FOMO */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Whales Are Buying{' '}
            <span className="gradient-text">Right Now</span>
            {' '}🐳<br />
            <span className="text-white">Are You Watching?</span>{' '}⚡
          </h1>

          <p className="text-lg sm:text-xl text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Every SOL pump starts with whale buys. Our scanner catches them{' '}
            <strong className="text-white">before the crowd moves</strong>
            {' '}— free on Telegram. <span className="text-apex-400">Be first.</span>
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <a
              href={CONFIG.telegram.whaleBot}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('cta_click', { section: 'hero', cta: 'start_alerts_free', target: 'telegram_bot' })}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-apex-500 to-emerald-500 text-dark-950 font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-apex-500/30"
            >
              <Zap className="w-5 h-5" />
              Start Getting Alerts — Free
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={CONFIG.telegram.channel}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('cta_click', { section: 'hero', cta: 'view_signals', target: 'telegram_channel' })}

              className="btn-secondary text-lg"
            >
              View Live Signals
            </a>
          </div>

          {/* Trust copy */}
          <p className="text-dark-500 text-sm mb-6">
            30-second setup. No download. No credit card.
          </p>

          {/* Real trade proof — Bitunix verified results */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-lg bg-dark-800/70 border border-green-500/20 text-sm mb-10">
            <span className="text-dark-400">Verified trade results:</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <strong className="text-green-400">+156%</strong>
            </span>
            <span className="text-dark-600">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <strong className="text-green-400">+305%</strong>
            </span>
            <span className="text-dark-500 text-xs">on Bitunix · SIREN signal</span>
          </div>

          {/* Stats bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 pt-8 border-t border-dark-800/50">
            <div className="flex items-center gap-2 text-dark-300 text-sm">
              <span className="text-xl">🐋</span>
              <span>
                {stats.signals !== null
                  ? <><strong className="text-white">{stats.signals.toLocaleString()}+</strong> whale signals tracked</>
                  : <><strong className="text-white">Scanner live</strong> — 24/7 active</>}
              </span>
            </div>
            <div className="flex items-center gap-2 text-dark-300 text-sm">
              <span className="text-xl">📈</span>
              <span><strong className="text-white">{stats.volume}</strong> volume tracked</span>
            </div>
            <div className="flex items-center gap-2 text-dark-300 text-sm">
              <span className="text-xl">✅</span>
              <span>Real trades · <strong className="text-green-400">+156% / +305%</strong> proven</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
