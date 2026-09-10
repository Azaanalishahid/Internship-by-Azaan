import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Send, User, CheckCheck, Circle } from 'lucide-react';

const Messages = () => {
  const { messages, user } = useAuth();
  const [activeChat, setActiveChat] = useState(messages[0]);
  const [chatLog, setChatLog] = useState([
    { sender: 'them', text: 'Hi Muhammad, we reviewed your React architecture portfolio and loved it!', time: '10:30 AM' },
    { sender: 'them', text: 'Are you open for a quick 20 min introductory video call this Thursday?', time: '10:31 AM' },
    { sender: 'me', text: 'Hello! Thank you for reaching out. Yes, Thursday at 2 PM EST works great.', time: '10:35 AM' }
  ]);
  const [newMsgText, setNewMsgText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatLog(prev => [...prev, { sender: 'me', text: newMsgText, time: timeStr }]);
    setNewMsgText('');

    // Simulate recruiter auto-reply
    setTimeout(() => {
      setChatLog(prev => [...prev, { sender: 'them', text: 'Sounds perfect! I have scheduled the video link for Thursday at 2 PM EST.', time: timeStr }]);
    }, 1200);
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="messages-page">
        <div className="container">
          <div className="chat-layout-card glass-card">
            {/* Conversations Sidebar */}
            <div className="conversations-sidebar">
              <h3 className="sidebar-title">Recruiter Chats</h3>
              <div className="chats-list">
                {messages.map(m => (
                  <div 
                    key={m.id} 
                    className={`chat-item ${activeChat.id === m.id ? 'active' : ''}`}
                    onClick={() => setActiveChat(m)}
                  >
                    <div className="avatar-wrapper">
                      <div className="avatar-circle">{m.sender.charAt(0)}</div>
                      {m.online && <span className="online-dot"></span>}
                    </div>
                    <div className="chat-item-info">
                      <div className="flex justify-between">
                        <h4 className="chat-sender">{m.sender}</h4>
                        <span className="chat-time">{m.time}</span>
                      </div>
                      <p className="chat-last-msg">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Conversation Area */}
            <div className="conversation-area">
              <div className="conversation-header">
                <div className="flex items-center gap-3">
                  <div className="avatar-circle">{activeChat.sender.charAt(0)}</div>
                  <div>
                    <h4 className="font-bold">{activeChat.sender}</h4>
                    <span className="online-status">● Online Recruiter</span>
                  </div>
                </div>
              </div>

              <div className="chat-messages-body">
                {chatLog.map((c, idx) => (
                  <div key={idx} className={`chat-bubble ${c.sender === 'me' ? 'my-bubble' : 'their-bubble'}`}>
                    <p>{c.text}</p>
                    <span className="msg-timestamp">{c.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSend} className="chat-input-form">
                <input 
                  type="text" 
                  placeholder="Type a message to recruiter..."
                  value={newMsgText}
                  onChange={(e) => setNewMsgText(e.target.value)}
                />
                <button type="submit" className="btn btn-primary send-msg-btn">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .messages-page { padding: 8.5rem 0 5rem 0; min-height: 85vh; }
        .chat-layout-card { display: grid; grid-template-columns: 320px 1fr; height: 600px; border-radius: 24px; overflow: hidden; }
        .conversations-sidebar { border-right: 1px solid var(--border-color); padding: 1.25rem; display: flex; flex-direction: column; background: var(--bg-main); }
        .sidebar-title { font-size: 1.1rem; font-weight: 800; margin-bottom: 1rem; }
        .chats-list { display: flex; flex-direction: column; gap: 0.5rem; overflow-y: auto; }
        .chat-item { display: flex; gap: 0.75rem; padding: 0.75rem; border-radius: var(--radius-md); cursor: pointer; transition: background 0.2s ease; }
        .chat-item.active { background: var(--bg-card); box-shadow: var(--shadow-sm); }
        .avatar-wrapper { position: relative; }
        .avatar-circle { width: 40px; height: 40px; border-radius: 50%; background: var(--secondary-blue); color: #FFF; font-weight: 800; display: flex; align-items: center; justify-content: center; }
        .online-dot { position: absolute; bottom: 2px; right: 2px; width: 10px; height: 10px; background: #10B981; border-radius: 50%; border: 2px solid #FFF; }
        .chat-sender { font-weight: 700; font-size: 0.9rem; }
        .chat-time { font-size: 0.7rem; color: var(--text-muted); }
        .chat-last-msg { font-size: 0.8rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px; }
        .conversation-area { display: flex; flex-direction: column; background: var(--bg-card); }
        .conversation-header { padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-color); }
        .online-status { font-size: 0.75rem; color: #10B981; font-weight: 700; }
        .chat-messages-body { flex: 1; padding: 1.5rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; }
        .chat-bubble { max-width: 70%; padding: 0.85rem 1.15rem; border-radius: 16px; font-size: 0.9rem; position: relative; }
        .their-bubble { background: var(--bg-main); align-self: flex-start; border-bottom-left-radius: 2px; }
        .my-bubble { background: var(--secondary-blue); color: #FFF; align-self: flex-end; border-bottom-right-radius: 2px; }
        .msg-timestamp { font-size: 0.65rem; opacity: 0.7; display: block; margin-top: 0.3rem; text-align: right; }
        .chat-input-form { padding: 1rem; border-top: 1px solid var(--border-color); display: flex; gap: 0.75rem; }
        .chat-input-form input { flex: 1; padding: 0.75rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-main); font-size: 0.95rem; outline: none; }
        @media (max-width: 768px) { .chat-layout-card { grid-template-columns: 1fr; } .conversations-sidebar { display: none; } }
      `}</style>
    </div>
  );
};

export default Messages;
