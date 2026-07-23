import React, { useState } from 'react';
import './AuthPages.css';

export function LoginPage({ onNavigate }) {
  const [email, setEmail] = useState('user@weconnect.com');
  const [password, setPassword] = useState('••••••••');

  return (
    <div className="auth-container">
      <div className="auth-card card">
        <div className="auth-header">
          <div className="auth-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round" />
            </svg>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to your We Connect Innovation account</p>
        </div>

        <form className="auth-form" onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div className="form-row">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked /> Remember me
            </label>
            <a href="#forgot" className="auth-link">Forgot password?</a>
          </div>

          <button type="submit" className="auth-submit-btn">Sign In</button>
        </form>

        <div className="auth-footer">
          <span>Don't have an account? </span>
          <button className="auth-text-btn" onClick={() => onNavigate('register')}>Register</button>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage({ onNavigate }) {
  return (
    <div className="auth-container">
      <div className="auth-card card">
        <div className="auth-header">
          <div className="auth-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round" />
            </svg>
          </div>
          <h2>Create Account</h2>
          <p>Join We Connect Innovation platform</p>
        </div>

        <form className="auth-form" onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="name@company.com" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create a strong password" />
          </div>

          <button type="submit" className="auth-submit-btn">Create Account</button>
        </form>

        <div className="auth-footer">
          <span>Already have an account? </span>
          <button className="auth-text-btn" onClick={() => onNavigate('login')}>Sign In</button>
        </div>
      </div>
    </div>
  );
}
