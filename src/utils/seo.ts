import { Metadata } from 'next';
import { portfolioData } from '@/data/portfolio';

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
}

export function generateMetadata(config: SEOConfig = {}): Metadata {
  const baseUrl = 'https://monil-bariya.vercel.app';
  const defaultImage = `${baseUrl}/opengraph-image`;

  const title =
    config.title ||
    `${portfolioData.personal.name} - ${portfolioData.personal.title}`;
  const description = config.description || portfolioData.personal.summary;
  const image = config.image || defaultImage;
  const url = config.url || baseUrl;

  const keywords = [
    'Monil Bariya',
    'Computer Science Engineering',
    'Software Developer',
    'Web Developer',
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'JavaScript Developer',
    'Python Developer',
    'AI/ML Engineer',
    'Data Visualization',
    'Power BI',
    'Portfolio',
    'Parul University',
    'India',
    'Frontend Developer',
    'Backend Developer',
    'Machine Learning',
    'Artificial Intelligence',
    'Data Analysis',
    'Web Applications',
    'Interactive Portfolio',
    'Three.js',
    'D3.js',
    'Framer Motion',
    'Tailwind CSS',
    'MongoDB',
    'Flask',
    'Node.js',
    'Express.js',
    'AWS',
    'Cloud Computing',
    'Fake News Detection',
    'NeedMeet Platform',
    'Professional Services',
    ...(config.keywords || []),
  ];

  return {
    title,
    description,
    keywords,
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
      url,
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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@monilbariya28',
    },
    alternates: {
      canonical: url,
    },
    category: 'Technology',
  };
}

export function generateStructuredData() {
  const baseUrl = 'https://monil-bariya.vercel.app';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolioData.personal.name,
    jobTitle: portfolioData.personal.title,
    description: portfolioData.personal.summary,
    url: baseUrl,
    image: `${baseUrl}${portfolioData.personal.profileImage}`,
    email: portfolioData.personal.email,
    telephone: portfolioData.personal.phone,
    address: {
      '@type': 'Place',
      name: portfolioData.personal.location,
    },
    sameAs: [portfolioData.personal.linkedin, portfolioData.personal.github],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Parul University',
    },
    knowsAbout: [
      'Software Development',
      'Web Development',
      'Machine Learning',
      'Data Visualization',
      'React.js',
      'Next.js',
      'TypeScript',
      'Python',
      'AI/ML',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Developer',
      description:
        'Full-stack web developer with expertise in modern technologies',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${portfolioData.personal.name} - Portfolio`,
    description: portfolioData.personal.summary,
    url: baseUrl,
    author: {
      '@type': 'Person',
      name: portfolioData.personal.name,
    },
    inLanguage: 'en-US',
  };

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${portfolioData.personal.name} - Interactive Portfolio`,
    description:
      'Interactive portfolio showcasing software development projects, skills, and experience',
    url: baseUrl,
    author: {
      '@type': 'Person',
      name: portfolioData.personal.name,
    },
    dateCreated: '2024-04-20',
    dateModified: new Date().toISOString().split('T')[0],
    genre: 'Portfolio',
    keywords:
      'portfolio, web development, software engineering, interactive design',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Monil Bariya Portfolio',
    url: baseUrl,
    logo: `${baseUrl}/favicon-32x32.png`,
    description:
      'Interactive portfolio showcasing software development projects and skills',
    address: {
      '@type': 'Place',
      addressCountry: 'IN',
      addressLocality: 'India',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: portfolioData.personal.email,
      telephone: portfolioData.personal.phone,
    },
  };

  return {
    person: personSchema,
    website: websiteSchema,
    portfolio: portfolioSchema,
    organization: organizationSchema,
  };
}

export function generateBreadcrumbStructuredData() {
  const baseUrl = 'https://monil-bariya.vercel.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolio',
        item: `${baseUrl}/#projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Skills',
        item: `${baseUrl}/#skills`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contact',
        item: `${baseUrl}/#contact`,
      },
    ],
  };
}

export function generateProjectStructuredData(projectId: string) {
  const project = portfolioData.projects.find(p => p.id === projectId);
  if (!project) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    url: project.demoUrl,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web Browser',
    author: {
      '@type': 'Person',
      name: portfolioData.personal.name,
    },
    dateCreated: project.completionDate,
    programmingLanguage: project.technologies.map(tech => tech.name),
    screenshot: project.images.map(
      img => `https://monil-bariya.vercel.app${img}`
    ),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '1',
    },
  };
}
