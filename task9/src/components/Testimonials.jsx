import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquareHeart } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Heart Surgery Patient',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      review: 'Booking my cardiology appointment through MediCare was unbelievably fast and smooth. The medical team was attentive, knowledgeable, and gave me complete peace of mind during my recovery.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Orthopedic Patient',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      review: 'The online appointment booking system saved me hours. Dr. Mitchell and the orthopedic staff provided world-class knee rehabilitation care. Highly recommended hospital!'
    },
    {
      id: 3,
      name: 'Elena Rostova',
      role: 'Pediatrics Parent',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      review: 'Outstanding pediatric care! The doctors made my daughter feel so comfortable and cared for. The clean facilities and friendly environment are second to none.'
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge-tag badge-blue" style={{ marginBottom: '0.75rem' }}>
            <MessageSquareHeart size={16} />
            <span>Patient Stories</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1F2937', letterSpacing: '-0.02em' }}>
            What Our <span className="text-gradient-blue">Patients Say</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: '1.05rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            Real reviews and experiences shared by our valued patients and their families.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '2.5rem'
          }}
        >
          {testimonials.map((item, idx) => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                background: idx === activeIndex ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                border: idx === activeIndex ? '2px solid #2563EB' : '1px solid rgba(226, 232, 240, 0.8)',
                boxShadow: idx === activeIndex ? '0 20px 40px -10px rgba(37, 99, 235, 0.15)' : 'none',
                transform: idx === activeIndex ? 'translateY(-4px)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <Quote
                size={40}
                color="#F97316"
                style={{ opacity: 0.2, position: 'absolute', top: '1.5rem', right: '1.5rem' }}
              />

              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem' }}>
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#F97316" color="#F97316" />
                ))}
              </div>

              {/* Review Text */}
              <p style={{ color: '#4B5563', lineHeight: 1.6, fontSize: '0.975rem', fontStyle: 'italic', marginBottom: '2rem', flexGrow: 1 }}>
                "{item.review}"
              </p>

              {/* Author Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #2563EB'
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1F2937' }}>
                    {item.name}
                  </h4>
                  <span style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: '600' }}>
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={handlePrev}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              color: '#1F2937'
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  width: idx === activeIndex ? '28px' : '10px',
                  height: '10px',
                  borderRadius: '9999px',
                  background: idx === activeIndex ? '#2563EB' : '#CBD5E1',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              color: '#1F2937'
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
