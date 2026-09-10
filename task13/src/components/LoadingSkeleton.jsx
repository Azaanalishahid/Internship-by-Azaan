import React from 'react'

export default function LoadingSkeleton({ rowCount = 6 }) {
  return (
    <div className="custom-table-container" style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Table Header Skeleton */}
        <div style={{ display: 'flex', gap: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
          <div className="skeleton" style={{ width: '140px', height: '18px' }} />
          <div className="skeleton" style={{ width: '180px', height: '18px' }} />
          <div className="skeleton" style={{ width: '120px', height: '18px' }} />
          <div className="skeleton" style={{ width: '100px', height: '18px' }} />
          <div className="skeleton" style={{ width: '80px', height: '18px' }} />
          <div className="skeleton" style={{ width: '80px', height: '18px' }} />
        </div>

        {/* Row Skeletons */}
        {Array.from({ length: rowCount }).map((_, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '0.875rem 0',
              borderBottom: idx === rowCount - 1 ? 'none' : '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
              <div>
                <div className="skeleton" style={{ width: '130px', height: '14px', marginBottom: '6px' }} />
                <div className="skeleton" style={{ width: '80px', height: '12px' }} />
              </div>
            </div>

            <div className="skeleton" style={{ width: '160px', height: '14px' }} />
            <div className="skeleton" style={{ width: '110px', height: '14px' }} />
            <div className="skeleton" style={{ width: '90px', height: '14px' }} />
            <div className="skeleton" style={{ width: '70px', height: '22px', borderRadius: '999px' }} />
            <div className="skeleton" style={{ width: '70px', height: '22px', borderRadius: '999px' }} />

            <div style={{ display: 'flex', gap: '0.375rem' }}>
              <div className="skeleton" style={{ width: '32px', height: '32px', borderRadius: '0.5rem' }} />
              <div className="skeleton" style={{ width: '32px', height: '32px', borderRadius: '0.5rem' }} />
              <div className="skeleton" style={{ width: '32px', height: '32px', borderRadius: '0.5rem' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
