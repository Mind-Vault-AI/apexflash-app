'use client';

import { useState, useEffect, useCallback } from 'react';
import { TrendingUp, TrendingDown, Sparkles, Flame, ArrowRight, RefreshCw } from 'lucide-react';
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
  TRUMP: 'https://assets.coingecko.com/coins/images/53746/small/trump.jpg',
  Bonk: 'https://assets.coingecko.com/coins/images/28600/small/bonk.jpg',
};

interface Coin {
  symbol: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
  volume?: string;
  tag?: string;
  mint?: string;
}

const TABS = [
  { id: 'gainers', label: 'Top Gainers', icon: TrendingUp },
  { id: 'losers', label: 'Top Losers', icon: TrendingDown },
  { id: 'new', label: 'Hot & New', icon: Sparkles },
  { id: 'trending', label: 'Trending', icon: Flame },
] as const;

export default function MarketMovers() {
  const [tab, setTab] = useState<string>('trending');
  const [data, setData] = useState<Record<string, Coin[]>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/market');
      if (res.ok) {
        const json = await res.json();
        setData({
          gainers: json.gainers || [],
          losers: json.losers || [],
          new: json.new || [],
          trending: json.trending || [],
        });
        setLastUpdate(new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      console.error('Market fetch failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchData, 60_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const coins = data[tab] || [];

  return (
    <section id="market" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Market <span className="gradient-text">Movers</span>
          </h2>
          <p className="text-dark-400 flex items-center justify-center gap-2">
            Live data &bull; Auto-updates every 60s
            {lastUpdate && (
              <span className="text-xs text-dark-500">
                &bull; Updated {lastUpdate}
              </span>
            )}
            <button
              onClick={() => { setLoading(true); fetchData(); }}
              className="ml-1 text-dark-500 hover:text-apex-400 transition-colors"
              title="Refresh now"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
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
                {data[t.id]?.length ? (
                  <span className="text-[10px] bg-dark-800 px-1.5 py-0.5 rounded-full">
                    {data[t.id].length}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Coin list */}
        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 text-xs text-dark-500 font-medium border-b border-dark-800/50">
            <div className="col-span-4">Token</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">24h Change</div>
            <div className="col-span-2 text-right">Volume</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {/* Loading state */}
          {loading && coins.length === 0 && (
            <div className="px-5 py-12 text-center text-dark-500">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3 text-apex-400" />
              Loading live market data...
            </div>
          )}

          {/* Rows */}
          {coins.map((coin, i) => {
            const img = COIN_IMG[coin.symbol];
            const botLink = coin.mint
              ? `https://t.me/ApexFlashBot?start=buy_${coin.mint}`
              : CONFIG.telegram.apexBot;
            return (
              <div
                key={`${tab}-${i}`}
                className="grid grid-cols-12 gap-4 items-center px-5 py-3.5 border-b border-dark-800/30 hover:bg-dark-800/30 transition-colors group"
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

                {/* Volume */}
                <div className="hidden sm:block col-span-2 text-right text-sm text-dark-400">
                  {coin.volume}
                </div>

                {/* Trade button */}
                <div className="hidden sm:flex col-span-2 justify-end">
                  <a
                    href={botLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-medium text-apex-400 hover:text-apex-300 transition-colors px-3 py-1.5 rounded-lg border border-apex-500/20 hover:border-apex-500/40 hover:bg-apex-500/5 group-hover:border-apex-500/40"
                  >
                    Trade
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}

          {/* Empty state */}
          {!loading && coins.length === 0 && (
            <div className="px-5 py-12 text-center text-dark-500">
              No data available. Try another tab.
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-6">
          <a
            href={CONFIG.telegram.apexBot}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-apex-400 hover:text-apex-300 transition-colors font-medium"
          >
            Trade all these tokens on ApexFlash via Telegram
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
