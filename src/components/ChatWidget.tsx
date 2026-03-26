'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Zap, ExternalLink } from 'lucide-react';

interface Message {
  role: 'bot' | 'user';
  text: string;
  cta?: { label: string; url: string };
}

const RESPONSES: { keywords: string[]; answer: string; cta?: { label: string; url: string } }[] = [
  {
    keywords: ['price', 'cost', 'pricing', 'free', 'pro', 'elite', 'how much', 'prijs', 'kosten'],
    answer:
      'ApexFlash is FREE forever for ETH + SOL whale alerts with AI grading. Flash Pro ($9.99/mo) adds unlimited trades & copy trading. Flash Elite ($29.99/mo) adds all chains + convergence alerts.',
    cta: { label: 'View Pricing', url: '#pricing' },
  },
  {
    keywords: ['whale', 'whales', 'walvis', 'big trade', 'smart money'],
    answer:
      'We track 20+ whale wallets on ETH & SOL. When a whale SWAPS a token (not just transfers), you get an instant alert with the token, amount, price, and a 1-tap Buy button. Grade A-D quality scoring filters out noise.',
    cta: { label: 'See Whale Feed', url: '#whale-tracker' },
  },
  {
    keywords: ['how', 'start', 'begin', 'sign up', 'register', 'join', 'hoe', 'starten'],
    answer:
      'Getting started is easy: 1) Open our Telegram bot, 2) Click /start, 3) Create or import a SOL wallet, 4) You\'re ready to receive whale alerts and trade! No sign-up needed.',
    cta: { label: 'Open Bot on Telegram', url: 'https://t.me/ApexFlashBot' },
  },
  {
    keywords: ['signal', 'grade', 'grading', 'ai', 'quality', 'filter', 'score'],
    answer:
      'Every whale alert is scored 0-100 by CryptoBERT AI based on 6 factors: trade direction, size, wallet reputation, sentiment, chain volatility, and history. Grade A-C alerts are sent. Grade D is filtered out to protect your win rate.',
  },
  {
    keywords: ['copy', 'trading', 'copy trading', 'mizar', 'follow'],
    answer:
      'Flash Pro users can copy top traders via Mizar integration. Check our Leaderboard to see top performers by P/L and win rate, then follow their trades automatically.',
    cta: { label: 'View Leaderboard', url: '/leaderboard' },
  },
  {
    keywords: ['exchange', 'bonus', 'deal', 'bitunix', 'mexc', 'gate', 'blofin', 'binance', 'bybit'],
    answer:
      'We have exclusive exchange deals: Bitunix $8,000 bonus, Gate.io $6,666 bonus, MEXC $1,000 bonus, BloFin copy trading. All available via /deals in the bot.',
    cta: { label: 'See Exchange Deals', url: '#exchanges' },
  },
  {
    keywords: ['fee', 'fees', 'commission', 'charge'],
    answer:
      'ApexFlash charges 1% per trade (Free), 0.75% (Pro), or 0.5% (Elite). Jupiter V6 routes your swap for the best price across all Solana DEXs. No hidden fees.',
  },
  {
    keywords: ['safe', 'security', 'secure', 'scam', 'rug', 'trust', 'veilig'],
    answer:
      'Your wallet is encrypted in the bot. We never have access to your private keys. All trades go through Jupiter V6 (audited). AI grading filters out potential rug pulls. You control everything.',
  },
  {
    keywords: ['win', 'rate', 'performance', 'results', 'profit', 'track'],
    answer:
      'Use /winrate in the bot to see your personal win rate and platform stats. We track every SL/TP trigger. All results are transparent and stored in Redis.',
  },
  {
    keywords: ['solana', 'sol', 'ethereum', 'eth', 'bsc', 'chain', 'chains'],
    answer:
      'Free tier covers ETH + SOL. Pro adds BSC. Elite covers ALL chains including Arbitrum and Base. Whale swap detection works on SOL via Helius and ETH via on-chain monitoring.',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'hoi', 'hallo', 'sup', 'yo', 'gm'],
    answer: 'Hey! 👋 I\'m the ApexFlash assistant. Ask me about whale alerts, pricing, how to start trading, or anything else!',
  },
  {
    keywords: ['thanks', 'thank', 'thx', 'bedankt', 'dank'],
    answer: 'You\'re welcome! If you have more questions, just ask. Happy trading! ⚡',
  },
];

const DEFAULT_RESPONSE: Message = {
  role: 'bot',
  text: 'Great question! For detailed help, our Telegram bot has full support. You can also check our FAQ section below.',
  cta: { label: 'Ask on Telegram', url: 'https://t.me/ApexFlashBot' },
};

function findResponse(input: string): Message {
  const lower = input.toLowerCase();
  for (const r of RESPONSES) {
    if (r.keywords.some((kw) => lower.includes(kw))) {
      return { role: 'bot', text: r.answer, cta: r.cta };
    }
  }
  return DEFAULT_RESPONSE;
}

const WELCOME: Message = {
  role: 'bot',
  text: 'Hey! ⚡ I\'m the ApexFlash assistant. Ask me about whale alerts, pricing, how to get started, or anything about crypto trading!',
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const [loading, setLoading] = useState(false);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Try keyword match first (instant, free)
    const keywordMatch = findResponse(text);
    if (keywordMatch !== DEFAULT_RESPONSE) {
      setMessages((prev) => [...prev, keywordMatch]);
      return;
    }

    // No keyword match → ask Gemini AI
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'bot', text: data.reply, cta: data.cta }]);
    } catch {
      setMessages((prev) => [...prev, DEFAULT_RESPONSE]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 via-apex-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-apex-500/40 hover:shadow-apex-400/60 transition-all duration-300 hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-4 z-50 w-[340px] sm:w-[380px] max-h-[500px] rounded-2xl overflow-hidden border border-dark-700/50 shadow-2xl shadow-black/40 flex flex-col bg-dark-900/95 backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-dark-800 to-dark-900 border-b border-dark-700/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 via-apex-500 to-cyan-400 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">ApexFlash</p>
                <p className="text-[10px] text-apex-400">AI Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-dark-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[280px] max-h-[340px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-apex-600 text-white rounded-br-md'
                      : 'bg-dark-800 text-dark-100 rounded-bl-md'
                  }`}
                >
                  {msg.text}
                  {msg.cta && (
                    <a
                      href={msg.cta.url}
                      target={msg.cta.url.startsWith('http') ? '_blank' : undefined}
                      rel={msg.cta.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={() => {
                        if (!msg.cta!.url.startsWith('http')) setOpen(false);
                      }}
                      className="mt-2 flex items-center gap-1.5 text-apex-400 hover:text-apex-300 text-xs font-medium transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {msg.cta.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-dark-800 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-apex-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-apex-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-apex-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-dark-700/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about whale alerts, pricing..."
                className="flex-1 bg-dark-800 border border-dark-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-dark-500 focus:outline-none focus:border-apex-500 transition-colors"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-apex-500 to-cyan-500 flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
