import React from 'react'
import { FileText, Download, ShieldAlert, CheckCircle2, Clock } from 'lucide-react'
import { exportToCSV, exportToJSON } from '../utils/exportUtils'

export default function ReportsPage({ users = [] }) {
  const handleExportAllCSV = () => {
    exportToCSV(users, `userhub_full_report_${Date.now()}.csv`)
  }

  const handleExportAllJSON = () => {
    exportToJSON(users, `userhub_full_report_${Date.now()}.json`)
  }

  const reportItems = [
    { title: 'User Access Audit Log', desc: 'Complete breakdown of all registered users, roles, and status flags', count: users.length, type: 'Security' },
    { title: 'Active Accounts Summary', desc: 'List of all users currently marked Active', count: users.filter(u => u.status === 'Active').length, type: 'Compliance' },
    { title: 'Pending Approval Queue', desc: 'Users requiring admin review before granting privileges', count: users.filter(u => u.status === 'Pending').length, type: 'Action Required' }
  ]

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-orange)', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            <FileText size={18} />
            <span>Audit & Operational Reports</span>
          </div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-main)' }}>
            System Reports & Export Hub
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Generate and download enterprise compliance reports in CSV and JSON formats.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={handleExportAllCSV} className="btn-accent">
            <Download size={16} /> Export All (CSV)
          </button>
          <button onClick={handleExportAllJSON} className="btn-secondary">
            <Download size={16} /> Export All (JSON)
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {reportItems.map((r, i) => (
          <div key={i} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: 'var(--primary-blue-light)', color: 'var(--primary-blue)' }}>
                  {r.type}
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{r.count} items</span>
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.375rem' }}>{r.title}</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{r.desc}</p>
            </div>

            <button
              onClick={handleExportAllCSV}
              style={{
                width: '100%',
                padding: '0.625rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-main)',
                color: 'var(--primary-blue)',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Download size={14} /> Download Report
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
