'use client';

import { CONFIG } from '@/lib/config';
import { trackEvent } from '@/lib/tracking';
import { Zap, Send } from 'lucide-react';

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-dark-950 px-4">
      <div className="glass-card p-8 w-full max-w-sm text-center space-y-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-apex-500 to-apex-600 flex items-center justify-center shadow-lg shadow-apex-500/30">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">ApexFlash</span>
        </div>

        <div>
          <h1 className="text-xl font-semibold text-white mb-1">Sign in via Telegram</h1>
          <p className="text-dark-400 text-sm">
            ApexFlash runs on Telegram. Open the bot to sign in or create your account in one tap.
          </p>
        </div>

        {/* Telegram sign-in (primary) */}
        <a
          href={CONFIG.telegram.apexBot}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('signin_click', { provider: 'telegram', source: 'signin_page' })}
          className="w-full flex items-center justify-center gap-3 bg-[#229ED9] hover:bg-[#1d8bbf] text-white font-medium rounded-xl px-4 py-3 transition-colors"
        >
          <Send className="w-5 h-5" />
          Open ApexFlash on Telegram
        </a>

        <p className="text-dark-500 text-xs">
          Free to start. No email or password required — your Telegram account is your login.
        </p>

        <p className="text-dark-600 text-xs">
          By continuing you agree to our{' '}
          <a href="/about" className="text-apex-400 hover:underline">
            terms
          </a>
          .
        </p>
      </div>
    </main>
  );
}
