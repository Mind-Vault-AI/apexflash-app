'use client';

import { CONFIG } from '@/lib/config';
import { trackEvent } from '@/lib/tracking';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-dark-800/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-apex-500 to-apex-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">ApexFlash</span>
            </div>
            <p className="text-dark-400 text-sm leading-relaxed max-w-sm">
              AI-powered crypto trading intelligence. Built by traders, for traders.
              A MindVault-AI project.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-dark-400">
              <li><a href="#features" onClick={() => trackEvent('footer_click', { label: 'Features', href: '#features' })} className="hover:text-apex-400 transition-colors">Features</a></li>
              <li><a href="#pricing" onClick={() => trackEvent('footer_click', { label: 'Pricing', href: '#pricing' })} className="hover:text-apex-400 transition-colors">Pricing</a></li>
              <li><a href="#exchanges" onClick={() => trackEvent('footer_click', { label: 'Exchanges', href: '#exchanges' })} className="hover:text-apex-400 transition-colors">Exchanges</a></li>
              <li>
                <a
                  href={CONFIG.telegram.whaleBot}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('footer_click', { label: 'Whale Bot', href: CONFIG.telegram.whaleBot })}
                  className="hover:text-apex-400 transition-colors"
                >
                  Whale Bot
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Connect</h4>
            <ul className="space-y-2 text-sm text-dark-400">
              <li>
                <a
                  href={CONFIG.telegram.whaleBot}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('footer_click', { label: 'Telegram', href: CONFIG.telegram.whaleBot })}
                  className="hover:text-apex-400 transition-colors"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a href={`mailto:${CONFIG.supportEmail}`} className="hover:text-apex-400 transition-colors">
                  {CONFIG.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-xs">
            &copy; {new Date().getFullYear()} ApexFlash by MindVault-AI. All rights reserved.
          </p>
          <p className="text-dark-600 text-xs">
            Trading crypto involves risk. Past performance does not guarantee future results. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
