import { createLazyComponent } from '@/utils/lazyLoad';

// Lazy load heavy components that are not immediately visible
export const LazySkillTree = createLazyComponent(
  () => import('@/components/ui/SkillTree')
);

export const LazyProjectModal = createLazyComponent(
  () => import('@/components/ui/ProjectModal')
);

export const LazyFakeNewsDemo = createLazyComponent(() =>
  import('@/components/ui/FakeNewsDemo').then(module => ({
    default: module.FakeNewsDemo,
  }))
);

export const LazyParticleBackground = createLazyComponent(() =>
  import('@/components/ui/ParticleBackground').then(module => ({
    default: module.ParticleBackground,
  }))
);

export const LazyTechBackground = createLazyComponent(
  () => import('@/components/ui/TechBackground')
);

export const LazySkillModal = createLazyComponent(
  () => import('@/components/ui/SkillModal')
);

export const LazyCertificationModal = createLazyComponent(() =>
  import('@/components/ui/CertificationModal').then(module => ({
    default: module.CertificationModal,
  }))
);

// Chart components (heavy due to Chart.js)
export const LazyProjectMetricsChart = createLazyComponent(() =>
  import('@/components/ui/charts/ProjectMetricsChart').then(module => ({
    default: module.ProjectMetricsChart,
  }))
);

export const LazySkillProficiencyChart = createLazyComponent(() =>
  import('@/components/ui/charts/SkillProficiencyChart').then(module => ({
    default: module.SkillProficiencyChart,
  }))
);

export const LazyActivityCalendar = createLazyComponent(() =>
  import('@/components/ui/charts/ActivityCalendar').then(module => ({
    default: module.ActivityCalendar,
  }))
);

// Data visualization section (heavy due to multiple charts)
export const LazyDataVisualizationSection = createLazyComponent(() =>
  import('@/components/sections/DataVisualizationSection').then(module => ({
    default: module.DataVisualizationSection,
  }))
);
