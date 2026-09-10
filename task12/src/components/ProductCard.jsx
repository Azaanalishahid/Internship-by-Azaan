import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const wishlisted = isInWishlist(product.id);

  return (
    <div 
      className="glass-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-6px)' : 'none',
        boxShadow: isHovered ? '0 20px 30px -10px rgba(37, 99, 235, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.04)' : 'var(--shadow-md)',
        position: 'relative'
      }}
    >
      {/* CARD IMAGE CONTAINER */}
      <div style={{
        position: 'relative',
        paddingTop: '80%', /* Aspect ratio */
        backgroundColor: '#f8fafc',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
      onClick={() => navigate(`/product/${product.id}`)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 500ms ease',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)'
          }}
        />

        {/* BADGES */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 2 }}>
          {product.discount > 0 && (
            <span className="badge badge-orange">
              -{product.discount}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="badge badge-blue">
              New Arrival
            </span>
          )}
          {product.isFlashSale && (
            <span className="badge badge-red" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Sparkles className="w-3 h-3" /> Flash
            </span>
          )}
        </div>

        {/* WISHLIST BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="btn-icon"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 3,
            width: '36px',
            height: '36px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
          title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart style={{ width: '18px', height: '18px', color: wishlisted ? '#ef4444' : '#64748b', fill: wishlisted ? '#ef4444' : 'none' }} />
        </button>

        {/* HOVER QUICK VIEW OVERLAY */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          justifyContent: 'center',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 250ms ease',
          zIndex: 3
        }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
            }}
          >
            <Eye className="w-4 h-4 text-blue-600" /> Quick View
          </button>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {product.category}
            </span>
            {/* STOCK STATUS */}
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: product.stock < 10 ? '#ef4444' : '#10b981' }}>
              {product.stock < 10 ? `Only ${product.stock} left` : 'In Stock'}
            </span>
          </div>

          <h3 
            onClick={() => navigate(`/product/${product.id}`)}
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '8px',
              cursor: 'pointer',
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.name}
          </h3>

          {/* RATING */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
            <Star style={{ width: '15px', height: '15px', fill: '#f59e0b', color: '#f59e0b' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{product.rating}</span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>({product.reviewCount})</span>
          </div>
        </div>

        {/* BOTTOM PRICE & ADD TO CART */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2563eb' }}>
              ${product.price.toFixed(2)}
            </div>
            {product.originalPrice && (
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                ${product.originalPrice.toFixed(2)}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="btn btn-primary"
            style={{
              padding: '0.55rem 0.9rem',
              borderRadius: '12px',
              fontSize: '0.85rem'
            }}
            title="Add to Cart"
          >
            <ShoppingBag style={{ width: '16px', height: '16px' }} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
