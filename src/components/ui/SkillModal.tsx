'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill } from '@/types/portfolio';
import { portfolioData } from '@/data/portfolio';

interface SkillModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
}

const SkillModal: React.FC<SkillModalProps> = ({ skill, isOpen, onClose }) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!skill) return null;

  // Get related projects
  const relatedProjects =
    portfolioData.projects?.filter(project =>
      project.technologies?.some(tech => tech.name === skill.name)
    ) || [];

  // Get related certifications
  const relatedCertifications =
    portfolioData.certifications?.filter(cert =>
      cert.skills?.includes(skill.name)
    ) || [];

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl max-h-[90vh] mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-6 text-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="text-3xl sm:text-4xl flex-shrink-0">
                    {getSkillIcon(skill.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold truncate">
                      {skill.name}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm opacity-90">
                          Related Content:
                        </span>
                        <span className="text-sm sm:text-lg font-semibold">
                          {relatedProjects.length +
                            relatedCertifications.length}{' '}
                          items
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors flex-shrink-0 touch-target"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span className="text-2xl">🚀</span>
                      Related Projects ({relatedProjects.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {relatedProjects.map(project => (
                        <motion.div
                          key={project.id}
                          whileHover={{ scale: 1.02 }}
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                        >
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {project.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.slice(0, 3).map(tech => (
                              <span
                                key={tech.name}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                              >
                                {tech.name}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                                +{project.technologies.length - 3} more
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors"
                              >
                                Live Demo
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-gray-900 transition-colors"
                              >
                                GitHub
                              </a>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Related Certifications */}
                {relatedCertifications.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span className="text-2xl">🏆</span>
                      Related Certifications ({relatedCertifications.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {relatedCertifications.map(cert => (
                        <motion.div
                          key={cert.id}
                          whileHover={{ scale: 1.02 }}
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                        >
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {cert.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            {cert.issuer} •{' '}
                            {new Date(cert.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            {cert.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {cert.skills.map(skillName => (
                              <span
                                key={skillName}
                                className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full"
                              >
                                {skillName}
                              </span>
                            ))}
                          </div>
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                            >
                              View Credential
                            </a>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Skill Statistics */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    Skill Statistics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {relatedProjects.length}
                      </div>
                      <div className="text-sm text-blue-800 dark:text-blue-200">
                        Projects Using This Skill
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {relatedCertifications.length}
                      </div>
                      <div className="text-sm text-purple-800 dark:text-purple-200">
                        Related Certifications
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-4 sm:col-span-2 lg:col-span-1">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {relatedProjects.length + relatedCertifications.length}
                      </div>
                      <div className="text-sm text-green-800 dark:text-green-200">
                        Total Related Items
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* No Data Message */}
                {relatedProjects.length === 0 &&
                  relatedCertifications.length === 0 && (
                    <motion.div variants={itemVariants}>
                      <div className="text-center py-8">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          No Related Content Found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          This skill doesn&apos;t have any associated projects
                          or certifications yet.
                        </p>
                      </div>
                    </motion.div>
                  )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Helper function to get skill icons
const getSkillIcon = (skillName: string): string => {
  const iconMap: { [key: string]: string } = {
    JavaScript: '🟨',
    TypeScript: '🔷',
    Python: '🐍',
    Java: '☕',
    SQL: '🗃️',
    'React.js': '⚛️',
    'Next.js': '▲',
    'Node.js': '🟢',
    'HTML/CSS': '🌐',
    'Tailwind CSS': '🎨',
    'Power BI': '📊',
    'Machine Learning': '🤖',
    'Data Analysis': '📈',
    Pandas: '🐼',
    NumPy: '🔢',
    Git: '📝',
    Docker: '🐳',
    AWS: '☁️',
    MongoDB: '🍃',
    PostgreSQL: '🐘',
  };
  return iconMap[skillName] || '⚡';
};

export default SkillModal;
