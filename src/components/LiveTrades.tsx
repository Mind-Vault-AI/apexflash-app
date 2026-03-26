'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { CONFIG } from '@/lib/config';

interface Trade {
  token: string;
  pnl_pct: number;
  pnl_sol: number;
  win: boolean;
  ts: string;
}

interface TradeStats {
  total: number;
  wins: number;
  winRate: number;
  totalPnl: number;
}

// No fake data — show real trades only, or "no trades yet" message

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function LiveTrades() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [stats, setStats] = useState<TradeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrades() {
      try {
        const res = await fetch('/api/trades');
        if (res.ok) {
          const data = await res.json();
          setTrades(data.trades || []);
          if (data.stats) setStats(data.stats);
        }
      } catch {
        // Silent
      }
      setLoading(false);
    }
    fetchTrades();
    const interval = setInterval(fetchTrades, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="live-trades" className="py-12 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-4">
            <Activity className="w-4 h-4" />
            <span>Live Trades</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Real Results — <span className="gradient-text">Verified On-Chain</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto">
            Every trade is tracked. Every result is public. No hiding.
          </p>
        </div>

        {/* Stats Bar — only show with real data */}
        {stats && stats.total > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="glass-card rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-xs text-dark-400">Total Trades</div>
            </div>
            <div className="glass-card rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-emerald-400">{stats.winRate}%</div>
              <div className="text-xs text-dark-400">Win Rate</div>
            </div>
            <div className="glass-card rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-white">{stats.wins}</div>
              <div className="text-xs text-dark-400">Winning Trades</div>
            </div>
            <div className="glass-card rounded-xl p-3 text-center">
              <div className={`text-2xl font-bold ${stats.totalPnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {stats.totalPnl >= 0 ? '+' : ''}{stats.totalPnl.toFixed(4)} SOL
              </div>
              <div className="text-xs text-dark-400">Total P/L</div>
            </div>
          </div>
        )}

        {/* Trades Feed — real data only */}
        {loading ? (
          <div className="text-center py-8 text-dark-400">Loading trades...</div>
        ) : trades.length === 0 ? (
          <div className="glass-card rounded-xl p-6 text-center">
            <p className="text-dark-300 mb-2">No trades recorded yet</p>
            <p className="text-sm text-dark-500">Trades appear here in real-time as they happen on the platform</p>
          </div>
        ) : null}

        <div className="space-y-2">
          {trades.slice(0, 10).map((trade, i) => (
            <div
              key={`${trade.token}-${i}`}
              className="glass-card rounded-xl p-3 sm:p-4 flex items-center justify-between hover:border-dark-600/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  trade.win ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {trade.win
                    ? <TrendingUp className="w-4 h-4 text-green-400" />
                    : <TrendingDown className="w-4 h-4 text-red-400" />
                  }
                </div>
                <div>
                  <span className="font-semibold text-white">{trade.token}</span>
                  <span className="text-xs text-dark-500 ml-2">{timeAgo(trade.ts)}</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${trade.win ? 'text-emerald-400' : 'text-red-400'}`}>
                  {trade.pnl_pct >= 0 ? '+' : ''}{trade.pnl_pct.toFixed(1)}%
                </div>
                <div className="text-xs text-dark-500">
                  {trade.pnl_sol >= 0 ? '+' : ''}{trade.pnl_sol.toFixed(4)} SOL
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <a
            href={CONFIG.telegram.apexBot}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Start Trading Free
          </a>
        </div>
      </div>
    </section>
  );
}
