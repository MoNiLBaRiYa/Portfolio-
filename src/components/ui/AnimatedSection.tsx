'use client';

import { motion, Variants } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp } from '@/utils/animations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  variants = fadeInUp,
  delay = 0,
  threshold = 0.1,
  as = 'div',
}) => {
  const { ref, isInView } = useScrollAnimation({ threshold });

  const MotionComponent = motion[
    as as keyof typeof motion
  ] as React.ComponentType<any>;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        delay,
      }}
    >
      {children}
    </MotionComponent>
  );
};
