import React from 'react';
import { Plus, Minus, CalendarCheck, RotateCcw, Activity } from 'lucide-react';

const AppointmentCounter = ({ count, setCount }) => {
  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => setCount((prev) => Math.max(0, prev - 1));
  const handleReset = () => setCount(10);

  return (
    <section id="appointments" style={{ padding: '4rem 0' }}>
      <div className="container">
        <div
          className="glass-card"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.85) 100%)',
            border: '2px solid rgba(37, 99, 235, 0.2)',
            boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.15)',
            padding: '3rem 2rem',
            textAlign: 'center',
            maxWidth: '750px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Background Icon Decoration */}
          <CalendarCheck
            size={220}
            color="#2563EB"
            style={{
              position: 'absolute',
              right: '-40px',
              bottom: '-40px',
              opacity: 0.05,
              pointerEvents: 'none'
            }}
          />

          {/* Section Tag */}
          <div className="badge-tag badge-orange" style={{ marginBottom: '1rem' }}>
            <Activity size={16} />
            <span>Live Schedule Tracker</span>
          </div>

          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#1F2937', marginBottom: '0.5rem' }}>
            Today's <span className="text-gradient-blue">Appointments Counter</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 2.5rem auto' }}>
            Track and manage real-time patient appointments scheduled for today across all OPD departments.
          </p>

          {/* COUNTER INTERFACE */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '1.25rem 2.5rem',
              borderRadius: '24px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
              border: '1px solid #E2E8F0',
              marginBottom: '2rem'
            }}
          >
            {/* Decrease Button */}
            <button
              onClick={handleDecrease}
              disabled={count === 0}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                border: 'none',
                background: count === 0 ? '#E2E8F0' : '#F97316',
                color: count === 0 ? '#9CA3AF' : '#FFFFFF',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                cursor: count === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: count === 0 ? 'none' : '0 6px 16px rgba(249, 115, 22, 0.35)',
                transition: 'all 0.2s ease'
              }}
              title="Decrease Appointment Count"
            >
              <Minus size={24} />
            </button>

            {/* Display Number */}
            <div style={{ minWidth: '130px' }}>
              <div
                style={{
                  fontSize: '3.75rem',
                  fontWeight: '900',
                  color: '#2563EB',
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {count}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', marginTop: '0.4rem', letterSpacing: '0.05em' }}>
                Appointments Today
              </div>
            </div>

            {/* Increase Button */}
            <button
              onClick={handleIncrease}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                border: 'none',
                background: '#2563EB',
                color: '#FFFFFF',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 16px rgba(37, 99, 235, 0.35)',
                transition: 'all 0.2s ease'
              }}
              title="Increase Appointment Count"
            >
              <Plus size={24} />
            </button>
          </div>

          {/* Bottom Controls & Capacity Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '0.9rem', color: '#4B5563', fontWeight: '600' }}>
              Hospital OPD Capacity: <strong style={{ color: count >= 25 ? '#EF4444' : '#10B981' }}>{count >= 25 ? 'High Volume' : 'Optimal'}</strong>
            </div>

            <button
              onClick={handleReset}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#6B7280',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#2563EB')}
              onMouseLeave={(e) => (e.target.style.color = '#6B7280')}
            >
              <RotateCcw size={14} />
              <span>Reset Default (10)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentCounter;
