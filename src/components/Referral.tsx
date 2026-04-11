import { CONFIG } from '@/lib/config';

export default function Referral() {
  return (
    <section className="py-20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 border border-amber-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">💰</span>
              <div>
                <h2 className="text-2xl font-bold text-white">Earn up to 35% Revenue</h2>
                <p className="text-amber-400/80 text-sm font-medium">Tiered referral — the more you refer, the more you earn</p>
              </div>
            </div>

            <p className="text-dark-300 mb-6">
              Share your referral link and earn a percentage of all trading fees from users you invite.
              Starts at 25% — scales to <strong className="text-white">35%</strong> as your network grows.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                '25% → 30% → 35% lifetime fee share (tiered)',
                'Unique deep link — tracks every referral',
                'Real-time earnings tracker in your dashboard',
                'No minimum payout — instant SOL rewards',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-dark-200 text-sm">
                  <span className="text-amber-400 text-lg">✅</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={CONFIG.telegram.whaleBot}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-800 hover:bg-dark-700 text-white font-semibold transition-colors border border-dark-600"
            >
              Start Earning →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
