import React from 'react';
import './Pages.css';

export default function SamplePage() {
  return (
    <div className="page-container">
      <div className="breadcrumb">
        <span className="breadcrumb-item">Home</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item active">Sample Page</span>
      </div>

      <h1 className="page-title">Sample Page</h1>

      <div className="card sample-card">
        <div className="sample-card-header">
          <h2>Sample Page</h2>
        </div>
        <div className="sample-card-body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiatnulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
}
