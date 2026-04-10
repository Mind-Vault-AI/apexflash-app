'use client';

import { useEffect, useState } from 'react';
import { CONFIG } from '@/lib/config';
import { trackEvent } from '@/lib/tracking';
import { ArrowRight, TrendingUp, Users, Zap, Activity } from 'lucide-react';

interface LiveStats {
  users: number;
  volume: string;
  tradesToday?: number;
  winRate?: number;
}

export default function Hero() {
  const [stats, setStats] = useState<LiveStats>({ users: 5, volume: '$39K+' });

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((d: LiveStats) => setStats(d))
      .catch(() => {});
  }, []);

  const statItems = [
    {
      icon: Users,
      value: stats.users > 0 ? `${stats.users}` : '5+',
      label: 'Active Traders',
    },
    {
      icon: TrendingUp,
      value: stats.volume,
      label: 'Volume Tracked',
    },
    {
      icon: Activity,
      value: stats.winRate != null ? `${stats.winRate}%` : '24/7',
      label: stats.winRate != null ? 'Win Rate' : 'Live Monitoring',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-apex-900/20 via-dark-950 to-dark-950" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-apex-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">

          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-apex-500/10 border border-apex-500/20 text-apex-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-apex-400 animate-pulse" />
            Live whale tracking active — @ApexFlashBot
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            Trade Crypto with{' '}
            <span className="gradient-text">Unfair Advantage</span>
          </h1>

          <p className="text-lg sm:text-xl text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Real-time whale alerts, AI-powered signals, and smart auto-trading.
            See what the big players do <strong className="text-dark-100">before</strong> the market moves.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href={CONFIG.telegram.bot}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('cta_click', { section: 'hero', cta: 'start_free', target: 'telegram_bot' })}
              className="btn-primary text-lg"
            >
              <Zap className="w-5 h-5" />
              Start Free on Telegram
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

          {/* Live stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {statItems.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon className="w-5 h-5 text-apex-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-dark-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
