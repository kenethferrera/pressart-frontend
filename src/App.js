import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import CheckoutChatbot from './components/CheckoutChatbot';
import PerformanceDashboard from './components/PerformanceDashboard';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CategoryPage from './pages/CategoryPage';
import About from './pages/About';
import Contact from './pages/Contact';
import CustomDecorPage from './pages/CustomDecorPage';
import Login from './pages/Login';

// Import console filter to reduce noise
import './utils/consoleFilter';

function App() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen bg-gray-50">
            <Navigation />
            
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/custom-decor" element={<CustomDecorPage />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>

            {/* Global Components */}
            <CheckoutChatbot />
            <PerformanceDashboard />
            
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  theme: {
                    primary: '#4aed88',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
