import React from 'react'
import { Settings, Database, Sliders, Moon, Sun, CheckCircle2, AlertCircle } from 'lucide-react'
import { isSupabaseConfigured } from '../services/supabase'

export default function SettingsPage({
  density,
  setDensity,
  theme,
  toggleTheme,
  onOpenSqlModal
}) {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-blue)', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          <Settings size={18} />
          <span>Dashboard Preferences</span>
        </div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Settings & Configuration
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Customize your display settings, density, and database connection.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Table Density Settings */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sliders size={18} style={{ color: 'var(--primary-blue)' }} /> Table Layout Density
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Adjust the vertical padding of table cells to fit more users on screen.
          </p>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setDensity('comfortable')}
              style={{
                flex: 1,
                padding: '0.875rem',
                borderRadius: '0.625rem',
                border: density === 'comfortable' ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                background: density === 'comfortable' ? 'var(--primary-blue-light)' : 'var(--bg-main)',
                color: density === 'comfortable' ? 'var(--primary-blue)' : 'var(--text-main)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Comfortable (Default)
            </button>

            <button
              onClick={() => setDensity('compact')}
              style={{
                flex: 1,
                padding: '0.875rem',
                borderRadius: '0.625rem',
                border: density === 'compact' ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                background: density === 'compact' ? 'var(--primary-blue-light)' : 'var(--bg-main)',
                color: density === 'compact' ? 'var(--primary-blue)' : 'var(--text-main)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Compact (Dense)
            </button>
          </div>
        </div>

        {/* Database Status Card */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={18} style={{ color: 'var(--accent-orange)' }} /> Supabase Integration
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Connection status for your Supabase backend database.
          </p>

          <div style={{
            padding: '1rem',
            borderRadius: '0.625rem',
            background: isSupabaseConfigured ? 'var(--status-active-bg)' : 'var(--accent-orange-light)',
            border: isSupabaseConfigured ? '1px solid var(--status-active-border)' : '1px solid var(--accent-orange-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              {isSupabaseConfigured ? <CheckCircle2 size={20} style={{ color: 'var(--status-active-text)' }} /> : <AlertCircle size={20} style={{ color: 'var(--accent-orange)' }} />}
              <div>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>
                  {isSupabaseConfigured ? 'Supabase Connected' : 'Demo Dataset Mode'}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {isSupabaseConfigured ? 'Querying live Supabase users table' : 'Using in-memory seed users'}
                </span>
              </div>
            </div>
          </div>

          <button onClick={onOpenSqlModal} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
            Open SQL Setup & Credentials Guide
          </button>
        </div>

      </div>
    </div>
  )
}
