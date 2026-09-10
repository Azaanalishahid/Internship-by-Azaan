import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalItems
}) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1

  if (totalItems === 0) return null

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
      padding: '0.875rem 1.25rem',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-light)',
      borderRadius: '0.875rem',
      marginTop: '1rem',
      boxShadow: 'var(--shadow-xs)'
    }}>
      {/* Left: Page Size Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
        <span>Show</span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
            setCurrentPage(1)
          }}
          style={{
            padding: '0.3rem 0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-main)',
            color: 'var(--text-main)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
        <span>entries</span>
      </div>

      {/* Center: Showing range */}
      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
        Showing <strong style={{ color: 'var(--text-main)' }}>{Math.min((currentPage - 1) * pageSize + 1, totalItems)}</strong> to <strong style={{ color: 'var(--text-main)' }}>{Math.min(currentPage * pageSize, totalItems)}</strong> of <strong style={{ color: 'var(--text-main)' }}>{totalItems}</strong> users
      </div>

      {/* Right: Page Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          style={{
            padding: '0.35rem 0.625rem',
            borderRadius: '0.375rem',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-main)',
            color: currentPage === 1 ? 'var(--text-light)' : 'var(--text-main)',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNum = idx + 1
          const isActive = pageNum === currentPage
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '0.375rem',
                border: 'none',
                background: isActive ? 'var(--primary-blue)' : 'var(--bg-main)',
                color: isActive ? '#FFFFFF' : 'var(--text-main)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.8125rem',
                cursor: 'pointer'
              }}
            >
              {pageNum}
            </button>
          )
        })}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          style={{
            padding: '0.35rem 0.625rem',
            borderRadius: '0.375rem',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-main)',
            color: currentPage === totalPages ? 'var(--text-light)' : 'var(--text-main)',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
