import React from 'react';
import { motion } from 'framer-motion';
import useLazyLoad from '../hooks/useLazyLoad';

/**
 * LazyImage component with loading states and animations
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler
 * @param {Object} props.style - Inline styles
 * @param {string} props.placeholderSrc - Placeholder image source
 * @returns {JSX.Element} - LazyImage component
 */
const LazyImage = ({ 
  src, 
  alt = '', 
  className = '', 
  onClick, 
  style,
  placeholderSrc = '/placeholder-image.svg',
  ...props 
}) => {
  const { ref, loaded, error, imageSrc } = useLazyLoad(src);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={style}
      onClick={onClick}
      {...props}
    >
      {/* Loading placeholder */}
      {!loaded && !error && (
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-200 flex items-center justify-center"
        >
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 text-gray-400">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error state */}
      {error && (
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500"
        >
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 text-gray-400">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xs">Failed to load</span>
          </div>
        </motion.div>
      )}

      {/* Actual image */}
      {loaded && imageSrc && (
        <motion.img
          src={imageSrc}
          alt={alt}
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => {
            console.warn(`Image failed to display: ${imageSrc}`);
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;


