import React from 'react';
import { Star, Mail, Phone, Building, Award, Calendar, Eye, CheckCircle2 } from 'lucide-react';

const DoctorCard = ({ doctor, onBook, onViewProfile }) => {
  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '1.5rem',
        position: 'relative',
        border: '1px solid rgba(37, 99, 235, 0.15)',
        background: '#FFFFFF',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Availability Badge */}
      {doctor.availableToday && (
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(16, 185, 129, 0.12)',
            color: '#059669',
            padding: '0.3rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <CheckCircle2 size={14} />
          <span>Available Today</span>
        </div>
      )}

      {/* Avatar & Header Info */}
      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={doctor.avatar}
            alt={doctor.name}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #2563EB',
              boxShadow: '0 6px 16px rgba(37, 99, 235, 0.2)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: '#10B981',
              border: '2px solid #FFFFFF'
            }}
          />
        </div>

        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1F2937', lineHeight: 1.25 }}>
            {doctor.titleName}
          </h3>
          <p style={{ color: '#2563EB', fontWeight: '700', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            {doctor.specialization}
          </p>
          
          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.4rem' }}>
            <Star size={16} fill="#F97316" color="#F97316" />
            <span style={{ fontWeight: '700', fontSize: '0.875rem', color: '#1F2937' }}>{doctor.rating}</span>
            <span style={{ color: '#6B7280', fontSize: '0.8rem' }}>({doctor.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Details List */}
      <div
        style={{
          background: '#F8FAFC',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          flexGrow: 1
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: '#4B5563' }}>
          <Building size={16} color="#2563EB" />
          <span style={{ fontWeight: '600' }}>{doctor.hospitalName}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: '#4B5563' }}>
          <Award size={16} color="#F97316" />
          <span>Experience: <strong style={{ color: '#1F2937' }}>{doctor.experience}</strong></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: '#4B5563' }}>
          <Mail size={16} color="#2563EB" />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doctor.email}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: '#4B5563' }}>
          <Phone size={16} color="#10B981" />
          <span>{doctor.phone}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: 'auto' }}>
        <button
          onClick={() => onBook(doctor)}
          className="btn-primary"
          style={{
            padding: '0.65rem 0.75rem',
            fontSize: '0.875rem',
            borderRadius: '10px',
            justifyContent: 'center'
          }}
        >
          <Calendar size={16} />
          <span>Book</span>
        </button>

        <button
          onClick={() => onViewProfile(doctor)}
          className="btn-secondary"
          style={{
            padding: '0.65rem 0.75rem',
            fontSize: '0.875rem',
            borderRadius: '10px',
            justifyContent: 'center'
          }}
        >
          <Eye size={16} />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
