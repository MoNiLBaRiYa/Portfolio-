'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = 'w-full',
  height = 'h-4',
  rounded = false,
}) => {
  return (
    <motion.div
      className={`bg-gray-200 animate-pulse ${width} ${height} ${
        rounded ? 'rounded-full' : 'rounded'
      } ${className}`}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      role="status"
      aria-label="Loading content"
    />
  );
};

export const ProjectCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
    <Skeleton height="h-48" className="mb-4" />
    <Skeleton height="h-6" width="w-3/4" className="mb-2" />
    <Skeleton height="h-4" className="mb-2" />
    <Skeleton height="h-4" width="w-5/6" className="mb-4" />
    <div className="flex gap-2">
      <Skeleton width="w-16" height="h-6" rounded />
      <Skeleton width="w-20" height="h-6" rounded />
      <Skeleton width="w-14" height="h-6" rounded />
    </div>
  </div>
);

export const ProfileSkeleton: React.FC = () => (
  <div className="flex items-center gap-4 p-6">
    <Skeleton width="w-16" height="h-16" rounded />
    <div className="flex-1">
      <Skeleton height="h-6" width="w-48" className="mb-2" />
      <Skeleton height="h-4" width="w-32" className="mb-1" />
      <Skeleton height="h-4" width="w-64" />
    </div>
  </div>
);

export const SkillCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg p-4 shadow">
    <div className="flex items-center gap-3 mb-3">
      <Skeleton width="w-8" height="h-8" rounded />
      <Skeleton height="h-5" width="w-24" />
    </div>
    <Skeleton height="h-2" width="w-full" rounded className="mb-2" />
    <Skeleton height="h-4" width="w-16" />
  </div>
);

// Export SkeletonLoader as named export
export const SkeletonLoader = Skeleton;

export default Skeleton;
