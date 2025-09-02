'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/portfolio';
import { ProjectStructuredData } from '@/components/seo/ProjectStructuredData';
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  Users,
  Target,
  Lightbulb,
  CheckCircle,
  Code,
  Play,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'demo'>(
    'overview'
  );
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Handle escape key press
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

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setActiveTab('overview');
      setCopiedSnippet(null);
    }
  }, [isOpen]);

  if (!project) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (!project?.images) return;

    if (direction === 'prev') {
      setCurrentImageIndex(prev =>
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex(prev =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const copyCodeToClipboard = async (code: string, snippetId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedSnippet(snippetId);
      setTimeout(() => setCopiedSnippet(null), 2000);
    } catch {
      // Silently fail if clipboard API is not available
    }
  };

  return (
    <>
      <ProjectStructuredData projectId={project.id} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] mx-4 overflow-hidden"
            >
              {/* Header */}
              <div className="relative">
                {/* Enhanced Image Gallery */}
                <div className="relative h-48 sm:h-64 md:h-80 bg-gradient-to-br from-blue-50 to-indigo-100">
                  {project.images && project.images.length > 0 ? (
                    <>
                      <img
                        src={project.images[currentImageIndex]}
                        alt={`${project.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />

                      {/* Image Navigation */}
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={() => handleImageNavigation('prev')}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleImageNavigation('next')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>

                          {/* Image Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {project.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                  index === currentImageIndex
                                    ? 'bg-white'
                                    : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-8xl text-blue-200">
                        {project.category === 'AI/ML'
                          ? '🤖'
                          : project.category === 'Web Development'
                            ? '🌐'
                            : project.category === 'Data Visualization'
                              ? '📊'
                              : '💻'}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 z-10 touch-target"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </button>

                {/* Project Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="flex items-center gap-3 mb-2">
                    {project.featured && (
                      <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                        ⭐ Featured
                      </span>
                    )}
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 line-clamp-2">
                    {project.title}
                  </h2>
                  <p className="text-white/90 text-xs sm:text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Enhanced Tab Navigation */}
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap touch-target ${
                      activeTab === 'overview'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                    Overview
                  </button>
                  {project.codeSnippets && project.codeSnippets.length > 0 && (
                    <button
                      onClick={() => setActiveTab('code')}
                      className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap touch-target ${
                        activeTab === 'code'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Code className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">
                        Code ({project.codeSnippets.length})
                      </span>
                      <span className="sm:hidden">Code</span>
                    </button>
                  )}
                  {project.liveDemo && (
                    <button
                      onClick={() => setActiveTab('demo')}
                      className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap touch-target ${
                        activeTab === 'demo'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Play className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Live Demo</span>
                      <span className="sm:hidden">Demo</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Enhanced Content with Tabs */}
              <div className="overflow-y-auto max-h-[calc(90vh-16rem)] sm:max-h-[calc(90vh-20rem)]">
                <div className="p-4 sm:p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-8">
                      {/* Project Meta and Actions */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Completed{' '}
                              {new Date(
                                project.completionDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>
                              {project.teamSize === 1
                                ? 'Solo Project'
                                : `Team of ${project.teamSize}`}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {project.demoUrl && (
                            <button
                              onClick={() => handleLinkClick(project.demoUrl!)}
                              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm touch-target"
                            >
                              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">
                                Live Demo
                              </span>
                              <span className="sm:hidden">Demo</span>
                            </button>
                          )}
                          {project.githubUrl && (
                            <button
                              onClick={() =>
                                handleLinkClick(project.githubUrl!)
                              }
                              className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm touch-target"
                            >
                              <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">
                                View Code
                              </span>
                              <span className="sm:hidden">Code</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Technologies Used
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {project.technologies.map(tech => (
                            <div
                              key={tech.name}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                                tech.category === 'Frontend'
                                  ? 'bg-blue-50 border-blue-200 text-blue-800'
                                  : tech.category === 'Backend'
                                    ? 'bg-green-50 border-green-200 text-green-800'
                                    : tech.category === 'AI/ML'
                                      ? 'bg-purple-50 border-purple-200 text-purple-800'
                                      : tech.category === 'Database'
                                        ? 'bg-orange-50 border-orange-200 text-orange-800'
                                        : 'bg-gray-50 border-gray-200 text-gray-800'
                              }`}
                            >
                              {tech.icon && (
                                <img
                                  src={tech.icon}
                                  alt={`${tech.name} - Technology used in ${project.title} project`}
                                  width={16}
                                  height={16}
                                  className="object-contain"
                                  loading="lazy"
                                />
                              )}
                              <span className="font-medium">{tech.name}</span>
                              <span className="text-xs opacity-75">
                                ({tech.category})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Long Description */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Project Overview
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {project.longDescription}
                        </p>
                      </div>

                      {/* Key Features */}
                      {project.features && project.features.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            Key Features
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.features.map((feature, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4 bg-gray-50 rounded-lg"
                              >
                                <h4 className="font-semibold text-gray-900 mb-2">
                                  {feature.title}
                                </h4>
                                <p className="text-gray-600 text-sm">
                                  {feature.description}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Challenges and Solutions */}
                      {project.challenges && project.challenges.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-orange-600" />
                            Challenges & Solutions
                          </h3>
                          <div className="space-y-4">
                            {project.challenges.map((challenge, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="border border-gray-200 rounded-lg p-4"
                              >
                                <div className="flex items-start gap-3">
                                  <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                      {challenge.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm mb-3">
                                      {challenge.description}
                                    </p>
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                      <p className="text-green-800 text-sm">
                                        <strong>Solution:</strong>{' '}
                                        {challenge.solution}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Project Metrics */}
                      {project.metrics && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Project Impact
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.metrics.performanceScore && (
                              <div className="p-4 bg-blue-50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-blue-800 font-medium">
                                    Performance Score
                                  </span>
                                  <span className="text-blue-900 font-bold">
                                    {project.metrics.performanceScore}%
                                  </span>
                                </div>
                                <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${project.metrics.performanceScore}%`,
                                    }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-blue-600 rounded-full"
                                  />
                                </div>
                              </div>
                            )}

                            {project.metrics.codeQuality && (
                              <div className="p-4 bg-green-50 rounded-lg">
                                <span className="text-green-800 font-medium">
                                  Code Quality
                                </span>
                                <p className="text-green-700 text-sm mt-1">
                                  {project.metrics.codeQuality}
                                </p>
                              </div>
                            )}

                            {project.metrics.userEngagement && (
                              <div className="p-4 bg-purple-50 rounded-lg">
                                <span className="text-purple-800 font-medium">
                                  User Engagement
                                </span>
                                <p className="text-purple-700 text-sm mt-1">
                                  {project.metrics.userEngagement}
                                </p>
                              </div>
                            )}

                            {project.metrics.impact && (
                              <div className="p-4 bg-orange-50 rounded-lg">
                                <span className="text-orange-800 font-medium">
                                  Impact
                                </span>
                                <p className="text-orange-700 text-sm mt-1">
                                  {project.metrics.impact}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Code Snippets Tab */}
                  {activeTab === 'code' && project.codeSnippets && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Code Implementation
                        </h3>
                        <p className="text-gray-600">
                          Explore the key code snippets that power this project
                        </p>
                      </div>

                      {project.codeSnippets.map((snippet, index) => (
                        <motion.div
                          key={snippet.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {snippet.title}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  {snippet.description}
                                </p>
                                {snippet.filename && (
                                  <p className="text-xs text-blue-600 mt-1 font-mono">
                                    {snippet.filename}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() =>
                                  copyCodeToClipboard(snippet.code, snippet.id)
                                }
                                className="flex items-center gap-2 px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                              >
                                {copiedSnippet === snippet.id ? (
                                  <>
                                    <Check className="w-4 h-4 text-green-600" />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-4 h-4" />
                                    Copy
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="relative">
                            <SyntaxHighlighter
                              language={snippet.language}
                              style={oneDark}
                              customStyle={{
                                margin: 0,
                                borderRadius: 0,
                                fontSize: '14px',
                                lineHeight: '1.5',
                              }}
                              showLineNumbers
                              wrapLines
                            >
                              {snippet.code}
                            </SyntaxHighlighter>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Live Demo Tab */}
                  {activeTab === 'demo' && project.liveDemo && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Live Demo
                        </h3>
                        <p className="text-gray-600">
                          {project.liveDemo.description}
                        </p>
                      </div>

                      {project.liveDemo.type === 'iframe' &&
                      project.liveDemo.url ? (
                        <div className="relative">
                          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-inner">
                            <div className="bg-gray-200 px-4 py-2 flex items-center gap-2">
                              <div className="flex gap-1">
                                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                              </div>
                              <div className="flex-1 text-center">
                                <span className="text-sm text-gray-600 font-mono">
                                  {project.liveDemo.url}
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  handleLinkClick(project.liveDemo!.url!)
                                }
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                Open in new tab
                              </button>
                            </div>
                            <iframe
                              src={project.liveDemo.url}
                              className="w-full h-96 border-0"
                              title={`${project.title} Live Demo`}
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ) : project.liveDemo.type === 'interactive' ? (
                        <div>
                          {project.liveDemo.component === 'FakeNewsDemo' ? (
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 border-b border-gray-200">
                                <div className="flex items-center gap-2 text-white">
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                  <span className="text-sm font-medium">
                                    Live Interactive Demo - AI Fake News
                                    Detection System
                                  </span>
                                </div>
                              </div>
                              <div className="bg-gray-50 p-6">
                                <div className="bg-white rounded-lg p-6 shadow-sm">
                                  <div className="text-center mb-6">
                                    <div className="text-5xl mb-3">🤖</div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                                      AI-Powered Fake News Detection
                                    </h4>
                                    <p className="text-gray-600">
                                      Experience our machine learning model that
                                      analyzes news articles for potential
                                      misinformation using advanced NLP
                                      techniques.
                                    </p>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                      <div className="text-2xl mb-2">📊</div>
                                      <h5 className="font-semibold text-blue-900">
                                        Real-time Analysis
                                      </h5>
                                      <p className="text-sm text-blue-700">
                                        Instant processing with confidence
                                        scoring
                                      </p>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                      <div className="text-2xl mb-2">🧠</div>
                                      <h5 className="font-semibold text-green-900">
                                        NLP Techniques
                                      </h5>
                                      <p className="text-sm text-green-700">
                                        Advanced language pattern recognition
                                      </p>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                      <div className="text-2xl mb-2">⚡</div>
                                      <h5 className="font-semibold text-purple-900">
                                        Fast Processing
                                      </h5>
                                      <p className="text-sm text-purple-700">
                                        Results in under 3 seconds
                                      </p>
                                    </div>
                                  </div>

                                  {project.demoUrl && (
                                    <div className="text-center">
                                      <button
                                        onClick={() =>
                                          handleLinkClick(project.demoUrl!)
                                        }
                                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                      >
                                        <Play className="w-5 h-5" />
                                        Launch Interactive Demo
                                      </button>
                                      <p className="text-xs text-gray-500 mt-2">
                                        Opens in a new window with full
                                        functionality
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 text-center">
                              <div className="text-6xl mb-4">🚀</div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                Interactive Demo Available
                              </h4>
                              <p className="text-gray-600 mb-4">
                                This project features an interactive demo
                                component that showcases its key functionality.
                              </p>
                              {project.demoUrl && (
                                <button
                                  onClick={() =>
                                    handleLinkClick(project.demoUrl!)
                                  }
                                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                  <Play className="w-4 h-4" />
                                  Try Live Demo
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProjectModal;
