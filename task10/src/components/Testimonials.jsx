import React from 'react';
import { Star, Quote, Heart } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Lead Staff Engineer',
    company: 'Google',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    review: 'CareerConnect completely transformed my job search experience! Within 2 weeks of updating my profile, I received 3 direct interview invitations from Google and Microsoft.',
    rating: 5
  },
  {
    name: 'David Chen',
    role: 'Senior Product Designer',
    company: 'Meta',
    photo: '/images/avatar.jpg',
    review: 'The sleek interface, verified job listings, and one-click application process saved me dozens of hours. I landed my dream remote design role with an incredible compensation package.',
    rating: 5
  },
  {
    name: 'Elena Rostova',
    role: 'Cloud Architect',
    company: 'Amazon Web Services',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    review: 'As an international candidate, finding legitimate remote tech opportunities used to be daunting. CareerConnect provided transparent salary ranges and direct access to hiring managers.',
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-orange">
            <Heart size={16} /> Real Success Stories
          </span>
          <h2 className="section-heading">Loved By Thousands of Job Seekers</h2>
          <p className="section-subtitle">
            Hear from professionals who advanced their careers and hired top talent using CareerConnect.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((item, index) => (
            <div key={index} className="testimonial-card glass-card">
              <div className="card-quote-icon">
                <Quote size={32} />
              </div>

              <div className="rating-stars">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={18} className="star" />
                ))}
              </div>

              <p className="review-text">"{item.review}"</p>

              <div className="author-box">
                <img src={item.photo} alt={item.name} className="author-photo" />
                <div className="author-details">
                  <h4 className="author-name">{item.name}</h4>
                  <p className="author-role">{item.role} at <span className="company-tag">{item.company}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-section {
          padding: 5rem 0;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2rem;
        }
        .testimonial-card {
          position: relative;
          padding: 2.2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: var(--radius-lg);
        }
        .card-quote-icon {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          color: rgba(37, 99, 235, 0.15);
        }
        .rating-stars {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 1.25rem;
        }
        .star {
          fill: #F59E0B;
          color: #F59E0B;
        }
        .review-text {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-main);
          font-style: italic;
          margin-bottom: 1.75rem;
        }
        .author-box {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }
        .author-photo {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--secondary-blue);
        }
        .author-name {
          font-weight: 800;
          font-size: 1.05rem;
        }
        .author-role {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .company-tag {
          font-weight: 700;
          color: var(--secondary-blue);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
