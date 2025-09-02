'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/portfolio';
import ProjectCard from '@/components/ui/ProjectCard';
// import ProjectModal from '@/components/ui/ProjectModal';
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

  return (
    <section
      id="projects"
      className={`bg-white ${
        isMobile ? 'py-12' : isTablet ? 'py-16' : 'py-20'
      }`}
    >
      <div className="container-responsive">
        <AnimatedSection variants={staggerContainer}>
          {/* Section Header */}
          <motion.div
            variants={staggerItem}
            className={`text-center ${
              isMobile ? 'mb-10' : isTablet ? 'mb-12' : 'mb-16'
            }`}
          >
            <h2
              className={`font-bold text-gray-900 mb-4 ${
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
              className={`text-gray-600 max-w-2xl mx-auto ${
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
                className={`rounded-full font-medium transition-all duration-300 ${
                  isMobile ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'
                } ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
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
            className={`grid ${
              isMobile
                ? 'grid-cols-1 gap-6'
                : isTablet
                  ? 'grid-cols-2 gap-6'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            }`}
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
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="relative p-6 bg-gradient-to-br from-blue-600 to-purple-600">
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-white/90 text-sm">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Project Overview
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map(tech => (
                          <span
                            key={tech.name}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      {selectedProject.demoUrl && (
                        <button
                          onClick={() =>
                            window.open(selectedProject.demoUrl!, '_blank')
                          }
                          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </button>
                      )}
                      {selectedProject.githubUrl && (
                        <button
                          onClick={() =>
                            window.open(selectedProject.githubUrl!, '_blank')
                          }
                          className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
