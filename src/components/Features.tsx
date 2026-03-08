import { Eye, Activity, Shield } from 'lucide-react';

const FEATURES = [
  {
    icon: Eye,
    title: 'Whale Tracking',
    description: 'Real-time alerts when institutional wallets move millions. ETH, SOL, BTC - you see it first.',
    badge: 'Live',
  },
  {
    icon: Activity,
    title: 'AI Market Signals',
    description: 'On-chain data + social sentiment + technical analysis = high-conviction trade setups.',
    badge: 'Active',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Trade limits, slippage protection, and price impact warnings guard every trade. Confirm before you execute — no surprises.',
    badge: 'Active',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Your <span className="gradient-text">Trading Edge</span>
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto">
            Professional tools that give retail traders an unfair advantage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="glass-card p-6 hover:border-apex-500/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-apex-500/10 flex items-center justify-center group-hover:bg-apex-500/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-apex-400" />
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  feature.badge === 'Live'
                    ? 'bg-apex-500/20 text-apex-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
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
