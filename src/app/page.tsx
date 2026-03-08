import CryptoTicker from '@/components/CryptoTicker';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import MarketMovers from '@/components/MarketMovers';
import MiniCharts from '@/components/MiniCharts';
import TrendingNews from '@/components/TrendingNews';
import Exchanges from '@/components/Exchanges';
import BotHelp from '@/components/BotHelp';
import Reviews from '@/components/Reviews';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/EmailCapture';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <CryptoTicker />
      <Navbar />
      <Hero />
      <Features />
      <MarketMovers />
      <MiniCharts />
      <TrendingNews />
      <Exchanges />
      <BotHelp />
      <Reviews />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
