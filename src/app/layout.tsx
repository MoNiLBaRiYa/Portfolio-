import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { ThemeProvider } from '@/components/theme-provider';
import { generateStructuredData, generateBreadcrumbStructuredData, generateSkillsStructuredData, generateEducationStructuredData, generateExperienceStructuredData } from '@/utils/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://monilbariya.vercel.app'),
  title: {
    default: 'Monil Bariya | AI-Powered Full Stack Developer',
    template: '%s | Monil Bariya',
  },
  description:
    'Fullstack Developer Portfolio of Monil Bariya, a Freelancer focused on AI Web Applications, MERN Stack, MVP Development & Automation.',
  keywords: [
    'Monil Bariya',
    'Portfolio',
    'Fullstack Developer Portfolio',
    'Freelancer Portfolio',
    'AI-Powered Web Developer',
    'Full Stack Developer',
    'AI Web Applications',
    'MERN Stack Developer',
    'Web App Development',
    'MVP Development',
    'Automation & AI Integration',
  ],
  authors: [{ name: 'Monil Bariya', url: 'https://github.com/MoNiLBaRiYa' }],
  creator: 'Monil Bariya',
  publisher: 'Monil Bariya',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://monilbariya.vercel.app',
    title: 'Monil Bariya | AI-Powered Full Stack Developer',
    description:
      'Fullstack Developer Portfolio of Monil Bariya, a Freelancer focused on AI Web Applications, MERN Stack, MVP Development & Automation.',
    siteName: 'Monil Bariya Portfolio',
    images: [
      {
        url: 'https://monilbariya.vercel.app/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Monil Bariya - Full-Stack Developer & AI Enthusiast',
        type: 'image/png',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'standard',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'fb54a6b0d2601101',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Monil Bariya Portfolio',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'Technology',
  classification: 'Portfolio Website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = generateStructuredData();
  const breadcrumbData = generateBreadcrumbStructuredData();
  const skillsData = generateSkillsStructuredData();
  const educationData = generateEducationStructuredData();
  const experienceData = generateExperienceStructuredData();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.person),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.website),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(skillsData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.portfolio),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.organization),
          }}
        />
        {educationData.map((edu, index) => (
          <script
            key={`education-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(edu),
            }}
          />
        ))}
        {experienceData.map((exp, index) => (
          <script
            key={`experience-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(exp),
            }}
          />
        ))}

        {/* Explicit OG image meta for WhatsApp/social sharing preview only */}
        <meta property="og:image" content="https://monilbariya.vercel.app/opengraph-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />

        {/* Tell Google to use profile photo as the representative image, not the OG banner */}
        <link rel="image_src" href="https://monilbariya.vercel.app/images/monilbariya.jpeg" />
        <meta name="thumbnail" content="https://monilbariya.vercel.app/images/monilbariya.jpeg" />
        {/* Prevent Google from using the OG banner image as a search result thumbnail */}
        <meta name="robots" content="max-image-preview:standard" />

        {/* DNS prefetch for external services */}
        <link rel="dns-prefetch" href="//api.emailjs.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* DNS prefetch for external services */}
        <link rel="dns-prefetch" href="//api.emailjs.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XGV4YH6JPX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XGV4YH6JPX', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />

        {/* Favicon and app icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Performance hints */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        
        {/* Security headers */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name="referrer" content="origin-when-cross-origin" />
        
        {/* Performance and caching */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
        <link rel="preconnect" href="https://api.emailjs.com" />
        
        {/* Theme and appearance */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="dark light" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            <div id="root">
              <a href="#main-content" className="sr-only">
                Skip to main content
              </a>
              {children}
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
