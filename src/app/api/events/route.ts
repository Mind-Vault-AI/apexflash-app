import { NextRequest, NextResponse } from 'next/server';

/**
 * /api/events — Analytics event tracking
 *
 * v3.22.10: Migrated from file-based (data/events.json) to Upstash Redis.
 *   - Render ephemeral filesystem reset metrics on EVERY deploy — CEO rapport
 *     toonde structureel 0 pageViews / 0 clicks. €1M doel onhaalbaar blind.
 *   - Now stored as Redis LIST `apexflash:events:log` (LPUSH + LTRIM cap).
 *   - Also per-event counters `apexflash:events:count:<name>` for O(1) KPIs.
 *   - Local dev without REDIS_URL: in-memory array (process-local).
 */

const EVENTS_LOG_KEY = 'apexflash:events:log';
const EVENTS_COUNT_PREFIX = 'apexflash:events:count:';
const UPSTASH_URL = process.env.REDIS_URL || process.env.UPSTASH_REDIS_URL || '';
const EVENTS_MAX_RECORDS = Math.max(500, Number(process.env.EVENTS_MAX_RECORDS || 5000));

const ALLOWED_EVENTS = new Set([
  'page_view',
  'cta_click',
  'nav_click',
  'pricing_cta_click',
  'exchange_click',
  'footer_click',
  'subscribe_submit',
  'subscribe_success',
  'subscribe_error',
]);

interface EventRecord {
  event: string;
  payload: Record<string, unknown>;
  timestamp: string;
  ip: string;
  userAgent: string;
  referer: string;
}

// In-memory shim for local dev only — never used in production
const _devMemory: EventRecord[] = [];

// ── Upstash REST helper (matches /api/subscribe + /api/ceo pattern) ────────
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

function sanitizePayload(payload: unknown): Record<string, string | number | boolean | null> {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return {};
  }
  const entries = Object.entries(payload as Record<string, unknown>).slice(0, 20);
  const clean: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of entries) {
    const safeKey = key.slice(0, 60);
    if (typeof value === 'string') {
      clean[safeKey] = value.slice(0, 200);
    } else if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
      clean[safeKey] = value;
    }
  }
  return clean;
}

function isAuthorized(request: NextRequest): boolean {
  const dashboardKey = process.env.EVENTS_DASHBOARD_KEY;
  if (!dashboardKey) return true;
  const headerKey = request.headers.get('x-events-key');
  const queryKey = request.nextUrl.searchParams.get('key');
  return headerKey === dashboardKey || queryKey === dashboardKey;
}

function parsePositiveInt(value: string | null, fallback: number, max: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.min(Math.floor(parsed), max);
}

async function recordEvent(record: EventRecord) {
  // Production: Redis LPUSH + LTRIM + counter INCR
  if (UPSTASH_URL) {
    try {
      await redis('LPUSH', EVENTS_LOG_KEY, JSON.stringify(record));
      await redis('LTRIM', EVENTS_LOG_KEY, 0, EVENTS_MAX_RECORDS - 1);
      await redis('INCR', `${EVENTS_COUNT_PREFIX}${record.event}`);
      return;
    } catch (error) {
      console.error('[TRACKING] Redis error, falling through to memory:', error);
    }
  }
  // Local dev / Redis down: in-memory (ephemeral)
  _devMemory.push(record);
  if (_devMemory.length > EVENTS_MAX_RECORDS) {
    _devMemory.splice(0, _devMemory.length - EVENTS_MAX_RECORDS);
  }
}

async function loadEvents(): Promise<EventRecord[]> {
  if (UPSTASH_URL) {
    try {
      const raw = (await redis('LRANGE', EVENTS_LOG_KEY, 0, EVENTS_MAX_RECORDS - 1)) as string[] | null;
      if (Array.isArray(raw)) {
        // Redis LPUSH stores newest-first; reverse to chronological for scoping
        return raw
          .map((s) => {
            try {
              return JSON.parse(s) as EventRecord;
            } catch {
              return null;
            }
          })
          .filter((r): r is EventRecord => r !== null)
          .reverse();
      }
    } catch (error) {
      console.error('[TRACKING] Redis load error:', error);
    }
  }
  return _devMemory.slice();
}

// ── POST: track event ─────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const { event, payload } = await request.json();

    if (typeof event !== 'string' || !event.trim()) {
      return NextResponse.json({ error: 'Event name required' }, { status: 400 });
    }

    const normalizedEvent = event.trim().slice(0, 120);
    if (!ALLOWED_EVENTS.has(normalizedEvent)) {
      return NextResponse.json({ error: 'Unknown event type' }, { status: 400 });
    }

    const safePayload = sanitizePayload(payload);

    const record: EventRecord = {
      event: normalizedEvent,
      payload: safePayload,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      referer: request.headers.get('referer') || 'direct',
    };

    await recordEvent(record);
    return NextResponse.json({ tracked: true });
  } catch (error) {
    console.error('[TRACKING] Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// ── GET: dashboard KPI read ───────────────────────────────────────────────
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const events = await loadEvents();
  const hours = parsePositiveInt(request.nextUrl.searchParams.get('hours'), 0, 24 * 30);
  const latestLimit = parsePositiveInt(request.nextUrl.searchParams.get('latest'), 20, 100);

  const scopedEvents = hours > 0
    ? events.filter((item) => {
      const ts = Date.parse(item.timestamp);
      return Number.isFinite(ts) && ts >= Date.now() - (hours * 60 * 60 * 1000);
    })
    : events;

  const byEvent = scopedEvents.reduce<Record<string, number>>((acc, item) => {
    acc[item.event] = (acc[item.event] || 0) + 1;
    return acc;
  }, {});

  const latest = scopedEvents.slice(-latestLimit).reverse().map((item) => ({
    event: item.event,
    payload: item.payload,
    timestamp: item.timestamp,
    referer: item.referer,
  }));

  const pageViews = byEvent.page_view || 0;
  const ctaClicks = byEvent.cta_click || 0;
  const pricingClicks = byEvent.pricing_cta_click || 0;
  const subscribeSuccess = byEvent.subscribe_success || 0;

  const toRate = (part: number, whole: number) => (whole > 0 ? Number(((part / whole) * 100).toFixed(2)) : 0);

  const kpi = {
    pageViews,
    ctaClicks,
    pricingClicks,
    subscribeSuccess,
    ctaCtrPct: toRate(ctaClicks, pageViews),
    pricingIntentPct: toRate(pricingClicks, pageViews),
    subscribeConversionPct: toRate(subscribeSuccess, pageViews),
  };

  return NextResponse.json({
    totalStored: events.length,
    totalScoped: scopedEvents.length,
    scopeHours: hours,
    byEvent,
    kpi,
    latest,
    storage: UPSTASH_URL ? 'redis' : 'memory',
  }, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
