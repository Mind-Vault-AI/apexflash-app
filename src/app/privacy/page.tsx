import { CONFIG } from '@/lib/config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | ApexFlash',
  description: 'ApexFlash Privacy Policy — how we collect, use, and protect your data. GDPR compliant.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-dark-400 text-sm mb-10">Last updated: March 8, 2026</p>

        <div className="space-y-8 text-dark-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Who We Are</h2>
            <p>
              ApexFlash is operated by MindVault-AI, based in the Netherlands. We are the data
              controller for your personal data processed through this Service.
            </p>
            <p className="mt-2">
              Contact: <a href={`mailto:${CONFIG.supportEmail}`} className="text-apex-400 hover:underline">{CONFIG.supportEmail}</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. What Data We Collect</h2>
            <p className="font-medium text-white mb-2">Via Telegram Bot (@ApexFlashBot):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Telegram user ID and username</li>
              <li>Commands and interactions with the bot</li>
              <li>Subscription tier and referral data</li>
              <li>Encrypted wallet data (if you use the wallet feature)</li>
              <li>Trading activity through the bot</li>
            </ul>

            <p className="font-medium text-white mb-2 mt-4">Via Website (apexflash.pro):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Standard web analytics (page views, referrer, device type)</li>
              <li>Email address (only if you voluntarily provide it)</li>
              <li>No cookies for tracking — we respect your privacy</li>
            </ul>

            <p className="font-medium text-white mb-2 mt-4">Via Gumroad (payments):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Payment processing is handled entirely by Gumroad</li>
              <li>We receive: your email, subscription status, and payment confirmation</li>
              <li>We do NOT receive or store: credit card numbers, bank details, or billing addresses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Why We Collect Data (Legal Basis)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">Contract performance:</strong> To provide you with the Service,
                process subscriptions, and deliver alerts
              </li>
              <li>
                <strong className="text-white">Legitimate interest:</strong> To improve the Service,
                prevent abuse, and send relevant updates
              </li>
              <li>
                <strong className="text-white">Consent:</strong> For optional marketing communications
                (you can opt out at any time)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Deliver whale alerts and trading intelligence</li>
              <li>Manage your subscription and premium features</li>
              <li>Process referral rewards</li>
              <li>Provide customer support</li>
              <li>Improve and optimize the Service</li>
              <li>Prevent fraud and abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Data Sharing</h2>
            <p>We do NOT sell your data. We may share data with:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-white">Gumroad:</strong> Payment processing</li>
              <li><strong className="text-white">Telegram:</strong> Bot communication (via Telegram API)</li>
              <li><strong className="text-white">Render:</strong> Hosting infrastructure</li>
              <li><strong className="text-white">Law enforcement:</strong> Only when legally required</li>
            </ul>
            <p className="mt-2">
              We do not share your data with advertisers, data brokers, or any other third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Data Security</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Wallet data is encrypted using Fernet symmetric encryption</li>
              <li>All connections use HTTPS/TLS encryption</li>
              <li>Automated backups every 2 hours</li>
              <li>Access to user data is restricted to authorized personnel only</li>
            </ul>
            <p className="mt-2">
              While we implement reasonable security measures, no system is 100% secure. You
              acknowledge that you provide data at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Data Retention</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account data: Retained while your account is active</li>
              <li>Trading history: Retained for 12 months, then anonymized</li>
              <li>Payment records: Retained as required by Dutch tax law (7 years)</li>
              <li>After account deletion: Personal data removed within 30 days (except legal obligations)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Your Rights (GDPR)</h2>
            <p>Under EU/EEA law, you have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
              <li><strong className="text-white">Rectification:</strong> Correct inaccurate data</li>
              <li><strong className="text-white">Erasure:</strong> Request deletion of your data (&quot;right to be forgotten&quot;)</li>
              <li><strong className="text-white">Restriction:</strong> Limit how we process your data</li>
              <li><strong className="text-white">Portability:</strong> Receive your data in a portable format</li>
              <li><strong className="text-white">Objection:</strong> Object to processing based on legitimate interest</li>
              <li><strong className="text-white">Withdraw consent:</strong> At any time, without affecting prior processing</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, contact{' '}
              <a href={`mailto:${CONFIG.supportEmail}`} className="text-apex-400 hover:underline">
                {CONFIG.supportEmail}
              </a>. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Cookies</h2>
            <p>
              We do not use tracking cookies. We may use essential cookies for website
              functionality only. No third-party advertising or analytics cookies are used.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. International Data Transfers</h2>
            <p>
              Your data may be processed on servers located outside the EU (our hosting is on
              Render, which uses US-based infrastructure). We ensure appropriate safeguards
              are in place as required by GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">11. Children</h2>
            <p>
              The Service is not intended for anyone under 18. We do not knowingly collect
              data from minors. If you believe a minor has provided data to us, contact us
              and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on
              this page with an updated &quot;Last updated&quot; date. Continued use after
              changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">13. Complaints</h2>
            <p>
              If you believe we have violated your privacy rights, you may file a complaint
              with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens) at{' '}
              <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-apex-400 hover:underline">
                autoriteitpersoonsgegevens.nl
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">14. Contact</h2>
            <p>
              Questions about your privacy? Contact us at{' '}
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
