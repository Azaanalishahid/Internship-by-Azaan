import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import DashboardOverview from './pages/DashboardOverview'
import UsersPage from './pages/UsersPage'
import AnalyticsPage from './pages/AnalyticsPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'
import UserModal from './components/UserModal'
import { isSupabaseConfigured, fetchUsersFromSupabase } from './services/supabase'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard' | 'users' | 'analytics' | 'reports' | 'settings' | 'help'
  const [theme, setTheme] = useState(() => localStorage.getItem('userhub_theme') || 'light')
  const [density, setDensity] = useState(() => localStorage.getItem('userhub_density') || 'comfortable')
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false)
  const [sharedUsers, setSharedUsers] = useState([])
  const [initialUsersRoleFilter, setInitialUsersRoleFilter] = useState('All')

  // Overview User View Modal State
  const [viewUserModal, setViewUserModal] = useState({ isOpen: false, user: null })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('userhub_theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-density', density)
    localStorage.setItem('userhub_density', density)
  }, [density])

  const loadSharedUsers = () => {
    fetchUsersFromSupabase().then(res => setSharedUsers(res.data || []))
  }

  useEffect(() => {
    loadSharedUsers()
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const handleNavigateToUsersWithFilter = (roleOrStatus) => {
    if (roleOrStatus) {
      setInitialUsersRoleFilter(roleOrStatus)
    }
    setActiveTab('users')
  }

  return (
    <div className="app-container">
      {/* Advance Level Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        isMock={!isSupabaseConfigured}
        onOpenSqlModal={() => setIsSqlModalOpen(true)}
        userCount={sharedUsers.length}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* SEPARATE PAGE 1: EXECUTIVE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <DashboardOverview
            users={sharedUsers}
            onNavigateToUsers={handleNavigateToUsersWithFilter}
            onAddUser={() => setActiveTab('users')}
            onOpenSqlModal={() => setIsSqlModalOpen(true)}
            onViewUser={(user) => setViewUserModal({ isOpen: true, user })}
          />
        )}

        {/* SEPARATE PAGE 2: DEDICATED USERS MANAGEMENT PAGE */}
        {activeTab === 'users' && (
          <UsersPage
            onOpenSqlModal={() => setIsSqlModalOpen(true)}
            isSqlModalOpen={isSqlModalOpen}
            onCloseSqlModal={() => setIsSqlModalOpen(false)}
            initialRoleFilter={initialUsersRoleFilter}
          />
        )}

        {/* PAGE 3: ANALYTICS */}
        {activeTab === 'analytics' && (
          <AnalyticsPage users={sharedUsers} />
        )}

        {/* PAGE 4: REPORTS */}
        {activeTab === 'reports' && (
          <ReportsPage users={sharedUsers} />
        )}

        {/* PAGE 5: SETTINGS */}
        {activeTab === 'settings' && (
          <SettingsPage
            density={density}
            setDensity={setDensity}
            theme={theme}
            toggleTheme={toggleTheme}
            onOpenSqlModal={() => setIsSqlModalOpen(true)}
          />
        )}

        {/* PAGE 6: HELP */}
        {activeTab === 'help' && (
          <div className="glass-panel animate-fade-in" style={{ padding: '3.5rem 2rem', textAlign: 'center', margin: '1.5rem 0' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              UserHub Help & Documentation Center
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', maxWidth: '540px', margin: '0 auto 1.75rem auto' }}>
              Learn how to connect your Supabase database, run SQL migration scripts, configure Row Level Security (RLS), and perform batch operations.
            </p>
            <button onClick={() => setIsSqlModalOpen(true)} className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9375rem' }}>
              View Supabase SQL & Schema Setup Guide
            </button>
          </div>
        )}
      </main>

      {/* Dashboard Overview User Detail Modal */}
      <UserModal
        isOpen={viewUserModal.isOpen}
        onClose={() => setViewUserModal({ isOpen: false, user: null })}
        mode="view"
        user={viewUserModal.user}
        onSave={() => {}}
      />

      {/* Footer */}
      <Footer onOpenSqlModal={() => setIsSqlModalOpen(true)} />
    </div>
  )
}
