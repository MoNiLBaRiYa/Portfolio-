'use client';

import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout } from '@/components/layout';
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  EducationSection,
  ContactSection,
  DataVisualizationSection,
} from '@/components/sections';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { EasterEggs } from '@/components/ui/EasterEggs';
import { PersonalizedRecommendations } from '@/components/ui/PersonalizedRecommendations';
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';
import { AccessibilityProvider } from '@/components/ui/AccessibilityProvider';
import { EngagementProvider } from '@/context/EngagementContext';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { portfolioData } from '@/data/portfolio';
import WebVitalsReporter from '@/components/ui/WebVitalsReporter';
import BrowserCompatibility from '@/components/ui/BrowserCompatibility';

export default function Home() {
  return (
    <AccessibilityProvider>
      <EngagementProvider>
        <Layout>
          <BrowserCompatibility />
          <main id="main-content" className="relative">
            <ParticleBackground />
            <ScrollProgress />

            <Suspense fallback={<SkeletonLoader />}>
              <HeroSection />
            </Suspense>

            <Suspense fallback={<SkeletonLoader />}>
              <AboutSection />
            </Suspense>

            <Suspense fallback={<SkeletonLoader />}>
              <SkillsSection skills={portfolioData.skills} />
            </Suspense>

            <Suspense fallback={<SkeletonLoader />}>
              <ProjectsSection projects={portfolioData.projects} />
            </Suspense>

            <Suspense fallback={<SkeletonLoader />}>
              <DataVisualizationSection
                data={{ projects: portfolioData.projects }}
              />
            </Suspense>

            <Suspense fallback={<SkeletonLoader />}>
              <ExperienceSection
                experiences={portfolioData.experience}
                certifications={portfolioData.certifications}
              />
            </Suspense>

            <Suspense fallback={<SkeletonLoader />}>
              <EducationSection education={portfolioData.education} />
            </Suspense>

            <Suspense fallback={<SkeletonLoader />}>
              <ContactSection />
            </Suspense>

            <PersonalizedRecommendations />
            <EasterEggs />
            <ScrollToTop />

            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                },
              }}
            />

            {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
            <WebVitalsReporter />
          </main>
        </Layout>
      </EngagementProvider>
    </AccessibilityProvider>
  );
}
