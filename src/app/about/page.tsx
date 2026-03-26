import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Target, Zap, Users, TrendingUp, Bot } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About ApexFlash — Built by a Trader, For Traders',
  description:
    'ApexFlash is an AI-powered whale tracking and trade execution bot built by Erik U. in Amsterdam. Our mission: democratise smart-money trading for every crypto trader.',
  openGraph: {
    title: 'About ApexFlash',
    description: 'Built by a trader, for traders. AI whale signals + automated execution.',
  },
};

const values = [
  {
    icon: Shield,
    title: 'No Hiding',
    desc: 'Every trade we execute is tracked and shown publicly on the site. Win rate, P/L, all of it. If we lose, you see it.',
  },
  {
    icon: Target,
    title: 'Outcomes First',
    desc: 'We build for results, not features. The bot executes so you don\'t have to watch charts. Your time is money.',
  },
  {
    icon: Zap,
    title: 'Speed is Alpha',
    desc: 'Whale wallets move fast. Our detection-to-alert pipeline runs in under 10 seconds. Late = missed trade.',
  },
  {
    icon: Bot,
    title: 'AI That Earns Its Keep',
    desc: 'Every signal is graded A–D by our AI (CryptoBERT + heuristics). Grade D signals are filtered out before they reach you.',
  },
  {
    icon: TrendingUp,
    title: 'LEAN / No Bullshit',
    desc: 'We measure everything. Win rate, churn, conversion. If a metric drops, we fix it — not after the next sprint, today.',
  },
  {
    icon: Users,
    title: 'Community = Moat',
    desc: 'The best alpha comes from collective whale tracking. 2,000+ traders watching 100 wallets beats one person watching 10.',
  },
];

const milestones = [
  { date: 'Jan 2026', event: 'First whale alert sent on Ethereum mainnet' },
  { date: 'Feb 2026', event: 'Solana chain added — 1-tap token swap via Jupiter V6' },
  { date: 'Mar 2026', event: 'CryptoBERT AI grading live — Grade A/B filter active' },
  { date: 'Mar 2026', event: 'PWA launched — push notifications, live dashboard' },
  { date: 'Mar 2026', event: '2,000+ active users, 5 affiliate partnerships' },
  { date: 'Q2 2026', event: 'War Watch (geopolitical signals) — in development' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dark-900 text-white">
      {/* Nav back */}
      <div className="px-4 py-4 max-w-4xl mx-auto">
        <Link href="/" className="text-sm text-dark-400 hover:text-white transition-colors">
          ← Back to ApexFlash
        </Link>
      </div>

      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm mb-6">
            <Bot className="w-4 h-4" />
            <span>Built in Amsterdam — Shipping daily</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-6">
            Built by a Trader,{' '}
            <span className="gradient-text">For Traders</span>
          </h1>
          <p className="text-lg text-dark-300 leading-relaxed">
            ApexFlash started as a personal tool to stop missing whale moves on Ethereum.
            It became a platform when we realised most crypto traders face the same problem:
            smart money moves fast, manual watching is impossible, and 95% of &quot;signals&quot;
            are noise.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-8 border border-dark-700/50">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                E
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Erik U.</h2>
                <p className="text-sm text-primary-400 mb-4">Founder &amp; Builder — Amsterdam, NL</p>
                <p className="text-dark-300 leading-relaxed mb-4">
                  I&apos;ve traded crypto since 2017. The pattern I kept seeing: whale wallets moved,
                  price followed minutes later, and by the time a regular trader saw a signal, it was
                  already too late. I built ApexFlash to close that gap — detect the whale move,
                  grade it with AI, and execute automatically before the crowd catches on.
                </p>
                <p className="text-dark-300 leading-relaxed">
                  ApexFlash is part of{' '}
                  <a
                    href="https://mindvault-ai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    MindVault AI
                  </a>{' '}
                  — a bootstrap venture focused on AI tools that generate real, measurable returns.
                  No VC, no padding. Just build, measure, iterate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Mission: <span className="gradient-text">Democratise Smart-Money Trading</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto leading-relaxed">
            Whale wallets, hedge funds, and insiders have always had information advantages.
            ApexFlash makes that same information — and the execution speed — available to every
            retail trader with a Telegram account. No Bloomberg terminal required.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-8 text-white">How We Operate</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card rounded-xl p-5 border border-dark-700/40">
                <div className="w-10 h-10 rounded-lg bg-primary-500/15 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-dark-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-8 text-white">Milestones</h2>
          <div className="space-y-4">
            {milestones.map(({ date, event }, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="text-xs font-mono text-primary-400 w-20 flex-shrink-0 pt-0.5">
                  {date}
                </div>
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-dark-300">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-8 border border-yellow-500/20 bg-yellow-500/5">
            <h2 className="text-lg font-bold text-yellow-400 mb-4">⚠️ Risk &amp; Transparency</h2>
            <div className="space-y-3 text-sm text-dark-300 leading-relaxed">
              <p>
                ApexFlash provides AI-generated signals and automated trade execution as a tool —
                not as financial advice. Crypto trading carries significant risk of capital loss.
              </p>
              <p>
                Our win rate is tracked in real-time and displayed publicly. When the bot loses,
                you see it. We never cherry-pick results.
              </p>
              <p>
                ApexFlash operates from the Netherlands and complies with applicable EU regulations.
                We do not provide investment advice, portfolio management, or regulated financial services.
              </p>
              <div className="flex gap-4 pt-2">
                <Link href="/terms" className="text-primary-400 hover:text-primary-300 transition-colors">
                  Terms of Service →
                </Link>
                <Link href="/disclaimer" className="text-primary-400 hover:text-primary-300 transition-colors">
                  Risk Disclaimer →
                </Link>
                <Link href="/privacy" className="text-primary-400 hover:text-primary-300 transition-colors">
                  Privacy Policy →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Start Trading with the Bot</h2>
          <p className="text-dark-400 mb-8">
            Free forever. 1% per trade. No subscription needed to start.
          </p>
          <a
            href="https://t.me/ApexFlashBot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Open in Telegram — Free
          </a>
          <p className="mt-4 text-xs text-dark-500">
            Questions?{' '}
            <a href="mailto:support@apexflash.pro" className="text-dark-400 hover:text-white transition-colors">
              support@apexflash.pro
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
