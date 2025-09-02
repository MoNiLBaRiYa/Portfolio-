'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import type { Education } from '@/types/portfolio';

interface EducationCardProps {
  education: Education;
  index: number;
}

interface AnimatedProgressBarProps {
  value: number;
  maxValue: number;
  label: string;
  color: string;
  delay?: number;
}

interface EducationSectionProps {
  education: Education[];
  className?: string;
}

const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  value,
  maxValue,
  label,
  color,
  delay = 0,
}) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">
          {value}/{maxValue}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 1.5,
            delay: delay,
            ease: 'easeOut',
          }}
        />
      </div>
    </div>
  );
};

const EducationCard: React.FC<EducationCardProps> = ({ education, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Header with Institution */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              {education.degree}
            </h3>
            <p className="text-blue-100 text-lg font-medium">
              {education.institution}
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-blue-100 text-sm">Duration</div>
            <div className="font-semibold">
              {new Date(education.startDate).getFullYear()} -{' '}
              {education.endDate
                ? new Date(education.endDate).getFullYear()
                : 'Present'}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Academic Performance Section */}
        {education.cgpa && (
          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-4">
              Academic Performance
            </h4>
            <div className="bg-gray-50 rounded-xl p-6">
              {education.degree.includes('B.Tech') ? (
                // University - Show CGPA
                <>
                  <AnimatedProgressBar
                    value={education.cgpa}
                    maxValue={10}
                    label="CGPA"
                    color="bg-gradient-to-r from-green-500 to-emerald-500"
                    delay={0.5}
                  />
                  <div className="text-center mt-4">
                    <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
                      <span className="text-green-800 font-semibold">
                        {education.cgpa}/10.0 CGPA
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                // 12th and 10th Grade - Show Percentage
                <>
                  <AnimatedProgressBar
                    value={education.cgpa * 10}
                    maxValue={100}
                    label="Percentage"
                    color="bg-gradient-to-r from-green-500 to-emerald-500"
                    delay={0.5}
                  />
                  <div className="text-center mt-4">
                    <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
                      <span className="text-green-800 font-semibold">
                        {(education.cgpa * 10).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Relevant Coursework */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-gray-900 mb-4">
            Relevant Coursework
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {education.relevantCoursework.map((course, courseIndex) => (
              <motion.div
                key={course}
                className="bg-blue-50 rounded-lg p-3 border border-blue-100"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{
                  duration: 0.4,
                  delay: 0.8 + courseIndex * 0.1,
                }}
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                  <span className="text-gray-800 font-medium text-sm">
                    {course}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-4">
            Key Achievements
          </h4>
          <div className="space-y-3">
            {education.achievements.map((achievement, achievementIndex) => (
              <motion.div
                key={achievement}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{
                  duration: 0.5,
                  delay: 1.2 + achievementIndex * 0.1,
                }}
              >
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white text-xs font-bold">★</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  className,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

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
      id="education"
      className={`py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden ${className}`}
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.purple.500)_1px,_transparent_0)] bg-[size:25px_25px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Academic{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Journey
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            My educational foundation in Computer Science Engineering, building
            the theoretical knowledge and practical skills that drive my passion
            for technology and innovation.
          </motion.p>
        </motion.div>

        {/* Education Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {education.map((education, index) => (
              <EducationCard
                key={education.id}
                education={education}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Academic Stats Summary */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Academic Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* CGPA Highlight */}
              <div className="text-center">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={
                    isInView
                      ? { scale: 1, rotate: 0 }
                      : { scale: 0, rotate: -180 }
                  }
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <span className="text-white font-bold text-xl">
                    {education[0]?.cgpa || 0}
                  </span>
                </motion.div>
                <h4 className="font-bold text-gray-900 mb-2">CGPA</h4>
                <p className="text-gray-600 text-sm">
                  Current university performance
                </p>
              </div>

              {/* Coursework Count */}
              <div className="text-center">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={
                    isInView
                      ? { scale: 1, rotate: 0 }
                      : { scale: 0, rotate: 180 }
                  }
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <span className="text-white font-bold text-xl">
                    {education[0]?.relevantCoursework.length}+
                  </span>
                </motion.div>
                <h4 className="font-bold text-gray-900 mb-2">Core Subjects</h4>
                <p className="text-gray-600 text-sm">
                  Comprehensive curriculum coverage
                </p>
              </div>

              {/* Achievements Count */}
              <div className="text-center">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={
                    isInView
                      ? { scale: 1, rotate: 0 }
                      : { scale: 0, rotate: -180 }
                  }
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <span className="text-white font-bold text-xl">
                    {education[0]?.achievements.length}+
                  </span>
                </motion.div>
                <h4 className="font-bold text-gray-900 mb-2">Achievements</h4>
                <p className="text-gray-600 text-sm">
                  Recognition and honors earned
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
