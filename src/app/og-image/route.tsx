import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  console.log('[/og-image] generating OG image');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a12 0%, #0d1117 50%, #0a0f1e 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Glow circles */}
        <div
          style={{
            position: 'absolute',
            top: 80,
            left: 120,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
            }}
          >
            ⚡
          </div>
          <span style={{ fontSize: 48, fontWeight: 800, color: '#f97316', letterSpacing: '-1px' }}>
            ApexFlash
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.15,
            maxWidth: 900,
            marginBottom: 20,
          }}
        >
          Whales Are Buying. Are You Watching?
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 24, color: '#6b7280', textAlign: 'center', maxWidth: 700 }}>
          Real-time Solana whale tracking · AI signal grading · Auto-trade
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 48,
            padding: '18px 48px',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {[
            { label: 'Signal Accuracy', value: '73%' },
            { label: 'Tracked Volume', value: '$39K+' },
            { label: 'Best Trade', value: '+305%' },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: '#f97316' }}>{s.value}</span>
              <span style={{ fontSize: 16, color: '#6b7280' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
