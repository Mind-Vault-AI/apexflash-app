// ============================================================
// GLOBAL CONFIG
// ============================================================

export const CONFIG = {
  siteName: 'ApexFlash',
  siteUrl: 'https://apexflash.pro',
  supportEmail: 'support@apexflash.pro',
  telegram: {
    whaleBot: 'https://t.me/ApexFlashBot',
    apexBot: 'https://t.me/ApexFlashBot',
    channel: 'https://t.me/ApexFlashAlerts',
  },
  gumroad: {
    proUrl: process.env.NEXT_PUBLIC_GUMROAD_PRO_URL || 'https://mindvault34.gumroad.com/l/rwauqu',
    eliteUrl: process.env.NEXT_PUBLIC_GUMROAD_ELITE_URL || 'https://mindvault34.gumroad.com/l/unetcl',
  },
  social: {
    twitter: 'https://x.com/MindVault_ai',
    discord: 'https://discord.gg/apexflash',
    tiktok: 'https://www.tiktok.com/@apexflash.pro',
    reddit: '',
  },
  pricing: {
    free: {
      name: 'Free Forever',
      price: 0,
      features: [
        'ETH + SOL whale alerts (instant)',
        'AI Signal Grading (Grade A-D)',
        'Whale buy detection (token swaps)',
        '1-tap buy via Jupiter',
        'Auto Stop-Loss & Take-Profit',
        'Win rate tracking (/winrate)',
        'Exchange deals ($8K+ bonuses)',
        'Only 1% per trade',
      ],
    },
    pro: {
      name: 'Flash Pro',
      price: 9.99,
      period: 'month',
      features: [
        'Everything in Free',
        'Unlimited trades per day',
        'Full AI analysis breakdown per alert',
        'Personal P/L dashboard',
        'Copy Trading via Mizar',
        'DCA Bot automation',
        '20 custom wallet tracks',
        '0.75% trade fee (25% off)',
      ],
    },
    elite: {
      name: 'Flash Elite',
      price: 29.99,
      period: 'month',
      features: [
        'Everything in Pro',
        'ALL chains (ETH, SOL, BSC, ARB, BASE)',
        'Whale convergence alerts (3+ whales)',
        'Copy trading top performers',
        '100 custom wallet tracks',
        'Private alpha group',
        '0.5% trade fee (50% off)',
        'Priority support',
      ],
    },
  },
} as const;
