import React from 'react';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import './CTA.css';

export default function CTA({ onOpenJoinModal }) {
  const handleContactClick = (e) => {
    e.preventDefault();
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-banner">
          {/* Decorative Glowing Shapes */}
          <div className="cta-shape shape-blue" />
          <div className="cta-shape shape-orange" />

          <div className="cta-content">
            <div className="cta-badge">
              <Sparkles size={16} /> Limited Time Special Offer
            </div>

            <h2 className="cta-heading">
              Ready To Start Your <span className="text-orange-glow">Fitness Journey?</span>
            </h2>

            <p className="cta-subheading">
              Join FitZone Fitness today and get your first week 100% free plus a complimentary personal fitness assessment and nutrition guide.
            </p>

            <div className="cta-buttons">
              <button className="btn btn-accent-orange cta-btn-lg" onClick={onOpenJoinModal}>
                Join Today
                <ArrowRight size={20} />
              </button>

              <button className="btn btn-primary-blue cta-btn-lg" onClick={handleContactClick}>
                <PhoneCall size={18} />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
