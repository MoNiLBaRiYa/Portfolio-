'use client';

import { useEngagement } from '@/context/EngagementContext';

const RECOMMENDATIONS = {
  skills: {
    title: 'Skills to Highlight',
    items: [
      { id: 'react', label: 'React', icon: '⚛️' },
      { id: 'typescript', label: 'TypeScript', icon: '📘' },
      { id: 'nextjs', label: 'Next.js', icon: '⏭️' },
    ],
  },
  projects: {
    title: 'Featured Projects',
    items: [
      { id: 'portfolio', label: 'Portfolio Site', icon: '🎨' },
      { id: 'ai-projects', label: 'AI Projects', icon: '🤖' },
      { id: 'web-apps', label: 'Web Applications', icon: '🌐' },
    ],
  },
  contact: {
    title: 'Get in Touch',
    items: [
      { id: 'email', label: 'Email', icon: '📧' },
      { id: 'linkedin', label: 'LinkedIn', icon: '🔗' },
      { id: 'github', label: 'GitHub', icon: '💻' },
    ],
  },
};

export function PersonalizedRecommendations() {
  const { engagementScore, viewedSections } = useEngagement();

  // Only show recommendations after some engagement
  if (engagementScore < 20) return null;

  // Determine which sections to recommend
  const recommendedSections = Object.entries(RECOMMENDATIONS).filter(
    ([key]) => {
      return !viewedSections.includes(key);
    }
  );

  if (recommendedSections.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-xs z-50">
      <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
        Recommended for You
      </h3>
      <div className="space-y-3">
        {recommendedSections.slice(0, 2).map(([key, section]) => (
          <div key={key} className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">
              {section.title}
            </h4>
            <div className="flex flex-wrap gap-2">
              {section.items.map(item => (
                <a
                  key={item.id}
                  href={`#${key}`}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-white dark:bg-gray-600 rounded-full shadow-sm hover:shadow transition-shadow"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
