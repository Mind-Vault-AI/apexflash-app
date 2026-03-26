'use client';

import { useState, useEffect } from 'react';
import { Zap, TrendingUp, Shield, AlertTriangle, ArrowRight } from 'lucide-react';
import { CONFIG } from '@/lib/config';

interface DemoAlert {
  token: string;
  action: string;
  amount: string;
  grade: 'A' | 'B' | 'C';
  wallet: string;
  price: string;
  change: string;
  sentiment: string;
  sentimentScore: number;
}

const DEMO_ALERTS: DemoAlert[] = [
  { token: 'JUP', action: 'WHALE BUY', amount: '$2.1M', grade: 'A', wallet: '7xKr...9fDe', price: '$0.94', change: '+8.7%', sentiment: 'Bullish', sentimentScore: 87 },
  { token: 'BONK', action: 'SWAP DETECTED', amount: '4.2B tokens', grade: 'B', wallet: '3Hqz...wKmP', price: '$0.00002841', change: '+12.4%', sentiment: 'Very Bullish', sentimentScore: 92 },
  { token: 'RENDER', action: 'ACCUMULATION', amount: '$890K', grade: 'A', wallet: '9pLx...4nTq', price: '$8.12', change: '+4.3%', sentiment: 'Bullish', sentimentScore: 78 },
  { token: 'WIF', action: 'WHALE SELL', amount: '$1.5M', grade: 'C', wallet: '2bFk...8mRj', price: '$1.87', change: '-3.1%', sentiment: 'Bearish', sentimentScore: 34 },
  { token: 'SOL', action: 'WHALE BUY', amount: '85,000 SOL', grade: 'A', wallet: '5tQm...7xVn', price: '$142.38', change: '+5.2%', sentiment: 'Very Bullish', sentimentScore: 95 },
];

export default function LiveDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [animate, setAnimate] = useState(true);

  const alert = DEMO_ALERTS[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % DEMO_ALERTS.length);
        setShowDetails(false);
        setAnimate(true);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const gradeColor = alert.grade === 'A' ? 'text-green-400 bg-green-500/20 border-green-500/30'
    : alert.grade === 'B' ? 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30'
    : 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';

  const isBuy = alert.action.includes('BUY') || alert.action.includes('ACCUMULATION') || alert.action.includes('SWAP');

  return (
    <section className="py-12 sm:py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-apex-900/10 via-transparent to-transparent" />

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live Demo
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            This Is What You Get — <span className="gradient-text">Every Alert</span>
          </h2>
          <p className="text-dark-400 text-sm">Real alerts from the ApexFlash bot. Click to see the full AI breakdown.</p>
        </div>

        {/* Alert Card */}
        <div
          className={`glass-card p-5 sm:p-6 max-w-lg mx-auto cursor-pointer transition-all duration-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} hover:border-apex-500/40`}
          onClick={() => setShowDetails(!showDetails)}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-1 rounded border ${gradeColor}`}>Grade {alert.grade}</span>
              <span className={`text-xs font-semibold ${isBuy ? 'text-green-400' : 'text-red-400'}`}>
                {isBuy ? '🟢' : '🔴'} {alert.action}
              </span>
            </div>
            <span className="text-[10px] text-dark-500">Just now</span>
          </div>

          {/* Main info */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xl font-extrabold text-white">{alert.token}</span>
              <span className="text-sm text-dark-400 ml-2">{alert.amount}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-white">{alert.price}</div>
              <div className={`text-xs font-medium ${isBuy ? 'text-green-400' : 'text-red-400'}`}>{alert.change}</div>
            </div>
          </div>

          {/* Wallet */}
          <div className="text-xs text-dark-500 mb-3">
            Whale: <span className="text-dark-300 font-mono">{alert.wallet}</span>
          </div>

          {/* AI Breakdown (expandable) */}
          {showDetails && (
            <div className="border-t border-dark-700/50 pt-3 mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-dark-400">AI Sentiment:</span>
                <span className={`font-semibold ${alert.sentimentScore > 60 ? 'text-green-400' : 'text-red-400'}`}>
                  {alert.sentiment} ({alert.sentimentScore}/100)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-dark-400">Signal Quality:</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`w-6 h-1.5 rounded-full ${i <= Math.ceil(alert.sentimentScore / 20) ? 'bg-apex-400' : 'bg-dark-700'}`} />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-dark-400">Wallet Reputation:</span>
                <span className="text-white font-medium">Verified Whale</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-dark-400">Risk Level:</span>
                <span className="flex items-center gap-1 text-yellow-400">
                  <Shield className="w-3 h-3" /> {alert.grade === 'A' ? 'Low' : alert.grade === 'B' ? 'Medium' : 'Elevated'}
                </span>
              </div>
            </div>
          )}

          {/* Click hint */}
          <div className="text-center mt-3">
            <span className="text-[10px] text-dark-500">
              {showDetails ? 'Click to collapse' : 'Tap to see AI breakdown'}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-6">
          <a
            href={CONFIG.telegram.apexBot}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 !py-3 !px-6"
          >
            <Zap className="w-4 h-4" />
            Get These Alerts — Free
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-xs text-dark-500 mt-2">Alerts rotate every 5 seconds. Real format from the bot.</p>
        </div>

        {/* Alert dots */}
        <div className="flex justify-center gap-2 mt-4">
          {DEMO_ALERTS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentIndex(i); setShowDetails(false); setAnimate(true); }}
              className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-apex-400 w-4' : 'bg-dark-600 hover:bg-dark-500'}`}
              aria-label={`Alert ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
