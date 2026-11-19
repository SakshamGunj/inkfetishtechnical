import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Indian Writers Championship — The Biggest Writing Championship on the Internet by ink.fetish';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          background: 'linear-gradient(135deg, #081826 0%, #0F2744 38%, #262B78 72%, #4C1D95 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Row: Brand & NGO-Verified Pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '999px',
                background: '#E5C687',
                color: '#0F2744',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 900,
              }}
            >
              I
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em' }}>
                ink.fetish
              </span>
              <span style={{ fontSize: '15px', color: '#C7D2FE', fontWeight: 600 }}>
                216,000+ Instagram Followers · GST & MSME Registered
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 22px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.14)',
              border: '1.5px solid rgba(255, 255, 255, 0.3)',
              fontSize: '16px',
              fontWeight: 700,
              color: '#FDE68A',
            }}
          >
            NGO-Verified Recognition
          </div>
        </div>

        {/* Center Title & Subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '17px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#A5B4FC',
            }}
          >
            Open Theme · All Languages · Online Submission
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '68px',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
            }}
          >
            Indian Writers Championship
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '26px',
              fontWeight: 600,
              color: '#E0E7FF',
            }}
          >
            The Biggest Writing Championship on the Internet — Inviting Beginners & Experienced Writers
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '22px 28px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1.5px solid rgba(255, 255, 255, 0.22)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '14px', color: '#C7D2FE', fontWeight: 700 }}>
              CASH PRIZE POOL
            </span>
            <span style={{ fontSize: '30px', fontWeight: 900, color: '#FDE68A' }}>
              ₹10,000 + Memento & Medal
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '14px', color: '#C7D2FE', fontWeight: 700 }}>
              CATEGORIES
            </span>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF' }}>
              Poetry · Stories · Novels
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              padding: '14px 28px',
              borderRadius: '999px',
              background: '#E5C687',
              color: '#0F2744',
              fontSize: '22px',
              fontWeight: 900,
            }}
          >
            Register · ₹199
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
