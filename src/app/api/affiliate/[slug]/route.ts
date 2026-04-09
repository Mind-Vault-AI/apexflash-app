import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getExchange } from '@/lib/affiliates';

const CLICKS_FILE = path.join(process.cwd(), 'data', 'affiliate_clicks.json');

interface ClickRecord {
  slug: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  referer: string;
}

async function recordClick(click: ClickRecord) {
  try {
    const dir = path.dirname(CLICKS_FILE);
    await fs.mkdir(dir, { recursive: true });

    let clicks: ClickRecord[] = [];
    try {
      const data = await fs.readFile(CLICKS_FILE, 'utf-8');
      clicks = JSON.parse(data);
    } catch {
      // File doesn't exist yet
    }

    clicks.push(click);
    await fs.writeFile(CLICKS_FILE, JSON.stringify(clicks, null, 2));
  } catch (error) {
    console.error('[AFFILIATE] Error recording click:', error);
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

  const click: ClickRecord = {
    slug,
    timestamp: new Date().toISOString(),
    ip: request.headers.get('x-forwarded-for') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    referer: request.headers.get('referer') || 'direct',
  };

  await recordClick(click);
  console.log(`[AFFILIATE] Click: ${slug} | From: ${click.referer}`);

  return NextResponse.json({ tracked: true, exchange: slug });
}
