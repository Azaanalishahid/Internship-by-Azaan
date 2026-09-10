import React from 'react';
import { Award, Cpu, Clock, Laptop, DollarSign, Smile } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: 'Certified Doctors',
      icon: Award,
      color: '#2563EB',
      description: 'Board-certified specialists with extensive global training and proven clinical success.'
    },
    {
      id: 2,
      title: 'Advanced Equipment',
      icon: Cpu,
      color: '#F97316',
      description: 'Cutting-edge diagnostic imaging, robotic surgery facilities, and modern laboratories.'
    },
    {
      id: 3,
      title: '24/7 Emergency',
      icon: Clock,
      color: '#EF4444',
      description: 'Round-the-clock emergency response teams, trauma care, and swift ambulance dispatched.'
    },
    {
      id: 4,
      title: 'Online Booking',
      icon: Laptop,
      color: '#10B981',
      description: 'Hassle-free instant appointment scheduling and digital medical records access.'
    },
    {
      id: 5,
      title: 'Affordable Care',
      icon: DollarSign,
      color: '#8B5CF6',
      description: 'Transparent pricing policies with complete insurance assistance and zero hidden charges.'
    },
    {
      id: 6,
      title: 'Patient Satisfaction',
      icon: Smile,
      color: '#06B6D4',
      description: 'Over 98% positive patient ratings with empathetic care and individual attention.'
    },
  ];

  return (
    <section id="departments" style={{ padding: '5rem 0', background: 'rgba(255, 255, 255, 0.4)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge-tag badge-orange" style={{ marginBottom: '0.75rem' }}>
            <span>Excellence In Care</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1F2937', letterSpacing: '-0.02em' }}>
            Why Choose <span className="text-gradient-orange">MediCare Hospital</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: '1.05rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            We combine medical expertise, cutting-edge technology, and patient-centered care for superior health outcomes.
          </p>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {features.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="glass-card"
                style={{
                  padding: '2rem',
                  borderRadius: '20px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  transition: 'all 0.35s ease'
                }}
              >
                <div
                  style={{
                    background: `${item.color}15`,
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    marginBottom: '1.25rem'
                  }}
                >
                  <IconComponent size={28} />
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1F2937', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>

                <p style={{ color: '#6B7280', fontSize: '0.925rem', lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
