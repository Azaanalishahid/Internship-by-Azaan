import React from 'react';
import { Sparkles, Target, Eye, ShieldCheck, Award, HeartHandshake, Truck, Users } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Happy Shoppers', value: '50,000+' },
    { label: 'Curated Products', value: '1,200+' },
    { label: 'Customer Satisfaction', value: '99.8%' },
    { label: 'Global Destinations', value: '25+' }
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: '100% Authentic Products',
      desc: 'We partner directly with certified global manufacturers and top brand designers to ensure every item is genuine.'
    },
    {
      icon: Truck,
      title: 'Ultra-Fast Worldwide Delivery',
      desc: 'Our automated logistics hub processes orders within 2 hours with insured express tracking to your doorstep.'
    },
    {
      icon: HeartHandshake,
      title: 'Customer-First Care',
      desc: 'Our dedicated support team is available 24/7/365 to assist with order tracking, sizing guidance, and technical help.'
    },
    {
      icon: Award,
      title: 'Sustainable Packaging',
      desc: 'We are committed to eco-friendly 100% recyclable shipping boxes and zero plastic waste.'
    }
  ];

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 5rem 1.5rem' }}>
      
      {/* HERO BANNER */}
      <div style={{
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto 4rem auto'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.4rem 1rem', borderRadius: '9999px', backgroundColor: '#eff6ff', border: '1px solid rgba(37, 99, 235, 0.2)', marginBottom: '1.25rem' }}>
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb' }}>
            Our Brand Story
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, marginBottom: '1.25rem' }}>
          Redefining Modern E-Commerce With <span className="gradient-text">Uncompromised Luxury & Quality</span>
        </h1>

        <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: 1.7 }}>
          Founded in 2024, ShopSphere was built on a simple vision: to bring together premium craftsmanship, cutting-edge technology, and seamless shopping experiences into one single platform.
        </p>
      </div>

      {/* STATS ROW */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '5rem'
      }}>
        {stats.map((s, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '2rem 1.5rem', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2563eb', marginBottom: '4px' }}>
              {s.value}
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#64748b' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* MISSION & VISION */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2.5rem',
        marginBottom: '5rem'
      }}>
        <div style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '28px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Target className="w-6 h-6" />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Our Mission
          </h3>
          <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
            To empower everyday lifestyles by curating top-tier audio, high-performance tech gadgets, luxury timepieces, and ergonomic living solutions at transparent pricing.
          </p>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '28px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', backgroundColor: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Eye className="w-6 h-6" />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Our Vision
          </h3>
          <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
            To establish ShopSphere as the undisputed worldwide standard for digital e-commerce excellence, driven by modern design aesthetics and instant customer happiness.
          </p>
        </div>
      </div>

      {/* WHY SHOP WITH US */}
      <div>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          <span className="badge badge-orange">Pillars</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
            Why Choose ShopSphere?
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem'
        }}>
          {pillars.map((p, idx) => {
            const IconC = p.icon;
            return (
              <div key={idx} style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#f8fafc', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', border: '1px solid #e2e8f0' }}>
                  <IconC className="w-6 h-6" />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
