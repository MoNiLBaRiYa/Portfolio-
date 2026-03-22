'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { staggerContainer, staggerItem } from '@/utils/animations';
import { useResponsive } from '@/hooks/useResponsive';
import { Rocket, Bot, BarChart, Code, Search } from 'lucide-react';

export function OfferingsSection() {
  const { isMobile, isTablet } = useResponsive();

  const offerings = [
    {
      title: 'MVP Development',
      description: 'I turn your ideas into functional products quickly using modern technologies and AI-assisted workflows.',
      icon: <Rocket className="w-8 h-8 text-indigo-500" />,
      color: 'bg-indigo-50 border-indigo-100',
      iconBg: 'bg-indigo-100',
    },
    {
      title: 'AI Integration & Automation',
      description: 'I integrate intelligent features like chatbots, recommendation systems, and automation into web applications.',
      icon: <Bot className="w-8 h-8 text-purple-500" />,
      color: 'bg-purple-50 border-purple-100',
      iconBg: 'bg-purple-100',
    },
    {
      title: 'Data Visualization & Dashboards',
      description: 'I create interactive dashboards using Power BI and Tableau to help businesses make data-driven decisions.',
      icon: <BarChart className="w-8 h-8 text-emerald-500" />,
      color: 'bg-emerald-50 border-emerald-100',
      iconBg: 'bg-emerald-100',
    },
    {
      title: 'Full-Stack Web Development',
      description: 'I build scalable, responsive web applications tailored to your business needs using modern tech stacks.',
      icon: <Code className="w-8 h-8 text-blue-500" />,
      color: 'bg-blue-50 border-blue-100',
      iconBg: 'bg-blue-100',
    },
    {
      title: 'SEO-Optimized Web Development',
      description: 'I develop web applications with strong technical SEO foundations to improve performance and search visibility.',
      icon: <Search className="w-8 h-8 text-orange-500" />,
      color: 'bg-orange-50 border-orange-100',
      iconBg: 'bg-orange-100',
    }
  ];

  return (
    <section
      id="offerings"
      className={`bg-gray-50/50 ${
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
              Services I Offer
            </h2>
            <p
              className={`text-gray-600 max-w-2xl mx-auto ${
                isMobile ? 'text-base px-2' : isTablet ? 'text-base' : 'text-lg'
              }`}
            >
              Comprehensive technical solutions designed to accelerate your growth and bring your ideas to life.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {offerings.map((offering, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`p-8 rounded-2xl border ${offering.color} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]`}
              >
                <div className={`mb-6 ${offering.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm`}>
                  {offering.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {offering.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed flex-grow">
                  {offering.description}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
