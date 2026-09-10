import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Download, Edit3, Award, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';

const Profile = () => {
  const { user, addToast } = useAuth();

  return (
    <div className="page-wrapper">
      <Header />

      <main className="profile-page">
        <div className="container">
          <div className="profile-hero-card glass-card">
            <div className="profile-avatar-box">
              <img src={user?.avatar || '/images/avatar.jpg'} alt="Avatar" className="profile-large-avatar" />
              <button className="edit-avatar-btn" onClick={() => addToast('Avatar editor opened')}>
                <Edit3 size={14} />
              </button>
            </div>

            <div className="profile-info-main">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="profile-name">{user?.name || 'Muhammad'}</h1>
                  <p className="profile-title">{user?.title || 'Senior React Developer & Tech Lead'}</p>
                  <p className="profile-loc">📍 {user?.location || 'San Francisco, CA'}</p>
                </div>
                <button className="btn btn-outline" onClick={() => addToast('Downloading Candidate Resume PDF...')}>
                  <Download size={16} /> Download Resume
                </button>
              </div>

              <div className="social-pills">
                <a href={`https://${user?.github || 'github.com'}`} target="_blank" rel="noreferrer" className="social-pill">
                  <GithubIcon size={16} /> GitHub
                </a>
                <a href={`https://${user?.linkedin || 'linkedin.com'}`} target="_blank" rel="noreferrer" className="social-pill">
                  <LinkedinIcon size={16} color="#0A66C2" /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-main-col">
              {/* Skills Progress Bars */}
              <div className="profile-card glass-card">
                <h3 className="card-title"><Sparkles size={18} className="text-orange" /> Technical Competencies & Skills</h3>
                <div className="skills-bars-list">
                  {user?.skills?.map((skill, idx) => (
                    <div key={idx} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-pct">{skill.level}%</span>
                      </div>
                      <div className="skill-bar-bg">
                        <div className="skill-bar-fill" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="profile-card glass-card">
                <h3 className="card-title"><Briefcase size={18} className="text-blue" /> Work Experience</h3>
                <div className="exp-timeline">
                  {user?.experience?.map((exp, idx) => (
                    <div key={idx} className="exp-item">
                      <div className="exp-icon"><Briefcase size={16} /></div>
                      <div>
                        <h4 className="exp-role">{exp.role}</h4>
                        <p className="exp-company">{exp.company} • {exp.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="profile-side-col">
              <div className="profile-card glass-card">
                <h3 className="card-title">Contact Info</h3>
                <ul className="info-list">
                  <li><Mail size={16} /> {user?.email}</li>
                  <li><Phone size={16} /> {user?.phone || '+1 (555) 234-5678'}</li>
                  <li><GraduationCap size={16} /> B.S. Computer Science</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .profile-page { padding: 8.5rem 0 5rem 0; min-height: 85vh; }
        .profile-hero-card { padding: 2.5rem; display: flex; gap: 2rem; margin-bottom: 2rem; border-radius: 24px; }
        .profile-avatar-box { position: relative; }
        .profile-large-avatar { width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 4px solid var(--secondary-blue); }
        .edit-avatar-btn { position: absolute; bottom: 4px; right: 4px; width: 28px; height: 28px; border-radius: 50%; background: var(--accent-orange); color: #FFF; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .profile-info-main { flex: 1; }
        .profile-name { font-size: 2.2rem; font-weight: 800; }
        .profile-title { font-size: 1.1rem; color: var(--secondary-blue); font-weight: 700; }
        .profile-loc { font-size: 0.9rem; color: var(--text-secondary); margin: 0.3rem 0 1rem 0; }
        .social-pills { display: flex; gap: 0.75rem; }
        .social-pill { display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.85rem; border-radius: var(--radius-full); border: 1px solid var(--border-color); background: var(--bg-card); font-size: 0.85rem; font-weight: 600; }
        .profile-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
        .profile-card { padding: 1.75rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; }
        .card-title { font-size: 1.2rem; font-weight: 800; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; }
        .skills-bars-list { display: flex; flex-direction: column; gap: 1.2rem; }
        .skill-info { display: flex; justify-content: space-between; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.3rem; }
        .skill-bar-bg { width: 100%; height: 8px; background: var(--border-color); border-radius: 4px; overflow: hidden; }
        .skill-bar-fill { height: 100%; background: linear-gradient(90deg, #2563EB, #F97316); border-radius: 4px; }
        .exp-timeline { display: flex; flex-direction: column; gap: 1.25rem; }
        .exp-item { display: flex; gap: 1rem; }
        .exp-icon { width: 36px; height: 36px; border-radius: 50%; background: rgba(37, 99, 235, 0.1); color: var(--secondary-blue); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .exp-role { font-weight: 800; font-size: 1rem; }
        .exp-company { font-size: 0.85rem; color: var(--text-secondary); }
        .info-list { list-style: none; display: flex; flex-direction: column; gap: 0.85rem; font-size: 0.9rem; }
        .info-list li { display: flex; align-items: center; gap: 0.6rem; }
        @media (max-width: 900px) { .profile-hero-card { flex-direction: column; text-align: center; } .profile-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default Profile;
