// ============================================================
// GLOBAL CONFIG
// ============================================================

function resolveTelegramUrl(candidate: string | undefined, fallback: string): string {
  if (!candidate) {
    return fallback;
  }

  try {
    const url = new URL(candidate);
    const host = url.hostname.toLowerCase();
    const isTelegramHost = host === 't.me' || host === 'telegram.me' || host.endsWith('.t.me');

    if (url.protocol === 'https:' && isTelegramHost) {
      return candidate;
    }
  } catch {
    // fall back to trusted static URL
  }

  return fallback;
}

function resolveGumroadUrl(candidate: string | undefined, fallback: string): string {
  if (!candidate) {
    return fallback;
  }

  const normalized = candidate.trim().toLowerCase();
  const blocked = [
    'https://apexflash.gumroad.com/l/premium',
    'https://apexflash.gumroad.com/l/elite',
  ];

  if (blocked.includes(normalized)) {
    return fallback;
  }

  try {
    const url = new URL(candidate);
    const host = url.hostname.toLowerCase();
    const isAllowed = host === 'gumroad.com' || host.endsWith('.gumroad.com');

    if (url.protocol === 'https:' && isAllowed) {
      return candidate;
    }
  } catch {
    // fall back to trusted static URL
  }

  return fallback;
}

export const CONFIG = {
  siteName: 'ApexFlash',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://apexflash.pro',
  supportEmail: 'support@apexflash.pro',
  telegram: {
    // NEXT_PUBLIC_TELEGRAM_BOT — set in Render env (matches Box .env.apexflash-app)
    bot: resolveTelegramUrl(process.env.NEXT_PUBLIC_TELEGRAM_BOT, 'https://t.me/ApexFlashBot'),
    channel: resolveTelegramUrl(process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL, 'https://t.me/ApexFlashAlerts'),
    support: resolveTelegramUrl(process.env.NEXT_PUBLIC_TELEGRAM_SUPPORT, 'https://t.me/ApexFlashSupport'),
    // Aliases used in components
    get whaleBot() { return this.bot; },
    get apexBot() { return this.bot; },
  },
  gumroad: {
    premiumUrl: resolveGumroadUrl(
      process.env.NEXT_PUBLIC_GUMROAD_PRO,
      'https://mindvault34.gumroad.com/l/rwauqu'
    ),
    eliteUrl: resolveGumroadUrl(
      process.env.NEXT_PUBLIC_GUMROAD_ELITE,
      'https://mindvault34.gumroad.com/l/unetcl'
    ),
  },
  social: {
    twitter: 'https://x.com/MindVault_ai',
  },
  pricing: {
    free: {
      name: 'Explorer',
      price: 0,
      features: [
        'Whale alerts (3/day)',
        'Daily market summary',
        'Telegram community access',
        'Exchange fee discounts',
      ],
    },
    pro: {
      name: 'Flash Pro',
      price: 9.99,
      period: 'month',
      features: [
        'Unlimited real-time whale alerts',
        'Multi-chain: ETH, BSC, SOL, BASE',
        'AI trading advisor',
        'Grade A signals',
        'Zero-Loss Manager',
        'Priority support',
      ],
    },
    elite: {
      name: 'Flash Elite',
      price: 29.99,
      period: 'month',
      features: [
        'Everything in Pro',
        'Private signals channel',
        'Arbitrage scanner',
        'Copy trading via MIZAR',
        'GMGN AI trading (auto-swap)',
        '1-on-1 onboarding',
      ],
    },
  },
} as const;
