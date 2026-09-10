import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTA from '../components/CTA';
import { 
  Target, 
  Eye, 
  Users, 
  Building, 
  Globe, 
  Award, 
  Sparkles, 
  CheckCircle2,
  Calendar,
  Briefcase
} from 'lucide-react';

const TEAM = [
  {
    name: 'Alexandra Vance',
    role: 'Co-Founder & CEO',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    bio: 'Former VP of Talent at TechCorp with 15+ years experience building global engineering teams.'
  },
  {
    name: 'Marcus Sterling',
    role: 'Chief Technology Officer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    bio: 'Ex-Google Principal Architect focused on AI-driven career matching algorithms.'
  },
  {
    name: 'Sophia Patel',
    role: 'Head of Employer Partnerships',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80',
    bio: 'Pioneered corporate hiring initiatives across Fortune 500 tech companies.'
  }
];

const TIMELINE = [
  { year: '2021', title: 'Company Founded', desc: 'CareerConnect launched with a mission to eliminate recruitment friction.' },
  { year: '2022', title: 'Series A Funding', desc: 'Secured $15M in funding to scale our AI-matched job platform.' },
  { year: '2024', title: 'Global Expansion', desc: 'Expanded across Europe and Asia with 8,000+ active partner companies.' },
  { year: '2026', title: '#1 Rated Platform', desc: 'Reached 200,000+ successful hires and 99.8% customer satisfaction.' }
];

const About = () => {
  return (
    <div className="page-wrapper">
      <Header />

      <main className="about-page">
        {/* Page Hero Header */}
        <section className="about-hero">
          <div className="container">
            <div className="about-hero-content text-center">
              <span className="badge badge-blue">
                <Sparkles size={16} /> Our Story & Purpose
              </span>
              <h1 className="about-hero-title">Empowering Careers & Connecting Futures</h1>
              <p className="about-hero-sub">
                At CareerConnect, we believe everyone deserves a job they love. We're bridging the gap between exceptional talent and visionaries building tomorrow.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="about-stats-section">
          <div className="container">
            <div className="stats-grid glass-card">
              <div className="stat-box">
                <h3 className="stat-number gradient-text-blue">15,000+</h3>
                <p className="stat-label">Active Job Postings</p>
              </div>
              <div className="stat-box">
                <h3 className="stat-number gradient-text-orange">8,000+</h3>
                <p className="stat-label">Verified Employers</p>
              </div>
              <div className="stat-box">
                <h3 className="stat-number gradient-text-blue">200,000+</h3>
                <p className="stat-label">Successful Matches</p>
              </div>
              <div className="stat-box">
                <h3 className="stat-number gradient-text-orange">99.4%</h3>
                <p className="stat-label">Positive Feedback</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mission-vision-section">
          <div className="container">
            <div className="mv-grid">
              <div className="mv-card glass-card">
                <div className="mv-icon-box blue">
                  <Target size={30} />
                </div>
                <h2 className="mv-title">Our Mission</h2>
                <p className="mv-text">
                  To democratize access to career opportunities worldwide by building the most intuitive, transparent, and candidate-centric recruitment platform.
                </p>
                <ul className="mv-list">
                  <li><CheckCircle2 size={18} className="check" /> Zero fee for job seekers</li>
                  <li><CheckCircle2 size={18} className="check" /> Direct employer communication</li>
                  <li><CheckCircle2 size={18} className="check" /> Verified compensation benchmarks</li>
                </ul>
              </div>

              <div className="mv-card glass-card">
                <div className="mv-icon-box orange">
                  <Eye size={30} />
                </div>
                <h2 className="mv-title">Our Vision</h2>
                <p className="mv-text">
                  To create a global workforce ecosystem where skills, passion, and opportunity align effortlessly regardless of geographic location.
                </p>
                <ul className="mv-list">
                  <li><CheckCircle2 size={18} className="check" /> AI-enhanced candidate profiling</li>
                  <li><CheckCircle2 size={18} className="check" /> Seamless remote hiring pipelines</li>
                  <li><CheckCircle2 size={18} className="check" /> Continuous learning & career tools</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Office Gallery & Story */}
        <section className="story-office-section">
          <div className="container story-grid">
            <div className="story-image-box">
              <img src="/images/office.jpg" alt="CareerConnect Office Workspace" className="office-img" />
              <div className="office-tag glass-card">
                <Building size={20} className="text-blue" />
                <span>San Francisco HQ</span>
              </div>
            </div>

            <div className="story-content">
              <span className="badge badge-orange">Our Journey</span>
              <h2 className="section-heading">Built by Tech Leaders, For Global Talent</h2>
              <p className="story-p">
                Founded in 2021, CareerConnect began with a simple observation: legacy job portals were bloated, filled with outdated listings, and lacked transparency.
              </p>
              <p className="story-p">
                We re-engineered the hiring workflow from the ground up. Today, CareerConnect powers recruitment for startups and Fortune 500 giants alike, connecting tech pioneers with visionary companies.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="timeline-section">
          <div className="container">
            <div className="section-title-wrapper">
              <span className="badge badge-blue">Growth Story</span>
              <h2 className="section-heading">Milestones Along Our Way</h2>
            </div>

            <div className="timeline-grid">
              {TIMELINE.map((item, i) => (
                <div key={i} className="timeline-card glass-card">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="team-section">
          <div className="container">
            <div className="section-title-wrapper">
              <span className="badge badge-orange">Leadership</span>
              <h2 className="section-heading">Meet Our Leadership Team</h2>
              <p className="section-subtitle">
                Passionate industry veterans committed to transforming how the world works.
              </p>
            </div>

            <div className="team-grid">
              {TEAM.map((member, idx) => (
                <div key={idx} className="team-card glass-card">
                  <img src={member.avatar} alt={member.name} className="team-avatar" />
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>

      <Footer />

      <style>{`
        .about-hero {
          padding: 8.5rem 0 4rem 0;
          background: linear-gradient(180deg, rgba(239, 246, 255, 0.5) 0%, rgba(248, 250, 252, 1) 100%);
        }
        body.dark-mode .about-hero {
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 1) 100%);
        }
        .about-hero-title {
          font-size: 3.2rem;
          font-weight: 800;
          margin: 1rem 0;
          letter-spacing: -0.02em;
        }
        .about-hero-sub {
          font-size: 1.2rem;
          color: var(--text-secondary);
          max-width: 680px;
          margin: 0 auto;
        }
        .about-stats-section {
          margin-top: -2.5rem;
          margin-bottom: 4rem;
          position: relative;
          z-index: 10;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          padding: 2.5rem 1.5rem;
          text-align: center;
        }
        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
        }
        .stat-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-top: 0.2rem;
        }
        .mission-vision-section {
          padding: 4rem 0;
        }
        .mv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }
        .mv-card {
          padding: 2.5rem;
          border-radius: var(--radius-lg);
        }
        .mv-icon-box {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .mv-icon-box.blue { background: rgba(37, 99, 235, 0.12); color: var(--secondary-blue); }
        .mv-icon-box.orange { background: rgba(249, 115, 22, 0.12); color: var(--accent-orange); }
        .mv-title {
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        .mv-text {
          font-size: 1.05rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        .mv-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .mv-list li {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 600;
          font-size: 0.95rem;
        }
        .mv-list .check {
          color: #10B981;
        }
        .story-office-section {
          padding: 5rem 0;
          background: rgba(239, 246, 255, 0.3);
        }
        body.dark-mode .story-office-section {
          background: rgba(15, 23, 42, 0.4);
        }
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          align-items: center;
        }
        .story-image-box {
          position: relative;
        }
        .office-img {
          width: 100%;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
        }
        .office-tag {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          padding: 0.75rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 700;
          font-size: 0.95rem;
        }
        .story-p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-top: 1.25rem;
          line-height: 1.7;
        }
        .timeline-section {
          padding: 5rem 0;
        }
        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.75rem;
        }
        .timeline-card {
          padding: 2rem;
          border-radius: var(--radius-lg);
          border-top: 4px solid var(--secondary-blue);
        }
        .timeline-year {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--secondary-blue);
        }
        .timeline-title {
          font-size: 1.15rem;
          font-weight: 800;
          margin: 0.5rem 0;
        }
        .timeline-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .team-section {
          padding: 5rem 0;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }
        .team-card {
          padding: 2rem;
          text-align: center;
          border-radius: var(--radius-lg);
        }
        .team-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1rem;
          border: 3px solid var(--secondary-blue);
        }
        .team-name {
          font-size: 1.3rem;
          font-weight: 800;
        }
        .team-role {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--accent-orange);
          margin-bottom: 1rem;
        }
        .team-bio {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .mv-grid, .story-grid { grid-template-columns: 1fr; }
          .about-hero-title { font-size: 2.3rem; }
        }
      `}</style>
    </div>
  );
};

export default About;
