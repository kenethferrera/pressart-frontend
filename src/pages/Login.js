import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const { handleGoogleSuccess, handleGoogleError } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to PressArt
            </h2>
            <p className="text-gray-600 mb-8">
              Sign in to access exclusive features and manage your orders
            </p>
          </div>

          <div className="space-y-4">
            {/* Google Login Button */}
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="filled_blue"
              size="large"
              text="signin_with"
              shape="rectangular"
              width="100%"
            />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Benefits of signing in
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-red-500 mr-3">✓</span>
                <span className="text-gray-700">Save your favorite artworks</span>
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-3">✓</span>
                <span className="text-gray-700">Track your orders</span>
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-3">✓</span>
                <span className="text-gray-700">Faster checkout process</span>
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-3">✓</span>
                <span className="text-gray-700">Exclusive member discounts</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
