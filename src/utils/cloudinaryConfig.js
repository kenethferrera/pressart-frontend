// Cloudinary configuration (optional - for future use)
export const CLOUDINARY_CONFIG = {
  cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your-cloud-name',
  uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'pressart-images'
};

// Cloudinary URL builder
export const buildCloudinaryUrl = (publicId, options = {}) => {
  const {
    width = 'auto',
    height = 'auto',
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto'
  } = options;

  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload`;
  const transformations = `f_${format},q_${quality},c_${crop},g_${gravity}`;
  
  if (width !== 'auto') transformations += `,w_${width}`;
  if (height !== 'auto') transformations += `,h_${height}`;

  return `${baseUrl}/${transformations}/${publicId}`;
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
export const generateResponsiveImages = (publicId) => {
  return Object.entries(RESPONSIVE_SIZES).map(([size, width]) => ({
    size,
    width,
    url: buildCloudinaryUrl(publicId, { width, height: 'auto' })
  }));
};

// Upload image to Cloudinary
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    const data = await response.json();
    return data.public_id;
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw error;
  }
};
