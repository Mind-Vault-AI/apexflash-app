import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://apexflash.pro'),
  title: 'ApexFlash | AI-Powered Crypto Trading Signals & Tools',
  description:
    'Real-time Solana whale tracking, AI trading signals, and smart DCA strategies. Join traders using ApexFlash to spot moves before they happen.',
  keywords: 'crypto trading bot, whale tracker, solana, DCA bot, trading signals, bitcoin, ethereum, GMGN, jupiter swap',
  icons: {
    icon: '/favicon.svg',
  },
  alternates: {
    canonical: 'https://apexflash.pro',
  },
  openGraph: {
    title: 'ApexFlash | AI-Powered Crypto Trading Signals & Tools',
    description: 'Real-time whale tracking & AI trading signals. Spot Solana pumps before they happen.',
    url: 'https://apexflash.pro',
    siteName: 'ApexFlash',
    type: 'website',
    images: [
      {
        url: '/og-image',
        width: 1200,
        height: 630,
        alt: 'ApexFlash — AI Crypto Trading Signals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MindVault_ai',
    title: 'ApexFlash | AI Crypto Trading Signals',
    description: 'Real-time whale tracking & AI trading tools for Solana',
    images: ['/og-image'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
