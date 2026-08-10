import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'PSR Train - Police Station Representative Training';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0B3C5D 0%, #061e30 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 100,
            borderRadius: 24,
            background: 'rgba(212,175,55,0.15)',
            border: '3px solid #D4AF37',
            marginBottom: 32,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 6.5V11C3 17.08 6.84 22.73 12 24C17.16 22.73 21 17.08 21 11V6.5L12 2Z" fill="#D4AF37" />
            <path d="M12 4L5 7.75V11C5 16.05 8.14 20.77 12 21.93C15.86 20.77 19 16.05 19 11V7.75L12 4Z" fill="#0B3C5D" />
          </svg>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-1px',
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          PSR Train
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#D4AF37',
            fontWeight: 600,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          Police Station Representative Training
        </div>
        <div
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Practice questions, mock exams, PACE codes &amp; scenario training — pass the PSRAS with confidence
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 16,
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          psrtrain.com
        </div>
      </div>
    ),
    { ...size }
  );
}
