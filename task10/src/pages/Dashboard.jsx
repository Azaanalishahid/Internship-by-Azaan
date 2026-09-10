import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { INITIAL_JOBS } from '../components/FeaturedJobs';
import { 
  Briefcase, 
  Bookmark, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Upload, 
  Bell, 
  MessageSquare, 
  Settings, 
  User, 
  Video, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Search,
  Check,
  Edit3
} from 'lucide-react';

const Dashboard = () => {
  const { user, appliedJobs, savedJobs, toggleSaveJob, applyForJob, addToast } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadedResume, setUploadedResume] = useState('Muhammad_Resume_2026.pdf');

  // Filter saved job objects
  const savedJobObjects = INITIAL_JOBS.filter(j => savedJobs.includes(j.id));
  const recommendedJobs = INITIAL_JOBS.filter(j => !appliedJobs.some(a => a.id === j.id)).slice(0, 3);

  const handleResumeUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setUploadedResume(fileName);
      addToast(`Resume uploaded successfully: ${fileName}`);
    }
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="dashboard-page">
        <div className="container">
          {/* Welcome Card */}
          <div className="welcome-banner glass-card animate-fade-in">
            <div className="welcome-info">
              <div className="welcome-avatar-wrapper">
                <img src={user?.avatar || '/images/avatar.jpg'} alt="Avatar" className="welcome-avatar" />
                <span className="online-indicator"></span>
              </div>
              <div>
                <h1 className="welcome-heading">
                  Hello, <span className="gradient-text-blue">{user?.name || 'Muhammad'}</span>! 👋
                </h1>
                <p className="welcome-sub">
                  Welcome back to your CareerConnect portal. You have 2 upcoming interviews this week.
                </p>
                <div className="user-tags">
                  <span className="user-role-tag">{user?.title || 'Senior React Developer'}</span>
                  <span className="user-loc-tag">📍 {user?.location || 'San Francisco, CA'}</span>
                </div>
              </div>
            </div>

            <div className="welcome-actions">
              <button 
                className="btn btn-primary"
                onClick={() => addToast('Profile edit mode enabled!')}
              >
                <Edit3 size={16} /> Edit Profile
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="dashboard-stats-grid">
            <div className="dash-stat-card glass-card">
              <div className="stat-icon-wrapper blue">
                <Briefcase size={22} />
              </div>
              <div>
                <p className="dash-stat-val">{appliedJobs.length}</p>
                <p className="dash-stat-lbl">Applied Jobs</p>
              </div>
            </div>

            <div className="dash-stat-card glass-card">
              <div className="stat-icon-wrapper orange">
                <Bookmark size={22} />
              </div>
              <div>
                <p className="dash-stat-val">{savedJobs.length}</p>
                <p className="dash-stat-lbl">Saved Jobs</p>
              </div>
            </div>

            <div className="dash-stat-card glass-card">
              <div className="stat-icon-wrapper green">
                <Calendar size={22} />
              </div>
              <div>
                <p className="dash-stat-val">2</p>
                <p className="dash-stat-lbl">Interview Invitations</p>
              </div>
            </div>

            <div className="dash-stat-card glass-card">
              <div className="stat-icon-wrapper purple">
                <TrendingUp size={22} />
              </div>
              <div>
                <p className="dash-stat-val">85%</p>
                <p className="dash-stat-lbl">Profile Completion</p>
              </div>
            </div>
          </div>

          {/* Dashboard Navigation Tabs */}
          <div className="dashboard-nav-tabs">
            {[
              { id: 'overview', label: 'Overview', icon: Briefcase },
              { id: 'applications', label: 'My Applications', icon: FileText },
              { id: 'saved', label: 'Saved Jobs', icon: Bookmark },
              { id: 'interviews', label: 'Interviews', icon: Calendar },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button 
                  key={tab.id} 
                  className={`dash-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={17} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="dashboard-content-grid">
              {/* Left Column: Recent Applications & Upcoming Interviews */}
              <div className="dash-main-col">
                {/* Recent Applications Table */}
                <div className="dash-section-card glass-card">
                  <div className="card-section-header">
                    <h3 className="section-card-title">Recent Applications</h3>
                    <button className="view-all-link" onClick={() => setActiveTab('applications')}>
                      View All ({appliedJobs.length})
                    </button>
                  </div>

                  <div className="table-responsive">
                    <table className="dash-table">
                      <thead>
                        <tr>
                          <th>Job Title</th>
                          <th>Company</th>
                          <th>Applied Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appliedJobs.slice(0, 4).map((app, idx) => (
                          <tr key={idx}>
                            <td className="font-bold">{app.title}</td>
                            <td>{app.company}</td>
                            <td>{app.date}</td>
                            <td>
                              <span className={`status-pill ${
                                app.status === 'Interviewing' ? 'status-green' :
                                app.status === 'Offered' ? 'status-blue' : 'status-yellow'
                              }`}>
                                {app.status}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="btn-table-action"
                                onClick={() => addToast(`Viewing status updates for ${app.company}`)}
                              >
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Upcoming Interviews Widget */}
                <div className="dash-section-card glass-card">
                  <div className="card-section-header">
                    <h3 className="section-card-title">Upcoming Interviews</h3>
                    <span className="badge badge-orange">2 Scheduled</span>
                  </div>

                  <div className="interviews-list">
                    <div className="interview-item">
                      <div className="interview-logo-box">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" width="30" />
                      </div>
                      <div className="interview-details">
                        <h4 className="interview-title">Technical Systems Round - Google</h4>
                        <p className="interview-time">
                          <Calendar size={14} /> Aug 10, 2026 at 2:00 PM EST (Google Meet)
                        </p>
                      </div>
                      <button 
                        className="btn btn-primary join-meeting-btn"
                        onClick={() => addToast('Connecting to Google Meet Video Room...')}
                      >
                        <Video size={16} /> Join Meeting
                      </button>
                    </div>

                    <div className="interview-item">
                      <div className="interview-logo-box">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" width="30" />
                      </div>
                      <div className="interview-details">
                        <h4 className="interview-title">System Design & Culture - Meta</h4>
                        <p className="interview-time">
                          <Calendar size={14} /> Aug 12, 2026 at 11:30 AM PST (Zoom Call)
                        </p>
                      </div>
                      <button 
                        className="btn btn-outline join-meeting-btn"
                        onClick={() => addToast('Joining Meta Interview lobby...')}
                      >
                        <Video size={16} /> Join Meeting
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recommended Jobs */}
                <div className="dash-section-card glass-card">
                  <div className="card-section-header">
                    <h3 className="section-card-title">Recommended Jobs for You</h3>
                  </div>

                  <div className="recommended-jobs-grid">
                    {recommendedJobs.map(job => (
                      <div key={job.id} className="rec-job-card">
                        <div className="rec-top">
                          <img src={job.logo} alt={job.company} width="36" height="36" className="rec-logo" />
                          <div>
                            <h4 className="rec-title">{job.title}</h4>
                            <p className="rec-company">{job.company} • {job.location}</p>
                          </div>
                        </div>
                        <div className="rec-bottom">
                          <span className="rec-salary">{job.salary}</span>
                          <button 
                            className="btn btn-accent btn-sm"
                            onClick={() => applyForJob(job)}
                          >
                            Easy Apply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar: Profile Completion, Resume Upload, Quick Actions */}
              <div className="dash-side-col">
                {/* Profile Completion Card */}
                <div className="dash-section-card glass-card">
                  <h3 className="section-card-title">Profile Completion</h3>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: '85%' }}></div>
                  </div>
                  <p className="progress-text">85% Complete - Add portfolio links to hit 100%!</p>
                </div>

                {/* Resume Upload Card */}
                <div className="dash-section-card glass-card">
                  <h3 className="section-card-title">Resume & Portfolio</h3>
                  <div className="resume-box">
                    <FileText size={28} className="text-blue" />
                    <div>
                      <p className="resume-filename">{uploadedResume}</p>
                      <p className="resume-updated">Updated 2 days ago</p>
                    </div>
                  </div>

                  <label className="btn btn-outline upload-btn">
                    <Upload size={16} /> Update Resume
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} hidden />
                  </label>
                </div>

                {/* Quick Actions */}
                <div className="dash-section-card glass-card">
                  <h3 className="section-card-title">Quick Actions</h3>
                  <div className="quick-actions-list">
                    <a href="/#jobs" className="quick-action-item">
                      <Search size={18} className="text-blue" /> Browse New Jobs
                    </a>
                    <button className="quick-action-item" onClick={() => addToast('Opening profile editor modal')}>
                      <User size={18} className="text-orange" /> Edit Profile Details
                    </button>
                    <button className="quick-action-item" onClick={() => addToast('Navigating to Notification settings')}>
                      <Bell size={18} className="text-purple" /> Notification Preferences
                    </button>
                  </div>
                </div>

                {/* Recent Notifications */}
                <div className="dash-section-card glass-card">
                  <h3 className="section-card-title">Notifications</h3>
                  <ul className="notif-list">
                    <li className="notif-item">
                      <Sparkles size={16} className="notif-icon text-orange" />
                      <div>
                        <p className="notif-msg">Google viewed your application for Sr. React Architect</p>
                        <span className="notif-time">2 hours ago</span>
                      </div>
                    </li>
                    <li className="notif-item">
                      <CheckCircle2 size={16} className="notif-icon text-green" />
                      <div>
                        <p className="notif-msg">Meta scheduled your System Design Interview</p>
                        <span className="notif-time">1 day ago</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Applications */}
          {activeTab === 'applications' && (
            <div className="dash-section-card glass-card animate-fade-in">
              <h3 className="section-card-title" style={{ marginBottom: '1.5rem' }}>All Applied Positions ({appliedJobs.length})</h3>
              <div className="table-responsive">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Applied Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliedJobs.map((app, idx) => (
                      <tr key={idx}>
                        <td className="font-bold">{app.title}</td>
                        <td>{app.company}</td>
                        <td>{app.date}</td>
                        <td>
                          <span className={`status-pill ${
                            app.status === 'Interviewing' ? 'status-green' :
                            app.status === 'Offered' ? 'status-blue' : 'status-yellow'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn-table-action"
                            onClick={() => addToast(`Application status for ${app.title}: ${app.status}`)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Saved Jobs */}
          {activeTab === 'saved' && (
            <div className="animate-fade-in">
              <h3 className="section-card-title" style={{ marginBottom: '1.5rem' }}>Saved Job Bookmarks ({savedJobObjects.length})</h3>
              {savedJobObjects.length === 0 ? (
                <div className="dash-section-card glass-card text-center" style={{ padding: '3rem' }}>
                  <p>No saved jobs yet! Explore jobs and click the bookmark icon to save them here.</p>
                </div>
              ) : (
                <div className="jobs-grid">
                  {savedJobObjects.map(job => (
                    <div key={job.id} className="job-card glass-card">
                      <div className="card-top">
                        <img src={job.logo} alt={job.company} width="40" height="40" />
                        <button className="save-btn saved" onClick={() => toggleSaveJob(job.id)}>
                          <Bookmark size={20} />
                        </button>
                      </div>
                      <h4 className="job-title" style={{ fontSize: '1.1rem' }}>{job.title}</h4>
                      <p style={{ color: 'var(--secondary-blue)', fontWeight: '700', fontSize: '0.85rem' }}>{job.company}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.5rem 0' }}>{job.location}</p>
                      <button className="btn btn-accent btn-sm" style={{ marginTop: '1rem' }} onClick={() => applyForJob(job)}>
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Interviews */}
          {activeTab === 'interviews' && (
            <div className="dash-section-card glass-card animate-fade-in">
              <h3 className="section-card-title" style={{ marginBottom: '1.5rem' }}>Scheduled Video Interviews</h3>
              <div className="interviews-list">
                <div className="interview-item">
                  <div className="interview-logo-box">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" width="30" />
                  </div>
                  <div className="interview-details">
                    <h4 className="interview-title">Technical Systems Round - Google</h4>
                    <p className="interview-time">
                      <Calendar size={14} /> Aug 10, 2026 at 2:00 PM EST (Google Meet)
                    </p>
                  </div>
                  <button className="btn btn-primary join-meeting-btn" onClick={() => addToast('Joining Meeting...')}>
                    <Video size={16} /> Join Video Call
                  </button>
                </div>

                <div className="interview-item">
                  <div className="interview-logo-box">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" width="30" />
                  </div>
                  <div className="interview-details">
                    <h4 className="interview-title">System Design & Culture - Meta</h4>
                    <p className="interview-time">
                      <Calendar size={14} /> Aug 12, 2026 at 11:30 AM PST (Zoom Call)
                    </p>
                  </div>
                  <button className="btn btn-outline join-meeting-btn" onClick={() => addToast('Joining Meeting...')}>
                    <Video size={16} /> Join Video Call
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Settings */}
          {activeTab === 'settings' && (
            <div className="dash-section-card glass-card animate-fade-in" style={{ maxWidth: '600px' }}>
              <h3 className="section-card-title" style={{ marginBottom: '1.5rem' }}>Account Settings</h3>
              <form className="auth-form" onSubmit={(e) => { e.preventDefault(); addToast('Settings saved!'); }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="input-wrapper" defaultValue={user?.name} style={{ padding: '0.75rem' }} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="input-wrapper" defaultValue={user?.email} style={{ padding: '0.75rem' }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Save Account Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        .dashboard-page {
          padding: 8.5rem 0 5rem 0;
          min-height: 90vh;
        }
        .welcome-banner {
          padding: 2rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          border-radius: 24px;
        }
        .welcome-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .welcome-avatar-wrapper {
          position: relative;
        }
        .welcome-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--secondary-blue);
        }
        .online-indicator {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 14px;
          height: 14px;
          background: #10B981;
          border: 2px solid #FFF;
          border-radius: 50%;
        }
        .welcome-heading {
          font-size: 2rem;
          font-weight: 800;
        }
        .welcome-sub {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-top: 0.2rem;
        }
        .user-tags {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        .user-role-tag {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--secondary-blue);
          background: rgba(37, 99, 235, 0.1);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
        }
        .user-loc-tag {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .dashboard-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .dash-stat-card {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          border-radius: var(--radius-lg);
        }
        .stat-icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-icon-wrapper.blue { background: rgba(37, 99, 235, 0.12); color: var(--secondary-blue); }
        .stat-icon-wrapper.orange { background: rgba(249, 115, 22, 0.12); color: var(--accent-orange); }
        .stat-icon-wrapper.green { background: rgba(16, 185, 129, 0.12); color: #10B981; }
        .stat-icon-wrapper.purple { background: rgba(139, 92, 246, 0.12); color: #8B5CF6; }
        .dash-stat-val {
          font-size: 1.75rem;
          font-weight: 800;
          line-height: 1.1;
        }
        .dash-stat-lbl {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .dashboard-nav-tabs {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.5rem;
          overflow-x: auto;
        }
        .dash-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-md);
          border: none;
          background: transparent;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .dash-tab-btn.active {
          background: var(--secondary-blue);
          color: #FFF;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        .dashboard-content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }
        .dash-main-col, .dash-side-col {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .dash-section-card {
          padding: 1.75rem;
          border-radius: var(--radius-lg);
        }
        .card-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .section-card-title {
          font-size: 1.25rem;
          font-weight: 800;
        }
        .view-all-link {
          background: transparent;
          border: none;
          color: var(--secondary-blue);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
        }
        .table-responsive {
          overflow-x: auto;
        }
        .dash-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .dash-table th, .dash-table td {
          padding: 0.9rem 0.75rem;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.9rem;
        }
        .dash-table th {
          font-weight: 700;
          color: var(--text-secondary);
        }
        .font-bold {
          font-weight: 700;
        }
        .status-pill {
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
        }
        .status-green { background: #D1FAE5; color: #047857; }
        .status-blue { background: #DBEAFE; color: #1D4ED8; }
        .status-yellow { background: #FEF3C7; color: #B45309; }
        .btn-table-action {
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          color: var(--text-main);
          font-weight: 600;
          font-size: 0.8rem;
          cursor: pointer;
        }
        .interviews-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .interview-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-radius: var(--radius-md);
          background: var(--bg-main);
          gap: 1rem;
        }
        .interview-logo-box {
          width: 44px;
          height: 44px;
          background: #FFF;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
        }
        .interview-title {
          font-size: 1rem;
          font-weight: 700;
        }
        .interview-time {
          font-size: 0.8rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .join-meeting-btn {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
        }
        .recommended-jobs-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .rec-job-card {
          padding: 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-card);
        }
        .rec-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .rec-title {
          font-size: 0.95rem;
          font-weight: 700;
        }
        .rec-company {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .rec-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .rec-salary {
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--accent-orange);
        }
        .btn-sm {
          padding: 0.4rem 0.85rem;
          font-size: 0.8rem;
        }
        .progress-bar-container {
          width: 100%;
          height: 8px;
          background: var(--border-color);
          border-radius: 4px;
          margin: 1rem 0 0.5rem 0;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #2563EB, #F97316);
          border-radius: 4px;
        }
        .progress-text {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .resume-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem;
          background: var(--bg-main);
          border-radius: var(--radius-md);
          margin: 1rem 0;
        }
        .resume-filename {
          font-weight: 700;
          font-size: 0.85rem;
        }
        .resume-updated {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .upload-btn {
          width: 100%;
          font-size: 0.85rem;
        }
        .quick-actions-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-top: 1rem;
        }
        .quick-action-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md);
          background: var(--bg-main);
          color: var(--text-main);
          font-size: 0.9rem;
          font-weight: 600;
          border: none;
          text-align: left;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .quick-action-item:hover {
          background: rgba(37, 99, 235, 0.08);
        }
        .notif-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }
        .notif-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.85rem;
        }
        .notif-msg {
          font-weight: 600;
          line-height: 1.3;
        }
        .notif-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .dashboard-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .dashboard-content-grid { grid-template-columns: 1fr; }
          .welcome-banner { flex-direction: column; text-align: center; gap: 1rem; }
          .welcome-info { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
