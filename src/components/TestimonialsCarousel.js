import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing quality prints! The colors are vibrant and the detail is incredible. Will definitely order again.',
      avatar: '🎨'
    },
    {
      id: 2,
      name: 'Mike Chen',
      rating: 5,
      comment: 'Fast delivery and excellent customer service. The artwork looks even better in person than in the photos.',
      avatar: '🖼️'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      rating: 5,
      comment: 'Love the variety of art styles available. Found the perfect piece for my living room. Highly recommend!',
      avatar: '✨'
    },
    {
      id: 4,
      name: 'David Thompson',
      rating: 5,
      comment: 'The custom decor service exceeded my expectations. They captured exactly what I was looking for.',
      avatar: '🎯'
    }
  ];

  // Auto-rotation disabled as per guide
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  //   }, 4000);
  //   return () => clearInterval(timer);
  // }, [testimonials.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our amazing customers have to say about their experience with PressArt.
          </p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center"
            >
              <div className="text-6xl mb-6">
                {testimonials[currentTestimonial].avatar}
              </div>
              
              <div className="flex justify-center mb-4">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              
              <blockquote className="text-lg text-gray-700 mb-6 italic">
                "{testimonials[currentTestimonial].comment}"
              </blockquote>
              
              <div className="font-semibold text-gray-900">
                {testimonials[currentTestimonial].name}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentTestimonial
                  ? 'bg-primary-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;



