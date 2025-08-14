import React, { useState, useEffect, useRef, useMemo } from 'react';
import LazyImage from './LazyImage';

const VirtualizedImageGrid = ({ images = [], itemsPerPage = 20 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  // Calculate which images to show
  const visibleImages = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return images.slice(startIndex, endIndex);
  }, [images, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(images.length / itemsPerPage);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (scrolledToBottom && currentPage < totalPages && !isLoading) {
        setIsLoading(true);
        // Simulate loading delay
        setTimeout(() => {
          setCurrentPage(prev => prev + 1);
          setIsLoading(false);
        }, 300);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentPage, totalPages, isLoading]);

  return (
    <div className="space-y-6">
      {/* Image Grid */}
      <div 
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-h-96 overflow-y-auto"
      >
        {visibleImages.map((imagePath, index) => {
          const itemCode = generateItemCode(imagePath, 'paintings'); // Adjust category as needed
          
          return (
            <div key={`${currentPage}-${index}`} className="group relative">
              <LazyImage
                src={imagePath}
                alt={`Artwork ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => {/* Handle image click */}}
              />
              
              {/* Item Code Display */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono">{itemCode}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(itemCode);
                      // Show toast notification
                    }}
                    className="text-blue-300 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="text-center text-sm text-gray-600">
        Showing {visibleImages.length} of {images.length} images
        {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
      </div>
    </div>
  );
};

// Helper function (you can import this from your categories.js)
const generateItemCode = (filename, categoryId) => {
  const prefix = 'PAINTINGS';
  const numberMatch = filename.match(/(\d+)/);
  const number = numberMatch ? parseInt(numberMatch[1]) : 1;
  return `${prefix}-${number.toString().padStart(2, '0')}`;
};

export default VirtualizedImageGrid;

