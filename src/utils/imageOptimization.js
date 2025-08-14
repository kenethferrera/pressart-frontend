// Image optimization utilities
export const getOptimalImageFormat = () => {
  // Check browser support for modern formats
  const canvas = document.createElement('canvas');
  
  // Test AVIF support
  try {
    canvas.toDataURL('image/avif');
    return 'avif';
  } catch (e) {
    // AVIF not supported
  }
  
  // Test WebP support
  try {
    canvas.toDataURL('image/webp');
    return 'webp';
  } catch (e) {
    // WebP not supported
  }
  
  return 'jpg'; // Fallback
};

export const getImageSize = (originalSrc, size = 'medium') => {
  // This would integrate with an image CDN like Cloudinary or ImageKit
  // For now, return the original source
  return originalSrc;
};

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to preload: ${src}`));
    img.src = src;
  });
};

export const preloadImages = (imageUrls) => {
  const promises = imageUrls.map(url => preloadImage(url));
  return Promise.allSettled(promises);
};

export const createImagePlaceholder = (width, height, text = 'Loading...') => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add text
  ctx.fillStyle = '#9ca3af';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  
  return canvas.toDataURL();
};

export const optimizeImageLoading = {
  // Progressive loading strategy
  progressive: (src, placeholderSrc) => {
    return {
      low: placeholderSrc,
      high: src
    };
  },
  
  // Lazy loading with intersection observer
  lazy: (src, options = {}) => {
    return {
      src,
      loading: 'lazy',
      decoding: 'async',
      ...options
    };
  },
  
  // Responsive images
  responsive: (src, sizes = []) => {
    return sizes.map(size => ({
      src: getImageSize(src, size),
      media: `(max-width: ${size}px)`
    }));
  }
};

