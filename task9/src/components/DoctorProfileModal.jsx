import React from 'react';
import { X, Star, Building, Mail, Phone, MapPin, Award, Calendar, ShieldCheck } from 'lucide-react';

const DoctorProfileModal = ({ doctor, onClose, onBookDoctor }) => {
  if (!doctor) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
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
            color: '#6B7280',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        {/* Doctor Header Banner */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <img
            src={doctor.avatar}
            alt={doctor.name}
            style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid #2563EB',
              boxShadow: '0 8px 20px rgba(37, 99, 235, 0.25)'
            }}
          />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <ShieldCheck size={18} color="#2563EB" />
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#2563EB', textTransform: 'uppercase' }}>
                Verified Medical Specialist
              </span>
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1F2937' }}>
              {doctor.titleName}
            </h3>

            <p style={{ color: '#F97316', fontWeight: '700', fontSize: '1rem', marginTop: '0.1rem' }}>
              {doctor.specialization} Specialist
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.4rem' }}>
              <Star size={16} fill="#F97316" color="#F97316" />
              <span style={{ fontWeight: '700', color: '#1F2937' }}>{doctor.rating}</span>
              <span style={{ color: '#6B7280', fontSize: '0.85rem' }}>({doctor.reviewCount} satisfied patients)</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div style={{ background: '#F8FAFC', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1F2937', marginBottom: '0.4rem' }}>
            Doctor Biography
          </h4>
          <p style={{ color: '#4B5563', lineHeight: 1.6, fontSize: '0.925rem' }}>
            {doctor.bio}
          </p>
        </div>

        {/* Hospital & Contact Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '8px', borderRadius: '10px', color: '#2563EB' }}>
              <Building size={18} />
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Hospital</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1F2937' }}>{doctor.hospitalName}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '8px', borderRadius: '10px', color: '#F97316' }}>
              <Award size={18} />
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Clinical Experience</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1F2937' }}>{doctor.experience}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '8px', borderRadius: '10px', color: '#10B981' }}>
              <MapPin size={18} />
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Clinic Location</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1F2937' }}>{doctor.address}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '8px', borderRadius: '10px', color: '#8B5CF6' }}>
              <Mail size={18} />
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Direct Contact</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1F2937' }}>{doctor.email}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            onClose();
            onBookDoctor(doctor);
          }}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '1rem' }}
        >
          <Calendar size={18} />
          <span>Book Appointment with {doctor.titleName}</span>
        </button>

      </div>
    </div>
  );
};

export default DoctorProfileModal;
