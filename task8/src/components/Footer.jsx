import React, { useState } from 'react';
import { Dumbbell, MapPin, Phone, Mail, Clock, ArrowUp, Send, CheckCircle2 } from 'lucide-react';
import './Footer.css';

// Inline Social Icon Components
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElem = document.getElementById(targetId);
    if (targetElem) {
      const headerOffset = 80;
      const elementPosition = targetElem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer id="contact" className="footer-section">
      <div className="container">
        {/* Four Column Grid */}
        <div className="footer-grid">
          {/* Column 1: Gym Info & Social */}
          <div className="footer-col brand-col">
            <a href="#home" className="footer-logo" onClick={(e) => handleNavClick(e, '#home')}>
              <div className="logo-icon-bg">
                <Dumbbell size={22} />
              </div>
              <span className="logo-text">
                Fit<span className="highlight-orange">Zone</span>
              </span>
            </a>

            <p className="footer-brand-desc">
              FitZone Fitness Center is a commercial-grade gym equipped with cutting-edge machinery, expert trainers, and energetic group training programs to elevate your health and lifestyle.
            </p>

            <div className="footer-social-icons">
              <a href="#facebook" className="footer-social-link" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="#instagram" className="footer-social-link" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#twitter" className="footer-social-link" aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href="#linkedin" className="footer-social-link" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About Us</a></li>
              <li><a href="#programs" onClick={(e) => handleNavClick(e, '#programs')}>Programs</a></li>
              <li><a href="#trainers" onClick={(e) => handleNavClick(e, '#trainers')}>Our Trainers</a></li>
              <li><a href="#membership" onClick={(e) => handleNavClick(e, '#membership')}>Membership Plans</a></li>
              <li><a href="#testimonials" onClick={(e) => handleNavClick(e, '#testimonials')}>Testimonials</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div className="footer-col">
            <h4 className="footer-heading">Fitness Programs</h4>
            <ul className="footer-links">
              <li><a href="#programs" onClick={(e) => handleNavClick(e, '#programs')}>Strength Training</a></li>
              <li><a href="#programs" onClick={(e) => handleNavClick(e, '#programs')}>Weight Loss & HIIT</a></li>
              <li><a href="#programs" onClick={(e) => handleNavClick(e, '#programs')}>CrossFit & WOD</a></li>
              <li><a href="#programs" onClick={(e) => handleNavClick(e, '#programs')}>Yoga & Wellness</a></li>
              <li><a href="#programs" onClick={(e) => handleNavClick(e, '#programs')}>Personal Coaching</a></li>
              <li><a href="#programs" onClick={(e) => handleNavClick(e, '#programs')}>Nutritional Guidance</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Details & Newsletter */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Details</h4>
            <ul className="contact-list">
              <li>
                <MapPin size={18} className="contact-icon text-orange" />
                <span>124 Fitness Blvd, Suite 400, New York, NY 10001</span>
              </li>
              <li>
                <Phone size={18} className="contact-icon text-blue" />
                <span>+1 (800) 555-FITZONE</span>
              </li>
              <li>
                <Mail size={18} className="contact-icon text-orange" />
                <span>info@fitzonefitness.com</span>
              </li>
              <li>
                <Clock size={18} className="contact-icon text-blue" />
                <span>Mon-Fri: 5am-11pm | Sat-Sun: 6am-9pm (24/7 VIP Access)</span>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <div className="newsletter-box">
              <h5 className="newsletter-title">Subscribe to Newsletter</h5>
              {subscribed ? (
                <div className="newsletter-success">
                  <CheckCircle2 size={18} />
                  <span>Subscribed! Check your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} FitZone Fitness Center. All Rights Reserved. Built with React.
          </p>

          <div className="footer-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="divider">•</span>
            <a href="#terms">Terms & Conditions</a>
            <span className="divider">•</span>
            <a href="#sitemap">Sitemap</a>
          </div>

          {/* Back To Top Button */}
          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Back To Top">
            <ArrowUp size={18} />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
