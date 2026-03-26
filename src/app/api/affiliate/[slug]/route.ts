import { NextRequest, NextResponse } from 'next/server';
import { getExchange } from '@/lib/affiliates';

const REDIS_URL = process.env.UPSTASH_REDIS_URL || process.env.KV_URL || '';
const REDIS_TOKEN = process.env.UPSTASH_REDIS_TOKEN || process.env.KV_REST_API_TOKEN || '';

async function recordClick(slug: string, ip: string, userAgent: string, referer: string) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    console.warn('[AFFILIATE] No Redis config — click not persisted');
    return;
  }

  const baseUrl = REDIS_URL.startsWith('http') ? REDIS_URL : `https://${REDIS_URL}`;
  const entry = JSON.stringify({ slug, ts: Date.now(), ip, ua: userAgent, ref: referer });

  try {
    // Increment total counter + append to log (keep last 1000)
    await fetch(`${baseUrl}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['HINCRBY', 'affiliate:clicks', slug, 1],
        ['LPUSH', `affiliate:log:${slug}`, entry],
        ['LTRIM', `affiliate:log:${slug}`, 0, 999],
      ]),
    });
  } catch (error) {
    console.error('[AFFILIATE] Redis error:', error);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const exchange = getExchange(slug);

  if (!exchange) {
    return NextResponse.json({ error: 'Unknown exchange' }, { status: 404 });
  }

  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const referer = request.headers.get('referer') || 'direct';

  await recordClick(slug, ip, userAgent, referer);
  console.log(`[AFFILIATE] Click: ${slug} | From: ${referer}`);

  return NextResponse.json({ tracked: true, exchange: slug });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!REDIS_URL || !REDIS_TOKEN) return NextResponse.json({ clicks: 0 });

  const baseUrl = REDIS_URL.startsWith('http') ? REDIS_URL : `https://${REDIS_URL}`;

  try {
    const res = await fetch(`${baseUrl}/hget/affiliate:clicks/${slug}`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    });
    const data = await res.json();
    return NextResponse.json({ slug, clicks: parseInt(data.result || '0', 10) });
  } catch {
    return NextResponse.json({ slug, clicks: 0 });
  }
}
