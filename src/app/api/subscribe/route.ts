import { NextRequest, NextResponse } from 'next/server';

/**
 * /api/subscribe — Email signup
 *
 * v3.22.8: Migrated to Upstash Redis (REST API).
 *   - Render/Vercel ephemeral disks lost subscribers.json on every deploy.
 *   - Now stored as Redis SET `apexflash:subscribers` (atomic dedup, O(1) count).
 *   - Local dev without REDIS_URL: in-memory shim (process-local, lost on restart)
 *     so the form remains testable without provisioning storage.
 */

const SUBSCRIBERS_KEY = 'apexflash:subscribers';
const UPSTASH_URL = process.env.REDIS_URL || process.env.UPSTASH_REDIS_URL || '';

// In-memory shim for local dev only — never used in production
const _devMemory: Set<string> = new Set();

// ── Upstash REST helper (matches /api/ceo/route.ts pattern) ────────────────
async function redis(command: string, ...args: (string | number)[]): Promise<unknown> {
  if (!UPSTASH_URL) return null;
  try {
    const url = new URL(UPSTASH_URL.replace('rediss://', 'https://'));
    const resp = await fetch(`https://${url.hostname}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${url.password}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([command, ...args]),
      cache: 'no-store',
    });
    if (resp.ok) {
      const data = await resp.json();
      return data.result;
    }
  } catch {
    // Caller handles null result
  }
  return null;
}

// ── POST: subscribe ─────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();

    if (UPSTASH_URL) {
      // Atomic dedup: SADD returns 1 if added, 0 if already member
      const added = await redis('SADD', SUBSCRIBERS_KEY, normalized);
      const count = (await redis('SCARD', SUBSCRIBERS_KEY)) as number | null;

      if (added === 0) {
        return NextResponse.json(
          { message: "You're already subscribed!" },
          { status: 200 },
        );
      }

      console.log(`[SUBSCRIBE] New subscriber: ${normalized} | Total: ${count ?? '?'}`);
      return NextResponse.json({
        message: 'Welcome to ApexFlash! Check your inbox soon.',
        count: count ?? 0,
      });
    }

    // ── Local-dev shim (no REDIS_URL configured) ───────────────────────────
    if (process.env.NODE_ENV !== 'development') {
      console.error('[SUBSCRIBE] REDIS_URL is not set in production — refusing to lose data');
      return NextResponse.json(
        { error: 'Subscription service is being updated — please try again shortly.' },
        { status: 503 },
      );
    }
    if (_devMemory.has(normalized)) {
      return NextResponse.json({ message: "You're already subscribed!" }, { status: 200 });
    }
    _devMemory.add(normalized);
    console.log(`[SUBSCRIBE] (dev-mem) New subscriber: ${normalized} | Total: ${_devMemory.size}`);
    return NextResponse.json({
      message: 'Welcome to ApexFlash! Check your inbox soon.',
      count: _devMemory.size,
    });
  } catch (error) {
    console.error('[SUBSCRIBE] Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// ── GET: count ──────────────────────────────────────────────────────────────
export async function GET() {
  if (UPSTASH_URL) {
    const count = (await redis('SCARD', SUBSCRIBERS_KEY)) as number | null;
    if (count !== null) {
      return NextResponse.json({ count });
    }
  }
  // Either no REDIS_URL configured or Redis unreachable
  return NextResponse.json({ count: _devMemory.size });
}
