'use client';

import { useState, useEffect, useCallback } from 'react';

type SectionMetrics = {
  enteredView: boolean;
  timeSpent: number;
  lastActive: Date | null;
};

type ScrollDepth = {
  percentage: number;
  sections: Record<string, SectionMetrics>;
  totalSections: number;
};

export function useScrollDepth(sectionIds: string[] = []) {
  const [scrollDepth, setScrollDepth] = useState<ScrollDepth>({
    percentage: 0,
    sections: {},
    totalSections: sectionIds.length,
  });

  // Initialize sections
  useEffect(() => {
    const initialSections = sectionIds.reduce(
      (acc, id) => ({
        ...acc,
        [id]: {
          enteredView: false,
          timeSpent: 0,
          lastActive: null,
        },
      }),
      {}
    );

    setScrollDepth(prev => ({
      ...prev,
      sections: initialSections,
      totalSections: sectionIds.length,
    }));
  }, [sectionIds.join()]);

  // Track scroll depth percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.scrollHeight - windowHeight;
      const percentage = Math.min(
        100,
        Math.round((scrollY / bodyHeight) * 100)
      );

      setScrollDepth(prev => ({
        ...prev,
        percentage,
      }));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track section visibility and time spent
  useEffect(() => {
    if (!sectionIds.length) return;

    const sectionElements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);
    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      entries => {
        const now = new Date();
        setScrollDepth(prev => {
          const updatedSections = { ...prev.sections };

          entries.forEach(entry => {
            const sectionId = entry.target.id;
            const section = updatedSections[sectionId];

            if (entry.isIntersecting) {
              if (!section.enteredView) {
                updatedSections[sectionId] = {
                  ...section,
                  enteredView: true,
                  lastActive: now,
                };
              }
            } else if (section.lastActive) {
              const timeSpent = now.getTime() - section.lastActive.getTime();
              updatedSections[sectionId] = {
                ...section,
                timeSpent: (section.timeSpent || 0) + timeSpent,
                lastActive: null,
              };
            }
          });

          return {
            ...prev,
            sections: updatedSections,
          };
        });
      },
      { threshold: 0.5 }
    );

    sectionElements.forEach(el => el && observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds.join()]);

  // Calculate engagement score (0-100)
  const engagementScore = useCallback(() => {
    if (!sectionIds.length) return 0;

    const activeSections = Object.values(scrollDepth.sections).filter(
      s => s.enteredView
    ).length;
    const timeScore = Object.values(scrollDepth.sections).reduce(
      (sum, s) => sum + s.timeSpent / 1000, // Convert to seconds
      0
    );

    // Weighted score: 40% sections viewed, 60% time spent (max 60s per section)
    const maxTimeScore = sectionIds.length * 60; // Max 60 seconds per section
    const normalizedTimeScore = Math.min(1, timeScore / maxTimeScore) * 60;
    const sectionScore = (activeSections / sectionIds.length) * 40;

    return Math.round(sectionScore + normalizedTimeScore);
  }, [scrollDepth.sections, sectionIds.length]);

  return {
    scrollPercentage: scrollDepth.percentage,
    engagementScore: engagementScore(),
    sectionMetrics: scrollDepth.sections,
  };
}
