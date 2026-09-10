import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { FileText, Download, Sparkles, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

const ResumeBuilder = () => {
  const { user, addToast } = useAuth();
  const [fullname, setFullname] = useState(user?.name || 'Muhammad');
  const [headline, setHeadline] = useState(user?.title || 'Senior React & Fullstack Engineer');
  const [email, setEmail] = useState(user?.email || 'muhammad@careerconnect.com');
  const [summary, setSummary] = useState('Results-driven Senior React & Fullstack Engineer with 5+ years of experience building high-throughput web apps, micro-frontends, and cloud solutions.');
  const [skillsStr, setSkillsStr] = useState('React, TypeScript, Next.js, Node.js, GraphQL, AWS, Docker');

  const handleDownloadPDF = () => {
    addToast('Generating ATS-Optimized Resume PDF... Download started!');
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="resume-builder-page">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <span className="badge badge-orange"><Sparkles size={16} /> Free AI Tool</span>
            <h1 className="section-heading">Interactive AI Resume Builder</h1>
            <p className="section-subtitle">Edit your information on the left and see a live ATS-optimized resume preview on the right.</p>
          </div>

          <div className="builder-grid">
            {/* Form Editor */}
            <div className="builder-form-card glass-card">
              <h3 className="form-card-title">Resume Information</h3>
              <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} className="modal-input" placeholder="e.g. Muhammad Smith" />
                </div>
                <div className="form-group">
                  <label>Professional Headline</label>
                  <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="modal-input" placeholder="e.g. Senior React Developer" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="modal-input" placeholder="name@domain.com" />
                </div>
                <div className="form-group">
                  <label>Professional Summary</label>
                  <textarea rows="4" value={summary} onChange={(e) => setSummary(e.target.value)} className="modal-textarea" placeholder="Brief career overview..."></textarea>
                </div>
                <div className="form-group">
                  <label>Technical Skills (comma separated)</label>
                  <input type="text" value={skillsStr} onChange={(e) => setSkillsStr(e.target.value)} className="modal-input" placeholder="React, Node.js..." />
                </div>
              </form>
            </div>

            {/* Live Resume Preview Paper */}
            <div className="resume-preview-card glass-card">
              <div className="preview-paper">
                <div className="paper-header text-center">
                  <h2 className="paper-name">{fullname}</h2>
                  <p className="paper-headline">{headline}</p>
                  <p className="paper-contact">{email} • San Francisco, CA • linkedin.com/in/muhammad</p>
                </div>
                <hr className="paper-divider" />

                <div className="paper-section">
                  <h4 className="paper-section-title">PROFESSIONAL SUMMARY</h4>
                  <p className="paper-text">{summary}</p>
                </div>

                <div className="paper-section">
                  <h4 className="paper-section-title">CORE COMPETENCIES</h4>
                  <p className="paper-text">{skillsStr}</p>
                </div>

                <div className="paper-section">
                  <h4 className="paper-section-title">EXPERIENCE</h4>
                  <div className="paper-exp-item">
                    <div className="paper-exp-header">
                      <span className="exp-company-title">Senior Software Engineer — Google</span>
                      <span className="exp-duration">2024 - Present</span>
                    </div>
                    <p className="paper-text">Architected core React micro-frontends serving 10M+ daily active users.</p>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary download-btn-full" onClick={handleDownloadPDF}>
                <Download size={18} /> Download ATS Resume PDF
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .resume-builder-page { padding: 8.5rem 0 5rem 0; min-height: 85vh; }
        .builder-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 2.5rem; }
        .builder-form-card, .resume-preview-card { padding: 2rem; border-radius: 24px; }
        .form-card-title { font-size: 1.3rem; font-weight: 800; margin-bottom: 1.5rem; }
        
        .preview-paper { 
          background: #FFFFFF; 
          color: #1E293B; 
          padding: 2.5rem; 
          border-radius: 12px; 
          box-shadow: var(--shadow-md); 
          border: 1px solid var(--border-color); 
          margin-bottom: 1.5rem; 
        }
        .paper-name { font-size: 1.8rem; font-weight: 800; color: #0F172A; }
        .paper-headline { font-size: 1rem; color: #2563EB; font-weight: 700; }
        .paper-contact { font-size: 0.8rem; color: #64748B; margin-top: 0.2rem; }
        .paper-divider { border: 0; border-top: 2px solid #2563EB; margin: 1rem 0; }
        .paper-section { margin-bottom: 1.25rem; }
        .paper-section-title { font-size: 0.85rem; font-weight: 800; color: #0F172A; letter-spacing: 0.05em; margin-bottom: 0.4rem; text-transform: uppercase; }
        .paper-text { font-size: 0.85rem; color: #334155; line-height: 1.5; }
        .paper-exp-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem; }
        .exp-company-title { font-weight: 700; font-size: 0.9rem; color: #0F172A; }
        .exp-duration { font-size: 0.8rem; color: #64748B; font-weight: 600; }
        .download-btn-full { width: 100%; padding: 0.85rem; font-size: 1rem; }
        
        @media (max-width: 900px) { .builder-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;
