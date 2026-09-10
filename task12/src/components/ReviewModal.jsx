import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, Send } from 'lucide-react';

export default function ReviewModal() {
  const { reviewModalProduct, setReviewModalProduct, addUserReview } = useCart();
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  if (!reviewModalProduct) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      addUserReview(reviewModalProduct.id, {
        name,
        comment,
        rating
      });
      setReviewModalProduct(null);
      setName('');
      setComment('');
      setRating(5);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setReviewModalProduct(null)}>
      <div 
        style={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          animation: 'slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => setReviewModalProduct(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#f1f5f9',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X className="w-4 h-4" />
        </button>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
          Write A Product Review
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
          Reviewing: <strong>{reviewModalProduct.name}</strong>
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* STAR RATING PICKER */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Your Overall Rating</label>
            <div style={{ display: 'flex', gap: '6px', cursor: 'pointer' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  style={{ padding: 0 }}
                >
                  <Star className={`w-7 h-7 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Your Name</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Sarah M." 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Review Feedback</label>
            <textarea 
              rows="4" 
              required 
              placeholder="Share details about performance, fit, or design quality..." 
              value={comment} 
              onChange={(e) => setComment(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem' }}>
            <Send className="w-4 h-4" /> Submit Verified Review
          </button>
        </form>
      </div>
    </div>
  );
}
