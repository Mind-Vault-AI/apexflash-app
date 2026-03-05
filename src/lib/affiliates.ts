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

export const EXCHANGES: Exchange[] = [
  {
    slug: 'bitunix',
    name: 'Bitunix',
    logo: '⚡',
    affiliateUrl: process.env.NEXT_PUBLIC_BITUNIX_AFFILIATE_URL || 'https://www.bitunix.com/register?vipCode=xc6jzk',
    commission: 'Up to 50% fee rebate',
    description: 'Next-gen derivatives exchange with deep liquidity and up to 125x leverage.',
    features: ['125x Leverage', 'Copy Trading', 'Low Fees', 'Futures & Spot'],
    tier: 'featured',
  },
  {
    slug: 'binance',
    name: 'Binance',
    logo: '🟡',
    affiliateUrl: process.env.NEXT_PUBLIC_BINANCE_AFFILIATE_URL || 'https://accounts.binance.com/register',
    commission: '20% fee kickback',
    description: 'World\'s largest crypto exchange by volume. Full ecosystem.',
    features: ['Spot & Futures', 'Earn Products', 'Launchpad', 'P2P Trading'],
    tier: 'standard',
  },
  {
    slug: 'bybit',
    name: 'Bybit',
    logo: '🔶',
    affiliateUrl: process.env.NEXT_PUBLIC_BYBIT_AFFILIATE_URL || 'https://www.bybit.com/register',
    commission: 'Up to 30% commission',
    description: 'Top derivatives platform with advanced trading tools.',
    features: ['Copy Trading', 'Bot Trading', 'Options', 'Web3 Wallet'],
    tier: 'standard',
  },
  {
    slug: 'okx',
    name: 'OKX',
    logo: '⬛',
    affiliateUrl: process.env.NEXT_PUBLIC_OKX_AFFILIATE_URL || 'https://www.okx.com/register',
    commission: 'Up to 30% rebate',
    description: 'All-in-one crypto platform with DeFi wallet and DEX.',
    features: ['Spot & Derivatives', 'DeFi Hub', 'NFT Market', 'Earn'],
    tier: 'standard',
  },
  {
    slug: 'kucoin',
    name: 'KuCoin',
    logo: '🟢',
    affiliateUrl: process.env.NEXT_PUBLIC_KUCOIN_AFFILIATE_URL || 'https://www.kucoin.com/register',
    commission: 'Up to 20% commission',
    description: 'The People\'s Exchange - huge altcoin selection.',
    features: ['700+ Coins', 'Trading Bots', 'Margin', 'Lending'],
    tier: 'standard',
  },
  {
    slug: 'gate',
    name: 'Gate.io',
    logo: '🔵',
    affiliateUrl: process.env.NEXT_PUBLIC_GATE_AFFILIATE_URL || 'https://www.gate.io/signup',
    commission: 'Up to 40% commission',
    description: 'Early access to new tokens with extensive listings.',
    features: ['1400+ Coins', 'Startup IEO', 'Copy Trading', 'NFTs'],
    tier: 'standard',
  },
  {
    slug: 'mexc',
    name: 'MEXC',
    logo: '🔷',
    affiliateUrl: process.env.NEXT_PUBLIC_MEXC_AFFILIATE_URL || 'https://www.mexc.com/register?inviteCode=BPM0e8Rm',
    commission: 'Up to 40% commission',
    description: 'Zero-fee spot trading with massive token selection and fast listings.',
    features: ['Zero Spot Fees', '2300+ Coins', 'Futures Trading', 'MX Token Airdrops'],
    tier: 'standard',
  },
  {
    slug: 'blofin',
    name: 'BloFin',
    logo: '🐋',
    affiliateUrl: process.env.NEXT_PUBLIC_BLOFIN_AFFILIATE_URL || 'https://www.blofin.com/register',
    commission: 'Up to 50% commission',
    description: 'Whale-grade derivatives exchange with deep liquidity and copy trading.',
    features: ['Copy Trading', '150x Leverage', 'Low Fees', 'Futures Focus'],
    tier: 'standard',
  },
];

export function getExchange(slug: string): Exchange | undefined {
  return EXCHANGES.find((e) => e.slug === slug);
}
