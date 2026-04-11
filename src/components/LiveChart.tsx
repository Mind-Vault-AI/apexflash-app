'use client';

import { useEffect, useRef, useState } from 'react';
import { BarChart3, ArrowUpRight, ExternalLink } from 'lucide-react';
import { CONFIG } from '@/lib/config';

const PAIRS = [
  { symbol: 'SOLUSDT',  label: 'SOL/USDT',  emoji: '💜', exchange: 'BINANCE' },
  { symbol: 'BTCUSDT',  label: 'BTC/USDT',  emoji: '🟠', exchange: 'BINANCE' },
  { symbol: 'ETHUSDT',  label: 'ETH/USDT',  emoji: '🔷', exchange: 'BINANCE' },
  { symbol: 'BONKUSDT', label: 'BONK/USDT', emoji: '🐕', exchange: 'BINANCE' },
  { symbol: 'JUPUSDT',  label: 'JUP/USDT',  emoji: '🪐', exchange: 'BINANCE' },
  { symbol: 'WIFUSDT',  label: 'WIF/USDT',  emoji: '🐶', exchange: 'BINANCE' },
  { symbol: 'RAYUSDT',  label: 'RAY/USDT',  emoji: '⚡', exchange: 'BINANCE' },
];

const INTERVALS = [
  { label: '15m', value: '15' },
  { label: '1h',  value: '60' },
  { label: '4h',  value: '240' },
  { label: '1D',  value: 'D' },
];

export default function LiveChart() {
  const [pair, setPair]         = useState(PAIRS[0]);
  const [interval, setInterval] = useState('60');
  const containerRef            = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'tradingview-widget-container';
    wrapper.style.cssText = 'height:100%;width:100%';

    const chartDiv = document.createElement('div');
    chartDiv.className = 'tradingview-widget-container__widget';
    chartDiv.style.cssText = 'height:100%;width:100%';
    wrapper.appendChild(chartDiv);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    // textContent is safe for script config — this is TradingView's official embed method
    script.textContent = JSON.stringify({
      autosize:            true,
      symbol:              `${pair.exchange}:${pair.symbol}`,
      interval:            interval,
      timezone:            'Etc/UTC',
      theme:               'dark',
      style:               '1',
      locale:              'en',
      backgroundColor:     'rgba(10, 10, 15, 1)',
      gridColor:           'rgba(255, 255, 255, 0.04)',
      withdateranges:      true,
      hide_side_toolbar:   false,
      allow_symbol_change: false,
      save_image:          false,
      details:             true,
      hotlist:             false,
      calendar:            false,
      show_popup_button:   false,
      support_host:        'https://www.tradingview.com',
    });

    wrapper.appendChild(script);
    containerRef.current.appendChild(wrapper);
  }, [pair, interval]);

  return (
    <section id="live-chart" className="py-12 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-4">
            <BarChart3 className="w-4 h-4" />
            <span>Live Charts</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3">
            Real-Time Market View
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto">
            Live Solana &amp; crypto charts. Whale alerts fire when these charts get interesting.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap justify-center gap-2">
            {PAIRS.map(p => (
              <button
                key={p.symbol}
                onClick={() => setPair(p)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  pair.symbol === p.symbol
                    ? 'bg-apex-500/20 text-apex-400 border border-apex-500/40'
                    : 'bg-dark-800/50 text-dark-400 border border-dark-700/30 hover:border-dark-600/60 hover:text-dark-200'
                }`}
              >
                <span>{p.emoji}</span>
                <span>{p.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-dark-800/50 border border-dark-700/30 rounded-lg p-1">
            {INTERVALS.map(iv => (
              <button
                key={iv.value}
                onClick={() => setInterval(iv.value)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  interval === iv.value
                    ? 'bg-apex-500/30 text-apex-300'
                    : 'text-dark-400 hover:text-dark-200'
                }`}
              >
                {iv.label}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden border border-dark-700/30" style={{ height: 520 }}>
          <div ref={containerRef} className="w-full h-full" />
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 flex-wrap">
          <a
            href={CONFIG.telegram.apexBot}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-apex-400 hover:text-apex-300 text-sm font-medium transition-colors"
          >
            Get AI whale alerts on these pairs
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href={`https://www.tradingview.com/chart/?symbol=BINANCE:${pair.symbol}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-dark-500 hover:text-dark-300 text-xs transition-colors"
          >
            Open full chart
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
