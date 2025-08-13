/**
 * Performance monitoring and optimization utilities
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      imageLoads: 0,
      failedLoads: 0,
      totalLoadTime: 0,
      averageLoadTime: 0,
      memoryUsage: 0
    };
    this.loadStartTimes = new Map();
  }

  // Start timing an image load
  startImageLoad(src) {
    this.loadStartTimes.set(src, performance.now());
  }

  // End timing an image load
  endImageLoad(src, success = true) {
    const startTime = this.loadStartTimes.get(src);
    if (startTime) {
      const loadTime = performance.now() - startTime;
      this.metrics.totalLoadTime += loadTime;
      this.loadStartTimes.delete(src);
      
      if (success) {
        this.metrics.imageLoads++;
      } else {
        this.metrics.failedLoads++;
      }
      
      this.metrics.averageLoadTime = this.metrics.totalLoadTime / 
        (this.metrics.imageLoads + this.metrics.failedLoads);
    }
  }

  // Update memory usage
  updateMemoryUsage() {
    if ('memory' in performance) {
      this.metrics.memoryUsage = performance.memory.usedJSHeapSize;
    }
  }

  // Get performance metrics
  getMetrics() {
    this.updateMemoryUsage();
    return { ...this.metrics };
  }

  // Log performance summary
  logSummary() {
    const metrics = this.getMetrics();
    console.group('📊 Performance Summary');
    console.log(`✅ Successful loads: ${metrics.imageLoads}`);
    console.log(`❌ Failed loads: ${metrics.failedLoads}`);
    console.log(`⏱️ Average load time: ${metrics.averageLoadTime.toFixed(2)}ms`);
    console.log(`🧠 Memory usage: ${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB`);
    console.groupEnd();
  }

  // Reset metrics
  reset() {
    this.metrics = {
      imageLoads: 0,
      failedLoads: 0,
      totalLoadTime: 0,
      averageLoadTime: 0,
      memoryUsage: 0
    };
    this.loadStartTimes.clear();
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Image optimization utilities
export const imageOptimization = {
  // Check if browser supports AVIF
  supportsAVIF: () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  },

  // Check if browser supports WebP
  supportsWebP: () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  },

  // Get optimal image format
  getOptimalFormat: () => {
    if (imageOptimization.supportsAVIF()) return 'avif';
    if (imageOptimization.supportsWebP()) return 'webp';
    return 'jpg';
  },

  // Preload critical images
  preloadImages: (imagePaths) => {
    const promises = imagePaths.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject(new Error(`Failed to preload: ${src}`));
        img.src = src;
      });
    });
    
    return Promise.allSettled(promises);
  }
};

// Performance optimization helpers
export const performanceHelpers = {
  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle: (func, limit) => {
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
  },

  // Check if device has limited resources
  isLowEndDevice: () => {
    if ('deviceMemory' in navigator) {
      return navigator.deviceMemory <= 4; // 4GB or less
    }
    if ('hardwareConcurrency' in navigator) {
      return navigator.hardwareConcurrency <= 2; // 2 cores or less
    }
    return false; // Assume high-end if unknown
  },

  // Get connection quality
  getConnectionQuality: () => {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      const effectiveType = connection.effectiveType;
      
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        return 'poor';
      } else if (effectiveType === '3g') {
        return 'good';
      } else if (effectiveType === '4g') {
        return 'excellent';
      }
    }
    return 'unknown';
  }
};

// React performance hooks
export const usePerformanceOptimization = () => {
  const shouldReduceAnimations = () => {
    return performanceHelpers.isLowEndDevice() || 
           performanceHelpers.getConnectionQuality() === 'poor';
  };

  const getOptimalImageQuality = () => {
    const connectionQuality = performanceHelpers.getConnectionQuality();
    const isLowEnd = performanceHelpers.isLowEndDevice();
    
    if (isLowEnd || connectionQuality === 'poor') {
      return 'low';
    } else if (connectionQuality === 'good') {
      return 'medium';
    }
    return 'high';
  };

  return {
    shouldReduceAnimations,
    getOptimalImageQuality
  };
};

export default performanceMonitor;


