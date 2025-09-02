'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useScrollDepth } from '@/hooks/useScrollDepth';

type EngagementContextType = {
  engagementScore: number;
  viewedSections: string[];
  timeSpent: number;
  interests: string[];
  updateInterests: (interest: string) => void;
  resetEngagement: () => void;
};

const EngagementContext = createContext<EngagementContextType | undefined>(
  undefined
);

export function EngagementProvider({ children }: { children: ReactNode }) {
  const [interests, setInterests] = useState<string[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [viewedSections, setViewedSections] = useState<string[]>([]);

  // Track engagement with main sections
  const sectionIds = ['about', 'skills', 'projects', 'experience', 'contact'];
  const { engagementScore, sectionMetrics } = useScrollDepth(sectionIds);

  // Update viewed sections and time spent
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update viewed sections when section metrics change
  useEffect(() => {
    const newViewedSections = Object.entries(sectionMetrics)
      .filter(([_, metrics]) => metrics.enteredView)
      .map(([id]) => id);

    setViewedSections(prev =>
      Array.from(new Set([...prev, ...newViewedSections]))
    );
  }, [sectionMetrics]);

  const updateInterests = (interest: string) => {
    setInterests(
      prev =>
        prev.includes(interest)
          ? prev.filter(i => i !== interest)
          : [...prev, interest].slice(-5) // Keep only last 5 interests
    );
  };

  const resetEngagement = () => {
    setInterests([]);
    setTimeSpent(0);
    setViewedSections([]);
  };

  return (
    <EngagementContext.Provider
      value={{
        engagementScore,
        viewedSections,
        timeSpent,
        interests,
        updateInterests,
        resetEngagement,
      }}
    >
      {children}
    </EngagementContext.Provider>
  );
}

export function useEngagement() {
  const context = useContext(EngagementContext);
  if (!context) {
    throw new Error('useEngagement must be used within an EngagementProvider');
  }
  return context;
}
