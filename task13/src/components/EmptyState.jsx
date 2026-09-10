import React from 'react'
import { UserX, RotateCcw, UserPlus } from 'lucide-react'

export default function EmptyState({ onResetFilters, onAddUser }) {
  return (
    <div className="glass-panel animate-fade-in" style={{
      padding: '4rem 2rem',
      textAlign: 'center',
      borderRadius: '1rem',
      margin: '1.5rem 0',
      background: 'var(--bg-card)'
    }}>
      {/* Centered Illustration Icon */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'var(--primary-blue-light)',
        color: 'var(--primary-blue)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem auto',
        border: '1px solid var(--primary-blue-border)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <UserX size={40} strokeWidth={1.8} />
      </div>

      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
        No Users Found
      </h3>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', maxWidth: '440px', margin: '0 auto 1.75rem auto' }}>
        We couldn't find any registered users matching your search criteria or active filters. Try clearing your filters or adding a new record.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button onClick={onResetFilters} className="btn-secondary">
          <RotateCcw size={16} /> Reset Filters
        </button>

        <button onClick={onAddUser} className="btn-accent">
          <UserPlus size={16} /> Create User
        </button>
      </div>
    </div>
  )
}
