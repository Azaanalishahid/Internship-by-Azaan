import React, { useEffect, useRef } from 'react'
import { Search, X, SlidersHorizontal } from 'lucide-react'

export default function SearchBar({ searchQuery, setSearchQuery, resultCount, totalCount }) {
  const inputRef = useRef(null)

  // Keyboard shortcut listener (Ctrl+K or / to focus search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: '0.75rem',
        padding: '0.5rem 0.875rem',
        boxShadow: 'var(--shadow-xs)',
        transition: 'all var(--transition-fast)'
      }}>
        <Search size={18} style={{ color: 'var(--text-muted)', marginRight: '0.625rem', flexShrink: 0 }} />
        
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users by Name, Email, Role, or City..."
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--text-main)',
            fontSize: '0.875rem',
            fontFamily: 'inherit'
          }}
        />

        {searchQuery ? (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              border: 'none',
              background: 'var(--border-subtle)',
              color: 'var(--text-muted)',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginLeft: '0.5rem'
            }}
          >
            <X size={12} />
          </button>
        ) : (
          <span style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            padding: '2px 6px',
            borderRadius: '4px',
            background: 'var(--border-subtle)',
            color: 'var(--text-light)',
            marginLeft: '0.5rem',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            ⌘K
          </span>
        )}
      </div>
    </div>
  )
}
