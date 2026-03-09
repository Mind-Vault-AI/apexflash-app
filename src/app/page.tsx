import CryptoTicker from '@/components/CryptoTicker';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import MarketPulse from '@/components/MarketPulse';
import Exchanges from '@/components/Exchanges';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <CryptoTicker />
      <Navbar />
      <Hero />
      <Features />
      <MarketPulse />
      <Exchanges />
      <Pricing />
      <FAQ />
      <Footer />
      <StickyCTA />
    </main>
  );
}
