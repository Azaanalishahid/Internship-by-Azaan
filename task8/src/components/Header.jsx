import React, { useState, useEffect } from 'react';
import { Dumbbell, Menu, X, ChevronRight, PhoneCall } from 'lucide-react';
import './Header.css';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Programs', href: '#programs' },
  { name: 'Trainers', href: '#trainers' },
  { name: 'Membership', href: '#membership' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Header({ onOpenJoinModal }) {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Section highlight
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    <header className={`header ${isScrolled ? 'scrolled glass-header' : 'transparent-header'}`}>
      <div className="container header-container">
        {/* Brand Logo */}
        <a href="#home" className="logo" onClick={(e) => handleNavClick(e, '#home')}>
          <div className="logo-icon-bg">
            <Dumbbell className="logo-icon" size={24} />
          </div>
          <span className="logo-text">
            Fit<span className="highlight-orange">Zone</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`nav-link ${activeSection === item.href.substring(1) ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.name}
              {activeSection === item.href.substring(1) && <span className="active-dot" />}
            </a>
          ))}
        </nav>

        {/* CTA & Actions */}
        <div className="header-actions">
          <button className="btn btn-accent-orange header-cta" onClick={onOpenJoinModal}>
            Join Now
            <ChevronRight size={18} />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-header">
            <div className="logo">
              <div className="logo-icon-bg">
                <Dumbbell size={20} />
              </div>
              <span className="logo-text">
                Fit<span className="highlight-orange">Zone</span>
              </span>
            </div>
            <button className="close-drawer-btn" onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <ul className="mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`mobile-nav-link ${activeSection === item.href.substring(1) ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                  <ChevronRight size={16} />
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-drawer-footer">
            <button className="btn btn-accent-orange full-width" onClick={() => { setMobileMenuOpen(false); onOpenJoinModal(); }}>
              Join Now & Get 20% Off
            </button>
            <div className="mobile-contact-info">
              <PhoneCall size={16} />
              <span>+1 (800) 555-FITZONE</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
