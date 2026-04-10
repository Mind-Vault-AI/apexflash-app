// ============================================================
// AFFILIATE CONFIGURATION
// Add your affiliate IDs here. Every signup through these links
// earns you commission on their trading fees.
// ============================================================

export interface Exchange {
  slug: string;
  name: string;
  logo: string; // emoji fallback, replace with real logos later
  affiliateUrl: string;
  commission: string;
  description: string;
  features: string[];
  tier: 'featured' | 'standard';
}

function resolveAffiliateUrl(
  candidate: string | undefined,
  fallback: string,
  allowedHosts: string[]
): string {
  if (!candidate) {
    return fallback;
  }

  try {
    const url = new URL(candidate);
    const host = url.hostname.toLowerCase();
    const isAllowedHost = allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));

    if (url.protocol === 'https:' && isAllowedHost) {
      return candidate;
    }
  } catch {
    // fall back to trusted static URL
  }

  return fallback;
}

// All env var names match Box Drive: C:\Users\erik_\Box\08_OPERATIONS\8.1_ApexFlash_Bot\.env.apexflash-app
export const EXCHANGES: Exchange[] = [
  {
    slug: 'bitunix',
    name: 'Bitunix',
    logo: '⚡',
    affiliateUrl: resolveAffiliateUrl(
      process.env.NEXT_PUBLIC_BITUNIX_URL,
      'https://www.bitunix.com/register?vipCode=xc6jzk',
      ['bitunix.com']
    ),
    commission: 'Up to 50% fee rebate',
    description: 'Next-gen derivatives exchange with deep liquidity and up to 125x leverage.',
    features: ['125x Leverage', 'Copy Trading', 'Low Fees', 'Futures & Spot'],
    tier: 'featured',
  },
  {
    slug: 'blofin',
    name: 'Blofin',
    logo: '🟠',
    affiliateUrl: resolveAffiliateUrl(
      process.env.NEXT_PUBLIC_BLOFIN_URL,
      'https://blofin.com/register?referral_code=b996a0111c1b4497b53d9b3cc82e4539',
      ['blofin.com']
    ),
    commission: 'Up to 40% fee rebate',
    description: 'Professional derivatives exchange — built for serious traders.',
    features: ['Copy Trading', 'USDT Perps', 'Low Fees', 'Up to 100x'],
    tier: 'featured',
  },
  {
    slug: 'mexc',
    name: 'MEXC',
    logo: '🔷',
    affiliateUrl: resolveAffiliateUrl(
      process.env.NEXT_PUBLIC_MEXC_URL,
      'https://www.mexc.com/register?inviteCode=BPM0e8Rm',
      ['mexc.com']
    ),
    commission: '0% Maker Fees',
    description: 'Huge altcoin selection with zero maker fees on spot trading.',
    features: ['0% Maker Fee', '1500+ Tokens', 'Futures', 'Earn'],
    tier: 'standard',
  },
  {
    slug: 'gate',
    name: 'Gate.com',
    logo: '🔵',
    affiliateUrl: resolveAffiliateUrl(
      process.env.NEXT_PUBLIC_GATE_URL,
      'https://www.gate.com/signup/VFFHXVFDUG?ref_type=103',
      ['gate.com', 'gate.io']
    ),
    commission: 'Up to 40% commission',
    description: 'Early access to new tokens with 1400+ listings.',
    features: ['1400+ Coins', 'IEO Launchpad', 'Copy Trading', 'Earn'],
    tier: 'standard',
  },
  {
    slug: 'bitvavo',
    name: 'Bitvavo',
    logo: '🇳🇱',
    affiliateUrl: resolveAffiliateUrl(
      process.env.NEXT_PUBLIC_BITVAVO_URL,
      'https://bitvavo.com/?a=6A3E846932',
      ['bitvavo.com']
    ),
    commission: '€0 trading fees (first €1000)',
    description: 'European exchange — ideal for EUR traders. Lowest fees in NL/EU.',
    features: ['EUR Direct', 'iDEAL', 'Low 0.25% fee', 'SEPA Free'],
    tier: 'standard',
  },
  {
    slug: 'binance',
    name: 'Binance',
    logo: '🟡',
    affiliateUrl: 'https://accounts.binance.com/register',
    commission: 'World\'s #1 by volume',
    description: 'World\'s largest crypto exchange. Full ecosystem.',
    features: ['Spot & Futures', 'Earn Products', 'Launchpad', 'P2P Trading'],
    tier: 'standard',
  },
];

export function getExchange(slug: string): Exchange | undefined {
  return EXCHANGES.find((e) => e.slug === slug);
}
