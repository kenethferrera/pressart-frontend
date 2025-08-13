import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from '../components/CategoryCard';
import { categories } from '../config/categories';

const Shop = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {[
            {
              q: 'How do I place an order?',
              a: 'Copy the Item Code from any image, open the purple Checkout Assistant, paste the code, then proceed to checkout.'
            },
            {
              q: 'What sizes are available?',
              a: 'Most artworks are available in Small (8x10\") to X-Large (20x24\"). Availability can vary by item.'
            },
            {
              q: 'Do you accept custom requests?',
              a: 'Yes. Use the Custom Decor page to describe your idea and we will follow up with options and pricing.'
            },
            {
              q: 'How will I receive my order?',
              a: 'We confirm details in chat and provide delivery or pickup information depending on your location.'
            }
          ].map((item, idx) => (
            <motion.details key={idx} initial={false} animate={{opacity:1}} className="bg-white rounded-lg shadow-sm border p-4" open={idx===0}>
              <summary className="cursor-pointer font-semibold text-gray-900 mb-2">{item.q}</summary>
              <p className="text-gray-700 text-sm">{item.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;

