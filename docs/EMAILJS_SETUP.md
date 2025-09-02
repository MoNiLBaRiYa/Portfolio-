# EmailJS Setup Guide

This guide will help you set up EmailJS for the portfolio contact form functionality.

## Prerequisites

- EmailJS account (free tier available)
- Access to your email provider (Gmail, Outlook, etc.)

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Set Up Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```html
Subject: New Portfolio Contact: {{subject}} From: {{from_name}} <{{from_email}}>
Reply-To: {{reply_to}} Message: {{message}} --- Sent from portfolio contact form
Timestamp: {{timestamp}}
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_abcdef123456`)

## Step 5: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your EmailJS credentials:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 6: Test the Integration

### Option 1: Use the Contact Form

1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email for the message

### Option 2: Use Browser Console Testing

1. Open browser developer tools
2. Go to the Console tab
3. Run these commands:

```javascript
// Test configuration
EmailTestUtils.getConfigurationStatus();

// Test connection
await EmailTestUtils.testEmailConfiguration();

// Send test email
await EmailTestUtils.sendTestEmail();
```

## Troubleshooting

### Common Issues

#### 1. "EmailJS not configured" warning

- Check that all environment variables are set correctly
- Restart your development server after adding .env.local
- Verify variable names match exactly (including NEXT*PUBLIC* prefix)

#### 2. "Failed to send email" error

- Verify your Service ID, Template ID, and Public Key are correct
- Check that your email service is properly connected in EmailJS dashboard
- Ensure your email template variables match the ones being sent

#### 3. Emails not being received

- Check your spam/junk folder
- Verify the email template is set up correctly
- Test with a different email address
- Check EmailJS dashboard for delivery logs

#### 4. Rate limiting issues

- EmailJS free tier has monthly limits
- Implement proper error handling for rate limit responses
- Consider upgrading to a paid plan for higher limits

### Template Variables

The contact form sends these variables to your EmailJS template:

- `{{from_name}}` - User's name
- `{{from_email}}` - User's email address
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{to_name}}` - Your name (hardcoded as "Monil Bariya")
- `{{reply_to}}` - User's email (for easy replies)
- `{{timestamp}}` - When the message was sent

### Security Notes

- Never commit your .env.local file to version control
- The NEXT*PUBLIC* prefix makes these variables available in the browser
- EmailJS public key is safe to expose (it's designed for client-side use)
- Consider implementing additional spam protection for production

## Advanced Configuration

### Custom Error Messages

You can customize error messages by modifying the `EmailService` class:

```typescript
// In src/services/emailService.ts
const customErrorMessages = {
  network: 'Network error - please check your connection',
  rate_limit: 'Too many requests - please try again later',
  invalid_template: 'Email template configuration error',
};
```

### Retry Logic

The service includes automatic retry with exponential backoff:

- 3 retry attempts by default
- Increasing delay between retries (1s, 2s, 3s)
- User can manually retry up to 3 times

### Analytics Integration

To track form submissions:

```typescript
// Add to handleSubmit in ContactForm
if (result.success) {
  // Track successful submission
  gtag('event', 'contact_form_submit', {
    event_category: 'engagement',
    event_label: 'success',
  });
}
```

## Production Deployment

1. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Test the contact form in production
3. Monitor EmailJS dashboard for delivery statistics
4. Set up email notifications for form submissions

## Support

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Community](https://www.emailjs.com/community/)
- Check the browser console for detailed error messages
- Use the built-in test utilities for debugging
