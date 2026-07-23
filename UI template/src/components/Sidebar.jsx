import React, { useState } from 'react';
import './Sidebar.css';

const navItems = [
  {
    section: 'WE CONNECT INNOVATION',
    items: [{ id: 'dashboard', label: 'Dashboard', icon: '⊞' }],
  },
  {
    section: 'PAGES',
    subtitle: 'Prebuild-Pages',
    items: [
      { id: 'sample-page', label: 'Sample Page', icon: '▣' },
      { id: 'auth', label: 'Authentication', icon: '🛡', hasDropdown: true },
      { id: 'documentation', label: 'Documentation', icon: '❓', badge: 'Help?' },
    ],
  },
  {
    section: 'UTILS',
    items: [{ id: 'icons', label: 'Icons', icon: '⊞' }],
  },
];

const SidebarIcon = ({ type }) => {
  const icons = {
    '⊞': (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    '▣': (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" />
      </svg>
    ),
    '🛡': (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    '❓': (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><circle cx="12" cy="17" r="0.5" fill="currentColor" />
      </svg>
    ),
  };
  return icons[type] || null;
};

export default function Sidebar({ collapsed, activePage, setActivePage }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round" />
          </svg>
        </div>
        {!collapsed && <span className="logo-text">We Connect Innovation</span>}
      </div>

      <nav className="sidebar-nav">
        {navItems.map((group, gi) => (
          <div key={gi} className="nav-group">
            {!collapsed && (
              <div className="nav-section-label">
                <span>{group.section}</span>
                {group.subtitle && <p className="nav-subtitle">{group.subtitle}</p>}
              </div>
            )}
            {group.items.map((item, ii) => {
              const isItemActive = activePage === item.id || (item.hasDropdown && (activePage === 'login' || activePage === 'register'));

              return (
                <div key={ii}>
                  <div
                    className={`nav-item ${isItemActive ? 'active' : ''}`}
                    onClick={() => {
                      if (item.hasDropdown) {
                        setOpenDropdown(!openDropdown);
                      } else {
                        setActivePage(item.id);
                      }
                    }}
                  >
                    <span className="nav-icon"><SidebarIcon type={item.icon} /></span>
                    {!collapsed && (
                      <>
                        <span className="nav-label">{item.label}</span>
                        {item.badge && <span className="nav-badge">{item.badge}</span>}
                        {item.hasDropdown && (
                          <span className={`nav-chevron ${openDropdown ? 'open' : ''}`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {item.hasDropdown && openDropdown && !collapsed && (
                    <div className="nav-dropdown">
                      <div
                        className={`nav-dropdown-item ${activePage === 'login' ? 'active-sub' : ''}`}
                        onClick={() => setActivePage('login')}
                      >
                        Login
                      </div>
                      <div
                        className={`nav-dropdown-item ${activePage === 'register' ? 'active-sub' : ''}`}
                        onClick={() => setActivePage('register')}
                      >
                        Register
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
