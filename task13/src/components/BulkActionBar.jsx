import React from 'react'
import { Trash2, CheckCircle2, XCircle, Download, X, Layers } from 'lucide-react'

export default function BulkActionBar({
  selectedIds = [],
  onClearSelection,
  onBulkDelete,
  onBulkStatusChange,
  onExportSelected
}) {
  if (!selectedIds.length) return null

  return (
    <div className="glass-panel animate-slide-up" style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 90,
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      padding: '0.75rem 1.5rem',
      background: 'var(--text-main)',
      color: '#FFFFFF',
      borderRadius: '9999px',
      boxShadow: 'var(--shadow-xl)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      {/* Selected Counter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 700 }}>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'var(--primary-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem'
        }}>
          {selectedIds.length}
        </div>
        <span>Selected</span>
      </div>

      <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }} />

      {/* Bulk Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={() => onBulkStatusChange('Active')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.4rem 0.75rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: 'rgba(16, 185, 129, 0.2)',
            color: '#34D399',
            fontSize: '0.8125rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <CheckCircle2 size={14} /> Active
        </button>

        <button
          onClick={() => onBulkStatusChange('Inactive')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.4rem 0.75rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: 'rgba(239, 68, 68, 0.2)',
            color: '#F87171',
            fontSize: '0.8125rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <XCircle size={14} /> Inactive
        </button>

        <button
          onClick={onExportSelected}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.4rem 0.75rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: 'rgba(255, 255, 255, 0.15)',
            color: '#FFFFFF',
            fontSize: '0.8125rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <Download size={14} /> Export CSV
        </button>

        <button
          onClick={onBulkDelete}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.4rem 0.75rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: '#DC2626',
            color: '#FFFFFF',
            fontSize: '0.8125rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>

      <button
        onClick={onClearSelection}
        title="Deselect All"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.6)',
          cursor: 'pointer',
          padding: '2px',
          marginLeft: '0.5rem'
        }}
      >
        <X size={16} />
      </button>
    </div>
  )
}
