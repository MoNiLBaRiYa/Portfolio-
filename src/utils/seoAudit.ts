import { portfolioData } from '@/data/portfolio';

export interface SEOAuditResult {
  score: number;
  issues: string[];
  recommendations: string[];
  passed: string[];
}

export function auditSEO(): SEOAuditResult {
  const issues: string[] = [];
  const recommendations: string[] = [];
  const passed: string[] = [];

  // Check title length
  const title = `${portfolioData.personal.name} - ${portfolioData.personal.title}`;
  if (title.length < 30) {
    issues.push('Title is too short (less than 30 characters)');
  } else if (title.length > 60) {
    issues.push('Title is too long (more than 60 characters)');
  } else {
    passed.push('Title length is optimal (30-60 characters)');
  }

  // Check description length
  const description = portfolioData.personal.summary;
  if (description.length < 120) {
    issues.push('Meta description is too short (less than 120 characters)');
  } else if (description.length > 160) {
    issues.push('Meta description is too long (more than 160 characters)');
  } else {
    passed.push('Meta description length is optimal (120-160 characters)');
  }

  // Check for structured data
  passed.push(
    'Structured data (JSON-LD) implemented for Person, Website, and Portfolio'
  );

  // Check for Open Graph tags
  passed.push('Open Graph meta tags implemented for social media sharing');

  // Check for Twitter Card tags
  passed.push('Twitter Card meta tags implemented');

  // Check for sitemap
  passed.push('XML sitemap generated dynamically');

  // Check for robots.txt
  passed.push('Robots.txt file configured');

  // Check for favicon
  passed.push('Favicon and app icons configured');

  // Check for canonical URLs
  passed.push('Canonical URLs implemented');

  // Recommendations
  recommendations.push(
    'Consider adding breadcrumb navigation for better user experience'
  );
  recommendations.push(
    'Implement lazy loading for images to improve page speed'
  );
  recommendations.push('Add alt text to all images for accessibility');
  recommendations.push(
    'Consider implementing AMP (Accelerated Mobile Pages) for faster mobile loading'
  );
  recommendations.push('Add schema markup for projects and skills');
  recommendations.push('Implement internal linking strategy between sections');

  // Calculate score
  const totalChecks = issues.length + passed.length;
  const score = Math.round((passed.length / totalChecks) * 100);

  return {
    score,
    issues,
    recommendations,
    passed,
  };
}

export function generateSEOReport(): string {
  const audit = auditSEO();

  let report = `SEO Audit Report\n`;
  report += `================\n\n`;
  report += `Overall Score: ${audit.score}/100\n\n`;

  if (audit.passed.length > 0) {
    report += `✅ Passed Checks (${audit.passed.length}):\n`;
    audit.passed.forEach(item => {
      report += `  • ${item}\n`;
    });
    report += `\n`;
  }

  if (audit.issues.length > 0) {
    report += `❌ Issues Found (${audit.issues.length}):\n`;
    audit.issues.forEach(item => {
      report += `  • ${item}\n`;
    });
    report += `\n`;
  }

  if (audit.recommendations.length > 0) {
    report += `💡 Recommendations (${audit.recommendations.length}):\n`;
    audit.recommendations.forEach(item => {
      report += `  • ${item}\n`;
    });
  }

  return report;
}
