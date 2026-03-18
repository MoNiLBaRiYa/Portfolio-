import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { ThemeProvider } from '@/components/theme-provider';
import { generateStructuredData, generateBreadcrumbStructuredData } from '@/utils/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://monilbariya.vercel.app'),
  title: {
    default: 'Monil Bariya | Full-Stack Developer & AI Enthusiast',
    template: '%s | Monil Bariya',
  },
  description:
    'Portfolio of Monil Bariya, a Computer Science Engineering student and Full-Stack Developer specializing in React, Next.js, and AI-assisted development.',
  keywords: [
    'Monil Bariya',
    'Full-Stack Developer',
    'AI/ML Enthusiast',
    'Next.js Portfolio',
    'React Developer',
    'Computer Science Student',
    'Web Development',
    'India',
  ],
  authors: [{ name: 'Monil Bariya', url: 'https://github.com/MoNiLBaRiYa' }],
  creator: 'Monil Bariya',
  publisher: 'Monil Bariya',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://monilbariya.vercel.app',
    title: 'Monil Bariya | Full-Stack Developer & AI Enthusiast',
    description:
      'Explore the portfolio of Monil Bariya, featuring projects in AI, Web Development, and Data Visualization.',
    siteName: 'Monil Bariya Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Monil Bariya Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monil Bariya | Full-Stack Developer & AI Enthusiast',
    description:
      'Explore the portfolio of Monil Bariya, featuring projects in AI, Web Development, and Data Visualization.',
    images: ['/og-image.png'],
    creator: '@monilbariya',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'fb54a6b0d2601101',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = generateStructuredData();
  const breadcrumbData = generateBreadcrumbStructuredData();

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

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

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
        <link rel="icon" href="/favicon.ico" sizes="any" />
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
