import React from 'react';
import { Bell, CheckCheck, X, Sparkles, Calendar, CheckCircle2, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NotificationCenter = () => {
  const { notifications, markAllNotificationsRead, notifDrawerOpen, setNotifDrawerOpen } = useAuth();

  if (!notifDrawerOpen) return null;

  return (
    <div className="notif-modal-overlay animate-fade-in">
      <div className="notif-drawer glass-card">
        <div className="notif-drawer-header">
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-blue" />
            <h3 className="notif-drawer-title">Notifications</h3>
          </div>
          <div className="flex items-center gap-3">
            <button className="mark-read-btn" onClick={markAllNotificationsRead}>
              <CheckCheck size={16} /> Mark all read
            </button>
            <button className="close-notif-btn" onClick={() => setNotifDrawerOpen(false)}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="notif-drawer-body">
          {notifications.map(n => (
            <div key={n.id} className={`notif-card-item ${n.unread ? 'unread' : ''}`}>
              <div className="notif-icon-box">
                {n.title.includes('Interview') ? <Calendar size={18} className="text-orange" /> :
                 n.title.includes('Shortlisted') ? <CheckCircle2 size={18} className="text-green" /> :
                 <UserCheck size={18} className="text-blue" />}
              </div>
              <div className="notif-item-info">
                <h4 className="notif-item-title">{n.title}</h4>
                <p className="notif-item-msg">{n.msg}</p>
                <span className="notif-item-time">{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .notif-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(4px);
          z-index: 9998;
          display: flex;
          justify-content: flex-end;
        }
        .notif-drawer {
          width: 100%;
          max-width: 400px;
          height: 100%;
          border-radius: 0;
          border-left: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
        }
        .notif-drawer-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
        }
        .notif-drawer-title {
          font-size: 1.2rem;
          font-weight: 800;
        }
        .mark-read-btn {
          background: transparent;
          border: none;
          color: var(--secondary-blue);
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          cursor: pointer;
        }
        .close-notif-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }
        .notif-drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .notif-card-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border-radius: var(--radius-md);
          background: var(--bg-main);
          border: 1px solid var(--border-color);
          transition: background 0.2s ease;
        }
        .notif-card-item.unread {
          border-left: 4px solid var(--secondary-blue);
          background: var(--bg-card);
        }
        .notif-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .notif-item-title {
          font-size: 0.95rem;
          font-weight: 800;
          margin-bottom: 0.2rem;
        }
        .notif-item-msg {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .notif-item-time {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.3rem;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default NotificationCenter;
