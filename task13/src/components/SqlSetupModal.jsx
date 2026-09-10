import React, { useState } from 'react'
import { X, Copy, Check, Database, Sparkles, ExternalLink } from 'lucide-react'
import { SUPABASE_SQL_SCRIPT, isSupabaseConfigured } from '../services/supabase'

export default function SqlSetupModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCRIPT)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          padding: '2rem',
          background: 'var(--bg-card)',
          borderRadius: '1.25rem',
          boxShadow: 'var(--shadow-xl)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '0.625rem',
              background: 'var(--primary-blue-light)',
              color: 'var(--primary-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Database size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Supabase Database Setup Guide
              </h2>
              <span style={{ fontSize: '0.75rem', color: isSupabaseConfigured ? 'var(--status-active-text)' : 'var(--accent-orange)' }}>
                Status: {isSupabaseConfigured ? 'Connected to Custom Supabase Instance' : 'Running in Interactive Demo Mode'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-main)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Instructions */}
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>
          To connect your own Supabase database, copy the SQL below and paste it directly into your <strong>Supabase Dashboard SQL Editor</strong>. This will create the <code style={{ background: 'var(--bg-main)', padding: '2px 6px', borderRadius: '4px', color: 'var(--primary-blue)' }}>users</code> table, enable Row Level Security, and seed sample user records.
        </p>

        {/* SQL Code Block with Copy Button */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#0F172A',
            color: '#94A3B8',
            padding: '0.625rem 1rem',
            borderTopLeftRadius: '0.75rem',
            borderTopRightRadius: '0.75rem',
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            <span>supabase_users_seed.sql</span>
            <button
              onClick={handleCopy}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                background: copied ? '#10B981' : 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy SQL'}</span>
            </button>
          </div>

          <pre style={{
            background: '#1E293B',
            color: '#E2E8F0',
            padding: '1rem',
            borderBottomLeftRadius: '0.75rem',
            borderBottomRightRadius: '0.75rem',
            fontSize: '0.78125rem',
            fontFamily: 'Consolas, Monaco, monospace',
            overflowX: 'auto',
            maxHeight: '260px',
            margin: 0
          }}>
            <code>{SUPABASE_SQL_SCRIPT}</code>
          </pre>
        </div>

        {/* Environment variable helper */}
        <div style={{
          padding: '1rem',
          borderRadius: '0.75rem',
          background: 'var(--primary-blue-light)',
          border: '1px solid var(--primary-blue-border)',
          fontSize: '0.8125rem',
          color: 'var(--text-main)',
          marginBottom: '1.25rem'
        }}>
          <div style={{ fontWeight: 700, color: 'var(--primary-blue)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Sparkles size={15} /> Environment Variables (.env)
          </div>
          Create a <code>.env</code> file in your project root with:
          <div style={{ background: 'var(--bg-card)', padding: '0.5rem', borderRadius: '0.375rem', marginTop: '0.5rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>
            VITE_SUPABASE_URL=https://your-project.supabase.co<br/>
            VITE_SUPABASE_ANON_KEY=your-anon-key-here
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <span>Open Supabase Dashboard</span>
            <ExternalLink size={14} />
          </a>
          <button className="btn-primary" onClick={onClose}>Got It</button>
        </div>
      </div>
    </div>
  )
}
