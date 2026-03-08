import CryptoTicker from '@/components/CryptoTicker';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Exchanges from '@/components/Exchanges';
import Reviews from '@/components/Reviews';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/EmailCapture';
import Footer from '@/components/Footer';
import SocialProofToast from '@/components/SocialProofToast';

export default function Home() {
  return (
    <main className="min-h-screen">
      <CryptoTicker />
      <Navbar />
      <Hero />
      <Features />
      <Exchanges />
      <Reviews />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
      <SocialProofToast />
    </main>
  );
}
