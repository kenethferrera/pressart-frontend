import apiRequest from './api';

// Cart Service
export const cartService = {
  // Get user's cart
  getCart: async () => {
    try {
      const response = await apiRequest('/cart');
      return response;
    } catch (error) {
      console.error('Get cart error:', error);
      throw error;
    }
  },

  // Add item to cart
  addItem: async (itemData) => {
    try {
      const { code, size, quantity, price } = itemData;
      const response = await apiRequest('/cart/add', {
        method: 'POST',
        body: JSON.stringify({
          code,
          size,
          quantity,
          price
        }),
      });
      return response;
    } catch (error) {
      console.error('Add to cart error:', error);
      throw error;
    }
  },

  // Update cart item
  updateItem: async (itemId, itemData) => {
    try {
      const { size, quantity, price } = itemData;
      const response = await apiRequest(`/cart/update/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify({
          size,
          quantity,
          price
        }),
      });
      return response;
    } catch (error) {
      console.error('Update cart item error:', error);
      throw error;
    }
  },

  // Remove item from cart
  removeItem: async (itemId) => {
    try {
      const response = await apiRequest(`/cart/remove/${itemId}`, {
        method: 'DELETE',
      });
      return response;
    } catch (error) {
      console.error('Remove cart item error:', error);
      throw error;
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      const response = await apiRequest('/cart/clear', {
        method: 'DELETE',
      });
      return response;
    } catch (error) {
      console.error('Clear cart error:', error);
      throw error;
    }
  },

  // Sync local cart with server
  syncCart: async (localCartItems) => {
    try {
      const response = await apiRequest('/cart/sync', {
        method: 'POST',
        body: JSON.stringify({
          localCartItems
        }),
      });
      return response;
    } catch (error) {
      console.error('Sync cart error:', error);
      throw error;
    }
  },

  // Offline cart operations (fallback to localStorage)
  offline: {
    getCart: () => {
      try {
        const cart = localStorage.getItem('pressart-cart-guest');
        return cart ? JSON.parse(cart) : [];
      } catch (error) {
        console.error('Error reading offline cart:', error);
        return [];
      }
    },

    setCart: (cartItems) => {
      try {
        localStorage.setItem('pressart-cart-guest', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving offline cart:', error);
      }
    },

    addItem: (itemData) => {
      const cart = cartService.offline.getCart();
      const newItem = {
        id: Date.now(), // Simple ID for offline items
        ...itemData,
        total: itemData.price * itemData.quantity,
        addedAt: new Date().toISOString()
      };
      cart.push(newItem);
      cartService.offline.setCart(cart);
      return cart;
    },

    removeItem: (itemId) => {
      const cart = cartService.offline.getCart();
      const updatedCart = cart.filter(item => item.id !== itemId);
      cartService.offline.setCart(updatedCart);
      return updatedCart;
    },

    clearCart: () => {
      localStorage.removeItem('pressart-cart-guest');
      return [];
    }
  }
};

