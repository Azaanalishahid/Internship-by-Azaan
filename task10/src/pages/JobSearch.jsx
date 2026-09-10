import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { INITIAL_JOBS } from '../components/FeaturedJobs';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, Clock, DollarSign, Sparkles, Bookmark, BookmarkCheck } from 'lucide-react';

const JobSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const { savedJobs, toggleSaveJob, appliedJobs } = useAuth();
  const navigate = useNavigate();

  const filtered = INITIAL_JOBS.filter(job => {
    const matchSearch = !searchTerm || job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLoc = !locationTerm || job.location.toLowerCase().includes(locationTerm.toLowerCase());
    const matchType = selectedType === 'All' || job.type === selectedType || (selectedType === 'Remote' && job.location.includes('Remote'));
    return matchSearch && matchLoc && matchType;
  });

  return (
    <div className="page-wrapper">
      <Header />

      <main className="job-search-page">
        <section className="search-hero">
          <div className="container">
            <div className="text-center" style={{ marginBottom: '2.5rem' }}>
              <span className="badge badge-blue"><Sparkles size={16} /> Advanced Job Engine</span>
              <h1 className="section-heading">Explore 15,000+ Verified Positions</h1>
              <p className="section-subtitle">Search by job title, skill, or location to find your next career move.</p>
            </div>

            {/* Filter Bar */}
            <div className="search-filter-card glass-card">
              <div className="search-grid-inputs">
                <div className="input-box">
                  <Search size={18} className="text-blue" />
                  <input type="text" placeholder="Title, skill, or company..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="input-box">
                  <MapPin size={18} className="text-orange" />
                  <input type="text" placeholder="Location or Remote..." value={locationTerm} onChange={(e) => setLocationTerm(e.target.value)} />
                </div>
                <div className="input-box">
                  <Briefcase size={18} className="text-purple" />
                  <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="select-box">
                    <option value="All">All Job Types</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Remote">Remote Only</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internships</option>
                    <option value="Government">Government</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Grid */}
        <section className="search-results-section">
          <div className="container">
            <div className="results-header">
              <h3 className="results-count">Showing {filtered.length} Jobs Match Your Search</h3>
            </div>

            <div className="jobs-grid">
              {filtered.map(job => {
                const isSaved = savedJobs.includes(job.id);
                const isApplied = appliedJobs.some(j => j.id === job.id);

                return (
                  <div key={job.id} className="job-card glass-card">
                    <div className="card-top">
                      <div className="company-logo-box">
                        <img src={job.logo} alt={job.company} className="logo-img" />
                      </div>
                      <button 
                        className={`save-btn ${isSaved ? 'saved' : ''}`} 
                        onClick={() => toggleSaveJob(job.id)}
                        title={isSaved ? "Saved" : "Save Job"}
                      >
                        {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                      </button>
                    </div>

                    <div className="card-body">
                      <span className="company-name">{job.company}</span>
                      <h3 className="job-title"><Link to={`/jobs/${job.id}`}>{job.title}</Link></h3>

                      <div className="job-meta">
                        <span className="meta-item"><MapPin size={15} /> {job.location}</span>
                        <span className="meta-item"><Briefcase size={15} /> {job.type}</span>
                        <span className="meta-item"><Clock size={15} /> {job.experience}</span>
                      </div>

                      <div className="tags-container">
                        {job.tags.map(t => (
                          <span key={t} className="job-tag">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="card-footer">
                      <div className="salary-box">
                        <p className="salary-label">Salary Range</p>
                        <p className="salary-value">{job.salary}</p>
                      </div>

                      <button 
                        className={`btn ${isApplied ? 'btn-outline' : 'btn-accent'} apply-btn`}
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        {isApplied ? 'Applied ✓' : 'View & Apply'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .job-search-page { padding-top: 5rem; min-height: 85vh; }
        .search-hero { padding: 4rem 0 2rem 0; background: linear-gradient(180deg, rgba(239, 246, 255, 0.5) 0%, rgba(248, 250, 252, 1) 100%); }
        .search-filter-card { padding: 1.5rem; border-radius: 20px; }
        .search-grid-inputs { display: grid; grid-template-columns: 1.5fr 1.2fr 1fr; gap: 1rem; }
        .input-box { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color); }
        .input-box input, .select-box { width: 100%; border: none; background: transparent; font-size: 0.95rem; color: var(--text-main); outline: none; }
        .search-results-section { padding: 3rem 0; }
        .results-header { margin-bottom: 2rem; }
        .results-count { font-size: 1.3rem; font-weight: 800; }

        .jobs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 2rem; }
        .job-card { position: relative; padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between; border-radius: var(--radius-lg); }
        .card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.2rem; }
        .company-logo-box { width: 52px; height: 52px; border-radius: 12px; background: #FFF; padding: 8px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); }
        .logo-img { width: 100%; height: 100%; object-fit: contain; }
        .save-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; }
        .save-btn:hover, .save-btn.saved { color: var(--secondary-blue); transform: scale(1.15); }
        .company-name { font-size: 0.875rem; font-weight: 700; color: var(--secondary-blue); text-transform: uppercase; }
        .job-title { font-size: 1.25rem; font-weight: 800; margin: 0.3rem 0 1rem 0; line-height: 1.3; }
        .job-title a { color: var(--text-main); }
        .job-title a:hover { color: var(--secondary-blue); }
        .job-meta { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem; }
        .meta-item { display: flex; align-items: center; gap: 0.35rem; font-size: 0.85rem; color: var(--text-secondary); }
        .tags-container { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem; }
        .job-tag { background: rgba(37, 99, 235, 0.08); color: var(--secondary-blue); font-weight: 600; font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 6px; }
        .card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 1.25rem; border-top: 1px solid var(--border-color); }
        .salary-label { font-size: 0.75rem; color: var(--text-muted); }
        .salary-value { font-weight: 800; font-size: 0.95rem; }

        @media (max-width: 900px) { .search-grid-inputs { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default JobSearch;
