'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { Zap, MessageCircle, ArrowRight } from 'lucide-react';

declare global {
  interface Window {
    onTelegramAuth?: (user: { id: number; first_name: string; last_name?: string; username?: string; photo_url?: string; auth_date: number; hash: string }) => void;
  }
}

export default function LoginPage() {
  const { data: session } = useSession();
  const telegramRef = useRef<HTMLDivElement>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (session?.user) {
      window.location.href = '/dashboard';
    }
  }, [session]);

  // Telegram login callback
  useEffect(() => {
    window.onTelegramAuth = async (user) => {
      await signIn('telegram', {
        id: String(user.id),
        first_name: user.first_name,
        last_name: user.last_name || '',
        username: user.username || '',
        photo_url: user.photo_url || '',
        auth_date: String(user.auth_date),
        hash: user.hash,
        callbackUrl: '/dashboard',
      });
    };

    // Load Telegram Login Widget
    if (telegramRef.current && !telegramRef.current.hasChildNodes()) {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', 'ApexFlashBot');
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-radius', '12');
      script.setAttribute('data-onauth', 'onTelegramAuth(user)');
      script.setAttribute('data-request-access', 'write');
      script.async = true;
      telegramRef.current.appendChild(script);
    }
  }, []);

  return (
    <main className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 via-apex-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-apex-500/40">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold gradient-hero">ApexFlash</span>
          </a>
        </div>

        {/* Login Card */}
        <div className="glass-card p-6 sm:p-8">
          <h1 className="text-xl font-bold text-white text-center mb-2">Welcome to ApexFlash</h1>
          <p className="text-sm text-dark-400 text-center mb-6">
            Sign in to personalize your experience, save filters, and track your portfolio.
          </p>

          {/* Telegram Login */}
          <div className="space-y-3">
            <div ref={telegramRef} className="flex justify-center min-h-[44px]" />

            {/* Manual Telegram fallback button */}
            <button
              onClick={() => {
                // Open Telegram bot for auth
                window.open('https://t.me/ApexFlashBot?start=login', '_blank');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] text-white font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Continue with Telegram
            </button>

            {/* Google Login */}
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 hover:border-dark-600 text-white font-medium transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="text-[11px] text-dark-500 text-center mt-5">
            By signing in you agree to our{' '}
            <a href="/terms" className="text-apex-400 hover:underline">Terms</a> and{' '}
            <a href="/privacy" className="text-apex-400 hover:underline">Privacy Policy</a>.
          </p>
        </div>

        {/* Skip login */}
        <div className="text-center mt-4">
          <a href="/" className="text-sm text-dark-500 hover:text-dark-300 transition-colors inline-flex items-center gap-1">
            Continue without account <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </main>
  );
}
