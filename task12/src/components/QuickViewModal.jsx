import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { X, Star, ShoppingBag, Heart, Check, ExternalLink } from 'lucide-react';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wishlisted = isInWishlist(product.id);
  const activeColor = selectedColor || (product.colors && product.colors[0]);
  const activeSize = selectedSize || (product.sizes && product.sizes[0]);

  const handleAddToCart = () => {
    addToCart(product, quantity, activeColor, activeSize);
    setQuickViewProduct(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
      <div 
        style={{
          width: '100%',
          maxWidth: '820px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          animation: 'slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button 
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* IMAGE PREVIEW */}
        <div style={{ backgroundColor: '#f8fafc', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', maxHeight: '360px', objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}
          />
        </div>

        {/* DETAILS */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-blue">{product.category}</span>
              <span className="badge badge-orange">{product.brand}</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '8px' }}>
              {product.name}
            </h3>

            {/* RATING */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', color: '#f59e0b' }}>
                <Star style={{ width: '16px', height: '16px', fill: '#f59e0b' }} />
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>{product.rating}</span>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>({product.reviewCount} reviews)</span>
            </div>

            {/* PRICE */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563eb' }}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span style={{ fontSize: '1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {product.description}
            </p>

            {/* COLOR OPTIONS */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Color</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        border: activeColor === color ? '2px solid #2563eb' : '1px solid #cbd5e1',
                        backgroundColor: activeColor === color ? '#eff6ff' : '#ffffff',
                        color: activeColor === color ? '#2563eb' : '#475569'
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={handleAddToCart}
                className="btn btn-primary" 
                style={{ flex: 1 }}
              >
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>
              <button 
                onClick={() => toggleWishlist(product)}
                className="btn-icon"
                style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
              >
                <Heart className="w-5 h-5" style={{ color: wishlisted ? '#ef4444' : '#64748b', fill: wishlisted ? '#ef4444' : 'none' }} />
              </button>
            </div>

            <button
              onClick={() => {
                setQuickViewProduct(null);
                navigate(`/product/${product.id}`);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#2563eb'
              }}
            >
              View Full Product Details <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
