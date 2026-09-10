import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Star, MapPin, Users, Globe, Building2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { INITIAL_JOBS } from '../components/FeaturedJobs';

const CompanyDetails = () => {
  const { id } = useParams();
  const companyName = id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Google';

  const companyJobs = INITIAL_JOBS.filter(j => j.company.toLowerCase() === companyName.toLowerCase());

  return (
    <div className="page-wrapper">
      <Header />

      <main className="company-details-page">
        <section className="company-hero">
          <div className="container">
            <Link to="/companies" className="back-link"><ArrowLeft size={16} /> All Companies</Link>

            <div className="company-hero-card glass-card">
              <div className="flex items-center gap-4">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt={companyName} width="64" />
                <div>
                  <h1 className="company-heading">{companyName} Inc.</h1>
                  <p className="company-sub">Internet & Cloud Technology • Mountain View, CA</p>
                  <div className="flex items-center gap-2" style={{ marginTop: '0.4rem' }}>
                    <Star size={16} fill="#F59E0B" color="#F59E0B" />
                    <span className="font-bold">4.8 Rating</span>
                    <span className="text-secondary">(32,000 Verified Employee Reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="company-body">
          <div className="container company-grid">
            <div className="company-main">
              <div className="detail-section-card glass-card">
                <h2 className="detail-heading">About {companyName}</h2>
                <p className="detail-text">
                  {companyName} is a global leader in technology, artificial intelligence, cloud computing, and software development. Founded with the mission to organize the world’s information and make it universally accessible and useful.
                </p>
              </div>

              <div className="detail-section-card glass-card">
                <h2 className="detail-heading">Active Openings ({companyJobs.length || 3})</h2>
                <div className="jobs-list">
                  {INITIAL_JOBS.slice(0, 3).map(j => (
                    <div key={j.id} className="job-item flex justify-between items-center padding-3">
                      <div>
                        <h4 className="font-bold"><Link to={`/jobs/${j.id}`}>{j.title}</Link></h4>
                        <p className="text-secondary">{j.location} • {j.salary}</p>
                      </div>
                      <Link to={`/jobs/${j.id}`} className="btn btn-outline btn-sm">Apply</Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <style>{`
        .company-details-page { padding-top: 5rem; min-height: 85vh; }
        .company-hero { padding: 3rem 0; background: rgba(239, 246, 255, 0.4); }
        .company-hero-card { padding: 2rem; border-radius: 20px; }
        .company-heading { font-size: 2rem; font-weight: 800; }
        .company-body { padding: 3rem 0; }
        .company-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
      `}</style>
    </div>
  );
};

export default CompanyDetails;
