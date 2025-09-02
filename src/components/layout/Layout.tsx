'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { EmailTestPanel } from '@/components/dev/EmailTestPanel';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { pageTransition } from '@/utils/animations';
import { measureCoreWebVitals } from '@/utils/performance';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Removed scrollProgress state as we now use ScrollProgress component
  const [showEmailTestPanel, setShowEmailTestPanel] = useState(false);

  // Scroll progress is now handled by ScrollProgress component

  // Performance monitoring and EmailJS test panel activation
  useEffect(() => {
    // Measure Core Web Vitals in production
    if (process.env.NODE_ENV === 'production') {
      measureCoreWebVitals().then(metrics => {
        // Log metrics for monitoring (in a real app, send to analytics)
        console.log('Core Web Vitals:', metrics);
      });
    }

    // Check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('emailtest') === 'true') {
      setShowEmailTestPanel(true);
    }

    // Keyboard shortcut: Ctrl+Shift+E (or Cmd+Shift+E on Mac)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === 'E'
      ) {
        event.preventDefault();
        setShowEmailTestPanel(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200"
      >
        Skip to main content
      </a>

      <Header />

      <motion.main
        id="main-content"
        className="flex-grow pt-16 lg:pt-20"
        role="main"
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.main>

      <Footer />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Conditional Email Test Panel */}
      {showEmailTestPanel && (
        <EmailTestPanel onClose={() => setShowEmailTestPanel(false)} />
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Monil Bariya',
            jobTitle: 'Computer Science Engineering Student',
            description:
              'Passionate Computer Science Engineering student with expertise in software development, data analysis, and emerging technologies.',
            url: 'https://monil-bariya.vercel.app',
            email: 'monil.bariya2003@gmail.com',
            telephone: '+91 XXXXXXXXXX',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'India',
            },
            sameAs: [
              'https://linkedin.com/in/monil-bariya',
              'https://github.com/monil-bariya',
            ],
            knowsAbout: [
              'Web Development',
              'Software Engineering',
              'Data Analysis',
              'Machine Learning',
              'JavaScript',
              'TypeScript',
              'React',
              'Next.js',
              'Python',
              'Power BI',
            ],
          }),
        }}
      />
    </div>
  );
}
