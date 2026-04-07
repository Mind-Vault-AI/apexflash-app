import { Activity, BarChart3, Bot, Eye, Shield, Zap } from 'lucide-react';

const FEATURES = [
  {
    icon: Eye,
    title: 'Whale Tracking',
    description:
      'Monitor 10+ major exchange wallets in real-time. Get alerted when whales move BTC, ETH, and altcoins before price impact hits.',
    badge: 'Live',
  },
  {
    icon: Activity,
    title: 'AI Market Signals',
    description:
      'Our AI analyzes on-chain data, social sentiment, and technical patterns to generate high-conviction trading signals.',
    badge: 'Active',
  },
  {
    icon: Bot,
    title: 'Copy Trading',
    description:
      'Follow top-performing traders on Mizar. Automatically mirror their trades with customizable risk settings and position sizing.',
    badge: 'Live',
  },
  {
    icon: Bot,
    title: 'Smart DCA Bot',
    description:
      'Automated Dollar-Cost Averaging with intelligent timing. Buy the dips automatically based on whale activity and sentiment.',
    badge: 'Live',
  },
  {
    icon: BarChart3,
    title: 'Multi-Exchange Dashboard',
    description:
      'Connect your exchange accounts and manage everything from one dashboard. Track portfolio, PnL, and open positions.',
    badge: 'Coming Soon',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description:
      'Enterprise-grade circuit breakers, position sizing with Kelly Criterion, and staged liquidation protocols protect your capital.',
    badge: 'Built',
  },
  {
    icon: Zap,
    title: 'Flash Arbitrage Alerts',
    description:
      'Detect price discrepancies across exchanges in real-time. Act on arbitrage opportunities before they close.',
    badge: 'Coming Soon',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Your <span className="gradient-text">Trading Edge</span>
          </h2>
          <p className="text-dark-400 max-w-2xl mx-auto text-lg">
            Professional-grade tools that give retail traders institutional-level market intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="glass-card p-6 hover:border-apex-500/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-apex-500/10 flex items-center justify-center group-hover:bg-apex-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-apex-400" />
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    feature.badge === 'Live'
                      ? 'bg-apex-500/20 text-apex-400'
                      : feature.badge === 'Active' || feature.badge === 'Built'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-dark-700 text-dark-400'
                  }`}
                >
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-dark-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
