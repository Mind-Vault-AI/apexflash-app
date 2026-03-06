import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ApexFlash | Solana Trading Bot on Telegram',
  description:
    'Trade Solana tokens directly from Telegram. Jupiter V6 best routes, 1% flat fee, encrypted non-custodial wallet. Real-time whale alerts included.',
  keywords:
    'solana trading bot, telegram trading bot, jupiter swap, whale alerts, SOL trading, crypto bot, DeFi, non-custodial wallet',
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
    card: 'summary',
    site: '@MindVault_ai',
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
      </body>
    </html>
  );
}
