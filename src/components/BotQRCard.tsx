'use client';

import { useState } from 'react';
import { Check, Copy, Scan, Smartphone } from 'lucide-react';
import { CONFIG } from '@/lib/config';

const BOT_URL = CONFIG.telegram.apexBot;

// QR code via public API — no npm package needed
const QR_SRC =
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200` +
  `&data=${encodeURIComponent(BOT_URL)}` +
  `&bgcolor=0a0a0f&color=9333ea&margin=6&format=png`;

export default function BotQRCard() {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(BOT_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section className="py-12 sm:py-16 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/40 to-dark-950 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-8">

          {/* QR Code block */}
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-2 text-apex-400 text-sm font-semibold">
              <Scan className="w-4 h-4" />
              Scan to start for free
            </div>

            {/* QR image with glow border */}
            <div className="relative p-1.5 rounded-xl bg-gradient-to-br from-apex-500/40 to-purple-600/40">
              <div className="rounded-lg overflow-hidden" style={{ background: '#0a0a0f' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={QR_SRC}
                  alt="Scan QR code to open ApexFlash Telegram bot"
                  width={160}
                  height={160}
                  className="block"
                  loading="lazy"
                />
              </div>
            </div>

            <p className="text-[11px] text-dark-500 text-center max-w-[160px]">
              Point your phone camera at the QR code
            </p>
          </div>

          {/* Right side: text + copy + mobile link */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
              <Smartphone className="w-5 h-5 text-apex-400" />
              <span className="text-white font-bold text-lg sm:text-xl">Open on Any Device</span>
            </div>

            <p className="text-dark-300 text-sm mb-5 leading-relaxed">
              <strong className="text-white">Scan</strong> with your phone camera, tap the link on mobile, or copy-paste the URL into Telegram search.
              One step — you're live getting whale alerts.
            </p>

            {/* Three options */}
            <div className="flex flex-col sm:flex-row gap-3">

              {/* Copy link */}
              <button
                onClick={copyLink}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all border ${
                  copied
                    ? 'bg-green-500/20 border-green-500/40 text-green-400'
                    : 'bg-dark-800/60 border-dark-600/40 text-dark-200 hover:border-apex-500/40 hover:text-apex-300'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy link'}
              </button>

              {/* Open in Telegram */}
              <a
                href={BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-apex-500/20 border border-apex-500/40 text-apex-300 hover:bg-apex-500/30 transition-all"
              >
                <span>💬</span>
                Open in Telegram
              </a>
            </div>

            {/* URL display — old school copy */}
            <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-900/70 border border-dark-700/40">
              <span className="text-dark-500 text-[11px] font-mono flex-1 truncate select-all">
                {BOT_URL}
              </span>
            </div>
            <p className="text-[10px] text-dark-600 mt-1">Select text above to copy manually</p>
          </div>

        </div>
      </div>
    </section>
  );
}
