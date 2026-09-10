import React from 'react'
import { Users, UserCheck, UserX, ShieldCheck, TrendingUp, TrendingDown } from 'lucide-react'

export default function StatsCards({ users = [], isLoading = false, onStatCardClick, activeFilter }) {
  const total = users.length
  const active = users.filter(u => u.status === 'Active').length
  const inactive = users.filter(u => u.status === 'Inactive').length
  const admins = users.filter(u => u.role === 'Admin').length

  const stats = [
    {
      id: 'total',
      filterType: 'reset',
      title: 'Total Users',
      value: total,
      icon: Users,
      trend: '+12.5%',
      trendUp: true,
      trendText: 'vs last month',
      gradient: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
      bgLight: 'rgba(37, 99, 235, 0.08)'
    },
    {
      id: 'active',
      filterType: 'Active',
      title: 'Active Users',
      value: active,
      icon: UserCheck,
      trend: '+8.2%',
      trendUp: true,
      trendText: 'online & active',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      bgLight: 'rgba(16, 185, 129, 0.08)'
    },
    {
      id: 'inactive',
      filterType: 'Inactive',
      title: 'Inactive Users',
      value: inactive,
      icon: UserX,
      trend: '-2.1%',
      trendUp: false,
      trendText: 'pending review',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      bgLight: 'rgba(239, 68, 68, 0.08)'
    },
    {
      id: 'admins',
      filterType: 'Admin',
      title: 'Admin Users',
      value: admins,
      icon: ShieldCheck,
      trend: '+1 new',
      trendUp: true,
      trendText: 'full access privileges',
      gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
      bgLight: 'rgba(249, 115, 22, 0.08)'
    }
  ]

  if (isLoading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="glass-card" style={{ padding: '1.5rem', height: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="skeleton" style={{ width: '100px', height: '16px' }} />
              <div className="skeleton" style={{ width: '42px', height: '42px', borderRadius: '0.75rem' }} />
            </div>
            <div className="skeleton" style={{ width: '60px', height: '32px' }} />
            <div className="skeleton" style={{ width: '120px', height: '14px' }} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1.25rem',
      marginBottom: '1.75rem'
    }}>
      {stats.map(card => {
        const Icon = card.icon
        const isSelected = activeFilter === card.filterType
        return (
          <div
            key={card.id}
            onClick={() => onStatCardClick && onStatCardClick(card.filterType)}
            className="glass-card"
            title={`Click to filter by ${card.title}`}
            style={{
              padding: '1.375rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              borderColor: isSelected ? 'var(--primary-blue)' : 'var(--border-light)',
              boxShadow: isSelected ? '0 8px 24px rgba(37, 99, 235, 0.2)' : 'var(--shadow-sm)',
              transform: isSelected ? 'scale(1.02)' : 'none'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: card.bgLight,
              filter: 'blur(20px)',
              pointerEvents: 'none'
            }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {card.title}
              </span>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '0.75rem',
                background: card.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: `0 4px 12px ${card.bgLight}`
              }}>
                <Icon size={22} strokeWidth={2} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
                {card.value.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>users</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.125rem',
                fontWeight: 700,
                color: card.trendUp ? 'var(--status-active-text)' : 'var(--status-inactive-text)'
              }}>
                {card.trendUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                <span>{card.trend}</span>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>{card.trendText}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
