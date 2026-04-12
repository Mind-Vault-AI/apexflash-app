'use client';

import { useEffect, useState } from 'react';
import { Activity, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

interface ActivityData {
  scanMinutesAgo: number | null;
  activePositions: number;
  gradeA: number;
  gradeS: number;
  totalSignals: number;
  updatedAt: string;
}

function Dot({ live }: { live: boolean }) {
  return (
    <span className="relative flex h-2 w-2">
      {live && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      )}
      <span className={`relative inline-flex rounded-full h-2 w-2 ${live ? 'bg-emerald-400' : 'bg-dark-600'}`} />
    </span>
  );
}

export default function LiveFeed() {
  const [data, setData] = useState<ActivityData | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchActivity() {
    try {
      const res = await fetch('/api/activity', { next: { revalidate: 0 } });
      if (res.ok) setData(await res.json());
    } catch {
      // silently ignore — show last known state
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchActivity();
    const id = setInterval(fetchActivity, 30_000);
    return () => clearInterval(id);
  }, []);

  const scannerLive =
    data?.scanMinutesAgo !== null && (data?.scanMinutesAgo ?? 999) < 10;

  const scanLabel = loading
    ? '…'
    : data?.scanMinutesAgo === null
    ? 'offline'
    : data.scanMinutesAgo === 0
    ? 'just now'
    : `${data.scanMinutesAgo}m ago`;

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Dot live={scannerLive} />
          <span className="text-xs font-semibold uppercase tracking-widest text-dark-400">
            Live Bot Activity
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Scanner status */}
          <div className="glass-card p-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-dark-400 text-xs">
              <Activity className="w-3.5 h-3.5" />
              Whale Scanner
            </div>
            <p className={`text-lg font-bold ${scannerLive ? 'text-emerald-400' : 'text-dark-500'}`}>
              {scannerLive ? 'Active' : loading ? '…' : 'Offline'}
            </p>
            <p className="text-xs text-dark-500">Last scan: {scanLabel}</p>
          </div>

          {/* Active positions */}
          <div className="glass-card p-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-dark-400 text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              Open Positions
            </div>
            <p className="text-lg font-bold text-apex-300">
              {loading ? '…' : data?.activePositions ?? 0}
            </p>
            <p className="text-xs text-dark-500">Bot is managing</p>
          </div>

          {/* Grade S signals */}
          <div className="glass-card p-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-dark-400 text-xs">
              <Zap className="w-3.5 h-3.5" />
              Grade S Signals
            </div>
            <p className="text-lg font-bold text-amber-400">
              {loading ? '…' : data?.gradeS ?? 0}
            </p>
            <p className="text-xs text-dark-500">≥5 smart degens</p>
          </div>

          {/* Grade A signals */}
          <div className="glass-card p-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-dark-400 text-xs">
              <TrendingUp className="w-3.5 h-3.5" />
              Grade A Signals
            </div>
            <p className="text-lg font-bold text-cyan-400">
              {loading ? '…' : data?.gradeA ?? 0}
            </p>
            <p className="text-xs text-dark-500">≥3 smart degens</p>
          </div>
        </div>

        <p className="text-center text-dark-600 text-xs mt-4">
          Live data from ApexFlash whale scanner · refreshes every 30s
        </p>
      </div>
    </section>
  );
}
