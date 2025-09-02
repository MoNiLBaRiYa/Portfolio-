'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import { LazyParticleBackground, LazyTechBackground } from '@/components/lazy';
import ProgressiveLoader from '@/components/ui/ProgressiveLoader';
import { useResponsive, useViewportHeight } from '@/hooks/useResponsive';

const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const { isMobile, isTablet, isTouchDevice } = useResponsive();
  const viewportHeight = useViewportHeight();

  const fullText = `Hi, I'm ${portfolioData.personal.name}`;
  const subtitle = portfolioData.personal.title;
  const summary = portfolioData.personal.summary;

  // Key skills to highlight
  const keySkills = [
    'React & Next.js',
    'Machine Learning',
    'Data Visualization',
    'TypeScript',
    'Python',
  ];

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30); // Made even faster - 30ms for quicker typing
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex, fullText]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Reduced from 0.3 to 0.15
        delayChildren: 0.1, // Reduced from 0.2 to 0.1
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
    hover: {
      scale: 1.05,
    },
    tap: {
      scale: 0.95,
    },
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden"
      style={{
        minHeight:
          isMobile && viewportHeight > 0 ? `${viewportHeight}px` : '100vh',
        paddingTop: isMobile ? '60px' : isTablet ? '70px' : '80px',
      }}
    >
      {/* Layered Background Animations */}
      {/* Base Particle Background */}
      <ProgressiveLoader>
        <LazyParticleBackground />
      </ProgressiveLoader>

      {/* Tech Background Layer */}
      <ProgressiveLoader>
        <LazyTechBackground className="z-1" />
      </ProgressiveLoader>

      {/* Background decoration blobs */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        className="container-responsive text-center relative"
        style={{ zIndex: 10 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main heading with typewriter effect */}
        <motion.div className={isMobile ? 'mb-4' : 'mb-6'}>
          <h1
            className={`font-bold text-gray-900 mb-2 ${
              isMobile
                ? 'text-3xl'
                : isTablet
                  ? 'text-5xl'
                  : 'text-4xl md:text-6xl lg:text-7xl'
            }`}
          >
            <span className="inline-block">
              {displayedText}
              <motion.span
                className={`inline-block w-1 bg-blue-600 ml-1 ${
                  isMobile ? 'h-8' : isTablet ? 'h-12' : 'h-12 md:h-16 lg:h-20'
                }`}
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Subtitle with fade-in animation */}
        <motion.div
          variants={itemVariants}
          className={isMobile ? 'mb-6' : 'mb-8'}
        >
          <p
            className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 font-semibold ${
              isMobile
                ? 'text-lg'
                : isTablet
                  ? 'text-xl'
                  : 'text-xl md:text-2xl lg:text-3xl'
            }`}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Summary with staggered animation */}
        <motion.div
          variants={itemVariants}
          className={isMobile ? 'mb-8' : 'mb-12'}
        >
          <p
            className={`text-gray-600 max-w-3xl mx-auto leading-relaxed ${
              isMobile
                ? 'text-base px-2'
                : isTablet
                  ? 'text-lg'
                  : 'text-lg md:text-xl'
            }`}
          >
            {summary}
          </p>
        </motion.div>

        {/* Key skills highlight */}
        <motion.div
          variants={itemVariants}
          className={isMobile ? 'mb-8' : 'mb-12'}
        >
          <p
            className={`text-gray-500 mb-4 font-medium ${
              isMobile ? 'text-xs' : 'text-sm md:text-base'
            }`}
          >
            SPECIALIZED IN
          </p>
          <div
            className={`flex flex-wrap justify-center ${
              isMobile ? 'gap-2' : 'gap-3 md:gap-4'
            }`}
          >
            {keySkills.map((skill, index) => (
              <motion.span
                key={skill}
                variants={skillVariants}
                initial="hidden"
                animate={isTypingComplete ? 'visible' : 'hidden'}
                transition={{ delay: index * 0.05 }} // Reduced from 0.1 to 0.05
                className={`bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full font-medium text-gray-700 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 ${
                  isMobile
                    ? 'px-3 py-1 text-xs'
                    : 'px-4 py-2 text-sm md:text-base'
                } ${isTouchDevice ? 'touch-target' : ''}`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Call-to-action buttons */}
        <motion.div
          variants={itemVariants}
          className={`flex gap-4 justify-center items-center ${
            isMobile ? 'flex-col w-full px-4' : 'flex-col sm:flex-row'
          }`}
        >
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => scrollToSection('projects')}
            className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
              isMobile
                ? 'w-full py-3 px-6 text-base'
                : 'px-8 py-4 text-lg min-w-[200px]'
            } ${isTouchDevice ? 'touch-target' : ''}`}
          >
            View My Work
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => scrollToSection('contact')}
            className={`border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-lg font-semibold bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 ${
              isMobile
                ? 'w-full py-3 px-6 text-base'
                : 'px-8 py-4 text-lg min-w-[200px]'
            } ${isTouchDevice ? 'touch-target' : ''}`}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
