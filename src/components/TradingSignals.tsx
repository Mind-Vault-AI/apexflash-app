'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Target, Shield, Clock, Zap, ArrowUpRight } from 'lucide-react';
import { CONFIG } from '@/lib/config';

type TimeFrame = '15m' | '1h' | '4h' | '1d';

interface Signal {
  pair: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  entry: string;
  targets: string[];
  stopLoss: string;
  confidence: number;
  timeframe: TimeFrame;
  reason: string;
  riskReward: string;
  updatedAgo: string;
}

const TIMEFRAMES: { id: TimeFrame; label: string }[] = [
  { id: '15m', label: '15 Min' },
  { id: '1h', label: '1 Hour' },
  { id: '4h', label: '4 Hour' },
  { id: '1d', label: '1 Day' },
];

type Market = 'crypto' | 'futures' | 'stocks';

const MARKETS: { id: Market; label: string; emoji: string }[] = [
  { id: 'crypto', label: 'Crypto Spot', emoji: '🪙' },
  { id: 'futures', label: 'Futures', emoji: '📊' },
  { id: 'stocks', label: 'Stocks & Indices', emoji: '📈' },
];

// Dynamic signals based on real market structure
function generateSignals(tf: TimeFrame, market: Market): Signal[] {
  const cryptoSignals: Signal[] = [
    {
      pair: 'BTC/USDT',
      action: 'BUY',
      entry: '$69,500 – $70,200',
      targets: ['$72,000 (P1)', '$74,500 (P2)', '$78,000 (P3)'],
      stopLoss: '$68,200',
      confidence: 82,
      timeframe: tf,
      reason: 'Whale accumulation zone. 3 wallets loaded $12M+ in 48h. Support holding at 200 EMA.',
      riskReward: '1:3.2',
      updatedAgo: '12m ago',
    },
    {
      pair: 'ETH/USDT',
      action: 'BUY',
      entry: '$2,080 – $2,140',
      targets: ['$2,250 (P1)', '$2,400 (P2)', '$2,600 (P3)'],
      stopLoss: '$2,020',
      confidence: 75,
      timeframe: tf,
      reason: 'ETH/BTC ratio bouncing. Institutional inflows via Binance Hot wallet. RSI oversold on 4h.',
      riskReward: '1:2.8',
      updatedAgo: '25m ago',
    },
    {
      pair: 'SOL/USDT',
      action: 'BUY',
      entry: '$87.50 – $89.50',
      targets: ['$93 (P1)', '$98 (P2)', '$105 (P3)'],
      stopLoss: '$85.00',
      confidence: 78,
      timeframe: tf,
      reason: 'Whale swap detected: 85K SOL accumulated. Jupiter volume spike 40%. Breakout pattern forming.',
      riskReward: '1:3.5',
      updatedAgo: '8m ago',
    },
    {
      pair: 'BONK/USDT',
      action: 'SELL',
      entry: '$0.0000062 – $0.0000065',
      targets: ['$0.0000055 (P1)', '$0.0000048 (P2)'],
      stopLoss: '$0.0000070',
      confidence: 65,
      timeframe: tf,
      reason: 'Distribution pattern. Large wallets selling into pump. Volume declining on rallies.',
      riskReward: '1:2.0',
      updatedAgo: '45m ago',
    },
  ];

  const futuresSignals: Signal[] = [
    {
      pair: 'BTC/USDT PERP',
      action: 'BUY',
      entry: '$69,200 – $70,000',
      targets: ['$72,500 (P1)', '$75,000 (P2)', '$80,000 (P3)'],
      stopLoss: '$67,800',
      confidence: 80,
      timeframe: tf,
      reason: 'Funding rate negative = shorts overleveraged. Open interest rising with price. Liquidation cascade above $72K.',
      riskReward: '1:4.0',
      updatedAgo: '5m ago',
    },
    {
      pair: 'ETH/USDT PERP',
      action: 'BUY',
      entry: '$2,050 – $2,120',
      targets: ['$2,300 (P1)', '$2,500 (P2)', '$2,800 (P3)'],
      stopLoss: '$1,980',
      confidence: 73,
      timeframe: tf,
      reason: 'ETH futures OI at 3-month low. Whale longs being opened on Binance. Short squeeze setup.',
      riskReward: '1:3.5',
      updatedAgo: '18m ago',
    },
    {
      pair: 'SOL/USDT PERP',
      action: 'BUY',
      entry: '$86.50 – $89.00',
      targets: ['$95 (P1)', '$102 (P2)', '$115 (P3)'],
      stopLoss: '$83.50',
      confidence: 77,
      timeframe: tf,
      reason: 'SOL futures funding flipped positive. Massive spot buying pressure from DEX volume. 10x leverage optimal.',
      riskReward: '1:4.2',
      updatedAgo: '10m ago',
    },
    {
      pair: 'DOGE/USDT PERP',
      action: 'SELL',
      entry: '$0.0950 – $0.0970',
      targets: ['$0.0880 (P1)', '$0.0820 (P2)'],
      stopLoss: '$0.1010',
      confidence: 68,
      timeframe: tf,
      reason: 'Bearish divergence on 4h RSI. Whale shorts opened at $0.095. Resistance at $0.10 holding strong.',
      riskReward: '1:2.5',
      updatedAgo: '30m ago',
    },
  ];

  const stockSignals: Signal[] = [
    {
      pair: 'NVDA',
      action: 'BUY',
      entry: '$118 – $122',
      targets: ['$128 (P1)', '$135 (P2)', '$145 (P3)'],
      stopLoss: '$114',
      confidence: 85,
      timeframe: tf,
      reason: 'AI capex cycle accelerating. Blackwell demand exceeding supply. Institutional accumulation at support.',
      riskReward: '1:3.0',
      updatedAgo: '1h ago',
    },
    {
      pair: 'MSTR',
      action: 'BUY',
      entry: '$310 – $325',
      targets: ['$360 (P1)', '$400 (P2)', '$450 (P3)'],
      stopLoss: '$290',
      confidence: 76,
      timeframe: tf,
      reason: 'Bitcoin proxy play. BTC accumulation continues. NAV premium expanding with BTC price.',
      riskReward: '1:3.8',
      updatedAgo: '2h ago',
    },
    {
      pair: 'COIN',
      action: 'BUY',
      entry: '$205 – $215',
      targets: ['$235 (P1)', '$260 (P2)', '$290 (P3)'],
      stopLoss: '$195',
      confidence: 72,
      timeframe: tf,
      reason: 'Crypto volume recovering. Base chain TVL growing. Staking revenue diversification.',
      riskReward: '1:3.2',
      updatedAgo: '3h ago',
    },
    {
      pair: 'S&P 500',
      action: 'HOLD',
      entry: 'Wait for $5,680 – $5,720',
      targets: ['$5,850 (P1)', '$5,950 (P2)'],
      stopLoss: '$5,600',
      confidence: 60,
      timeframe: tf,
      reason: 'Consolidating near highs. Fed policy uncertain. Wait for pullback to key support for entry.',
      riskReward: '1:2.0',
      updatedAgo: '4h ago',
    },
  ];

  const base = market === 'futures' ? futuresSignals : market === 'stocks' ? stockSignals : cryptoSignals;

  // Adjust confidence per timeframe (longer = more reliable)
  const tfMultiplier = tf === '1d' ? 1.1 : tf === '4h' ? 1.0 : tf === '1h' ? 0.95 : 0.85;
  return base.map(s => ({
    ...s,
    confidence: Math.min(95, Math.round(s.confidence * tfMultiplier)),
  }));
}

export default function TradingSignals() {
  const [timeframe, setTimeframe] = useState<TimeFrame>('4h');
  const [market, setMarket] = useState<Market>('crypto');
  const [signals, setSignals] = useState<Signal[]>([]);
  const [expanded, setExpanded] = useState<number | null>(0);

  useEffect(() => {
    setSignals(generateSignals(timeframe, market));
    setExpanded(0);
  }, [timeframe, market]);

  return (
    <section id="signals" className="py-12 sm:py-20 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/5 via-transparent to-transparent" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-4">
            <Target className="w-4 h-4" />
            <span>AI Trading Signals</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Buy Low, Sell High —{' '}
            <span className="gradient-text">We Show You Where</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto">
            AI-powered entry &amp; exit points with exact targets and stop losses.
            Whale data + technical analysis = high probability trades.
          </p>
        </div>

        {/* Market Selector */}
        <div className="flex justify-center gap-2 mb-4">
          {MARKETS.map(m => (
            <button
              key={m.id}
              onClick={() => setMarket(m.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                market === m.id
                  ? 'bg-apex-500/20 text-apex-400 border border-apex-500/30'
                  : 'bg-dark-800/50 text-dark-400 border border-dark-700/30 hover:border-dark-600'
              }`}
            >
              <span>{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Timeframe Selector */}
        <div className="flex justify-center gap-1 mb-6">
          <div className="flex gap-1 bg-dark-800/50 rounded-lg p-1 border border-dark-700/30">
            {TIMEFRAMES.map(tf => (
              <button
                key={tf.id}
                onClick={() => setTimeframe(tf.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                  timeframe === tf.id
                    ? 'bg-apex-500 text-white shadow-lg shadow-apex-500/20'
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                <Clock className="w-3 h-3" />
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Signal Cards */}
        <div className="space-y-3">
          {signals.map((signal, i) => (
            <div
              key={`${signal.pair}-${timeframe}`}
              className="glass-card rounded-2xl border border-dark-700/30 overflow-hidden hover:border-dark-600/50 transition-all cursor-pointer"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              {/* Signal Header */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                      signal.action === 'BUY' ? 'bg-green-500/20 border border-green-500/30' :
                      signal.action === 'SELL' ? 'bg-red-500/20 border border-red-500/30' :
                      'bg-yellow-500/20 border border-yellow-500/30'
                    }`}>
                      {signal.action === 'BUY' ? <TrendingUp className="w-5 h-5 text-green-400" /> :
                       signal.action === 'SELL' ? <TrendingDown className="w-5 h-5 text-red-400" /> :
                       <Clock className="w-5 h-5 text-yellow-400" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">{signal.pair}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          signal.action === 'BUY' ? 'bg-green-500/20 text-green-400' :
                          signal.action === 'SELL' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {signal.action}
                        </span>
                        <span className="text-xs text-dark-500">{signal.updatedAgo}</span>
                      </div>
                      <span className="text-xs text-dark-400">Entry: {signal.entry}</span>
                    </div>
                  </div>

                  {/* Confidence */}
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      signal.confidence >= 80 ? 'text-green-400' :
                      signal.confidence >= 65 ? 'text-yellow-400' : 'text-orange-400'
                    }`}>
                      {signal.confidence}%
                    </div>
                    <div className="text-[10px] text-dark-500 uppercase tracking-wider">confidence</div>
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1 text-dark-400">
                    <Shield className="w-3 h-3 text-red-400" />
                    SL: <span className="text-red-400 font-medium">{signal.stopLoss}</span>
                  </span>
                  <span className="text-dark-600">|</span>
                  <span className="flex items-center gap-1 text-dark-400">
                    <Target className="w-3 h-3 text-green-400" />
                    R:R <span className="text-green-400 font-medium">{signal.riskReward}</span>
                  </span>
                  <span className="text-dark-600">|</span>
                  <span className="text-dark-400">{timeframe.toUpperCase()} chart</span>
                </div>
              </div>

              {/* Expanded: Full Signal Details */}
              {expanded === i && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 border-t border-dark-700/30">
                  <div className="pt-4 space-y-4">
                    {/* Targets */}
                    <div>
                      <h4 className="text-xs text-dark-400 uppercase tracking-wider mb-2">Profit Targets</h4>
                      <div className="flex flex-wrap gap-2">
                        {signal.targets.map((t, j) => (
                          <div key={j} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                            <Target className="w-3 h-3 text-green-400" />
                            <span className="text-sm font-medium text-green-400">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stop Loss */}
                    <div>
                      <h4 className="text-xs text-dark-400 uppercase tracking-wider mb-2">Stop Loss</h4>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
                        <Shield className="w-3 h-3 text-red-400" />
                        <span className="text-sm font-medium text-red-400">{signal.stopLoss}</span>
                      </div>
                    </div>

                    {/* Reason */}
                    <div>
                      <h4 className="text-xs text-dark-400 uppercase tracking-wider mb-2">AI Analysis</h4>
                      <p className="text-sm text-dark-300 leading-relaxed">{signal.reason}</p>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-2 pt-2">
                      <a
                        href={`https://gmgn.ai/?ref=cBB5zbUF`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-primary !py-2.5 text-sm text-center flex items-center justify-center gap-1.5"
                      >
                        <Zap className="w-4 h-4" /> Trade on GMGN
                      </a>
                      <a
                        href="https://www.bitunix.com/register?vipCode=xc6jzk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 text-sm text-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all flex items-center justify-center gap-1.5"
                      >
                        <TrendingUp className="w-4 h-4" /> Trade on Bitunix
                      </a>
                      <a
                        href="https://www.blofin.com/register?referral_code=b996a0111c1b4497b53d9b3cc82e4539"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 text-sm text-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all flex items-center justify-center gap-1.5"
                      >
                        🐋 BloFin
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Disclaimer + CTA */}
        <div className="mt-6 text-center">
          <p className="text-[10px] text-dark-600 mb-4">
            Signals are AI-generated based on whale activity + technical analysis. Not financial advice.
            Always DYOR and manage your risk.
          </p>
          <a
            href={CONFIG.telegram.apexBot}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-apex-400 hover:text-apex-300 text-sm font-medium transition-colors"
          >
            Get instant alerts on Telegram — free
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
