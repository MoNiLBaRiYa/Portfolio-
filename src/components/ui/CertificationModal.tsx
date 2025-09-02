'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certification } from '@/types/portfolio';

interface CertificationModalProps {
  certification: Certification;
  onClose: () => void;
}

export function CertificationModal({
  certification,
  onClose,
}: CertificationModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] mx-4 overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 sm:p-6 rounded-t-2xl">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors touch-target"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex items-start gap-3 sm:gap-4 pr-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
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
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 line-clamp-2">
                  {certification.title}
                </h2>
                <p className="text-purple-100 font-semibold text-base sm:text-lg truncate">
                  {certification.issuer}
                </p>
                <p className="text-purple-200 text-xs sm:text-sm mt-1">
                  Earned on {formatDate(certification.date)}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                About This Certification
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {certification.description}
              </p>
            </div>

            {/* Skills Gained */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {certification.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-lg font-medium text-xs sm:text-sm border border-purple-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Key Achievements
              </h3>
              <ul className="space-y-3">
                {certification.achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600 leading-relaxed">
                      {achievement}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Credential Link */}
            {certification.credentialUrl && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Verify Credential
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Click the link below to verify this certification on the
                  issuer's official website.
                </p>
                <a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 text-sm touch-target"
                >
                  <span>View Credential</span>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            )}

            {/* Impact Statement */}
            <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Professional Impact
              </h3>
              <p className="text-gray-600 leading-relaxed">
                This certification has enhanced my expertise in{' '}
                {certification.skills.slice(0, 3).join(', ')}
                and contributed to my ability to deliver high-quality solutions
                in professional projects.
                {certification.achievements.length > 0 &&
                  ` The ${certification.achievements.length} key achievements demonstrate practical application of learned concepts.`}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-xs sm:text-sm text-gray-500 truncate">
                Certification ID: {certification.id}
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm touch-target self-end sm:self-auto"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
