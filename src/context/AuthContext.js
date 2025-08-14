import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';

// Create Auth Context
const AuthContext = createContext();

// Auth Context Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check for existing authentication session
  const checkExistingSession = React.useCallback(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('authUser');

      if (storedToken && storedUser) {
        // Validate token expiration
        const decodedToken = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          // Token is valid
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          // Token expired
          clearSession();
          toast.error('Session expired. Please log in again.');
        }
      }
    } catch (error) {
      console.error('Error checking existing session:', error);
      clearSession();
    } finally {
      setLoading(false);
    }
  }, []);

  // Check for existing session on app load
  useEffect(() => {
    checkExistingSession();
  }, [checkExistingSession]);

  // Handle successful Google OAuth login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
      const decodedUser = jwtDecode(googleToken);
      
      // Extract user information for backend
      const userData = {
        sub: decodedUser.sub,
        email: decodedUser.email,
        name: decodedUser.name,
        picture: decodedUser.picture,
        given_name: decodedUser.given_name,
        family_name: decodedUser.family_name,
        email_verified: decodedUser.email_verified
      };

      // Send to backend API
      const response = await authService.loginWithGoogle(googleToken, userData);
      
      if (response.success) {
        // Store in state
        setUser(response.user);
        setToken(response.token);

        toast.success(`Welcome back, ${response.user.given_name || response.user.name}!`);
        
        // Trigger cart sync event
        window.dispatchEvent(new CustomEvent('userLoggedIn', { 
          detail: { user: response.user } 
        }));
        
        return response.user;
      }
    } catch (error) {
      console.error('Error processing Google login:', error);
      toast.error('Failed to process login. Please try again.');
      return null;
    }
  };

  // Handle Google OAuth error
  const handleGoogleError = (error) => {
    console.error('Google OAuth Error:', error);
    toast.error('Login failed. Please try again.');
  };

  // Clear authentication session
  const clearSession = React.useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }, []);

  // Logout function
  const logout = React.useCallback(async () => {
    try {
      await authService.logout();
      clearSession();
      
      // Trigger cart clear event
      window.dispatchEvent(new CustomEvent('userLoggedOut'));
      
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      clearSession();
      toast.success('Logged out successfully');
    }
  }, [clearSession]);

  // Check if user is authenticated
  const isAuthenticated = React.useCallback(() => {
    return user !== null && token !== null;
  }, [user, token]);

  // Check if token is expired
  const isTokenExpired = React.useCallback(() => {
    if (!token) return true;
    
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp <= currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }, [token]);

  // Auto-logout when token expires
  useEffect(() => {
    if (token && isTokenExpired()) {
      logout();
      toast.error('Session expired. Please log in again.');
    }
  }, [token, isTokenExpired, logout]);

  // Periodic token validation (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      if (token && isTokenExpired()) {
        logout();
        toast.error('Session expired. Please log in again.');
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [token, isTokenExpired, logout]);

  // Get user's initials for avatar
  const getUserInitials = () => {
    if (!user) return '';
    
    if (user.given_name && user.family_name) {
      return `${user.given_name[0]}${user.family_name[0]}`.toUpperCase();
    }
    
    if (user.name) {
      const nameParts = user.name.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return nameParts[0][0].toUpperCase();
    }
    
    return user.email ? user.email[0].toUpperCase() : '';
  };

  // Context value
  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    isTokenExpired,
    handleGoogleSuccess,
    handleGoogleError,
    logout,
    clearSession,
    getUserInitials
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-order component for protected routes
export const withAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated()) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-4">
              Please log in to access this page.
            </p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
};

export default AuthContext;
