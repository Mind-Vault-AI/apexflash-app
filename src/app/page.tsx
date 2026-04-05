import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Exchanges from '@/components/Exchanges';
import Pricing from '@/components/Pricing';
import EmailCapture from '@/components/EmailCapture';
import Footer from '@/components/Footer';
import TrackingBoot from '@/components/TrackingBoot';

export default function Home() {
  return (
    <main className="min-h-screen">
      <TrackingBoot />
      <Navbar />
      <Hero />
      <Features />
      <Exchanges />
      <Pricing />
      <EmailCapture />
      <Footer />
    </main>
  );
}
