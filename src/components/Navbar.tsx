'use client';

import { useState } from 'react';
import { CONFIG } from '@/lib/config';
import { Menu, X, Zap } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Market Pulse', href: '#market-pulse' },
  { label: 'Exchanges', href: '#exchanges' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-10 left-0 right-0 z-40 bg-dark-950/80 backdrop-blur-xl border-b border-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-apex-500 to-apex-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-extrabold gradient-hero tracking-tight">ApexFlash</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-dark-400 hover:text-apex-400 transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
            <a
              href={CONFIG.telegram.apexBot}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-5 !py-2 text-sm"
            >
              <Zap className="w-3.5 h-3.5" />
              Start Trading
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
          <div className="px-4 py-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-dark-200 hover:text-apex-400 py-2 text-sm"
              >
                {link.label}
              </a>
            ))}
            <a
              href={CONFIG.telegram.apexBot}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-primary w-full !py-2.5 text-center text-sm mt-2"
            >
              Start Trading
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
