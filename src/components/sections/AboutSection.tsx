'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import type { Hobby } from '@/types/portfolio';
import { useResponsive } from '@/hooks/useResponsive';
import { useAccessibility } from '@/components/ui/AccessibilityProvider';

interface HobbyCardProps {
  hobby: Hobby;
  index: number;
}

// Helper function to get emoji based on hobby name
const getHobbyEmoji = (hobbyName: string): string => {
  const name = hobbyName.toLowerCase();
  if (name.includes('drawing') || name.includes('sketch')) return '🎨';
  if (name.includes('gaming') || name.includes('game')) return '🎮';
  if (
    name.includes('reading') ||
    name.includes('literature') ||
    name.includes('spiritual')
  )
    return '📚';
  return '🎯'; // default fallback
};

const HobbyCard: React.FC<HobbyCardProps> = ({ hobby, index }) => {
  const { isMobile, isTouchDevice } = useResponsive();

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={!isTouchDevice ? { scale: 1.05 } : {}}
      whileTap={{ scale: 0.98 }}
      role="article"
      aria-labelledby={`hobby-${index}-title`}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Hobby Icon */}
        <div
          className={`relative overflow-hidden ${isMobile ? 'h-40' : 'h-48'} bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
          <motion.div
            className="z-20 relative"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.5,
            }}
          >
            <span
              className={`${isMobile ? 'text-6xl' : 'text-7xl'}`}
              role="img"
              aria-label={`${hobby.name} hobby icon`}
            >
              {getHobbyEmoji(hobby.name)}
            </span>
          </motion.div>
          <div className="absolute bottom-4 left-4 z-20">
            <h3
              id={`hobby-${index}-title`}
              className="text-gray-800 font-bold text-lg drop-shadow-sm"
            >
              {hobby.name}
            </h3>
          </div>
        </div>

        {/* Hobby Content */}
        <div className={isMobile ? 'p-4' : 'p-6'}>
          <p
            className={`text-gray-600 leading-relaxed ${
              isMobile ? 'text-sm mb-3' : 'mb-4'
            }`}
          >
            {hobby.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const AboutSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();
  const { isMobile, isTablet } = useResponsive();
  const { accessibility } = useAccessibility();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="about"
      className={`bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden ${
        isMobile ? 'py-12' : isTablet ? 'py-16' : 'py-20'
      }`}
      ref={ref}
      aria-labelledby="about-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.blue.500)_1px,_transparent_0)] bg-[size:20px_20px]" />
      </div>

      <div className="container-responsive relative z-10">
        <motion.div
          className={`text-center ${isMobile ? 'mb-10' : isTablet ? 'mb-12' : 'mb-16'}`}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2
            id="about-heading"
            className={`font-bold text-gray-900 mb-6 ${
              isMobile
                ? 'text-3xl'
                : isTablet
                  ? 'text-4xl'
                  : 'text-4xl md:text-5xl'
            }`}
            variants={itemVariants}
          >
            About{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Me
            </span>
          </motion.h2>
          <motion.p
            className={`text-gray-600 max-w-3xl mx-auto leading-relaxed ${
              isMobile ? 'text-base px-2' : isTablet ? 'text-lg' : 'text-xl'
            }`}
            variants={itemVariants}
          >
            Discover the person behind the code - my journey, passions, and the
            unique perspective I bring to every project.
          </motion.p>
        </motion.div>

        {/* Personal Introduction */}
        <motion.div
          className={`max-w-4xl mx-auto ${isMobile ? 'mb-12' : isTablet ? 'mb-16' : 'mb-20'}`}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div
            className={`grid items-center ${
              isMobile
                ? 'grid-cols-1 gap-8'
                : 'grid-cols-1 lg:grid-cols-3 gap-12'
            }`}
          >
            {/* Profile Icon */}
            <motion.div
              className="lg:col-span-1 flex justify-center"
              variants={itemVariants}
            >
              <div className="relative">
                {/* Main Icon Container */}
                <motion.div
                  className={`rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-2xl border-4 border-white flex items-center justify-center ${
                    isMobile
                      ? 'w-48 h-48'
                      : isTablet
                        ? 'w-56 h-56'
                        : 'w-64 h-64'
                  }`}
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <span
                    className={`${isMobile ? 'text-6xl' : isTablet ? 'text-7xl' : 'text-8xl'}`}
                    role="img"
                    aria-label="Person icon representing About Me section"
                  >
                    👤
                  </span>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  aria-hidden="true"
                >
                  ⚡
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-6 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg shadow-lg"
                  animate={{
                    y: [0, 8, 0],
                    x: [0, 4, 0],
                    rotate: [0, -8, 8, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                  aria-hidden="true"
                >
                  🎯
                </motion.div>
                <motion.div
                  className="absolute top-1/2 -right-8 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm shadow-lg"
                  animate={{
                    y: [0, -6, 0],
                    x: [0, 3, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                  aria-hidden="true"
                >
                  💡
                </motion.div>
              </div>
            </motion.div>

            {/* Personal Info */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <div
                className={`bg-white rounded-2xl shadow-xl border border-gray-100 ${
                  isMobile ? 'p-6' : 'p-8'
                }`}
              >
                <h3
                  className={`font-bold text-gray-900 mb-4 ${
                    isMobile ? 'text-xl' : 'text-2xl'
                  }`}
                >
                  {portfolioData.personal.name}
                </h3>
                <p
                  className={`text-blue-600 font-semibold mb-6 ${
                    isMobile ? 'text-base' : 'text-lg'
                  }`}
                >
                  {portfolioData.personal.title}
                </p>
                <p
                  className={`text-gray-700 leading-relaxed mb-6 ${
                    isMobile ? 'text-base' : 'text-lg'
                  }`}
                >
                  {portfolioData.personal.summary}
                </p>

                {/* Quick Stats */}
                <div
                  className={`grid grid-cols-2 ${isMobile ? 'gap-3' : 'gap-4'}`}
                  role="group"
                  aria-label="Portfolio statistics"
                >
                  <div
                    className={`text-center bg-blue-50 rounded-lg ${
                      isMobile ? 'p-3' : 'p-4'
                    }`}
                  >
                    <div
                      className={`font-bold text-blue-600 ${
                        isMobile ? 'text-xl' : 'text-2xl'
                      }`}
                      aria-label={`${portfolioData.projects.length} projects completed`}
                    >
                      {portfolioData.projects.length}
                    </div>
                    <div
                      className={`text-gray-600 ${
                        isMobile ? 'text-xs' : 'text-sm'
                      }`}
                    >
                      Projects Built
                    </div>
                  </div>
                  <div
                    className={`text-center bg-purple-50 rounded-lg ${
                      isMobile ? 'p-3' : 'p-4'
                    }`}
                  >
                    <div
                      className={`font-bold text-purple-600 ${
                        isMobile ? 'text-xl' : 'text-2xl'
                      }`}
                      aria-label={`${portfolioData.certifications.length + portfolioData.experience.length} certifications earned`}
                    >
                      {portfolioData.certifications.length +
                        portfolioData.experience.length}
                    </div>
                    <div
                      className={`text-gray-600 ${
                        isMobile ? 'text-xs' : 'text-sm'
                      }`}
                    >
                      Certifications
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Hobbies & Interests Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className={`text-center ${isMobile ? 'mb-8' : 'mb-12'}`}
            variants={itemVariants}
          >
            <h3
              className={`font-bold text-gray-900 mb-4 ${
                isMobile ? 'text-2xl' : 'text-3xl'
              }`}
            >
              Beyond the{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Code
              </span>
            </h3>
            <p
              className={`text-gray-600 max-w-2xl mx-auto ${
                isMobile ? 'text-base px-2' : 'text-lg'
              }`}
            >
              My hobbies and interests that shape my creative thinking and
              problem-solving approach in professional projects.
            </p>
          </motion.div>

          {/* Hobbies Grid */}
          <div
            className={`grid max-w-5xl mx-auto ${
              isMobile
                ? 'grid-cols-1 gap-6'
                : isTablet
                  ? 'grid-cols-2 gap-6'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            }`}
            role="list"
            aria-label="Personal hobbies and interests"
          >
            {portfolioData.hobbies.map((hobby, index) => (
              <HobbyCard key={hobby.name} hobby={hobby} index={index} />
            ))}
          </div>

          {/* Skills Connection Explanation */}
          <motion.div
            className={`text-center ${isMobile ? 'mt-10' : 'mt-16'}`}
            variants={itemVariants}
            initial="hidden"
            animate={controls}
          >
            <div
              className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100 ${
                isMobile ? 'p-6' : 'p-8'
              }`}
            >
              <h4
                className={`font-bold text-gray-900 mb-4 ${
                  isMobile ? 'text-lg' : 'text-xl'
                }`}
              >
                How My Interests Enhance My Professional Skills
              </h4>
              <p
                className={`text-gray-700 leading-relaxed max-w-3xl mx-auto ${
                  isMobile ? 'text-sm' : 'text-base'
                }`}
              >
                Each of my hobbies contributes unique perspectives to my
                professional work. Drawing and sketching enhance my visual
                design sensibilities and attention to detail, gaming develops
                strategic thinking and problem-solving abilities, and reading
                spiritual and philosophical literature strengthens my critical
                thinking and continuous learning mindset.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
