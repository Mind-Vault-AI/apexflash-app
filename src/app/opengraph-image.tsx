import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ApexFlash — AI Whale Intelligence for Solana';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #020617 50%, #0c1425 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
            width: '700px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Logo area - lightning bolt icon + text */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '28px',
          }}
        >
          {/* Lightning bolt icon box */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #1e40af, #06b6d4, #22d3ee)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(6,182,212,0.4)',
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div
            style={{
              fontSize: '60px',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #06b6d4, #22d3ee, #67e8f9)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-1px',
            }}
          >
            ApexFlash
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '32px',
            color: '#e2e8f0',
            fontWeight: 600,
            marginBottom: '36px',
            textAlign: 'center',
          }}
        >
          See What Whales Buy Before the Pump
        </div>

        {/* Feature badges */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '36px',
          }}
        >
          {[
            { icon: '🎯', text: 'AI Signal Grading' },
            { icon: '🐋', text: 'Whale Swap Detection' },
            { icon: '📊', text: 'Win Rate Tracking' },
          ].map((badge) => (
            <div
              key={badge.text}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: '999px',
                border: '1px solid rgba(6,182,212,0.3)',
                background: 'rgba(6,182,212,0.1)',
                fontSize: '18px',
                color: '#67e8f9',
              }}
            >
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            fontSize: '20px',
            color: '#64748b',
          }}
        >
          Free on Telegram — apexflash.pro
        </div>
      </div>
    ),
    { ...size }
  );
}
