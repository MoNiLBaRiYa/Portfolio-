'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types/portfolio';
import { Github, Calendar, Users } from 'lucide-react';
import { useResponsive } from '@/hooks/useResponsive';
import { useAccessibility } from '@/components/ui/AccessibilityProvider';

// Helper function to get emoji based on project title and category
const getProjectEmoji = (title: string, category: string): string => {
  const titleLower = title.toLowerCase();

  // Specific project mappings
  if (titleLower.includes('fake news') || titleLower.includes('detection'))
    return '🕵️';
  if (titleLower.includes('portfolio') || titleLower.includes('personal'))
    return '👨‍💻';
  if (titleLower.includes('needmeet') || titleLower.includes('platform'))
    return '🤝';

  // Category-based mappings
  if (category === 'AI/ML') return '🤖';
  if (category === 'Web Development') return '🌐';
  if (category === 'Data Visualization') return '📊';
  if (category === 'Mobile App') return '📱';

  return '💻'; // default fallback
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  index,
}) => {
  const { isMobile, isTouchDevice } = useResponsive();
  const { reducedMotion, announceMessage } = useAccessibility();

  const handleCardClick = () => {
    announceMessage(
      `Opening project: ${project.title}. ${project.description}`
    );
    onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0.2 : 0.5,
        delay: reducedMotion ? 0 : index * 0.1,
        ease: [0.6, -0.05, 0.01, 0.99],
      }}
      className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-2xl"
      style={{
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title} project`}
    >
      {/* Project Visual */}
      <div className="relative h-48 bg-gradient-to-br from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] overflow-hidden flex items-center justify-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>
        </div>

        {/* Project Images or Icon */}
        {project.images && project.images.length > 0 ? (
          <Image
            src={project.images[0]}
            alt={`${project.title} preview`}
            fill
            className="object-cover opacity-80"
            loading="lazy"
          />
        ) : (
          <div className="relative z-20">
            <span
              className="text-6xl sm:text-7xl md:text-8xl text-white/90"
              role="img"
              aria-label={`${project.title} project icon`}
            >
              {getProjectEmoji(project.title, project.category)}
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            {project.featured && (
              <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
                ⭐ Featured
              </span>
            )}
            {project.ongoing && (
              <span className="bg-blue-400 text-blue-900 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
                🚧 Ongoing
              </span>
            )}
            <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium border border-white/20">
              {project.category}
            </span>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
              <Github className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-secondary)] transition-colors duration-200 glow-text">
            {project.title}
          </h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <span
              key={tech.name}
              className="px-3 py-1 text-xs rounded-full font-medium bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-secondary)] backdrop-blur-sm"
            >
              {tech.name}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-3 py-1 text-xs rounded-full font-medium bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-muted)] backdrop-blur-sm">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Project Meta Info */}
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(project.completionDate).getFullYear()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>
                {project.teamSize === 1
                  ? 'Solo'
                  : `${project.teamSize} members`}
              </span>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleCardClick}
            className="text-[var(--accent-secondary)] hover:text-[var(--accent-primary)] font-medium text-sm transition-colors duration-200"
          >
            View Details →
          </button>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <button
                onClick={e => handleLinkClick(e, project.githubUrl!)}
                className="p-2 text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-colors duration-200"
                title="View Code"
              >
                <Github className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Project Stats */}
        <div className="mt-4 pt-4 border-t border-[var(--glass-border)]">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="text-center">
              <div className="text-[var(--text-muted)]">Technologies</div>
              <div className="font-semibold text-[var(--text-primary)]">
                {project.technologies.length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-[var(--text-muted)]">Team Size</div>
              <div className="font-semibold text-[var(--text-primary)]">
                {project.teamSize === 1 ? 'Solo' : `${project.teamSize}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
