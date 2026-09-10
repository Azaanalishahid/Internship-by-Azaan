import React from 'react'
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react'

export default function Footer({ onOpenSqlModal }) {
  return (
    <footer style={{
      marginTop: 'auto',
      borderTop: '1px solid var(--border-light)',
      background: 'var(--bg-card)',
      padding: '2rem 1.5rem 1.5rem 1.5rem',
      color: 'var(--text-muted)'
    }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        
        {/* Brand & Copyright */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>
            User<span style={{ color: 'var(--primary-blue)' }}>Hub</span>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, padding: '2px 6px', borderRadius: '999px', background: 'var(--primary-blue-light)', color: 'var(--primary-blue)' }}>
              v2.4 Enterprise
            </span>
          </div>
          <p style={{ fontSize: '0.8125rem', marginTop: '0.375rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} UserHub Inc. Built with React & Supabase. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', flexWrap: 'wrap' }}>
          <button
            onClick={onOpenSqlModal}
            style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 500, transition: 'color 0.15s' }}
            onMouseEnter={(e) => e.target.style.color = 'var(--primary-blue)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            Documentation
          </button>

          <a
            href="https://supabase.com/docs"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            onMouseEnter={(e) => e.target.style.color = 'var(--primary-blue)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            Supabase Docs <ExternalLink size={12} />
          </a>

          <a
            href="#privacy"
            style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}
          >
            Privacy Policy
          </a>

          <a
            href="#terms"
            style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}
          >
            Terms of Service
          </a>
        </div>

        {/* Operational Status Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.375rem 0.75rem',
          borderRadius: '9999px',
          background: 'var(--status-active-bg)',
          border: '1px solid var(--status-active-border)',
          color: 'var(--status-active-text)',
          fontSize: '0.75rem',
          fontWeight: 600
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
          <span>All Systems Operational</span>
        </div>

      </div>
    </footer>
  )
}
