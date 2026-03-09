'use client';

import { EXCHANGES, type Exchange } from '@/lib/affiliates';
import { ArrowUpRight, Star } from 'lucide-react';

function ExchangeCard({ exchange }: { exchange: Exchange }) {
  return (
    <a
      href={exchange.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`glass-card p-4 sm:p-6 hover:border-apex-500/30 transition-all duration-300 group block ${
        exchange.tier === 'featured' ? 'glow-border md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      {exchange.tier === 'featured' && (
        <div className="flex items-center gap-1.5 text-apex-400 text-xs font-bold mb-3">
          <Star className="w-3.5 h-3.5 fill-apex-400" />
          FEATURED PARTNER
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{exchange.logo}</span>
          <div>
            <h3 className="text-lg font-bold text-white">{exchange.name}</h3>
            <span className="text-apex-400 text-sm font-medium">{exchange.commission}</span>
          </div>
        </div>
        <ArrowUpRight className="w-5 h-5 text-dark-500 group-hover:text-apex-400 transition-colors" />
      </div>

      <p className="text-dark-400 text-sm mb-4">{exchange.description}</p>

      <div className="flex flex-wrap gap-2">
        {exchange.features.map((feat) => (
          <span key={feat} className="text-xs bg-dark-800 text-dark-300 px-2.5 py-1 rounded-lg">
            {feat}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function Exchanges() {
  return (
    <section id="exchanges" className="py-10 sm:py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3">
            Trade Smarter on <span className="gradient-text">Top Exchanges</span>
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto">
            Exclusive fee discounts — save hundreds per month. Only through ApexFlash.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXCHANGES.map((exchange) => (
            <ExchangeCard key={exchange.slug} exchange={exchange} />
          ))}
        </div>

        <p className="text-center text-dark-600 text-xs mt-6">
          ApexFlash earns referral commissions — this funds free whale alerts and tools for the community.
        </p>
      </div>
    </section>
  );
}
