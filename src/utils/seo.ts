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
  const baseUrl = 'https://monilbariya.vercel.app';
  const defaultImage = `${baseUrl}/opengraph-image.png`;

  const title =
    config.title ||
    `${portfolioData.personal.name} - ${portfolioData.personal.title}`;
  const description = config.description || portfolioData.personal.summary;
  const image = config.image || defaultImage;
  const url = config.url || baseUrl;

  const keywords = [
    'Freelance Web Developer India',
    'AI-Powered Web Development',
    'Next.js Specialist India',
    'React.js Freelance Developer',
    'MERN Stack Expert',
    'Full Stack Developer Vadodara',
    'Custom AI Chatbot Integration',
    'MVP Development for Startups',
    'SaaS Product Developer',
    'Generative AI Specialist',
    'Technical SEO for Web Apps',
    'High Performance Next.js Sites',
    'AI Agents Developer',
    'Python Flask API Developer',
    'MongoDB Database Architect',
    'Portfolio',
    'Fullstack Developer Portfolio',
    'Freelancer Portfolio',
    'Monil Bariya Portfolio',
    'Monil Bariya',
    'Computer Science Engineering',
    'Software Developer India',
    'Web Developer India',
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
    'Vadodara',
    'Frontend Developer',
    'Backend Developer India',
    'Machine Learning India',
    'Artificial Intelligence Expert',
    'Data Analysis Services',
    'Web Applications Development',
    'Interactive Portfolio',
    'Three.js',
    'D3.js',
    'Framer Motion',
    'Tailwind CSS',
    'MongoDB',
    'Flask',
    'Node.js Developer',
    'Express.js',
    'AWS Cloud Deployment',
    'Cloud Computing Specialist',
    'Fake News Detection AI',
    'AI-Powered Full Stack Developer',
    'MVP Development specialist',
    'SaaS Developer India',
    'Next.js Performance Optimization',
    'AI Agents & Automation Expert',
    'Enterprise Web Solutions',
    'Custom AI Integration India',
    'High-Performance Web Apps',
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
    },
    alternates: {
      canonical: url,
      languages: {
        'en-US': url,
        'x-default': url,
      },
    },
    category: 'Technology',
    classification: 'Portfolio Website',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    manifest: '/site.webmanifest',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: portfolioData.personal.name,
    },
    verification: {
      google: 'fb54a6b0d2601101',
    },
  };
}

export function generateStructuredData() {
  const baseUrl = 'https://monilbariya.vercel.app';

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
    sameAs: [
      portfolioData.personal.linkedin,
      portfolioData.personal.github,
      'https://monilbariya.vercel.app',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Parul University',
    },
    knowsAbout: [
      'Full-Stack Web Development',
      'React.js & Next.js Developer',
      'TypeScript & JavaScript Developer',
      'Python & Flask Backend API',
      'Performance Optimization specialist',
      'Technical SEO for Web Applications',
      'AI-Powered Web Development',
      'Generative AI & Prompt Engineering',
      'AI Agents & Automation workflows',
      'Machine Learning & Misinformation Analysis',
      'Data Visualization (Power BI, Tableau)',
      'SaaS & MVP Development',
      'Safe AI Execution Systems',
      'WCAG & Accessibility-First Design',
      'MERN Stack Expert',
      'Tailwind CSS UI/UX Design',
      'MongoDB & Database Architect',
    ],
    homeLocation: {
      '@type': 'Place',
      name: 'India',
      addressCountry: 'IN',
    },
    nationality: {
      '@type': 'Country',
      name: 'India',
    },
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
      'portfolio, fullstack developer portfolio, freelancer portfolio, web development, software engineering, interactive design',
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
      '@type': 'PostalAddress',
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
  const baseUrl = 'https://monilbariya.vercel.app';

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
    description: project.longDescription,
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
      img => `https://monilbariya.vercel.app${img}`
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

export function generateSkillsStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Technical Skills',
    description: 'Programming languages and technologies expertise',
    itemListElement: portfolioData.skills.flatMap((category, categoryIndex) =>
      category.skills.map((skill, skillIndex) => ({
        '@type': 'ListItem',
        position: categoryIndex * 10 + skillIndex + 1,
        item: {
          '@type': 'Thing',
          name: skill.name,
          description: `${skill.name} - ${category.category}`,
          image: skill.icon,
        },
      }))
    ),
  };
}

export function generateEducationStructuredData() {
  return portfolioData.education.map(edu => ({
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    name: edu.degree,
    description: `${edu.degree} from ${edu.institution}`,
    educationalLevel: 'Bachelor',
    credentialCategory: 'degree',
    recognizedBy: {
      '@type': 'EducationalOrganization',
      name: edu.institution,
    },
    dateCreated: edu.startDate,
    expires: edu.endDate,
  }));
}

export function generateExperienceStructuredData() {
  return portfolioData.experience.map(exp => ({
    '@context': 'https://schema.org',
    '@type': 'WorkExperience',
    name: exp.title,
    description: exp.description,
    startDate: exp.startDate,
    endDate: exp.endDate || new Date().toISOString().split('T')[0],
    employer: {
      '@type': 'Organization',
      name: exp.company,
    },
    jobTitle: exp.title,
    skills: exp.technologies || [],
  }));
}
