import React from 'react';
import './StatCard.css';

const icons = {
  earnings: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="2"/>
      <path d="M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3H15" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  task: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#ef4444" strokeWidth="2"/>
      <line x1="3" y1="9" x2="21" y2="9" stroke="#ef4444" strokeWidth="2"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  views: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#10b981" strokeWidth="2"/>
      <polyline points="14 2 14 8 20 8" stroke="#10b981" strokeWidth="2"/>
      <line x1="9" y1="13" x2="15" y2="13" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
      <line x1="9" y1="17" x2="15" y2="17" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  downloads: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  ),
};

const arrowUp = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

const arrowDown = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" />
  </svg>
);

export default function StatCard({ value, label, icon, badgeText, badgeColor, trend }) {
  const trendUp = trend === 'up';

  return (
    <div className="stat-card card">
      <div className="stat-card-top">
        <div className="stat-card-info">
          <span className={`stat-value stat-${icon}`}>{value}</span>
          <span className="stat-label">{label}</span>
        </div>
        <div className="stat-card-icon">{icons[icon]}</div>
      </div>
      <div className={`stat-badge badge-${badgeColor}`}>
        <span>{badgeText}</span>
        <span className="badge-arrow">{trendUp ? arrowUp : arrowDown}</span>
      </div>
    </div>
  );
}
