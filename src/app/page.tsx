import dynamic from 'next/dynamic';
import CryptoTicker from '@/components/CryptoTicker';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Exchanges from '@/components/Exchanges';
import Referral from '@/components/Referral';
import Pricing from '@/components/Pricing';
import EmailCapture from '@/components/EmailCapture';
import Footer from '@/components/Footer';
import TrackingBoot from '@/components/TrackingBoot';

// Lazy load heavy/below-fold components
const LiveChart = dynamic(() => import('@/components/LiveChart'));
const Reviews = dynamic(() => import('@/components/Reviews'));
const FAQ = dynamic(() => import('@/components/FAQ'));

export default function Home() {
  return (
    <main className="min-h-screen">
      <TrackingBoot />
      <CryptoTicker />
      <Navbar />
      <Hero />
      <Features />
      <LiveChart />
      <Exchanges />
      <Referral />
      <Reviews />
      <Pricing />
      <FAQ />
      <EmailCapture />
      <Footer />
    </main>
  );
}
