import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Mic, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Building2,
  Users,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Hero = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useAuth();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/jobs?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`);
  };

  const triggerVoiceSearch = () => {
    setIsListeningVoice(true);
    addToast('Listening for voice command... Speak job title or location.');
    setTimeout(() => {
      setKeyword('Senior React Architect');
      setLocation('Remote');
      setIsListeningVoice(false);
      addToast('Voice recognized: "Senior React Architect in Remote"');
    }, 2500);
  };

  return (
    <section className="hero-section">
      <div className="gradient-blob blob-1"></div>
      <div className="gradient-blob blob-2"></div>
      
      <div className="container hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="badge badge-blue animate-fade-in">
            <Sparkles size={16} /> Enterprise Career Platform
          </div>

          <h1 className="hero-heading animate-fade-in">
            Find Your <span className="gradient-text-blue">Dream Job</span>, <br />
            Build Your <span className="gradient-text-orange">Future</span>
          </h1>

          <p className="hero-subheading animate-fade-in">
            Search thousands of verified positions across Fortune 500 tech leaders, AI startups, remote hubs, and government agencies.
          </p>

          {/* Interactive Search Engine Box */}
          <form className="hero-search-box glass-card animate-fade-in" onSubmit={handleSearchSubmit}>
            <div className="search-input-group">
              <Search className="input-icon" size={20} />
              <input 
                type="text" 
                placeholder="Job title, skills, or company..." 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button 
                type="button" 
                className={`voice-btn ${isListeningVoice ? 'listening' : ''}`}
                onClick={triggerVoiceSearch}
                title="Voice Search"
              >
                <Mic size={18} />
              </button>
            </div>

            <div className="divider-line"></div>

            <div className="search-input-group">
              <MapPin className="input-icon" size={20} />
              <input 
                type="text" 
                placeholder="City, state, or remote..." 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary search-btn">
              <span>Search Jobs</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Filter Chips & Recent Searches */}
          <div className="hero-tags animate-fade-in">
            <span className="tags-label">Trending Searches:</span>
            <button type="button" className="tag" onClick={() => navigate('/jobs?filter=remote')}>🌐 Remote</button>
            <button type="button" className="tag" onClick={() => navigate('/jobs?filter=react')}>⚛️ React</button>
            <button type="button" className="tag" onClick={() => navigate('/jobs?filter=internship')}>🎓 Internships</button>
            <button type="button" className="tag" onClick={() => navigate('/jobs?filter=ai')}>🤖 AI & Data</button>
            <button type="button" className="tag" onClick={() => navigate('/jobs?filter=government')}>🏛️ Government</button>
          </div>

          <div className="hero-cta-buttons animate-fade-in">
            <button className="btn btn-primary" onClick={() => navigate('/jobs')}>
              Explore All Jobs
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/resume-builder')}>
              AI Resume Builder
            </button>
          </div>
        </div>

        {/* Right Side Visual Cards */}
        <div className="hero-visual">
          <div className="visual-wrapper animate-float">
            <img src="/images/hero.jpg" alt="Career Platform" className="hero-main-img" />

            <div className="floating-card card-jobs glass-card">
              <div className="card-icon blue"><Briefcase size={22} /></div>
              <div className="card-text">
                <p className="card-number">15,000+</p>
                <p className="card-label">Active Openings</p>
              </div>
            </div>

            <div className="floating-card card-companies glass-card">
              <div className="card-icon orange"><Building2 size={22} /></div>
              <div className="card-text">
                <p className="card-number">8,000+</p>
                <p className="card-label">Verified Hiring Employers</p>
              </div>
            </div>

            <div className="floating-card card-candidates glass-card">
              <div className="card-icon green"><Users size={22} /></div>
              <div className="card-text">
                <p className="card-number">200K+</p>
                <p className="card-label">Candidates Placed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Listening Overlay Modal */}
      {isListeningVoice && (
        <div className="voice-modal-overlay animate-fade-in">
          <div className="voice-modal-box glass-card">
            <div className="pulse-mic-icon">
              <Mic size={36} />
            </div>
            <h3>Listening...</h3>
            <p>Say a job title or location like "Senior Frontend Developer in New York"</p>
            <button className="btn btn-ghost" onClick={() => setIsListeningVoice(false)}>Cancel</button>
          </div>
        </div>
      )}

      <style>{`
        .hero-section {
          position: relative;
          padding: 8.5rem 0 5rem 0;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(239, 246, 255, 0.4) 0%, rgba(248, 250, 252, 1) 100%);
        }
        body.dark-mode .hero-section {
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 1) 100%);
        }
        .gradient-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.45;
          z-index: 0;
          pointer-events: none;
        }
        .blob-1 { width: 450px; height: 450px; background: #2563EB; top: -100px; right: -50px; }
        .blob-2 { width: 400px; height: 400px; background: #F97316; bottom: -50px; left: -100px; }
        .hero-container {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1.15fr 0.85fr;
          gap: 3.5rem; align-items: center;
        }
        .hero-heading {
          font-size: 3.5rem; font-weight: 800; line-height: 1.15;
          letter-spacing: -0.03em; margin: 1.2rem 0;
        }
        .hero-subheading {
          font-size: 1.2rem; color: var(--text-secondary);
          margin-bottom: 2.2rem; max-width: 580px;
        }
        .hero-search-box {
          display: flex; align-items: center; padding: 0.5rem; margin-bottom: 1.25rem;
        }
        .search-input-group {
          display: flex; align-items: center; gap: 0.75rem; flex: 1; padding: 0.5rem 0.75rem;
        }
        .input-icon { color: var(--secondary-blue); }
        .search-input-group input {
          width: 100%; border: none; background: transparent;
          font-size: 0.95rem; color: var(--text-main); outline: none;
        }
        .voice-btn {
          background: transparent; border: none; color: var(--text-muted);
          cursor: pointer; padding: 0.3rem; border-radius: 50%;
        }
        .voice-btn.listening { color: var(--accent-orange); animation: pulseGlow 1s infinite; }
        .divider-line { width: 1px; height: 30px; background: var(--border-color); }
        .search-btn { padding: 0.85rem 1.5rem; border-radius: var(--radius-md); }
        .hero-tags {
          display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;
          margin-bottom: 2rem; font-size: 0.875rem;
        }
        .tags-label { color: var(--text-muted); font-weight: 600; }
        .tag {
          background: var(--bg-card); border: 1px solid var(--border-color);
          padding: 0.25rem 0.75rem; border-radius: var(--radius-full);
          color: var(--text-secondary); cursor: pointer; font-size: 0.8rem;
          font-weight: 500; transition: all 0.2s ease;
        }
        .tag:hover { border-color: var(--secondary-blue); color: var(--secondary-blue); }
        .hero-cta-buttons { display: flex; gap: 1rem; }
        .hero-visual { position: relative; }
        .visual-wrapper { position: relative; display: flex; justify-content: center; }
        .hero-main-img {
          width: 100%; max-width: 480px; border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl); border: 4px solid var(--primary-white); object-fit: cover;
        }
        .floating-card {
          position: absolute; display: flex; align-items: center; gap: 0.85rem;
          padding: 0.85rem 1.25rem; border-radius: var(--radius-md);
        }
        .card-icon {
          width: 44px; height: 44px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .card-icon.blue { background: rgba(37, 99, 235, 0.12); color: var(--secondary-blue); }
        .card-icon.orange { background: rgba(249, 115, 22, 0.12); color: var(--accent-orange); }
        .card-icon.green { background: rgba(16, 185, 129, 0.12); color: #10B981; }
        .card-number { font-weight: 800; font-size: 1.15rem; line-height: 1; }
        .card-label { font-size: 0.75rem; color: var(--text-secondary); font-weight: 600; }
        .card-jobs { top: 20px; left: -25px; }
        .card-companies { bottom: 40px; left: -35px; }
        .card-candidates { bottom: 80px; right: -20px; }
        .voice-modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px);
          z-index: 9999; display: flex; align-items: center; justify-content: center;
        }
        .voice-modal-box {
          padding: 2.5rem; text-align: center; border-radius: 24px; max-width: 400px;
        }
        .pulse-mic-icon {
          width: 70px; height: 70px; border-radius: 50%; background: rgba(249, 115, 22, 0.15);
          color: var(--accent-orange); display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem auto; animation: pulseGlow 1.2s infinite;
        }
        @media (max-width: 1024px) {
          .hero-container { grid-template-columns: 1fr; text-align: center; }
          .hero-subheading, .hero-tags, .hero-cta-buttons { margin-left: auto; margin-right: auto; justify-content: center; }
          .hero-search-box { flex-direction: column; gap: 0.5rem; }
          .divider-line { display: none; }
          .card-jobs, .card-companies, .card-candidates { position: relative; top: auto; bottom: auto; left: auto; right: auto; margin: 0.5rem; }
          .visual-wrapper { flex-wrap: wrap; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
