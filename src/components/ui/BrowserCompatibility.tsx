'use client';

import { useEffect, useState } from 'react';

interface BrowserInfo {
  name: string;
  version: string;
  engine: string;
  isSupported: boolean;
}

export function BrowserCompatibility() {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const detectBrowser = (): BrowserInfo => {
      const userAgent = navigator.userAgent;
      let name = 'Unknown';
      let version = 'Unknown';
      let engine = 'Unknown';
      let isSupported = true;

      // Chrome
      if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
        name = 'Chrome';
        const match = userAgent.match(/Chrome\/(\d+)/);
        version = match ? match[1] : 'Unknown';
        engine = 'Blink';
        isSupported = parseInt(version) >= 90;
      }
      // Firefox
      else if (userAgent.includes('Firefox')) {
        name = 'Firefox';
        const match = userAgent.match(/Firefox\/(\d+)/);
        version = match ? match[1] : 'Unknown';
        engine = 'Gecko';
        isSupported = parseInt(version) >= 88;
      }
      // Safari
      else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        name = 'Safari';
        const match = userAgent.match(/Version\/(\d+)/);
        version = match ? match[1] : 'Unknown';
        engine = 'WebKit';
        isSupported = parseInt(version) >= 14;
      }
      // Edge
      else if (userAgent.includes('Edg')) {
        name = 'Edge';
        const match = userAgent.match(/Edg\/(\d+)/);
        version = match ? match[1] : 'Unknown';
        engine = 'Blink';
        isSupported = parseInt(version) >= 90;
      }

      return { name, version, engine, isSupported };
    };

    const info = detectBrowser();
    setBrowserInfo(info);
    setShowWarning(!info.isSupported);

    // Feature detection for critical APIs
    const checkFeatureSupport = () => {
      const features = {
        intersectionObserver: 'IntersectionObserver' in window,
        webGL: !!window.WebGLRenderingContext,
        es6: typeof Symbol !== 'undefined',
        flexbox: CSS.supports('display', 'flex'),
        grid: CSS.supports('display', 'grid'),
        customProperties: CSS.supports('--test', 'value'),
      };

      const unsupportedFeatures = Object.entries(features)
        .filter(([, supported]) => !supported)
        .map(([feature]) => feature);

      if (unsupportedFeatures.length > 0) {
        console.warn('Unsupported features detected:', unsupportedFeatures);
      }
    };

    checkFeatureSupport();
  }, []);

  if (!showWarning || !browserInfo) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black p-2 text-center text-sm z-50">
      <p>
        Your browser ({browserInfo.name} {browserInfo.version}) may not support
        all features. For the best experience, please update to the latest
        version or use a modern browser.
      </p>
      <button
        onClick={() => setShowWarning(false)}
        className="ml-2 underline hover:no-underline"
      >
        Dismiss
      </button>
    </div>
  );
}

export default BrowserCompatibility;
