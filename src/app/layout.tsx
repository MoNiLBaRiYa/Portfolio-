import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Monil Bariya - Portfolio',
  description:
    'Computer Science Engineering Student | Full-Stack Developer | AI/ML Enthusiast',
  keywords:
    'Monil Bariya, Computer Science, Full Stack Developer, AI ML, Portfolio, Next.js, React',
  authors: [{ name: 'Monil Bariya' }],
  creator: 'Monil Bariya',
  publisher: 'Monil Bariya',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://monilbariya.vercel.app',
    title: 'Monil Bariya - Portfolio',
    description:
      'Computer Science Engineering Student | Full-Stack Developer | AI/ML Enthusiast',
    siteName: 'Monil Bariya Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monil Bariya - Portfolio',
    description:
      'Computer Science Engineering Student | Full-Stack Developer | AI/ML Enthusiast',
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
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
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

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

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
