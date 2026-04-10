'use client';

import { useState } from 'react';
import { CONFIG } from '@/lib/config';
import { trackEvent } from '@/lib/tracking';
import { Menu, X, Zap } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Exchanges', href: '#exchanges' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '/about' },
  { label: 'Whale Bot', href: CONFIG.telegram.whaleBot, external: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-xl border-b border-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-apex-500 to-apex-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-apex-500/30 transition-shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">ApexFlash</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => trackEvent('nav_click', { label: link.label, href: link.href, location: 'desktop' })}
                className="text-dark-300 hover:text-apex-400 transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => trackEvent('nav_click', { label: 'Get Started', href: '#pricing', location: 'desktop' })}
              className="btn-primary !px-6 !py-2.5 text-sm"
            >
              Get Started
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-dark-300" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-dark-900/95 backdrop-blur-xl border-b border-dark-800">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  trackEvent('nav_click', { label: link.label, href: link.href, location: 'mobile' });
                  setOpen(false);
                }}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="block text-dark-200 hover:text-apex-400 py-2 text-base"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => {
                trackEvent('nav_click', { label: 'Get Started', href: '#pricing', location: 'mobile' });
                setOpen(false);
              }}
              className="btn-primary w-full !py-3 text-center mt-4"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
