'use client';

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
  // Double the items for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-dark-950/95 backdrop-blur-sm border-b border-dark-800/60 overflow-hidden">
      <div className="ticker-track flex items-center gap-8 py-2 px-4 whitespace-nowrap">
        {items.map((item, i) => {
          if ('cta' in item && item.cta) {
            return (
              <span key={i} className="text-xs font-semibold text-apex-400 flex-shrink-0">
                {item.text}
              </span>
            );
          }
          const tick = item as { symbol: string; price: string; change: string; up: boolean };
          return (
            <span key={i} className="flex items-center gap-1.5 text-xs flex-shrink-0">
              <span className="font-semibold text-dark-200">{tick.symbol}</span>
              <span className="text-dark-400">{tick.price}</span>
              <span className={tick.up ? 'text-emerald-400' : 'text-red-400'}>
                {tick.change}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
