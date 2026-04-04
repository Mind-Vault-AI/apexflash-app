// ============================================================
// GLOBAL CONFIG
// ============================================================

export const CONFIG = {
  siteName: 'ApexFlash',
  siteUrl: 'https://apexflash.pro',
  supportEmail: 'support@apexflash.pro',
  telegram: {
    whaleBot: 'https://t.me/apexflash_bot',
    apexBot: 'https://t.me/apexflash_bot',
    channel: 'https://t.me/ApexFlashAlerts',
  },
  gumroad: {
    proUrl: process.env.NEXT_PUBLIC_GUMROAD_PRO_URL || 'https://mindvault34.gumroad.com/l/rwauqu',
    eliteUrl: process.env.NEXT_PUBLIC_GUMROAD_ELITE_URL || 'https://mindvault34.gumroad.com/l/unetcl',
  },
  social: {
    twitter: 'https://x.com/MindVault_ai',
    discord: 'https://discord.gg/apexflash',
    tiktok: 'https://www.tiktok.com/@wox.apex',
    reddit: '',
  },
// <KAIZEN_PRICING_START>
  pricing: {
    'free': {
      'name': 'Free Forever',
      'price': 0,
      'features': [
        'Bot alerts you the moment a whale moves — ETH + SOL',
        'AI filters noise — only Grade A/B signals in your feed',
        'Bot buys in 1 tap — no manual chart watching needed',
        'Auto stop-loss & take-profit — bot protects your trade',
        'Track your win rate live — see your edge in numbers',
        'Unlock $8K+ exchange bonuses via affiliate deals',
        'Only 1% per trade — no subscription required'
      ]
    },
    'pro': {
      'name': 'Flash Pro',
      'price': 9.99,
      'period': 'month',
      'trial': '1 week free trial',
      'features': [
        '1 week free trial — try before you pay',
        'Everything in Free',
        'Godmode Infinity v3.15.2 Engine — 24/7 autonomous trading',
        'Zero-Loss Protection — auto-breakeven lock and hedging',
        'Full AI breakdown per signal — know exactly why to buy',
        'Copy the bot automatically via Mizar — zero effort trading',
        'DCA Bot builds your position automatically',
        'Track 20 wallets — follow any whale manually',
        '0.75% trade fee — save 25% vs free tier'
      ]
    },
    'elite': {
      'name': 'Flash Elite',
      'price': 29.99,
      'period': 'month',
      'features': [
        'Everything in Pro',
        'Catch whales on ALL chains — ETH, SOL, BSC, ARB, BASE',
        'Whale convergence alerts — when 3+ whales agree, act fast',
        'Auto-copy top-performing traders — profit without deciding',
        'Track 100 wallets — full smart money coverage',
        'Private alpha group — early signals before the crowd',
        '0.5% trade fee — save 50% on every execution',
        'Priority support — get answers in minutes, not hours'
      ]
    }
  },
// <KAIZEN_PRICING_END>
} as const;
