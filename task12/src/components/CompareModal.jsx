import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CompareModal() {
  const { compareList, isCompareOpen, setIsCompareOpen, toggleCompare, addToCart } = useCart();
  const navigate = useNavigate();

  if (!isCompareOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsCompareOpen(false)}>
      <div 
        style={{
          width: '100%',
          maxWidth: '960px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button 
          onClick={() => setIsCompareOpen(false)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#f1f5f9',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
          Side-by-Side Product Comparison
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
          Compare key features, ratings, prices, and specs for up to 3 selected items.
        </p>

        {compareList.length === 0 ? (
          <div style={{ padding: '3rem 1rem', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
            <p style={{ color: '#64748b', fontWeight: 600, marginBottom: '1rem' }}>No products selected for comparison.</p>
            <button onClick={() => { setIsCompareOpen(false); navigate('/shop'); }} className="btn btn-primary">
              Browse Products to Compare
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: '1rem', width: '20%', borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '0.85rem' }}>Features</th>
                  {compareList.map(item => (
                    <th key={item.id} style={{ padding: '1rem', width: `${80 / compareList.length}%`, borderBottom: '2px solid #e2e8f0', textAlign: 'center' }}>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <button 
                          onClick={() => toggleCompare(item)}
                          style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#fef2f2', color: '#ef4444', borderRadius: '50%', padding: '4px' }}
                          title="Remove from comparison"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <img src={item.image} alt={item.name} style={{ width: '90px', height: '90px', objectFit: 'contain', margin: '0 auto 8px auto' }} />
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>
                        {item.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: '#475569', fontSize: '0.85rem' }}>Price</td>
                  {compareList.map(item => (
                    <td key={item.id} style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontWeight: 800, fontSize: '1.1rem', color: '#2563eb' }}>
                      ${item.price.toFixed(2)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: '#475569', fontSize: '0.85rem' }}>Brand & Category</td>
                  {compareList.map(item => (
                    <td key={item.id} style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontSize: '0.85rem', color: '#0f172a', fontWeight: 600 }}>
                      {item.brand} • {item.category}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: '#475569', fontSize: '0.85rem' }}>Customer Rating</td>
                  {compareList.map(item => (
                    <td key={item.id} style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {item.rating} ({item.reviewCount})
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: '#475569', fontSize: '0.85rem' }}>Stock Status</td>
                  {compareList.map(item => (
                    <td key={item.id} style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, color: item.stock < 10 ? '#ef4444' : '#10b981' }}>
                      {item.stock < 10 ? `Only ${item.stock} left` : 'In Stock'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: '#475569', fontSize: '0.85rem' }}>Actions</td>
                  {compareList.map(item => (
                    <td key={item.id} style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                      <button onClick={() => addToCart(item, 1)} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                        <ShoppingBag className="w-4 h-4" /> Add to Cart
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
