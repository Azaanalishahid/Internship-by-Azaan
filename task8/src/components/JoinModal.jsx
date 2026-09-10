import React, { useState } from 'react';
import { X, CheckCircle2, Dumbbell, ArrowRight } from 'lucide-react';
import './JoinModal.css';

export default function JoinModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    plan: 'Standard Plan ($59/mo)',
    goal: 'Build Muscle & Strength'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="join-modal-backdrop" onClick={handleResetAndClose}>
      <div className="join-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-join-btn" onClick={handleResetAndClose} aria-label="Close Modal">
          <X size={22} />
        </button>

        {isSubmitted ? (
          <div className="join-success-state">
            <div className="success-icon-circle">
              <CheckCircle2 size={48} />
            </div>
            <h2>Welcome To FitZone!</h2>
            <p>
              Thank you for registering, <strong>{formData.fullName}</strong>! Your 7-day VIP Pass and membership details have been sent to <strong>{formData.email}</strong>.
            </p>
            <button className="btn btn-accent-orange full-width" onClick={handleResetAndClose}>
              Done & Explore Website
            </button>
          </div>
        ) : (
          <div className="join-form-state">
            <div className="modal-top-badge">
              <Dumbbell size={18} /> FitZone Membership Pass
            </div>
            <h2 className="join-modal-title">
              Start Your <span className="text-gradient-orange">Free 7-Day Trial</span>
            </h2>
            <p className="join-modal-sub">
              Fill out your details below to activate your instant access pass with zero upfront commitment.
            </p>

            <form onSubmit={handleSubmit} className="join-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="alex@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Membership Tier</label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  >
                    <option value="Basic Plan ($29/mo)">Basic Plan ($29/mo)</option>
                    <option value="Standard Plan ($59/mo)">Standard Plan ($59/mo) - Popular</option>
                    <option value="VIP Premium Plan ($99/mo)">VIP Premium Plan ($99/mo)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Primary Fitness Goal</label>
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  >
                    <option value="Build Muscle & Strength">Build Muscle & Strength</option>
                    <option value="Weight Loss & Fat Burn">Weight Loss & Fat Burn</option>
                    <option value="Endurance & HIIT">Endurance & HIIT</option>
                    <option value="Flexibility & Yoga">Flexibility & Yoga</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-accent-orange full-width submit-join-btn">
                Claim My Free Trial Pass
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
