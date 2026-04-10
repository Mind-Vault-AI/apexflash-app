import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ApexFlash | AI-Powered Crypto Trading Signals & Tools',
  description:
    'Real-time whale tracking, AI trading signals, and smart DCA strategies. Join thousands of traders using ApexFlash to navigate crypto markets.',
  keywords: 'crypto trading bot, whale tracker, DCA bot, trading signals, bitcoin, ethereum',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'ApexFlash | AI-Powered Crypto Trading Signals & Tools',
    description: 'Real-time whale tracking, AI trading signals, and smart DCA strategies.',
    url: 'https://apexflash.pro',
    siteName: 'ApexFlash',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexFlash | AI-Powered Crypto Trading Signals',
    description: 'Real-time whale tracking & AI trading tools',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
