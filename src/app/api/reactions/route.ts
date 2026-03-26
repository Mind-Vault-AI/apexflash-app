import { NextRequest, NextResponse } from 'next/server';

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
      headers: { Authorization: `Bearer ${conn.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(command),
    });
    if (resp.ok) return (await resp.json()).result;
  } catch { /* silent */ }
  return null;
}

const VALID_REACTIONS = ['🔥', '🚀', '💎', '🐋', '😱', '🤑'];

// POST — add a reaction
export async function POST(request: NextRequest) {
  try {
    const { traderId, emoji } = await request.json();

    if (!traderId || !emoji) {
      return NextResponse.json({ error: 'traderId and emoji required' }, { status: 400 });
    }

    if (!VALID_REACTIONS.includes(emoji)) {
      return NextResponse.json({ error: 'Invalid emoji' }, { status: 400 });
    }

    // Increment reaction count: reactions:{traderId} hash field = emoji
    await redisCommand(['HINCRBY', `reactions:${traderId}`, emoji, '1']);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET — get reactions for a trader (or all)
export async function GET(request: NextRequest) {
  const traderId = request.nextUrl.searchParams.get('traderId');

  if (traderId) {
    const reactions = await redisCommand(['HGETALL', `reactions:${traderId}`]);
    const parsed: Record<string, number> = {};
    if (Array.isArray(reactions)) {
      for (let i = 0; i < reactions.length; i += 2) {
        parsed[reactions[i]] = parseInt(reactions[i + 1]) || 0;
      }
    }
    return NextResponse.json({ traderId, reactions: parsed });
  }

  return NextResponse.json({ reactions: VALID_REACTIONS });
}
