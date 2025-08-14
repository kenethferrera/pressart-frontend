import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for lazy loading images with Intersection Observer
 * @param {string} src - Image source URL
 * @param {Object} options - Intersection Observer options
 * @returns {Object} - Contains ref, loaded state, error state, and image src
 */
export const useLazyLoad = (src, options = {}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef();

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  };

  useEffect(() => {
    if (!src) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start loading the image
          const img = new Image();
          
          img.onload = () => {
            setImageSrc(src);
            setLoaded(true);
            setError(false);
          };
          
          img.onerror = () => {
            setError(true);
            setLoaded(false);
            console.warn(`Failed to load image: ${src}`);
          };
          
          img.src = src;
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [src, options]);

  return {
    ref: imgRef,
    loaded,
    error,
    imageSrc
  };
};

export default useLazyLoad;
