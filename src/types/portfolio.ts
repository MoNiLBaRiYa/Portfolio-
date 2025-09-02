// Core portfolio data types
export interface PortfolioData {
  personal: PersonalInfo;
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  hobbies: Hobby[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone?: string;
  linkedin: string;
  github: string;
  summary: string;
  availability: 'Available' | 'Busy' | 'Not Available';
  profileImage: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: Technology[];
  category: 'Web Development' | 'AI/ML' | 'Data Visualization' | 'Mobile';
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completionDate: string;
  teamSize: number;
  challenges: Challenge[];
  features: Feature[];
  metrics?: ProjectMetrics;
  codeSnippets?: CodeSnippet[];
  liveDemo?: LiveDemo;
}

export interface Technology {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'AI/ML' | 'Other';
  icon?: string;
}

export interface Challenge {
  title: string;
  description: string;
  solution: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface ProjectMetrics {
  performanceScore?: number;
  userEngagement?: string;
  codeQuality?: string;
  impact?: string;
}

export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  filename?: string;
}

export interface LiveDemo {
  type: 'iframe' | 'interactive';
  url?: string;
  component?: string;
  description: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Freelance' | 'Simulation';
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate?: string;
  cgpa?: number;
  relevantCoursework: string[];
  achievements: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  achievements: string[];
  credentialUrl?: string;
  image?: string;
}

export interface Hobby {
  name: string;
  description: string;
  image?: string;
  relatedSkills: string[];
}

// Component prop types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Animation types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
}
// Additional utility types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  image?: string;
  url?: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface SkillTreeNode {
  id: string;
  name: string;
  proficiency: number;
  children?: SkillTreeNode[];
  x?: number;
  y?: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'education' | 'experience' | 'certification' | 'project';
}
