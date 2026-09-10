import React from 'react'
import { AlertTriangle, RefreshCw, Database, Terminal } from 'lucide-react'

export default function ErrorCard({ error, onRetry, onOpenSqlModal }) {
  return (
    <div className="glass-panel animate-fade-in" style={{
      padding: '2.5rem 2rem',
      textAlign: 'center',
      maxWidth: '640px',
      margin: '2rem auto',
      borderColor: 'var(--status-inactive-border)',
      background: 'var(--bg-card)'
    }}>
      {/* Warning Icon Badge */}
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'var(--status-inactive-bg)',
        color: 'var(--status-inactive-text)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.25rem auto',
        border: '1px solid var(--status-inactive-border)'
      }}>
        <AlertTriangle size={32} />
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
        Supabase Database Connection Alert
      </h3>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
        We encountered an issue attempting to fetch user records from your Supabase instance.
      </p>

      {error && (
        <div style={{
          background: 'var(--bg-main)',
          padding: '0.875rem 1rem',
          borderRadius: '0.625rem',
          fontSize: '0.8125rem',
          fontFamily: 'monospace',
          color: '#DC2626',
          border: '1px solid var(--border-light)',
          marginBottom: '1.5rem',
          textAlign: 'left',
          overflowX: 'auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            <Terminal size={14} /> Error Output:
          </div>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button onClick={onRetry} className="btn-primary">
          <RefreshCw size={16} /> Retry Connection
        </button>

        <button onClick={onOpenSqlModal} className="btn-secondary">
          <Database size={16} /> View SQL Schema Guide
        </button>
      </div>
    </div>
  )
}
