import { CONFIG } from '@/lib/config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Risk Disclosure & Disclaimer | ApexFlash',
  description: 'ApexFlash Risk Disclosure — understand the risks of cryptocurrency trading before using our service.',
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
        <h1 className="text-3xl font-bold text-white mb-2">Risk Disclosure &amp; Disclaimer</h1>
        <p className="text-dark-400 text-sm mb-10">Last updated: March 8, 2026</p>

        <div className="space-y-8 text-dark-300 text-sm leading-relaxed">
          <section className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
            <p className="text-yellow-300 font-semibold text-base mb-2">
              IMPORTANT: READ THIS BEFORE USING APEXFLASH
            </p>
            <p>
              Cryptocurrency trading carries a HIGH LEVEL OF RISK and may not be suitable for
              all investors. You could lose some or ALL of your invested capital. Do not trade
              with money you cannot afford to lose.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. No Financial Advice</h2>
            <p>
              ApexFlash, MindVault-AI, and all associated services, bots, websites, and
              communications do NOT provide financial, investment, tax, accounting, or legal
              advice. All content is for informational and educational purposes only.
            </p>
            <p className="mt-2">
              No information provided by ApexFlash — including whale alerts, trading signals,
              AI analysis, market data, or any other feature — should be interpreted as a
              recommendation to buy, sell, hold, or trade any cryptocurrency, token, or
              financial instrument.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Trading Risks</h2>
            <p>You acknowledge and accept that:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>
                <strong className="text-white">Volatility:</strong> Cryptocurrencies are extremely
                volatile. Prices can drop 50% or more in hours
              </li>
              <li>
                <strong className="text-white">Total loss:</strong> You may lose 100% of your
                investment. Only invest what you can afford to lose
              </li>
              <li>
                <strong className="text-white">Past performance:</strong> Historical performance of
                signals, strategies, or alerts does NOT guarantee future results
              </li>
              <li>
                <strong className="text-white">Market manipulation:</strong> Crypto markets may be
                subject to manipulation, pump-and-dump schemes, and fraud
              </li>
              <li>
                <strong className="text-white">Regulatory risk:</strong> Cryptocurrency regulations
                vary by jurisdiction and can change without warning
              </li>
              <li>
                <strong className="text-white">Technology risk:</strong> Smart contracts, blockchain
                networks, and exchanges can have bugs, hacks, or outages
              </li>
              <li>
                <strong className="text-white">Liquidity risk:</strong> Some tokens may become
                illiquid or worthless
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Whale Tracking Disclaimer</h2>
            <p>
              Whale alerts and smart money tracking show blockchain activity. This data:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>May be delayed or incomplete</li>
              <li>Does not reveal the intent behind transactions</li>
              <li>Large wallet movements do not necessarily indicate market direction</li>
              <li>Whales may be moving funds between their own wallets</li>
              <li>Following whale activity is NOT a guaranteed profitable strategy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. AI &amp; Signal Disclaimer</h2>
            <p>
              AI-generated analysis, sentiment scores, and trading signals are produced by
              machine learning models. These models:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Can be wrong and produce inaccurate predictions</li>
              <li>Are based on historical data which may not reflect future conditions</li>
              <li>Do not account for all market factors</li>
              <li>Should never be the sole basis for any trading decision</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Wallet &amp; Transaction Disclaimer</h2>
            <p>
              If you use the bot&apos;s built-in wallet and swap functionality:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Transactions on blockchain are irreversible — there are no refunds</li>
              <li>We are not responsible for failed, delayed, or incorrect transactions</li>
              <li>Slippage, network fees, and price impact may affect your trades</li>
              <li>Do not store large amounts in any hot wallet</li>
              <li>You are solely responsible for your wallet security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Affiliate Disclosure</h2>
            <p>
              ApexFlash contains affiliate links to cryptocurrency exchanges including but not
              limited to Binance, Bybit, OKX, MEXC, and others. When you sign up through these
              links, we may earn a commission. This does not increase the cost to you.
            </p>
            <p className="mt-2">
              Affiliate relationships do not influence our alerts, signals, or recommendations.
              We are not endorsed by, sponsored by, or officially associated with any exchange
              unless explicitly stated.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Third-Party Services</h2>
            <p>
              The Service integrates with third-party platforms (exchanges, Telegram, Gumroad,
              blockchain APIs). We are not responsible for:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Downtime or errors on third-party platforms</li>
              <li>Changes to third-party APIs or terms of service</li>
              <li>Loss of funds on any exchange or platform</li>
              <li>Actions taken by third-party services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Limitation of Liability</h2>
            <p className="font-medium text-white">
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW:
            </p>
            <p className="mt-2">
              MindVault-AI, ApexFlash, its operators, employees, and affiliates shall NOT be
              liable for ANY losses, damages, or claims arising from:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Your use of or reliance on the Service</li>
              <li>Trading decisions made based on our alerts, signals, or data</li>
              <li>Technical failures, bugs, or service interruptions</li>
              <li>Unauthorized access to your account or wallet</li>
              <li>Any action or inaction of third-party services</li>
              <li>Force majeure events</li>
            </ul>
            <p className="mt-2">
              YOU USE THIS SERVICE ENTIRELY AT YOUR OWN RISK.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Do Your Own Research</h2>
            <p>
              Always DYOR (Do Your Own Research) before making any financial decision. Consult
              with a qualified financial advisor if you need personalized investment advice.
              ApexFlash is a tool — not a financial advisor.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Jurisdiction</h2>
            <p>
              The Service is not directed at residents of any jurisdiction where cryptocurrency
              trading is prohibited. It is your responsibility to determine whether using the
              Service is legal in your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">11. Contact</h2>
            <p>
              Questions about this disclaimer? Contact us at{' '}
              <a href={`mailto:${CONFIG.supportEmail}`} className="text-apex-400 hover:underline">
                {CONFIG.supportEmail}
              </a>
            </p>
          </section>

          <section className="p-4 rounded-xl border border-dark-700 bg-dark-800/50">
            <p className="text-dark-400 text-xs">
              By using ApexFlash, you acknowledge that you have read, understood, and agree
              to this Risk Disclosure &amp; Disclaimer, our{' '}
              <a href="/terms" className="text-apex-400 hover:underline">Terms of Service</a>, and our{' '}
              <a href="/privacy" className="text-apex-400 hover:underline">Privacy Policy</a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
