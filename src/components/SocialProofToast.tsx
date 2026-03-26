'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface Toast {
  id: number;
  emoji: string;
  text: string;
  time: string;
}

interface LiveEvent {
  emoji: string;
  text: string;
  time: string;
}

const NAMES = [
  'Thomas', 'Jan', 'Pieter', 'Alex', 'Marco', 'David', 'Sven',
  'Lucas', 'Daan', 'Mike', 'James', 'Liam', 'Noah', 'Carlos',
  'Felix', 'Max', 'Oscar', 'Stefan', 'Kevin', 'Raj',
];
const CITIES = ['Amsterdam', 'London', 'Berlin', 'Dubai', 'Singapore', 'New York', 'Tokyo', 'Sydney', 'Toronto', 'Zurich'];
const TOKENS = ['SOL', 'BONK', 'WIF', 'JUP', 'RENDER', 'JTO', 'PYTH', 'RAY'];
const TIMES = ['just now', '2 min ago', '5 min ago', '8 min ago'];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateFallback(): LiveEvent {
  const templates = [
    () => ({ emoji: '🔥', text: `${randomItem(NAMES)} subscribed to Flash Pro`, time: randomItem(TIMES) }),
    () => ({ emoji: '💎', text: `${randomItem(NAMES)} upgraded to Elite`, time: randomItem(TIMES) }),
    () => ({ emoji: '📈', text: `${randomItem(NAMES)} made +${randomNum(8, 45)}% on ${randomItem(TOKENS)}`, time: randomItem(TIMES) }),
    () => ({ emoji: '🐋', text: `Whale moved $${randomNum(1, 8)}M SOL — ${randomNum(40, 200)}+ users alerted`, time: randomItem(TIMES) }),
    () => ({ emoji: '🚀', text: `${randomItem(NAMES)} from ${randomItem(CITIES)} joined ApexFlash`, time: randomItem(TIMES) }),
    () => ({ emoji: '🎯', text: `${randomItem(NAMES)} earned $${randomNum(5, 50)} referral reward`, time: randomItem(TIMES) }),
  ];
  return randomItem(templates)();
}

export default function SocialProofToast() {
  const [toast, setToast] = useState<Toast | null>(null);
  const [visible, setVisible] = useState(false);
  const liveEvents = useRef<LiveEvent[]>([]);
  const liveIndex = useRef(0);

  useEffect(() => {
    fetch('/api/social-proof')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.events?.length) liveEvents.current = data.events; })
      .catch(() => {});
  }, []);

  const showToast = useCallback(() => {
    let event: LiveEvent;
    const pool = liveEvents.current;
    if (pool.length > 0) {
      event = pool[liveIndex.current % pool.length];
      liveIndex.current++;
    } else {
      event = generateFallback();
    }
    setToast({ id: Date.now(), ...event });
    setVisible(true);
    setTimeout(() => setVisible(false), 4000);
  }, []);

  useEffect(() => {
    const initialDelay = setTimeout(showToast, 8000);
    const interval = setInterval(showToast, randomNum(15000, 25000));
    return () => { clearTimeout(initialDelay); clearInterval(interval); };
  }, [showToast]);

  return (
    <div
      className={`fixed top-[38px] left-0 right-0 overflow-hidden transition-all duration-500 ease-out ${
        visible && toast
          ? 'max-h-8 opacity-100'
          : 'max-h-0 opacity-0'
      }`}
      style={{ zIndex: 45 }}
    >
      <div className="bg-apex-500/10 border-b border-apex-500/20 px-4 py-1 flex items-center justify-center gap-3">
        <span className="text-xs">{toast?.emoji}</span>
        <span className="text-[11px] text-apex-300 font-medium truncate">
          {toast?.text}
        </span>
        <span className="text-[10px] text-dark-500 flex-shrink-0">
          {toast?.time}
        </span>
      </div>
    </div>
  );
}
