import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Users, Building, DollarSign, TrendingUp, ShieldCheck, Check, X } from 'lucide-react';

const AdminDashboard = () => {
  const { addToast } = useAuth();

  return (
    <div className="page-wrapper">
      <Header />

      <main className="admin-page">
        <div className="container">
          <div className="admin-header flex justify-between items-center" style={{ marginBottom: '2rem' }}>
            <div>
              <span className="badge badge-orange">Enterprise Control Panel</span>
              <h1 className="section-heading">Platform Analytics & Admin Portal</h1>
            </div>
            <button className="btn btn-primary" onClick={() => addToast('System Health Scan: 100% Operational')}>
              System Diagnostic
            </button>
          </div>

          {/* Admin Stat Cards */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card glass-card">
              <div className="stat-icon blue"><Briefcase size={22} /></div>
              <div>
                <h3 className="stat-val">15,420</h3>
                <p className="stat-lbl">Active Jobs Posted</p>
              </div>
            </div>

            <div className="admin-stat-card glass-card">
              <div className="stat-icon orange"><Users size={22} /></div>
              <div>
                <h3 className="stat-val">204,890</h3>
                <p className="stat-lbl">Registered Candidates</p>
              </div>
            </div>

            <div className="admin-stat-card glass-card">
              <div className="stat-icon green"><Building size={22} /></div>
              <div>
                <h3 className="stat-val">8,150</h3>
                <p className="stat-lbl">Partner Companies</p>
              </div>
            </div>

            <div className="admin-stat-card glass-card">
              <div className="stat-icon purple"><DollarSign size={22} /></div>
              <div>
                <h3 className="stat-val">$1.2M</h3>
                <p className="stat-lbl">Monthly SaaS ARR</p>
              </div>
            </div>
          </div>

          {/* Management Tables */}
          <div className="admin-content-grid">
            <div className="admin-table-card glass-card">
              <h3 className="card-title">Pending Company Approvals</h3>
              <div className="table-responsive">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>Industry</th>
                      <th>Tax ID Verification</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-bold">OpenAI Technologies</td>
                      <td>Artificial Intelligence</td>
                      <td><span className="status-pill status-green">Verified</span></td>
                      <td>
                        <button className="btn-table-action" onClick={() => addToast('OpenAI approved for job posting')}>Approve</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold">Stripe Payments</td>
                      <td>Fintech Solutions</td>
                      <td><span className="status-pill status-green">Verified</span></td>
                      <td>
                        <button className="btn-table-action" onClick={() => addToast('Stripe approved for job posting')}>Approve</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .admin-page { padding: 8.5rem 0 5rem 0; min-height: 85vh; }
        .admin-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2.5rem; }
        .admin-stat-card { padding: 1.75rem; display: flex; align-items: center; gap: 1.25rem; border-radius: var(--radius-lg); }
        .stat-icon { width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .stat-icon.blue { background: rgba(37, 99, 235, 0.12); color: var(--secondary-blue); }
        .stat-icon.orange { background: rgba(249, 115, 22, 0.12); color: var(--accent-orange); }
        .stat-icon.green { background: rgba(16, 185, 129, 0.12); color: #10B981; }
        .stat-icon.purple { background: rgba(139, 92, 246, 0.12); color: #8B5CF6; }
        .stat-val { font-size: 1.8rem; font-weight: 800; }
        .stat-lbl { font-size: 0.85rem; color: var(--text-secondary); font-weight: 600; }
        .admin-table-card { padding: 2rem; border-radius: 24px; }
        @media (max-width: 900px) { .admin-stats-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
