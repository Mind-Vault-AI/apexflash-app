'use client';

import { CONFIG } from '@/lib/config';
import { ArrowRight, Zap, Users, TrendingUp } from 'lucide-react';

const WHALES = [
  'Elon Musk just moved $240M BTC',
  'CryptoGod John sold 15,000 ETH',
  'Binance Whale accumulated $80M SOL',
  'Trump-linked wallet bought $50M ETH',
  'Alex Becker wallet active - $12M move',
  'Institutional whale: $190M to Coinbase',
];

export default function Hero() {
  return (
    <section className="relative flex items-center pt-14 pb-6 overflow-hidden" style={{ minHeight: 'calc(100vh - 0px)' }}>
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
              Live whale tracking - 24/7
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-[1.1]">
              Follow the{' '}
              <span className="gradient-text">Whales.</span>
              <br />
              Trade the{' '}
              <span className="gradient-text">Edge.</span>
            </h1>

            <p className="text-base sm:text-lg text-dark-300 max-w-lg mb-6 leading-relaxed">
              See what Musk, CryptoGod John, Alex Becker and institutional whales
              do <strong className="text-white">before</strong> the market reacts.
              Free alerts. Instant. On Telegram.
            </p>

            {/* Single CTA - no confusion */}
            <a
              href={CONFIG.telegram.apexBot}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base sm:text-lg inline-flex !py-3.5 !px-7 mb-6"
            >
              <Zap className="w-5 h-5" />
              Get Free Whale Alerts
              <ArrowRight className="w-5 h-5" />
            </a>

            {/* Social proof - compact */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-dark-400">
                <Users className="w-4 h-4 text-apex-400" />
                <span><strong className="text-white">2,400+</strong> traders</span>
              </div>
              <div className="flex items-center gap-2 text-dark-400">
                <TrendingUp className="w-4 h-4 text-apex-400" />
                <span><strong className="text-white">$1.2B+</strong> tracked daily</span>
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
                Join Free - Get These Alerts
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar - exchange logos as trust signals */}
        <div className="mt-6 pt-4 border-t border-dark-800/30">
          <p className="text-xs text-dark-500 text-center mb-3">Tracking whales across top exchanges</p>
          <div className="flex items-center justify-center gap-6 sm:gap-10 text-dark-500 text-sm font-medium">
            <span>Binance</span>
            <span>Coinbase</span>
            <span>OKX</span>
            <span>Bybit</span>
            <span>MEXC</span>
            <span className="hidden sm:inline">Bitfinex</span>
            <span className="hidden sm:inline">Kraken</span>
          </div>
        </div>
      </div>
    </section>
  );
}
