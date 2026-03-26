import { NextResponse } from 'next/server';

const UPSTASH_URL = process.env.UPSTASH_REDIS_URL || process.env.REDIS_URL || '';

async function getRedisListRange(key: string, start: number, stop: number): Promise<string[]> {
  if (!UPSTASH_URL) return [];
  try {
    const url = new URL(UPSTASH_URL.replace('rediss://', 'https://'));
    const host = url.hostname;
    const password = url.password;
    const restUrl = `https://${host}`;
    const resp = await fetch(`${restUrl}/lrange/${key}/${start}/${stop}`, {
      headers: { Authorization: `Bearer ${password}` },
      next: { revalidate: 30 },
    });
    if (resp.ok) {
      const data = await resp.json();
      return data.result || [];
    }
  } catch {
    // Silent fail
  }
  return [];
}

async function getRedisValue(key: string): Promise<string | null> {
  if (!UPSTASH_URL) return null;
  try {
    const url = new URL(UPSTASH_URL.replace('rediss://', 'https://'));
    const host = url.hostname;
    const password = url.password;
    const restUrl = `https://${host}`;
    const resp = await fetch(`${restUrl}/get/${key}`, {
      headers: { Authorization: `Bearer ${password}` },
      next: { revalidate: 30 },
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

export async function GET() {
  // Get recent trades from Redis
  const recentRaw = await getRedisListRange('winrate:recent', 0, 19);
  const trades = recentRaw.map(raw => {
    try { return JSON.parse(raw); } catch { return null; }
  }).filter(Boolean);

  // Get win rate stats
  const total = parseInt(await getRedisValue('winrate:total_trades') || '0');
  const wins = parseInt(await getRedisValue('winrate:wins') || '0');
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;
  const totalPnl = parseFloat(await getRedisValue('winrate:total_pnl_sol') || '0');

  return NextResponse.json({
    trades,
    stats: { total, wins, winRate, totalPnl: Math.round(totalPnl * 10000) / 10000 },
  });
}
