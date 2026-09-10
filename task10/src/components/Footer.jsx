import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp, 
  Send
} from 'lucide-react';
import { 
  TwitterIcon, 
  LinkedinIcon, 
  FacebookIcon, 
  GithubIcon, 
  InstagramIcon 
} from './SocialIcons';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { addToast } = useAuth();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    addToast(`Thank you for subscribing with ${newsletterEmail}!`);
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      {/* Newsletter Section Banner */}
      <div className="container">
        <div className="newsletter-box glass-card">
          <div className="newsletter-text">
            <h3 className="newsletter-title">Subscribe to Weekly Career Insights</h3>
            <p className="newsletter-sub">Get tailored job alerts, interview tips, and salary trends delivered straight to your inbox.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <div className="newsletter-input-wrapper">
              <Mail size={18} className="mail-icon" />
              <input 
                type="email" 
                placeholder="Enter your email address..." 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-accent">
              <span>Subscribe</span>
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Main 4 Columns Footer */}
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Column 1: Brand Info */}
          <div className="footer-col brand-col">
            <Link to="/" className="brand-logo">
              <div className="logo-icon">
                <Briefcase size={22} color="#FFFFFF" />
              </div>
              <span className="logo-text">
                Career<span className="accent">Connect</span>
              </span>
            </Link>

            <p className="brand-desc">
              CareerConnect is the world's leading premium recruitment and career platform, connecting top talent with industry pioneers.
            </p>

            <div className="social-links">
              <a href="#twitter" aria-label="Twitter" className="social-icon"><TwitterIcon size={18} /></a>
              <a href="#linkedin" aria-label="LinkedIn" className="social-icon"><LinkedinIcon size={18} /></a>
              <a href="#facebook" aria-label="Facebook" className="social-icon"><FacebookIcon size={18} /></a>
              <a href="#github" aria-label="GitHub" className="social-icon"><GithubIcon size={18} /></a>
              <a href="#instagram" aria-label="Instagram" className="social-icon"><InstagramIcon size={18} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="col-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><a href="/#jobs">Featured Jobs</a></li>
              <li><a href="/#companies">Top Companies</a></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="footer-col">
            <h4 className="col-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="#blog" onClick={(e) => { e.preventDefault(); addToast('Career Advice Blog coming soon!'); }}>Career Blog</a></li>
              <li><a href="#salary" onClick={(e) => { e.preventDefault(); addToast('Salary Estimator Tool coming soon!'); }}>Salary Calculator</a></li>
              <li><a href="#resume" onClick={(e) => { e.preventDefault(); addToast('Resume Review Service active!'); }}>Resume Advice</a></li>
              <li><a href="#interview" onClick={(e) => { e.preventDefault(); addToast('Interview prep kits available in Dashboard'); }}>Interview Guide</a></li>
              <li><a href="#support" onClick={(e) => { e.preventDefault(); addToast('24/7 Support line: support@careerconnect.com'); }}>Help & Support</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-col">
            <h4 className="col-title">Contact Us</h4>
            <ul className="contact-list">
              <li>
                <MapPin size={18} className="contact-icon" />
                <span>100 Innovation Way, Suite 500, San Francisco, CA 94105</span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <span>+1 (800) 555-CAREER</span>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <span>contact@careerconnect.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CareerConnect Inc. All rights reserved.</p>

          <div className="legal-links">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); addToast('Privacy Policy details...'); }}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); addToast('Terms & Conditions details...'); }}>Terms & Conditions</a>
            <a href="#cookies" onClick={(e) => { e.preventDefault(); addToast('Cookie Settings'); }}>Cookie Settings</a>
          </div>

          {/* Floating Back To Top Button */}
          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Back to Top">
            <ArrowUp size={20} />
          </button>
        </div>
      </div>

      <style>{`
        .footer-section {
          background: #0F172A;
          color: #94A3B8;
          padding-top: 3rem;
          position: relative;
        }
        .newsletter-box {
          margin-bottom: 4rem;
          padding: 2.5rem;
          background: rgba(30, 41, 59, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          border-radius: var(--radius-lg);
        }
        .newsletter-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #FFF;
          margin-bottom: 0.3rem;
        }
        .newsletter-sub {
          font-size: 0.95rem;
          color: #94A3B8;
        }
        .newsletter-form {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          max-width: 500px;
        }
        .newsletter-input-wrapper {
          position: relative;
          flex: 1;
        }
        .mail-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #64748B;
        }
        .newsletter-input-wrapper input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.8rem;
          border-radius: var(--radius-md);
          border: 1px solid #334155;
          background: #0F172A;
          color: #FFF;
          font-size: 0.95rem;
          outline: none;
        }
        .newsletter-input-wrapper input:focus {
          border-color: var(--secondary-blue);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.8fr 0.8fr 1fr;
          gap: 3rem;
          padding-bottom: 3.5rem;
          border-bottom: 1px solid #1E293B;
        }
        .brand-col .brand-logo {
          margin-bottom: 1.25rem;
        }
        .brand-col .logo-text {
          color: #FFF;
        }
        .brand-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .social-links {
          display: flex;
          gap: 0.75rem;
        }
        .social-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #1E293B;
          color: #94A3B8;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .social-icon:hover {
          background: var(--secondary-blue);
          color: #FFF;
          transform: translateY(-2px);
        }
        .col-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #FFF;
          margin-bottom: 1.5rem;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-links a {
          color: #94A3B8;
          font-size: 0.95rem;
          transition: color 0.2s ease;
        }
        .footer-links a:hover {
          color: var(--secondary-blue);
        }
        .contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .contact-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.9rem;
        }
        .contact-icon {
          color: var(--secondary-blue);
          flex-shrink: 0;
          margin-top: 3px;
        }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem 0;
          font-size: 0.9rem;
        }
        .legal-links {
          display: flex;
          gap: 1.5rem;
        }
        .legal-links a {
          color: #94A3B8;
          transition: color 0.2s ease;
        }
        .legal-links a:hover {
          color: #FFF;
        }
        .back-to-top-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--secondary-blue);
          color: #FFF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
          transition: all 0.2s ease;
        }
        .back-to-top-btn:hover {
          background: var(--accent-orange);
          transform: translateY(-3px);
        }

        @media (max-width: 900px) {
          .newsletter-box {
            flex-direction: column;
            text-align: center;
          }
          .newsletter-form {
            width: 100%;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
