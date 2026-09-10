import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTA from '../components/CTA';
import { useAuth } from '../context/AuthContext';
import { INITIAL_JOBS } from '../components/FeaturedJobs';
import { 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  Send, 
  CheckCircle2, 
  ArrowLeft,
  Building,
  Upload,
  FileText,
  Lock,
  User,
  Mail,
  Phone,
  Sparkles,
  X
} from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, savedJobs, toggleSaveJob, applyForJob, appliedJobs, addToast } = useAuth();

  const jobId = parseInt(id, 10);
  const job = INITIAL_JOBS.find(j => j.id === jobId) || INITIAL_JOBS[0];

  const isSaved = savedJobs.includes(job.id);
  const isApplied = appliedJobs.some(j => j.id === job.id);

  // Application Modal state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('$180,000');
  const [yearsExperience, setYearsExperience] = useState('5 Years');
  const [selectedResume, setSelectedResume] = useState('Muhammad_Resume_2026.pdf');

  const handleApplyClick = () => {
    if (!user) {
      addToast('Please login to submit your job application!');
      navigate('/login');
      return;
    }
    setShowApplyModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    applyForJob(job);
    setShowApplyModal(false);
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="job-details-page">
        {/* Top Breadcrumb Header */}
        <section className="job-details-header">
          <div className="container">
            <Link to="/" className="back-link">
              <ArrowLeft size={18} /> Back to Job Search
            </Link>

            <div className="job-hero-card glass-card">
              <div className="job-hero-main">
                <div className="company-logo-large">
                  <img src={job.logo} alt={job.company} />
                </div>

                <div className="job-hero-info">
                  <span className="company-badge">{job.company}</span>
                  <h1 className="job-hero-title">{job.title}</h1>

                  <div className="job-hero-meta">
                    <span><MapPin size={16} /> {job.location}</span>
                    <span><Briefcase size={16} /> {job.type}</span>
                    <span><Clock size={16} /> {job.experience}</span>
                    <span><DollarSign size={16} /> {job.salary}</span>
                  </div>
                </div>
              </div>

              <div className="job-hero-actions">
                <button 
                  className={`save-action-btn ${isSaved ? 'saved' : ''}`}
                  onClick={() => toggleSaveJob(job.id)}
                >
                  {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                  <span>{isSaved ? 'Saved' : 'Save Job'}</span>
                </button>

                <button 
                  className={`btn ${isApplied ? 'btn-outline' : 'btn-accent'} apply-action-btn`}
                  onClick={handleApplyClick}
                  disabled={isApplied}
                >
                  {isApplied ? (
                    <>Applied ✓</>
                  ) : (
                    <>
                      <Send size={18} /> Apply for Position
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <section className="job-details-body">
          <div className="container job-details-grid">
            {/* Left Column: Descriptions, Responsibilities, Requirements */}
            <div className="job-details-main">
              {/* Overview */}
              <div className="detail-section-card glass-card">
                <h2 className="detail-heading">Position Overview</h2>
                <p className="detail-text">{job.description}</p>
              </div>

              {/* Responsibilities */}
              <div className="detail-section-card glass-card">
                <h2 className="detail-heading">Key Responsibilities</h2>
                <ul className="check-list">
                  {job.responsibilities?.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={18} className="check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="detail-section-card glass-card">
                <h2 className="detail-heading">Qualifications & Skills</h2>
                <ul className="check-list">
                  {job.requirements?.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={18} className="check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="detail-section-card glass-card">
                <h2 className="detail-heading">Compensation & Benefits</h2>
                <div className="benefits-grid">
                  {job.benefits?.map((benefit, idx) => (
                    <div key={idx} className="benefit-pill">
                      <Sparkles size={16} className="text-orange" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar Specs */}
            <div className="job-details-sidebar">
              {/* Job Summary */}
              <div className="sidebar-card glass-card">
                <h3 className="sidebar-heading">Job Summary</h3>
                <ul className="summary-list">
                  <li>
                    <span className="lbl">Company</span>
                    <span className="val">{job.company}</span>
                  </li>
                  <li>
                    <span className="lbl">Location</span>
                    <span className="val">{job.location}</span>
                  </li>
                  <li>
                    <span className="lbl">Job Type</span>
                    <span className="val">{job.type}</span>
                  </li>
                  <li>
                    <span className="lbl">Experience</span>
                    <span className="val">{job.experience}</span>
                  </li>
                  <li>
                    <span className="lbl">Salary Range</span>
                    <span className="val">{job.salary}</span>
                  </li>
                  <li>
                    <span className="lbl">Posted Date</span>
                    <span className="val">{job.posted}</span>
                  </li>
                </ul>
              </div>

              {/* Company Profile Spotlight */}
              <div className="sidebar-card glass-card text-center">
                <img src={job.logo} alt={job.company} width="64" height="64" style={{ margin: '0 auto 1rem auto' }} />
                <h3 className="sidebar-heading" style={{ marginBottom: '0.3rem' }}>{job.company}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  Verified Fortune 500 Employer on CareerConnect
                </p>
                <button 
                  className="btn btn-outline" 
                  style={{ width: '100%' }}
                  onClick={() => addToast(`Opening ${job.company} official career portal...`)}
                >
                  View Company Profile
                </button>
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </main>

      <Footer />

      {/* APPLICATION MODAL */}
      {showApplyModal && (
        <div className="modal-overlay animate-fade-in">
          <div className="modal-content glass-card">
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Apply for {job.title}</h3>
                <p className="modal-sub">{job.company} • {job.location}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setShowApplyModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label>Applicant Name</label>
                <div className="input-wrapper">
                  <User size={18} className="field-icon" />
                  <input type="text" defaultValue={user?.name || 'Muhammad'} readOnly />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="field-icon" />
                  <input type="email" defaultValue={user?.email || 'muhammad@careerconnect.com'} readOnly />
                </div>
              </div>

              <div className="form-group">
                <label>Select Resume / CV</label>
                <div className="input-wrapper">
                  <FileText size={18} className="field-icon" />
                  <input type="text" value={selectedResume} onChange={(e) => setSelectedResume(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label>Expected Annual Compensation</label>
                <input 
                  type="text" 
                  value={expectedSalary} 
                  onChange={(e) => setExpectedSalary(e.target.value)}
                  className="modal-input"
                  required 
                />
              </div>

              <div className="form-group">
                <label>Cover Letter / Pitch to Recruiter</label>
                <textarea 
                  rows="4"
                  placeholder="Explain why your experience with React & Cloud architecture makes you an ideal fit for this role..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="modal-textarea"
                  required
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setShowApplyModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-accent">
                  <Send size={16} /> Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .job-details-page {
          padding-top: 5rem;
          min-height: 90vh;
        }
        .job-details-header {
          padding: 3rem 0;
          background: linear-gradient(180deg, rgba(239, 246, 255, 0.6) 0%, rgba(248, 250, 252, 1) 100%);
        }
        body.dark-mode .job-details-header {
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 1) 100%);
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          color: var(--secondary-blue);
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }
        .job-hero-card {
          padding: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 24px;
        }
        .job-hero-main {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .company-logo-large {
          width: 80px;
          height: 80px;
          border-radius: 18px;
          background: #FFF;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-color);
        }
        .company-logo-large img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .company-badge {
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--secondary-blue);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .job-hero-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin: 0.2rem 0 0.8rem 0;
          line-height: 1.2;
        }
        .job-hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .job-hero-meta span {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .job-hero-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .save-action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--border-color);
          background: var(--bg-card);
          color: var(--text-main);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .save-action-btn.saved {
          border-color: var(--secondary-blue);
          color: var(--secondary-blue);
        }
        .apply-action-btn {
          padding: 0.75rem 1.75rem;
          font-size: 1rem;
        }
        .job-details-body {
          padding: 4rem 0;
        }
        .job-details-grid {
          display: grid;
          grid-template-columns: 2.2fr 1fr;
          gap: 2.5rem;
        }
        .job-details-main {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .detail-section-card {
          padding: 2rem;
          border-radius: var(--radius-lg);
        }
        .detail-heading {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 1.2rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--secondary-blue-light);
        }
        .detail-text {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }
        .check-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .check-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 1rem;
          color: var(--text-main);
          line-height: 1.5;
        }
        .check-icon {
          color: #10B981;
          flex-shrink: 0;
          margin-top: 3px;
        }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .benefit-pill {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1.25rem;
          background: var(--bg-main);
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.95rem;
          border: 1px solid var(--border-color);
        }
        .job-details-sidebar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .sidebar-card {
          padding: 2rem;
          border-radius: var(--radius-lg);
        }
        .sidebar-heading {
          font-size: 1.2rem;
          font-weight: 800;
          margin-bottom: 1.25rem;
        }
        .summary-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .summary-list li {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid var(--border-color);
        }
        .summary-list .lbl {
          color: var(--text-secondary);
        }
        .summary-list .val {
          font-weight: 700;
          color: var(--text-main);
        }
        /* MODAL STYLES */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .modal-content {
          width: 100%;
          max-width: 580px;
          padding: 2.2rem;
          border-radius: 24px;
        }
        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .modal-title {
          font-size: 1.4rem;
          font-weight: 800;
        }
        .modal-sub {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .modal-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .modal-input, .modal-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-main);
          color: var(--text-main);
          font-size: 0.95rem;
          outline: none;
        }
        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
        }

        @media (max-width: 900px) {
          .job-hero-card { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .job-details-grid { grid-template-columns: 1fr; }
          .benefits-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default JobDetails;
