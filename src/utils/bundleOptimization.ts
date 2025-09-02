/**
 * Bundle optimization utilities for tree shaking and code splitting
 */

// Optimized imports for Framer Motion (tree shaking)
export {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from 'framer-motion';

// Optimized imports for Lucide React (tree shaking)
export {
  Menu,
  X,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Code,
  Database,
  Globe,
  Smartphone,
  Brain,
  BarChart3,
  Award,
  GraduationCap,
  Briefcase,
  Send,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Download,
  Eye,
  Zap,
  Target,
  Lightbulb,
  Palette,
  BookOpen,
  Gamepad2,
  Headphones,
  Coffee,
} from 'lucide-react';

// Optimized D3 imports (only what we need)
export {
  select,
  selectAll,
  scaleLinear,
  scaleOrdinal,
  schemeCategory10,
  hierarchy,
  tree,
  linkHorizontal,
} from 'd3';

// Chart.js optimized imports
export {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
  // Preload critical images
  const profileImage = new Image();
  profileImage.src = '/images/profile.svg';

  // Preload project images
  const projectImages = [
    '/images/projects/fake-news-1.svg',
    '/images/projects/fake-news-2.svg',
    '/images/projects/needmeet-1.svg',
    '/images/projects/needmeet-2.svg',
    '/images/projects/portfolio-1.svg',
    '/images/projects/portfolio-2.svg',
  ];

  projectImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Preload hobby images
  const hobbyImages = [
    '/images/hobbies/digital-art.svg',
    '/images/hobbies/gaming.svg',
    '/images/hobbies/opensource.svg',
    '/images/hobbies/reading.svg',
  ];

  hobbyImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

/**
 * Dynamic import helper with error handling
 */
export const dynamicImport = async <T>(
  importFn: () => Promise<T>,
  retries = 3
): Promise<T> => {
  try {
    return await importFn();
  } catch (error) {
    if (retries > 0) {
      console.warn(`Import failed, retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return dynamicImport(importFn, retries - 1);
    }
    throw error;
  }
};
