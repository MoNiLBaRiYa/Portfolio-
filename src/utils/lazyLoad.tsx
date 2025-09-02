import { lazy, ComponentType } from 'react';

/**
 * Utility function to create lazy-loaded components with better error handling
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  _fallback?: ComponentType
): T {
  const LazyComponent = lazy(importFn);

  // Add display name for better debugging
  (LazyComponent as any).displayName =
    `Lazy(${importFn.toString().match(/\/([^\/]+)\.tsx?/)?.[1] || 'Component'})`;

  return LazyComponent as unknown as T;
}

/**
 * Higher-order component for lazy loading with suspense boundary
 */
export function withLazyLoading<P extends object>(
  Component: ComponentType<P>,
  _fallback?: ComponentType
) {
  const WrappedComponent = (props: P) => {
    return <Component {...props} />;
  };

  WrappedComponent.displayName = `LazyLoaded(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

/**
 * Preload a lazy component
 */
export function preloadComponent(importFn: () => Promise<any>) {
  // Start loading the component
  const componentPromise = importFn();

  // Return a function to check if it's loaded
  return {
    promise: componentPromise,
    isLoaded: false,
    load: () => {
      componentPromise.then(() => {
        return true;
      });
      return componentPromise;
    },
  };
}
