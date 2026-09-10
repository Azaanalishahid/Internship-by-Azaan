import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { 
  Briefcase, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { GoogleIcon, LinkedinIcon, GithubIcon } from '../components/SocialIcons';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const registeredEmail = queryParams.get('registeredEmail');
  const initialTab = queryParams.get('tab') === 'register' ? 'register' : 'login';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [email, setEmail] = useState(registeredEmail || 'muhammad@careerconnect.com');
  const [password, setPassword] = useState(registeredEmail ? '' : 'password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState('');
  const [successInfo, setSuccessInfo] = useState(registeredEmail ? 'Account created in Temp Database! Please log in below.' : '');

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    const result = login(email, password);

    if (result && !result.success) {
      setAuthError(result.error);
    }
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="auth-page">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>

        <div className="container auth-container">
          <div className="auth-card glass-card">
            {/* Logo Header */}
            <div className="text-center auth-header">
              <div className="auth-logo-icon">
                <Briefcase size={26} color="#FFFFFF" />
              </div>
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">
                Log in with your registered Temp Database account credentials.
              </p>
            </div>

            {/* Registration Success Banner */}
            {successInfo && (
              <div className="auth-success-banner animate-fade-in">
                <span>✅ {successInfo}</span>
              </div>
            )}

            {/* Credential Failure Error Banner */}
            {authError && (
              <div className="auth-error-banner animate-fade-in">
                <span>⚠️ {authError}</span>
              </div>
            )}

            {/* Social Logins */}
            <div className="social-login-grid">
              <button className="social-btn" onClick={() => login('google.user@gmail.com', 'password123')}>
                <GoogleIcon size={18} />
                <span>Google</span>
              </button>

              <button className="social-btn" onClick={() => login('linkedin.user@linkedin.com', 'password123')}>
                <LinkedinIcon size={18} color="#0A66C2" />
                <span>LinkedIn</span>
              </button>

              <button className="social-btn" onClick={() => login('github.user@github.com', 'password123')}>
                <GithubIcon size={18} />
                <span>GitHub</span>
              </button>
            </div>

            <div className="auth-divider">
              <span>Or log in with registered email</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="field-icon" />
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="field-icon" />
                  <input 
                    type="password" 
                    placeholder="Enter password (e.g. password123)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="forgot-link" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered email address.'); }}>
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="btn btn-primary auth-submit-btn">
                <span>Sign In to Dashboard</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="auth-footer text-center">
              <p>
                Don't have an account registered in DB?{' '}
                <Link to="/register" className="text-link">Register New Account</Link>
              </p>
              <div className="demo-hint glass-card" style={{ marginTop: '1rem', padding: '0.75rem', fontSize: '0.75rem' }}>
                💡 <strong>Pre-seeded Test Login:</strong> Email: <code>muhammad@careerconnect.com</code> | Password: <code>password123</code>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .auth-page {
          min-height: 85vh;
          padding: 8.5rem 0 5rem 0;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .auth-container {
          max-width: 480px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }
        .auth-card {
          padding: 2.5rem;
          border-radius: 24px;
        }
        .auth-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .auth-logo-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, #2563EB 0%, #F97316 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
        }
        .auth-title {
          font-size: 1.85rem;
          font-weight: 800;
        }
        .auth-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-top: 0.3rem;
        }
        .auth-success-banner {
          padding: 0.75rem 1rem;
          background: #D1FAE5;
          color: #047857;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          text-align: center;
        }
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
        .social-login-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.65rem 0.5rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          color: var(--text-main);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .social-btn:hover {
          border-color: var(--secondary-blue);
          transform: translateY(-1px);
        }
        .auth-divider {
          text-align: center;
          position: relative;
          margin: 1.25rem 0;
        }
        .auth-divider::before {
          content: '';
          position: absolute;
          left: 0; top: 50%;
          width: 100%; height: 1px;
          background: var(--border-color);
        }
        .auth-divider span {
          position: relative;
          background: var(--bg-card);
          padding: 0 0.75rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .form-group label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-main);
        }
        .input-wrapper {
          position: relative;
        }
        .field-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .input-wrapper input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-main);
          color: var(--text-main);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .input-wrapper input:focus {
          border-color: var(--secondary-blue);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .form-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
        }
        .forgot-link {
          color: var(--secondary-blue);
          font-weight: 600;
        }
        .auth-submit-btn {
          width: 100%;
          padding: 0.85rem;
          font-size: 1rem;
          margin-top: 0.5rem;
        }
        .auth-footer {
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .text-link {
          color: var(--secondary-blue);
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default Login;
