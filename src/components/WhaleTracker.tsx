'use client';

import { useState, useEffect } from 'react';
import { Activity, ExternalLink, Zap } from 'lucide-react';
import { CONFIG } from '@/lib/config';

interface WhaleAlert {
  id: number;
  chain: string;
  symbol: string;
  amount: string;
  usd: string;
  direction: 'IN' | 'OUT';
  wallet: string;
  sentiment: string;
  sentimentEmoji: string;
  time: string;
}

const SAMPLE_ALERTS: WhaleAlert[] = [
  { id: 1, chain: 'SOL', symbol: 'SOL', amount: '42,500', usd: '$6,035,500', direction: 'IN', wallet: 'Binance Hot', sentiment: 'Bullish', sentimentEmoji: '🟢', time: '2m ago' },
  { id: 2, chain: 'ETH', symbol: 'ETH', amount: '1,200', usd: '$3,942,000', direction: 'OUT', wallet: 'OKX Reserve', sentiment: 'Bearish', sentimentEmoji: '🔴', time: '5m ago' },
  { id: 3, chain: 'SOL', symbol: 'SOL', amount: '18,000', usd: '$2,562,600', direction: 'IN', wallet: 'Unknown Whale', sentiment: 'Bullish', sentimentEmoji: '🟢', time: '8m ago' },
  { id: 4, chain: 'ETH', symbol: 'ETH', amount: '850', usd: '$2,792,250', direction: 'IN', wallet: 'Bitfinex Cold', sentiment: 'Neutral', sentimentEmoji: '⚪', time: '12m ago' },
  { id: 5, chain: 'SOL', symbol: 'SOL', amount: '95,000', usd: '$13,526,100', direction: 'OUT', wallet: 'MEXC Reserve', sentiment: 'Bearish', sentimentEmoji: '🔴', time: '15m ago' },
  { id: 6, chain: 'SOL', symbol: 'SOL', amount: '28,300', usd: '$4,027,374', direction: 'IN', wallet: 'Gate.io Hot', sentiment: 'Bullish', sentimentEmoji: '🟢', time: '18m ago' },
  { id: 7, chain: 'ETH', symbol: 'ETH', amount: '2,100', usd: '$6,898,500', direction: 'IN', wallet: 'Kraken Cold', sentiment: 'Bullish', sentimentEmoji: '🟢', time: '22m ago' },
  { id: 8, chain: 'SOL', symbol: 'SOL', amount: '12,000', usd: '$1,708,560', direction: 'OUT', wallet: 'Bybit Reserve', sentiment: 'Neutral', sentimentEmoji: '⚪', time: '25m ago' },
];

export default function WhaleTracker() {
  const [alerts, setAlerts] = useState<WhaleAlert[]>(SAMPLE_ALERTS.slice(0, 5));
  const [pulse, setPulse] = useState(false);

  // Simulate new alerts coming in
  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(prev => {
        const pool = SAMPLE_ALERTS;
        const next = pool[Math.floor(Math.random() * pool.length)];
        const updated = { ...next, id: Date.now(), time: 'just now' };
        return [updated, ...prev.slice(0, 4)];
      });
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="whale-tracker" className="py-12 sm:py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-apex-500/10 border border-apex-500/20 text-apex-400 text-sm mb-4">
            <Activity className="w-4 h-4" />
            <span>Live Whale Feed</span>
            <span className={`w-2 h-2 rounded-full bg-green-500 ${pulse ? 'animate-ping' : ''}`} />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3">
            Real-Time Whale Movements
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto">
            Watch whale wallets move millions in real-time. Every alert includes
            <strong className="text-apex-400"> AI-powered sentiment analysis</strong> so you know if the market agrees.
          </p>
        </div>

        {/* Alert Feed */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-dark-300 uppercase tracking-wider">Latest Whale Alerts</h3>
            <span className="text-xs text-dark-400">Updates every 60s in bot</span>
          </div>

          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div
                key={`${alert.id}-${i}`}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all duration-500 ${
                  i === 0
                    ? 'bg-dark-800/80 border-apex-500/30 shadow-lg shadow-apex-500/5'
                    : 'bg-dark-900/50 border-dark-700/30'
                }`}
              >
                {/* Left: Direction + Amount */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                    alert.direction === 'IN'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {alert.direction === 'IN' ? '↗' : '↘'}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{alert.amount} {alert.symbol}</span>
                      <span className="text-xs text-dark-400">{alert.usd}</span>
                    </div>
                    <div className="text-xs text-dark-400 truncate">{alert.wallet} • {alert.chain}</div>
                  </div>
                </div>

                {/* Right: Sentiment + Time */}
                <div className="flex items-center gap-3 sm:gap-4 pl-11 sm:pl-0">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                    alert.sentiment === 'Bullish'
                      ? 'bg-green-500/10 text-green-400'
                      : alert.sentiment === 'Bearish'
                      ? 'bg-red-500/10 text-red-400'
                      : 'bg-dark-700/50 text-dark-300'
                  }`}>
                    <span>{alert.sentimentEmoji}</span>
                    <span>{alert.sentiment}</span>
                  </div>
                  <span className="text-xs text-dark-500 whitespace-nowrap">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={CONFIG.telegram.apexBot}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
          >
            <Zap className="w-4 h-4" />
            Get These Alerts Free on Telegram
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <p className="text-xs text-dark-500 mt-2">No signup required • Instant access • 30-second setup</p>
        </div>
      </div>
    </section>
  );
}
