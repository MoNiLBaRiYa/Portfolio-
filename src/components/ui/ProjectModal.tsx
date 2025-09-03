'use client';

import React, { useEffect } from 'react';
import { Project } from '@/types/portfolio';
import { X, ExternalLink, Github } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  // Debug logging
  useEffect(() => {
    if (isOpen && project) {
      console.log('Modal opened for project:', project.title);
      console.log('Modal height:', window.innerHeight * 0.9);
      console.log('Content height:', window.innerHeight * 0.9 - 200);
    }
  }, [isOpen, project]);
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

  if (!project || !isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full h-[90vh] overflow-hidden flex flex-col">
        {/* Header - Fixed */}
        <div className="relative p-4 sm:p-6 bg-gradient-to-br from-blue-600 to-purple-600 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 pr-12">
            {project.title}
          </h2>
          <p className="text-white/90 text-sm pr-12">{project.description}</p>
        </div>

        {/* Content - Scrollable */}
        <div
          className="flex-1 min-h-0 overflow-y-auto modal-scrollbar"
          style={{ WebkitOverflowScrolling: 'touch' as any }}
        >
          <div className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                  Project Overview
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {project.longDescription}
                </p>
              </div>

              {/* Project Story - Problem, Solution, Impact */}
              {project.projectStory && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 sm:p-5 border border-blue-200">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                    Project Story
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-red-500">
                      <h4 className="font-medium text-red-700 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        Problem
                      </h4>
                      <p className="text-sm text-gray-700">
                        {project.projectStory.problem}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-blue-500">
                      <h4 className="font-medium text-blue-700 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Solution
                      </h4>
                      <p className="text-sm text-gray-700">
                        {project.projectStory.solution}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-green-500">
                      <h4 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Impact
                      </h4>
                      <p className="text-sm text-gray-700">
                        {project.projectStory.impact}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span
                      key={tech.name}
                      className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Challenges & Solutions */}
              {project.challenges && project.challenges.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                    Key Challenges & Solutions
                  </h3>
                  <div className="space-y-3">
                    {project.challenges.map((challenge, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-3 sm:p-4 border-l-4 border-orange-500"
                      >
                        <h4 className="font-medium text-orange-700 mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          {challenge.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {challenge.description}
                        </p>
                        <div className="bg-white rounded p-2 border-l-2 border-green-500">
                          <p className="text-xs text-green-700 font-medium">
                            Solution:
                          </p>
                          <p className="text-xs text-gray-700">
                            {challenge.solution}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Features */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200"
                      >
                        <h4 className="font-medium text-green-800 mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-green-700">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Metrics */}
              {project.metrics && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                    Performance Metrics
                  </h3>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 sm:p-5 border border-purple-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {project.metrics.performanceScore}%
                        </div>
                        <div className="text-sm text-purple-700">
                          Performance Score
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-pink-600">
                          {project.teamSize}
                        </div>
                        <div className="text-sm text-pink-700">Team Size</div>
                      </div>
                    </div>
                    {project.metrics.impact && (
                      <div className="mt-3 text-center">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Impact:</span>{' '}
                          {project.metrics.impact}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Scroll Indicator */}
              <div className="text-center py-4 text-gray-400 text-xs">
                <div className="flex items-center justify-center gap-2">
                  <span>Scroll for more details</span>
                  <svg
                    className="w-4 h-4 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="p-4 sm:p-6 bg-gray-50 border-t flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {project.demoUrl && (
              <button
                onClick={() => handleLinkClick(project.demoUrl!)}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </button>
            )}
            {project.githubUrl && (
              <button
                onClick={() => handleLinkClick(project.githubUrl!)}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base font-medium"
              >
                <Github className="w-4 h-4" />
                View Code
              </button>
            )}
          </div>
        </div>

        {/* Scroll to Top Button - Floating */}
        <button
          onClick={() => {
            const content = document.querySelector('.overflow-y-auto');
            if (content) {
              content.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="absolute bottom-20 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-10"
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
