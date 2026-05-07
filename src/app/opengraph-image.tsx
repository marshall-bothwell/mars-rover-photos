import { ImageResponse } from 'next/og';
import { MarsPatch } from '@/components/icons/MarsPatch';

export const runtime = 'edge';
export const alt = 'Mars Rover Photos';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = {
  eyebrow?: string;
  titleTop?: string;
  titleBottom?: string;
  subtitle?: string;
  lat?: string;
  lon?: string;
  sol?: string;
  earthDate?: string;
};

export default async function OGImage({
  eyebrow = 'Mars Rover Imaging',
  titleTop = 'Mars Rover',
  titleBottom = 'Photos',
  subtitle = "Browse every photo from NASA's Mars Rovers — by sol, camera, and Earth date.",
  lat = '18.4°N',
  lon = '77.4°E',
  sol = '1087',
  earthDate = '2024-03-12',
}: Props = {}) {

  const C = {
    bg: '#14110d',
    text: '#f4e4c1',
    textDim: '#a89880',
    textMuted: '#6e6354',
    ember: '#e87a3d',
    chipFg: '#f4a672',
    borderHi: 'rgba(244,228,193,0.22)',
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: C.bg,
          backgroundImage: [
            'radial-gradient(120% 80% at 78% 110%, rgba(232,122,61,0.20), transparent 55%)',
            'radial-gradient(90% 70% at 12% -10%, rgba(244,228,193,0.04), transparent 60%)',
            'linear-gradient(180deg, #181410 0%, #14110d 55%, #0f0c08 100%)',
          ].join(', '),
          fontFamily: 'Space Grotesk, sans-serif',
          color: C.text,
        }}
      >
        {/* Dune horizon */}
        <svg
          width="1200"
          height="360"
          viewBox="0 0 1200 360"
          preserveAspectRatio="none"
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="dune1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a2418" />
              <stop offset="100%" stopColor="#241710" />
            </linearGradient>
            <linearGradient id="dune2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5a3520" />
              <stop offset="100%" stopColor="#2a1a10" />
            </linearGradient>
            <linearGradient id="dune3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8a4a26" />
              <stop offset="100%" stopColor="#3d2415" />
            </linearGradient>
            <linearGradient id="ridgeLight" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(232,122,61,0)" />
              <stop offset="50%" stopColor="rgba(232,122,61,0.55)" />
              <stop offset="100%" stopColor="rgba(232,122,61,0)" />
            </linearGradient>
          </defs>
          <path
            d="M0,180 C180,140 320,170 520,150 C720,130 880,165 1060,140 C1140,128 1180,138 1200,140 L1200,360 L0,360 Z"
            fill="url(#dune1)"
            opacity="0.85"
          />
          <path
            d="M0,240 C160,200 280,225 460,210 C640,196 780,235 940,215 C1060,200 1140,220 1200,212 L1200,360 L0,360 Z"
            fill="url(#dune2)"
            opacity="0.92"
          />
          <path
            d="M0,300 C140,270 320,295 520,285 C720,275 860,310 1040,295 C1120,288 1170,295 1200,290 L1200,360 L0,360 Z"
            fill="url(#dune3)"
          />
          <path
            d="M0,300 C140,270 320,295 520,285 C720,275 860,310 1040,295 C1120,288 1170,295 1200,290"
            fill="none"
            stroke="url(#ridgeLight)"
            strokeWidth="1.2"
            opacity="0.9"
          />
        </svg>

        {/* Corner marks */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            bottom: 24,
            left: 24,
            display: 'flex',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 18,
              height: 18,
              borderTop: `1px solid ${C.borderHi}`,
              borderLeft: `1px solid ${C.borderHi}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 18,
              height: 18,
              borderTop: `1px solid ${C.borderHi}`,
              borderRight: `1px solid ${C.borderHi}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: 18,
              height: 18,
              borderBottom: `1px solid ${C.borderHi}`,
              borderLeft: `1px solid ${C.borderHi}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 18,
              height: 18,
              borderBottom: `1px solid ${C.borderHi}`,
              borderRight: `1px solid ${C.borderHi}`,
            }}
          />
        </div>

        {/* Top measurement strip */}
        <div
          style={{
            position: 'absolute',
            top: 34,
            left: 64,
            right: 64,
            display: 'flex',
            justifyContent: 'space-between',
            color: C.textMuted,
            fontFamily: 'DM Mono, monospace',
            fontSize: 12,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          <span>{`LAT ${lat} · LON ${lon}`}</span>
          <span>{`SOL ${sol} / EARTH ${earthDate}`}</span>
        </div>

        {/* Content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '76px 84px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Top block */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Eyebrow */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontFamily: 'DM Mono, monospace',
                fontSize: 13,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: C.chipFg,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: C.ember,
                  boxShadow:
                    '0 0 0 4px rgba(232,122,61,0.18), 0 0 24px rgba(232,122,61,0.55)',
                }}
              />
              <span>{eyebrow}</span>
            </div>

            {/* Title */}
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 22 }}>
              <div
                style={{
                  fontSize: 124,
                  lineHeight: 0.92,
                  letterSpacing: -4,
                  fontWeight: 500,
                  color: C.text,
                }}
              >
                {titleTop}
              </div>
              <div
                style={{
                  fontSize: 124,
                  lineHeight: 0.92,
                  letterSpacing: -4,
                  fontWeight: 500,
                  fontStyle: 'italic',
                  color: C.ember,
                }}
              >
                {titleBottom}
              </div>
            </div>

            {/* Subtitle */}
            <div
              style={{
                marginTop: 26,
                fontSize: 22,
                lineHeight: 1.45,
                color: C.textDim,
                maxWidth: 900,
                fontWeight: 400,
              }}
            >
              {subtitle}
            </div>
          </div>
        </div>

        {/* Footer with mars patch */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: 36,
          }}
        >
          <MarsPatch withFrame />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
