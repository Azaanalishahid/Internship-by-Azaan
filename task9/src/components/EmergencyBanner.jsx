import React from 'react';
import { PhoneCall, AlertCircle, ShieldAlert } from 'lucide-react';

const EmergencyBanner = () => {
  return (
    <section id="contact" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #1D4ED8 100%)',
            borderRadius: '24px',
            padding: '3.5rem 3rem',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.4)'
          }}
          className="emergency-banner-box"
        >
          {/* Background Decorative Ripples */}
          <div
            style={{
              position: 'absolute',
              right: '-5%',
              top: '-20%',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              position: 'relative',
              zIndex: 1
            }}
            className="emergency-banner-flex"
          >
            {/* Left Content */}
            <div style={{ maxWidth: '600px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 1rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}
              >
                <ShieldAlert size={16} color="#F97316" />
                <span>24/7 Rapid Emergency Response</span>
              </div>

              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '0.75rem' }}>
                Need Immediate Medical Help?
              </h2>

              <p style={{ fontSize: '1.1rem', color: '#DBEAFE', lineHeight: 1.5 }}>
                Our 24-hour emergency trauma team, critical care ambulances, and surgical units are standing by to assist you.
              </p>
            </div>

            {/* Right Action & Phone Number */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '1rem'
              }}
              className="emergency-banner-right"
            >
              <div style={{ textAlign: 'right' }} className="phone-text-right">
                <span style={{ fontSize: '0.875rem', color: '#93C5FD', fontWeight: '600', textTransform: 'uppercase' }}>
                  Emergency Hotline
                </span>
                <div
                  style={{
                    fontSize: '2.25rem',
                    fontWeight: '900',
                    letterSpacing: '0.02em',
                    color: '#FFFFFF',
                    marginTop: '0.2rem'
                  }}
                >
                  +92 300 1234567
                </div>
              </div>

              <a
                href="tel:+923001234567"
                className="btn-orange"
                style={{
                  padding: '1rem 2.25rem',
                  fontSize: '1.1rem',
                  textDecoration: 'none'
                }}
              >
                <PhoneCall size={22} className="animate-heartbeat" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .emergency-banner-box {
            padding: 2.5rem 1.5rem !important;
          }
          .emergency-banner-flex {
            flex-direction: column !alignment;
            text-align: center;
          }
          .emergency-banner-right {
            align-items: center !important;
            width: 100%;
          }
          .phone-text-right {
            text-align: center !important;
          }
          .emergency-banner-flex h2 {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default EmergencyBanner;
