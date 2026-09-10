import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Gift, X, Copy, Check, Sparkles } from 'lucide-react';

export default function CouponModal() {
  const { isCouponModalOpen, setIsCouponModalOpen, showToast } = useCart();
  const [copied, setCopied] = useState(false);

  if (!isCouponModalOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('SPHERE15');
    setCopied(true);
    showToast('Promo code "SPHERE15" copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCouponModalOpen(false)}>
      <div 
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#ffffff',
          borderRadius: '28px',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.3)',
          position: 'relative',
          animation: 'slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          background: 'linear-gradient(135deg, #ffffff 0%, #fff7ed 100%)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => setIsCouponModalOpen(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <X className="w-4 h-4" />
        </button>

        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: '#fff7ed',
          color: '#f97316',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto',
          boxShadow: '0 10px 20px rgba(249, 115, 22, 0.25)'
        }}>
          <Gift className="w-9 h-9" />
        </div>

        <span className="badge badge-orange" style={{ marginBottom: '8px' }}>
          Exclusive Voucher Unlocked
        </span>

        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
          Get 15% Off Your Order!
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Use this exclusive gift code at checkout to claim 15% instant savings on your entire shopping cart.
        </p>

        {/* CODE BOX */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '2px dashed #f97316',
          borderRadius: '16px',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Coupon Code</span>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f97316', letterSpacing: '0.05em' }}>SPHERE15</span>
          </div>

          <button
            onClick={handleCopy}
            className="btn btn-accent"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy Code</>}
          </button>
        </div>

        <button
          onClick={() => setIsCouponModalOpen(false)}
          className="btn btn-secondary"
          style={{ width: '100%' }}
        >
          Close & Shop Now
        </button>
      </div>
    </div>
  );
}
