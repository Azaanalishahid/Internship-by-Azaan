import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import ToastNotification from './components/ToastNotification';
import CompareModal from './components/CompareModal';
import CouponModal from './components/CouponModal';
import ReviewModal from './components/ReviewModal';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import OrderTracking from './pages/OrderTracking';

// Floating Quick Cart Button Component
function FloatingCartButton() {
  const { totalCartItems, setIsCartDrawerOpen } = useCart();
  if (totalCartItems === 0) return null;

  return (
    <button
      onClick={() => setIsCartDrawerOpen(true)}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 890,
        backgroundColor: '#2563eb',
        color: '#ffffff',
        padding: '0.75rem 1.25rem',
        borderRadius: '9999px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
        boxShadow: '0 10px 25px rgba(37, 99, 235, 0.4)',
        fontWeight: 700,
        fontSize: '0.9rem',
        transition: 'transform 200ms ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <span style={{
        backgroundColor: '#f97316',
        color: '#ffffff',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
        fontWeight: 800
      }}>
        {totalCartItems}
      </span>
      <span>Quick Cart Drawer</span>
    </button>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/track-order" element={<OrderTracking />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
          <CompareModal />
          <CouponModal />
          <ReviewModal />
          <ToastNotification />
          <FloatingCartButton />
        </div>
      </Router>
    </CartProvider>
  );
}
