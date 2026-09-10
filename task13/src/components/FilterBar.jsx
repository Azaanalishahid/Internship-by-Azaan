import React from 'react'
import { Filter, RotateCcw, LayoutGrid, Table, ArrowUpDown } from 'lucide-react'

export default function FilterBar({
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  countryFilter,
  setCountryFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onResetFilters,
  activeFilterCount,
  availableCountries = []
}) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      padding: '1rem',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-light)',
      borderRadius: '0.875rem',
      boxShadow: 'var(--shadow-xs)',
      marginBottom: '1.25rem'
    }}>
      {/* Left: Dropdown Filter Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-muted)', fontSize: '0.8125rem', fontWeight: 700 }}>
          <Filter size={15} />
          <span>Filters:</span>
        </div>

        {/* Role Select */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{
            padding: '0.45rem 0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-main)',
            color: 'var(--text-main)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Manager">Manager</option>
          <option value="Viewer">Viewer</option>
        </select>

        {/* Status Select */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '0.45rem 0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-main)',
            color: 'var(--text-main)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>

        {/* Country Select */}
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          style={{
            padding: '0.45rem 0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-main)',
            color: 'var(--text-main)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="All">All Countries</option>
          {availableCountries.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Reset Filters Button */}
        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px dashed var(--accent-orange-border)',
              background: 'var(--accent-orange-light)',
              color: 'var(--accent-orange)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={13} />
            <span>Reset ({activeFilterCount})</span>
          </button>
        )}
      </div>

      {/* Right: Sort By & View Mode Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        
        {/* Sort By Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <ArrowUpDown size={14} style={{ color: 'var(--text-muted)' }} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-main)',
              color: 'var(--text-main)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name_asc">Name (A - Z)</option>
            <option value="name_desc">Name (Z - A)</option>
          </select>
        </div>

        {/* View Mode Toggle: Table / Grid */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-main)',
          padding: '3px',
          borderRadius: '0.5rem',
          border: '1px solid var(--border-light)'
        }}>
          <button
            onClick={() => setViewMode('table')}
            title="Table View"
            style={{
              padding: '0.35rem 0.625rem',
              borderRadius: '0.375rem',
              border: 'none',
              background: viewMode === 'table' ? 'var(--bg-card)' : 'transparent',
              color: viewMode === 'table' ? 'var(--primary-blue)' : 'var(--text-muted)',
              boxShadow: viewMode === 'table' ? 'var(--shadow-xs)' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Table size={16} />
          </button>

          <button
            onClick={() => setViewMode('grid')}
            title="Grid Cards View"
            style={{
              padding: '0.35rem 0.625rem',
              borderRadius: '0.375rem',
              border: 'none',
              background: viewMode === 'grid' ? 'var(--bg-card)' : 'transparent',
              color: viewMode === 'grid' ? 'var(--primary-blue)' : 'var(--text-muted)',
              boxShadow: viewMode === 'grid' ? 'var(--shadow-xs)' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
