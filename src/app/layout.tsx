import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ApexFlash | Solana Trading Bot on Telegram',
  description:
    'Trade Solana tokens directly from Telegram. Jupiter V6 best routes, 1% flat fee, encrypted non-custodial wallet. Real-time whale alerts included.',
  keywords:
    'solana trading bot, telegram trading bot, jupiter swap, whale alerts, SOL trading, crypto bot, DeFi, non-custodial wallet, whale tracker, crypto whale alerts, solana swap bot, telegram crypto bot, jupiter v6, solana dex bot, buy solana telegram, whale wallet tracker',
  metadataBase: new URL('https://apexflash.pro'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'ApexFlash | Solana Trading Bot on Telegram',
    description:
      'Buy & sell Solana tokens in 3 taps. Jupiter V6 aggregator, 1% flat fee, encrypted wallet. Free tier available.',
    url: 'https://apexflash.pro',
    siteName: 'ApexFlash',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ApexFlashPro',
    title: 'ApexFlash | Solana Trading Bot on Telegram',
    description: 'Trade SOL tokens from Telegram. Jupiter V6, 1% fee, whale alerts.',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'theme-color': '#0f172a',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'ApexFlash',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Telegram',
              description:
                'Solana trading bot on Telegram with Jupiter V6 integration, whale alerts, and encrypted wallets.',
              url: 'https://apexflash.pro',
              offers: [
                {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                  name: 'Explorer (Free)',
                },
                {
                  '@type': 'Offer',
                  price: '19',
                  priceCurrency: 'USD',
                  name: 'Flash Pro',
                },
                {
                  '@type': 'Offer',
                  price: '49',
                  priceCurrency: 'USD',
                  name: 'Flash Elite',
                },
              ],
              creator: {
                '@type': 'Organization',
                name: 'MindVault-AI',
                url: 'https://mindvault-ai.com',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is ApexFlash?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ApexFlash is a free Solana trading bot on Telegram that lets you buy and sell tokens in 3 taps. It includes real-time whale alerts, Jupiter V6 swap aggregation, and an encrypted non-custodial wallet.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How does whale tracking work?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ApexFlash monitors 25+ whale wallets across major exchanges like Binance, Coinbase, and OKX. When large transfers happen (exchange withdrawals, accumulation signals), you get instant alerts on Telegram.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is ApexFlash free to use?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, the free tier includes Solana token trading, basic whale alerts, an encrypted wallet, and token search. Pro ($19/mo) adds instant alerts and multi-chain tracking. Elite ($49/mo) adds AI signals and unlimited trades.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is my wallet safe with ApexFlash?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ApexFlash uses Fernet encryption (AES-128-CBC) for all wallets. Your private key is never stored in plain text. The wallet is non-custodial, meaning you control your keys and can export them anytime.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What are the trading fees?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ApexFlash charges a flat 1% fee per trade with no hidden costs. This is competitive with other Telegram trading bots like BONKbot and Trojan. Jupiter V6 handles routing for the best swap rates.',
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
