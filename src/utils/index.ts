// Utility functions for the portfolio

// Export validation utilities
export * from './validation';

// Export performance utilities
export * from './performance';

// Export lazy loading utilities
export * from './lazyLoad';

// Export bundle optimization utilities
export * from './bundleOptimization';

export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(' ');
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
};

export const calculateExperience = (
  startDate: string,
  endDate?: string
): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  } else if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
};

// Additional portfolio-specific utilities
export const formatDateRange = (
  startDate: string,
  endDate?: string
): string => {
  const start = new Date(startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  if (!endDate) {
    return `${start} - Present`;
  }

  const end = new Date(endDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  return `${start} - ${end}`;
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
};

export const getSkillsByCategory = (skills: any[], category: string) => {
  return (
    skills.find(skillCategory => skillCategory.category === category)?.skills ||
    []
  );
};

export const getProjectsByCategory = (projects: any[], category: string) => {
  return projects.filter(project => project.category === category);
};

export const getFeaturedProjects = (projects: any[]) => {
  return projects.filter(project => project.featured);
};

export const sortByDate = <
  T extends { date?: string; startDate?: string; completionDate?: string },
>(
  items: T[],
  ascending: boolean = false
): T[] => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.date || a.startDate || a.completionDate || '');
    const dateB = new Date(b.date || b.startDate || b.completionDate || '');

    return ascending
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });
};

export const getSkillProficiencyLevel = (proficiency: number): string => {
  if (proficiency >= 90) return 'Expert';
  if (proficiency >= 80) return 'Advanced';
  if (proficiency >= 70) return 'Intermediate';
  if (proficiency >= 60) return 'Beginner';
  return 'Learning';
};

export const getSkillProficiencyColor = (proficiency: number): string => {
  if (proficiency >= 90) return 'text-green-600';
  if (proficiency >= 80) return 'text-blue-600';
  if (proficiency >= 70) return 'text-yellow-600';
  if (proficiency >= 60) return 'text-orange-600';
  return 'text-red-600';
};
// Export SEO utilities
export * from './seo';
export * from './imageOptimization';
export * from './seoAudit';
export * from './smoothScroll';
export * from './animations';
