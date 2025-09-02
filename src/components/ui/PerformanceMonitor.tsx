'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
}

interface PerformanceMonitorProps {
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
  enableReporting?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  onMetricsUpdate,
  enableReporting = false,
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check for Performance Observer support
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported in this browser');
      return;
    }

    const updateMetrics = (newMetrics: Partial<PerformanceMetrics>) => {
      setMetrics(prev => {
        const updated = { ...prev, ...newMetrics };
        onMetricsUpdate?.(updated);
        return updated;
      });
    };

    // Measure TTFB
    const measureTTFB = () => {
      try {
        const navigation = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;
        if (navigation && navigation.responseStart && navigation.requestStart) {
          const ttfb = navigation.responseStart - navigation.requestStart;
          updateMetrics({ ttfb });
        }
      } catch (error) {
        console.warn('Error measuring TTFB:', error);
      }
    };

    // Measure FCP
    const measureFCP = () => {
      try {
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(
            entry => entry.name === 'first-contentful-paint'
          );
          if (fcpEntry) {
            updateMetrics({ fcp: fcpEntry.startTime });
            observer.disconnect();
          }
        });
        observer.observe({ entryTypes: ['paint'] });
      } catch (error) {
        console.warn('Error measuring FCP:', error);
      }
    };

    // Measure LCP
    const measureLCP = () => {
      try {
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            updateMetrics({ lcp: lastEntry.startTime });
          }
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        console.warn('Error measuring LCP:', error);
      }
    };

    // Measure FID
    const measureFID = () => {
      try {
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.processingStart && entry.startTime) {
              const fid = entry.processingStart - entry.startTime;
              updateMetrics({ fid });
            }
          });
        });
        observer.observe({ entryTypes: ['first-input'] });
      } catch (error) {
        console.warn('Error measuring FID:', error);
      }
    };

    // Measure CLS
    const measureCLS = () => {
      try {
        let clsValue = 0;
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              updateMetrics({ cls: clsValue });
            }
          });
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.warn('Error measuring CLS:', error);
      }
    };

    // Initialize measurements
    measureTTFB();
    measureFCP();
    measureLCP();
    measureFID();
    measureCLS();

    // Report to console in development
    if (enableReporting && process.env.NODE_ENV === 'development') {
      const reportMetrics = () => {
        console.group('🚀 Performance Metrics');
        console.log(
          'TTFB:',
          metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'Not measured'
        );
        console.log(
          'FCP:',
          metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'Not measured'
        );
        console.log(
          'LCP:',
          metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'Not measured'
        );
        console.log(
          'FID:',
          metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'Not measured'
        );
        console.log(
          'CLS:',
          metrics.cls ? metrics.cls.toFixed(4) : 'Not measured'
        );
        console.groupEnd();
      };

      const timer = setTimeout(reportMetrics, 3000);
      return () => clearTimeout(timer);
    }
  }, [onMetricsUpdate, enableReporting]);

  // This component doesn't render anything visible
  return null;
};

export { PerformanceMonitor };
