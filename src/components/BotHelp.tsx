'use client';

import { useState } from 'react';
import { CONFIG } from '@/lib/config';
import { MessageCircle, Zap, Wallet, Bell, Shield, ArrowRight, ChevronDown, HelpCircle } from 'lucide-react';

interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
  command?: string;
}

const QUICK_START: Step[] = [
  {
    icon: MessageCircle,
    title: '1. Open the bot on Telegram',
    description: 'Click the button below or search @ApexFlashBot on Telegram. Hit /start to begin.',
    command: '/start',
  },
  {
    icon: Wallet,
    title: '2. Create your wallet',
    description: 'The bot generates an encrypted Solana wallet for you. Your keys are encrypted and only you can access them.',
    command: '/wallet',
  },
  {
    icon: Zap,
    title: '3. Deposit SOL and trade',
    description: 'Send SOL to your wallet address. Then use /buy or /sell with any token contract address to trade instantly.',
    command: '/buy <token>',
  },
  {
    icon: Bell,
    title: '4. Enable whale alerts',
    description: 'Get notified when big wallets make moves. Free users get 3 alerts per day, Pro gets unlimited.',
    command: '/alerts',
  },
];

const COMMON_QUESTIONS = [
  {
    q: 'How do I see my wallet balance?',
    a: 'Send /wallet to the bot. It shows your SOL balance and wallet address. You can also check token balances.',
  },
  {
    q: 'How do I buy a token?',
    a: 'Send /buy followed by the token contract address (CA). Example: /buy EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v. The bot swaps SOL for the token via Jupiter.',
  },
  {
    q: 'What are the trading fees?',
    a: 'ApexFlash charges a flat 1% fee on each swap. No hidden fees, no spread markup. Jupiter routing finds you the best price.',
  },
  {
    q: 'Is my wallet safe?',
    a: 'Your private key is encrypted with military-grade Fernet encryption. The bot never stores unencrypted keys. Only you can access your wallet.',
  },
  {
    q: 'How do referrals work?',
    a: 'Use /referral to get your unique link. When someone joins and trades through your link, you earn 25% of their trading fees. Payouts are automatic.',
  },
  {
    q: 'What commands are available?',
    a: '/start - Get started | /wallet - View wallet | /buy - Buy tokens | /sell - Sell tokens | /alerts - Whale alerts | /referral - Get referral link | /help - Full command list',
  },
];

export default function BotHelp() {
  const [openQ, setOpenQ] = useState<number | null>(null);

  return (
    <section id="help" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-apex-500/10 border border-apex-500/20 text-apex-400 text-xs font-medium mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Bot Guide
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Get Started in <span className="gradient-text">60 Seconds</span>
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto">
            No app to install. No account to create. Just open Telegram and go.
          </p>
        </div>

        {/* Quick Start Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {QUICK_START.map((step, i) => (
            <div key={i} className="glass-card p-5 hover:border-apex-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-apex-500/10 flex items-center justify-center mb-3">
                <step.icon className="w-5 h-5 text-apex-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-dark-400 leading-relaxed mb-3">{step.description}</p>
              {step.command && (
                <code className="text-[11px] bg-dark-800 text-apex-400 px-2 py-1 rounded font-mono">
                  {step.command}
                </code>
              )}
            </div>
          ))}
        </div>

        {/* Common Questions */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-apex-400" />
            Common Bot Questions
          </h3>
          <div className="space-y-2">
            {COMMON_QUESTIONS.map((item, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenQ(openQ === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-sm font-medium text-dark-200">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-dark-500 transition-transform flex-shrink-0 ml-2 ${
                      openQ === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openQ === i ? 'max-h-40 pb-4' : 'max-h-0'
                  }`}
                >
                  <p className="px-4 text-sm text-dark-400 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href={CONFIG.telegram.apexBot}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex !py-3 !px-6"
          >
            <MessageCircle className="w-4 h-4" />
            Open ApexFlash Bot
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-xs text-dark-500 mt-3">
            Need more help? Type /help in the bot or email{' '}
            <a href={`mailto:${CONFIG.supportEmail}`} className="text-apex-400 hover:underline">
              {CONFIG.supportEmail}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
