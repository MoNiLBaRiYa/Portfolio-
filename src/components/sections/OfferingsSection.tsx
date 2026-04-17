'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { staggerContainer, staggerItem } from '@/utils/animations';
import { useResponsive } from '@/hooks/useResponsive';
import { Rocket, Bot, BarChart, Code, Search, LucideIcon } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Bot,
  BarChart,
  Code,
  Search,
};

export function OfferingsSection() {
  const { isMobile, isTablet } = useResponsive();
  const { offerings } = portfolioData;

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
              What I Work On
            </h2>
            <p
              className={`text-gray-600 max-w-2xl mx-auto ${
                isMobile ? 'text-base px-2' : isTablet ? 'text-base' : 'text-lg'
              }`}
            >
              End-to-end capabilities across the full product lifecycle — from
              idea to deployment to ongoing growth.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {offerings.map((offering, index) => {
              const IconComponent = iconMap[offering.icon] || Code;
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`p-8 rounded-2xl border ${offering.color} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]`}
                >
                  <div
                    className={`mb-6 ${offering.iconBg} ${offering.iconColor || 'text-indigo-600'} w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm`}
                  >
                    <IconComponent className="w-8 h-8 text-current" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {offering.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed flex-grow">
                    {offering.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
