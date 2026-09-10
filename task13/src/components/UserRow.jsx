import React, { useState } from 'react'
import { Eye, Edit3, Trash2, Mail, MapPin, Phone, Calendar, Copy, Check } from 'lucide-react'

export default function UserRow({
  user,
  isSelected,
  onToggleSelect,
  onView,
  onEdit,
  onDelete
}) {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A'
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(new Date(isoString))
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

  const handleCopyEmail = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(user.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || 'User')}&background=2563EB&color=fff`

  return (
    <tr className={isSelected ? 'row-selected' : ''}>
      {/* Selection Checkbox */}
      <td style={{ width: '40px', paddingLeft: '1.25rem' }}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(user.id)}
          className="custom-checkbox"
        />
      </td>

      {/* Profile Photo & Name */}
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <img
            src={user.profile_image || fallbackAvatar}
            alt={user.full_name}
            onError={(e) => { e.target.src = fallbackAvatar }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--border-light)',
              flexShrink: 0
            }}
          />
          <div>
            <span style={{ fontWeight: 700, color: 'var(--text-main)', display: 'block', fontSize: '0.875rem' }}>
              {user.full_name}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              ID: {user.id}
            </span>
          </div>
        </div>
      </td>

      {/* Email */}
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.8125rem' }}>
          <Mail size={14} style={{ color: 'var(--primary-blue)', flexShrink: 0 }} />
          <span>{user.email}</span>
          <button
            onClick={handleCopyEmail}
            title="Copy Email"
            style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
          >
            {copiedEmail ? <Check size={12} style={{ color: 'var(--status-active-text)' }} /> : <Copy size={12} />}
          </button>
        </div>
      </td>

      {/* Phone */}
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
          <Phone size={13} style={{ flexShrink: 0 }} />
          <span>{user.phone || 'N/A'}</span>
        </div>
      </td>

      {/* Gender */}
      <td>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          {user.gender || 'Not Specified'}
        </span>
      </td>

      {/* Location */}
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--text-main)' }}>
          <MapPin size={14} style={{ color: 'var(--accent-orange)', flexShrink: 0 }} />
          <span>{user.city}, {user.country}</span>
        </div>
      </td>

      {/* Role */}
      <td>
        <span className={getRoleBadge(user.role)}>
          {user.role}
        </span>
      </td>

      {/* Status */}
      <td>
        <span className={getStatusBadge(user.status)}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
          {user.status}
        </span>
      </td>

      {/* Registration Date */}
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          <Calendar size={13} />
          <span>{formatDate(user.created_at)}</span>
        </div>
      </td>

      {/* Actions */}
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', justifyContent: 'flex-end' }}>
          <button
            onClick={() => onView(user)}
            className="has-tooltip"
            data-tooltip="View Details"
            style={{
              padding: '0.45rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-main)',
              color: 'var(--primary-blue)',
              cursor: 'pointer'
            }}
          >
            <Eye size={15} />
          </button>

          <button
            onClick={() => onEdit(user)}
            className="has-tooltip"
            data-tooltip="Edit User"
            style={{
              padding: '0.45rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-main)',
              color: 'var(--accent-orange)',
              cursor: 'pointer'
            }}
          >
            <Edit3 size={15} />
          </button>

          <button
            onClick={() => onDelete(user.id)}
            className="has-tooltip"
            data-tooltip="Delete User"
            style={{
              padding: '0.45rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-main)',
              color: '#DC2626',
              cursor: 'pointer'
            }}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  )
}
