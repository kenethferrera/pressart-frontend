import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { generateImagePaths, getCategoryById } from '../config/categories';
import { useAuth } from '../context/AuthContext';
import { cartService } from '../services/cartService';

const CheckoutChatbot = () => {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPositioned, setIsPositioned] = useState(false);
  const [pastedCode, setPastedCode] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [editingItem, setEditingItem] = useState(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isValidCode, setIsValidCode] = useState(false);

  const sizes = [
    { id: 'S', name: 'Small (8x10")', price: 15 },
    { id: 'M', name: 'Medium (11x14")', price: 25 },
    { id: 'L', name: 'Large (16x20")', price: 40 },
    { id: 'XL', name: 'X-Large (20x24")', price: 60 }
  ];

  // Image resolution from item codes - matches the generateItemCode logic
  const findImageByCode = (code) => {
    if (!code) return null;
    
    const parts = code.split('-');
    const itemNumber = parseInt(parts[parts.length - 1]);
    const categoryKey = parts.slice(0, -1).join('-');
    
    // Map category prefixes back to category IDs
    const categoryPrefixMap = {
      'AMONG': 'among-us',
      'PSICODELICAS': 'artes-psicodelicas', 
      'COLLAGE': 'collage',
      'HEROES': 'dc-heroes',
      'DIGITAL': 'digital-illustration',
      'DOODLE': 'doodle-art',
      'ESOTERIC': 'esoteric',
      'LOL': 'league-of-legends',
      'MORTAL': 'mortal-kombat',
      'MOTIVATIONAL': 'motivational',
      'PAINTINGS': 'paintings',
      'RELIGION': 'religion',
      'SPACE': 'space'
    };
    
    const categoryId = categoryPrefixMap[categoryKey];
    if (!categoryId) return null;
    
    const category = getCategoryById(categoryId);
    if (!category) return null;
    
    // Generate all images for this category
    const categoryImages = generateImagePaths(category);
    
    // Get the image at the specified index (itemNumber - 1 since arrays are 0-based)
    const imageIndex = itemNumber - 1;
    if (imageIndex < 0 || imageIndex >= categoryImages.length) return null;
    
    const imagePath = categoryImages[imageIndex];
    
    return {
      src: imagePath,
      alt: `${code} - ${category.name}`,
      itemCode: code
    };
  };

  // Set initial position and handle window resize
  useEffect(() => {
    const updatePosition = () => {
      const buttonWidth = 64;
      const halfButton = buttonWidth / 2; // Half button width for partial visibility
      const newX = window.innerWidth - halfButton; // Position so only half is visible
      const newY = (window.innerHeight / 2) - 150; // Above middle by 150px
      setPosition({ x: newX, y: newY });
      setIsPositioned(true);
    };

    // Wait for the next frame to ensure DOM is ready
    const rafId = requestAnimationFrame(() => {
      updatePosition();
    });

    const handleResize = () => {
      updatePosition();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Load cart from API or localStorage
  const loadCart = async () => {
    try {
      if (isAuthenticated()) {
        // Load from API for authenticated users
        const response = await cartService.getCart();
        if (response.success) {
          setCartItems(response.cart.items || []);
          if (response.cart.items?.length > 0) {
            toast.success(`Welcome back! You have ${response.cart.items.length} items in your cart.`);
          }
        }
      } else {
        // Load from localStorage for guest users
        const guestCart = cartService.offline.getCart();
        setCartItems(guestCart || []);
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
      // Fallback to localStorage
      const guestCart = cartService.offline.getCart();
      setCartItems(guestCart || []);
    }
  };

  // Load cart on mount and when authentication changes
  useEffect(() => {
    loadCart();
  }, [user, isAuthenticated]);

  // Listen for login/logout events to sync cart
  useEffect(() => {
    const handleUserLogin = async (event) => {
      try {
        // Get current guest cart
        const guestCart = cartService.offline.getCart();
        
        if (guestCart.length > 0) {
          // Sync guest cart with server
          const response = await cartService.syncCart(guestCart);
          if (response.success) {
            setCartItems(response.cart.items || []);
            cartService.offline.clearCart(); // Clear guest cart
            toast.success(`Your cart has been saved to your account! (${guestCart.length} items)`);
          }
        } else {
          // Just load the user's existing cart
          loadCart();
        }
      } catch (error) {
        console.error('Error syncing cart on login:', error);
        loadCart(); // Fallback to normal load
      }
    };

    const handleUserLogout = () => {
      // Clear cart and load guest cart
      setCartItems([]);
      const guestCart = cartService.offline.getCart();
      setCartItems(guestCart || []);
    };

    window.addEventListener('userLoggedIn', handleUserLogin);
    window.addEventListener('userLoggedOut', handleUserLogout);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLogin);
      window.removeEventListener('userLoggedOut', handleUserLogout);
    };
  }, []);

  // Handle code input change
  const handleCodeChange = (e) => {
    const code = e.target.value.trim();
    setPastedCode(code);
    const valid = code.length > 0 && !!findImageByCode(code);
    setIsValidCode(valid);
    setShowOptions(valid);
  };

  // Handle paste functionality
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const code = text.trim();
      setPastedCode(code);
      const valid = code.length > 0 && !!findImageByCode(code);
      setIsValidCode(valid);
      setShowOptions(valid);
      toast.success('Item code pasted!');
    } catch (err) {
      toast.error('Failed to paste from clipboard');
    }
  };

  // Add item to cart
  const addToCart = async () => {
    if (!pastedCode.trim()) {
      toast.error('Please enter an item code');
      return;
    }

    if (!isValidCode) {
      toast.error('Unavailable item code');
      return;
    }

    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    const selectedSizeData = sizes.find(s => s.id === selectedSize);
    const itemData = {
      code: pastedCode.trim(),
      size: selectedSize,
      quantity: selectedQuantity,
      price: selectedSizeData.price
    };

    try {
      if (editingItem) {
        // Update existing item
        if (isAuthenticated()) {
          const response = await cartService.updateItem(editingItem._id || editingItem.id, itemData);
          if (response.success) {
            setCartItems(response.cart.items || []);
            toast.success('Item updated!');
          }
        } else {
          // Update in localStorage for guest
          const updatedCart = cartService.offline.getCart().map(item => 
            item.id === editingItem.id 
              ? { ...item, ...itemData, total: itemData.price * itemData.quantity }
              : item
          );
          cartService.offline.setCart(updatedCart);
          setCartItems(updatedCart);
          toast.success('Item updated!');
        }
        setEditingItem(null);
      } else {
        // Add new item
        if (isAuthenticated()) {
          const response = await cartService.addItem(itemData);
          if (response.success) {
            setCartItems(response.cart.items || []);
            toast.success('Item added to cart!');
          }
        } else {
          // Add to localStorage for guest
          const updatedCart = cartService.offline.addItem(itemData);
          setCartItems(updatedCart);
          toast.success('Item added to cart!');
        }
      }

      // Reset form
      resetForm();
    } catch (error) {
      console.error('Cart operation error:', error);
      toast.error('Failed to update cart. Please try again.');
    }
  };

  // Remove item from cart
  const removeFromCart = async (id) => {
    try {
      if (isAuthenticated()) {
        const response = await cartService.removeItem(id);
        if (response.success) {
          setCartItems(response.cart.items || []);
          setSelectedItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
          toast.success('Item removed from cart');
        }
      } else {
        // Remove from localStorage for guest
        const updatedCart = cartService.offline.removeItem(id);
        setCartItems(updatedCart);
        setSelectedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        toast.success('Item removed from cart');
      }
    } catch (error) {
      console.error('Remove cart item error:', error);
      toast.error('Failed to remove item. Please try again.');
    }
  };

  // Toggle item selection
  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Select all items
  const selectAllItems = () => {
    const allItemIds = cartItems.map(item => item._id || item.id);
    setSelectedItems(new Set(allItemIds));
  };

  // Deselect all items
  const deselectAllItems = () => {
    setSelectedItems(new Set());
  };

  // Edit item
  const editItem = (item) => {
    setPastedCode(item.code);
    setSelectedSize(item.size);
    setSelectedQuantity(item.quantity);
    setShowOptions(true);
    setIsValidCode(true); // Item from cart is always valid
    setEditingItem(item);
  };

  // Cancel editing
  const cancelEdit = () => {
    resetForm();
    setEditingItem(null);
  };

  // Reset form
  const resetForm = () => {
    setPastedCode('');
    setSelectedSize('');
    setSelectedQuantity(1);
    setShowOptions(false);
  };

  // Handle item click for preview
  const handleItemClick = (item) => {
    const imageData = findImageByCode(item.code);
    if (imageData) {
      setPreviewImage(imageData);
      setPreviewModalOpen(true);
    }
  };

  // Calculate totals
  const selectedCartItems = cartItems.filter(item => selectedItems.has(item._id || item.id));
  const selectedTotal = selectedCartItems.reduce((total, item) => total + item.total, 0);

  // Handle checkout
  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      toast.error('Please select items to checkout');
      return;
    }

    // Create WhatsApp message for selected items only
    const message = `Hi! I'd like to order the following items:\n\n${selectedCartItems.map((item, index) => 
      `${index + 1}. ${item.code}\n   Size: ${item.size} (${sizes.find(s => s.id === item.size)?.name})\n   Quantity: ${item.quantity}\n   Price: $${item.total}\n`
    ).join('\n')}\n\nTotal: $${selectedTotal}\n\nThank you!`;

    const whatsappURL = `https://wa.me/+1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <>

      {/* Floating Button - only render when positioned */}
      {isPositioned && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
            isOpen 
              ? 'w-16 h-16 opacity-100 transform translate-x-0' 
              : 'w-10 h-10 opacity-60 transform translate-x-3'
          }`}
          style={{ 
            left: isOpen ? position.x - 32 : position.x, // When open, move left to show full button
            top: position.y,
            zIndex: 9999, 
            userSelect: 'none'
          }}
        >
        {cartItems.length > 0 && (
          <div className={`absolute bg-red-500 text-white text-xs rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? '-top-2 -left-2 w-6 h-6' 
              : '-top-1 -left-1 w-4 h-4 text-xs'
          }`}>
            {cartItems.length}
          </div>
        )}
          <svg className={`fill-none stroke-current transition-all duration-300 ${
            isOpen ? 'w-8 h-8' : 'w-5 h-5'
          }`} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.8 9M7 13l-1.8-9M19 13v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          </svg>
        </button>
      )}

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed right-4 top-[38%] transform -translate-y-1/2 w-80 max-w-[90vw] bg-white rounded-lg shadow-2xl border z-50"
          >
            {/* Header */}
            <div className="bg-purple-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h3 className="font-semibold">Checkout Assistant</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* User Status Indicator */}
              <div className="mt-2 text-xs opacity-90">
                {isAuthenticated() ? (
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>Signed in as {user?.given_name || user?.name || user?.email}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Guest cart (sign in to save)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {/* Paste Item Code Section */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste Item Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={pastedCode}
                    onChange={handleCodeChange}
                    placeholder="Paste your item code here..."
                    className={`flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none ${
                      pastedCode.length === 0
                        ? 'border-gray-300 focus:ring-2 focus:ring-purple-500'
                        : isValidCode
                          ? 'border-green-400 focus:ring-2 focus:ring-green-500'
                          : 'border-red-400 focus:ring-2 focus:ring-red-500'
                    }`}
                  />
                  <button
                    onClick={handlePaste}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                  >
                    Paste
                  </button>
                </div>
                {pastedCode && !isValidCode && (
                  <p className="mt-1 text-xs text-red-600">Unavailable item code. Please verify and try again.</p>
                )}
              </div>

              {/* Size and Quantity Selection (only shown after pasting code) */}
              {showOptions && (
                <div className="space-y-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <div className="grid grid-cols-2 gap-2">
                      {sizes.map(size => (
                        <button
                          key={size.id}
                          onClick={() => setSelectedSize(size.id)}
                          className={`p-2 text-sm border rounded-md transition-colors ${
                            selectedSize === size.id 
                              ? 'bg-purple-600 text-white border-purple-600' 
                              : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300'
                          }`}
                        >
                          {size.id}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium w-8 text-center">{selectedQuantity}</span>
                      <button
                        onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {editingItem && (
                      <button
                        onClick={cancelEdit}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={addToCart}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition-colors text-sm"
                    >
                      {editingItem ? 'Update' : 'Add'}
                    </button>
                  </div>
                </div>
              )}

              {/* Cart Items */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-800">Cart Items</h4>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={selectedItems.size === cartItems.length ? deselectAllItems : selectAllItems}
                        className="text-xs text-purple-600 hover:text-purple-800"
                      >
                        {selectedItems.size === cartItems.length ? 'Deselect All' : 'Select All'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 max-h-40 overflow-y-auto mb-2">
                    {cartItems.map((item) => {
                      const itemId = item._id || item.id;
                      return (
                      <div 
                        key={itemId} 
                        className={`p-1 rounded border transition-colors ${
                          selectedItems.has(itemId) 
                            ? 'bg-purple-50 border-purple-200' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 flex-1">
                            {/* Selection Circle - moved to left */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleItemSelection(itemId);
                              }}
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                                selectedItems.has(itemId)
                                  ? 'bg-purple-600 border-purple-600'
                                  : 'border-gray-300 hover:border-purple-400'
                              }`}
                              title={selectedItems.has(itemId) ? 'Deselect item' : 'Select item for checkout'}
                            >
                              {selectedItems.has(itemId) && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                            
                            <div 
                              className="flex-1 cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors"
                              onClick={() => handleItemClick(item)}
                            >
                              <div className="text-sm font-medium">{item.code}</div>
                              <div className="text-xs text-gray-600">
                                {sizes.find(s => s.id === item.size)?.name} × {item.quantity}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                editItem(item);
                              }}
                              className="text-blue-600 hover:text-blue-800 text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromCart(itemId);
                              }}
                              className="text-red-600 hover:text-red-800 text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    )})}
                  </div>
                  
                  {selectedItems.size > 0 && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 mb-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-purple-800 font-medium">
                          Selected: {selectedItems.size} items
                        </span>
                        <span className="text-purple-800 font-medium">
                          Total: ${selectedTotal}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t pt-2">
                    <button
                      onClick={handleCheckout}
                      disabled={selectedItems.size === 0}
                      className={`w-full py-2 rounded-md transition-colors text-sm font-medium ${
                        selectedItems.size > 0
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Proceed to Checkout ({selectedItems.size} selected)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewModalOpen && previewImage && (
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={() => setPreviewModalOpen(false)}
          >
            <motion.div
              initial={false}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl max-h-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={previewImage.src}
                alt={previewImage.alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CheckoutChatbot;