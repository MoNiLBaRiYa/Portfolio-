'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { staggerContainer, staggerItem } from '@/utils/animations';
import { useResponsive } from '@/hooks/useResponsive';
import { Zap, Code, TrendingUp, Rocket } from 'lucide-react';

export function ServicesSection() {
  const { isMobile, isTablet } = useResponsive();

  const services = [
    {
      title: 'Fast delivery via AI-assisted workflows',
      description: 'Utilizing rapid prototyping and intelligent code generation to drastically shorten development cycles without compromising quality.',
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      color: 'bg-yellow-50 border-yellow-100',
    },
    {
      title: 'Clean, scalable code',
      description: 'Building robust, modern architectures that grow with your business and are easy to maintain long-term.',
      icon: <Code className="w-6 h-6 text-blue-500" />,
      color: 'bg-blue-50 border-blue-100',
    },
    {
      title: 'Business-focused solutions',
      description: 'Translating complex technical requirements into practical products that directly solve real-world problems.',
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      color: 'bg-green-50 border-green-100',
    },
    {
      title: 'Rapid MVP development',
      description: 'Launch ideas faster with a lean, feature-rich MVP designed to test the market and gather user feedback instantly.',
      icon: <Rocket className="w-6 h-6 text-purple-500" />,
      color: 'bg-purple-50 border-purple-100',
    }
  ];

  return (
    <section
      id="services"
      className={`bg-white ${
        isMobile ? 'py-12' : isTablet ? 'py-16' : 'py-20'
      }`}
    >
      <div className="container-responsive">
        <AnimatedSection variants={staggerContainer}>
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
              Why Choose Me
            </h2>
            <p
              className={`text-gray-600 max-w-2xl mx-auto ${
                isMobile ? 'text-base px-2' : isTablet ? 'text-base' : 'text-lg'
              }`}
            >
              I bring a unique blend of engineering rigor and modern AI-assisted speed to deliver products that matter.
            </p>
          </motion.div>

          <div
            className={`grid max-w-6xl mx-auto gap-6 ${
              isMobile
                ? 'grid-cols-1'
                : isTablet
                  ? 'grid-cols-2'
                  : 'grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`p-6 rounded-2xl border ${service.color} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col`}
              >
                <div className="mb-4 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
