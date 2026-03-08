'use client';

// CoinGecko CDN for coin logos
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
  HNT: 'https://assets.coingecko.com/coins/images/4284/small/Helium_HNT.png',
  DOGE: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png',
};

// Mini sparkline data per coin (7 data points)
const SPARKLINES: Record<string, number[]> = {
  SOL: [120, 128, 118, 135, 132, 140, 142],
  BTC: [82, 84, 81, 86, 85, 87, 87.4],
  ETH: [3.1, 3.15, 3.08, 3.25, 3.22, 3.30, 3.285],
  BONK: [22, 21, 24, 25, 24, 27, 28.4],
  WIF: [2.1, 2.0, 1.95, 1.92, 1.90, 1.88, 1.87],
  JUP: [0.78, 0.82, 0.81, 0.85, 0.88, 0.92, 0.94],
  RENDER: [7.2, 7.5, 7.3, 7.8, 7.6, 8.0, 8.12],
  PYTH: [0.35, 0.37, 0.36, 0.38, 0.39, 0.40, 0.41],
  JTO: [3.8, 3.7, 3.65, 3.6, 3.58, 3.55, 3.54],
  RAY: [1.8, 1.85, 1.90, 1.95, 2.0, 2.10, 2.18],
  ONDO: [1.20, 1.22, 1.25, 1.28, 1.26, 1.30, 1.32],
  HNT: [5.2, 5.3, 5.4, 5.35, 5.5, 5.6, 5.67],
  DOGE: [0.175, 0.178, 0.176, 0.180, 0.179, 0.181, 0.182],
};

function MiniSparkline({ data, up }: { data: number[]; up: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 40;
  const h = 16;
  const step = w / (data.length - 1);

  const points = data
    .map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 2) - 1}`)
    .join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="flex-shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={up ? '#34d399' : '#f87171'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TICKER_ITEMS = [
  { symbol: 'SOL', price: '$142.38', change: '+5.2%', up: true },
  { symbol: 'BTC', price: '$87,421', change: '+2.1%', up: true },
  { symbol: 'ETH', price: '$3,285', change: '+1.8%', up: true },
  { symbol: 'BONK', price: '$0.00002841', change: '+12.4%', up: true },
  { symbol: 'WIF', price: '$1.87', change: '-3.1%', up: false },
  { symbol: 'JUP', price: '$0.94', change: '+8.7%', up: true },
  { cta: true, text: '🔥 Trade SOL nu via ApexFlash — 1% flat fee' },
  { symbol: 'RENDER', price: '$8.12', change: '+4.3%', up: true },
  { symbol: 'PYTH', price: '$0.41', change: '+6.9%', up: true },
  { symbol: 'JTO', price: '$3.54', change: '-1.2%', up: false },
  { symbol: 'RAY', price: '$2.18', change: '+9.1%', up: true },
  { cta: true, text: '🐋 Whale alert: volg de grote jongens — gratis op Telegram' },
  { symbol: 'ONDO', price: '$1.32', change: '+3.5%', up: true },
  { symbol: 'HNT', price: '$5.67', change: '+2.8%', up: true },
  { symbol: 'DOGE', price: '$0.182', change: '+1.4%', up: true },
  { cta: true, text: '🚀 Rij mee op de wave — trade de hottest coins in 3 taps' },
];

export default function CryptoTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-dark-950/95 backdrop-blur-sm border-b border-dark-800/60 overflow-hidden">
      <div className="ticker-track flex items-center gap-8 py-2 px-4 whitespace-nowrap">
        {items.map((item, i) => {
          if ('cta' in item && item.cta) {
            return (
              <span key={i} className="text-sm font-semibold text-apex-400 flex-shrink-0">
                {item.text}
              </span>
            );
          }
          const tick = item as { symbol: string; price: string; change: string; up: boolean };
          const img = COIN_IMG[tick.symbol];
          const sparkline = SPARKLINES[tick.symbol];
          return (
            <span key={i} className="flex items-center gap-2 text-sm flex-shrink-0">
              {img && (
                <img
                  src={img}
                  alt={tick.symbol}
                  width={18}
                  height={18}
                  className="rounded-full"
                  loading="lazy"
                />
              )}
              <span className="font-semibold text-dark-100">{tick.symbol}</span>
              <span className="text-dark-300">{tick.price}</span>
              <span className={`font-medium ${tick.up ? 'text-emerald-400' : 'text-red-400'}`}>
                {tick.change}
              </span>
              {sparkline && <MiniSparkline data={sparkline} up={tick.up} />}
            </span>
          );
        })}
      </div>
    </div>
  );
}
