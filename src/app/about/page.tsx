import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About | ApexFlash — AI-Powered Crypto Trading',
  description:
    'ApexFlash tracks Solana whales in real-time, scores signals with AI, and executes trades autonomously. Built to generate results.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-apex-900/20 via-dark-950 to-dark-950" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-apex-500/10 border border-apex-500/20 text-apex-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-apex-400 animate-pulse" />
            Built for results
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
            What is{' '}
            <span className="gradient-text">ApexFlash</span>?
          </h1>
          <p className="text-xl text-dark-300 leading-relaxed max-w-2xl mx-auto">
            A real-time whale intelligence system for Solana. Tracks the smartest
            on-chain traders, scores every signal with AI, and executes autonomously.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-14">
            How it <span className="gradient-text">works</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Whale Detection',
                desc: 'Monitors 200+ legendary Solana wallets and GMGN smart_degen rankings every 5 minutes via Helius + GMGN API.',
              },
              {
                step: '02',
                title: 'AI Signal Scoring',
                desc: 'CryptoBERT grades every signal A–S based on wallet credibility, volume, price momentum, and rug safety.',
              },
              {
                step: '03',
                title: 'Autonomous Execution',
                desc: 'Grade S signals execute automatically via Jupiter DEX with zero-loss breakeven locks, 2% TP and 1% SL.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="glass-card p-8">
                <div className="text-4xl font-black gradient-text mb-4">{step}</div>
                <h3 className="text-xl font-bold text-dark-50 mb-3">{title}</h3>
                <p className="text-dark-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: '24/7', label: 'Autonomous trading' },
              { value: '1%', label: 'Platform fee per trade' },
              { value: '9', label: 'Active revenue streams' },
              { value: '99.9%', label: 'Uptime SLA target' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-black gradient-text mb-1">{value}</div>
                <div className="text-sm text-dark-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Our <span className="gradient-text">mission</span>
          </h2>
          <p className="text-dark-300 text-lg leading-relaxed mb-6">
            ApexFlash was built by a solo founder with a single goal: give retail
            traders the same real-time intelligence that whales have always had.
          </p>
          <p className="text-dark-300 text-lg leading-relaxed">
            Every feature ships lean, every signal is graded, and every trade is
            logged. PDCA all the way — no fluff, only results.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/ApexFlashBot"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-apex-500 to-emerald-500 text-dark-950 font-bold text-lg hover:opacity-90 transition-opacity"
            >
              Start Free on Telegram
            </a>
            <a
              href="/#pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-apex-500/30 text-apex-400 font-semibold hover:bg-apex-500/10 transition-colors"
            >
              See Plans
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
