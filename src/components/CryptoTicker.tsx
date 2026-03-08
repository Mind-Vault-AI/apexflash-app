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
      <div className="ticker-track flex items-center gap-8 py-1.5 px-4 whitespace-nowrap">
        {items.map((item, i) => {
          if ('cta' in item && item.cta) {
            return (
              <span key={i} className="text-xs font-semibold text-apex-400 flex-shrink-0">
                {item.text}
              </span>
            );
          }
          const tick = item as { symbol: string; price: string; change: string; up: boolean };
          const img = COIN_IMG[tick.symbol];
          return (
            <span key={i} className="flex items-center gap-1.5 text-xs flex-shrink-0">
              {img && (
                <img
                  src={img}
                  alt={tick.symbol}
                  width={14}
                  height={14}
                  className="rounded-full"
                  loading="lazy"
                />
              )}
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
