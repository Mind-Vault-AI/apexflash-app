import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Simple file-based email storage (upgrade to a DB later)
const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

async function loadSubscribers(): Promise<string[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubscribers(subscribers: string[]) {
  const dir = path.dirname(SUBSCRIBERS_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();
    const subscribers = await loadSubscribers();

    if (subscribers.includes(normalized)) {
      return NextResponse.json({ message: "You're already subscribed!" }, { status: 200 });
    }

    subscribers.push(normalized);
    await saveSubscribers(subscribers);

    console.log(`[SUBSCRIBE] New subscriber: ${normalized} | Total: ${subscribers.length}`);

    return NextResponse.json({
      message: 'Welcome to ApexFlash! Check your inbox soon.',
      count: subscribers.length,
    });
  } catch (error) {
    console.error('[SUBSCRIBE] Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  const subscribers = await loadSubscribers();
  return NextResponse.json({ count: subscribers.length });
}
