import CryptoTicker from '@/components/CryptoTicker';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Exchanges from '@/components/Exchanges';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <CryptoTicker />
      <Navbar />
      <Hero />
      <Features />
      <Exchanges />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
