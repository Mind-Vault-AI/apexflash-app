import { NextResponse } from 'next/server';

const DEXPAPRIKA_BASE = 'https://api.dexpaprika.com';
const SOL_MINT = 'So11111111111111111111111111111111111111112';
const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const USDT_MINT = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB';
const SKIP_MINTS = new Set([SOL_MINT, USDC_MINT, USDT_MINT]);

interface TokenData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
  volume: string;
  mint: string;
  tag?: string;
}

function formatPrice(p: number): string {
  if (p >= 1) return `$${p.toFixed(2)}`;
  if (p >= 0.01) return `$${p.toFixed(4)}`;
  if (p >= 0.0001) return `$${p.toFixed(6)}`;
  return `$${p.toFixed(8)}`;
}

function formatVolume(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}

export async function GET() {
  try {
    const res = await fetch(
      `${DEXPAPRIKA_BASE}/networks/solana/pools?order_by=volume_usd&sort=desc&limit=100`,
      { next: { revalidate: 60 } } // Cache 60 seconds
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'DexPaprika unavailable' }, { status: 502 });
    }

    const data = await res.json();
    const pools = data?.pools || data;

    if (!Array.isArray(pools)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 502 });
    }

    // Extract unique tokens from pools — dedup by BOTH mint AND symbol
    const seenMints = new Set<string>();
    const seenSymbols = new Set<string>();
    const allTokens: (TokenData & { rawChange: number; rawVolume: number })[] = [];

    for (const pool of pools) {
      const tokens = pool.tokens || [];
      let target = null;
      for (const tok of tokens) {
        if (!SKIP_MINTS.has(tok.id)) {
          target = tok;
          break;
        }
      }
      if (!target) continue;
      // Dedup by mint address AND symbol (catches wrapped/different versions)
      const sym = (target.symbol || '').toUpperCase();
      if (seenMints.has(target.id) || seenSymbols.has(sym)) continue;
      seenMints.add(target.id);
      seenSymbols.add(sym);

      const pct = pool.last_price_change_usd_24h || 0;
      const vol = pool.volume_usd || 0;
      const price = pool.price_usd || 0;

      allTokens.push({
        symbol: target.symbol || '???',
        name: target.name || 'Unknown',
        price: formatPrice(price),
        change: `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`,
        up: pct >= 0,
        volume: formatVolume(vol),
        mint: target.id,
        rawChange: pct,
        rawVolume: vol,
      });
    }

    // Build categories
    const gainers = [...allTokens]
      .filter(t => t.up)
      .sort((a, b) => b.rawChange - a.rawChange)
      .slice(0, 10);

    const losers = [...allTokens]
      .filter(t => !t.up)
      .sort((a, b) => a.rawChange - b.rawChange)
      .slice(0, 10);

    const trending = [...allTokens]
      .sort((a, b) => b.rawVolume - a.rawVolume)
      .slice(0, 10)
      .map((t, i) => ({ ...t, tag: `#${i + 1}` }));

    // "New" = tokens with high volume but not in top trending
    const hotNew = [...allTokens]
      .filter(t => t.rawChange > 5)
      .sort((a, b) => b.rawVolume - a.rawVolume)
      .slice(0, 10)
      .map(t => ({ ...t, tag: 'Hot' }));

    return NextResponse.json({
      gainers,
      losers,
      trending,
      new: hotNew,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Market API error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
