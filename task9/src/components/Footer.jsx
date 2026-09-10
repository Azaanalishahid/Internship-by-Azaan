import React from 'react';
import { HeartPulse, Phone, Mail, MapPin, ArrowUp, Send, Globe, Share2, MessageCircle, AtSign } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialIcons = [
    { icon: Globe, label: 'Website' },
    { icon: Share2, label: 'Share' },
    { icon: MessageCircle, label: 'Chat' },
    { icon: AtSign, label: 'Social' }
  ];

  return (
    <footer style={{ background: '#0F172A', color: '#94A3B8', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container">
        
        {/* Main Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(226, 232, 240, 0.1)'
          }}
        >
          
          {/* COLUMN 1: Hospital Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #F97316 100%)',
                borderRadius: '10px',
                padding: '8px',
                display: 'flex'
              }}>
                <HeartPulse size={22} color="#FFFFFF" />
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Medi<span style={{ color: '#2563EB' }}>Care</span>
              </span>
            </div>

            <p style={{ fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem', color: '#94A3B8' }}>
              Leading healthcare institution dedicated to providing compassionate medical care, certified specialists, and instant online doctor appointments.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socialIcons.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <a
                    key={idx}
                    href="#social"
                    aria-label={item.label}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#CBD5E1',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#2563EB';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.color = '#CBD5E1';
                    }}
                  >
                    <IconComp size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.25rem' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Home', 'Doctors', 'Departments', 'Appointments', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    style={{
                      color: '#94A3B8',
                      textDecoration: 'none',
                      fontSize: '0.925rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#F97316')}
                    onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Departments */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.25rem' }}>
              Departments
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['General Medicine', 'Cardiology Wing', 'Orthopedics Center', 'Neurology Clinic', 'Pediatrics Care', 'Emergency Response'].map((dept) => (
                <li key={dept}>
                  <a
                    href="#doctors"
                    style={{
                      color: '#94A3B8',
                      textDecoration: 'none',
                      fontSize: '0.925rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#2563EB')}
                    onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}
                  >
                    {dept}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Contact & Newsletter */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.25rem' }}>
              Contact & Newsletter
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MapPin size={18} color="#F97316" />
                <span>123 Medical Avenue, Health City</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={18} color="#2563EB" />
                <span>+92 300 1234567</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={18} color="#10B981" />
                <span>support@medicare.com</span>
              </div>
            </div>

            {/* Newsletter Input */}
            <form onSubmit={(e) => e.preventDefault()} style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="Your email address..."
                style={{
                  width: '100%',
                  padding: '0.75rem 2.8rem 0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#2563EB',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  color: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright & Back To Top */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.875rem'
          }}
        >
          <div>
            © {new Date().getFullYear()} MediCare Hospital System. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#privacy" style={{ color: '#94A3B8', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#terms" style={{ color: '#94A3B8', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#cookies" style={{ color: '#94A3B8', textDecoration: 'none' }}>Cookie Settings</a>
          </div>

          {/* Back To Top Button */}
          <button
            onClick={scrollToTop}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#2563EB')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
          >
            <span>Back To Top</span>
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
