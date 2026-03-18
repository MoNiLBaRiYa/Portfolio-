import { Metadata } from 'next';
import { generateMetadata, generateStructuredData } from '@/utils/seo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
}

export function generateSEOMetadata(props: SEOHeadProps = {}): Metadata {
  return generateMetadata(props);
}

export function SEOStructuredData({ 
  includeAll = true,
  includePersonal = true,
  includeWebsite = true,
  includePortfolio = true,
  includeOrganization = true 
}: {
  includeAll?: boolean;
  includePersonal?: boolean;
  includeWebsite?: boolean;
  includePortfolio?: boolean;
  includeOrganization?: boolean;
} = {}) {
  const data = generateStructuredData();
  
  return (
    <>
      {(includeAll || includePersonal) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data.person),
          }}
        />
      )}
      {(includeAll || includeWebsite) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data.website),
          }}
        />
      )}
      {(includeAll || includePortfolio) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data.portfolio),
          }}
        />
      )}
      {(includeAll || includeOrganization) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data.organization),
          }}
        />
      )}
    </>
  );
}

// Legacy component for backward compatibility - now uses Next.js 13+ metadata
export function SEOHead(props: SEOHeadProps) {
  console.warn('SEOHead is deprecated. Use generateSEOMetadata in your page metadata instead.');
  return null;
}
