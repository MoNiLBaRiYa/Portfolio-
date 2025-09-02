import emailjs from '@emailjs/browser';
import { ContactFormData } from '@/types/portfolio';

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

// Initialize EmailJS
if (typeof window !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export interface EmailServiceResponse {
  success: boolean;
  message: string;
  error?: string;
}

export class EmailService {
  private static retryAttempts = 3;
  private static retryDelay = 1000; // 1 second

  /**
   * Send email using EmailJS with retry mechanism
   */
  static async sendEmail(
    formData: ContactFormData
  ): Promise<EmailServiceResponse> {
    // Validate configuration
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS configuration missing');
      return {
        success: false,
        message: 'Email service configuration error',
        error: 'Missing EmailJS configuration',
      };
    }

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: 'Monil Bariya',
      reply_to: formData.email,
      // Add timestamp for tracking
      timestamp: new Date().toISOString(),
    };

    // Attempt to send email with retry mechanism
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const response = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams
        );

        if (response.status === 200) {
          return {
            success: true,
            message: 'Email sent successfully',
          };
        } else {
          throw new Error(`EmailJS returned status: ${response.status}`);
        }
      } catch (error) {
        console.error(`Email send attempt ${attempt} failed:`, error);

        // If this is the last attempt, return the error
        if (attempt === this.retryAttempts) {
          const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
          return {
            success: false,
            message: 'Failed to send email after multiple attempts',
            error: errorMessage,
          };
        }

        // Wait before retrying (exponential backoff)
        await this.delay(this.retryDelay * attempt);
      }
    }

    // This should never be reached, but just in case
    return {
      success: false,
      message: 'Unexpected error occurred',
      error: 'Unknown error',
    };
  }

  /**
   * Validate email configuration
   */
  static isConfigured(): boolean {
    return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
  }

  /**
   * Get configuration status for debugging
   */
  static getConfigStatus() {
    return {
      serviceId: !!EMAILJS_SERVICE_ID,
      templateId: !!EMAILJS_TEMPLATE_ID,
      publicKey: !!EMAILJS_PUBLIC_KEY,
      isConfigured: this.isConfigured(),
    };
  }

  /**
   * Utility function to create delay
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Test email service connection
   */
  static async testConnection(): Promise<EmailServiceResponse> {
    if (!this.isConfigured()) {
      return {
        success: false,
        message: 'EmailJS not configured',
        error: 'Missing configuration',
      };
    }

    try {
      // Send a test email with minimal data
      const testParams = {
        from_name: 'Portfolio Test',
        from_email: 'test@example.com',
        subject: 'Connection Test',
        message: 'This is a test message to verify EmailJS connection.',
        to_name: 'Monil Bariya',
        reply_to: 'test@example.com',
        timestamp: new Date().toISOString(),
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        testParams
      );

      return {
        success: response.status === 200,
        message:
          response.status === 200
            ? 'Connection successful'
            : 'Connection failed',
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: 'Connection test failed',
        error: errorMessage,
      };
    }
  }
}

// Export default instance for convenience
export default EmailService;
