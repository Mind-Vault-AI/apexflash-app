import { CONFIG } from '@/lib/config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service | ApexFlash',
  description: 'ApexFlash Terms of Service — rules and conditions for using our crypto trading intelligence platform.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-dark-400 text-sm mb-10">Last updated: March 8, 2026</p>

        <div className="prose-legal space-y-8 text-dark-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using ApexFlash (&quot;the Service&quot;), operated by MindVault-AI
              (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), you agree to be bound by these Terms
              of Service. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Description of Service</h2>
            <p>
              ApexFlash provides cryptocurrency market data, whale tracking alerts, and trading
              intelligence tools via Telegram bot (@ApexFlashBot) and web platform (apexflash.pro).
              The Service includes free and paid subscription tiers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Not Financial Advice</h2>
            <p className="font-medium text-white">
              THE SERVICE DOES NOT PROVIDE FINANCIAL, INVESTMENT, TAX, OR LEGAL ADVICE.
            </p>
            <p className="mt-2">
              All information, alerts, signals, and analysis provided by ApexFlash are for
              informational and educational purposes only. Nothing on this platform constitutes
              a recommendation to buy, sell, or hold any cryptocurrency or financial instrument.
              You are solely responsible for your own trading and investment decisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Risk Disclosure</h2>
            <p>
              Cryptocurrency trading involves substantial risk of loss and is not suitable for
              every investor. The value of cryptocurrencies can fluctuate widely, and you may
              lose some or all of your invested capital. Past performance of any trading signal,
              alert, or strategy does not guarantee future results. See our{' '}
              <a href="/disclaimer" className="text-apex-400 hover:underline">Risk Disclosure</a>{' '}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Eligibility</h2>
            <p>
              You must be at least 18 years old to use the Service. By using ApexFlash, you
              represent that you are of legal age in your jurisdiction and that cryptocurrency
              trading is permitted in your jurisdiction. It is your responsibility to ensure
              compliance with local laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. User Accounts &amp; Wallets</h2>
            <p>
              When you interact with @ApexFlashBot, a user profile is created linked to your
              Telegram account. If you use the wallet functionality, an encrypted wallet is
              created for your convenience. You are responsible for:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Keeping your Telegram account secure</li>
              <li>Any activity that occurs under your account</li>
              <li>Managing your own private keys for external wallets</li>
              <li>Backing up your wallet information</li>
            </ul>
            <p className="mt-2">
              We do not have access to your external wallets. Bot-generated wallets are encrypted,
              but we recommend not storing large amounts in any hot wallet.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Subscriptions &amp; Payments</h2>
            <p>
              Paid subscriptions (Flash Pro, Flash Elite) are billed monthly through Gumroad.
              By subscribing, you agree to Gumroad&apos;s terms of service in addition to these terms.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Subscriptions renew automatically each month</li>
              <li>You may cancel at any time through Gumroad</li>
              <li>No refunds for partial months after cancellation</li>
              <li>We reserve the right to change pricing with 30 days notice</li>
              <li>Free tier features may change without notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Affiliate Links &amp; Third Parties</h2>
            <p>
              The Service contains affiliate links to cryptocurrency exchanges and other
              third-party platforms. We may earn commissions from your use of these links.
              This does not affect the price you pay. We are not responsible for the services,
              terms, or actions of third-party platforms. Use of exchanges is at your own risk
              and subject to their respective terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Prohibited Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Use the Service for money laundering or illegal activities</li>
              <li>Attempt to reverse-engineer, decompile, or hack the bot or platform</li>
              <li>Resell, redistribute, or share premium content without authorization</li>
              <li>Use automated tools to scrape or mass-access the Service</li>
              <li>Harass other users or team members</li>
              <li>Manipulate markets using information from the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Limitation of Liability</h2>
            <p className="font-medium text-white">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                ApexFlash, MindVault-AI, and its operators shall NOT be liable for any direct,
                indirect, incidental, consequential, or special damages arising from your use
                of the Service
              </li>
              <li>
                We are NOT liable for any trading losses, missed opportunities, or financial
                decisions made based on information from the Service
              </li>
              <li>
                We are NOT liable for downtime, delays, or inaccuracies in alerts or data
              </li>
              <li>
                Our total liability shall not exceed the amount you paid for the Service in
                the 3 months preceding the claim
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">11. Service Availability</h2>
            <p>
              We strive for 24/7 availability but do not guarantee uninterrupted service.
              The Service may be temporarily unavailable due to maintenance, updates,
              third-party API issues, or circumstances beyond our control. We are not liable
              for any losses resulting from service interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">12. Intellectual Property</h2>
            <p>
              All content, branding, code, and materials on ApexFlash are owned by MindVault-AI.
              You may not copy, modify, or distribute any part of the Service without written
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">13. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to the Service at any
              time, with or without cause, with or without notice. Upon termination, your right
              to use the Service ceases immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">14. Changes to Terms</h2>
            <p>
              We may update these Terms at any time. Continued use of the Service after changes
              constitutes acceptance of the new Terms. Material changes will be communicated
              via Telegram or the website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">15. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Netherlands. Any disputes shall be
              resolved in the courts of the Netherlands.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">16. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{' '}
              <a href={`mailto:${CONFIG.supportEmail}`} className="text-apex-400 hover:underline">
                {CONFIG.supportEmail}
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
