import dynamic from 'next/dynamic';
import CryptoTicker from '@/components/CryptoTicker';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import WhaleTracker from '@/components/WhaleTracker';
import BotQRCard from '@/components/BotQRCard';
import WaitlistForm from '@/components/WaitlistForm';

// Lazy load below-the-fold components for faster initial load
const LiveDemo = dynamic(() => import('@/components/LiveDemo'));
const TopWhales = dynamic(() => import('@/components/TopWhales'));
const MarketPulse = dynamic(() => import('@/components/MarketPulse'));
const MarketMovers = dynamic(() => import('@/components/MarketMovers'));
const FreeTools = dynamic(() => import('@/components/FreeTools'));
const LiveChart = dynamic(() => import('@/components/LiveChart'));
const TradingSignals = dynamic(() => import('@/components/TradingSignals'));
const LiveTrades = dynamic(() => import('@/components/LiveTrades'));
const Exchanges = dynamic(() => import('@/components/Exchanges'));
const Reviews = dynamic(() => import('@/components/Reviews'));
const Pricing = dynamic(() => import('@/components/Pricing'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const Footer = dynamic(() => import('@/components/Footer'));
const StickyCTA = dynamic(() => import('@/components/StickyCTA'));
const ChatWidget = dynamic(() => import('@/components/ChatWidget'));
const SocialProofToast = dynamic(() => import('@/components/SocialProofToast'));

export default function Home() {
  return (
    <main className="min-h-screen">
      <CryptoTicker />
      <Navbar />
      <Hero />
      <BotQRCard />
      <LiveTrades />
      <TradingSignals />
      <Exchanges />
      <TopWhales />
      <LiveChart />
      <Features />
      <WhaleTracker />
      <LiveDemo />
      <MarketPulse />
      <MarketMovers />
      <FreeTools />
      <Reviews />
      <Pricing />
      <WaitlistForm />
      <FAQ />
      <Footer />
      <StickyCTA />
      <ChatWidget />
      <SocialProofToast />
    </main>
  );
}
