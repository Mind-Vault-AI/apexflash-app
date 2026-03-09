'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'What is ApexFlash?',
    a: 'ApexFlash is a free Solana trading bot on Telegram. You can buy and sell tokens in 3 taps, get real-time whale alerts, and use Jupiter V6 for the best swap routes. No app download needed — it works directly in Telegram.',
  },
  {
    q: 'Is it free to use?',
    a: 'Yes. The free tier includes token trading (1% fee per swap), basic whale alerts, an encrypted wallet, and token search. Pro ($19/mo) adds unlimited alerts and multi-chain tracking. Elite ($49/mo) adds AI signals and priority support.',
  },
  {
    q: 'How does whale tracking work?',
    a: 'We monitor 25+ large wallets across Binance, Coinbase, OKX and other exchanges. When big transfers happen — exchange withdrawals, accumulation patterns, unusual moves — you get instant alerts on Telegram so you can act before the crowd.',
  },
  {
    q: 'Is my wallet safe?',
    a: 'Your private key is encrypted with Fernet (AES-128-CBC) and never stored in plain text. The wallet is non-custodial — you control your keys and can export them anytime. We never have access to your funds.',
  },
  {
    q: 'What are the fees?',
    a: 'A flat 1% per trade. No hidden fees, no withdrawal fees, no monthly minimum. Jupiter V6 handles routing to get you the best swap rate across all Solana DEXes.',
  },
  {
    q: 'How do I get started?',
    a: 'Open Telegram, search for @ApexFlashBot, tap /start. Your encrypted wallet is created automatically. Fund it with SOL and you can trade immediately. The whole setup takes under 2 minutes.',
  },
  {
    q: 'Can I earn by referring friends?',
    a: 'Yes. Share your referral link and earn 25% of the trading fees from everyone you refer. There\'s no cap — the more active traders you bring, the more you earn.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-10 sm:py-16 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
          <p className="text-dark-400">
            Everything you need to know before you start.
          </p>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="glass-card overflow-hidden transition-colors hover:border-dark-600/70"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
              >
                <span className="text-sm sm:text-base font-medium text-dark-100 pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-dark-400 flex-shrink-0 transition-transform duration-200 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? 'max-h-60 pb-4 sm:pb-5' : 'max-h-0'
                }`}
              >
                <p className="px-4 sm:px-5 text-sm text-dark-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
