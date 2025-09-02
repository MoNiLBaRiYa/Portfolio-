'use client';

import { useEffect } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export function WebVitalsReporter() {
  useEffect(() => {
    const reportMetric = (metric: WebVitalsMetric) => {
      // Log metrics in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`${metric.name}: ${metric.value} (${metric.rating})`);
      }

      // Send to analytics in production
      if (process.env.NODE_ENV === 'production') {
        // You can send to Google Analytics, Vercel Analytics, etc.
        // gtag('event', metric.name, {
        //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        //   event_category: 'Web Vitals',
        //   event_label: metric.id,
        //   non_interaction: true,
        // });
      }
    };

    // Measure all Web Vitals
    getCLS(reportMetric);
    getFID(reportMetric);
    getFCP(reportMetric);
    getLCP(reportMetric);
    getTTFB(reportMetric);
  }, []);

  return null;
}

export default WebVitalsReporter;
