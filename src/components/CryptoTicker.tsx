'use client';

import { useEffect, useState } from 'react';

const COIN_IDS = 'bitcoin,solana,ethereum,bonk,dogwifcoin,jupiter-exchange-solana,render-token,pyth-network,jito-governance-token,raydium,ondo-finance,helium,dogecoin';

const COIN_IMG: Record<string, string> = {
  bitcoin: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
  solana: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
  ethereum: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  bonk: 'https://assets.coingecko.com/coins/images/28600/small/bonk.jpg',
  dogwifcoin: 'https://assets.coingecko.com/coins/images/33566/small/dogwifhat.jpg',
  'jupiter-exchange-solana': 'https://assets.coingecko.com/coins/images/34188/small/jup.png',
  'render-token': 'https://assets.coingecko.com/coins/images/11636/small/rndr.png',
  'pyth-network': 'https://assets.coingecko.com/coins/images/31924/small/pyth.png',
  'jito-governance-token': 'https://assets.coingecko.com/coins/images/33228/small/jto.png',
  raydium: 'https://assets.coingecko.com/coins/images/13928/small/PSigc4ie_400x400.jpg',
  'ondo-finance': 'https://assets.coingecko.com/coins/images/26580/small/ONDO.png',
  helium: 'https://assets.coingecko.com/coins/images/4284/small/Helium_HNT.png',
  dogecoin: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png',
};

const SYMBOL_MAP: Record<string, string> = {
  bitcoin: 'BTC', solana: 'SOL', ethereum: 'ETH', bonk: 'BONK',
  dogwifcoin: 'WIF', 'jupiter-exchange-solana': 'JUP', 'render-token': 'RENDER',
  'pyth-network': 'PYTH', 'jito-governance-token': 'JTO', raydium: 'RAY',
  'ondo-finance': 'ONDO', helium: 'HNT', dogecoin: 'DOGE',
};

// Affiliate links per coin
const COIN_LINKS: Record<string, string> = {
  BTC: 'https://www.bitunix.com/register?vipCode=xc6jzk',
  SOL: 'https://t.me/ApexFlashBot',
  ETH: 'https://www.bitunix.com/register?vipCode=xc6jzk',
  BONK: 'https://t.me/ApexFlashBot',
  WIF: 'https://t.me/ApexFlashBot',
  JUP: 'https://t.me/ApexFlashBot',
  RENDER: 'https://www.mexc.com/register?inviteCode=BPM0e8Rm',
  PYTH: 'https://www.mexc.com/register?inviteCode=BPM0e8Rm',
  JTO: 'https://www.mexc.com/register?inviteCode=BPM0e8Rm',
  RAY: 'https://t.me/ApexFlashBot',
  ONDO: 'https://www.gate.com/signup/VFFHXVFDUG?ref_type=103',
  HNT: 'https://www.gate.com/signup/VFFHXVFDUG?ref_type=103',
  DOGE: 'https://www.bitunix.com/register?vipCode=xc6jzk',
};

interface CoinData {
  id: string;
  symbol: string;
  price: string;
  change: string;
  up: boolean;
  img: string;
  link: string;
  sparkline: number[];
}

const CTA_MESSAGES = [
  '🔥 Whale alert just fired — ApexFlash traders saw it first',
  '🚀 Free whale alerts — ETH + SOL — @ApexFlashBot',
  '🐋 See what whales buy BEFORE the pump — free on Telegram',
  '💎 AI grades every signal A-D — only the best reach you',
  '📈 Win rate tracking, copy trading, 1-tap buy — all free',
];

function formatPrice(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  if (price >= 0.001) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(8)}`;
}

function MiniSparkline({ data, up }: { data: number[]; up: boolean }) {
  if (!data || data.length < 2) return null;
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
      <polyline points={points} fill="none" stroke={up ? '#34d399' : '#f87171'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Fallback data if API fails
const FALLBACK: CoinData[] = [
  { id: 'solana', symbol: 'SOL', price: '$142', change: '+5.2%', up: true, img: COIN_IMG.solana, link: COIN_LINKS.SOL, sparkline: [120,128,118,135,132,140,142] },
  { id: 'bitcoin', symbol: 'BTC', price: '$87,421', change: '+2.1%', up: true, img: COIN_IMG.bitcoin, link: COIN_LINKS.BTC, sparkline: [82,84,81,86,85,87,87.4] },
  { id: 'ethereum', symbol: 'ETH', price: '$3,285', change: '+1.8%', up: true, img: COIN_IMG.ethereum, link: COIN_LINKS.ETH, sparkline: [3.1,3.15,3.08,3.25,3.22,3.30,3.285] },
];

export default function CryptoTicker() {
  const [coins, setCoins] = useState<CoinData[]>(FALLBACK);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COIN_IDS}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`,
          { next: { revalidate: 60 } }
        );
        if (!res.ok) return;
        const data = await res.json();
        const mapped: CoinData[] = data.map((coin: { id: string; current_price: number; price_change_percentage_24h: number; sparkline_in_7d?: { price: number[] } }) => {
          const sym = SYMBOL_MAP[coin.id] || coin.id.toUpperCase();
          const change = coin.price_change_percentage_24h || 0;
          const sparkRaw = coin.sparkline_in_7d?.price || [];
          // Take last 24h of data (sparkline is 7 days = 168 hours, last ~24 points = last day)
          const last24h = sparkRaw.length > 24 ? sparkRaw.slice(-24) : sparkRaw;
          // Sample 7 points from last 24h for compact display
          const sparkline = last24h.length > 7 ? last24h.filter((_, i) => i % Math.floor(last24h.length / 7) === 0).slice(0, 7) : last24h;
          return {
            id: coin.id,
            symbol: sym,
            price: formatPrice(coin.current_price),
            change: `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`,
            up: change >= 0,
            img: COIN_IMG[coin.id] || '',
            link: COIN_LINKS[sym] || 'https://t.me/ApexFlashBot',
            sparkline,
          };
        });
        if (mapped.length > 0) {
          setCoins(mapped);
          setLastUpdate(new Date().toLocaleTimeString());
        }
      } catch {
        // Keep fallback data
      }
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Refresh every 60s
    return () => clearInterval(interval);
  }, []);

  // Build ticker items: coins + CTAs interspersed
  const tickerItems: ({ type: 'coin'; data: CoinData } | { type: 'cta'; text: string })[] = [];
  coins.forEach((coin, i) => {
    tickerItems.push({ type: 'coin', data: coin });
    if ((i + 1) % 3 === 0 && i < coins.length - 1) {
      tickerItems.push({ type: 'cta', text: CTA_MESSAGES[Math.floor(i / 3) % CTA_MESSAGES.length] });
    }
  });

  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-dark-950/95 backdrop-blur-sm border-b border-dark-800/60 overflow-hidden">
      <div className="ticker-track flex items-center gap-8 py-2 px-4 whitespace-nowrap">
        {doubled.map((item, i) => {
          if (item.type === 'cta') {
            return (
              <a
                key={`cta-${i}`}
                href="https://t.me/ApexFlashBot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-apex-400 flex-shrink-0 hover:text-apex-300 transition-colors cursor-pointer"
              >
                {item.text}
              </a>
            );
          }
          const coin = item.data;
          return (
            <a
              key={`${coin.id}-${i}`}
              href={coin.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm flex-shrink-0 hover:bg-dark-800/50 rounded-lg px-2 py-0.5 -mx-2 transition-colors cursor-pointer group"
              title={`Trade ${coin.symbol} — click to open`}
            >
              {coin.img && (
                <img src={coin.img} alt={coin.symbol} width={18} height={18} className="rounded-full" loading="lazy" />
              )}
              <span className="font-semibold text-dark-100 group-hover:text-white transition-colors">{coin.symbol}</span>
              <span className="text-dark-300">{coin.price}</span>
              <span className={`font-medium ${coin.up ? 'text-emerald-400' : 'text-red-400'}`}>{coin.change}</span>
              {coin.sparkline.length > 1 && <MiniSparkline data={coin.sparkline} up={coin.up} />}
            </a>
          );
        })}
      </div>
      {lastUpdate && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-dark-600 hidden sm:block">
          LIVE {lastUpdate}
        </div>
      )}
    </div>
  );
}
