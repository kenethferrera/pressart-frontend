// ImageKit.io configuration
export const IMAGEKIT_CONFIG = {
  urlEndpoint: process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT || 'your-url-endpoint-here',
  publicKey: process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY || 'your-public-key-here',
  authenticationEndpoint: process.env.REACT_APP_IMAGEKIT_AUTHENTICATION_ENDPOINT || 'your-auth-endpoint-here'
};

// ImageKit URL builder
export const buildImageKitUrl = (imagePath, options = {}) => {
  const {
    width = 'auto',
    height = 'auto',
    quality = 'auto',
    format = 'auto',
    crop = 'at_max',
    focus = 'auto'
  } = options;

  const baseUrl = `https://ik.imagekit.io/${IMAGEKIT_CONFIG.urlEndpoint}`;
  let transformations = [];
  
  if (width !== 'auto') transformations.push(`w-${width}`);
  if (height !== 'auto') transformations.push(`h-${height}`);
  if (quality !== 'auto') transformations.push(`q-${quality}`);
  if (format !== 'auto') transformations.push(`f-${format}`);
  if (crop !== 'at_max') transformations.push(`c-${crop}`);
  if (focus !== 'auto') transformations.push(`fo-${focus}`);
  
  const transformString = transformations.length > 0 ? `?tr=${transformations.join(',')}` : '';
  
  return `${baseUrl}/${imagePath}${transformString}`;
};

// Responsive image sizes
export const RESPONSIVE_SIZES = {
  thumbnail: 150,
  small: 300,
  medium: 600,
  large: 900,
  xlarge: 1200
};

// Generate responsive image URLs
export const generateResponsiveImages = (imagePath) => {
  return Object.entries(RESPONSIVE_SIZES).map(([size, width]) => ({
    size,
    width,
    url: buildImageKitUrl(imagePath, { width, height: 'auto' })
  }));
};

// Upload image to ImageKit
export const uploadToImageKit = async (file, fileName, folder = '') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', fileName);
  if (folder) formData.append('folder', folder);
  formData.append('publicKey', IMAGEKIT_CONFIG.publicKey);
  formData.append('useUniqueFileName', 'true');

  try {
    const response = await fetch(IMAGEKIT_CONFIG.authenticationEndpoint, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('ImageKit upload failed:', error);
    throw error;
  }
};

// Image optimization utilities
export const optimizeImageLoading = {
  // Progressive loading strategy
  progressive: (imagePath, placeholderPath) => {
    return {
      low: placeholderPath,
      high: imagePath
    };
  },
  
  // Lazy loading with intersection observer
  lazy: (imagePath, options = {}) => {
    return {
      src: imagePath,
      loading: 'lazy',
      decoding: 'async',
      ...options
    };
  },
  
  // Responsive images
  responsive: (imagePath, sizes = []) => {
    return sizes.map(size => ({
      src: buildImageKitUrl(imagePath, { width: size, height: 'auto' }),
      media: `(max-width: ${size}px)`
    }));
  }
};
