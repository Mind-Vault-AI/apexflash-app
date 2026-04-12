import { NextRequest, NextResponse } from 'next/server';
import { getExchange } from '@/lib/affiliates';

const UPSTASH_URL = process.env.REDIS_URL || '';

async function recordClick(slug: string, ip: string, userAgent: string, referer: string) {
  if (!UPSTASH_URL) return;

  try {
    const url = new URL(UPSTASH_URL.replace('rediss://', 'https://'));
    const host = url.hostname;
    const password = url.password;

    const entry = JSON.stringify({
      slug,
      timestamp: new Date().toISOString(),
      ip,
      userAgent,
      referer,
    });

    await fetch(`https://${host}/lpush/affiliate:clicks:${slug}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${password}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([entry]),
    });
  } catch {
    // Non-critical — don't block redirect
  }
}

export async function GET(
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
  console.log(`[AFFILIATE] Click: ${slug} | From: ${referer} → ${exchange.affiliateUrl}`);

  return NextResponse.redirect(exchange.affiliateUrl, { status: 302 });
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
