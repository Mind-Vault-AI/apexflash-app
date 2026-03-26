import { CONFIG } from '@/lib/config';
import { Zap, ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-apex-950/10 to-dark-950" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          Ready to <span className="gradient-text">Trade Smarter?</span>
        </h2>
        <p className="text-dark-400 max-w-xl mx-auto mb-6">
          Get real-time whale alerts and AI trading signals. Free forever on Telegram.
        </p>

        <a
          href={CONFIG.telegram.apexBot}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-lg inline-flex !py-3.5 !px-8"
        >
          <Zap className="w-5 h-5" />
          Get Free Whale Alerts
          <ArrowRight className="w-5 h-5" />
        </a>

        <p className="text-dark-600 text-xs mt-4">
          No credit card required. Instant access via Telegram.
        </p>
      </div>
    </section>
  );
}
