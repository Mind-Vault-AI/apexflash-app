'use client';

import { CONFIG } from '@/lib/config';
import { Check, Zap, Crown } from 'lucide-react';

const PLANS = [
  {
    ...CONFIG.pricing.free,
    icon: Zap,
    cta: 'Start Free — Upgrade Anytime',
    href: CONFIG.telegram.apexBot,
    popular: false,
  },
  {
    ...CONFIG.pricing.pro,
    icon: Zap,
    cta: 'Unlock Pro Alerts',
    href: CONFIG.gumroad.proUrl,
    popular: true,
  },
  {
    ...CONFIG.pricing.elite,
    icon: Crown,
    cta: 'Get Elite Access',
    href: CONFIG.gumroad.eliteUrl,
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-10 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3">
            Choose Your <span className="gradient-text">Edge</span>
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto">
            Start free. Most traders upgrade within 7 days.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`glass-card p-5 sm:p-8 flex flex-col ${
                plan.popular ? 'glow-border relative' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-apex-600 to-apex-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-4 sm:mb-6">
                <plan.icon className={`w-7 h-7 sm:w-8 sm:h-8 mb-2 sm:mb-3 ${plan.popular ? 'text-apex-400' : 'text-dark-400'}`} />
                <h3 className="text-lg sm:text-xl font-bold text-white">{plan.name}</h3>
              </div>

              <div className="mb-5 sm:mb-8">
                <span className="text-4xl font-extrabold text-white">
                  {plan.price === 0 ? 'Free' : `$${plan.price}`}
                </span>
                {'period' in plan && (
                  <span className="text-dark-400 ml-1">/{plan.period}</span>
                )}
                {plan.price === 19 && (
                  <p className="text-xs text-dark-500 mt-1">= $0.63/day — less than a coffee</p>
                )}
                {plan.price === 49 && (
                  <p className="text-xs text-dark-500 mt-1">= $1.63/day — one good trade pays for a year</p>
                )}
              </div>

              <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-8 flex-1">
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
