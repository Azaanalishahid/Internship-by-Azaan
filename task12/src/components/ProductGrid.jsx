import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, loading = false, emptyMessage = 'No products found.' }) {
  if (loading) {
    return (
      <div className="grid-responsive">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div 
            key={n} 
            className="skeleton"
            style={{
              height: '380px',
              borderRadius: '20px'
            }}
          />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        color: '#64748b'
      }}>
        <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid-responsive">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
