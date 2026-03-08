'use client';

import { CONFIG } from '@/lib/config';
import { Flame, TrendingUp, Bell, ArrowRight, Zap, AlertTriangle } from 'lucide-react';

const HOT_NEWS = [
  {
    tag: 'BREAKING',
    tagColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    text: 'Bitcoin whales accumulated $2.8B in 72 hours',
    cta: 'Track BTC whales',
    source: 'Etherscan',
    sourceUrl: 'https://etherscan.io',
  },
  {
    tag: 'ALERT',
    tagColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    text: 'SOL whale moved $47M to unknown wallet — dump incoming?',
    cta: 'Get SOL alerts',
    source: 'Solscan',
    sourceUrl: 'https://solscan.io',
  },
  {
    tag: 'HOT',
    tagColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    text: 'JUP token — 3 whales bought $8M in 24h',
    cta: 'Follow JUP whales',
    source: 'DeFiLlama',
    sourceUrl: 'https://defillama.com',
  },
];

const DATA_PARTNERS = [
  { name: 'CoinGecko', url: 'https://www.coingecko.com', tag: 'Prices' },
  { name: 'TradingView', url: 'https://www.tradingview.com', tag: 'Charts' },
  { name: 'Etherscan', url: 'https://etherscan.io', tag: 'ETH Data' },
  { name: 'Solscan', url: 'https://solscan.io', tag: 'SOL Data' },
  { name: 'DeFiLlama', url: 'https://defillama.com', tag: 'DeFi' },
  { name: 'CoinMarketCap', url: 'https://coinmarketcap.com', tag: 'Market Data' },
  { name: 'Messari', url: 'https://messari.io', tag: 'Research' },
];

const TRENDING_COINS = [
  { name: 'BTC', change: '+2.1%', signal: 'Whale accumulation', hot: true },
  { name: 'SOL', change: '+5.2%', signal: '3 large DEX buys', hot: true },
  { name: 'JUP', change: '+12.4%', signal: 'Smart money loading', hot: true },
  { name: 'ETH', change: '+1.8%', signal: 'Exchange outflows rising', hot: false },
  { name: 'BONK', change: '+28.3%', signal: 'Whale wallet activated', hot: true },
  { name: 'WIF', change: '+15.7%', signal: 'DEX volume spike', hot: false },
];

const SOCIAL_PROOFS = [
  'Thomas from Amsterdam just got a whale alert → bought SOL at $138 → now $142',
  'Marco tracked a JUP whale → entered at $0.82 → sold at $1.04 → +26%',
  'Sven upgraded to Flash Elite → first arbitrage alert saved him $340',
  'Lisa followed a BTC whale signal → caught the bottom of the dip',
];

export default function MarketPulse() {
  return (
    <section id="market-pulse" className="py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-apex-500/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold mb-3">
            <Flame className="w-3.5 h-3.5" />
            LIVE MARKET PULSE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            This Is What You&apos;re <span className="gradient-text">Missing</span>
          </h2>
          <p className="text-dark-400 mt-2 text-sm">Right now. Real moves. Real money. Are you watching?</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT: Hot news / whale alerts */}
          <div className="lg:col-span-2 space-y-3 min-w-0">
            {HOT_NEWS.map((item, i) => (
              <div key={i} className="glass-card p-4 group hover:border-apex-500/30 transition-all">
                <div className="flex items-start gap-3">
                  <span className={`shrink-0 text-[10px] font-black px-2 py-0.5 rounded-full border mt-0.5 ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium">{item.text}</p>
                    <div className="flex items-center justify-between mt-2">
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-dark-500 hover:text-dark-400 transition-colors"
                      >
                        via {item.source}
                      </a>
                      <a
                        href={CONFIG.telegram.apexBot}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-apex-400 hover:text-apex-300 transition-colors"
                      >
                        {item.cta}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Urgency banner */}
            <div className="glass-card p-4 border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-yellow-200">
                    <strong>Every minute without alerts = missed opportunities.</strong>{' '}
                    <span className="text-yellow-400/70">Whales don&apos;t wait for you to sign up.</span>
                  </p>
                  <a
                    href={CONFIG.telegram.apexBot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex btn-primary !py-2 !px-4 text-xs mt-3"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Start Now
                  </a>
                </div>
              </div>
            </div>

            {/* Social proof ticker */}
            <div className="glass-card p-3 overflow-hidden">
              <div className="flex items-center gap-2 text-xs text-dark-400">
                <Bell className="w-3.5 h-3.5 text-apex-400 shrink-0" />
                <div className="overflow-hidden whitespace-nowrap">
                  <div className="inline-block animate-[tickerScroll_20s_linear_infinite]">
                    {[...SOCIAL_PROOFS, ...SOCIAL_PROOFS].map((proof, i) => (
                      <span key={i} className="mx-6">
                        <span className="text-apex-400">&#10003;</span> {proof}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Trending coins */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-apex-400" />
                <span className="text-sm font-bold text-white">Trending Now</span>
              </div>
              <span className="text-[10px] font-bold text-dark-500 uppercase">Whale activity</span>
            </div>

            <div className="space-y-2.5">
              {TRENDING_COINS.map((coin, i) => (
                <a
                  key={i}
                  href={CONFIG.telegram.apexBot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-dark-800/80 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white">{coin.name}</span>
                    {coin.hot && <Flame className="w-3 h-3 text-orange-400" />}
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-400">{coin.change}</div>
                    <div className="text-[10px] text-dark-500">{coin.signal}</div>
                  </div>
                </a>
              ))}
            </div>

            <a
              href={CONFIG.telegram.apexBot}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full btn-primary !py-2.5 text-sm text-center"
            >
              <Zap className="w-4 h-4" />
              Track All Coins Free
            </a>
          </div>
        </div>

        {/* Data Partners strip */}
        <div className="mt-8 pt-6 border-t border-dark-800/30">
          <p className="text-[10px] text-dark-600 text-center mb-3 uppercase tracking-wider font-semibold">
            Powered by trusted data sources
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {DATA_PARTNERS.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-dark-500 hover:text-apex-400 transition-colors"
              >
                <span className="text-xs font-medium">{partner.name}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-dark-800/50 text-dark-600 group-hover:text-apex-400/70 group-hover:bg-apex-500/10 transition-all">
                  {partner.tag}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
