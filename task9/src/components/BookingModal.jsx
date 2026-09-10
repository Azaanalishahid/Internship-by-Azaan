import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Mail, Phone, Stethoscope, CheckCircle2, Clock } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, selectedDoctor, onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    doctorName: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    department: 'General Medicine',
    appointmentDate: '',
    appointmentTime: '09:00 AM',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedDoctor) {
      setFormData((prev) => ({
        ...prev,
        doctorName: selectedDoctor.titleName,
        department: selectedDoctor.specialization
      }));
    }
  }, [selectedDoctor]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onBookingSuccess();
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        
        {/* Close Icon */}
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
            color: '#6B7280'
          }}
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '10px', borderRadius: '12px', color: '#2563EB' }}>
                <Calendar size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1F2937' }}>
                  Book Doctor Appointment
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Fill out the details to confirm your schedule</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              
              {/* Doctor Selection / Display */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#374151', marginBottom: '0.4rem' }}>
                  Select Doctor
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Stethoscope size={18} color="#6B7280" style={{ position: 'absolute', left: '0.85rem' }} />
                  <input
                    type="text"
                    required
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    placeholder="Doctor Name (e.g. Dr. Leanne Graham)"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.85rem 0.75rem 2.6rem',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.925rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#374151', marginBottom: '0.4rem' }}>
                  Medical Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.85rem',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.925rem',
                    outline: 'none',
                    background: '#FFFFFF'
                  }}
                >
                  <option value="General Medicine">General Medicine</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Emergency Care">Emergency Care</option>
                </select>
              </div>

              {/* Patient Name & Email Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#374151', marginBottom: '0.4rem' }}>
                    Patient Full Name *
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <User size={18} color="#6B7280" style={{ position: 'absolute', left: '0.85rem' }} />
                    <input
                      type="text"
                      required
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      placeholder="Your Name"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem 0.75rem 2.6rem',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.925rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#374151', marginBottom: '0.4rem' }}>
                    Email Address *
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Mail size={18} color="#6B7280" style={{ position: 'absolute', left: '0.85rem' }} />
                    <input
                      type="email"
                      required
                      value={formData.patientEmail}
                      onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                      placeholder="name@domain.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem 0.75rem 2.6rem',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.925rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#374151', marginBottom: '0.4rem' }}>
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.85rem',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.925rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#374151', marginBottom: '0.4rem' }}>
                    Time Slot
                  </label>
                  <select
                    value={formData.appointmentTime}
                    onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.85rem',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.925rem',
                      outline: 'none',
                      background: '#FFFFFF'
                    }}
                  >
                    <option value="09:00 AM">09:00 AM - Morning</option>
                    <option value="11:30 AM">11:30 AM - Morning</option>
                    <option value="02:00 PM">02:00 PM - Afternoon</option>
                    <option value="04:30 PM">04:30 PM - Evening</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary"
                style={{
                  marginTop: '0.75rem',
                  padding: '0.9rem',
                  borderRadius: '12px',
                  justifyContent: 'center',
                  fontSize: '1rem'
                }}
              >
                <CheckCircle2 size={20} />
                <span>Confirm & Book Appointment</span>
              </button>

            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={64} color="#10B981" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1F2937', marginBottom: '0.5rem' }}>
              Appointment Confirmed!
            </h3>
            <p style={{ color: '#6B7280', fontSize: '1rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Thank you, <strong>{formData.patientName}</strong>. Your consultation with <strong>{formData.doctorName}</strong> has been successfully booked.
            </p>
            <div className="badge-tag badge-green" style={{ fontSize: '0.9rem', padding: '0.5rem 1.25rem' }}>
              <Clock size={16} />
              <span>Confirmation sent to {formData.patientEmail}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookingModal;
