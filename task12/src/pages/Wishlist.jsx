import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductGrid from '../components/ProductGrid';
import { Heart, ShoppingBag, ArrowLeft, Trash2, Sparkles } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, allProducts, addToCart, toggleWishlist, showToast } = useCart();
  const navigate = useNavigate();

  const wishlistedProducts = allProducts.filter(p => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistedProducts.forEach(product => {
      addToCart(product, 1);
    });
    showToast('Moved all wishlisted items to cart!', 'success');
  };

  if (wishlistedProducts.length === 0) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '32px',
          padding: '3.5rem 2rem',
          maxWidth: '540px',
          width: '100%',
          textAlign: 'center',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            backgroundColor: '#fef2f2',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <Heart style={{ width: '45px', height: '45px', fill: '#ef4444' }} />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            Your Wishlist is Empty
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            You haven't saved any items to your wishlist yet. Tap the heart icon on any product card to save your favorite items for later!
          </p>

          <Link to="/shop" className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
            <ArrowLeft className="w-5 h-5" /> Discover Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem 4rem 1.5rem' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
            My Wishlist
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '4px' }}>
            You have <strong style={{ color: '#ef4444' }}>{wishlistedProducts.length} saved items</strong> in your wishlist.
          </p>
        </div>

        <button 
          onClick={handleMoveAllToCart}
          className="btn btn-accent"
          style={{ padding: '0.75rem 1.5rem' }}
        >
          <ShoppingBag className="w-5 h-5" /> Move All To Cart
        </button>
      </div>

      {/* WISHLIST PRODUCT GRID */}
      <ProductGrid products={wishlistedProducts} />
    </div>
  );
}
