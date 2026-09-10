import React from 'react'
import { BarChart3, TrendingUp, Users, Shield, PieChart, Globe } from 'lucide-react'

export default function AnalyticsPage({ users = [] }) {
  const total = users.length || 1
  const active = users.filter(u => u.status === 'Active').length
  const inactive = users.filter(u => u.status === 'Inactive').length
  const pending = users.filter(u => u.status === 'Pending').length

  const rolesCount = {
    Admin: users.filter(u => u.role === 'Admin').length,
    Editor: users.filter(u => u.role === 'Editor').length,
    Manager: users.filter(u => u.role === 'Manager').length,
    Viewer: users.filter(u => u.role === 'Viewer').length
  }

  const genderCount = {
    Female: users.filter(u => u.gender === 'Female').length,
    Male: users.filter(u => u.gender === 'Male').length,
    Other: users.filter(u => u.gender !== 'Female' && u.gender !== 'Male').length
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner */}
      <div className="glass-card" style={{ padding: '1.75rem', background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--primary-blue-light) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary-blue)', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.375rem' }}>
          <BarChart3 size={18} />
          <span>Real-time Supabase Telemetry</span>
        </div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-main)' }}>
          User Analytics & Insights
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Visual representation of user growth, role hierarchy, status distribution, and demographic data.
        </p>
      </div>

      {/* Grid Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Role Distribution Chart Card */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={18} style={{ color: 'var(--primary-blue)' }} /> Role Breakdown
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{total} Total Users</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {Object.entries(rolesCount).map(([role, count]) => {
              const pct = Math.round((count / total) * 100)
              const colorMap = { Admin: 'var(--accent-orange)', Editor: 'var(--primary-blue)', Manager: '#9333EA', Viewer: '#64748B' }
              return (
                <div key={role}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                    <span>{role}</span>
                    <span>{count} ({pct}%)</span>
                  </div>
                  <div style={{ height: '8px', width: '100%', borderRadius: '999px', background: 'var(--border-subtle)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: colorMap[role], transition: 'width 0.6s ease-out' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Status Breakdown SVG Donut Visual */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PieChart size={18} style={{ color: 'var(--status-active-text)' }} /> Status Ratio
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--status-active-text)', fontWeight: 600 }}>Active High</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="var(--border-subtle)" strokeWidth="3.8"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="#10B981" strokeWidth="3.8"
                  strokeDasharray={`${(active / total) * 100}, 100`}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{Math.round((active / total) * 100)}%</span>
                <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>Active</span>
              </div>
            </div>

            {/* Status Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1, fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} /> Active
                </span>
                <strong style={{ color: 'var(--text-main)' }}>{active}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} /> Inactive
                </span>
                <strong style={{ color: 'var(--text-main)' }}>{inactive}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} /> Pending
                </span>
                <strong style={{ color: 'var(--text-main)' }}>{pending}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} style={{ color: 'var(--accent-orange)' }} /> Gender Breakdown
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Demographics</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {Object.entries(genderCount).map(([gender, count]) => {
              const pct = Math.round((count / total) * 100)
              return (
                <div key={gender}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                    <span>{gender}</span>
                    <span>{count} ({pct}%)</span>
                  </div>
                  <div style={{ height: '8px', width: '100%', borderRadius: '999px', background: 'var(--border-subtle)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: gender === 'Female' ? '#EC4899' : gender === 'Male' ? '#3B82F6' : '#8B5CF6' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
