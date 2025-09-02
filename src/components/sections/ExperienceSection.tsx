'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Experience, Certification } from '@/types/portfolio';
import { CertificationModal } from '@/components/ui/CertificationModal';

interface ExperienceSectionProps {
  experiences: Experience[];
  certifications: Certification[];
}

export function ExperienceSection({
  experiences,
  certifications,
}: ExperienceSectionProps) {
  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);

  // Combine experiences and certifications into timeline items
  const timelineItems = [
    ...(experiences || []).map(exp => ({
      ...exp,
      itemType: 'experience' as const,
      date: exp.endDate || exp.startDate,
    })),
    ...(certifications || []).map(cert => ({
      ...cert,
      itemType: 'certification' as const,
      date: cert.date,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My experience through simulations, certifications, and continuous
            learning
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Timeline Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

            {timelineItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                transition={{ duration: 0.6 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-10 shadow-lg"></div>

                {/* Content Card */}
                <div
                  className={`ml-12 md:ml-0 md:w-5/12 ${
                    index % 2 === 0
                      ? 'md:mr-auto md:pr-8'
                      : 'md:ml-auto md:pl-8'
                  }`}
                >
                  {item.itemType === 'experience' ? (
                    <ExperienceCard
                      experience={
                        item as Experience & {
                          itemType: 'experience';
                          date: string;
                        }
                      }
                    />
                  ) : (
                    <CertificationCard
                      certification={
                        item as Certification & { itemType: 'certification' }
                      }
                      onClick={() =>
                        setSelectedCertification(item as Certification)
                      }
                    />
                  )}
                </div>

                {/* Date Badge */}
                <div
                  className={`hidden md:block absolute top-0 ${
                    index % 2 === 0 ? 'right-0' : 'left-0'
                  } transform ${
                    index % 2 === 0 ? 'translate-x-full' : '-translate-x-full'
                  } bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}
                >
                  {formatDate(item.date)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Certification Modal */}
      {selectedCertification && (
        <CertificationModal
          certification={selectedCertification}
          onClose={() => setSelectedCertification(null)}
        />
      )}
    </section>
  );
}

interface ExperienceCardProps {
  experience: Experience;
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {experience.title}
          </h3>
          <p className="text-blue-600 font-semibold mb-2">
            {experience.company}
          </p>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {experience.type}
            </span>
            <span className="text-gray-500 text-sm">
              {new Date(experience.startDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
              })}{' '}
              -{' '}
              {experience.endDate
                ? new Date(experience.endDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                  })
                : 'Present'}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">
        {experience.description}
      </p>

      {/* Key Achievements */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
        <ul className="space-y-2">
          {(experience.achievements || []).map((achievement, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-600 text-sm leading-relaxed">
                {achievement}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {(experience.technologies || []).map((tech, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

interface CertificationCardProps {
  certification: Certification;
  onClick: () => void;
}

function CertificationCard({ certification, onClick }: CertificationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
              Certification
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
            {certification.title}
          </h3>
          <p className="text-purple-600 font-semibold mb-2">
            {certification.issuer}
          </p>
          <p className="text-gray-500 text-sm mb-3">
            {new Date(certification.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </p>
        </div>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">
        {certification.description}
      </p>

      {/* Skills */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">Skills Gained:</h4>
        <div className="flex flex-wrap gap-2">
          {(certification.skills || []).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Click to view more indicator */}
      <div className="flex items-center justify-between">
        <span className="text-purple-600 text-sm font-medium group-hover:text-purple-700 transition-colors">
          Click to view details
        </span>
        <svg
          className="w-5 h-5 text-purple-500 group-hover:text-purple-600 group-hover:translate-x-1 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </motion.div>
  );
}
