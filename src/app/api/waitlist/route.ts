import { NextResponse } from 'next/server';

const UPSTASH_URL = process.env.REDIS_URL || '';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    if (!UPSTASH_URL) {
      // Development fallback or missing config — log and succeed to not block UI
      console.warn('REDIS_URL missing. Lead captured in logs:', email);
      return NextResponse.json({ message: 'Success (Logged)' }, { status: 200 });
    }

    // Upstash REST API: extract host and token from rediss:// URL
    const url = new URL(UPSTASH_URL.replace('rediss://', 'https://'));
    const host = url.hostname;
    const password = url.password;
    const restUrl = `https://${host}`;

    // Add email to the waitlist set in Redis
    const resp = await fetch(`${restUrl}/sadd/platform:waitlist/${email}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${password}` },
    });

    if (resp.ok) {
      return NextResponse.json({ message: 'Added to waitlist' }, { status: 200 });
    } else {
      const error = await resp.text();
      console.error('Redis error:', error);
      return NextResponse.json({ message: 'Database error' }, { status: 500 });
    }
  } catch (err) {
    console.error('Waitlist API error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
