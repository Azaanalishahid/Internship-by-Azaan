import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalCartPrice, totalCartItems, showToast } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');

  const navigate = useNavigate();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SPHERE15') {
      setDiscount(0.15); // 15% discount
      setAppliedCode('SPHERE15 (15% Off)');
      showToast('15% Promo Discount applied successfully!', 'success');
      setPromoCode('');
    } else if (promoCode.trim().toUpperCase() === 'FREESHIP') {
      setDiscount(0.05);
      setAppliedCode('FREESHIP ($5.00 Off)');
      showToast('Promo Discount applied!', 'success');
      setPromoCode('');
    } else {
      showToast('Invalid promo code. Try "SPHERE15"', 'error');
    }
  };

  const discountAmount = totalCartPrice * discount;
  const shippingFee = totalCartPrice > 100 || totalCartPrice === 0 ? 0 : 9.99;
  const finalPrice = Math.max(0, totalCartPrice - discountAmount + shippingFee);

  if (cart.length === 0) {
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
            backgroundColor: '#eff6ff',
            color: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <ShoppingBag style={{ width: '45px', height: '45px' }} />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            Your Shopping Cart is Empty
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Looks like you haven't added any products to your cart yet. Explore our featured catalog to get started.
          </p>

          <Link to="/shop" className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
            <ArrowLeft className="w-5 h-5" /> Start Shopping Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem 4rem 1.5rem' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
            Shopping Cart
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '4px' }}>
            You have <strong style={{ color: '#2563eb' }}>{totalCartItems} items</strong> in your shopping cart.
          </p>
        </div>

        <button 
          onClick={clearCart}
          style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ef4444', backgroundColor: '#fef2f2', padding: '0.5rem 1rem', borderRadius: '10px' }}
        >
          Clear Entire Cart
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem' }}>
        
        {/* LEFT ITEMS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.map((item) => (
            <div 
              key={item.cartItemId}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '1.25rem',
                border: '1px solid #e2e8f0',
                boxShadow: 'var(--shadow-sm)',
                flexWrap: 'wrap'
              }}
            >
              <img 
                src={item.product.image} 
                alt={item.product.name}
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  backgroundColor: '#f8fafc',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/product/${item.product.id}`)}
              />

              <div style={{ flex: 1, minWidth: '180px' }}>
                <span className="badge badge-blue" style={{ fontSize: '0.68rem', marginBottom: '4px' }}>
                  {item.product.category}
                </span>
                <h3 
                  onClick={() => navigate(`/product/${item.product.id}`)}
                  style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', cursor: 'pointer', lineHeight: 1.3 }}
                >
                  {item.product.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                  Color: {item.selectedColor} • Size: {item.selectedSize}
                </p>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb', marginTop: '4px' }}>
                  ${item.product.price.toFixed(2)} each
                </p>
              </div>

              {/* QUANTITY CONTROLS */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                padding: '0.4rem 0.75rem',
                backgroundColor: '#f8fafc'
              }}>
                <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} style={{ color: '#475569' }}>
                  <Minus className="w-4 h-4" />
                </button>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, minWidth: '24px', textAlign: 'center' }}>
                  {item.quantity}
                </span>
                <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} style={{ color: '#475569' }}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* SUBTOTAL */}
              <div style={{ minWidth: '90px', textAlign: 'right' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>

              {/* REMOVE BUTTON */}
              <button
                onClick={() => removeFromCart(item.cartItemId)}
                style={{ padding: '0.5rem', color: '#94a3b8', borderRadius: '50%', transition: 'all 150ms' }}
                title="Remove item"
                onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          <div style={{ marginTop: '1rem' }}>
            <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#2563eb' }}>
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* RIGHT ORDER SUMMARY */}
        <div>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '1.75rem',
            border: '1px solid #e2e8f0',
            boxShadow: 'var(--shadow-md)',
            position: 'sticky',
            top: '100px'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
              Order Summary
            </h3>

            {/* PROMO FORM */}
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <input
                type="text"
                placeholder="Promo Code (e.g. SPHERE15)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.55rem 0.85rem',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn btn-secondary" style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}>
                Apply
              </button>
            </form>

            {appliedCode && (
              <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Tag className="w-4 h-4" /> Applied: {appliedCode}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#64748b', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal ({totalCartItems} items)</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>${totalCartPrice.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                  <span>Discount</span>
                  <span style={{ fontWeight: 700 }}>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Estimated Shipping</span>
                <span style={{ fontWeight: 700, color: shippingFee === 0 ? '#10b981' : '#0f172a' }}>
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
              <span>Total Amount</span>
              <span style={{ color: '#2563eb' }}>${finalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-accent"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>

            <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Guaranteed Safe & Encrypted Checkout
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
