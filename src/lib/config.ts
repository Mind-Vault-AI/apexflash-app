// ============================================================
// GLOBAL CONFIG
// ============================================================

export const CONFIG = {
  siteName: 'ApexFlash',
  siteUrl: 'https://apexflash.pro',
  supportEmail: 'support@apexflash.pro',
  telegram: {
    whaleBot: 'https://t.me/MVAi_WhalesTrader_Bot',
    apexBot: 'https://t.me/ApexFlashBot',
    channel: 'https://t.me/apexflash_signals',
  },
  gumroad: {
    proUrl: process.env.NEXT_PUBLIC_GUMROAD_PRO_URL || 'https://mindvault34.gumroad.com/l/pctpy',
    eliteUrl: process.env.NEXT_PUBLIC_GUMROAD_ELITE_URL || 'https://mindvault34.gumroad.com/l/elite',
  },
  social: {
    twitter: 'https://x.com/MindVault_ai',
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
