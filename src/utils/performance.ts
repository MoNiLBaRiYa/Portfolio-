/**
 * Performance monitoring and optimization utilities
 */

// Performance metrics tracking
export interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

/**
 * Measure and report Core Web Vitals
 */
export const measureCoreWebVitals = (): Promise<PerformanceMetrics> => {
  return new Promise(resolve => {
    const metrics: Partial<PerformanceMetrics> = {};

    // Measure load time
    if (performance.timing) {
      metrics.loadTime =
        performance.timing.loadEventEnd - performance.timing.navigationStart;
    }

    // Use Performance Observer for modern metrics
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(
          entry => entry.name === 'first-contentful-paint'
        );
        if (fcpEntry) {
          metrics.firstContentfulPaint = fcpEntry.startTime;
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          metrics.largestContentfulPaint = lastEntry.startTime;
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver(list => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        metrics.cumulativeLayoutShift = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const firstEntry = entries[0];
        if (firstEntry) {
          metrics.firstInputDelay =
            (firstEntry as any).processingStart - firstEntry.startTime;
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Resolve after a delay to collect metrics
      setTimeout(() => {
        resolve(metrics as PerformanceMetrics);
      }, 3000);
    } else {
      // Fallback for older browsers
      resolve(metrics as PerformanceMetrics);
    }
  });
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func(...args);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return function executedFunction(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Intersection Observer with performance optimizations
 */
export const createOptimizedIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(
    throttle(callback, 100), // Throttle callback to improve performance
    defaultOptions
  );
};

/**
 * Preload images for better performance
 */
export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  const promises = imageUrls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });

  return Promise.all(promises);
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get connection speed information
 */
export const getConnectionSpeed = (): string => {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'unknown';
  }

  const connection = (navigator as any).connection;
  return connection?.effectiveType || 'unknown';
};

/**
 * Optimize animations based on device capabilities
 */
export const getOptimizedAnimationConfig = () => {
  const isLowEndDevice =
    getConnectionSpeed() === 'slow-2g' || getConnectionSpeed() === '2g';
  const reducedMotion = prefersReducedMotion();

  return {
    shouldAnimate: !reducedMotion && !isLowEndDevice,
    duration: isLowEndDevice ? 0.2 : 0.5,
    stagger: isLowEndDevice ? 0.05 : 0.1,
  };
};
