import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import AuthProvider from '@/components/AuthProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'ApexFlash v3.15.2 | AI Whale Intelligence & Godmode Trading',
  description:
    'AI detects whale token swaps and grades every signal A-D. Godmode Infinity Engine (v3.15.2) features 24/7 autonomous zero-loss trading. Free on Telegram.',
  keywords:
    'solana whale alerts, whale tracker, AI trading signals, crypto whale intelligence, telegram trading bot, jupiter swap, whale buy detection, signal grading, copy trading, win rate, solana dex bot, crypto bot, DeFi, whale wallet tracker, smart money alerts',
  metadataBase: new URL('https://apexflash.pro'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'ApexFlash | AI Whale Intelligence for Solana',
    description:
      'AI detects whale token buys and grades every signal. 1-tap buy button, win rate tracking, copy trading. Free on Telegram.',
    url: 'https://apexflash.pro',
    siteName: 'ApexFlash',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'ApexFlash — AI Whale Intelligence for Solana' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MindVault_ai',
    title: 'ApexFlash | See What Whales Buy Before the Pump',
    description: 'AI-graded whale alerts + 1-tap buy. Signal quality filter, win rate tracking. Free on Telegram.',
    images: ['/opengraph-image'],
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
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <AuthProvider>
        {children}
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
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
                'AI-powered Solana whale intelligence bot. Detects what tokens whales buy via Jupiter/Raydium, grades every signal A-D, tracks win rate. Free on Telegram.',
              url: 'https://apexflash.pro',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '6',
                bestRating: '5',
              },
              offers: [
                {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                  name: 'Free Forever',
                  description: 'ETH + SOL instant whale alerts, AI signal grading, 1-tap buy via Jupiter',
                },
                {
                  '@type': 'Offer',
                  price: '9.99',
                  priceCurrency: 'USD',
                  name: 'Flash Pro',
                  description: 'Unlimited trades, full AI breakdown, copy trading, DCA bot, 20 wallet tracks',
                },
                {
                  '@type': 'Offer',
                  price: '29.99',
                  priceCurrency: 'USD',
                  name: 'Flash Elite',
                  description: 'All chains, 100 wallet tracks, convergence alerts, private alpha group',
                },
              ],
              creator: {
                '@type': 'Organization',
                name: 'MindVault-AI',
                url: 'https://apexflash.pro',
              },
              featureList: 'AI Signal Grading, Whale Swap Detection, Win Rate Tracking, Copy Trading, DCA Bot, Jupiter V6 Integration',
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
                    text: 'ApexFlash is an AI-powered Solana whale intelligence bot on Telegram. It detects what tokens whales buy via Jupiter and Raydium swaps, grades every signal A through D using CryptoBERT AI, and lets you buy with one tap. Free to use.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How does AI Signal Grading work?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Every whale alert is scored 0-100 based on 6 factors: trade direction, size, wallet reputation, AI sentiment alignment, chain volatility, and historical performance. Grade A-C signals are sent to users. Grade D signals are automatically filtered out to protect your win rate.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is ApexFlash free to use?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. The free tier includes ETH and SOL instant whale alerts, AI signal grading, whale swap detection, 1-tap buy via Jupiter, auto stop-loss and take-profit, and win rate tracking. Pro ($9.99/mo) adds unlimited trades and copy trading. Elite ($29.99/mo) adds all chains and convergence alerts.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is whale swap detection?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Unlike other bots that only show whale transfers (ETH moving between wallets), ApexFlash detects the actual token SWAPS — what specific token the whale bought on Jupiter or Raydium, how much, and at what price. This is actionable intelligence with a Buy button included.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What are the trading fees?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ApexFlash charges a flat 1% fee per trade. Pro users pay 0.75% and Elite users pay 0.5%. Jupiter V6 handles routing for the best swap rates across all Solana DEXs.',
                  },
                },
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`,
          }}
        />
      </body>
    </html>
  );
}
