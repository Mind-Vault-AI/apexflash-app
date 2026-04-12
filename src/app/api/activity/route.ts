import { NextResponse } from 'next/server';

const UPSTASH_URL = process.env.REDIS_URL || '';

async function redis(cmd: string): Promise<unknown> {
  if (!UPSTASH_URL) return null;
  try {
    const url = new URL(UPSTASH_URL.replace('rediss://', 'https://'));
    const resp = await fetch(`https://${url.hostname}/${cmd}`, {
      headers: { Authorization: `Bearer ${url.password}` },
      next: { revalidate: 30 },
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    return data.result ?? null;
  } catch {
    return null;
  }
}

export async function GET() {
  const [heartbeat, gradeA, gradeS, positions, pdcaKeys] = await Promise.all([
    redis('get/apexflash:whale:heartbeat'),
    redis('get/kpi:grade:A:total'),
    redis('get/kpi:grade:S:total'),
    redis('get/apexflash:active_positions'),
    redis('keys/apexflash:pdca:signal:*'),
  ]);

  // Time since last scan
  let scanMinutesAgo: number | null = null;
  if (typeof heartbeat === 'string' || typeof heartbeat === 'number') {
    const ts = parseInt(String(heartbeat), 10);
    if (!isNaN(ts)) {
      scanMinutesAgo = Math.floor((Date.now() / 1000 - ts) / 60);
    }
  }

  // Active position count
  let activeCount = 0;
  if (typeof positions === 'string') {
    try {
      const parsed = JSON.parse(positions);
      activeCount = Object.keys(parsed).length;
    } catch { /* ignore */ }
  }

  // Signal counts
  const countA = parseInt(String(gradeA ?? '0'), 10) || 0;
  const countS = parseInt(String(gradeS ?? '0'), 10) || 0;

  // PDCA signal count (recent entries)
  const signalTotal = Array.isArray(pdcaKeys) ? pdcaKeys.length : 0;

  const payload = {
    scanMinutesAgo,
    activePositions: activeCount,
    gradeA: countA,
    gradeS: countS,
    totalSignals: signalTotal,
    updatedAt: new Date().toISOString(),
  };

  console.log('[/api/activity]', JSON.stringify({ ...payload, redis: !!UPSTASH_URL }));

  return NextResponse.json(payload, {
    headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' },
  });
}
