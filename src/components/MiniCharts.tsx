'use client';

import { CONFIG } from '@/lib/config';
import { ArrowRight } from 'lucide-react';

const COIN_IMG: Record<string, string> = {
  SOL: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
  BTC: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
  ETH: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  BONK: 'https://assets.coingecko.com/coins/images/28600/small/bonk.jpg',
  JUP: 'https://assets.coingecko.com/coins/images/34188/small/jup.png',
  RAY: 'https://assets.coingecko.com/coins/images/13928/small/PSigc4ie_400x400.jpg',
};

interface ChartCoin {
  symbol: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
  sparkline: number[];
}

const CHART_COINS: ChartCoin[] = [
  {
    symbol: 'SOL',
    name: 'Solana',
    price: '$142.38',
    change: '+5.2%',
    up: true,
    sparkline: [120, 125, 118, 130, 128, 135, 132, 140, 138, 142, 136, 142],
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$87,421',
    change: '+2.1%',
    up: true,
    sparkline: [82000, 83500, 81000, 84000, 85500, 84200, 86000, 85000, 87000, 86500, 87800, 87421],
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$3,285',
    change: '+1.8%',
    up: true,
    sparkline: [3100, 3150, 3080, 3200, 3180, 3250, 3220, 3300, 3260, 3310, 3270, 3285],
  },
  {
    symbol: 'BONK',
    name: 'Bonk',
    price: '$0.0000284',
    change: '+12.4%',
    up: true,
    sparkline: [22, 21, 24, 23, 25, 24, 26, 25, 27, 26, 28, 28.4],
  },
  {
    symbol: 'JUP',
    name: 'Jupiter',
    price: '$0.94',
    change: '+8.7%',
    up: true,
    sparkline: [0.78, 0.80, 0.77, 0.82, 0.81, 0.85, 0.83, 0.88, 0.86, 0.90, 0.92, 0.94],
  },
  {
    symbol: 'RAY',
    name: 'Raydium',
    price: '$2.18',
    change: '+9.1%',
    up: true,
    sparkline: [1.80, 1.85, 1.78, 1.90, 1.88, 1.95, 1.92, 2.00, 1.98, 2.10, 2.05, 2.18],
  },
];

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 120;
  const h = 40;
  const step = w / (data.length - 1);

  const points = data
    .map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 4) - 2}`)
    .join(' ');

  const fillPoints = `0,${h} ${points} ${w},${h}`;

  const color = up ? '#34d399' : '#f87171';
  const fillColor = up ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)';

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="flex-shrink-0">
      <polygon points={fillPoints} fill={fillColor} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MiniCharts() {
  return (
    <section className="py-16 sm:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Price <span className="gradient-text">Charts</span>
          </h2>
          <p className="text-dark-400">
            Quick overview of top-performing assets — 7-day trend.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHART_COINS.map((coin) => {
            const img = COIN_IMG[coin.symbol];
            return (
              <div
                key={coin.symbol}
                className="glass-card p-5 hover:border-apex-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {img && (
                      <img src={img} alt={coin.symbol} width={32} height={32} className="rounded-full" loading="lazy" />
                    )}
                    <div>
                      <span className="text-sm font-bold text-white">{coin.symbol}</span>
                      <span className="text-xs text-dark-500 ml-1.5">{coin.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-dark-100">{coin.price}</div>
                    <div className={`text-xs font-medium ${coin.up ? 'text-emerald-400' : 'text-red-400'}`}>
                      {coin.change}
                    </div>
                  </div>
                </div>

                <Sparkline data={coin.sparkline} up={coin.up} />
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <a
            href={CONFIG.telegram.apexBot}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-apex-400 hover:text-apex-300 transition-colors font-medium"
          >
            Get real-time price alerts on Telegram
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
