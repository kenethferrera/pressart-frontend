import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from './LazyImage';
import { generateImageKitUrl } from '../config/categories';

const CategoryCard = ({ category, index = 0 }) => {
  const isCustomDecor = category.isCustom;

  return (
    <motion.div
      initial={false}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer"
    >
      <Link 
        to={isCustomDecor ? '/custom-decor' : `/category/${category.id}`}
        className="block"
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <LazyImage
            src={generateImageKitUrl(category.previewImage, { width: 400, height: 300, quality: 80 })}
            alt={category.name}
            className="w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
          
          {/* Item count badge */}
          {!isCustomDecor && category.itemCount && (
            <div className="absolute top-3 right-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              {category.itemCount} items
            </div>
          )}
          
          {/* Custom decor badge */}
          {isCustomDecor && (
            <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              Custom
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
            {category.name}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {category.description}
          </p>
          
          {/* Action button */}
          <div className="flex items-center justify-between">
            <span className="text-primary-600 text-sm font-medium group-hover:text-primary-700">
              {isCustomDecor ? 'Request Custom Art' : 'View Collection'}
            </span>
            
            <motion.div
              initial={false}
              whileHover={{ x: 5 }}
              className="text-primary-600 group-hover:text-primary-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;


