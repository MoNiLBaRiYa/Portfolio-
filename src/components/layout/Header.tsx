'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { fadeInDown, staggerContainer, staggerItem } from '@/utils/animations';
import { useResponsive } from '@/hooks/useResponsive';

const navigationItems = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'data-visualization', label: 'Analytics', href: '#data-visualization' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isMobile, isTablet, isTouchDevice } = useResponsive();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    setIsMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isMenuOpen &&
        !target.closest('.mobile-menu') &&
        !target.closest('.hamburger-button')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20'
          : 'bg-transparent'
      } ${isMobile ? 'mobile-safe-area' : ''}`}
      variants={fadeInDown}
      initial="hidden"
      animate="visible"
    >
      <nav className="container-responsive">
        <div
          className={`flex items-center justify-between ${
            isMobile ? 'h-14' : isTablet ? 'h-16' : 'h-20'
          }`}
        >
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('#home')}
              className={`font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200 ${
                isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl'
              } ${isTouchDevice ? 'touch-target' : ''}`}
            >
              {isMobile ? 'MB' : portfolioData.personal.name}
            </button>
          </div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden lg:block"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div
              className={`ml-10 flex items-baseline ${
                isTablet ? 'space-x-4' : 'space-x-6 xl:space-x-8'
              }`}
            >
              {navigationItems.map(item => (
                <motion.button
                  key={item.id}
                  variants={staggerItem}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-2 font-medium transition-all duration-200 hover:text-blue-600 relative ${
                    isTablet ? 'text-xs' : 'text-sm'
                  } ${
                    activeSection === item.id
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-gray-900'
                  } ${isTouchDevice ? 'touch-target' : ''}`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      layoutId="activeIndicator"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hamburger-button touch-target rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                  }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 top-3 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className="mobile-menu-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                className="mobile-menu lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-200/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <motion.div
                  className="container-responsive py-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {navigationItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        variants={staggerItem}
                        custom={index}
                        onClick={() => scrollToSection(item.href)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full text-center px-3 py-3 text-sm font-medium transition-all duration-200 rounded-lg ${
                          activeSection === item.id
                            ? 'text-blue-600 bg-blue-50 shadow-sm'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        } ${isTouchDevice ? 'touch-target' : ''}`}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
