import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUp, Send, ShieldCheck, Lock, Truck } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#f8fafc', paddingTop: '4rem', paddingBottom: '2rem', borderTop: '1px solid #1e293b' }}>
      <div className="container">
        
        {/* TOP NEWSLETTER CARD */}
        <div style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #f97316 100%)',
          borderRadius: '28px',
          padding: '2.5rem 2rem',
          marginBottom: '4rem',
          boxShadow: '0 20px 40px rgba(37, 99, 235, 0.25)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}>
          <div>
            <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: '#fdba74' }}>
              Subscribe to Newsletter
            </span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
              Get 15% Off Your First Purchase
            </h3>
            <p style={{ color: '#dbeafe', fontSize: '0.95rem' }}>
              Join 50,000+ shoppers and get exclusive drops, flash deals, and VIP vouchers.
            </p>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '440px' }}>
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
            <button type="submit" className="btn btn-accent" style={{ padding: '0.85rem 1.5rem', borderRadius: '12px' }}>
              {subscribed ? 'Subscribed!' : <><Send className="w-4 h-4" /> Join</>}
            </button>
          </form>
        </div>

        {/* FOOTER COLUMNS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem'
        }}>
          
          {/* BRAND COL */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #2563eb 0%, #f97316 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles style={{ width: '20px', height: '20px', color: '#ffffff' }} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                Shop<span style={{ color: '#3b82f6' }}>Sphere</span>
              </span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Your destination for modern high-performance technology, luxury accessories, and premium home essentials.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                <Lock className="w-4 h-4 text-emerald-400" /> SSL Encrypted Checkout
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Store Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <Link to="/" style={{ transition: 'color 150ms' }}>Home</Link>
              <Link to="/shop" style={{ transition: 'color 150ms' }}>All Products Catalog</Link>
              <Link to="/shop?filter=flash" style={{ transition: 'color 150ms' }}>Flash Sales & Hot Deals</Link>
              <Link to="/wishlist" style={{ transition: 'color 150ms' }}>My Wishlist</Link>
              <Link to="/cart" style={{ transition: 'color 150ms' }}>Shopping Cart</Link>
              <Link to="/checkout" style={{ transition: 'color 150ms' }}>Checkout Page</Link>
            </div>
          </div>

          {/* CUSTOMER SUPPORT */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Customer Care
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <Link to="/track-order" style={{ color: '#fdba74', fontWeight: 700 }}>Live Order Tracking</Link>
              <Link to="/about">About ShopSphere</Link>
              <Link to="/contact">Contact & Help Center</Link>
              <Link to="/contact">FAQ & Support</Link>
              <span style={{ cursor: 'pointer' }} onClick={() => alert('30-Day Hassle Free Returns Policy applies.')}>30-Day Return Policy</span>
            </div>
          </div>

          {/* PAYMENT METHODS */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Accepted Payments
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
              We support all major payment providers securely:
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Visa', 'MasterCard', 'Amex', 'PayPal', 'Apple Pay'].map((pay) => (
                <span key={pay} style={{
                  padding: '0.4rem 0.75rem',
                  backgroundColor: '#1e293b',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#cbd5e1',
                  border: '1px solid #334155'
                }}>
                  {pay}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid #1e293b',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} ShopSphere Inc. All rights reserved. Built with React & Context API.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#3b82f6',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Back to Top <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
