'use client';

import { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';

interface Toast {
  id: number;
  emoji: string;
  text: string;
  time: string;
}

const NAMES = [
  'Thomas', 'Jan', 'Pieter', 'Alex', 'Marco', 'David', 'Sven',
  'Lucas', 'Daan', 'Mike', 'James', 'Liam', 'Noah', 'Carlos',
  'Felix', 'Max', 'Oscar', 'Erik', 'Stefan', 'Kevin',
];

const CITIES = [
  'Amsterdam', 'London', 'Berlin', 'Dubai', 'Singapore',
  'New York', 'Tokyo', 'Sydney', 'Toronto', 'Zurich',
];

const TOKENS = ['SOL', 'BONK', 'WIF', 'JUP', 'RENDER', 'JTO', 'PYTH', 'RAY'];

const TIMES = ['just now', '2 min ago', '5 min ago', '8 min ago', '12 min ago'];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateToast(): Toast {
  const templates = [
    // Subscription events
    () => ({
      emoji: '🔥',
      text: `${randomItem(NAMES)} just subscribed to Flash Pro`,
      time: randomItem(TIMES),
    }),
    () => ({
      emoji: '💎',
      text: `${randomItem(NAMES)} upgraded to Flash Elite`,
      time: randomItem(TIMES),
    }),
    // Trade events
    () => ({
      emoji: '📈',
      text: `${randomItem(NAMES)} made +${randomNum(8, 45)}% on $${randomItem(TOKENS)}`,
      time: randomItem(TIMES),
    }),
    () => ({
      emoji: '💰',
      text: `${randomItem(NAMES)} traded $${randomNum(2, 15)}K ${randomItem(TOKENS)} via ApexFlash`,
      time: randomItem(TIMES),
    }),
    // Whale alerts
    () => ({
      emoji: '🐋',
      text: `Whale moved $${randomNum(1, 8)}M SOL — alert sent to ${randomNum(40, 200)}+ users`,
      time: randomItem(TIMES),
    }),
    () => ({
      emoji: '🐋',
      text: `Binance whale withdrew $${randomNum(2, 12)}M — check alerts`,
      time: randomItem(TIMES),
    }),
    // New users
    () => ({
      emoji: '🚀',
      text: `${randomItem(NAMES)} from ${randomItem(CITIES)} joined ApexFlash`,
      time: randomItem(TIMES),
    }),
    // Referral events
    () => ({
      emoji: '🎯',
      text: `${randomItem(NAMES)} earned $${randomNum(5, 50)} in referral rewards`,
      time: randomItem(TIMES),
    }),
  ];

  const gen = randomItem(templates)();
  return { id: Date.now(), ...gen };
}

export default function SocialProofToast() {
  const [toast, setToast] = useState<Toast | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const showToast = useCallback(() => {
    if (dismissed) return;
    const newToast = generateToast();
    setToast(newToast);
    setVisible(true);

    // Auto-hide after 5s
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  }, [dismissed]);

  useEffect(() => {
    // First toast after 6s
    const initialDelay = setTimeout(() => {
      showToast();
    }, 6000);

    // Then every 10-18s
    const interval = setInterval(() => {
      showToast();
    }, randomNum(10000, 18000));

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [showToast]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  if (!toast || dismissed) return null;

  return (
    <div
      className={`fixed bottom-5 left-5 z-50 max-w-sm transition-all duration-500 ease-out ${
        visible
          ? 'translate-x-0 opacity-100'
          : '-translate-x-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-dark-900/95 backdrop-blur-xl border border-dark-700/60 rounded-xl p-4 shadow-2xl shadow-black/40 flex items-start gap-3">
        {/* Emoji */}
        <span className="text-2xl flex-shrink-0 mt-0.5">{toast.emoji}</span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-dark-100 font-medium leading-snug">{toast.text}</p>
          <p className="text-xs text-dark-500 mt-1">{toast.time}</p>
        </div>

        {/* Close */}
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-dark-500 hover:text-dark-300 transition-colors p-0.5"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Green progress bar that shrinks over 5s */}
      {visible && (
        <div className="mx-2 mt-0.5 h-0.5 rounded-full overflow-hidden bg-dark-800">
          <div
            className="h-full bg-gradient-to-r from-apex-500 to-apex-400 rounded-full"
            style={{
              animation: 'shrinkBar 5s linear forwards',
            }}
          />
        </div>
      )}
    </div>
  );
}
