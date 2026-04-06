'use client';

import { CONFIG } from '@/lib/config';
import { trackEvent } from '@/lib/tracking';
import { Check, Zap, Crown } from 'lucide-react';

const PLANS = [
  {
    ...CONFIG.pricing.free,
    icon: Zap,
    cta: 'Start Free',
    href: CONFIG.telegram.whaleBot,
    popular: false,
  },
  {
    ...CONFIG.pricing.pro,
    icon: Zap,
    cta: 'Go Pro',
    href: CONFIG.gumroad.premiumUrl,
    popular: true,
  },
  {
    ...CONFIG.pricing.elite,
    icon: Crown,
    cta: 'Go Elite',
    href: CONFIG.gumroad.eliteUrl,
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-dark-400 max-w-2xl mx-auto text-lg">
            Start free. Upgrade when you need more power.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`glass-card p-8 flex flex-col ${
                plan.popular ? 'glow-border relative' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-apex-600 to-apex-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <plan.icon className={`w-8 h-8 mb-3 ${plan.popular ? 'text-apex-400' : 'text-dark-400'}`} />
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-extrabold text-white">
                  {plan.price === 0 ? 'Free' : `$${plan.price}`}
                </span>
                {'period' in plan && (
                  <span className="text-dark-400 ml-1">/{plan.period}</span>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-apex-400' : 'text-dark-500'}`} />
                    <span className="text-dark-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('pricing_cta_click', { plan: plan.name, cta: plan.cta, href: plan.href })}
                className={plan.popular ? 'btn-primary w-full text-center' : 'btn-secondary w-full text-center'}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
