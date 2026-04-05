import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const EVENTS_FILE = path.join(process.cwd(), 'data', 'events.json');
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

  if (!dashboardKey) {
    return true;
  }

  const headerKey = request.headers.get('x-events-key');
  const queryKey = request.nextUrl.searchParams.get('key');

  return headerKey === dashboardKey || queryKey === dashboardKey;
}

async function recordEvent(record: EventRecord) {
  try {
    const dir = path.dirname(EVENTS_FILE);
    await fs.mkdir(dir, { recursive: true });

    let events: EventRecord[] = [];
    try {
      const data = await fs.readFile(EVENTS_FILE, 'utf-8');
      events = JSON.parse(data);
    } catch {
      // file doesn't exist yet
    }

    events.push(record);

    if (events.length > EVENTS_MAX_RECORDS) {
      events = events.slice(-EVENTS_MAX_RECORDS);
    }

    await fs.writeFile(EVENTS_FILE, JSON.stringify(events, null, 2));
  } catch (error) {
    console.error('[TRACKING] Error recording event:', error);
  }
}

function parsePositiveInt(value: string | null, fallback: number, max: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return Math.min(Math.floor(parsed), max);
}

async function loadEvents(): Promise<EventRecord[]> {
  try {
    const data = await fs.readFile(EVENTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

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
  }, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
