import React from 'react';
import { Calendar, UserCheck, ShieldCheck, Clock, Users, ArrowRight, HeartPulse, Sparkles } from 'lucide-react';

const Hero = ({ onOpenBookingModal }) => {
  return (
    <section id="home" style={{ position: 'relative', overflow: 'hidden', padding: '4rem 0 6rem 0' }}>
      
      {/* Background Glowing Circles */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: -1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: -1
      }} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }} className="hero-grid">
          
          {/* LEFT CONTENT */}
          <div className="animate-fade-in">
            
            {/* Tagline Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '9999px', color: '#2563EB', fontWeight: '700', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              <Sparkles size={16} color="#F97316" />
              <span>Book Your Appointment with Trusted Doctors</span>
            </div>

            {/* Main Headline */}
            <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.15, color: '#1F2937', marginBottom: '1.5rem', letterSpacing: '-0.025em' }}>
              Your Health, <br />
              <span className="text-gradient-blue">Our Highest</span> <span className="text-gradient-orange">Priority</span>
            </h1>

            {/* Paragraph */}
            <p style={{ fontSize: '1.125rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '520px' }}>
              Book appointments with experienced doctors in just a few clicks. Fast, secure, and reliable healthcare services tailored to your needs.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <button
                onClick={() => onOpenBookingModal()}
                className="btn-primary"
                style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}
              >
                <Calendar size={20} />
                <span>Book Appointment</span>
              </button>

              <a
                href="#doctors"
                className="btn-secondary"
                style={{ fontSize: '1rem', padding: '0.85rem 1.8rem', textDecoration: 'none' }}
              >
                <span>View Doctors</span>
                <ArrowRight size={18} />
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShieldCheck size={22} color="#2563EB" />
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#4B5563' }}>Verified Specialists</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Clock size={22} color="#F97316" />
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#4B5563' }}>Instant Booking</span>
              </div>
            </div>

          </div>

          {/* RIGHT GRAPHIC & FLOATING CARDS */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            
            {/* Background Decorative Rings */}
            <div style={{
              position: 'absolute',
              width: '90%',
              height: '90%',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)',
              transform: 'rotate(-4deg)',
              zIndex: 0
            }} />

            {/* Main Image */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '500px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.25)',
              border: '4px solid #FFFFFF',
              zIndex: 1
            }}>
              <img
                src="/hero-doctor.jpg"
                alt="MediCare Doctor and Patient Care"
                style={{ width: '100%', height: 'auto', display: 'block', transform: 'scale(1.02)' }}
              />
            </div>

            {/* FLOATING CARD 1: Available Doctors */}
            <div className="glass-card animate-float" style={{
              position: 'absolute',
              top: '10%',
              left: '-8%',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              zIndex: 2,
              animationDelay: '0s'
            }}>
              <div style={{ background: 'rgba(37, 99, 235, 0.15)', padding: '10px', borderRadius: '12px', color: '#2563EB' }}>
                <UserCheck size={22} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Available Today</p>
                <p style={{ fontSize: '1rem', fontWeight: '800', color: '#1F2937' }}>50+ Doctors</p>
              </div>
            </div>

            {/* FLOATING CARD 2: 24/7 Support */}
            <div className="glass-card animate-float" style={{
              position: 'absolute',
              bottom: '15%',
              left: '-5%',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              zIndex: 2,
              animationDelay: '1.5s'
            }}>
              <div style={{ background: 'rgba(249, 115, 22, 0.15)', padding: '10px', borderRadius: '12px', color: '#F97316' }}>
                <HeartPulse size={22} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Emergency</p>
                <p style={{ fontSize: '1rem', fontWeight: '800', color: '#1F2937' }}>24/7 Support</p>
              </div>
            </div>

            {/* FLOATING CARD 3: 1000+ Patients */}
            <div className="glass-card animate-float" style={{
              position: 'absolute',
              bottom: '8%',
              right: '-5%',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              zIndex: 2,
              animationDelay: '2.5s'
            }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '10px', borderRadius: '12px', color: '#10B981' }}>
                <Users size={22} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Happy Patients</p>
                <p style={{ fontSize: '1rem', fontWeight: '800', color: '#1F2937' }}>1000+ Patients</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: center;
          }
          .hero-grid h1 {
            font-size: 2.75rem !important;
          }
          .hero-grid p {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-grid div[style*="justify-content"] {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
