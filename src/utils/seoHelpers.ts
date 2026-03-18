import { Metadata } from 'next';
import { portfolioData } from '@/data/portfolio';

export interface PageSEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
}

export function generatePageMetadata(config: PageSEOConfig = {}): Metadata {
  const baseUrl = 'https://monilbariya.vercel.app';
  const fullUrl = config.path ? `${baseUrl}${config.path}` : baseUrl;
  
  const title = config.title 
    ? `${config.title} | ${portfolioData.personal.name}`
    : `${portfolioData.personal.name} - ${portfolioData.personal.title}`;
    
  const description = config.description || portfolioData.personal.summary;
  const image = config.image || `${baseUrl}/opengraph-image`;

  const baseKeywords = [
    'Monil Bariya',
    'Computer Science Engineering',
    'Software Developer',
    'Web Developer',
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'AI/ML Engineer',
    'Portfolio',
    'India',
  ];

  return {
    title,
    description,
    keywords: [...baseKeywords, ...(config.keywords || [])],
    authors: [{ name: portfolioData.personal.name, url: baseUrl }],
    creator: portfolioData.personal.name,
    publisher: portfolioData.personal.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: config.type || 'website',
      locale: 'en_US',
      url: fullUrl,
      title,
      description,
      siteName: `${portfolioData.personal.name} - Portfolio`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(config.publishedTime && { publishedTime: config.publishedTime }),
      ...(config.modifiedTime && { modifiedTime: config.modifiedTime }),
      ...(config.section && { section: config.section }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': fullUrl,
        'x-default': fullUrl,
      },
    },
    category: 'Technology',
  };
}

export function generateProjectPageMetadata(projectId: string): Metadata | null {
  const project = portfolioData.projects.find(p => p.id === projectId);
  if (!project) return null;

  return generatePageMetadata({
    title: project.title,
    description: project.description,
    keywords: [
      ...project.technologies.map(tech => tech.name),
      'project',
      'portfolio',
      'software development',
    ],
    path: `/#projects/${projectId}`,
    type: 'article',
    section: 'Projects',
    publishedTime: project.completionDate,
    modifiedTime: new Date().toISOString(),
  });
}

export function generateSectionMetadata(section: string): Metadata {
  const sectionConfigs = {
    about: {
      title: 'About Me',
      description: `Learn more about ${portfolioData.personal.name}, a passionate Computer Science Engineering student and developer.`,
      keywords: ['about', 'biography', 'background', 'developer story'],
      path: '/#about',
    },
    skills: {
      title: 'Technical Skills',
      description: `Explore the technical skills and expertise of ${portfolioData.personal.name} in various programming languages and technologies.`,
      keywords: ['skills', 'programming languages', 'technologies', 'expertise'],
      path: '/#skills',
    },
    projects: {
      title: 'Projects Portfolio',
      description: `Discover innovative projects built by ${portfolioData.personal.name}, showcasing skills in web development, AI/ML, and more.`,
      keywords: ['projects', 'portfolio', 'web development', 'AI', 'machine learning'],
      path: '/#projects',
    },
    experience: {
      title: 'Professional Experience',
      description: `Professional experience and certifications of ${portfolioData.personal.name} in software development and technology.`,
      keywords: ['experience', 'work history', 'certifications', 'professional'],
      path: '/#experience',
    },
    education: {
      title: 'Education Background',
      description: `Educational background and academic achievements of ${portfolioData.personal.name}.`,
      keywords: ['education', 'academic', 'university', 'computer science'],
      path: '/#education',
    },
    contact: {
      title: 'Contact Information',
      description: `Get in touch with ${portfolioData.personal.name} for collaboration opportunities and professional inquiries.`,
      keywords: ['contact', 'hire', 'collaboration', 'professional inquiries'],
      path: '/#contact',
    },
  };

  const config = sectionConfigs[section as keyof typeof sectionConfigs];
  if (!config) {
    return generatePageMetadata();
  }

  return generatePageMetadata(config);
}

export const seoConstants = {
  baseUrl: 'https://monilbariya.vercel.app',
  siteName: `${portfolioData.personal.name} - Portfolio`,
  defaultImage: '/opengraph-image',
  googleSiteVerification: 'fb54a6b0d2601101',
} as const;