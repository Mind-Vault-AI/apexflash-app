'use client';

import { useState } from 'react';
import { Search, Shield, BookOpen, TrendingUp, Zap, ExternalLink, ChevronRight, CheckCircle } from 'lucide-react';
import { CONFIG } from '@/lib/config';

const TOOLS = [
  {
    id: 'whale-alerts',
    icon: '🐋',
    title: 'Whale Alerts',
    desc: 'Real-time alerts when wallets with $500K+ make trades on Solana or Ethereum.',
    features: ['Instant Telegram alerts', 'AI sentiment per alert', '500+ tracked wallets', 'Buy button included'],
    cta: 'Start Free',
    link: CONFIG.telegram.apexBot,
    color: 'apex',
  },
  {
    id: 'token-scanner',
    icon: '🔍',
    title: 'Token Scanner',
    desc: 'Search any Solana token by name or address. See price, volume, and whale activity.',
    features: ['Search by name or address', 'Live price + volume', 'Whale accumulation data', '1-tap buy via Jupiter'],
    cta: 'Try Scanner',
    link: `${CONFIG.telegram.apexBot}?start=search`,
    color: 'purple',
  },
  {
    id: 'portfolio',
    icon: '📊',
    title: 'Portfolio Tracker',
    desc: 'Track your Solana positions with live P/L, entry prices, and SL/TP management.',
    features: ['Live profit/loss per position', 'Auto stop-loss & take-profit', 'Entry price tracking', 'Multi-token support'],
    cta: 'Track Portfolio',
    link: `${CONFIG.telegram.apexBot}?start=portfolio`,
    color: 'green',
  },
  {
    id: 'referral',
    icon: '💰',
    title: 'Earn 25% Revenue',
    desc: 'Share your referral link and earn 25% of all trading fees from users you invite.',
    features: ['25% lifetime fee share', 'Unique deep links', 'Real-time earnings tracker', 'No minimum payout'],
    cta: 'Start Earning',
    link: `${CONFIG.telegram.apexBot}?start=referral`,
    color: 'amber',
  },
];

const TIPS = [
  { icon: '🐋', tip: 'Follow whale buys, not sells. Big wallets sell regularly to rebalance — their buys are the signal.' },
  { icon: '⏱️', tip: 'Speed matters. When 2+ whales buy the same token within an hour, that\'s a strong convergence signal.' },
  { icon: '🛡️', tip: 'Always set stop-loss. Even whale trades fail. Use 10-15% SL to protect your capital.' },
  { icon: '📊', tip: 'Check whale P/L history before following. A whale with 70% win rate is worth following. 40% is not.' },
  { icon: '🎯', tip: 'Size your trades. Never put more than 5% of your portfolio on a single whale-follow trade.' },
  { icon: '🔍', tip: 'Verify on Solscan. Before buying, check the token contract — look for mint authority and top holders.' },
];

export default function FreeTools() {
  const [activeTip, setActiveTip] = useState(0);

  return (
    <section id="free-tools" className="py-12 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-4">
            <Shield className="w-4 h-4" />
            <span>100% Free — No Credit Card</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3">
            Free Trading Tools
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto">
            Everything you need to trade Solana smarter. All free. No catch.
            Open the bot and start using these tools in 30 seconds.
          </p>
        </div>

        {/* Tool Cards */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {TOOLS.map(tool => {
            const colorMap: Record<string, string> = {
              apex: 'border-apex-500/30 hover:border-apex-500/50',
              purple: 'border-purple-500/30 hover:border-purple-500/50',
              green: 'border-green-500/30 hover:border-green-500/50',
              amber: 'border-amber-500/30 hover:border-amber-500/50',
            };
            const bgMap: Record<string, string> = {
              apex: 'bg-apex-500/10',
              purple: 'bg-purple-500/10',
              green: 'bg-green-500/10',
              amber: 'bg-amber-500/10',
            };
            return (
              <div
                key={tool.id}
                className={`glass-card rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:shadow-lg ${colorMap[tool.color] || colorMap.apex}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl">{tool.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{tool.title}</h3>
                    <p className="text-sm text-dark-300 mt-1">{tool.desc}</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-5">
                  {tool.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-dark-200">
                      <CheckCircle className={`w-4 h-4 shrink-0 ${
                        tool.color === 'apex' ? 'text-apex-400' :
                        tool.color === 'purple' ? 'text-purple-400' :
                        tool.color === 'green' ? 'text-green-400' :
                        'text-amber-400'
                      }`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all ${bgMap[tool.color] || bgMap.apex} hover:opacity-80`}
                >
                  {tool.cta}
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Trading Tips Carousel */}
        <div className="glass-card rounded-2xl p-5 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-apex-400" />
            <h3 className="text-lg font-bold text-white">Free Trading Tips</h3>
            <span className="text-xs text-dark-400 ml-auto">Tap to browse</span>
          </div>

          <div className="relative">
            <div className="p-4 sm:p-6 bg-dark-800/60 rounded-xl border border-dark-700/40 min-h-[100px]">
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0">{TIPS[activeTip].icon}</span>
                <p className="text-dark-200 text-sm sm:text-base leading-relaxed">
                  {TIPS[activeTip].tip}
                </p>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {TIPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTip(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeTip ? 'bg-apex-400 w-6' : 'bg-dark-600 hover:bg-dark-500'
                  }`}
                  aria-label={`Tip ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href={CONFIG.telegram.apexBot}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-apex-400 hover:text-apex-300 text-sm font-medium transition-colors"
            >
              <Zap className="w-4 h-4" />
              Get daily tips + whale alerts in the bot
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
