import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const CustomDecorPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    description: '',
    size: '',
    style: '',
    budget: '',
    timeline: '',
    inspiration: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = [
    'Wall Art',
    'Digital Illustration',
    'Logo Design',
    'Poster Design',
    'Business Graphics',
    'Personal Portrait',
    'Other'
  ];

  const styles = [
    'Modern/Minimalist',
    'Abstract',
    'Realistic',
    'Cartoon/Illustration',
    'Vintage/Retro',
    'Psychedelic',
    'Geometric',
    'Nature/Organic',
    'Other'
  ];

  const budgetRanges = [
    '$50 - $100',
    '$100 - $250',
    '$250 - $500',
    '$500 - $1000',
    '$1000+',
    'Let\'s discuss'
  ];

  const timelines = [
    '1-2 weeks',
    '2-4 weeks',
    '1-2 months',
    '2+ months',
    'No rush'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Custom artwork request submitted! We\'ll contact you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        projectType: '',
        description: '',
        size: '',
        style: '',
        budget: '',
        timeline: '',
        inspiration: ''
      });
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Custom Artwork Services
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Bring your vision to life with personalized artwork created just for you. 
              Our talented artists work with you to create something truly unique.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* How It Works */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm mr-4 mt-1">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Submit Your Request</h3>
                      <p className="text-gray-600 text-sm">Fill out the form with your project details, style preferences, and requirements.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm mr-4 mt-1">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Consultation</h3>
                      <p className="text-gray-600 text-sm">We'll contact you within 24 hours to discuss your project and provide a quote.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm mr-4 mt-1">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Creation Process</h3>
                      <p className="text-gray-600 text-sm">Our artist creates your custom piece with regular updates and revision opportunities.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm mr-4 mt-1">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Final Delivery</h3>
                      <p className="text-gray-600 text-sm">Receive your high-resolution digital file and optional physical prints.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm text-primary-800">
                    <strong>Turnaround Time:</strong> Most custom projects are completed within 2-4 weeks, depending on complexity.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Request Form */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Custom Artwork</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Size
                      </label>
                      <input
                        type="text"
                        id="size"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="e.g., 16x20 inches, A4, Custom"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Describe your vision, what you want created, and any specific requirements..."
                    />
                  </div>

                  {/* Style and Preferences */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
                        Style Preference
                      </label>
                      <select
                        id="style"
                        name="style"
                        value={formData.style}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select style</option>
                        {styles.map(style => (
                          <option key={style} value={style}>{style}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map(range => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">When do you need this?</option>
                      {timelines.map(timeline => (
                        <option key={timeline} value={timeline}>{timeline}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="inspiration" className="block text-sm font-medium text-gray-700 mb-2">
                      Inspiration & References
                    </label>
                    <textarea
                      id="inspiration"
                      name="inspiration"
                      value={formData.inspiration}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Share links, describe similar artworks, or mention anything that inspires your vision..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-3 rounded-md font-semibold transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Request...
                      </>
                    ) : (
                      'Submit Custom Artwork Request'
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDecorPage;



