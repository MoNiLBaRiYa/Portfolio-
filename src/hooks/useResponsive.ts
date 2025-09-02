'use client';

import { useState, useEffect } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
  isTouchDevice: boolean;
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    screenWidth: 0,
    screenHeight: 0,
    orientation: 'portrait',
    isTouchDevice: false,
  });

  useEffect(() => {
    const updateResponsiveState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setState({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 && width < 1600,
        isLargeDesktop: width >= 1600,
        screenWidth: width,
        screenHeight: height,
        orientation: width > height ? 'landscape' : 'portrait',
        isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      });
    };

    // Initial call
    updateResponsiveState();

    // Add event listeners
    window.addEventListener('resize', updateResponsiveState);
    window.addEventListener('orientationchange', updateResponsiveState);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateResponsiveState);
      window.removeEventListener('orientationchange', updateResponsiveState);
    };
  }, []);

  return state;
}

// Breakpoint utilities
export const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1600,
} as const;

export function useBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(min-width: ${breakpoints[breakpoint]}px)`
    );

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [breakpoint]);

  return matches;
}

// Touch device detection
export function useTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouchDevice;
}

// Viewport height hook for mobile browsers
export function useViewportHeight(): number {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      // Use visualViewport if available (better for mobile browsers)
      const height = window.visualViewport?.height || window.innerHeight;
      setViewportHeight(height);
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    // Listen to visual viewport changes (mobile keyboard, etc.)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateHeight);
    }

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateHeight);
      }
    };
  }, []);

  return viewportHeight;
}
