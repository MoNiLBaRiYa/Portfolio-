'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SkillCategory } from '@/types/portfolio';
import { LazySkillTree } from '@/components/lazy';
import ProgressiveLoader from '@/components/ui/ProgressiveLoader';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { staggerContainer, staggerItem } from '@/utils/animations';
import { useResponsive } from '@/hooks/useResponsive';
import { useAccessibility } from '@/components/ui/AccessibilityProvider';

interface SkillsSectionProps {
  skills: SkillCategory[];
  className?: string;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'tree'>('grid');
  const [hasError, setHasError] = useState<boolean>(false);
  const { isMobile, isTablet, isTouchDevice } = useResponsive();
  const { reducedMotion, announceMessage } = useAccessibility();

  // Safely access skills data with error handling
  const skillCategories = useMemo(() => {
    try {
      if (!skills) {
        console.error('Skills data is missing');
        setHasError(true);
        return [];
      }
      return skills;
    } catch (error) {
      console.error('Error loading skills data:', error);
      setHasError(true);
      return [];
    }
  }, [skills]);

  const filteredSkills = useMemo(() => {
    try {
      if (!Array.isArray(skillCategories)) return [];
      return selectedCategory === 'all'
        ? skillCategories
        : skillCategories.filter(cat => cat?.category === selectedCategory);
    } catch (error) {
      console.error('Error filtering skills:', error);
      return [];
    }
  }, [selectedCategory, skillCategories]);

  const handleCategoryChange = (category: string) => {
    try {
      setSelectedCategory(category);
      announceMessage(
        `Skills filtered by ${category === 'all' ? 'all categories' : category}`
      );
    } catch (error) {
      console.error('Error in handleCategoryChange:', error);
    }
  };

  const handleViewModeChange = (mode: 'grid' | 'tree') => {
    try {
      setViewMode(mode);
      announceMessage(`View mode changed to ${mode}`);
    } catch (error) {
      console.error('Error in handleViewModeChange:', error);
    }
  };

  // Early return if there's an error
  if (hasError) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We&apos;re having trouble loading the skills section. Please try
            refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
      className={`bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 ${
        isMobile ? 'py-12' : isTablet ? 'py-16' : 'py-20'
      } ${className}`}
    >
      <div className="container-responsive">
        <AnimatedSection
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            variants={staggerItem}
            className={`text-center ${
              isMobile ? 'mb-10' : isTablet ? 'mb-12' : 'mb-16'
            }`}
          >
            <h2
              className={`font-bold text-gray-900 dark:text-white mb-6 ${
                isMobile
                  ? 'text-3xl'
                  : isTablet
                    ? 'text-4xl'
                    : 'text-4xl md:text-5xl'
              }`}
            >
              Skills & Technologies
            </h2>
            <p
              className={`text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${
                isMobile ? 'text-base px-2' : isTablet ? 'text-lg' : 'text-xl'
              }`}
            >
              Technologies and tools I use in my projects and development work
            </p>
          </motion.div>

          {/* View Mode Toggle */}
          <motion.div
            variants={staggerItem}
            className={`flex flex-wrap justify-center gap-4 ${
              isMobile ? 'mb-6' : 'mb-8'
            }`}
          >
            <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
              {[
                { mode: 'grid', label: 'Grid View', icon: '⊞' },
                { mode: 'tree', label: 'Skill Tree', icon: '🌳' },
              ].map(({ mode, label, icon }) => (
                <button
                  key={mode}
                  onClick={() => handleViewModeChange(mode as 'grid' | 'tree')}
                  className={`rounded-md transition-all duration-300 flex items-center gap-2 ${
                    isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2'
                  } ${
                    viewMode === mode
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } ${isTouchDevice ? 'touch-target' : ''}`}
                >
                  <span>{icon}</span>
                  <span className={isMobile ? 'text-xs' : 'hidden sm:inline'}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            variants={staggerItem}
            className={`flex flex-wrap justify-center gap-2 ${
              isMobile ? 'mb-8' : 'mb-12'
            }`}
          >
            <button
              onClick={() => handleCategoryChange('all')}
              className={`rounded-full transition-all duration-300 ${
                isMobile ? 'px-3 py-1 text-sm' : 'px-4 py-2'
              } ${
                selectedCategory === 'all'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              } ${isTouchDevice ? 'touch-target' : ''}`}
            >
              All Skills
            </button>
            {skillCategories.map(category => (
              <button
                key={category.category}
                onClick={() => handleCategoryChange(category.category)}
                className={`rounded-full transition-all duration-300 ${
                  isMobile ? 'px-3 py-1 text-sm' : 'px-4 py-2'
                } ${
                  selectedCategory === category.category
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                } ${isTouchDevice ? 'touch-target' : ''}`}
              >
                {category.category}
              </button>
            ))}
          </motion.div>

          {/* Skills Visualization */}
          <motion.div
            variants={staggerItem}
            className={isMobile ? 'mb-10' : 'mb-16'}
          >
            {viewMode === 'grid' && <SkillGrid skills={filteredSkills} />}
            {viewMode === 'tree' && (
              <ProgressiveLoader>
                <LazySkillTree skillCategories={filteredSkills} />
              </ProgressiveLoader>
            )}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Skill Grid Component
interface SkillGridProps {
  skills: SkillCategory[];
}

// Helper function to get skill icons
const getSkillIcon = (skillName: string): string => {
  const iconMap: { [key: string]: string } = {
    // Languages
    Python: '🐍',
    Java: '☕',
    'C++': '⚡',
    HTML: '🌐',
    CSS: '🎨',
    Flask: '🌶️',
    MongoDB: '🍃',

    // Developer Tools
    'Power BI': '📊',
    'IntelliJ IDEA': '💡',
    'VS Code': '📝',
    Cursor: '🖱️',
    'Kiro IDE': '🔧',
    Git: '📋',

    // Core Concepts
    'Data Structure': '🏗️',
    'Frontend Design': '🎨',
    'Code Optimization': '⚡',

    // Soft Skills
    Collaboration: '🤝',
    'Critical and Creative Thinking': '🧠',
    Communication: '💬',
  };
  return iconMap[skillName] || '⚙️';
};

const SkillGrid: React.FC<SkillGridProps> = ({ skills }) => {
  const { isMobile, isTablet } = useResponsive();

  // Add error boundary for the grid
  if (!skills || !Array.isArray(skills)) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 dark:text-red-400">
          Failed to load skills data.
        </p>
      </div>
    );
  }

  return (
    <div className={isMobile ? 'space-y-8' : 'space-y-12'}>
      {skills.map(category => {
        // Skip invalid categories
        if (!category?.category || !Array.isArray(category.skills)) {
          return null;
        }

        return (
          <div
            key={category.category}
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg ${
              isMobile ? 'p-6' : 'p-8'
            }`}
          >
            <h3
              className={`font-bold text-gray-900 dark:text-white mb-6 text-center ${
                isMobile ? 'text-xl' : 'text-2xl'
              }`}
            >
              {category.category}
            </h3>

            <div
              className={`grid gap-6 ${
                isMobile
                  ? 'grid-cols-2'
                  : isTablet
                    ? 'grid-cols-3'
                    : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
              }`}
            >
              {category.skills.map((skill, index) => {
                if (!skill?.name) return null;

                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    }}
                    className={`flex flex-col items-center rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-300 hover:shadow-md cursor-pointer ${
                      isMobile ? 'p-3' : 'p-4'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center mb-3 ${
                        isMobile ? 'w-10 h-10' : 'w-12 h-12'
                      }`}
                    >
                      {skill.icon ? (
                        <Image
                          src={skill.icon}
                          alt={`${skill.name} icon`}
                          width={isMobile ? 32 : 40}
                          height={isMobile ? 32 : 40}
                          className={`object-contain ${
                            isMobile ? 'w-8 h-8' : 'w-10 h-10'
                          }`}
                          onError={e => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback =
                              target.nextElementSibling as HTMLElement;
                            if (fallback) {
                              fallback.style.display = 'inline';
                            }
                          }}
                        />
                      ) : null}
                      <span
                        className={`${isMobile ? 'text-xl' : 'text-2xl'} ${
                          skill.icon ? 'hidden' : ''
                        }`}
                        style={{ display: skill.icon ? 'none' : 'inline' }}
                      >
                        {getSkillIcon(skill.name)}
                      </span>
                    </div>
                    <h4
                      className={`font-medium text-gray-900 dark:text-white text-center ${
                        isMobile ? 'text-xs' : 'text-sm'
                      }`}
                    >
                      {skill.name}
                    </h4>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsSection;
