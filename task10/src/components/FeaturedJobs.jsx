import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  Send,
  Sparkles,
  Share2,
  Check,
  X,
  Copy
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const INITIAL_JOBS = [
  {
    id: 1,
    title: 'Senior React & Frontend Architect',
    company: 'Google',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    location: 'San Francisco, CA (Hybrid)',
    salary: '$160,000 - $210,000 / yr',
    type: 'Full Time',
    experience: '5+ Years Exp',
    featured: true,
    category: 'Trending',
    aiScore: 98,
    tags: ['React', 'TypeScript', 'Next.js', 'Redux'],
    posted: '2 hours ago',
    description: 'Google is seeking an exceptional Senior React & Frontend Architect to lead core UI systems powering global Web Apps.',
    responsibilities: [
      'Architect and build highly scalable, modular React web applications.',
      'Establish frontend architecture standards and performance optimization metrics.',
      'Collaborate with UI/UX designers and backend engineers.'
    ],
    requirements: [
      '5+ years experience with React, ES6+, and TypeScript.',
      'Deep understanding of state management (Redux, Zustand, Context).',
      'B.S. or M.S. in Computer Science or equivalent experience.'
    ],
    benefits: ['Equity Grants', '100% Employer Covered Health', '$3,500 Learning Budget', 'Flexible Work']
  },
  {
    id: 2,
    title: 'Senior UI/UX Product Designer',
    company: 'Meta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    location: 'New York, NY (Remote)',
    salary: '$140,000 - $180,000 / yr',
    type: 'Remote',
    experience: '4+ Years Exp',
    featured: true,
    category: 'Remote',
    aiScore: 95,
    tags: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
    posted: '5 hours ago',
    description: 'Meta is looking for a Senior UI/UX Product Designer to shape the future of immersive digital experiences.',
    responsibilities: [
      'Create high-fidelity UI prototypes and maintain Meta’s design system.',
      'Conduct user research interviews and usability testing.'
    ],
    requirements: ['4+ years designing web or mobile apps.', 'Mastery of Figma and Principle.'],
    benefits: ['$3,000 Remote Stipend', 'Unlimited PTO', 'Full Health Coverage']
  },
  {
    id: 3,
    title: 'Lead Cloud Infrastructure Engineer',
    company: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    location: 'Seattle, WA (On-site)',
    salary: '$175,000 - $225,000 / yr',
    type: 'Full Time',
    experience: '6+ Years Exp',
    featured: true,
    category: 'Latest',
    aiScore: 92,
    tags: ['AWS', 'Kubernetes', 'Terraform', 'Docker'],
    posted: '1 day ago',
    description: 'AWS is hiring a Lead Cloud Infrastructure Engineer to manage mission-critical cloud compute clusters.',
    responsibilities: ['Deploy multi-region Kubernetes clusters.', 'Automate Infrastructure as Code using Terraform.'],
    requirements: ['6+ years AWS experience.', 'Kubernetes and Docker mastery.'],
    benefits: ['AWS RSU Stock Plan', 'Relocation Package', 'Health Coverage']
  },
  {
    id: 4,
    title: 'Full Stack Node & Python Engineer',
    company: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    location: 'Los Gatos, CA (Hybrid)',
    salary: '$190,000 - $250,000 / yr',
    type: 'Contract',
    experience: '3+ Years Exp',
    featured: false,
    category: 'Trending',
    aiScore: 89,
    tags: ['Node.js', 'Python', 'GraphQL', 'Microservices'],
    posted: '2 days ago',
    description: 'Join Netflix to craft high-throughput streaming backend microservices.',
    responsibilities: ['Design RESTful APIs and GraphQL resolvers.'],
    requirements: ['3+ years backend software engineering experience.'],
    benefits: ['Top Tier Compensation', 'Streaming Discounts']
  },
  {
    id: 5,
    title: 'Software Developer Intern',
    company: 'Tesla',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
    location: 'Austin, TX (On-site)',
    salary: '$45 - $60 / hr',
    type: 'Internship',
    experience: 'Student / New Grad',
    featured: true,
    category: 'Internships',
    aiScore: 96,
    tags: ['C++', 'Python', 'AI', 'Robotics'],
    posted: '3 days ago',
    description: 'Tesla Autonomous Vehicle team is accepting application for Summer Engineering Interns.',
    responsibilities: ['Assist in testing neural network perception pipelines.'],
    requirements: ['Enrolled in Computer Science or Electrical Engineering degree.'],
    benefits: ['Competitive Hourly Pay', 'Housing Stipend', 'Mentorship']
  },
  {
    id: 6,
    title: 'Cybersecurity Compliance Specialist',
    company: 'Department of Technology',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    location: 'Washington, DC (Hybrid)',
    salary: '$120,000 - $155,000 / yr',
    type: 'Government',
    experience: '3+ Years Exp',
    featured: false,
    category: 'Government',
    aiScore: 91,
    tags: ['Cybersecurity', 'NIST', 'Compliance', 'Security Clearance'],
    posted: '4 days ago',
    description: 'Federal government IT department seeking cybersecurity compliance auditor.',
    responsibilities: ['Audit infrastructure against NIST standards.'],
    requirements: ['US Citizenship required.', 'Security+ certification.'],
    benefits: ['Federal Pension', 'Comprehensive Health', 'Work Life Balance']
  }
];

const FeaturedJobs = () => {
  const [filter, setFilter] = useState('All');
  const [shareModalJob, setShareModalJob] = useState(null);
  const { savedJobs, toggleSaveJob, appliedJobs, addToast } = useAuth();
  const navigate = useNavigate();

  const filteredJobs = INITIAL_JOBS.filter(job => {
    if (filter === 'All') return true;
    if (filter === 'Remote') return job.type === 'Remote' || job.location.includes('Remote');
    if (filter === 'Internships') return job.type === 'Internship' || job.category === 'Internships';
    if (filter === 'Government') return job.type === 'Government' || job.category === 'Government';
    if (filter === 'Trending') return job.category === 'Trending' || job.featured;
    return true;
  });

  const handleCopyLink = (jobTitle) => {
    navigator.clipboard.writeText(window.location.origin + `/jobs/1`);
    addToast(`Sharable link for "${jobTitle}" copied to clipboard!`);
    setShareModalJob(null);
  };

  return (
    <section id="jobs" className="jobs-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-orange">
            <Sparkles size={16} /> AI Matched Opportunities
          </span>
          <h2 className="section-heading">Featured Job Positions</h2>
          <p className="section-subtitle">
            Explore active openings with AI match scores tailored to your candidate profile.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="jobs-filter-bar">
          {['All', 'Trending', 'Remote', 'Internships', 'Government'].map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Jobs Grid */}
        <div className="jobs-grid">
          {filteredJobs.map(job => {
            const isSaved = savedJobs.includes(job.id);
            const isApplied = appliedJobs.some(j => j.id === job.id);

            return (
              <div key={job.id} className="job-card glass-card">
                <div className="card-top-badges">
                  {job.featured && <span className="featured-badge">Featured</span>}
                  <span className="ai-match-badge">⚡ {job.aiScore}% Match</span>
                </div>
                
                <div className="card-top">
                  <div className="company-logo-box">
                    <img src={job.logo} alt={job.company} className="logo-img" />
                  </div>

                  <div className="card-actions-right">
                    <button 
                      className="icon-btn-sm" 
                      onClick={(e) => { e.stopPropagation(); setShareModalJob(job); }}
                      title="Share Job"
                    >
                      <Share2 size={16} />
                    </button>
                    <button 
                      className={`save-btn ${isSaved ? 'saved' : ''}`} 
                      onClick={(e) => { e.stopPropagation(); toggleSaveJob(job.id); }}
                      title={isSaved ? "Saved" : "Save Job"}
                    >
                      {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  <span className="company-name">{job.company}</span>
                  <h3 className="job-title">
                    <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                  </h3>

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

      {/* Share Modal */}
      {shareModalJob && (
        <div className="share-modal-overlay animate-fade-in">
          <div className="share-modal-box glass-card">
            <div className="share-modal-header">
              <h3>Share {shareModalJob.title}</h3>
              <button onClick={() => setShareModalJob(null)} className="close-btn"><X size={18} /></button>
            </div>
            <p className="share-modal-sub">Copy job link to share with colleagues or networks:</p>

            <div className="share-link-input">
              <input type="text" readOnly value={`${window.location.origin}/jobs/${shareModalJob.id}`} />
              <button className="btn btn-primary" onClick={() => handleCopyLink(shareModalJob.title)}>
                <Copy size={16} /> Copy
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .jobs-section { padding: 5rem 0; }
        .jobs-filter-bar {
          display: flex; justify-content: center; gap: 0.75rem;
          margin-bottom: 3rem; flex-wrap: wrap;
        }
        .filter-btn {
          padding: 0.6rem 1.4rem; border-radius: var(--radius-full);
          border: 1px solid var(--border-color); background: var(--bg-card);
          color: var(--text-secondary); font-weight: 600; font-size: 0.95rem;
          cursor: pointer; transition: all 0.25s ease;
        }
        .filter-btn.active, .filter-btn:hover {
          background: var(--secondary-blue); color: #FFF;
          border-color: var(--secondary-blue); box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        .jobs-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 2rem;
        }
        .job-card {
          position: relative; padding: 1.75rem; display: flex;
          flex-direction: column; justify-content: space-between; border-radius: var(--radius-lg);
        }
        .card-top-badges {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 0.8rem;
        }
        .featured-badge {
          background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
          color: #FFF; font-size: 0.7rem; font-weight: 700;
          padding: 0.2rem 0.6rem; border-radius: var(--radius-full); text-transform: uppercase;
        }
        .ai-match-badge {
          background: rgba(16, 185, 129, 0.12); color: #047857;
          font-size: 0.75rem; font-weight: 800; padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full); margin-left: auto;
        }
        .card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
        .company-logo-box {
          width: 52px; height: 52px; border-radius: 12px; background: #FFF;
          padding: 8px; display: flex; align-items: center; justify-content: center;
          box-shadow: var(--shadow-sm); border: 1px solid var(--border-color);
        }
        .logo-img { width: 100%; height: 100%; object-fit: contain; }
        .card-actions-right { display: flex; align-items: center; gap: 0.5rem; }
        .icon-btn-sm {
          width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border-color);
          background: var(--bg-card); color: var(--text-secondary); display: flex;
          align-items: center; justify-content: center; cursor: pointer;
        }
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
        .share-modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(6px); z-index: 9999;
          display: flex; align-items: center; justify-content: center;
        }
        .share-modal-box { padding: 2rem; border-radius: 20px; width: 100%; max-width: 480px; }
        .share-modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .share-modal-sub { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem; }
        .share-link-input { display: flex; gap: 0.5rem; }
        .share-link-input input {
          flex: 1; padding: 0.6rem 0.8rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);
          background: var(--bg-main); font-size: 0.85rem; color: var(--text-main); outline: none;
        }
        .close-btn { background: transparent; border: none; cursor: pointer; color: var(--text-muted); }
      `}</style>
    </section>
  );
};

export default FeaturedJobs;
