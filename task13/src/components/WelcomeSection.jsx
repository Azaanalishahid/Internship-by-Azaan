import React from 'react'
import { UserPlus, RefreshCw, Sparkles, Database, Download } from 'lucide-react'

export default function WelcomeSection({
  onAddUserClick,
  onRefreshClick,
  isRefreshing,
  onOpenSqlModal,
  onExportCSV,
  onExportJSON,
  totalUsers
}) {
  return (
    <div style={{
      marginBottom: '1.75rem',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1.5rem',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid var(--border-light)'
    }}>
      {/* Title & Subtitle */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'var(--primary-blue-light)', color: 'var(--primary-blue)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.625rem' }}>
          <Sparkles size={14} />
          <span>Supabase Enterprise Console ({totalUsers} Registered Users)</span>
        </div>
        <h1 className="gradient-text-hero" style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: '1.2' }}>
          User Management Dashboard
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginTop: '0.375rem', maxWidth: '640px' }}>
          Manage, monitor, and view all registered users from Supabase in one place. Real-time data sync, filtering, role control, and bulk exports.
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
        <button
          onClick={onExportCSV}
          className="btn-secondary"
          title="Export current list to CSV"
        >
          <Download size={15} />
          <span>CSV Export</span>
        </button>

        <button
          onClick={onRefreshClick}
          disabled={isRefreshing}
          className="btn-secondary"
          title="Refetch users from database"
        >
          <RefreshCw size={15} className={isRefreshing ? 'animate-spin' : ''} />
          <span>{isRefreshing ? 'Syncing...' : 'Sync'}</span>
        </button>

        <button
          onClick={onOpenSqlModal}
          className="btn-secondary"
          style={{ borderColor: 'var(--accent-orange-border)', color: 'var(--accent-orange)' }}
        >
          <Database size={15} />
          <span>SQL Setup</span>
        </button>

        <button
          onClick={onAddUserClick}
          className="btn-accent"
        >
          <UserPlus size={17} />
          <span>Add New User</span>
        </button>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  )
}
