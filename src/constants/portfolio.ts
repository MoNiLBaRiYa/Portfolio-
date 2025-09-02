// Portfolio constants and enums

export const SKILL_CATEGORIES = [
  'Programming Languages',
  'Web Development',
  'Data & Analytics',
  'Tools & Technologies',
] as const;

export const PROJECT_CATEGORIES = [
  'Web Development',
  'AI/ML',
  'Data Visualization',
  'Mobile',
] as const;

export const EXPERIENCE_TYPES = [
  'Full-time',
  'Part-time',
  'Internship',
  'Freelance',
  'Simulation',
] as const;

export const AVAILABILITY_STATUS = [
  'Available',
  'Busy',
  'Not Available',
] as const;

export const TECHNOLOGY_CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'AI/ML',
  'Other',
] as const;

export const PROFICIENCY_LEVELS = {
  EXPERT: 90,
  ADVANCED: 80,
  INTERMEDIATE: 70,
  BEGINNER: 60,
  LEARNING: 0,
} as const;

export const PROFICIENCY_COLORS = {
  EXPERT: 'text-green-600 bg-green-100',
  ADVANCED: 'text-blue-600 bg-blue-100',
  INTERMEDIATE: 'text-yellow-600 bg-yellow-100',
  BEGINNER: 'text-orange-600 bg-orange-100',
  LEARNING: 'text-red-600 bg-red-100',
} as const;

export const CONTACT_METHODS = {
  EMAIL: 'email',
  PHONE: 'phone',
  LINKEDIN: 'linkedin',
  GITHUB: 'github',
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 0.8,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

export const SECTION_IDS = {
  HERO: 'hero',
  ABOUT: 'about',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  CONTACT: 'contact',
} as const;

export const META_DEFAULTS = {
  TITLE: 'Monil Bariya - Computer Science Engineering Student',
  DESCRIPTION:
    'Passionate Computer Science Engineering student with expertise in software development, data analysis, and emerging technologies.',
  KEYWORDS:
    'Monil Bariya, Computer Science, Software Developer, Data Analysis, Machine Learning, Web Development',
  AUTHOR: 'Monil Bariya',
  SITE_URL: 'https://monil-bariya.vercel.app',
  IMAGE: '/images/og-image.jpg',
} as const;
