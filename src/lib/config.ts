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
  siteUrl: 'https://apexflash.pro',
  supportEmail: 'support@apexflash.pro',
  telegram: {
    whaleBot: resolveTelegramUrl(process.env.NEXT_PUBLIC_TELEGRAM_WHALE_BOT_URL, 'https://t.me/MVAi_WhalesTrader_Bot'),
    apexBot: resolveTelegramUrl(process.env.NEXT_PUBLIC_TELEGRAM_APEX_BOT_URL, 'https://t.me/apexflash_bot'),
    channel: resolveTelegramUrl(process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL, 'https://t.me/apexflash_signals'),
  },
  gumroad: {
    premiumUrl: resolveGumroadUrl(
      process.env.NEXT_PUBLIC_GUMROAD_URL,
      'https://t.me/apexflash_bot?start=elite'
    ),
  },
  social: {
    twitter: 'https://x.com/apexflashpro',
  },
  pricing: {
    free: {
      name: 'Explorer',
      price: 0,
      features: [
        'Basic whale alerts (3/day)',
        'Daily market summary',
        'Community Telegram access',
        'Exchange affiliate perks',
      ],
    },
    pro: {
      name: 'Flash Pro',
      price: 19,
      period: 'month',
      features: [
        'Unlimited real-time whale alerts',
        'Multi-chain tracking (ETH, BSC, SOL, ARB)',
        'Custom alert thresholds',
        'AI sentiment signals',
        'DCA bot access (coming soon)',
        'Priority support',
      ],
    },
    elite: {
      name: 'Flash Elite',
      price: 49,
      period: 'month',
      features: [
        'Everything in Pro',
        'Private signals channel',
        'Arbitrage alerts',
        'Portfolio risk analysis',
        'Strategy backtesting (coming soon)',
        '1-on-1 onboarding call',
      ],
    },
  },
} as const;
