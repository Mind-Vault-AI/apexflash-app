import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * /api/ceo — CEO KPI Dashboard
 *
 * Aggregates KPIs from:
 *   1. data/events.json       — site analytics (page views, CTA clicks)
 *   2. data/affiliate_clicks.json — affiliate click tracking
 *   3. data/subscribers.json  — email subscriber list
 *   4. Redis (REDIS_URL)       — bot KPIs: win rate, users, trades (optional)
 *
 * Returns fallback zeros when any source is unavailable — never throws.
 * Used by CEO Agent (ceo_agent.py) — daily 08:00 NL Telegram briefing.
 */

const DATA_DIR = path.join(process.cwd(), 'data');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');
const AFFILIATE_FILE = path.join(DATA_DIR, 'affiliate_clicks.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

// ── File helpers ────────────────────────────────────────────────────────────

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

// ── Redis helper (Upstash REST via rediss:// URL) ──────────────────────────

const UPSTASH_URL = process.env.REDIS_URL || process.env.UPSTASH_REDIS_URL || '';

async function redis(command: string, ...args: (string | number)[]): Promise<unknown> {
  if (!UPSTASH_URL) return null;
  try {
    const url = new URL(UPSTASH_URL.replace('rediss://', 'https://'));
    const host = url.hostname;
    const password = url.password;
    const resp = await fetch(`https://${host}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${password}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([command, ...args]),
      next: { revalidate: 0 },
    });
    if (resp.ok) {
      const data = await resp.json();
      return data.result;
    }
  } catch {
    // Redis unavailable — use file-based fallback
  }
  return null;
}

function safeInt(val: unknown, fallback = 0): number {
  if (val === null || val === undefined) return fallback;
  const n = parseInt(String(val), 10);
  return isNaN(n) ? fallback : n;
}

function safeFloat(val: unknown, fallback = 0): number {
  if (val === null || val === undefined) return fallback;
  const n = parseFloat(String(val));
  return isNaN(n) ? fallback : n;
}

function toRate(part: number, whole: number): number {
  return whole > 0 ? Math.round((part / whole) * 100 * 10) / 10 : 0;
}

// ── Site analytics from events.json ────────────────────────────────────────

interface EventRecord {
  event: string;
  payload: Record<string, unknown>;
  timestamp: string;
}

interface SiteKpis {
  pageViews: number;
  ctaClicks: number;
  pricingClicks: number;
  subscribeSuccess: number;
  ctaCtrPct: number;
  pricingIntentPct: number;
  subscribeConversionPct: number;
}

async function getSiteKpis(): Promise<SiteKpis> {
  const events = await readJsonFile<EventRecord[]>(EVENTS_FILE, []);
  const byEvent: Record<string, number> = {};
  for (const e of events) {
    byEvent[e.event] = (byEvent[e.event] || 0) + 1;
  }
  const pv = byEvent.page_view || 0;
  const cta = byEvent.cta_click || 0;
  const pricing = byEvent.pricing_cta_click || 0;
  const sub = byEvent.subscribe_success || 0;
  return {
    pageViews: pv,
    ctaClicks: cta,
    pricingClicks: pricing,
    subscribeSuccess: sub,
    ctaCtrPct: toRate(cta, pv),
    pricingIntentPct: toRate(pricing, pv),
    subscribeConversionPct: toRate(sub, pv),
  };
}

// ── Affiliate clicks from affiliate_clicks.json ─────────────────────────────

interface ClickRecord {
  slug: string;
  timestamp: string;
}

async function getAffiliateKpis() {
  const clicks = await readJsonFile<ClickRecord[]>(AFFILIATE_FILE, []);
  const bySlug: Record<string, number> = {};
  for (const c of clicks) {
    bySlug[c.slug] = (bySlug[c.slug] || 0) + 1;
  }
  return {
    total_clicks: clicks.length,
    by_exchange: bySlug,
    estimated_revenue_eur: Math.round(clicks.length * 0.5),
  };
}

// ── Subscribers ─────────────────────────────────────────────────────────────

async function getSubscriberCount(): Promise<number> {
  const subs = await readJsonFile<string[]>(SUBSCRIBERS_FILE, []);
  return subs.length;
}

// ── Bot KPIs from Redis (optional) ─────────────────────────────────────────

async function getBotKpis() {
  const [totalUsers, totalTrades, wins, totalPnlSol, tradesToday] = await Promise.all([
    redis('GET', 'platform:total_users'),
    redis('GET', 'winrate:total_trades'),
    redis('GET', 'winrate:wins'),
    redis('GET', 'winrate:total_pnl_sol'),
    redis('GET', 'platform:trades_today'),
  ]);

  const tradesAll = safeInt(totalTrades);
  const winsAll = safeInt(wins);
  const winRateAll = tradesAll > 0 ? Math.round((winsAll / tradesAll) * 100 * 10) / 10 : 0;

  return {
    users: {
      total: safeInt(totalUsers),
    },
    trades: {
      total_all_time: tradesAll,
      wins: winsAll,
      win_rate_pct: winRateAll,
      total_pnl_sol: Math.round(safeFloat(totalPnlSol) * 10000) / 10000,
      today: safeInt(tradesToday),
    },
    redis_connected: UPSTASH_URL.length > 0,
  };
}

// ── Main handler ─────────────────────────────────────────────────────────────

export async function GET() {
  try {
    const [site, affiliate, subscriberCount, bot] = await Promise.all([
      getSiteKpis(),
      getAffiliateKpis(),
      getSubscriberCount(),
      getBotKpis(),
    ]);

    const today = new Date().toISOString().split('T')[0];

    // Alerts vs targets
    const targets = {
      win_rate: 65,
      paid_conversion: 8,
      monthly_users: 12000,
    };

    const alerts: string[] = [];
    if (bot.trades.win_rate_pct > 0 && bot.trades.win_rate_pct < targets.win_rate) {
      alerts.push(`⚠️ Win rate ${bot.trades.win_rate_pct}% below target ${targets.win_rate}%`);
    }
    if (site.pricingIntentPct > 0 && site.pricingIntentPct < targets.paid_conversion) {
      alerts.push(`⚠️ Pricing intent ${site.pricingIntentPct}% below target ${targets.paid_conversion}%`);
    }
    if (bot.users.total > 0 && bot.users.total < 1000) {
      alerts.push(`📢 Users ${bot.users.total} — target 12k by month 6`);
    }

    return NextResponse.json(
      {
        generatedAt: new Date().toISOString(),
        date: today,
        users: bot.users,
        trades: bot.trades,
        site: site,
        subscribers: { total: subscriberCount },
        affiliate,
        targets,
        alerts,
        health: {
          redis_connected: bot.redis_connected,
          data_freshness: 'live',
          note: 'Site metrics reset on Render redeploy (ephemeral filesystem)',
        },
      },
      {
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: 'CEO dashboard fetch failed',
        detail: String(err),
        generatedAt: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
