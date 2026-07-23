import React, { useState } from 'react';
import './DocumentationPage.css';

const docNavItems = [
  'Welcome',
  'Prerequisites',
  'Getting Started',
  'Installation',
  'Authentication',
  'Axios API Calls',
  'Localization',
  'File Structure',
  'Routing',
  'Template Config',
  'Layout Option',
  'Default Theme',
  'Color Management',
];

export default function DocumentationPage() {
  const [activeDocSection, setActiveDocSection] = useState('Welcome');

  return (
    <div className="doc-page-wrapper">
      {/* Top bar for documentation */}
      <div className="doc-topbar">
        <div className="doc-brand">
          <div className="doc-logo-mark">//</div>
          <span className="doc-brand-title">We Connect Innovation React</span>
        </div>
        <div className="doc-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Search..." />
          <span className="doc-kbd">Ctrl K</span>
        </div>
      </div>

      <div className="doc-layout">
        {/* Left Docs Nav */}
        <aside className="doc-sidebar">
          {docNavItems.map((item, idx) => (
            <button
              key={idx}
              className={`doc-nav-btn ${activeDocSection === item ? 'active' : ''}`}
              onClick={() => setActiveDocSection(item)}
            >
              {item}
            </button>
          ))}
          <div className="doc-gitbook-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.6 10.59L8.38 4.8a1.37 1.37 0 0 1 1.93 0l.58.59a1.37 1.37 0 0 1 0 1.93l-4.8 4.8 4.8 4.8a1.37 1.37 0 0 1 0 1.93l-.58.59a1.37 1.37 0 0 1-1.93 0L2.6 13.52a2.07 2.07 0 0 1 0-2.93zM21.4 10.59l-5.78-5.79a1.37 1.37 0 0 0-1.93 0l-.58.59a1.37 1.37 0 0 0 0 1.93l4.8 4.8-4.8 4.8a1.37 1.37 0 0 0 0 1.93l.58.59a1.37 1.37 0 0 0 1.93 0l5.78-5.79a2.07 2.07 0 0 0 0-2.93z"/>
            </svg>
            <span>Powered by GitBook</span>
          </div>
        </aside>

        {/* Center Main Doc Content */}
        <main className="doc-content">
          <div className="doc-header-row">
            <h1 className="doc-title">Welcome</h1>
            <button className="doc-copy-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy</span>
            </button>
          </div>

          <p className="doc-subtitle">
            We Connect Innovation Documentation - React Vite.js + Material UI Admin Template
          </p>

          <section className="doc-section">
            <h2 className="doc-h2"><span className="hash">#</span> About</h2>
            <p className="doc-paragraph">
              <strong>We Connect Innovation</strong> is the most developer-friendly & highly customizable React Hooks + Redux with <strong>Material UI</strong>.
            </p>
            <p className="doc-paragraph">
              We've followed the best industry standards to make our product easy, fast, and highly scalable to work with. We Connect Innovation is the most convenient React Hooks admin dashboard template for developers. It's made with React Hooks, Components, Create React App, Redux, clean code, and is fully documented, which allows you to build eye-catching, high-quality, high-performance responsive single-page applications.
            </p>
          </section>

          <section className="doc-section">
            <h2 className="doc-h2">Features</h2>
            <ul className="doc-list">
              <li>Material UI latest v7</li>
              <li>React Hooks & Context API Architecture</li>
              <li>Vite.js Lightning Fast Build System</li>
              <li>Clean, Modular & Scalable Directory Structure</li>
              <li>Dark Mode & Custom Theme Switcher</li>
              <li>Fully Responsive Layout across all devices</li>
            </ul>
          </section>
        </main>

        {/* Right Outline Sidebar */}
        <aside className="doc-outline">
          <span className="outline-heading">ON THIS PAGE</span>
          <a href="#about" className="outline-link active">About</a>
          <a href="#features" className="outline-link">Features</a>
          <a href="#tech" className="outline-link">Technical Specification (Credits)</a>
          <a href="#feedback" className="outline-link">Any Suggestion? OR Feedback</a>
        </aside>
      </div>
    </div>
  );
}
