'use client';

import { motion } from 'framer-motion';
import { ContactForm } from '@/components/ui/ContactForm';
import { ContactFormData } from '@/types/portfolio';
import { portfolioData } from '@/data/portfolio';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { staggerContainer, staggerItem } from '@/utils/animations';
import { useResponsive } from '@/hooks/useResponsive';

export function ContactSection() {
  const { personal } = portfolioData;
  const { isMobile, isTablet, isTouchDevice } = useResponsive();

  // The ContactForm now handles EmailJS integration internally
  // This fallback function is only used if EmailJS is not configured
  const handleFormSubmit = async (formData: ContactFormData) => {
    // Fallback implementation for development/testing
    console.log('Fallback form submission:', formData);
    console.log('Form data received:', {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message.substring(0, 100) + '...',
    });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Always succeed in fallback mode for better demo experience
    return Promise.resolve();
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return 'text-green-600 bg-green-100';
      case 'Busy':
        return 'text-yellow-600 bg-yellow-100';
      case 'Not Available':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      description: 'Send me an email anytime',
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone}`,
      description: 'Call me during business hours',
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      label: 'Location',
      value: personal.location,
      description: 'Based in India',
    },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: personal.linkedin,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      url: personal.github,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className={`bg-gradient-to-br from-gray-50 to-white ${
        isMobile ? 'py-12' : isTablet ? 'py-16' : 'py-20'
      }`}
    >
      <div className="container-responsive">
        <AnimatedSection variants={staggerContainer}>
          {/* Section Header */}
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
              Let&apos;s Work Together
            </h2>
            <p
              className={`text-gray-600 max-w-2xl mx-auto ${
                isMobile ? 'text-base px-2' : isTablet ? 'text-base' : 'text-lg'
              }`}
            >
              Ready to discuss your next project or explore opportunities?
              I&apos;d love to hear from you.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div
              className={`grid ${
                isMobile
                  ? 'grid-cols-1 gap-8'
                  : isTablet
                    ? 'grid-cols-1 gap-10'
                    : 'grid-cols-1 lg:grid-cols-2 gap-12'
              }`}
            >
              {/* Contact Information */}
              <motion.div
                variants={staggerItem}
                className={isMobile ? 'space-y-6' : 'space-y-8'}
              >
                <div>
                  <h3
                    className={`font-semibold text-gray-900 mb-6 ${
                      isMobile ? 'text-xl' : 'text-2xl'
                    }`}
                  >
                    Get in Touch
                  </h3>
                  <p
                    className={`text-gray-600 mb-8 ${
                      isMobile ? 'text-sm' : 'text-base'
                    }`}
                  >
                    I&apos;m always interested in new opportunities,
                    collaborations, and interesting projects. Whether you have a
                    question or just want to say hi, feel free to reach out!
                  </p>
                </div>

                {/* Availability Status */}
                <div
                  className={`bg-white rounded-xl shadow-sm border border-gray-100 ${
                    isMobile ? 'p-4' : 'p-6'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4
                      className={`font-medium text-gray-900 ${
                        isMobile ? 'text-base' : 'text-lg'
                      }`}
                    >
                      Current Status
                    </h4>
                    <span
                      className={`rounded-full font-medium ${
                        isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'
                      } ${getAvailabilityColor(personal.availability)}`}
                    >
                      {personal.availability}
                    </span>
                  </div>
                  <p
                    className={`text-gray-600 ${
                      isMobile ? 'text-xs' : 'text-sm'
                    }`}
                  >
                    {personal.availability === 'Available' &&
                      "I'm currently available for new projects and opportunities. Let's discuss how we can work together!"}
                    {personal.availability === 'Busy' &&
                      "I'm currently working on some exciting projects but still open to discussing future opportunities."}
                    {personal.availability === 'Not Available' &&
                      "I'm currently focused on existing commitments but feel free to reach out for future opportunities."}
                  </p>
                </div>

                {/* Contact Methods */}
                <div className={isMobile ? 'space-y-3' : 'space-y-4'}>
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={index}
                      whileHover={
                        !isTouchDevice
                          ? {
                              y: -5,
                              scale: 1.02,
                              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                            }
                          : {}
                      }
                      className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer ${
                        isMobile ? 'p-4' : 'p-6'
                      }`}
                    >
                      <div
                        className={`flex items-start ${
                          isMobile ? 'space-x-3' : 'space-x-4'
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 bg-blue-100 rounded-lg text-blue-600 ${
                            isMobile ? 'p-1.5' : 'p-2'
                          }`}
                        >
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`font-medium text-gray-900 mb-1 ${
                              isMobile ? 'text-base' : 'text-lg'
                            }`}
                          >
                            {method.label}
                          </h4>
                          <p
                            className={`text-gray-600 mb-2 ${
                              isMobile ? 'text-xs' : 'text-sm'
                            }`}
                          >
                            {method.description}
                          </p>
                          {method.href ? (
                            <a
                              href={method.href}
                              className={`text-blue-600 hover:text-blue-800 font-medium transition-colors ${
                                isMobile ? 'text-sm' : 'text-base'
                              } ${isTouchDevice ? 'touch-target' : ''}`}
                            >
                              {method.value}
                            </a>
                          ) : (
                            <span
                              className={`text-gray-900 font-medium ${
                                isMobile ? 'text-sm' : 'text-base'
                              }`}
                            >
                              {method.value}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div
                  className={`bg-white rounded-xl shadow-sm border border-gray-100 ${
                    isMobile ? 'p-4' : 'p-6'
                  }`}
                >
                  <h4
                    className={`font-medium text-gray-900 mb-4 ${
                      isMobile ? 'text-base' : 'text-lg'
                    }`}
                  >
                    Connect with me
                  </h4>
                  <div
                    className={`flex ${isMobile ? 'space-x-3' : 'space-x-4'}`}
                  >
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center justify-center bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg transition-colors ${
                          isMobile ? 'w-10 h-10' : 'w-12 h-12'
                        } ${isTouchDevice ? 'touch-target' : ''}`}
                        title={link.name}
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                variants={staggerItem}
                className={`bg-white rounded-xl shadow-sm border border-gray-100 ${
                  isMobile ? 'p-6' : 'p-8'
                }`}
              >
                <h3
                  className={`font-semibold text-gray-900 mb-6 ${
                    isMobile ? 'text-xl' : 'text-2xl'
                  }`}
                >
                  Send a Message
                </h3>
                <ContactForm onSubmit={handleFormSubmit} />
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
