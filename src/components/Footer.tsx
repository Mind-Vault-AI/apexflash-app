import { CONFIG } from '@/lib/config';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-dark-800/50 py-8 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-apex-500 to-apex-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">ApexFlash</span>
            </div>
            <p className="text-dark-400 text-sm leading-relaxed max-w-sm">
              AI-powered crypto trading intelligence. Built by Erik Uijttenboogaart.
              A MindVault-AI project.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-dark-400">
              <li><a href="#features" className="hover:text-apex-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-apex-400 transition-colors">Pricing</a></li>
              <li><a href="#exchanges" className="hover:text-apex-400 transition-colors">Exchanges</a></li>
              <li><a href="/about" className="hover:text-apex-400 transition-colors">About</a></li>
              <li>
                <a href={CONFIG.telegram.apexBot} target="_blank" rel="noopener noreferrer" className="hover:text-apex-400 transition-colors">
                  ApexFlash Bot
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Connect</h4>
            <ul className="space-y-2 text-sm text-dark-400">
              <li>
                <a href={CONFIG.telegram.apexBot} target="_blank" rel="noopener noreferrer" className="hover:text-apex-400 transition-colors">
                  Telegram Bot
                </a>
              </li>
              <li>
                <a href={CONFIG.telegram.channel} target="_blank" rel="noopener noreferrer" className="hover:text-apex-400 transition-colors">
                  Whale Alerts Channel
                </a>
              </li>
              <li>
                <a href={CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-apex-400 transition-colors">
                  Twitter / X
                </a>
              </li>
              <li>
                <a href={CONFIG.social.discord} target="_blank" rel="noopener noreferrer" className="hover:text-apex-400 transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href={CONFIG.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-apex-400 transition-colors">
                  TikTok
                </a>
              </li>
              <li>
                <a href={`mailto:${CONFIG.supportEmail}`} className="hover:text-apex-400 transition-colors">
                  {CONFIG.supportEmail}
                </a>
              </li>
            </ul>
            <h4 className="text-sm font-semibold text-white mb-3 mt-6">Legal</h4>
            <ul className="space-y-2 text-sm text-dark-400">
              <li><a href="/terms" className="hover:text-apex-400 transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-apex-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/disclaimer" className="hover:text-apex-400 transition-colors">Risk Disclosure</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-xs">
            &copy; {new Date().getFullYear()} ApexFlash by Erik Uijttenboogaart / MindVault-AI. All rights reserved.
          </p>
          <p className="text-dark-600 text-xs">
            Trading crypto involves risk. Past performance does not guarantee future results. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
