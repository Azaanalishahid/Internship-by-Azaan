import React from 'react'
import FlipStatCard from '../components/FlipStatCard'
import {
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity,
  Shield,
  Clock,
  Database,
  UserPlus,
  CheckCircle2
} from 'lucide-react'

export default function DashboardOverview({
  users = [],
  onNavigateToUsers,
  onAddUser,
  onOpenSqlModal,
  onViewUser
}) {
  const total = users.length
  const active = users.filter(u => u.status === 'Active').length
  const inactive = users.filter(u => u.status === 'Inactive').length
  const admins = users.filter(u => u.role === 'Admin').length

  const stats = [
    {
      id: 'total',
      filterType: 'reset',
      title: 'Total Registered Users',
      value: total,
      icon: Users,
      trend: '+12.5%',
      trendUp: true,
      trendText: 'this month',
      description: 'Total user accounts registered across Supabase tables.',
      gradient: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)'
    },
    {
      id: 'active',
      filterType: 'Active',
      title: 'Active Accounts',
      value: active,
      icon: UserCheck,
      trend: '+8.2%',
      trendUp: true,
      trendText: 'online now',
      description: 'Verified users with active login permissions.',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    },
    {
      id: 'inactive',
      filterType: 'Inactive',
      title: 'Inactive & Flagged',
      value: inactive,
      icon: UserX,
      trend: '-2.1%',
      trendUp: false,
      trendText: 'pending review',
      description: 'Disabled accounts awaiting security validation.',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
    },
    {
      id: 'admins',
      filterType: 'Admin',
      title: 'Super Admin Roles',
      value: admins,
      icon: ShieldCheck,
      trend: '+1 new',
      trendUp: true,
      trendText: 'elevated access',
      description: 'Users granted full administrator rights.',
      gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)'
    }
  ]

  const recentUsers = users.slice(0, 5)

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Hero Banner with Overlapping Glass Elements */}
      <div className="overlap-container">
        <div className="glass-card" style={{
          padding: '2.5rem 2rem',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #EFF6FF 50%, #FFF7ED 100%)',
          borderRadius: '1.5rem',
          border: '1px solid var(--primary-blue-border)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Ambient Glow Graphic */}
          <div style={{
            position: 'absolute',
            right: '-50px',
            top: '-50px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ maxWidth: '720px', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.85rem', borderRadius: '999px', background: 'var(--primary-blue-light)', color: 'var(--primary-blue)', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1rem', border: '1px solid var(--primary-blue-border)' }}>
              <Sparkles size={14} />
              <span>Supabase Command Center</span>
            </div>

            <h1 className="gradient-text-hero" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: '1.15', marginBottom: '0.75rem' }}>
              Welcome back, Alex 👋
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
              Here is your executive overview. You currently have <strong>{total} registered users</strong> synced with your Supabase database instance.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flexWrap: 'wrap' }}>
              <button onClick={onNavigateToUsers} className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9375rem' }}>
                <span>Manage Users Table</span>
                <ArrowRight size={18} />
              </button>

              <button onClick={onAddUser} className="btn-accent" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9375rem' }}>
                <UserPlus size={18} />
                <span>Add New User</span>
              </button>

              <button onClick={onOpenSqlModal} className="btn-secondary" style={{ padding: '0.75rem 1.25rem', fontSize: '0.9375rem' }}>
                <Database size={17} />
                <span>SQL Setup</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Overlapping Status Pill Card */}
        <div className="overlap-floating-badge glass-card" style={{
          top: '20px',
          right: '30px',
          padding: '0.875rem 1.25rem',
          borderRadius: '1rem',
          border: '1px solid var(--status-active-border)',
          background: 'rgba(255, 255, 255, 0.95)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', display: 'block' }}>Supabase Engine</span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--status-active-text)', fontWeight: 600 }}>99.9% Uptime • 14ms</span>
          </div>
        </div>
      </div>

      {/* 3D Flip Stat Cards Grid */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Interactive Key Metrics
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hover or click cards to flip for detail breakdown</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
          {stats.map(card => (
            <FlipStatCard
              key={card.id}
              card={card}
              onQuickFilter={() => onNavigateToUsers && onNavigateToUsers(card.filterType)}
            />
          ))}
        </div>
      </div>

      {/* Grid Section: Visual Chart & Recent User Activity Stream */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        
        {/* Recent Registered Users Carousel/Grid */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} style={{ color: 'var(--primary-blue)' }} /> Recent User Registrations
            </h3>
            <button onClick={onNavigateToUsers} style={{ border: 'none', background: 'none', color: 'var(--primary-blue)', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer' }}>
              View All →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {recentUsers.map(user => (
              <div
                key={user.id}
                onClick={() => onViewUser(user)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={user.profile_image}
                    alt={user.full_name}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-blue)' }}
                  />
                  <div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>{user.full_name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</span>
                  </div>
                </div>

                <span className={`badge-status badge-${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live System Activity Feed */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} style={{ color: 'var(--accent-orange)' }} /> Live Audit Stream
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Realtime Sync</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { text: 'Sophia Martinez updated profile image & phone', time: '10 mins ago', type: 'User' },
              { text: 'Aisha Patel assigned Admin security role', time: '1 hour ago', type: 'Security' },
              { text: 'Supabase Row Level Security policy verified', time: '3 hours ago', type: 'System' },
              { text: 'Database backup seed exported to CSV', time: '5 hours ago', type: 'Export' }
            ].map((act, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.8125rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-orange)', marginTop: '6px', flexShrink: 0 }} />
                <div>
                  <p style={{ color: 'var(--text-main)', fontWeight: 600, margin: 0 }}>{act.text}</p>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
