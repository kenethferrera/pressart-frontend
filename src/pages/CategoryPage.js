import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getCategoryById, generateImagePaths, generateItemCode, generateImageKitUrl } from '../config/categories';
import SimpleImageTest from '../components/SimpleImageTest';
import ImageModal from '../components/ImageModal';
// import LazyImage from '../components/LazyImage';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Refs to prevent infinite re-renders
  const initializedRef = useRef(false);
  const categoryRef = useRef(null);

  // Initialize category and images
  useEffect(() => {
    if (initializedRef.current && categoryRef.current?.id === categoryId) {
      return; // Already initialized for this category
    }

    const foundCategory = getCategoryById(categoryId);
    
    if (!foundCategory) {
      toast.error('Category not found');
      navigate('/shop');
      return;
    }

    if (foundCategory.isCustom) {
      navigate('/custom-decor');
      return;
    }

    setCategory(foundCategory);
    categoryRef.current = foundCategory;
    
    // Generate image paths
    const imagePaths = generateImagePaths(foundCategory);
    setImages(imagePaths);
    
    setLoading(false);
    initializedRef.current = true;
  }, [categoryId, navigate]);

  // Handle image click
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  // Handle modal navigation
  const handleModalNavigation = (newIndex) => {
    setSelectedImageIndex(newIndex);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImageIndex(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          
          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h2>
          <p className="text-gray-600 mb-4">The requested category could not be found.</p>
          <Link 
            to="/shop" 
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header (compact with checkout steps) */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link to="/shop" className="text-gray-500 hover:text-primary-600">
                  Shop
                </Link>
              </li>
              <li>
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <span className="text-gray-900 font-medium">{category.name}</span>
              </li>
            </ol>
          </nav>

          {/* Checkout steps CTA (3 steps) */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 md:p-5 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h2 className="text-lg md:text-xl font-semibold">Quick Checkout in 3 Steps</h2>
                <a href="#" className="inline-flex items-center gap-2 bg-white text-purple-700 hover:bg-purple-50 font-semibold px-4 py-2 rounded-lg shadow transition-colors">
                  Open Checkout Assistant
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
              </div>
              <ol className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-purple-700 text-xs mt-0.5 font-bold">1</span>
                  <span>Copy the <strong>Item Code</strong> under any image (e.g., <code className="px-1 rounded bg-white/90 text-purple-700">PSICODELICAS-04</code>).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-purple-700 text-xs mt-0.5 font-bold">2</span>
                  <span>Click the <strong>purple</strong> floating cart to open the assistant.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-purple-700 text-xs mt-0.5 font-bold">3</span>
                  <span><strong>Paste</strong> the code and add it to your cart.</span>
                </li>
              </ol>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Images Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {images.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Images Available</h3>
            <p className="text-gray-600">This category doesn't have any images yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {images.map((imagePath, index) => (
              <motion.div
                key={`${category.id}-${index}`}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.02 }}
              >
                <SimpleImageTest
                  imageSrc={imagePath}
                  categoryId={category.id}
                  index={index}
                  onClick={() => handleImageClick(index)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={closeModal}
        imageSrc={selectedImageIndex !== null ? images[selectedImageIndex] : ''}
        imageAlt={`${category.name} artwork ${selectedImageIndex + 1}`}
        itemCode={
          selectedImageIndex !== null 
            ? generateItemCode(images[selectedImageIndex], category.id)
            : ''
        }
        images={images}
        currentIndex={selectedImageIndex || 0}
        onNavigate={handleModalNavigation}
      />
    </div>
  );
};

export default CategoryPage;

