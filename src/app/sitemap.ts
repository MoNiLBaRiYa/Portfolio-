import { MetadataRoute } from 'next';
import { portfolioData } from '@/data/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://monil-bariya.vercel.app';
  const currentDate = new Date().toISOString();

  // Main pages
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#skills`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#experience`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#education`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Add project pages (if they have individual URLs in the future)
  const projectRoutes = portfolioData.projects.map(project => ({
    url: `${baseUrl}/#projects/${project.id}`,
    lastModified: project.completionDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes];
}
