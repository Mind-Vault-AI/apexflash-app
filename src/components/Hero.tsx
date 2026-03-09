'use client';

import { CONFIG } from '@/lib/config';
import { ArrowRight, Zap, Users, TrendingUp } from 'lucide-react';

const WHALES = [
  'Binance hot wallet: $240M BTC outflow detected',
  'Top 20 whale accumulated 85,000 SOL',
  'OKX exchange withdrawal: $80M ETH moved to cold storage',
  'Coinbase institutional wallet: $50M USDC inflow',
  'Unknown whale bought 2.1M JUP in 3 txns',
  'DEX whale: $12M SOL swapped via Jupiter',
];

export default function Hero() {
  return (
    <section className="relative flex items-center pt-24 pb-6 overflow-hidden" style={{ minHeight: 'calc(85vh)' }}>
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-apex-900/20 via-dark-950 to-dark-950" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-apex-500/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* LEFT: Copy + CTA */}
          <div>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-apex-500/10 border border-apex-500/20 text-apex-400 text-xs font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-apex-400 animate-pulse" />
              2,400+ traders watching right now
            </div>

            {/* Heading glow */}
            <div className="absolute -top-4 left-0 w-[80%] h-24 bg-gradient-to-r from-blue-600/20 via-cyan-400/15 to-amber-400/10 blur-3xl pointer-events-none" />

            <h1 className="relative text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight mb-4 leading-[1.15] gradient-hero">
              Whales Are Buying Right Now <span className="emoji-reset">🐋</span> Are You Watching? <span className="emoji-reset">⚡</span>
            </h1>

            <p className="text-base sm:text-lg text-dark-300 max-w-lg mb-6 leading-relaxed">
              Every SOL pump starts with whale buys. <strong className="text-white">2,400+ traders</strong> see
              them first — free on Telegram. You&apos;re next.
            </p>

            {/* Single CTA - no confusion */}
            <a
              href={CONFIG.telegram.apexBot}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base sm:text-lg inline-flex !py-3.5 !px-7 mb-6"
            >
              <Zap className="w-5 h-5" />
              Start Getting Alerts — Free
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-xs text-dark-500 -mt-4 mb-4">30-second setup. No download. No credit card.</p>

            {/* Social proof - specific numbers */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-dark-400">
                <Users className="w-4 h-4 text-apex-400" />
                <span><strong className="text-white">2,400+</strong> traders</span>
              </div>
              <div className="flex items-center gap-2 text-dark-400">
                <TrendingUp className="w-4 h-4 text-apex-400" />
                <span><strong className="text-white">$18M+</strong> tracked today</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Live whale feed simulation */}
          <div className="hidden lg:block">
            <div className="glass-card p-5 max-w-md ml-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-apex-400 animate-pulse" />
                  <span className="text-sm font-semibold text-white">Live Whale Feed</span>
                </div>
                <span className="text-xs text-dark-500">Just now</span>
              </div>

              <div className="space-y-2.5">
                {WHALES.map((whale, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-2.5 rounded-lg text-sm ${
                      i === 0
                        ? 'bg-apex-500/10 border border-apex-500/20 text-apex-300'
                        : 'bg-dark-800/50 text-dark-400'
                    }`}
                  >
                    <span className="text-base">{i < 3 ? '🐋' : '🔔'}</span>
                    <span className={i === 0 ? 'font-medium' : ''}>{whale}</span>
                  </div>
                ))}
              </div>

              <a
                href={CONFIG.telegram.apexBot}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full btn-primary !py-2.5 text-sm text-center"
              >
                You&apos;re Missing These — Join Free
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar - exchange logos as trust signals */}
        <div className="mt-6 pt-4 border-t border-dark-800/30">
          <p className="text-xs text-dark-500 text-center mb-3">Tracking whales across top exchanges</p>
          <div className="flex items-center justify-center gap-6 sm:gap-10 text-sm font-medium">
            {[
              { name: 'Bitunix', url: 'https://www.bitunix.com/register?vipCode=xc6jzk' },
              { name: 'Binance', url: 'https://accounts.binance.com/register' },
              { name: 'Coinbase', url: 'https://www.coinbase.com' },
              { name: 'OKX', url: 'https://www.okx.com/register' },
              { name: 'Bybit', url: 'https://www.bybit.com/register' },
              { name: 'MEXC', url: 'https://www.mexc.com/register?inviteCode=BPM0e8Rm' },
              { name: 'Bitfinex', url: 'https://www.bitfinex.com', hidden: true },
              { name: 'Kraken', url: 'https://www.kraken.com', hidden: true },
            ].map((ex) => (
              <a
                key={ex.name}
                href={ex.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-dark-500 hover:text-apex-400 transition-colors ${ex.hidden ? 'hidden sm:inline' : ''}`}
              >
                {ex.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
