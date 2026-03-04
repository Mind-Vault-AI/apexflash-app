import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Exchanges from '@/components/Exchanges';
import Pricing from '@/components/Pricing';
import FinalCTA from '@/components/EmailCapture';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Exchanges />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
