/**
 * Performance monitoring and optimization utilities
 */

// Performance monitoring utilities
export const measureImageLoadTime = (imageSrc) => {
  const startTime = performance.now();
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      console.log(`Image loaded in ${loadTime.toFixed(2)}ms:`, imageSrc);
      resolve(loadTime);
    };
    img.onerror = () => {
      console.warn(`Failed to load image:`, imageSrc);
      resolve(null);
    };
    img.src = imageSrc;
  });
};

export const measurePageLoadTime = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
      
      // Log Core Web Vitals
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log(`${entry.name}: ${entry.value.toFixed(2)}ms`);
          }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      }
    });
  }
};

export const preloadCriticalImages = (imageUrls) => {
  const promises = imageUrls.map(url => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  });
  
  return Promise.all(promises);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// React performance hooks
export const usePerformanceOptimization = () => {
  const shouldReduceAnimations = () => {
    return false; // Placeholder, needs actual implementation
  };

  const getOptimalImageQuality = () => {
    return 'high'; // Placeholder, needs actual implementation
  };

  return {
    shouldReduceAnimations,
    getOptimalImageQuality
  };
};


