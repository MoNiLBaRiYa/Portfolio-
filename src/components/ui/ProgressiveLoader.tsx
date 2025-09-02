import React, { Suspense, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ProgressiveLoaderProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  delay?: number;
}

const DefaultSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="animate-pulse"
  >
    <div className="space-y-4 p-6">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  </motion.div>
);

const ProgressiveLoader: React.FC<ProgressiveLoaderProps> = ({
  children,
  fallback = <DefaultSkeleton />,
  className = '',
  delay = 0,
}) => {
  return (
    <div className={className}>
      <Suspense
        fallback={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay / 1000 }}
          >
            {fallback}
          </motion.div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
};

export default ProgressiveLoader;
