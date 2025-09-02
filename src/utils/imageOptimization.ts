import { portfolioData } from '@/data/portfolio';

export interface ImageAltConfig {
  [key: string]: string;
}

// Comprehensive alt text mapping for all images
export const imageAltTexts: ImageAltConfig = {
  // Profile images
  '/images/profile.svg': `${portfolioData.personal.name} - Professional headshot`,

  // Project images
  '/images/projects/fake-news-1.svg':
    'AI-Powered Fake News Detection System - Main interface showing news analysis',
  '/images/projects/fake-news-2.svg':
    'AI-Powered Fake News Detection System - Results dashboard with confidence scores',
  '/images/projects/portfolio-1.svg':
    'Interactive Portfolio Website - Homepage with particle background and hero section',
  '/images/projects/portfolio-2.svg':
    'Interactive Portfolio Website - Skills section with interactive visualizations',
  '/images/projects/needmeet-1.svg':
    'NeedMeet Platform - Service provider marketplace interface',
  '/images/projects/needmeet-2.svg':
    'NeedMeet Platform - Customer booking and payment system',

  // Hobby images
  '/images/hobbies/digital-art.svg':
    'Digital Art - Creative design and illustration work',
  '/images/hobbies/reading.svg':
    'Reading - Books and continuous learning passion',
  '/images/hobbies/gaming.svg':
    'Gaming - Strategic thinking and problem-solving through games',
  '/images/hobbies/opensource.svg':
    'Open Source - Contributing to community projects and collaboration',

  // Skill icons
  '/icons/python.svg': 'Python programming language icon',
  '/icons/java.svg': 'Java programming language icon',
  '/icons/cpp.svg': 'C++ programming language icon',
  '/icons/html.svg': 'HTML markup language icon',
  '/icons/css.svg': 'CSS styling language icon',
  '/icons/javascript.svg': 'JavaScript programming language icon',
  '/icons/typescript.svg': 'TypeScript programming language icon',
  '/icons/react.svg': 'React.js library icon',
  '/icons/nextjs.svg': 'Next.js framework icon',
  '/icons/nodejs.svg': 'Node.js runtime icon',
  '/icons/express.svg': 'Express.js framework icon',
  '/icons/mongodb.svg': 'MongoDB database icon',
  '/icons/flask.svg': 'Flask web framework icon',
  '/icons/tailwind.svg': 'Tailwind CSS framework icon',
  '/icons/threejs.svg': 'Three.js 3D library icon',
  '/icons/framer.svg': 'Framer Motion animation library icon',
  '/icons/d3.svg': 'D3.js data visualization library icon',
  '/icons/powerbi.svg': 'Microsoft Power BI tool icon',
  '/icons/intellij.svg': 'IntelliJ IDEA development environment icon',
  '/icons/vscode.svg': 'Visual Studio Code editor icon',
  '/icons/cursor.svg': 'Cursor AI-powered editor icon',
  '/icons/kiro.svg': 'Kiro IDE development environment icon',
  '/icons/git.svg': 'Git version control system icon',
  '/icons/aws.svg': 'Amazon Web Services cloud platform icon',
  '/icons/docker.svg': 'Docker containerization platform icon',
  '/icons/firebase.svg': 'Firebase backend platform icon',
  '/icons/stripe.svg': 'Stripe payment processing icon',
  '/icons/sklearn.svg': 'Scikit-learn machine learning library icon',
  '/icons/nltk.svg': 'NLTK natural language processing library icon',
  '/icons/pandas.svg': 'Pandas data analysis library icon',

  // Soft skill icons
  '/icons/datastructure.svg': 'Data Structures and Algorithms concept icon',
  '/icons/frontend.svg': 'Frontend Development and UI/UX design icon',
  '/icons/optimization.svg': 'Code Optimization and Performance tuning icon',
  '/icons/collaboration.svg': 'Team Collaboration and Communication icon',
  '/icons/thinking.svg': 'Critical and Creative Thinking skills icon',
  '/icons/communication.svg': 'Professional Communication skills icon',
};

export function getImageAlt(src: string, fallback?: string): string {
  try {
    // Check if we have a specific alt text for this image
    if (imageAltTexts[src]) {
      return imageAltTexts[src];
    }

    // Generate alt text based on filename if no specific mapping exists
    const filename =
      src
        .split('/')
        .pop()
        ?.replace(/\.(svg|jpg|jpeg|png|webp|avif)$/i, '') || '';
    const formattedName = filename
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return fallback || formattedName || 'Portfolio image';
  } catch (error) {
    console.warn('Error generating alt text for image:', src, error);
    return fallback || 'Image';
  }
}

export function generateImageSizes(
  breakpoints: number[] = [640, 768, 1024, 1280, 1536]
): string {
  return breakpoints
    .map((bp, index) => {
      if (index === breakpoints.length - 1) {
        return `${bp}px`;
      }
      return `(max-width: ${bp}px) ${Math.floor(bp * 0.9)}px`;
    })
    .join(', ');
}

export const defaultImageSizes = generateImageSizes();

// Image optimization presets
export const imagePresets = {
  hero: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    priority: true,
  },
  project: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px',
    priority: false,
  },
  skill: {
    sizes: '(max-width: 768px) 32px, 40px',
    priority: false,
  },
  hobby: {
    sizes: '(max-width: 768px) 100vw, 300px',
    priority: false,
  },
};
