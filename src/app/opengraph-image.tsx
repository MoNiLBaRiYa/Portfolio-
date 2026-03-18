import { ImageResponse } from 'next/og';
import { portfolioData } from '@/data/portfolio';

export const runtime = 'edge';
export const alt = `${portfolioData.personal.name} - ${portfolioData.personal.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const profileImageUrl = `https://monilbariya.vercel.app${portfolioData.personal.profileImage}`;
  const logoUrl = `https://monilbariya.vercel.app/android-chrome-512x512.png`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: '#0f172a',
          padding: '50px 60px',
          gap: '60px',
          alignItems: 'center',
        }}
      >
        {/* Left: Text Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            gap: '0px',
          }}
        >
          {/* Logo Badge top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <img
              src={logoUrl}
              alt="logo"
              style={{ width: '36px', height: '36px', borderRadius: '8px' }}
            />
            <span style={{ color: '#94a3b8', fontSize: '16px', fontWeight: 500 }}>
              monilbariya.vercel.app
            </span>
          </div>

          {/* Name */}
          <div style={{ display: 'flex', fontSize: '58px', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: '12px' }}>
            {portfolioData.personal.name}
          </div>

          {/* Title */}
          <div style={{ display: 'flex', fontSize: '24px', color: '#94a3b8', marginBottom: '32px', lineHeight: 1.3 }}>
            {portfolioData.personal.title}
          </div>

          {/* Skill Badges */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', padding: '8px 18px', backgroundColor: '#3b82f6', borderRadius: '6px', color: '#fff', fontSize: '15px', fontWeight: 600 }}>
              Full Stack Dev
            </div>
            <div style={{ display: 'flex', padding: '8px 18px', backgroundColor: '#8b5cf6', borderRadius: '6px', color: '#fff', fontSize: '15px', fontWeight: 600 }}>
              AI/ML Projects
            </div>
            <div style={{ display: 'flex', padding: '8px 18px', backgroundColor: '#10b981', borderRadius: '6px', color: '#fff', fontSize: '15px', fontWeight: 600 }}>
              Available for Work
            </div>
          </div>
        </div>

        {/* Right: Profile Photo + Logo Badge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          {/* Profile Photo */}
          <div
            style={{
              display: 'flex',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              border: '5px solid #3b82f6',
              overflow: 'hidden',
            }}
          >
            <img
              src={profileImageUrl}
              alt={portfolioData.personal.name}
              style={{ width: '260px', height: '260px', objectFit: 'cover' }}
            />
          </div>

          {/* Favicon Badge below photo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '20px',
              padding: '6px 14px',
            }}
          >
            <img
              src={logoUrl}
              alt="brand"
              style={{ width: '24px', height: '24px', borderRadius: '6px' }}
            />
            <span style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 600 }}>
              Portfolio
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
