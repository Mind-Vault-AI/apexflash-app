'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Sparkles, Flame, ArrowRight } from 'lucide-react';
import { CONFIG } from '@/lib/config';

const COIN_IMG: Record<string, string> = {
  SOL: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
  BTC: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
  ETH: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  BONK: 'https://assets.coingecko.com/coins/images/28600/small/bonk.jpg',
  WIF: 'https://assets.coingecko.com/coins/images/33566/small/dogwifhat.jpg',
  JUP: 'https://assets.coingecko.com/coins/images/34188/small/jup.png',
  RENDER: 'https://assets.coingecko.com/coins/images/11636/small/rndr.png',
  PYTH: 'https://assets.coingecko.com/coins/images/31924/small/pyth.png',
  JTO: 'https://assets.coingecko.com/coins/images/33228/small/jto.png',
  RAY: 'https://assets.coingecko.com/coins/images/13928/small/PSigc4ie_400x400.jpg',
  ONDO: 'https://assets.coingecko.com/coins/images/26580/small/ONDO.png',
  DOGE: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png',
  PEPE: 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg',
  FLOKI: 'https://assets.coingecko.com/coins/images/16746/small/PNG_image.png',
  W: 'https://assets.coingecko.com/coins/images/35087/small/womrhole_logo_full_color_rgb_-_with_background.png',
  TNSR: 'https://assets.coingecko.com/coins/images/35972/small/tensorlogo.png',
  POPCAT: 'https://assets.coingecko.com/coins/images/33760/small/image.jpg',
  MEW: 'https://assets.coingecko.com/coins/images/36440/small/MEW.png',
};

interface Coin {
  symbol: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
  volume?: string;
  tag?: string;
}

const TABS = [
  { id: 'gainers', label: 'Stijgers', icon: TrendingUp },
  { id: 'losers', label: 'Dalers', icon: TrendingDown },
  { id: 'new', label: 'Nieuw', icon: Sparkles },
  { id: 'trending', label: 'Trending', icon: Flame },
] as const;

const DATA: Record<string, Coin[]> = {
  gainers: [
    { symbol: 'BONK', name: 'Bonk', price: '$0.00002841', change: '+12.4%', up: true, volume: '$284M' },
    { symbol: 'RAY', name: 'Raydium', price: '$2.18', change: '+9.1%', up: true, volume: '$89M' },
    { symbol: 'JUP', name: 'Jupiter', price: '$0.94', change: '+8.7%', up: true, volume: '$156M' },
    { symbol: 'PYTH', name: 'Pyth Network', price: '$0.41', change: '+6.9%', up: true, volume: '$45M' },
    { symbol: 'SOL', name: 'Solana', price: '$142.38', change: '+5.2%', up: true, volume: '$2.1B' },
    { symbol: 'RENDER', name: 'Render', price: '$8.12', change: '+4.3%', up: true, volume: '$112M' },
    { symbol: 'ONDO', name: 'Ondo Finance', price: '$1.32', change: '+3.5%', up: true, volume: '$67M' },
    { symbol: 'HNT', name: 'Helium', price: '$5.67', change: '+2.8%', up: true, volume: '$23M' },
  ],
  losers: [
    { symbol: 'PEPE', name: 'Pepe', price: '$0.0000089', change: '-8.2%', up: false, volume: '$412M' },
    { symbol: 'FLOKI', name: 'Floki', price: '$0.000142', change: '-5.7%', up: false, volume: '$98M' },
    { symbol: 'WIF', name: 'dogwifhat', price: '$1.87', change: '-3.1%', up: false, volume: '$234M' },
    { symbol: 'DOGE', name: 'Dogecoin', price: '$0.182', change: '-2.4%', up: false, volume: '$1.8B' },
    { symbol: 'JTO', name: 'Jito', price: '$3.54', change: '-1.2%', up: false, volume: '$34M' },
    { symbol: 'W', name: 'Wormhole', price: '$0.58', change: '-1.0%', up: false, volume: '$45M' },
  ],
  new: [
    { symbol: 'POPCAT', name: 'Popcat', price: '$0.72', change: '+18.3%', up: true, tag: 'Meme', volume: '$89M' },
    { symbol: 'MEW', name: 'cat in a dogs world', price: '$0.0084', change: '+14.1%', up: true, tag: 'Meme', volume: '$56M' },
    { symbol: 'TNSR', name: 'Tensor', price: '$0.89', change: '+6.2%', up: true, tag: 'NFT', volume: '$12M' },
    { symbol: 'W', name: 'Wormhole', price: '$0.58', change: '-1.0%', up: false, tag: 'Infra', volume: '$45M' },
    { symbol: 'JUP', name: 'Jupiter', price: '$0.94', change: '+8.7%', up: true, tag: 'DeFi', volume: '$156M' },
    { symbol: 'PYTH', name: 'Pyth Network', price: '$0.41', change: '+6.9%', up: true, tag: 'Oracle', volume: '$45M' },
  ],
  trending: [
    { symbol: 'SOL', name: 'Solana', price: '$142.38', change: '+5.2%', up: true, volume: '$2.1B', tag: '#1' },
    { symbol: 'BONK', name: 'Bonk', price: '$0.00002841', change: '+12.4%', up: true, volume: '$284M', tag: '#2' },
    { symbol: 'JUP', name: 'Jupiter', price: '$0.94', change: '+8.7%', up: true, volume: '$156M', tag: '#3' },
    { symbol: 'WIF', name: 'dogwifhat', price: '$1.87', change: '-3.1%', up: false, volume: '$234M', tag: '#4' },
    { symbol: 'RENDER', name: 'Render', price: '$8.12', change: '+4.3%', up: true, volume: '$112M', tag: '#5' },
    { symbol: 'POPCAT', name: 'Popcat', price: '$0.72', change: '+18.3%', up: true, volume: '$89M', tag: '#6' },
    { symbol: 'RAY', name: 'Raydium', price: '$2.18', change: '+9.1%', up: true, volume: '$89M', tag: '#7' },
    { symbol: 'PYTH', name: 'Pyth Network', price: '$0.41', change: '+6.9%', up: true, volume: '$45M', tag: '#8' },
  ],
};

export default function MarketMovers() {
  const [tab, setTab] = useState<string>('gainers');
  const coins = DATA[tab] || [];

  return (
    <section id="market" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Market <span className="gradient-text">Movers</span>
          </h2>
          <p className="text-dark-400">
            Spot opportunities. Trade them instantly via ApexFlash.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === t.id
                    ? 'bg-apex-500/20 text-apex-400 border border-apex-500/30'
                    : 'text-dark-400 hover:text-dark-200 border border-transparent hover:border-dark-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Coin list */}
        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 text-xs text-dark-500 font-medium border-b border-dark-800/50">
            <div className="col-span-4">Coin</div>
            <div className="col-span-2 text-right">Prijs</div>
            <div className="col-span-2 text-right">24h</div>
            <div className="col-span-2 text-right">Volume</div>
            <div className="col-span-2 text-right">Actie</div>
          </div>

          {/* Rows */}
          {coins.map((coin, i) => {
            const img = COIN_IMG[coin.symbol];
            return (
              <div
                key={`${tab}-${i}`}
                className="grid grid-cols-12 gap-4 items-center px-5 py-3.5 border-b border-dark-800/30 hover:bg-dark-800/30 transition-colors"
              >
                {/* Coin info */}
                <div className="col-span-6 sm:col-span-4 flex items-center gap-3">
                  {img ? (
                    <img src={img} alt={coin.symbol} width={28} height={28} className="rounded-full" loading="lazy" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-dark-700 flex items-center justify-center text-[10px] font-bold text-dark-300">
                      {coin.symbol[0]}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-dark-100">{coin.symbol}</span>
                      {coin.tag && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-dark-800 text-dark-400">
                          {coin.tag}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-dark-500">{coin.name}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-3 sm:col-span-2 text-right text-sm text-dark-200">
                  {coin.price}
                </div>

                {/* Change */}
                <div className={`col-span-3 sm:col-span-2 text-right text-sm font-medium ${coin.up ? 'text-emerald-400' : 'text-red-400'}`}>
                  {coin.change}
                </div>

                {/* Volume - hidden on mobile */}
                <div className="hidden sm:block col-span-2 text-right text-sm text-dark-400">
                  {coin.volume}
                </div>

                {/* Trade button - hidden on mobile */}
                <div className="hidden sm:flex col-span-2 justify-end">
                  <a
                    href={CONFIG.telegram.apexBot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-medium text-apex-400 hover:text-apex-300 transition-colors px-3 py-1.5 rounded-lg border border-apex-500/20 hover:border-apex-500/40 hover:bg-apex-500/5"
                  >
                    Trade
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-6">
          <a
            href={CONFIG.telegram.apexBot}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-apex-400 hover:text-apex-300 transition-colors font-medium"
          >
            Trade al deze coins via ApexFlash op Telegram
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
