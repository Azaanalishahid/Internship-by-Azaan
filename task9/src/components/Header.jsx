import React, { useState } from 'react';
import { HeartPulse, Menu, X, Calendar, PhoneCall } from 'lucide-react';

const Header = ({ onOpenBookingModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Departments', href: '#departments' },
    { name: 'Appointments', href: '#appointments' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-header">
      <div className="container flex items-center justify-between h-20" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        
        {/* Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #2563EB 0%, #F97316 100%)',
            borderRadius: '12px',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
          }}>
            <HeartPulse className="animate-heartbeat" size={26} color="#FFFFFF" />
          </div>
          <div>
            <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#1F2937' }}>
              Medi<span style={{ color: '#2563EB' }}>Care</span>
            </span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: '#F97316', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Health System
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: '#4B5563',
                fontWeight: '600',
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#2563EB')}
              onMouseLeave={(e) => (e.target.style.color = '#4B5563')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => onOpenBookingModal()}
            className="btn-primary desktop-cta"
            style={{
              backdropFilter: 'blur(10px)',
              cursor: 'pointer'
            }}
          >
            <Calendar size={18} />
            <span>Book Appointment</span>
          </button>

          {/* Hamburger Icon for Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger"
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#1F2937',
              padding: '8px'
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#1F2937',
                fontWeight: '600',
                fontSize: '1.1rem',
                textDecoration: 'none',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid #F1F5F9'
              }}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBookingModal();
            }}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
          >
            <Calendar size={18} />
            <span>Book Appointment</span>
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
