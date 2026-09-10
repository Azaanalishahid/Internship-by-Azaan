import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Briefcase, 
  Search, 
  Moon, 
  Sun, 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Globe,
  FileText,
  MessageSquare,
  Shield,
  Settings
} from 'lucide-react';

const Header = () => {
  const { 
    user, 
    logout, 
    darkMode, 
    toggleDarkMode, 
    language, 
    changeLanguage,
    notifications,
    setNotifDrawerOpen 
  } = useAuth();
  
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const unreadNotifCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Hairline Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo">
            <div className="logo-icon">
              <Briefcase size={22} color="#FFFFFF" />
            </div>
            <span className="logo-text">
              Career<span className="accent">Connect</span>
            </span>
          </Link>

          {/* Enterprise Desktop Navigation */}
          <nav className="desktop-nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
            <Link to="/jobs" className={`nav-link ${isActive('/jobs') ? 'active' : ''}`}>Jobs</Link>
            <Link to="/companies" className={`nav-link ${isActive('/companies') ? 'active' : ''}`}>Companies</Link>
            <Link to="/resume-builder" className={`nav-link ${isActive('/resume-builder') ? 'active' : ''}`}>Resume Builder</Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
            {user && (
              <>
                <Link to="/messages" className={`nav-link ${isActive('/messages') ? 'active' : ''}`}>Messages</Link>
                <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Link>
                <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>Admin</Link>
              </>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="header-actions">
            {/* Language Switcher */}
            <div className="lang-wrapper">
              <button className="icon-btn lang-btn" onClick={() => setLangDropdown(!langDropdown)}>
                <Globe size={17} />
                <span className="lang-code">{language}</span>
              </button>
              {langDropdown && (
                <div className="lang-dropdown glass-card animate-fade-in">
                  {['EN', 'ES', 'FR', 'DE', 'AR'].map(lang => (
                    <button 
                      key={lang} 
                      className={`lang-option ${language === lang ? 'selected' : ''}`}
                      onClick={() => { changeLanguage(lang); setLangDropdown(false); }}
                    >
                      {lang === 'EN' ? 'English (US)' :
                       lang === 'ES' ? 'Español' :
                       lang === 'FR' ? 'Français' :
                       lang === 'DE' ? 'Deutsch' : 'العربية'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button className="icon-btn" onClick={toggleDarkMode} aria-label="Toggle Theme">
              {darkMode ? <Sun size={19} className="text-amber-400" /> : <Moon size={19} />}
            </button>

            {user ? (
              <div className="user-profile-menu">
                {/* Notification Bell Drawer Trigger */}
                <button className="icon-btn notif-btn" onClick={() => setNotifDrawerOpen(true)}>
                  <Bell size={19} />
                  {unreadNotifCount > 0 && <span className="notif-badge">{unreadNotifCount}</span>}
                </button>

                <div className="profile-wrapper">
                  <button className="avatar-btn" onClick={() => setProfileDropdown(!profileDropdown)}>
                    <img src={user.avatar || '/images/avatar.jpg'} alt={user.name} className="avatar-img" />
                    <span className="user-name">{user.name}</span>
                  </button>

                  {profileDropdown && (
                    <div className="profile-dropdown glass-card animate-fade-in">
                      <div className="dropdown-header">
                        <p className="user-full-name">{user.name}</p>
                        <p className="user-email">{user.email}</p>
                        <span className="role-tag">{user.role || 'candidate'}</span>
                      </div>
                      <hr className="dropdown-divider" />
                      <Link to="/profile" className="dropdown-item" onClick={() => setProfileDropdown(false)}>
                        <User size={16} /> My Profile
                      </Link>
                      <Link to="/dashboard" className="dropdown-item" onClick={() => setProfileDropdown(false)}>
                        <Briefcase size={16} /> Dashboard
                      </Link>
                      <Link to="/messages" className="dropdown-item" onClick={() => setProfileDropdown(false)}>
                        <MessageSquare size={16} /> Messages
                      </Link>
                      <Link to="/settings" className="dropdown-item" onClick={() => setProfileDropdown(false)}>
                        <Settings size={16} /> Settings
                      </Link>
                      <hr className="dropdown-divider" />
                      <button 
                        className="dropdown-item text-danger" 
                        onClick={() => {
                          setProfileDropdown(false);
                          logout();
                          navigate('/');
                        }}
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-ghost">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer glass-card animate-fade-in">
            <nav className="mobile-nav">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home <ChevronRight size={18} /></Link>
              <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>Jobs <ChevronRight size={18} /></Link>
              <Link to="/companies" onClick={() => setMobileMenuOpen(false)}>Companies <ChevronRight size={18} /></Link>
              <Link to="/resume-builder" onClick={() => setMobileMenuOpen(false)}>Resume Builder <ChevronRight size={18} /></Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About <ChevronRight size={18} /></Link>
              {user && (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard <ChevronRight size={18} /></Link>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile <ChevronRight size={18} /></Link>
                  <Link to="/messages" onClick={() => setMobileMenuOpen(false)}>Messages <ChevronRight size={18} /></Link>
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Admin Panel <ChevronRight size={18} /></Link>
                </>
              )}
            </nav>
            <div className="mobile-auth">
              {!user ? (
                <>
                  <Link to="/login" className="btn btn-outline" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                  <Link to="/register" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Register Account</Link>
                </>
              ) : (
                <button className="btn btn-accent" onClick={() => { logout(); setMobileMenuOpen(false); }}>Logout</button>
              )}
            </div>
          </div>
        )}

        <style>{`
          .header {
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 1000;
            padding: 1.2rem 0;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          }
          body.dark-mode .header {
            background: rgba(15, 23, 42, 0.5);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }
          .header.scrolled {
            padding: 0.85rem 0;
            background: rgba(255, 255, 255, 0.88);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          }
          body.dark-mode .header.scrolled {
            background: rgba(15, 23, 42, 0.92);
          }
          .header-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .brand-logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          .logo-icon {
            width: 42px;
            height: 42px;
            background: linear-gradient(135deg, #2563EB 0%, #F97316 100%);
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          }
          .logo-text {
            font-size: 1.35rem;
            font-weight: 800;
            color: var(--text-main);
          }
          .logo-text .accent {
            color: var(--secondary-blue);
          }
          .desktop-nav {
            display: flex;
            align-items: center;
            gap: 1.5rem;
          }
          .nav-link {
            font-weight: 600;
            color: var(--text-secondary);
            transition: color 0.2s ease;
            font-size: 0.92rem;
          }
          .nav-link:hover, .nav-link.active {
            color: var(--secondary-blue);
          }
          .header-actions {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          .icon-btn {
            width: 40px;
            height: 40px;
            border-radius: var(--radius-full);
            border: 1px solid var(--border-color);
            background: var(--bg-card);
            color: var(--text-main);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
          }
          .lang-wrapper {
            position: relative;
          }
          .lang-btn {
            width: auto;
            padding: 0 0.65rem;
            gap: 0.3rem;
          }
          .lang-code {
            font-size: 0.75rem;
            font-weight: 800;
          }
          .lang-dropdown {
            position: absolute;
            top: 100%; right: 0;
            width: 140px;
            padding: 0.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            margin-top: 0.5rem;
          }
          .lang-option {
            padding: 0.4rem 0.6rem;
            border: none;
            background: transparent;
            font-size: 0.8rem;
            font-weight: 600;
            text-align: left;
            border-radius: var(--radius-sm);
            cursor: pointer;
          }
          .lang-option.selected {
            background: var(--secondary-blue-light);
            color: var(--secondary-blue);
          }
          .notif-badge {
            position: absolute;
            top: -2px; right: -2px;
            width: 18px; height: 18px;
            background: var(--accent-orange);
            color: #FFF;
            font-size: 0.65rem;
            font-weight: 800;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .user-profile-menu {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          .profile-wrapper {
            position: relative;
          }
          .avatar-btn {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            border: none;
            background: transparent;
            cursor: pointer;
          }
          .avatar-img {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid var(--secondary-blue);
          }
          .user-name {
            font-weight: 700;
            font-size: 0.95rem;
            color: var(--text-main);
          }
          .profile-dropdown {
            position: absolute;
            top: calc(100% + 12px);
            right: 0;
            width: 230px;
            padding: 1rem;
            z-index: 1100;
          }
          .user-full-name {
            font-weight: 800;
            font-size: 0.95rem;
          }
          .user-email {
            font-size: 0.8rem;
            color: var(--text-secondary);
          }
          .role-tag {
            display: inline-block;
            font-size: 0.65rem;
            font-weight: 800;
            color: var(--accent-orange);
            background: var(--accent-orange-light);
            padding: 0.15rem 0.5rem;
            border-radius: var(--radius-full);
            text-transform: uppercase;
            margin-top: 0.3rem;
          }
          .dropdown-divider {
            border: 0;
            border-top: 1px solid var(--border-color);
            margin: 0.6rem 0;
          }
          .dropdown-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            width: 100%;
            padding: 0.5rem;
            border: none;
            background: transparent;
            color: var(--text-main);
            font-size: 0.9rem;
            font-weight: 500;
            border-radius: var(--radius-sm);
            cursor: pointer;
          }
          .dropdown-item:hover {
            background: var(--secondary-blue-light);
            color: var(--secondary-blue);
          }
          .auth-buttons {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .mobile-toggle {
            display: none;
            background: transparent;
            border: none;
            color: var(--text-main);
            cursor: pointer;
          }
          .mobile-drawer {
            position: absolute;
            top: 100%; left: 1.5rem; right: 1.5rem;
            padding: 1.5rem; margin-top: 0.5rem;
            display: flex; flex-direction: column; gap: 1.5rem;
          }
          .mobile-nav {
            display: flex; flex-direction: column; gap: 0.85rem;
          }
          .mobile-nav a {
            display: flex; align-items: center; justify-content: space-between;
            font-size: 1rem; font-weight: 600; padding: 0.5rem 0;
            border-bottom: 1px solid var(--border-color);
          }
          .mobile-auth {
            display: flex; flex-direction: column; gap: 0.75rem;
          }
          @media (max-width: 992px) {
            .desktop-nav, .auth-buttons, .user-name { display: none; }
            .mobile-toggle { display: block; }
          }
        `}</style>
      </header>
    </>
  );
};

export default Header;
