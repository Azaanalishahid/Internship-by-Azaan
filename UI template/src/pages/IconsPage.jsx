import React, { useState } from 'react';
import './Pages.css';
import './IconsPage.css';

const iconList = [
  { name: 'Dashboard', icon: '⊞' },
  { name: 'Analytics', icon: '📈' },
  { name: 'User Profile', icon: '👤' },
  { name: 'Settings', icon: '⚙️' },
  { name: 'Shield / Auth', icon: '🛡️' },
  { name: 'Document', icon: '📄' },
  { name: 'Folder', icon: '📁' },
  { name: 'Mail', icon: '✉️' },
  { name: 'Notification', icon: '🔔' },
  { name: 'Search', icon: '🔍' },
  { name: 'Star', icon: '⭐' },
  { name: 'Heart', icon: '❤️' },
  { name: 'Shopping Cart', icon: '🛒' },
  { name: 'Calendar', icon: '📅' },
  { name: 'Cloud', icon: '☁️' },
  { name: 'Lock', icon: '🔒' },
];

export default function IconsPage() {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(null);

  const filteredIcons = iconList.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (name) => {
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="page-container">
      <div className="breadcrumb">
        <span className="breadcrumb-item">Home</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item active">Icons</span>
      </div>

      <h1 className="page-title">Material & Feather Icons</h1>

      <div className="card icons-card">
        <div className="icons-search-bar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="icons-grid">
          {filteredIcons.map((item, idx) => (
            <div
              key={idx}
              className="icon-item"
              onClick={() => handleCopy(item.name)}
              title="Click to copy icon name"
            >
              <div className="icon-symbol">{item.icon}</div>
              <span className="icon-name">{item.name}</span>
              {copied === item.name && <span className="copied-tooltip">Copied!</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
