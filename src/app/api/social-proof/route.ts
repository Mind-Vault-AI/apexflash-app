import { NextResponse } from 'next/server';

const UPSTASH_URL = process.env.UPSTASH_REDIS_URL || process.env.REDIS_URL || '';

const CITIES = ['Amsterdam', 'London', 'Berlin', 'Dubai', 'Singapore', 'New York', 'Tokyo', 'Sydney'];
const NAMES = ['Thomas', 'Jan', 'Alex', 'Marco', 'David', 'Lucas', 'Mike', 'James', 'Felix', 'Max', 'Raj'];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

async function getRecentTrades(): Promise<Array<{ token: string; pnl_pct: number; win: boolean; ts: string }>> {
  if (!UPSTASH_URL) return [];
  try {
    const url = new URL(UPSTASH_URL.replace('rediss://', 'https://'));
    const restUrl = `https://${url.hostname}`;
    const resp = await fetch(`${restUrl}/lrange/winrate:recent/0/9`, {
      headers: { Authorization: `Bearer ${url.password}` },
      next: { revalidate: 60 },
    });
    if (!resp.ok) return [];
    const data = await resp.json();
    return (data.result || []).map((raw: string) => {
      try { return JSON.parse(raw); } catch { return null; }
    }).filter(Boolean);
  } catch {
    return [];
  }
}

export async function GET() {
  const trades = await getRecentTrades();

  const events = trades.slice(0, 8).map((t) => ({
    emoji: t.win ? '📈' : '📉',
    text: t.win
      ? `${randomItem(NAMES)} made +${Math.abs(t.pnl_pct).toFixed(1)}% on ${t.token}`
      : `${randomItem(NAMES)} exited ${t.token} (stop-loss triggered)`,
    time: timeAgo(t.ts),
  }));

  // Always pad with at least some generic live events
  if (events.length < 3) {
    events.push(
      { emoji: '🐋', text: `Whale alert fired — ${100 + Math.floor(Math.random() * 300)}+ users alerted`, time: 'just now' },
      { emoji: '🚀', text: `${randomItem(NAMES)} from ${randomItem(CITIES)} joined ApexFlash`, time: '3 min ago' },
    );
  }

  return NextResponse.json({ events });
}
