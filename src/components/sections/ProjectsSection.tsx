'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/portfolio';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectModal from '@/components/ui/ProjectModal';
import ProgressiveLoader from '@/components/ui/ProgressiveLoader';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { staggerContainer, staggerItem } from '@/utils/animations';
import { useResponsive } from '@/hooks/useResponsive';
import { X, ExternalLink, Github } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const { isMobile, isTablet, isTouchDevice } = useResponsive();

  // Get unique technology categories for filtering
  const filterOptions = useMemo(() => {
    const categories = new Set<string>();
    categories.add('All');

    projects.forEach(project => {
      project.technologies.forEach(tech => {
        categories.add(tech.category);
      });
      categories.add(project.category);
    });

    return Array.from(categories);
  }, [projects]);

  // Filter projects based on selected filter
  const filteredProjects = useMemo(() => {
    if (!projects || !Array.isArray(projects)) {
      return [];
    }

    if (selectedFilter === 'All') {
      return projects;
    }

    return projects.filter(project => {
      // Check if filter matches project category
      if (project.category === selectedFilter) {
        return true;
      }

      // Check if filter matches any technology category
      return project.technologies?.some(
        tech => tech.category === selectedFilter
      );
    });
  }, [projects, selectedFilter]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // Determine responsive grid columns based on project count for better space usage
  const gridClassNames = useMemo(() => {
    const count = filteredProjects.length;
    if (isMobile) return 'grid-cols-1 gap-6';
    if (isTablet) return 'grid-cols-2 gap-6';

    // Desktop: optimize column count by item count
    if (count <= 1) return 'grid-cols-1 gap-8 max-w-xl mx-auto';
    if (count === 2) return 'grid-cols-2 gap-8 max-w-5xl mx-auto';
    if (count === 3) return 'grid-cols-3 gap-8 max-w-6xl mx-auto';
    // 4 or more, keep 3 columns for readability
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto';
  }, [filteredProjects.length, isMobile, isTablet]);

  return (
    <section
      id="projects"
      className={`bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden ${
        isMobile ? 'py-12' : isTablet ? 'py-16' : 'py-20'
      }`}
    >
      {/* Animated background - More visible */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500 to-teal-400 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-teal-400 to-blue-500 rounded-full filter blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      <div className="container-responsive relative z-10">
        <AnimatedSection variants={staggerContainer}>
          {/* Section Header */}
          <motion.div
            variants={staggerItem}
            className={`text-center ${
              isMobile ? 'mb-10' : isTablet ? 'mb-12' : 'mb-16'
            }`}
          >
            <h2
              className={`font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent drop-shadow-2xl ${
                isMobile
                  ? 'text-2xl'
                  : isTablet
                    ? 'text-3xl'
                    : 'text-3xl md:text-4xl'
              }`}
            >
              Featured Projects
            </h2>
            <p
              className={`text-gray-200 max-w-2xl mx-auto ${
                isMobile ? 'text-base px-2' : isTablet ? 'text-base' : 'text-lg'
              }`}
            >
              A showcase of my recent work and technical achievements, featuring
              interactive demos and detailed case studies.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            variants={staggerItem}
            className={`flex flex-wrap justify-center gap-3 ${
              isMobile ? 'mb-8' : 'mb-12'
            }`}
          >
            {filterOptions.map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`rounded-full font-semibold transition-all duration-300 ${
                  isMobile ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'
                } ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-blue-500/50 transform scale-105'
                    : 'bg-white/10 backdrop-blur-md text-gray-200 hover:bg-white/20 hover:shadow-lg border border-white/20'
                } ${isTouchDevice ? 'touch-target' : ''}`}
              >
                {filter}
                <span
                  className={`ml-2 opacity-75 ${
                    isMobile ? 'text-xs' : 'text-xs'
                  }`}
                >
                  (
                  {filter === 'All' ? projects.length : filteredProjects.length}
                  )
                </span>
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={staggerItem}
            layout
            className={`grid ${gridClassNames}`}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    layout: { duration: 0.3 },
                  }}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onClick={() => handleProjectClick(project)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div variants={staggerItem} className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No projects found for the selected filter.
              </p>
              <button
                onClick={() => setSelectedFilter('All')}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Show all projects
              </button>
            </motion.div>
          )}

          {/* Project Modal */}
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              isOpen={true}
              onClose={handleCloseModal}
            />
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
