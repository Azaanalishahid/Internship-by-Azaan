import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Search, AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="page-wrapper">
      <Header />

      <main className="not-found-page">
        <div className="container text-center">
          <div className="not-found-card glass-card">
            <h1 className="error-code gradient-text-orange">404</h1>
            <h2 className="error-title">Page Not Found</h2>
            <p className="error-sub">The career route or job position you are looking for has moved or no longer exists.</p>

            <div className="error-actions">
              <Link to="/" className="btn btn-primary">
                <ArrowLeft size={16} /> Back to Home
              </Link>
              <Link to="/jobs" className="btn btn-outline">
                <Search size={16} /> Search Active Jobs
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .not-found-page { padding: 9rem 0 5rem 0; min-height: 85vh; display: flex; align-items: center; }
        .not-found-card { padding: 4rem 2rem; max-width: 600px; margin: 0 auto; border-radius: 28px; }
        .error-code { font-size: 6rem; font-weight: 800; line-height: 1; margin-bottom: 0.5rem; }
        .error-title { font-size: 2rem; font-weight: 800; margin-bottom: 0.75rem; }
        .error-sub { font-size: 1.05rem; color: var(--text-secondary); margin-bottom: 2rem; }
        .error-actions { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
      `}</style>
    </div>
  );
};

export default NotFound;
