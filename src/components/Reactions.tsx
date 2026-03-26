'use client';

import { useState } from 'react';

const EMOJIS = ['🔥', '🚀', '💎', '🐋', '😱', '🤑'];

interface ReactionsProps {
  traderId: string;
  initialReactions?: Record<string, number>;
}

export default function Reactions({ traderId, initialReactions = {} }: ReactionsProps) {
  const [reactions, setReactions] = useState<Record<string, number>>(initialReactions);
  const [sending, setSending] = useState(false);

  async function react(emoji: string) {
    if (sending) return;
    setSending(true);

    // Optimistic update
    setReactions(prev => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }));

    try {
      await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ traderId, emoji }),
      });
    } catch {
      // Revert on failure
      setReactions(prev => ({ ...prev, [emoji]: Math.max((prev[emoji] || 1) - 1, 0) }));
    } finally {
      setSending(false);
    }
  }

  const total = Object.values(reactions).reduce((sum, n) => sum + n, 0);

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {EMOJIS.map(emoji => {
        const count = reactions[emoji] || 0;
        return (
          <button
            key={emoji}
            onClick={() => react(emoji)}
            className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-xs transition-all hover:scale-110 ${
              count > 0
                ? 'bg-dark-700/50 border border-dark-600/30'
                : 'bg-dark-800/30 border border-transparent hover:border-dark-700/30'
            }`}
            title={`React with ${emoji}`}
          >
            <span>{emoji}</span>
            {count > 0 && <span className="text-[10px] text-dark-400">{count}</span>}
          </button>
        );
      })}
      {total > 0 && (
        <span className="text-[10px] text-dark-500 ml-1">{total}</span>
      )}
    </div>
  );
}
