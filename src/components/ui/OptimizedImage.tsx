import React, { useState, useCallback } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  showLoadingSpinner?: boolean;
  blurDataURL?: string;
  onLoadComplete?: () => void;
  onError?: () => void;
}

// Simple alt text generator
const getImageAlt = (src: string, fallback?: string): string => {
  if (fallback) return fallback;

  const filename =
    src
      .split('/')
      .pop()
      ?.replace(/\.(svg|jpg|jpeg|png|webp|avif)$/i, '') || '';
  const formattedName = filename
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return formattedName || 'Portfolio image';
};

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = '/images/placeholder.svg',
  showLoadingSpinner = true,
  blurDataURL,
  onLoadComplete,
  onError,
  className = '',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    onLoadComplete?.();
  }, [onLoadComplete]);

  const handleError = useCallback(() => {
    console.warn(
      'Image failed to load:',
      currentSrc,
      'Retry count:',
      retryCount
    );

    // Try fallback if we haven't already and it's different from current src
    if (retryCount === 0 && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setRetryCount(1);
      return;
    }

    // If fallback also fails or we're already on fallback, show error state
    setHasError(true);
    setIsLoading(false);
    onError?.();
  }, [currentSrc, fallbackSrc, onError, retryCount]);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    setRetryCount(0);
    setCurrentSrc(src);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading spinner */}
      {isLoading && showLoadingSpinner && !hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
          role="status"
          aria-label="Loading image"
        >
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="sr-only">Loading image...</span>
        </motion.div>
      )}

      {/* Optimized Image */}
      {!hasError && (
        <>
          {currentSrc &&
          typeof currentSrc === 'string' &&
          currentSrc.endsWith('.svg') ? (
            <Image
              src={currentSrc}
              alt={getImageAlt(src as string, alt)}
              onLoad={handleLoad}
              onError={handleError}
              loading="lazy"
              width={props.fill ? undefined : (props.width as number)}
              height={props.fill ? undefined : (props.height as number)}
              fill={props.fill}
              style={{
                objectFit: 'contain',
              }}
              className={`transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
            />
          ) : (
            <Image
              src={currentSrc}
              alt={getImageAlt(src as string, alt)}
              onLoad={handleLoad}
              onError={handleError}
              placeholder={blurDataURL ? 'blur' : 'empty'}
              blurDataURL={blurDataURL}
              quality={85}
              loading="lazy"
              className={`transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              {...props}
            />
          )}
        </>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 p-4">
          <div className="text-4xl mb-2">📷</div>
          <span className="text-sm text-center mb-3">Image unavailable</span>
          <button
            onClick={handleRetry}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            aria-label="Retry loading image"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
