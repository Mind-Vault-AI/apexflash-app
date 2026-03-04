'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Welcome aboard!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-apex-950/10 to-dark-950" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Stay <span className="gradient-text">Ahead of the Market</span>
        </h2>
        <p className="text-dark-400 text-lg mb-8">
          Get weekly market intelligence, whale movement summaries, and early access to new features.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 text-apex-400 text-lg font-medium">
            <CheckCircle className="w-6 h-6" />
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-4 bg-dark-900 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 focus:outline-none focus:border-apex-500/50 focus:ring-1 focus:ring-apex-500/30 transition-colors"
            />
            <button type="submit" disabled={status === 'loading'} className="btn-primary whitespace-nowrap">
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Subscribe
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && <p className="text-red-400 text-sm mt-3">{message}</p>}
        <p className="text-dark-600 text-xs mt-4">No spam ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
