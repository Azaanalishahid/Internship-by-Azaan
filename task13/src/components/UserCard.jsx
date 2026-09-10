import React from 'react'
import { Eye, Edit3, Trash2, Mail, MapPin, Phone, Calendar, Shield } from 'lucide-react'

export default function UserCard({ user, isSelected, onToggleSelect, onView, onEdit, onDelete }) {
  const formatDate = (isoString) => {
    if (!isoString) return 'N/A'
    try {
      return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(isoString))
    } catch {
      return isoString
    }
  }

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'badge-status badge-active'
      case 'inactive': return 'badge-status badge-inactive'
      case 'pending': return 'badge-status badge-pending'
      default: return 'badge-status badge-active'
    }
  }

  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return 'badge-role badge-role-admin'
      case 'editor': return 'badge-role badge-role-editor'
      case 'manager': return 'badge-role badge-role-manager'
      default: return 'badge-role badge-role-viewer'
    }
  }

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || 'User')}&background=2563EB&color=fff`

  return (
    <div
      className="glass-card animate-fade-in"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        borderColor: isSelected ? 'var(--primary-blue)' : 'var(--border-light)',
        background: isSelected ? 'var(--primary-blue-light)' : 'var(--bg-card)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(user.id)}
            className="custom-checkbox"
          />
          <img
            src={user.profile_image || fallbackAvatar}
            alt={user.full_name}
            onError={(e) => { e.target.src = fallbackAvatar }}
            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-blue)' }}
          />
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{user.full_name}</h3>
            <span className={getRoleBadge(user.role)} style={{ marginTop: '0.25rem' }}>
              <Shield size={11} /> {user.role}
            </span>
          </div>
        </div>

        <span className={getStatusBadge(user.status)}>
          {user.status}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Mail size={14} style={{ color: 'var(--primary-blue)' }} />
          <span style={{ color: 'var(--text-main)' }}>{user.email}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Phone size={14} />
          <span>{user.phone || 'N/A'}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MapPin size={14} style={{ color: 'var(--accent-orange)' }} />
          <span>{user.city}, {user.country}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={14} />
          <span>Joined {formatDate(user.created_at)}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
        <button
          onClick={() => onView(user)}
          style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', background: 'var(--primary-blue-light)', color: 'var(--primary-blue)', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}
        >
          <Eye size={14} /> View
        </button>

        <button
          onClick={() => onEdit(user)}
          style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', background: 'var(--accent-orange-light)', color: 'var(--accent-orange)', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}
        >
          <Edit3 size={14} /> Edit
        </button>

        <button
          onClick={() => onDelete(user.id)}
          style={{ padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', background: '#FEF2F2', color: '#DC2626', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
