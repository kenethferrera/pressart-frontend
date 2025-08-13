import React from 'react';
import LazyImage from './LazyImage';
import { generateItemCode } from '../config/categories';
import toast from 'react-hot-toast';

const SimpleImageTest = ({ imageSrc, categoryId, index = 0, onClick }) => {
  // Generate item code from image path
  const itemCode = generateItemCode(imageSrc, categoryId);
  
  // Copy item code to clipboard
  const copyItemCode = async (e) => {
    e.stopPropagation(); // Prevent triggering the image click
    try {
      await navigator.clipboard.writeText(itemCode);
      toast.success('Item code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy item code:', err);
      toast.error('Failed to copy item code');
    }
  };
  
  return (
    <div className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      {/* Image Container */}
      <div 
        className="cursor-pointer mb-3"
        onClick={onClick}
      >
        <LazyImage
          src={imageSrc}
          alt={`${categoryId} artwork ${index + 1}`}
          className="w-full h-48 sm:h-64 rounded-lg"
        />
      </div>

      {/* Item Code Section */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-900">
          Item Code: {itemCode}
        </span>
        <button
          onClick={copyItemCode}
          className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
          title="Copy item code"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
            />
          </svg>
        </button>
      </div>

      {/* Click to view text */}
      <p className="text-xs text-gray-500 text-center">
        Click image to view full size
      </p>


    </div>
  );
};

export default SimpleImageTest;
