import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ArrowRight, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CTA = () => {
  const { user } = useAuth();

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card glass-card">
          <div className="cta-content">
            <span className="badge badge-orange white-badge">
              <Rocket size={16} /> Take The Next Step
            </span>
            <h2 className="cta-heading">Ready to Start Your Career?</h2>
            <p className="cta-text">
              Join over 200,000+ professionals who discovered their dream careers and accelerated their trajectory with CareerConnect.
            </p>
            <div className="cta-buttons">
              <a href="#jobs" className="btn btn-primary cta-btn-main">
                <span>Browse Jobs</span>
                <ArrowRight size={18} />
              </a>
              {!user ? (
                <Link to="/login?tab=register" className="btn btn-outline cta-btn-sub">
                  <UserPlus size={18} />
                  <span>Create Account</span>
                </Link>
              ) : (
                <Link to="/dashboard" className="btn btn-outline cta-btn-sub">
                  <span>Go to Dashboard</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cta-section {
          padding: 4rem 0 6rem 0;
        }
        .cta-card {
          padding: 4rem 2rem;
          text-align: center;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.95) 0%, rgba(29, 78, 216, 0.95) 100%);
          color: #FFFFFF;
          border-radius: 28px;
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.3);
          border: none;
          position: relative;
          overflow: hidden;
        }
        .cta-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 400px;
          height: 400px;
          background: rgba(249, 115, 22, 0.3);
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }
        .cta-content {
          position: relative;
          z-index: 1;
          max-width: 720px;
          margin: 0 auto;
        }
        .white-badge {
          background: rgba(255, 255, 255, 0.2);
          color: #FFF;
          backdrop-filter: blur(8px);
        }
        .cta-heading {
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 1rem 0;
        }
        .cta-text {
          font-size: 1.2rem;
          opacity: 0.9;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }
        .cta-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
        .cta-btn-main {
          background: #FFFFFF;
          color: var(--secondary-blue);
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .cta-btn-main:hover {
          background: #F8FAFC;
          color: #1D4ED8;
        }
        .cta-btn-sub {
          border-color: #FFFFFF;
          color: #FFFFFF;
        }
        .cta-btn-sub:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
        }
        @media (max-width: 640px) {
          .cta-heading {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default CTA;
