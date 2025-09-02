'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';

// Skill category colors mapping
const SKILL_COLORS = {
  'Programming Languages': '#3B82F6', // Blue
  'Web Development': '#10B981', // Green
  'Data & Analytics': '#F59E0B', // Amber
  'Tools & Technologies': '#8B5CF6', // Purple
} as const;

interface Particle {
  id: number;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  color: string;
  category: keyof typeof SKILL_COLORS;
  size: number;
  speed: number;
  angle: number;
}

interface ParticleBackgroundProps {
  className?: string;
}

export function ParticleBackground({
  className = '',
}: ParticleBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Optimize particle count based on device
  const particleCount = useMemo(() => {
    if (isMobile) return 50; // Reduced count for mobile
    return 150; // Optimized count for desktop
  }, [isMobile]);

  // Generate particles
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const skillCategories = Object.keys(SKILL_COLORS) as Array<
      keyof typeof SKILL_COLORS
    >;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      const category =
        skillCategories[Math.floor(Math.random() * skillCategories.length)];

      newParticles.push({
        id: i,
        x,
        y,
        originalX: x,
        originalY: y,
        color: SKILL_COLORS[category],
        category,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
      });
    }

    setParticles(newParticles);
  }, [dimensions.width, dimensions.height, particleCount]);

  // Mouse tracking with throttling
  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (event: MouseEvent) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Animation loop
  useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - startTime) / 1000;

      setParticles(prevParticles =>
        prevParticles.map(particle => {
          // Floating animation
          const floatX = Math.sin(deltaTime * 0.5 + particle.id * 0.1) * 20;
          const floatY = Math.cos(deltaTime * 0.3 + particle.id * 0.15) * 15;

          // Mouse interaction
          const mouseDistance = Math.sqrt(
            Math.pow(mousePosition.x - particle.originalX, 2) +
              Math.pow(mousePosition.y - particle.originalY, 2)
          );

          const maxDistance = 150;
          const influence = Math.max(0, 1 - mouseDistance / maxDistance);
          const repulsionStrength = 50;

          const repulsionX =
            mouseDistance > 0
              ? ((particle.originalX - mousePosition.x) / mouseDistance) *
                influence *
                repulsionStrength
              : 0;
          const repulsionY =
            mouseDistance > 0
              ? ((particle.originalY - mousePosition.y) / mouseDistance) *
                influence *
                repulsionStrength
              : 0;

          return {
            ...particle,
            x: particle.originalX + floatX + repulsionX,
            y: particle.originalY + floatY + repulsionY,
          };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    if (particles.length > 0) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [particles.length, mousePosition.x, mousePosition.y]);

  // Render particles as DOM elements for better compatibility
  const renderParticles = useCallback(() => {
    return particles.map(particle => (
      <div
        key={particle.id}
        className="absolute rounded-full pointer-events-none transition-all duration-100 ease-out"
        style={{
          left: `${particle.x}px`,
          top: `${particle.y}px`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          backgroundColor: particle.color,
          opacity: 0.6,
          boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`,
          transform: 'translate(-50%, -50%)',
          zIndex: -1,
        }}
      />
    ));
  }, [particles]);

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />

      {/* Particles */}
      <div className="absolute inset-0">{renderParticles()}</div>

      {/* Additional background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(${SKILL_COLORS['Programming Languages']}40 1px, transparent 1px),
            linear-gradient(90deg, ${SKILL_COLORS['Web Development']}40 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
