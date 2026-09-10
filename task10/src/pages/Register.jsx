import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Mail, Lock, User, Phone, Globe, ArrowRight } from 'lucide-react';

const Register = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    country: 'United States',
    role: 'candidate',
    agreeTerms: true
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your password entry.');
      return;
    }

    const res = registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      avatar: '/images/avatar.jpg',
      role: formData.role,
      title: formData.role === 'candidate' ? 'Senior Software Engineer' : 'Technical Recruiting Manager',
      location: formData.country,
      phone: formData.phone
    });

    if (res.success) {
      // Redirect to login with prefilled email
      navigate(`/login?registeredEmail=${encodeURIComponent(formData.email)}`);
    } else {
      setErrorMsg(res.error);
    }
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="auth-page">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>

        <div className="container auth-container" style={{ maxWidth: '580px' }}>
          <div className="auth-card glass-card">
            <div className="text-center auth-header">
              <div className="auth-logo-icon">
                <Briefcase size={26} color="#FFFFFF" />
              </div>
              <h1 className="auth-title">Create CareerConnect Account</h1>
              <p className="auth-subtitle">Register to save your record in our temp database, then log in.</p>
            </div>

            {errorMsg && (
              <div className="auth-error-banner animate-fade-in">
                <span>⚠️ {errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              {/* Role Selector */}
              <div className="role-selector-grid">
                <button
                  type="button"
                  className={`role-btn ${formData.role === 'candidate' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, role: 'candidate' }))}
                >
                  <User size={18} /> Candidate / Job Seeker
                </button>

                <button
                  type="button"
                  className={`role-btn ${formData.role === 'employer' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, role: 'employer' }))}
                >
                  <Briefcase size={18} /> Employer / Recruiter
                </button>
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User size={18} className="field-icon" />
                  <input type="text" name="name" placeholder="e.g. Muhammad Smith" value={formData.name} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="field-icon" />
                  <input type="email" name="email" placeholder="name@company.com" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="input-wrapper">
                    <Phone size={18} className="field-icon" />
                    <input type="text" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <div className="input-wrapper">
                    <Globe size={18} className="field-icon" />
                    <select name="country" value={formData.country} onChange={handleChange} className="select-input">
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Password</label>
                  <div className="input-wrapper">
                    <Lock size={18} className="field-icon" />
                    <input type="password" name="password" placeholder="Create password" value={formData.password} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <div className="input-wrapper">
                    <Lock size={18} className="field-icon" />
                    <input type="password" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required />
                  <span>I agree to Terms & Privacy Policy</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary auth-submit-btn">
                <span>Save to Database & Continue</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="auth-footer text-center">
              <p>Already registered in temp DB? <Link to="/login" className="text-link">Log in here</Link></p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .auth-error-banner {
          padding: 0.75rem 1rem;
          background: #FEE2E2;
          color: #DC2626;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          text-align: center;
        }
        .role-selector-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem;
        }
        .role-btn {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);
          background: var(--bg-main); font-weight: 700; font-size: 0.85rem; color: var(--text-secondary);
          cursor: pointer; transition: all 0.2s ease;
        }
        .role-btn.active {
          border-color: var(--secondary-blue); background: var(--secondary-blue-light); color: var(--secondary-blue);
        }
        .form-row-2 {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
        }
        .select-input {
          width: 100%; padding: 0.75rem 1rem 0.75rem 2.75rem; border-radius: var(--radius-md);
          border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-main);
          font-size: 0.95rem; outline: none;
        }
        @media (max-width: 640px) {
          .form-row-2, .role-selector-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Register;
