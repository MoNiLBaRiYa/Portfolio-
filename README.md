# Portfolio Website

A modern, interactive portfolio website showcasing projects, skills, and professional experience. Built with Next.js, TypeScript, and Tailwind CSS, featuring advanced data visualizations, 3D graphics, and performance optimizations.

## Features

- **Interactive UI**: Smooth animations and transitions using Framer Motion
- **3D Graphics**: Three.js integration for immersive visual effects
- **Data Visualization**: Interactive charts and graphs using Recharts and Chart.js
- **Dark Mode**: Theme switching with next-themes
- **Performance Optimized**: Code splitting, lazy loading, and bundle optimization
- **SEO Friendly**: Structured data, meta tags, and sitemap generation
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Contact Form**: Email integration using EmailJS
- **Web Vitals Monitoring**: Real-time performance tracking

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **UI Components**: Radix UI, Lucide React

### Data Visualization
- Recharts
- Chart.js with React Chart.js 2
- D3.js

### Development Tools
- ESLint
- Prettier
- TypeScript

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MoNiLBaRiYa/Portfolio-.git
cd Portfolio-
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

Create a production build:
```bash
npm run build
```

Analyze bundle size:
```bash
npm run build:analyze
```

Start production server:
```bash
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── fonts/             # Custom fonts
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── layout/            # Layout components
│   ├── sections/          # Page sections
│   ├── seo/               # SEO components
│   └── ui/                # Reusable UI components
├── constants/             # App constants
├── context/               # React context providers
├── data/                  # Portfolio data
├── hooks/                 # Custom React hooks
├── lib/                   # Library configurations
├── services/              # External services
├── styles/                # Global styles
├── types/                 # TypeScript types
└── utils/                 # Utility functions
```

## Key Sections

- **Hero**: Animated introduction with particle background
- **About**: Personal information and professional summary
- **Skills**: Interactive skill tree with proficiency levels
- **Projects**: Featured projects with detailed modals
- **Experience**: Professional work history
- **Education**: Academic background and certifications
- **Data Visualization**: Interactive charts and metrics
- **Contact**: Contact form with email integration

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run build:analyze` - Build with bundle analysis
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## Performance Optimizations

- Code splitting and lazy loading
- Image optimization with Next.js Image
- Bundle size optimization
- Progressive loading strategies
- Web Vitals monitoring
- Efficient rendering with React memoization

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contact

Monil Bariya
- Email: monilbariya.dev@gmail.com
- LinkedIn: [monilbariya28](https://www.linkedin.com/in/monilbariya28)
- GitHub: [MoNiLBaRiYa](https://github.com/MoNiLBaRiYa)

## Acknowledgments

Built with modern web technologies and AI-assisted development tools to create an engaging and performant portfolio experience.
