import { EmailService } from '@/services/emailService';
import { ContactFormData } from '@/types/portfolio';

/**
 * Utility functions for testing EmailJS integration
 */
export class EmailTestUtils {
  /**
   * Test EmailJS configuration and connection
   */
  static async testEmailConfiguration(): Promise<{
    configured: boolean;
    connectionTest?: boolean;
    error?: string;
  }> {
    try {
      // Check if EmailJS is configured
      const isConfigured = EmailService.isConfigured();

      if (!isConfigured) {
        return {
          configured: false,
          error: 'EmailJS not configured. Please set up environment variables.',
        };
      }

      // Test connection
      const connectionResult = await EmailService.testConnection();

      return {
        configured: true,
        connectionTest: connectionResult.success,
        error: connectionResult.success ? undefined : connectionResult.error,
      };
    } catch (error) {
      return {
        configured: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Send a test email with sample data
   */
  static async sendTestEmail(): Promise<{
    success: boolean;
    message: string;
    error?: string;
  }> {
    const testFormData: ContactFormData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Portfolio Contact Form Test',
      message:
        'This is a test message to verify the contact form functionality. If you receive this, the EmailJS integration is working correctly!',
    };

    try {
      const result = await EmailService.sendEmail(testFormData);
      return result;
    } catch (error) {
      return {
        success: false,
        message: 'Test email failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get detailed configuration status
   */
  static getConfigurationStatus() {
    const status = EmailService.getConfigStatus();

    return {
      ...status,
      environmentVariables: {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
          ? 'Set'
          : 'Missing',
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
          ? 'Set'
          : 'Missing',
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
          ? 'Set'
          : 'Missing',
      },
      recommendations: this.getConfigurationRecommendations(status),
    };
  }

  /**
   * Get configuration recommendations based on current status
   */
  private static getConfigurationRecommendations(status: any): string[] {
    const recommendations: string[] = [];

    if (!status.serviceId) {
      recommendations.push(
        'Set NEXT_PUBLIC_EMAILJS_SERVICE_ID in your .env.local file'
      );
    }

    if (!status.templateId) {
      recommendations.push(
        'Set NEXT_PUBLIC_EMAILJS_TEMPLATE_ID in your .env.local file'
      );
    }

    if (!status.publicKey) {
      recommendations.push(
        'Set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your .env.local file'
      );
    }

    if (status.isConfigured) {
      recommendations.push(
        'Configuration looks good! Test the connection to verify functionality.'
      );
    } else {
      recommendations.push(
        'Visit https://www.emailjs.com/ to set up your EmailJS account and get the required credentials.'
      );
    }

    return recommendations;
  }

  /**
   * Validate form data before sending
   */
  static validateFormData(formData: ContactFormData): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!formData.name || formData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!formData.email || !this.isValidEmail(formData.email)) {
      errors.push('Please provide a valid email address');
    }

    if (!formData.subject || formData.subject.trim().length < 5) {
      errors.push('Subject must be at least 5 characters long');
    }

    if (!formData.message || formData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Simple email validation
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Generate sample form data for testing
   */
  static generateSampleFormData(): ContactFormData {
    const samples = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        subject: 'Interested in collaboration',
        message:
          "Hi Monil, I came across your portfolio and I'm impressed with your work. I'd like to discuss a potential collaboration opportunity.",
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.j@company.com',
        subject: 'Job opportunity',
        message:
          'Hello Monil, we have an exciting full-stack developer position that might interest you. Would you be available for a quick call this week?',
      },
      {
        name: 'Mike Chen',
        email: 'mike.chen@startup.io',
        subject: 'Project consultation',
        message:
          "Hi there! I'm working on a React project and could use some guidance. Your portfolio shows exactly the kind of expertise we need.",
      },
    ];

    return samples[Math.floor(Math.random() * samples.length)];
  }
}

// Export for console testing in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).EmailTestUtils = EmailTestUtils;
}
