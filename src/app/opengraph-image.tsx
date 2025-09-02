import { ImageResponse } from 'next/og';
import { portfolioData } from '@/data/portfolio';

export const runtime = 'edge';
export const alt = `${portfolioData.personal.name} - ${portfolioData.personal.title}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage:
            'linear-gradient(45deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)',
            opacity: 0.1,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '20px',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }}
          >
            {portfolioData.personal.name}
          </h1>

          <p
            style={{
              fontSize: '32px',
              color: '#94a3b8',
              marginBottom: '40px',
              maxWidth: '800px',
            }}
          >
            {portfolioData.personal.title}
          </p>

          <div
            style={{
              display: 'flex',
              gap: '30px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                padding: '12px 24px',
                backgroundColor: '#3b82f6',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              Interactive Portfolio
            </div>

            <div
              style={{
                padding: '12px 24px',
                backgroundColor: '#8b5cf6',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              AI/ML Projects
            </div>

            <div
              style={{
                padding: '12px 24px',
                backgroundColor: '#10b981',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              Full Stack Dev
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
