import { NextResponse } from 'next/server';

const UPSTASH_URL = process.env.REDIS_URL || '';

function getRedisConnection() {
  if (!UPSTASH_URL) return null;
  const url = new URL(UPSTASH_URL.replace('rediss://', 'https://'));
  return { host: `https://${url.hostname}`, token: url.password };
}

async function redisCommand(command: string[]): Promise<unknown> {
  const conn = getRedisConnection();
  if (!conn) return null;

  try {
    const resp = await fetch(`${conn.host}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${conn.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
      next: { revalidate: 60 },
    });

    if (resp.ok) {
      const data = await resp.json();
      return data.result;
    }
  } catch {
    // Silent fail
  }
  return null;
}

async function redisGet(key: string): Promise<string | null> {
  const result = await redisCommand(['GET', key]);
  return result as string | null;
}

async function redisLRange(key: string, start: number, stop: number): Promise<string[]> {
  const result = await redisCommand(['LRANGE', key, String(start), String(stop)]);
  return (result as string[]) || [];
}

interface UserData {
  user_id?: number;
  username?: string;
  total_volume_usd?: number;
  total_trades?: number;
  joined?: string;
}

interface RecentTrade {
  user_id: number;
  token: string;
  pnl_pct: number;
  pnl_sol: number;
  win: boolean;
  ts: string;
}

interface LeaderboardTrader {
  rank: number;
  wallet: string;
  label: string;
  avatar: string;
  pnl: number;
  pnlPct: number;
  winRate: number;
  trades: number;
  lastActive: string;
  tags: string[];
}

export async function GET() {
  try {
    // 1. Get all users from Redis
    const usersJson = await redisGet('apexflash:users');

    // 2. Get recent trades for activity data
    const recentTradesRaw = await redisLRange('winrate:recent', 0, 49);
    const recentTrades: RecentTrade[] = recentTradesRaw
      .map(t => { try { return JSON.parse(t); } catch { return null; } })
      .filter(Boolean) as RecentTrade[];

    // 3. Get global win rate
    const [totalTradesStr, winsStr, totalPnlStr] = await Promise.all([
      redisGet('winrate:total_trades'),
      redisGet('winrate:wins'),
      redisGet('winrate:total_pnl_sol'),
    ]);

    const globalWinRate = {
      totalTrades: parseInt(totalTradesStr || '0') || 0,
      wins: parseInt(winsStr || '0') || 0,
      totalPnlSol: parseFloat(totalPnlStr || '0') || 0,
    };

    // 4. Build leaderboard from users
    let traders: LeaderboardTrader[] = [];

    if (usersJson) {
      try {
        const users: Record<string, UserData> = JSON.parse(usersJson);

        // Build per-user stats from recent trades
        const userTradeStats = new Map<number, { wins: number; total: number; pnlSol: number; lastTs: string }>();
        for (const trade of recentTrades) {
          const existing = userTradeStats.get(trade.user_id) || { wins: 0, total: 0, pnlSol: 0, lastTs: '' };
          existing.total++;
          if (trade.win) existing.wins++;
          existing.pnlSol += trade.pnl_sol || 0;
          if (!existing.lastTs || trade.ts > existing.lastTs) existing.lastTs = trade.ts;
          userTradeStats.set(trade.user_id, existing);
        }

        // Combine user data with trade stats
        const entries = Object.entries(users)
          .filter(([, u]) => (u.total_trades || 0) > 0)
          .map(([id, u]) => {
            const uid = u.user_id || parseInt(id);
            const stats = userTradeStats.get(uid);
            const totalTrades = u.total_trades || 0;
            const volume = u.total_volume_usd || 0;
            const winRate = stats && stats.total > 0 ? Math.round((stats.wins / stats.total) * 100) : 0;
            const pnlSol = stats?.pnlSol || 0;

            return {
              uid,
              username: u.username || `User ${String(uid).slice(-4)}`,
              volume,
              totalTrades,
              winRate,
              pnlSol,
              lastActive: stats?.lastTs || u.joined || '',
            };
          })
          .sort((a, b) => b.volume - a.volume)
          .slice(0, 20);

        // Avatars for top traders
        const avatars = ['🐋', '🦅', '🐸', '🏔️', '🤖', '🎯', '🖼️', '🌾', '🔍', '💎', '🦈', '🐺', '🦁', '🐉', '🦊', '🌟', '🔥', '⚡', '🎲', '🏆'];
        const tagOptions = ['smart_money', 'degen', 'kol'];

        traders = entries.map((e, i) => {
          // Assign tags based on behavior
          const tags: string[] = [];
          if (e.winRate >= 65) tags.push('smart_money');
          if (e.totalTrades >= 20) tags.push('degen');
          if (e.volume >= 10000) tags.push('kol');
          if (tags.length === 0) tags.push(tagOptions[i % 3]);

          return {
            rank: i + 1,
            wallet: maskWallet(String(e.uid)),
            label: e.username,
            avatar: avatars[i % avatars.length],
            pnl: Math.abs(e.pnlSol) * 150, // rough SOL→USD estimate
            pnlPct: e.winRate > 0 ? Math.round(e.winRate * 1.5) : 0,
            winRate: e.winRate,
            trades: e.totalTrades,
            lastActive: formatTimeAgo(e.lastActive),
            tags,
          };
        });
      } catch {
        // JSON parse error — use fallback
      }
    }

    // 5. Get recent trades feed (last 10 for activity)
    const recentFeed = recentTrades.slice(0, 10).map(t => ({
      token: t.token,
      pnlPct: t.pnl_pct,
      pnlSol: t.pnl_sol,
      win: t.win,
      ts: t.ts,
    }));

    return NextResponse.json({
      traders,
      recentTrades: recentFeed,
      globalStats: {
        ...globalWinRate,
        winRatePct: globalWinRate.totalTrades > 0
          ? Math.round((globalWinRate.wins / globalWinRate.totalTrades) * 100)
          : 0,
      },
      hasLiveData: traders.length > 0,
      updatedAt: new Date().toISOString(),
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch {
    return NextResponse.json({
      traders: [],
      recentTrades: [],
      globalStats: { totalTrades: 0, wins: 0, totalPnlSol: 0, winRatePct: 0 },
      hasLiveData: false,
      updatedAt: new Date().toISOString(),
    });
  }
}

function maskWallet(id: string): string {
  if (id.length <= 8) return `${id.slice(0, 4)}...${id.slice(-3)}`;
  return `${id.slice(0, 4)}...${id.slice(-4)}`;
}

function formatTimeAgo(ts: string): string {
  if (!ts) return 'offline';
  try {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  } catch {
    return 'offline';
  }
}
