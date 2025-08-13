import apiRequest from './api';

// Authentication Service
export const authService = {
  // Login with Google OAuth token
  loginWithGoogle: async (googleToken, userData) => {
    try {
      const response = await apiRequest('/auth/google', {
        method: 'POST',
        body: JSON.stringify({
          googleToken,
          userData
        }),
      });

      if (response.success) {
        // Store the JWT token
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('authUser', JSON.stringify(response.user));
        return response;
      }

      throw new Error(response.message || 'Login failed');
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await apiRequest('/auth/me');
      return response;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await apiRequest('/auth/verify-token', {
        method: 'POST',
      });
      return response;
    } catch (error) {
      console.error('Token verification error:', error);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await apiRequest('/auth/logout', {
        method: 'POST',
      });
      
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      
      return { success: true };
    } catch (error) {
      // Even if API fails, clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      console.error('Logout error:', error);
      return { success: true }; // Don't throw error for logout
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('authUser');
    return !!(token && user);
  },

  // Get stored user data
  getStoredUser: () => {
    try {
      const user = localStorage.getItem('authUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing stored user:', error);
      return null;
    }
  }
};

