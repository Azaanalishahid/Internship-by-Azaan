import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalCartPrice, 
    totalCartItems 
  } = useCart();
  
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(6px)',
      animation: 'fadeIn 200ms ease-out'
    }}>
      {/* OVERLAY CLICK TO CLOSE */}
      <div 
        style={{ position: 'absolute', inset: 0 }} 
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* SIDE DRAWER CONTENT */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '440px',
        height: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
        zIndex: 2001,
        animation: 'slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* DRAWER HEADER */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                Your Shopping Bag
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                {totalCartItems} {totalCartItems === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsCartDrawerOpen(false)}
            style={{
              padding: '0.4rem',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              color: '#64748b',
              transition: 'all 150ms ease'
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* DRAWER BODY / ITEMS */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem'
        }}>
          {cart.length === 0 ? (
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: '#64748b',
              padding: '2rem'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#eff6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                color: '#2563eb'
              }}>
                <ShoppingBag style={{ width: '40px', height: '40px' }} />
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                Your cart is currently empty
              </h4>
              <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Explore our premium collection and discover high-performance electronics, footwear & luxury lifestyle items.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/shop');
                }}
                className="btn btn-primary"
              >
                Explore Shop
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item) => (
                <div 
                  key={item.cartItemId}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    borderRadius: '16px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    transition: 'all 200ms ease'
                  }}
                >
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      backgroundColor: '#ffffff'
                    }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          style={{ color: '#94a3b8', padding: '2px', transition: 'color 150ms' }}
                          title="Remove item"
                          onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                        >
                          <Trash2 style={{ width: '16px', height: '16px' }} />
                        </button>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                        {item.selectedColor} • {item.selectedSize}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#2563eb' }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>

                      {/* QUANTITY CONTROLS */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        padding: '2px 6px'
                      }}>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          style={{ color: '#475569', display: 'flex', alignItems: 'center' }}
                        >
                          <Minus style={{ width: '14px', height: '14px' }} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          style={{ color: '#475569', display: 'flex', alignItems: 'center' }}
                        >
                          <Plus style={{ width: '14px', height: '14px' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DRAWER FOOTER */}
        {cart.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 700, color: '#0f172a' }}>${totalCartPrice.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
              <span>Total Amount</span>
              <span style={{ color: '#2563eb' }}>${totalCartPrice.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/checkout');
                }}
                className="btn btn-accent"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                Proceed to Checkout <ArrowRight style={{ width: '18px', height: '18px' }} />
              </button>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/cart');
                  }}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '0.6rem' }}
                >
                  View Full Cart
                </button>
                <button
                  onClick={clearCart}
                  style={{
                    fontSize: '0.85rem',
                    color: '#ef4444',
                    backgroundColor: '#fef2f2',
                    borderRadius: '0.75rem',
                    fontWeight: 600
                  }}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
