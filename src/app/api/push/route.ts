import { NextRequest, NextResponse } from 'next/server';

const UPSTASH_URL = process.env.REDIS_URL || '';
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '';

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
    if (resp.ok) {
      const data = await resp.json();
      return data.result;
    }
  } catch { /* silent */ }
  return null;
}

// POST /api/push — subscribe or unsubscribe
export async function POST(request: NextRequest) {
  try {
    const { action, subscription } = await request.json();

    if (!subscription?.endpoint) {
      return NextResponse.json({ error: 'Subscription endpoint required' }, { status: 400 });
    }

    const subKey = Buffer.from(subscription.endpoint).toString('base64').slice(0, 64);

    if (action === 'subscribe') {
      // Store subscription in Redis
      await redisCommand(['HSET', 'push:subscriptions', subKey, JSON.stringify(subscription)]);
      console.log(`[PUSH] New subscription: ${subKey.slice(0, 16)}...`);
      return NextResponse.json({ success: true, message: 'Subscribed to whale alerts!' });
    }

    if (action === 'unsubscribe') {
      await redisCommand(['HDEL', 'push:subscriptions', subKey]);
      console.log(`[PUSH] Unsubscribed: ${subKey.slice(0, 16)}...`);
      return NextResponse.json({ success: true, message: 'Unsubscribed from push notifications' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('[PUSH] Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET /api/push — return VAPID public key + subscription count
export async function GET() {
  const count = await redisCommand(['HLEN', 'push:subscriptions']);
  return NextResponse.json({
    vapidPublicKey: VAPID_PUBLIC_KEY,
    subscribers: parseInt(String(count || '0')) || 0,
  });
}
