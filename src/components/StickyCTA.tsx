'use client';

import { useEffect, useState } from 'react';
import { CONFIG } from '@/lib/config';
import { Zap } from 'lucide-react';

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 400px (past hero CTA)
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-dark-950/95 backdrop-blur-sm border-t border-apex-500/20 px-4 py-3">
        <a
          href={CONFIG.telegram.apexBot}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-center !py-3 text-sm font-bold"
        >
          <Zap className="w-4 h-4" />
          Start Getting Alerts — Free
        </a>
      </div>
    </div>
  );
}
