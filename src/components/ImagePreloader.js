import React, { useEffect } from 'react';

const ImagePreloader = ({ images = [] }) => {
  useEffect(() => {
    // Preload critical images
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  return null; // This component doesn't render anything
};

export default ImagePreloader;
