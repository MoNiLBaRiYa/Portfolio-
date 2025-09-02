'use client';

import { useState } from 'react';
import { ContactFormData } from '@/types/portfolio';
import { validateEmail } from '@/utils/validation';
import { EmailService } from '@/services/emailService';
import { useResponsive } from '@/hooks/useResponsive';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface SubmissionState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
  retryCount: number;
}

export function ContactForm({ onSubmit, className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submission, setSubmission] = useState<SubmissionState>({
    status: 'idle',
    retryCount: 0,
  });
  const { isMobile, isTouchDevice } = useResponsive();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Reset submit status when user makes changes
    if (submission.status !== 'idle') {
      setSubmission(prev => ({ ...prev, status: 'idle', message: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmission(prev => ({
      ...prev,
      status: 'submitting',
      message: undefined,
    }));

    try {
      // Use EmailJS service or fallback to custom onSubmit
      let result;
      if (EmailService.isConfigured()) {
        result = await EmailService.sendEmail(formData);
      } else if (onSubmit) {
        await onSubmit(formData);
        result = { success: true, message: 'Message sent successfully' };
      } else {
        throw new Error('No email service configured');
      }

      if (result.success) {
        setSubmission({
          status: 'success',
          message: result.message,
          retryCount: 0,
        });
        // Clear form on success
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.error || result.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to send message';
      setSubmission(prev => ({
        status: 'error',
        message: errorMessage,
        retryCount: prev.retryCount + 1,
      }));
    }
  };

  const handleRetry = () => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${isMobile ? 'space-y-4' : 'space-y-6'} ${className}`}
    >
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className={`block font-medium text-gray-700 mb-2 ${
            isMobile ? 'text-sm' : 'text-sm'
          }`}
        >
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500 ${
            isMobile ? 'px-3 py-2 text-base' : 'px-4 py-3'
          } ${
            errors.name
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 bg-white hover:border-gray-400'
          } ${isTouchDevice ? 'touch-target' : ''}`}
          placeholder="Enter your full name"
          disabled={submission.status === 'submitting'}
        />
        {errors.name && (
          <p
            className={`mt-1 text-red-600 ${isMobile ? 'text-xs' : 'text-sm'}`}
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className={`block font-medium text-gray-700 mb-2 ${
            isMobile ? 'text-sm' : 'text-sm'
          }`}
        >
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500 ${
            isMobile ? 'px-3 py-2 text-base' : 'px-4 py-3'
          } ${
            errors.email
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 bg-white hover:border-gray-400'
          } ${isTouchDevice ? 'touch-target' : ''}`}
          placeholder="Enter your email address"
          disabled={submission.status === 'submitting'}
        />
        {errors.email && (
          <p
            className={`mt-1 text-red-600 ${isMobile ? 'text-xs' : 'text-sm'}`}
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="subject"
          className={`block font-medium text-gray-700 mb-2 ${
            isMobile ? 'text-sm' : 'text-sm'
          }`}
        >
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className={`w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500 ${
            isMobile ? 'px-3 py-2 text-base' : 'px-4 py-3'
          } ${
            errors.subject
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 bg-white hover:border-gray-400'
          } ${isTouchDevice ? 'touch-target' : ''}`}
          placeholder="What would you like to discuss?"
          disabled={submission.status === 'submitting'}
        />
        {errors.subject && (
          <p
            className={`mt-1 text-red-600 ${isMobile ? 'text-xs' : 'text-sm'}`}
          >
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className={`block font-medium text-gray-700 mb-2 ${
            isMobile ? 'text-sm' : 'text-sm'
          }`}
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={isMobile ? 4 : 6}
          value={formData.message}
          onChange={handleInputChange}
          className={`w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical text-gray-900 placeholder-gray-500 ${
            isMobile ? 'px-3 py-2 text-base' : 'px-4 py-3'
          } ${
            errors.message
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
          placeholder="Tell me about your project, opportunity, or just say hello!"
          disabled={submission.status === 'submitting'}
        />
        {errors.message && (
          <p
            className={`mt-1 text-red-600 ${isMobile ? 'text-xs' : 'text-sm'}`}
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={submission.status === 'submitting'}
          className={`w-full rounded-lg font-medium transition-all duration-200 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isMobile ? 'py-3 px-4 text-base' : 'py-3 px-6'
          } ${
            submission.status === 'submitting'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          } ${isTouchDevice ? 'touch-target' : ''}`}
        >
          {submission.status === 'submitting' ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </div>

      {/* Status Messages */}
      {submission.status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Message sent successfully!
              </p>
              <p className="text-sm text-green-700 mt-1">
                {submission.message ||
                  "Thank you for reaching out. I'll get back to you within 24 hours."}
              </p>
            </div>
          </div>
        </div>
      )}

      {submission.status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-red-800">
                Failed to send message
              </p>
              <p className="text-sm text-red-700 mt-1">
                {submission.message ||
                  'Please try again or contact me directly via email.'}
              </p>
              {submission.retryCount < 3 && (
                <button
                  onClick={handleRetry}
                  className="mt-2 text-sm font-medium text-red-800 hover:text-red-900 underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                >
                  Try Again ({3 - submission.retryCount} attempts remaining)
                </button>
              )}
              {submission.retryCount >= 3 && (
                <p className="text-sm text-red-600 mt-2">
                  Maximum retry attempts reached. Please contact me directly at{' '}
                  <a
                    href="mailto:monilbariya@gmail.com"
                    className="font-medium underline hover:text-red-800"
                  >
                    monilbariya@gmail.com
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Configuration Warning (Development Only) */}
      {process.env.NODE_ENV === 'development' &&
        !EmailService.isConfigured() && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">
                  EmailJS Not Configured
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Set up your EmailJS credentials in .env.local to enable email
                  functionality.
                </p>
              </div>
            </div>
          </div>
        )}
    </form>
  );
}
