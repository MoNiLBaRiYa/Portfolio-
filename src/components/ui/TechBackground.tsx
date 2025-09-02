'use client';

import React, { useEffect, useState } from 'react';
// import { portfolioData } from '@/data/portfolio';

// Tech icons and symbols for different skill categories
const TECH_ELEMENTS = {
  'Programming Languages': [
    { symbol: '{ }', name: 'JavaScript', color: '#F7DF1E' },
    { symbol: '</>', name: 'TypeScript', color: '#3178C6' },
    { symbol: 'def', name: 'Python', color: '#3776AB' },
    { symbol: 'class', name: 'Java', color: '#ED8B00' },
    { symbol: 'SELECT', name: 'SQL', color: '#336791' },
  ],
  'Web Development': [
    { symbol: '⚛️', name: 'React', color: '#61DAFB' },
    { symbol: '▲', name: 'Next.js', color: '#000000' },
    { symbol: '🟢', name: 'Node.js', color: '#339933' },
    { symbol: '<html>', name: 'HTML', color: '#E34F26' },
    { symbol: 'CSS', name: 'CSS', color: '#1572B6' },
  ],
  'Data & Analytics': [
    { symbol: '📊', name: 'Power BI', color: '#F2C811' },
    { symbol: '🤖', name: 'ML', color: '#FF6F00' },
    { symbol: '📈', name: 'Analytics', color: '#4285F4' },
    { symbol: 'pd', name: 'Pandas', color: '#150458' },
    { symbol: 'np', name: 'NumPy', color: '#013243' },
  ],
  'Tools & Technologies': [
    { symbol: 'git', name: 'Git', color: '#F05032' },
    { symbol: '🐳', name: 'Docker', color: '#2496ED' },
    { symbol: '☁️', name: 'AWS', color: '#FF9900' },
    { symbol: 'M', name: 'MongoDB', color: '#47A248' },
    { symbol: '🐘', name: 'PostgreSQL', color: '#336791' },
  ],
} as const;

// Code snippets that float around
const CODE_SNIPPETS = [
  'const app = () => {}',
  'import React from "react"',
  'function getData() {}',
  'SELECT * FROM users',
  'git commit -m "feat"',
  'npm install',
  'docker run -p 3000',
  'useState([])',
  'async/await',
  'export default',
];

// Floating tech element interface
interface FloatingElement {
  id: number;
  type: 'icon' | 'code';
  content: string;
  name: string;
  color: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
  animationDelay: number;
  category: string;
}

// Tech-themed animation system - subtle and non-intrusive
const TechAnimationSystem = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  // Initialize static positioned elements that don't move
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const elementCount = isMobile ? 8 : 12;
    const newElements: FloatingElement[] = [];

    // Position elements only in corners and edges, avoiding center content area
    const positions = [
      { x: 10, y: 15 },
      { x: 90, y: 15 }, // Top corners
      { x: 5, y: 85 },
      { x: 95, y: 85 }, // Bottom corners
      { x: 15, y: 50 },
      { x: 85, y: 50 }, // Middle sides
      { x: 50, y: 10 },
      { x: 50, y: 90 }, // Top/bottom center
      { x: 25, y: 25 },
      { x: 75, y: 25 }, // Upper area
      { x: 25, y: 75 },
      { x: 75, y: 75 }, // Lower area
    ];

    for (let i = 0; i < Math.min(elementCount, positions.length); i++) {
      const categories = Object.keys(TECH_ELEMENTS);
      const category = categories[i % categories.length];
      const techItems = TECH_ELEMENTS[category as keyof typeof TECH_ELEMENTS];
      const techItem = techItems[Math.floor(Math.random() * techItems.length)];

      newElements.push({
        id: i,
        type: 'icon',
        content: techItem.symbol,
        name: techItem.name,
        color: techItem.color,
        x: positions[i].x,
        y: positions[i].y,
        size: Math.random() * 8 + 12, // Smaller size
        speed: 0, // No movement
        direction: 0,
        animationDelay: Math.random() * 5,
        category,
      });
    }

    setElements(newElements);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Static tech icons positioned away from content */}
      {elements.map(element => (
        <div
          key={element.id}
          className="absolute opacity-20 hover:opacity-40 transition-opacity duration-500 tech-element"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            color: element.color,
            transform: 'translate(-50%, -50%)',
            textShadow: `0 0 20px ${element.color}30`,
            zIndex: 1,
            animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${element.animationDelay}s`,
          }}
          title={element.name}
        >
          {element.content}
        </div>
      ))}

      {/* Subtle animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 animate-grid"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Very subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" />
    </div>
  );
};

// Fallback component - very subtle
const TechFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 text-blue-500 text-xl animate-pulse">
        ⚛️
      </div>
      <div
        className="absolute top-20 right-20 text-green-500 text-lg animate-pulse"
        style={{ animationDelay: '1s' }}
      >
        {}
      </div>
      <div
        className="absolute bottom-20 left-20 text-purple-500 text-lg animate-pulse"
        style={{ animationDelay: '2s' }}
      >
        🤖
      </div>
      <div
        className="absolute bottom-10 right-10 text-orange-500 text-xl animate-pulse"
        style={{ animationDelay: '3s' }}
      >
        🐳
      </div>
    </div>
  </div>
);

// Main TechBackground component
interface TechBackgroundProps {
  className?: string;
}

const TechBackground: React.FC<TechBackgroundProps> = ({ className = '' }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render on server side
  if (!isClient) {
    return <TechFallback />;
  }

  return (
    <div className={`absolute inset-0 ${className}`} style={{ zIndex: 1 }}>
      <TechAnimationSystem />
    </div>
  );
};

export default TechBackground;
