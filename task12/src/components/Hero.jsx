import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Sparkles, ShieldCheck, Truck, Headphones, ArrowRight, Flame } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section style={{ position: 'relative', padding: '3.5rem 0 2rem 0', overflow: 'hidden' }}>
      
      {/* BACKGROUND GRADIENT DECORATION BLURS */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
        filter: 'blur(50px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '0',
        right: '5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
        filter: 'blur(60px)',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          
          {/* LEFT CONTENT */}
          <div className="animate-slide-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.4rem 1rem', borderRadius: '9999px', backgroundColor: '#eff6ff', border: '1px solid rgba(37, 99, 235, 0.2)', marginBottom: '1.25rem' }}>
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb' }}>
                Summer Flagship Collection 2026
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#0f172a',
              marginBottom: '1.25rem'
            }}>
              Discover Premium Tech & <span className="gradient-text">Lifestyle Products</span>
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: '#64748b',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '540px'
            }}>
              Upgrade your everyday life with curated high-performance electronics, luxury accessories, ergonomic furniture, and activewear.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <button 
                onClick={() => navigate('/shop')} 
                className="btn btn-primary"
                style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/shop?filter=flash')} 
                className="btn btn-accent"
                style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}
              >
                <Flame className="w-5 h-5" /> Flash Sale Deals
              </button>
            </div>

            {/* TRUST BADGES BAR */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck className="w-5 h-5 text-blue-600" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Free Express Express Shipping</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck className="w-5 h-5 text-orange-500" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>2-Year Official Warranty</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Headphones className="w-5 h-5 text-emerald-500" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>24/7 Dedicated Support</span>
              </div>
            </div>
          </div>

          {/* RIGHT HERO PRODUCT SHOWCASE CARD */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{
              padding: '2rem',
              backgroundColor: '#ffffff',
              borderRadius: '32px',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.2)',
              position: 'relative'
            }}>
              {/* DISCOUNT BADGE */}
              <div style={{
                position: 'absolute',
                top: '-15px',
                right: '20px',
                backgroundColor: '#f97316',
                color: '#ffffff',
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                fontWeight: 800,
                fontSize: '0.9rem',
                boxShadow: '0 10px 20px rgba(249, 115, 22, 0.4)'
              }}>
                HOT DEAL • 24% OFF
              </div>

              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" 
                alt="SphereSound Pro" 
                style={{
                  width: '100%',
                  height: '320px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))',
                  transition: 'transform 500ms ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05) rotate(-2deg)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
              />

              <div style={{ marginTop: '1.25rem' }}>
                <span className="badge badge-blue">Featured Tech</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
                  SphereSound Pro ANC Headphones
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                  <div>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2563eb' }}>$249.99</span>
                    <span style={{ fontSize: '0.9rem', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '8px' }}>$329.99</span>
                  </div>
                  <button 
                    onClick={() => navigate('/product/prod-1')} 
                    className="btn btn-primary"
                    style={{ padding: '0.5rem 1.25rem', borderRadius: '12px' }}
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
