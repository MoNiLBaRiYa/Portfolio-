import { Metadata } from 'next';
import { generateSectionMetadata } from '@/utils/seoHelpers';

interface SectionMetaProps {
  section: string;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string[];
}

export function generateSectionMeta({
  section,
  customTitle,
  customDescription,
  customKeywords,
}: SectionMetaProps): Metadata {
  const baseMeta = generateSectionMetadata(section);
  
  return {
    ...baseMeta,
    ...(customTitle && { title: customTitle }),
    ...(customDescription && { description: customDescription }),
    ...(customKeywords && { 
      keywords: [...(baseMeta.keywords as string[]), ...customKeywords] 
    }),
  };
}

// Legacy component - now uses Next.js 13+ metadata
export function SectionMeta({ section, title, description }: { 
  section: string; 
  title: string; 
  description: string; 
}) {
  console.warn('SectionMeta is deprecated. Use generateSectionMeta in your page metadata instead.');
  return null;
}
