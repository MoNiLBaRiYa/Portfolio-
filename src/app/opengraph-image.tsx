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
  // Fetch the profile image and logo
  const profileImageUrl = `https://monilbariya.vercel.app${portfolioData.personal.profileImage}`;
  const logoUrl = `https://monilbariya.vercel.app/android-chrome-512x512.png`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#0f172a',
          backgroundImage:
            'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          padding: '60px',
          position: 'relative',
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
              'radial-gradient(circle at 20% 20%, #3b82f6 0%, transparent 40%), radial-gradient(circle at 80% 80%, #8b5cf6 0%, transparent 40%), radial-gradient(circle at 40% 60%, #10b981 0%, transparent 30%)',
            opacity: 0.15,
          }}
        />

        {/* Top Left Logo Badge */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              padding: '2px',
              boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)',
            }}
          >
            <img
              src={logoUrl}
              alt="Logo"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                objectFit: 'cover',
                background: '#ffffff',
              }}
            />
          </div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Portfolio
          </div>
        </div>

        {/* Left Side - Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flex: 1,
            zIndex: 1,
            paddingRight: '40px',
            paddingTop: '40px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '16px',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
              lineHeight: 1.1,
            }}
          >
            {portfolioData.personal.name}
          </h1>

          <p
            style={{
              fontSize: '28px',
              color: '#94a3b8',
              marginBottom: '32px',
              lineHeight: 1.3,
            }}
          >
            {portfolioData.personal.title}
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                Interactive Portfolio
              </div>

              <div
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#8b5cf6',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                AI/ML Projects
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '16px',
              }}
            >
              <div
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#10b981',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                Full Stack Dev
              </div>

              <div
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f59e0b',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                Available for Work
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Profile Image with Logo Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '6px solid #3b82f6',
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              padding: '4px',
              position: 'relative',
            }}
          >
            <img
              src={profileImageUrl}
              alt={portfolioData.personal.name}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Small Logo Badge on Profile Image */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              padding: '3px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={logoUrl}
                alt="Brand Logo"
                style={{
                  width: '80%',
                  height: '80%',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Right Website URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            fontSize: '14px',
            color: '#64748b',
            zIndex: 1,
          }}
        >
          monilbariya.vercel.app
        </div>

        {/* Decorative Corner Element */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '60px',
            width: '4px',
            height: '60px',
            background: 'linear-gradient(180deg, #3b82f6, #8b5cf6)',
            borderRadius: '2px',
            zIndex: 1,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
