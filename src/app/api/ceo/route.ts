import { NextResponse } from 'next/server';

/**
 * /api/ceo — CEO KPI Dashboard
 *
 * Aggregates all measurable KPIs from Redis into one JSON response.
 * Used by:
 *   1. CEO Agent (ceo_agent.py) — daily 08:00 NL Telegram briefing to Erik
 *   2. Future /dashboard CEO view on site
 *
 * All data comes from Upstash Redis via REST API (same pattern as /api/stats).
 * Returns fallback zeros when Redis is unavailable — never throws.
 */

const UPSTASH_URL = process.env.REDIS_URL || '';

async function redis(command: string, ...args: (string | number)[]): Promise<unknown> {
  if (!UPSTASH_URL) return null;
  try {
    const url = new URL(UPSTASH_URL.replace('rediss://', 'https://'));
    const host = url.hostname;
    const password = url.password;
    const body = JSON.stringify([command, ...args]);
    const resp = await fetch(`https://${host}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${password}`,
        'Content-Type': 'application/json',
      },
      body,
      next: { revalidate: 60 },
    });
    if (resp.ok) {
      const data = await resp.json();
      return data.result;
    }
  } catch {
    // Silent
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

function today(): string {
  return new Date().toISOString().split('T')[0];
}

function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export async function GET() {
  const todayStr = today();
  const yestStr = yesterday();

  try {
    // ── Fetch all KPIs in parallel ─────────────────────────────────────────────
    const [
      totalUsers,
      totalTrades,
      wins,
      totalPnlSol,
      tradesToday,
      usersYesterday,
      tradesTodayCount,
      tradesYesterdayCount,
      funnelStart,
      funnelUpgrade,
      funnelStartYest,
      funnelUpgradeYest,
      recentRaw,
    ] = await Promise.all([
      redis('GET', 'platform:total_users'),
      redis('GET', 'winrate:total_trades'),
      redis('GET', 'winrate:wins'),
      redis('GET', 'winrate:total_pnl_sol'),
      redis('GET', 'platform:trades_today'),
      redis('GET', `platform:users:${yestStr}`),
      redis('GET', `winrate:total:${todayStr}`),
      redis('GET', `winrate:total:${yestStr}`),
      redis('GET', `funnel:start:${todayStr}`),
      redis('GET', `funnel:upgrade:${todayStr}`),
      redis('GET', `funnel:start:${yestStr}`),
      redis('GET', `funnel:upgrade:${yestStr}`),
      redis('LRANGE', 'winrate:recent', 0, 9),
    ]);

    // Per-grade win rates (Sprint 2 — may be 0 now, fills in over time)
    const [gradeATotal, gradeAWins, gradeBTotal, gradeBWins] = await Promise.all([
      redis('GET', 'kpi:grade:A:total'),
      redis('GET', 'kpi:grade:A:wins'),
      redis('GET', 'kpi:grade:B:total'),
      redis('GET', 'kpi:grade:B:wins'),
    ]);

    // Affiliate clicks (top exchanges)
    const exchanges = ['bitunix', 'mexc', 'blofin', 'gate', 'gmgn'];
    const affiliateResults = await Promise.all(
      exchanges.map((ex) => redis('GET', `affiliate:clicks:count:${ex}`))
    );
    const affiliateClicks: Record<string, number> = {};
    let totalAffiliateClicks = 0;
    exchanges.forEach((ex, i) => {
      const n = safeInt(affiliateResults[i]);
      affiliateClicks[ex] = n;
      totalAffiliateClicks += n;
    });

    // ── Compute derived metrics ────────────────────────────────────────────────

    const users = safeInt(totalUsers);
    const tradesAll = safeInt(totalTrades);
    const winsAll = safeInt(wins);
    const pnlSol = safeFloat(totalPnlSol);
    const winRateAll = tradesAll > 0 ? Math.round((winsAll / tradesAll) * 100 * 10) / 10 : 0;

    const tradesDay = safeInt(tradesToday) || safeInt(tradesTodayCount);
    const tradesYest = safeInt(tradesYesterdayCount);
    const tradesDelta = tradesDay - tradesYest;

    // Funnel: conversion = upgrades / starts (today)
    const startToday = safeInt(funnelStart);
    const upgradeToday = safeInt(funnelUpgrade);
    const startYest = safeInt(funnelStartYest);
    const upgradeYest = safeInt(funnelUpgradeYest);
    const conversionToday =
      startToday > 0 ? Math.round((upgradeToday / startToday) * 100 * 10) / 10 : 0;
    const conversionYest =
      startYest > 0 ? Math.round((upgradeYest / startYest) * 100 * 10) / 10 : 0;

    // Per-grade win rates
    const gA = safeInt(gradeATotal);
    const gAW = safeInt(gradeAWins);
    const gB = safeInt(gradeBTotal);
    const gBW = safeInt(gradeBWins);

    // Parse recent trades
    let recentTrades: unknown[] = [];
    if (Array.isArray(recentRaw)) {
      try {
        recentTrades = (recentRaw as string[]).map((s) => JSON.parse(s));
      } catch {
        recentTrades = [];
      }
    }

    // ── TARGETS — Sprint 1 baselines ─────────────────────────────────────────
    const targets = {
      win_rate: 65,         // Target: >65%
      paid_conversion: 8,   // Target: >8%
      monthly_users: 12000, // Month 6 target
    };

    const alerts: string[] = [];
    if (winRateAll > 0 && winRateAll < targets.win_rate) {
      alerts.push(`⚠️ Win rate ${winRateAll}% below target ${targets.win_rate}%`);
    }
    if (conversionToday > 0 && conversionToday < targets.paid_conversion) {
      alerts.push(`⚠️ Conversion ${conversionToday}% below target ${targets.paid_conversion}%`);
    }
    if (users > 0 && users < 1000) {
      alerts.push(`📢 User count ${users} — target 12k by month 6`);
    }

    // ── Response ──────────────────────────────────────────────────────────────
    return NextResponse.json(
      {
        generatedAt: new Date().toISOString(),
        date: todayStr,

        users: {
          total: users,
          delta_vs_yesterday: users - safeInt(usersYesterday),
        },

        trades: {
          total_all_time: tradesAll,
          wins: winsAll,
          win_rate_pct: winRateAll,
          total_pnl_sol: Math.round(pnlSol * 10000) / 10000,
          today: tradesDay,
          delta_vs_yesterday: tradesDelta,
        },

        grades: {
          A: { total: gA, wins: gAW, win_rate: gA > 0 ? Math.round((gAW / gA) * 100) : null },
          B: { total: gB, wins: gBW, win_rate: gB > 0 ? Math.round((gBW / gB) * 100) : null },
        },

        funnel: {
          starts_today: startToday,
          upgrades_today: upgradeToday,
          conversion_pct: conversionToday,
          conversion_pct_yesterday: conversionYest,
        },

        affiliate: {
          total_clicks: totalAffiliateClicks,
          by_exchange: affiliateClicks,
          estimated_revenue_eur: Math.round(totalAffiliateClicks * 0.5), // rough €0.50 per click
        },

        recent_trades: recentTrades.slice(0, 5),

        targets,
        alerts,

        health: {
          redis_connected: UPSTASH_URL.length > 0,
          data_freshness: 'live',
        },
      },
      {
        headers: {
          'Cache-Control': 'no-store', // CEO data must always be fresh
        },
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
