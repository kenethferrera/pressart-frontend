import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ImageModal = ({ 
  isOpen, 
  onClose, 
  imageSrc, 
  imageAlt = '', 
  itemCode = '',
  images = [],
  currentIndex = 0,
  onNavigate = null,
  showInfo = true 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (onNavigate && currentIndex > 0) {
            onNavigate(currentIndex - 1);
          }
          break;
        case 'ArrowRight':
          if (onNavigate && currentIndex < images.length - 1) {
            onNavigate(currentIndex + 1);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate, currentIndex, images.length]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset loading state when image changes
  useEffect(() => {
    if (imageSrc) {
      setLoading(true);
      setError(false);
    }
  }, [imageSrc]);

  // Copy item code to clipboard
  const copyItemCode = async () => {
    if (!itemCode) return;

    try {
      await navigator.clipboard.writeText(itemCode);
      toast.success('Item code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy item code:', err);
      toast.error('Failed to copy item code');
    }
  };

  // Handle image load
  const handleImageLoad = () => {
    setLoading(false);
    setError(false);
  };

  // Handle image error
  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  // Navigate to previous image
  const goToPrevious = () => {
    if (onNavigate && currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  // Navigate to next image
  const goToNext = () => {
    if (onNavigate && currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-90" />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-7xl max-h-full mx-4 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>

          {/* Navigation Arrows */}
          {onNavigate && images.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full transition-all ${
                  currentIndex === 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-opacity-70'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                disabled={currentIndex === images.length - 1}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full transition-all ${
                  currentIndex === images.length - 1 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-opacity-70'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </button>
            </>
          )}

          {/* Image Container */}
          <div className="relative flex-1 flex items-center justify-center">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}

            {error && (
              <div className="text-white text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Failed to load image</p>
              </div>
            )}

            {imageSrc && (
              <img
                src={imageSrc}
                alt={imageAlt}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                  loading ? 'opacity-0' : 'opacity-100'
                }`}
              />
            )}
          </div>

          {/* Info Bar */}
          {showInfo && (itemCode || (onNavigate && images.length > 1)) && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-black bg-opacity-75 text-white p-4 rounded-b-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {itemCode && (
                    <button
                      onClick={copyItemCode}
                      className="flex items-center space-x-2 px-3 py-1 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                        />
                      </svg>
                      <span className="text-sm font-medium">{itemCode}</span>
                    </button>
                  )}
                </div>

                {onNavigate && images.length > 1 && (
                  <div className="text-sm text-gray-300">
                    {currentIndex + 1} of {images.length}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;


