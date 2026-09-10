import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Saved cart state
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('shopsphere_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Saved wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('shopsphere_wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : ['prod-1', 'prod-4'];
    } catch {
      return ['prod-1', 'prod-4'];
    }
  });

  // Compare List (up to 3 products)
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Recently Viewed & Modals
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [reviewModalProduct, setReviewModalProduct] = useState(null);
  
  // Custom User Reviews Store
  const [userReviews, setUserReviews] = useState({});

  // Toast Notification state
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // Local storage sync
  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_cart', JSON.stringify(cart));
    } catch (e) { console.error(e); }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_wishlist', JSON.stringify(wishlist));
    } catch (e) { console.error(e); }
  }, [wishlist]);

  // Toast trigger
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3200);
  };

  // Cart Operations
  const addToCart = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    const color = selectedColor || (product.colors && product.colors[0]) || 'Standard';
    const size = selectedSize || (product.sizes && product.sizes[0]) || 'Standard';
    const cartItemId = `${product.id}-${color}-${size}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, {
          cartItemId,
          product,
          quantity,
          selectedColor: color,
          selectedSize: size
        }];
      }
    });

    showToast(`Added "${product.name}" to cart!`, 'success');
  };

  const removeFromCart = (cartItemId) => {
    const itemToRemove = cart.find(item => item.cartItemId === cartItemId);
    setCart((prevCart) => prevCart.filter(item => item.cartItemId !== cartItemId));
    if (itemToRemove) {
      showToast(`Removed "${itemToRemove.product.name}" from cart.`, 'info');
    }
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared.', 'info');
  };

  // Wishlist Operations
  const toggleWishlist = (product) => {
    const productId = typeof product === 'string' ? product : product.id;
    const productName = typeof product === 'object' ? product.name : 'Product';

    setWishlist((prevWishlist) => {
      const exists = prevWishlist.includes(productId);
      if (exists) {
        showToast(`Removed from wishlist.`, 'info');
        return prevWishlist.filter(id => id !== productId);
      } else {
        showToast(`Added "${productName}" to wishlist!`, 'success');
        return [...prevWishlist, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Compare Operations
  const toggleCompare = (product) => {
    setCompareList((prev) => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed from comparison.`, 'info');
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 3) {
          showToast('You can compare a maximum of 3 products at once.', 'error');
          return prev;
        }
        showToast(`Added "${product.name}" to comparison!`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInCompare = (productId) => compareList.some(p => p.id === productId);

  // User Review Submission
  const addUserReview = (productId, reviewData) => {
    setUserReviews((prev) => ({
      ...prev,
      [productId]: [
        ...(prev[productId] || []),
        { id: Date.now(), ...reviewData, date: 'Just now' }
      ]
    }));
    showToast('Thank you! Your review has been published.', 'success');
  };

  // Recently Viewed Tracker
  const trackRecentlyViewed = (product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
  };

  // Computed totals
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalCartPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        compareList,
        isCompareOpen,
        setIsCompareOpen,
        toggleCompare,
        isInCompare,
        recentlyViewed,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCouponModalOpen,
        setIsCouponModalOpen,
        reviewModalProduct,
        setReviewModalProduct,
        userReviews,
        addUserReview,
        toast,
        showToast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        trackRecentlyViewed,
        totalCartItems,
        totalCartPrice,
        allProducts: PRODUCTS
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
