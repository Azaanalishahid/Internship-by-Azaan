import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { CATEGORIES, TESTIMONIALS, BRANDS } from '../data/products';
import { 
  Flame, 
  Sparkles, 
  TrendingUp, 
  Star, 
  Award, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Headphones,
  Smartphone,
  Shirt,
  Footprints,
  Watch,
  Armchair,
  Trophy
} from 'lucide-react';

export default function Home() {
  const { allProducts } = useCart();
  const navigate = useNavigate();

  // Flash Sale Countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categoryIcons = {
    'cat-electronics': Smartphone,
    'cat-fashion': Shirt,
    'cat-shoes': Footprints,
    'cat-accessories': Watch,
    'cat-furniture': Armchair,
    'cat-sports': Trophy
  };

  const featuredProducts = allProducts.filter(p => p.isFeatured).slice(0, 4);
  const flashSaleProducts = allProducts.filter(p => p.isFlashSale).slice(0, 4);
  const bestSellers = allProducts.slice(0, 8);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. TOP CATEGORIES SHOWCASE */}
      <section style={{ padding: '3rem 0', backgroundColor: '#ffffff', borderVertical: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <span className="badge badge-blue">Explore</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
                Top Shopping Categories
              </h2>
            </div>
            <button 
              onClick={() => navigate('/shop')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#2563eb' }}
            >
              View All Categories <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '1.25rem'
          }}>
            {CATEGORIES.filter(c => c.id !== 'cat-all').map((cat) => {
              const IconComp = categoryIcons[cat.id] || Sparkles;
              return (
                <div
                  key={cat.id}
                  onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '20px',
                    padding: '1.5rem 1rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: '1px solid #e2e8f0',
                    transition: 'all 250ms ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.backgroundColor = '#eff6ff';
                    e.currentTarget.style.borderColor = '#93c5fd';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '16px',
                    backgroundColor: '#ffffff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.12)'
                  }}>
                    <IconComp style={{ width: '26px', height: '26px' }} />
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {cat.count} Products
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FLASH SALE COUNTDOWN SECTION */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '32px',
            padding: '2.5rem',
            color: '#ffffff',
            boxShadow: '0 20px 40px rgba(15, 23, 42, 0.2)',
            marginBottom: '2.5rem'
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem'
            }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.35rem 0.85rem', borderRadius: '9999px', backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#f97316', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  <Flame className="w-4 h-4 text-orange-500" /> LIMITED TIME OFFER
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
                  Today's Flash Deals
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '4px' }}>
                  Unbeatable discounts on top tech and fashion. Hurry before stock runs out!
                </p>
              </div>

              {/* TIMER DISPLAY */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', backgroundColor: '#1e293b', border: '1px solid #334155', padding: '0.6rem 1rem', borderRadius: '14px', minWidth: '64px' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f97316' }}>{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase' }}>Hours</span>
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f97316' }}>:</span>
                <div style={{ textAlign: 'center', backgroundColor: '#1e293b', border: '1px solid #334155', padding: '0.6rem 1rem', borderRadius: '14px', minWidth: '64px' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f97316' }}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase' }}>Mins</span>
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f97316' }}>:</span>
                <div style={{ textAlign: 'center', backgroundColor: '#1e293b', border: '1px solid #334155', padding: '0.6rem 1rem', borderRadius: '14px', minWidth: '64px' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f97316' }}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase' }}>Secs</span>
                </div>
              </div>
            </div>
          </div>

          <ProductGrid products={flashSaleProducts} />
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS GRID */}
      <section style={{ padding: '3rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            <span className="badge badge-orange">Handpicked</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
              Featured Highlights
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '8px' }}>
              Discover our signature lineup designed for exceptional quality and performance.
            </p>
          </div>

          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* 5. POPULAR BRANDS BANNER */}
      <section style={{ padding: '3rem 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Trusted By Global World-Class Brands
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
            opacity: 0.7
          }}>
            {BRANDS.map(brand => (
              <span key={brand} style={{ fontSize: '1.25rem', fontWeight: 800, color: '#475569', letterSpacing: '-0.02em' }}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS & TESTIMONIALS */}
      <section style={{ padding: '4rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-blue">Testimonials</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
              Loved By 50,000+ Customers
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {TESTIMONIALS.map(t => (
              <div 
                key={t.id}
                className="glass-card"
                style={{
                  padding: '2rem',
                  borderRadius: '24px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div style={{ display: 'flex', color: '#f59e0b', gap: '4px', marginBottom: '1rem' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.5rem', italic: 'true' }}>
                  "{t.comment}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={t.avatar} alt={t.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{t.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
