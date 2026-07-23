import React, { useState } from 'react';
import './TopNav.css';

export default function TopNav({ onToggleSidebar }) {
  const [searchVal, setSearchVal] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="topnav">
      <button className="topnav-hamburger" onClick={onToggleSidebar} id="sidebar-toggle">
        <span /><span /><span />
      </button>

      <div className="topnav-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          id="topnav-search-input"
          type="text"
          placeholder="Search..."
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
        />
      </div>

      <div className="topnav-actions">
        <button className="topnav-icon-btn" id="notif-btn" onClick={() => setNotifOpen(!notifOpen)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="notif-dot" />
          {notifOpen && (
            <div className="notif-popup">
              <div className="notif-header">Notifications</div>
              <div className="notif-item">
                <div className="notif-dot-blue" />
                <div>
                  <p className="notif-text">New task assigned to you</p>
                  <span className="notif-time">2 minutes ago</span>
                </div>
              </div>
              <div className="notif-item">
                <div className="notif-dot-green" />
                <div>
                  <p className="notif-text">Sales target reached!</p>
                  <span className="notif-time">1 hour ago</span>
                </div>
              </div>
              <div className="notif-item">
                <div className="notif-dot-orange" />
                <div>
                  <p className="notif-text">System update available</p>
                  <span className="notif-time">3 hours ago</span>
                </div>
              </div>
            </div>
          )}
        </button>

        <button className="topnav-avatar" id="user-profile-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </div>
    </header>
  );
}
