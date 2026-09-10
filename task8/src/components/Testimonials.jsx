import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import './Testimonials.css';

const testimonialsData = [
  {
    name: 'Sarah Jenkins',
    role: 'Member for 2 Years',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    review: 'Joining FitZone Fitness was the best health decision I ever made! Lost 25 lbs in 6 months with Elena’s yoga and HIIT routines. The community and certified coaches truly care about your journey.',
    rating: 5,
    achievement: '-25 lbs Fat Loss'
  },
  {
    name: 'Michael Chang',
    role: 'Member for 1 Year',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    review: 'The equipment at FitZone is state-of-the-art and always pristine clean. Marcus completely transformed my bench press and strength form. Highly recommend the Standard & VIP memberships!',
    rating: 5,
    achievement: '50% Strength Boost'
  },
  {
    name: 'Jessica Williams',
    role: 'Member for 3 Years',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    review: 'The 24/7 access and personalized macro nutrition guidance allowed me to balance a intense corporate job while building the physique of my dreams. FitZone feels like family!',
    rating: 5,
    achievement: 'Marathon Finisher'
  },
  {
    name: 'David Thorne',
    role: 'Member for 8 Months',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    review: 'Unbelievable energy during group CrossFit WODs! Sophia pushes you past your self-imposed limits safely. Top-tier facility, friendly staff, and great amenities.',
    rating: 5,
    achievement: 'CrossFit Athlete'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  return (
    <section id="testimonials" className="section-padding testimonials-section">
      <div className="container">
        <div className="text-center section-header">
          <div className="section-badge">Member Success Stories</div>
          <h2 className="section-title">
            Real Results From <span className="text-gradient-blue">Real Members</span>
          </h2>
          <p className="section-subtitle">
            See how our dedicated community members transformed their health, body, and confidence with FitZone.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="testimonial-slider-wrapper">
          <div className="slider-controls">
            <button className="slider-arrow prev-arrow" onClick={handlePrev} aria-label="Previous Testimonial">
              <ChevronLeft size={24} />
            </button>
            <button className="slider-arrow next-arrow" onClick={handleNext} aria-label="Next Testimonial">
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="testimonial-card-container">
            {testimonialsData.map((item, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={index}
                  className={`testimonial-slide ${isActive ? 'slide-active' : ''}`}
                >
                  <div className="quote-icon-badge">
                    <Quote size={32} className="icon-quote" />
                  </div>

                  {/* 5-Star Rating */}
                  <div className="star-rating">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#F97316" color="#F97316" />
                    ))}
                  </div>

                  <p className="review-text">"{item.review}"</p>

                  <div className="author-info">
                    <img src={item.avatar} alt={item.name} className="author-avatar" />
                    <div>
                      <h4 className="author-name">{item.name}</h4>
                      <span className="author-role">{item.role}</span>
                    </div>
                    <span className="achievement-pill">{item.achievement}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="slider-dots">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
