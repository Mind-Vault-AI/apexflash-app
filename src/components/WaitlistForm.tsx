'use client';

import { useState } from 'react';
import { Mail, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setMessage('You are on the list! Watch your inbox for whale alpha.');
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message);
    }
  };

  return (
    <div className="glass-card p-6 sm:p-8 max-w-2xl mx-auto border-apex-500/30 bg-apex-500/5 mt-12 mb-20 relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-apex-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-apex-500/20 transition-all duration-700" />
      
      <div className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-apex-500/10 border border-apex-500/20 text-apex-400 text-xs font-bold mb-4 uppercase tracking-widest">
           Raking in the Alpha Reports
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Get the <span className="text-apex-400">Top 3 Whale Alerts</span> in your Inbox
        </h2>
        <p className="text-dark-300 mb-8 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
          Join 800+ smart money traders. We filter 10,000+ signals a day into the 3 most profitable Grade A whale swaps. Free. No noise.
        </p>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-green-400 font-semibold">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-dark-900/50 border border-dark-700 rounded-xl focus:border-apex-500 focus:ring-1 focus:ring-apex-500 outline-none text-white transition-all"
                disabled={status === 'loading'}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary flex items-center justify-center gap-2 !py-3.5 !px-8 whitespace-nowrap group"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Get Alpha
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-red-400 text-xs font-medium">{message}</p>
        )}
        
        <p className="mt-6 text-[10px] text-dark-500 flex items-center justify-center gap-1.5 uppercase font-bold tracking-widest">
          <Zap className="w-3 h-3 text-apex-400" /> Godmode Infinity v3.15.2 Protected
        </p>
      </div>
    </div>
  );
}
