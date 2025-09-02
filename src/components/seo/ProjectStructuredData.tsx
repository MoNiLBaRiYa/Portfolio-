import { generateProjectStructuredData } from '@/utils/seo';

interface ProjectStructuredDataProps {
  projectId: string;
}

export function ProjectStructuredData({
  projectId,
}: ProjectStructuredDataProps) {
  const structuredData = generateProjectStructuredData(projectId);

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
