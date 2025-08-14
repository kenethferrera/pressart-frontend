import React, { useState } from 'react';
import { buildImageKitUrl } from '../utils/imagekitConfig';

const ImageKitImage = ({ 
  imagePath, 
  alt, 
  className = '', 
  width = 'auto',
  height = 'auto',
  quality = 'auto',
  format = 'auto',
  crop = 'at_max',
  focus = 'auto',
  placeholder = true,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Build ImageKit URL with optimizations
  const imageUrl = buildImageKitUrl(imagePath, {
    width,
    height,
    quality,
    format,
    crop,
    focus
  });

  // Placeholder URL (blurred, low quality)
  const placeholderUrl = placeholder ? buildImageKitUrl(imagePath, {
    width: 50,
    height: 50,
    quality: 10,
    format: 'auto',
    crop: 'at_max',
    focus: 'auto'
  }) : null;

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder (blurred) */}
      {placeholder && placeholderUrl && !isLoaded && !hasError && (
        <img
          src={placeholderUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
          style={{ filter: 'blur(10px)' }}
        />
      )}
      
      {/* Loading spinner */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-500 text-sm text-center">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Image unavailable
          </div>
        </div>
      )}
      
      {/* Optimized image */}
      <img
        src={imageUrl}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${hasError ? 'hidden' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
};

export default ImageKitImage;

