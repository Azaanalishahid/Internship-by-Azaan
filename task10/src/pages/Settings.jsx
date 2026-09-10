import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Settings as SettingsIcon, Shield, Bell, Lock, User, Eye } from 'lucide-react';

const Settings = () => {
  const { user, addToast } = useAuth();
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Account & Privacy settings saved successfully.');
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="settings-page">
        <div className="container" style={{ maxWidth: '720px' }}>
          <div className="settings-card glass-card">
            <h1 className="section-heading flex items-center gap-3" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
              <SettingsIcon size={28} className="text-blue" /> Account Settings & Privacy
            </h1>

            <form onSubmit={handleSave} className="auth-form">
              <div className="settings-section">
                <h3 className="settings-section-title"><User size={18} /> Profile Information</h3>
                <div className="form-group">
                  <label>Display Name</label>
                  <input type="text" className="modal-input" defaultValue={user?.name || 'Muhammad'} />
                </div>
                <div className="form-group">
                  <label>Primary Email</label>
                  <input type="email" className="modal-input" defaultValue={user?.email || 'muhammad@careerconnect.com'} />
                </div>
              </div>

              <div className="settings-section">
                <h3 className="settings-section-title"><Bell size={18} /> Notification Preferences</h3>
                <label className="checkbox-label" style={{ marginBottom: '0.75rem' }}>
                  <input type="checkbox" checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} />
                  <span>Receive email alerts for interview invitations & status changes</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" checked={pushNotif} onChange={(e) => setPushNotif(e.target.checked)} />
                  <span>Enable desktop push notifications for new message alerts</span>
                </label>
              </div>

              <div className="settings-section">
                <h3 className="settings-section-title"><Lock size={18} /> Security & Password</h3>
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="••••••••" className="modal-input" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="••••••••" className="modal-input" />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
                Save Settings
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .settings-page { padding: 8.5rem 0 5rem 0; min-height: 85vh; }
        .settings-card { padding: 2.5rem; border-radius: 24px; }
        .settings-section { margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); }
        .settings-section-title { font-size: 1.1rem; font-weight: 800; margin-bottom: 1.2rem; display: flex; align-items: center; gap: 0.5rem; color: var(--secondary-blue); }
      `}</style>
    </div>
  );
};

export default Settings;
