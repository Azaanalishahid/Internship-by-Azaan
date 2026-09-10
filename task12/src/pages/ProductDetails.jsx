import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductGrid from '../components/ProductGrid';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  Plus,
  Minus,
  MessageSquarePlus,
  Scale
} from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    allProducts, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    trackRecentlyViewed, 
    toggleCompare, 
    isInCompare,
    setReviewModalProduct,
    userReviews
  } = useCart();

  const product = allProducts.find(p => p.id === id) || allProducts[0];

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setSelectedColor(product.colors ? product.colors[0] : '');
      setSelectedSize(product.sizes ? product.sizes[0] : '');
      setQuantity(1);
      trackRecentlyViewed(product);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) return null;

  const wishlisted = isInWishlist(product.id);
  const compared = isInCompare(product.id);
  const customReviews = userReviews[product.id] || [];
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem 4rem 1.5rem' }}>
      
      {/* BREADCRUMB */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem' }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
        <ChevronRight className="w-4 h-4 text-slate-400" />
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/shop')}>Shop</span>
        <ChevronRight className="w-4 h-4 text-slate-400" />
        <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/shop?category=${product.category}`)}>{product.category}</span>
        <ChevronRight className="w-4 h-4 text-slate-400" />
        <span style={{ fontWeight: 700, color: '#0f172a' }}>{product.name}</span>
      </div>

      {/* MAIN PRODUCT SHOWCASE */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3rem',
        backgroundColor: '#ffffff',
        borderRadius: '32px',
        padding: '2.5rem',
        border: '1px solid #e2e8f0',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '3rem'
      }}>
        
        {/* LEFT GALLERY */}
        <div>
          <div style={{
            position: 'relative',
            backgroundColor: '#f8fafc',
            borderRadius: '24px',
            padding: '2rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '380px'
          }}>
            <img 
              src={selectedImage} 
              alt={product.name} 
              style={{
                maxWidth: '100%',
                maxHeight: '380px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.12))'
              }}
            />
            {product.discount > 0 && (
              <span className="badge badge-orange" style={{ position: 'absolute', top: '16px', left: '16px' }}>
                -{product.discount}% DISCOUNT
              </span>
            )}
          </div>

          {/* THUMBNAILS */}
          {product.images && product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {product.images.map((imgUrl, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(imgUrl)}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '14px',
                    border: selectedImage === imgUrl ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    backgroundColor: '#f8fafc',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    padding: '4px'
                  }}
                >
                  <img src={imgUrl} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT DETAILS */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-blue">{product.category}</span>
              <span className="badge badge-orange">{product.brand}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: product.stock < 10 ? '#ef4444' : '#10b981', marginLeft: 'auto' }}>
                {product.stock < 10 ? `Low Stock (${product.stock} left)` : 'In Stock & Ready to Ship'}
              </span>
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '12px' }}>
              {product.name}
            </h1>

            {/* RATING */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', color: '#f59e0b', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                ))}
              </div>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>{product.rating}</span>
              <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>({product.reviewCount + customReviews.length} reviews)</span>
            </div>

            {/* PRICE */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#2563eb' }}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.2rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {product.description}
            </p>

            {/* COLORS */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                  Select Color: <span style={{ color: '#2563eb' }}>{selectedColor}</span>
                </span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        padding: '0.45rem 0.9rem',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        border: selectedColor === color ? '2px solid #2563eb' : '1px solid #cbd5e1',
                        backgroundColor: selectedColor === color ? '#eff6ff' : '#ffffff',
                        color: selectedColor === color ? '#2563eb' : '#475569'
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY & ACTIONS */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '0.4rem 0.8rem', backgroundColor: '#f8fafc' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '4px' }}>
                  <Minus className="w-4 h-4 text-slate-600" />
                </button>
                <span style={{ fontSize: '1rem', fontWeight: 800, minWidth: '24px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '4px' }}>
                  <Plus className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              <button onClick={handleAddToCart} className="btn btn-primary" style={{ flex: 1, minWidth: '160px', padding: '0.85rem' }}>
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>

              <button onClick={handleBuyNow} className="btn btn-accent" style={{ padding: '0.85rem 1.5rem' }}>
                Buy Now
              </button>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => toggleWishlist(product)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: wishlisted ? '#ef4444' : '#64748b' }}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} /> 
                {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>

              <button
                onClick={() => toggleCompare(product)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: compared ? '#2563eb' : '#64748b' }}
              >
                <Scale className="w-4 h-4 text-blue-600" />
                {compared ? 'In Comparison' : 'Compare Product'}
              </button>

              <button 
                onClick={handleShare}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#64748b' }}>
              <Truck className="w-4 h-4 text-blue-600" /> Free Express Shipping
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#64748b' }}>
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Official Warranty
            </div>
          </div>
        </div>

      </div>

      {/* TABS SECTION */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid #e2e8f0',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '3rem'
      }}>
        <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontSize: '1rem',
                fontWeight: activeTab === tab ? 800 : 600,
                color: activeTab === tab ? '#2563eb' : '#64748b',
                textTransform: 'capitalize',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}
            >
              {tab}
              {activeTab === tab && (
                <span style={{ position: 'absolute', bottom: '-0.75rem', left: 0, right: 0, height: '3px', backgroundColor: '#2563eb', borderRadius: '2px' }} />
              )}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '1rem' }}>{product.description}</p>
            <p>Designed with meticulous attention to detail using premium materials. Built to enhance performance and deliver long-lasting durability.</p>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div>
            {product.specs ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, display: 'block' }}>{key}</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{val}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#64748b' }}>Standard specifications apply.</p>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>{product.rating}</span>
                <div>
                  <div style={{ display: 'flex', color: '#f59e0b', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Based on {product.reviewCount + customReviews.length} reviews</span>
                </div>
              </div>

              <button
                onClick={() => setReviewModalProduct(product)}
                className="btn btn-outline"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
              >
                <MessageSquarePlus className="w-4 h-4 text-blue-600" /> Write a Review
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {customReviews.map((rev) => (
                <div key={rev.id} style={{ backgroundColor: '#eff6ff', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #bfdbfe' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{rev.name} - Verified Review</span>
                    <div style={{ display: 'flex', color: '#f59e0b' }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#1e3a8a' }}>"{rev.comment}"</p>
                </div>
              ))}

              <div style={{ backgroundColor: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>David K. - Verified Buyer</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>2 days ago</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#475569' }}>
                  "Absolutely love this item! Quality is top notch and arrival was super quick."
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
            Related Products You Might Like
          </h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}

    </div>
  );
}
