import React, { useState } from 'react'
import {
  Users,
  LayoutDashboard,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  Database,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronDown,
  LogOut,
  UserCheck
} from 'lucide-react'

export default function Header({
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
  isMock,
  onOpenSqlModal,
  userCount = 12
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users, badge: String(userCount) },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle }
  ]

  const mockNotifications = [
    { id: 1, text: 'Sophia Martinez updated profile details', time: '3m ago' },
    { id: 2, text: 'New user Aisha Patel registered from Mumbai', time: '45m ago' },
    { id: 3, text: 'Supabase table backup sync complete', time: '2h ago' }
  ]

  return (
    <header className="glass-header-advanced">
      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Left Side: Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <div
            onClick={() => setActiveTab('dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', userSelect: 'none' }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '0.875rem',
              background: 'linear-gradient(135deg, #2563EB 0%, #F97316 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 16px rgba(37, 99, 235, 0.35)'
            }}>
              <Users size={22} strokeWidth={2.2} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-main)' }}>
                  User<span style={{ color: 'var(--primary-blue)' }}>Hub</span>
                </span>
                <span style={{
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  padding: '2px 7px',
                  borderRadius: '999px',
                  background: 'var(--accent-orange-light)',
                  color: 'var(--accent-orange)',
                  border: '1px solid var(--accent-orange-border)'
                }}>
                  PRO v2.5
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '-2px' }}>
                Manage Users Efficiently
              </span>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            {navItems.map(item => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 0.95rem',
                    borderRadius: '0.625rem',
                    border: 'none',
                    background: isActive ? 'var(--primary-blue)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      fontSize: '0.6875rem',
                      padding: '1px 7px',
                      borderRadius: '999px',
                      background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--border-light)',
                      color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                      fontWeight: 700
                    }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Supabase Connection Status Pill */}
          <button
            onClick={onOpenSqlModal}
            title="Click for Supabase SQL Setup"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              border: isMock ? '1px solid var(--accent-orange-border)' : '1px solid var(--status-active-border)',
              background: isMock ? 'var(--accent-orange-light)' : 'var(--status-active-bg)',
              color: isMock ? 'var(--accent-orange)' : 'var(--status-active-text)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Database size={13} />
            <span>{isMock ? 'Demo Mode' : 'Supabase Live'}</span>
            {isMock ? <AlertCircle size={13} /> : <CheckCircle2 size={13} />}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            title="Toggle Light/Dark Theme"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '0.625rem',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-card)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} style={{ color: '#F59E0B' }} />}
          </button>

          {/* Notifications Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '0.625rem',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <Bell size={18} />
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent-orange)'
              }} />
            </button>

            {notificationsOpen && (
              <div className="glass-panel animate-fade-in" style={{
                position: 'absolute',
                right: 0,
                top: '48px',
                width: '310px',
                padding: '1rem',
                zIndex: 60,
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-xl)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>System Alerts</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary-blue)', cursor: 'pointer', fontWeight: 600 }}>Mark all read</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {mockNotifications.map(n => (
                    <div key={n.id} style={{ fontSize: '0.8125rem', padding: '0.625rem', borderRadius: '0.5rem', background: 'var(--bg-main)' }}>
                      <p style={{ color: 'var(--text-main)', margin: 0, fontWeight: 500 }}>{n.text}</p>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar Menu */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '3px 8px 3px 3px',
                borderRadius: '9999px',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-card)',
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Admin Profile"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-blue)' }}
                />
                <span style={{ position: 'absolute', bottom: '1px', right: '1px', width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', border: '2px solid #FFFFFF' }} />
              </div>
              <div className="desktop-nav" style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.2' }}>Alex Morgan</span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Super Admin</span>
              </div>
              <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
            </div>

            {profileDropdownOpen && (
              <div className="glass-panel animate-fade-in" style={{
                position: 'absolute',
                right: 0,
                top: '48px',
                width: '200px',
                padding: '0.5rem',
                zIndex: 60,
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-xl)'
              }}>
                <button
                  onClick={() => { setActiveTab('settings'); setProfileDropdownOpen(false); }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.5rem 0.75rem', border: 'none', background: 'transparent', color: 'var(--text-main)', fontSize: '0.8125rem', fontWeight: 500, borderRadius: '0.375rem', cursor: 'pointer' }}
                >
                  <Settings size={15} /> Account Settings
                </button>
                <button
                  onClick={() => { setActiveTab('help'); setProfileDropdownOpen(false); }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.5rem 0.75rem', border: 'none', background: 'transparent', color: 'var(--text-main)', fontSize: '0.8125rem', fontWeight: 500, borderRadius: '0.375rem', cursor: 'pointer' }}
                >
                  <HelpCircle size={15} /> Help Documentation
                </button>
                <div style={{ height: '1px', background: 'var(--border-light)', margin: '0.25rem 0' }} />
                <button
                  onClick={() => setProfileDropdownOpen(false)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.5rem 0.75rem', border: 'none', background: 'transparent', color: '#DC2626', fontSize: '0.8125rem', fontWeight: 600, borderRadius: '0.375rem', cursor: 'pointer' }}
                >
                  <LogOut size={15} /> Log Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Drawer Hamburger */}
          <button
            className="mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '0.625rem',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-card)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="glass-panel animate-fade-in" style={{
          position: 'absolute',
          top: '100%',
          left: '1rem',
          right: '1rem',
          marginTop: '0.5rem',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          boxShadow: 'var(--shadow-xl)',
          background: 'var(--bg-card)'
        }}>
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setMobileMenuOpen(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.625rem',
                  border: 'none',
                  background: isActive ? 'var(--primary-blue)' : 'transparent',
                  color: isActive ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9375rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Icon size={18} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: isActive ? 'rgba(255,255,255,0.3)' : 'var(--primary-blue)',
                    color: '#FFF'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
        @media (min-width: 961px) {
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </header>
  )
}
