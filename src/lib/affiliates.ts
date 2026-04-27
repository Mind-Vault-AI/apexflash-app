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

// SSOT: Bot's core/config.py AFFILIATE_LINKS — landing page MUST match bot exchange hub.
// Featured-status synced with bot. Only exchanges with real ref-codes are listed.
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
    slug: 'mexc',
    name: 'MEXC',
    logo: '🔷',
    affiliateUrl: resolveAffiliateUrl(
      process.env.NEXT_PUBLIC_MEXC_URL,
      'https://www.mexc.com/register?inviteCode=BPM0e8Rm',
      ['mexc.com']
    ),
    commission: 'Up to 70% fee rebate',
    description: '70% rebate, 2000+ trading pairs, zero maker fees on spot.',
    features: ['0% Maker Fee', '2000+ Tokens', 'Futures', 'Earn'],
    tier: 'featured',
  },
  {
    slug: 'blofin',
    name: 'BloFin',
    logo: '🟠',
    affiliateUrl: resolveAffiliateUrl(
      process.env.NEXT_PUBLIC_BLOFIN_URL,
      'https://blofin.com/register?referral_code=b996a0111c1b4497b53d9b3cc82e4539',
      ['blofin.com']
    ),
    commission: 'Up to 50% fee rebate',
    description: 'Professional derivatives exchange — built for serious traders.',
    features: ['Copy Trading', 'USDT Perps', 'Low Fees', 'Up to 100x'],
    tier: 'featured',
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
    tier: 'featured',
  },
  {
    slug: 'bitvavo',
    name: 'Bitvavo',
    logo: '🇳🇱',
    affiliateUrl: resolveAffiliateUrl(
      process.env.NEXT_PUBLIC_BITVAVO_URL,
      'https://bitvavo.com/invite?a=6A3E846932',
      ['bitvavo.com']
    ),
    commission: '€10 gratis + €10K fee-free',
    description: 'Grootste Nederlandse crypto exchange — €10K fee-free trading bij signup.',
    features: ['EUR Direct', 'iDEAL', 'Low 0.25% fee', 'SEPA Free'],
    tier: 'featured',
  },
  {
    slug: 'binance',
    name: 'Binance',
    logo: '🟡',
    affiliateUrl: resolveAffiliateUrl(
      process.env.NEXT_PUBLIC_BINANCE_URL,
      'https://accounts.binance.com/register',
      ['binance.com']
    ),
    commission: 'Up to 50% fee rebate',
    description: 'World\'s largest crypto exchange. Full ecosystem.',
    features: ['Spot & Futures', 'Earn Products', 'Launchpad', 'P2P Trading'],
    tier: 'standard',
  },
  {
    slug: 'bybit',
    name: 'Bybit',
    logo: '🟧',
    affiliateUrl: resolveAffiliateUrl(
      process.env.NEXT_PUBLIC_BYBIT_URL,
      'https://www.bybit.com/invite',
      ['bybit.com']
    ),
    commission: 'Up to 50% fee rebate',
    description: 'Top derivatives platform with deep liquidity.',
    features: ['Derivatives', 'Copy Trading', 'Earn', 'Low Fees'],
    tier: 'standard',
  },
  {
    slug: 'okx',
    name: 'OKX',
    logo: '⚫',
    affiliateUrl: resolveAffiliateUrl(
      process.env.NEXT_PUBLIC_OKX_URL,
      'https://www.okx.com/join',
      ['okx.com']
    ),
    commission: 'Up to 50% fee rebate',
    description: 'Web3 wallet + exchange in one platform.',
    features: ['Web3 Wallet', 'DEX Aggregator', 'Spot & Futures', 'Earn'],
    tier: 'standard',
  },
  {
    slug: 'kucoin',
    name: 'KuCoin',
    logo: '🟢',
    affiliateUrl: resolveAffiliateUrl(
      process.env.NEXT_PUBLIC_KUCOIN_URL,
      'https://www.kucoin.com/r/',
      ['kucoin.com']
    ),
    commission: 'Up to 40% commission',
    description: 'Gem hunter exchange — low-cap altcoins and new listings.',
    features: ['Low-Cap Gems', 'Margin', 'Futures', 'Earn'],
    tier: 'standard',
  },
];

export function getExchange(slug: string): Exchange | undefined {
  return EXCHANGES.find((e) => e.slug === slug);
}
