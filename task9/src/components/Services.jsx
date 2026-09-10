import React, { useState } from 'react';
import { Stethoscope, HeartPulse, Bone, Brain, Baby, AlertTriangle, ArrowRight, CheckCircle, X } from 'lucide-react';

const Services = () => {
  const [activeModalService, setActiveModalService] = useState(null);

  const servicesData = [
    {
      id: 1,
      title: 'General Medicine',
      icon: Stethoscope,
      color: '#2563EB',
      bgColor: 'rgba(37, 99, 235, 0.1)',
      description: 'Comprehensive adult medical care, routine checkups, diagnostic testing, and chronic illness management.',
      details: [
        'Preventive Health Screenings & Wellness Examinations',
        'Management of Diabetes, Hypertension & Cholesterol',
        'Acute Illness Treatment & Prescription Management',
        'Vaccination & Immunization Services'
      ]
    },
    {
      id: 2,
      title: 'Cardiology',
      icon: HeartPulse,
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
      description: 'Advanced cardiac diagnosis, ECG, echocardiography, interventional cardiology, and heart disease prevention.',
      details: [
        '24/7 Coronary Emergency & Angioplasty',
        'Echocardiogram & Stress Testing Diagnostics',
        'Heart Failure & Arrhythmia Clinic',
        'Post-Cardiac Surgery Rehabilitation'
      ]
    },
    {
      id: 3,
      title: 'Orthopedics',
      icon: Bone,
      color: '#F97316',
      bgColor: 'rgba(249, 115, 22, 0.1)',
      description: 'Bone, joint, and spinal care, arthroscopic surgery, fracture management, and physical rehabilitation.',
      details: [
        'Joint Replacement Surgery (Knee & Hip)',
        'Sports Injury Treatment & Reconstruction',
        'Spine Care & Pain Management',
        'Osteoporosis & Trauma Care'
      ]
    },
    {
      id: 4,
      title: 'Neurology',
      icon: Brain,
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      description: 'Expert care for brain, nerve, and spinal disorders including stroke care, epilepsy, and migraine relief.',
      details: [
        'Acute Stroke Intervention Unit',
        'EEG, EMG, & Nerve Conduction Studies',
        'Epilepsy & Movement Disorder Management',
        'Memory & Dementia Specialty Clinic'
      ]
    },
    {
      id: 5,
      title: 'Pediatrics',
      icon: Baby,
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      description: 'Specialized healthcare for infants, children, and adolescents with a compassionate, child-friendly approach.',
      details: [
        'Newborn & Neonatal Intensive Care (NICU)',
        'Childhood Growth & Development Monitoring',
        'Pediatric Vaccination Programs',
        'Asthma & Allergy Management'
      ]
    },
    {
      id: 6,
      title: 'Emergency Care',
      icon: AlertTriangle,
      color: '#DC2626',
      bgColor: 'rgba(220, 38, 38, 0.1)',
      description: '24/7 trauma unit equipped for urgent life-saving interventions, critical care, and rapid ambulance response.',
      details: [
        'Round-the-Clock Trauma & Resuscitation',
        'Advanced Cardiac Life Support (ACLS)',
        'Fully Equipped Mobile ICU Ambulances',
        'Immediate Surgical Triage'
      ]
    },
  ];

  return (
    <section id="services" className="section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge-tag badge-blue" style={{ marginBottom: '0.75rem' }}>
            <span>Comprehensive Healthcare</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1F2937', letterSpacing: '-0.02em' }}>
            Our Medical <span className="text-gradient-blue">Services</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: '1.05rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            Delivering world-class healthcare with state-of-the-art medical equipment and highly skilled medical specialists.
          </p>
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {servicesData.map((service) => {
            const IconComp = service.icon;
            return (
              <div
                key={service.id}
                className="glass-card"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#FFFFFF'
                }}
              >
                <div style={{
                  background: service.bgColor,
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: service.color,
                  marginBottom: '1.5rem'
                }}>
                  <IconComp size={32} />
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#1F2937', marginBottom: '0.75rem' }}>
                  {service.title}
                </h3>

                <p style={{ color: '#6B7280', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.75rem', flexGrow: 1 }}>
                  {service.description}
                </p>

                <button
                  onClick={() => setActiveModalService(service)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#2563EB',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: 0
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#F97316')}
                  onMouseLeave={(e) => (e.target.style.color = '#2563EB')}
                >
                  <span>Learn More</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Details Modal */}
      {activeModalService && (
        <div className="modal-overlay" onClick={() => setActiveModalService(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveModalService(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#6B7280'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{
                background: activeModalService.bgColor,
                color: activeModalService.color,
                padding: '12px',
                borderRadius: '14px'
              }}>
                {React.createElement(activeModalService.icon, { size: 30 })}
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1F2937' }}>
                  {activeModalService.title}
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: '600' }}>MediCare Specialized Wing</span>
              </div>
            </div>

            <p style={{ color: '#4B5563', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {activeModalService.description}
            </p>

            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1F2937', marginBottom: '1rem' }}>
              Key Clinical Offerings:
            </h4>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {activeModalService.details.map((detail, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.925rem', color: '#374151' }}>
                  <CheckCircle size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setActiveModalService(null)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Close Window</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
