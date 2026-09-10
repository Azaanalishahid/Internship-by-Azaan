import React, { useState } from 'react'
import { TrendingUp, TrendingDown, RotateCw, ArrowRight } from 'lucide-react'

export default function FlipStatCard({ card, onQuickFilter }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const Icon = card.icon

  return (
    <div
      className={`flip-card-container ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
      title="Click or hover to flip card for details"
    >
      <div className="flip-card-inner">
        
        {/* FRONT FACE */}
        <div className="flip-card-front">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
              boxShadow: 'var(--shadow-sm)'
            }}>
              <Icon size={22} strokeWidth={2} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.25rem 0' }}>
            <span style={{ fontSize: '2.125rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
              {card.value.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>users</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.125rem', fontWeight: 700, color: card.trendUp ? 'var(--status-active-text)' : 'var(--status-inactive-text)' }}>
              {card.trendUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              <span>{card.trend}</span>
              <span style={{ color: 'var(--text-muted)', fontWeight: 500, marginLeft: '4px' }}>{card.trendText}</span>
            </div>

            <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--primary-blue)', fontWeight: 600, fontSize: '0.6875rem' }}>
              Flip <RotateCw size={11} />
            </span>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="flip-card-back">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
                {card.title} Breakdown
              </span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Click to flip</span>
            </div>
            
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '0.75rem' }}>
              {card.description}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onQuickFilter && onQuickFilter(card.filterType)
            }}
            style={{
              width: '100%',
              padding: '0.45rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: 'var(--primary-blue)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.375rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <span>Filter {card.title} Table</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </div>
  )
}
