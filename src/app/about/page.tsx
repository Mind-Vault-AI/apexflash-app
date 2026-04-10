import type { Metadata } from 'next';
import { Zap, Target, Shield, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About ApexFlash | AI-Powered Crypto Trading Intelligence',
  description:
    'ApexFlash is a MindVault-AI project — built to give retail traders the same intelligence edge as institutional players.',
};

const PILLARS = [
  {
    icon: Target,
    title: 'Mission',
    body:
      'Give every retail trader access to the same market intelligence that institutional traders have. Whale tracking, AI signals, and smart auto-trading — democratized.',
  },
  {
    icon: TrendingUp,
    title: 'Strategy',
    body:
      'We track smart money on-chain using GMGN AI data. When top-performing wallets (smart degens) converge on a token, we grade it and alert before the crowd catches on.',
  },
  {
    icon: Shield,
    title: 'Safety First',
    body:
      'Every trade goes through our Zero-Loss Manager: circuit breakers, position limits, and stop-loss enforcement. Auto-trading is off by default until PDCA results prove signal quality.',
  },
  {
    icon: Zap,
    title: 'Technology',
    body:
      'Built on a 7-model AI router (Groq → Cerebras → Gemini → OpenRouter), GMGN.AI trading API, Jupiter DEX, and live Redis-backed signal pipeline. Always on, always learning.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-apex-900/20 via-dark-950 to-dark-950" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-apex-500/10 border border-apex-500/20 text-apex-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-apex-400 animate-pulse" />
            A MindVault-AI Project
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Built by Traders,<br />
            <span className="gradient-text">for Traders</span>
          </h1>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto leading-relaxed">
            ApexFlash is the trading intelligence layer that levels the playing field.
            Real-time whale tracking, AI-graded signals, and smart auto-trading —
            all in one Telegram bot.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass-card p-8">
                <div className="w-12 h-12 rounded-xl bg-apex-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-apex-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-dark-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 border-t border-dark-800/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-dark-400 mb-6">
            Questions, partnerships, or feedback — we read every message.
          </p>
          <a
            href="mailto:support@apexflash.pro"
            className="btn-primary inline-flex items-center gap-2"
          >
            support@apexflash.pro
          </a>
          <p className="text-dark-500 text-sm mt-6">
            © {new Date().getFullYear()} ApexFlash by MindVault-AI · All rights reserved
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
