import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const EVENTS_FILE = path.join(process.cwd(), 'data', 'events.json');

interface EventRecord {
  event: string;
  payload: Record<string, unknown>;
  timestamp: string;
  ip: string;
  userAgent: string;
  referer: string;
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
    await fs.writeFile(EVENTS_FILE, JSON.stringify(events, null, 2));
  } catch (error) {
    console.error('[TRACKING] Error recording event:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { event, payload } = await request.json();

    if (typeof event !== 'string' || !event.trim()) {
      return NextResponse.json({ error: 'Event name required' }, { status: 400 });
    }

    const safePayload = payload && typeof payload === 'object' ? payload : {};

    const record: EventRecord = {
      event: event.trim().slice(0, 120),
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
