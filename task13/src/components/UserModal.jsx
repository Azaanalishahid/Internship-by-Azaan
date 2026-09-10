import React, { useState, useEffect } from 'react'
import { X, Mail, Phone, MapPin, Calendar, Shield, User, Copy, Check, Activity, Code, Lock } from 'lucide-react'
import { generateUserLogs } from '../services/supabase'

export default function UserModal({
  isOpen,
  onClose,
  mode = 'view', // 'view' | 'edit' | 'add'
  user = null,
  onSave
}) {
  if (!isOpen) return null

  const isView = mode === 'view'
  const isEdit = mode === 'edit'
  const isAdd = mode === 'add'

  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'activity' | 'security' | 'json'
  const [copiedJson, setCopiedJson] = useState(false)

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    gender: 'Male',
    city: '',
    country: '',
    role: 'Viewer',
    status: 'Active',
    profile_image: ''
  })

  useEffect(() => {
    setActiveTab('overview')
    if (user && (isView || isEdit)) {
      setFormData({
        id: user.id,
        full_name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || 'Male',
        city: user.city || '',
        country: user.country || '',
        role: user.role || 'Viewer',
        status: user.status || 'Active',
        profile_image: user.profile_image || '',
        created_at: user.created_at
      })
    } else if (isAdd) {
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        gender: 'Male',
        city: 'San Francisco',
        country: 'United States',
        role: 'Viewer',
        status: 'Active',
        profile_image: ''
      })
    }
  }, [user, mode])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A'
    try {
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'short'
      }).format(new Date(isoString))
    } catch {
      return isoString
    }
  }

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.full_name || 'User')}&background=2563EB&color=fff`

  const logs = isView && user ? generateUserLogs(user) : []

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(user, null, 2))
    setCopiedJson(true)
    setTimeout(() => setCopiedJson(false), 2000)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '620px',
          padding: '2rem',
          background: 'var(--bg-card)',
          borderRadius: '1.25rem',
          boxShadow: 'var(--shadow-xl)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {isView && 'User Details Profile'}
              {isEdit && 'Edit User Information'}
              {isAdd && 'Create New Supabase User'}
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {isView ? `Viewing database record for ID: ${user?.id}` : 'Fill in user information below'}
            </p>
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

        {/* View Mode Tab Switcher */}
        {isView && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', padding: '3px', background: 'var(--bg-main)', borderRadius: '0.5rem', border: '1px solid var(--border-light)' }}>
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'activity', label: 'Activity Logs', icon: Activity },
              { id: 'security', label: 'Permissions', icon: Lock },
              { id: 'json', label: 'Raw JSON', icon: Code }
            ].map(t => {
              const Icon = t.icon
              const isActive = activeTab === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.375rem',
                    padding: '0.45rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    background: isActive ? 'var(--bg-card)' : 'transparent',
                    color: isActive ? 'var(--primary-blue)' : 'var(--text-muted)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.78125rem',
                    cursor: 'pointer',
                    boxShadow: isActive ? 'var(--shadow-xs)' : 'none'
                  }}
                >
                  <Icon size={14} />
                  <span>{t.label}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* View Mode Content */}
        {isView && user && (
          <>
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Profile Card Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.25rem',
                  borderRadius: '1rem',
                  background: 'linear-gradient(135deg, var(--primary-blue-light) 0%, var(--accent-orange-light) 100%)',
                  border: '1px solid var(--primary-blue-border)'
                }}>
                  <img
                    src={formData.profile_image || fallbackAvatar}
                    alt={formData.full_name}
                    onError={(e) => { e.target.src = fallbackAvatar }}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #FFFFFF',
                      boxShadow: 'var(--shadow-md)'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {formData.full_name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.375rem' }}>
                      <span className={`badge-role badge-role-${formData.role.toLowerCase()}`}>
                        {formData.role}
                      </span>
                      <span className={`badge-status badge-${formData.status.toLowerCase()}`}>
                        {formData.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ padding: '0.875rem', borderRadius: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Mail size={13} /> Email Address
                    </span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginTop: '0.25rem' }}>
                      {formData.email}
                    </span>
                  </div>

                  <div style={{ padding: '0.875rem', borderRadius: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Phone size={13} /> Phone Number
                    </span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginTop: '0.25rem' }}>
                      {formData.phone || 'Not Provided'}
                    </span>
                  </div>

                  <div style={{ padding: '0.875rem', borderRadius: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <User size={13} /> Gender
                    </span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginTop: '0.25rem' }}>
                      {formData.gender}
                    </span>
                  </div>

                  <div style={{ padding: '0.875rem', borderRadius: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={13} /> Location / Address
                    </span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginTop: '0.25rem' }}>
                      {formData.city}, {formData.country}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '0.875rem', borderRadius: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={13} /> Supabase Registration Timestamp
                  </span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginTop: '0.25rem' }}>
                    {formatDate(formData.created_at)}
                  </span>
                </div>
              </div>
            )}

            {/* Activity Logs Tab */}
            {activeTab === 'activity' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {logs.map(log => (
                  <div key={log.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', fontSize: '0.8125rem' }}>
                    <div>
                      <span style={{ fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>{log.action}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>IP: {log.ip} • {formatDate(log.timestamp)}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--status-active-text)' }}>{log.status}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Security Permissions Tab */}
            {activeTab === 'security' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
                <div style={{ padding: '1rem', borderRadius: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Role Level Security Policy</h4>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Granted role: <strong>{formData.role}</strong>. RLS policy checks `auth.uid() = user_id` for table operations.</p>
                </div>
              </div>
            )}

            {/* JSON Schema Tab */}
            {activeTab === 'json' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                  <button onClick={handleCopyJson} className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                    {copiedJson ? <Check size={13} /> : <Copy size={13} />} {copiedJson ? 'Copied' : 'Copy JSON'}
                  </button>
                </div>
                <pre style={{ background: '#0F172A', color: '#38BDF8', padding: '1rem', borderRadius: '0.75rem', fontSize: '0.78125rem', overflowX: 'auto', maxHeight: '220px' }}>
                  <code>{JSON.stringify(user, null, 2)}</code>
                </pre>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button className="btn-secondary" onClick={onClose}>Close Profile</button>
            </div>
          </>
        )}

        {/* Add / Edit Form Mode */}
        {(isEdit || isAdd) && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.375rem' }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="e.g. Sarah Jenkins"
                style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.375rem' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.375rem' }}>
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.375rem' }}>
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.375rem' }}>
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="New York"
                  style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.375rem' }}>
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="United States"
                  style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.375rem' }}>
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Manager">Manager</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.375rem' }}>
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.375rem' }}>
                Profile Photo Image URL
              </label>
              <input
                type="url"
                value={formData.profile_image}
                onChange={(e) => setFormData({ ...formData, profile_image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-primary">
                {isEdit ? 'Save Changes' : 'Create User'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
