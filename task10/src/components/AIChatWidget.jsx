import React, { useState } from 'react';
import { Bot, Sparkles, X, Send, User, ChevronRight, Calculator, FileCheck, Award, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI Career Assistant. How can I help you accelerate your job search today?' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const { addToast } = useAuth();

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputVal('');

    setTimeout(() => {
      let reply = "Based on current market data, Senior React & Frontend Developers in top US tech hubs earn an average of $165,000 - $220,000 / yr with stock options.";
      if (userText.toLowerCase().includes('resume')) {
        reply = "Your uploaded resume score is 88/100! Tip: Add quantitative metrics to your experience section (e.g. 'Improved web performance by 40%').";
      } else if (userText.toLowerCase().includes('interview')) {
        reply = "Key interview topics for your target roles: System Design, React Virtual DOM reconciliation, State Management, and Behavioral Star method.";
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 800);
  };

  const handleQuickPrompt = (promptText) => {
    setInputVal(promptText);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button 
        className="ai-widget-trigger glass-card"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="AI Career Assistant"
      >
        <Bot size={24} className="ai-trigger-icon" />
        <span className="ai-trigger-label">AI Assistant</span>
      </button>

      {/* Floating Drawer / Modal */}
      {isOpen && (
        <div className="ai-chat-box glass-card animate-fade-in">
          <div className="ai-chat-header">
            <div className="ai-header-title">
              <div className="ai-bot-avatar">
                <Bot size={20} />
              </div>
              <div>
                <h4 className="ai-name">CareerConnect AI</h4>
                <span className="ai-status">⚡ Instant AI Coaching</span>
              </div>
            </div>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="ai-chat-body">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`ai-message-bubble ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}>
                {msg.sender === 'ai' && <Bot size={14} className="bot-inline-icon" />}
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Quick Action Prompts */}
          <div className="ai-quick-prompts">
            <button onClick={() => handleQuickPrompt('Check my AI Resume score')}>
              <FileCheck size={12} /> Resume Score
            </button>
            <button onClick={() => handleQuickPrompt('Estimate salary for React Developer')}>
              <Calculator size={12} /> Salary Benchmark
            </button>
            <button onClick={() => handleQuickPrompt('Interview preparation tips')}>
              <Award size={12} /> Interview Tips
            </button>
          </div>

          {/* Form */}
          <form className="ai-chat-input-form" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask AI anything about your career..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button type="submit" className="ai-send-btn">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <style>{`
        .ai-widget-trigger {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          z-index: 9990;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, #2563EB 0%, #F97316 100%);
          color: #FFFFFF;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
          transition: all 0.3s ease;
        }
        .ai-widget-trigger:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 12px 30px rgba(249, 115, 22, 0.5);
        }
        .ai-trigger-label {
          font-weight: 700;
          font-size: 0.9rem;
        }
        .ai-chat-box {
          position: fixed;
          bottom: 5.5rem;
          left: 2rem;
          width: 360px;
          height: 480px;
          z-index: 9995;
          display: flex;
          flex-direction: column;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
        }
        .ai-chat-header {
          padding: 1rem 1.25rem;
          background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
          color: #FFF;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ai-header-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .ai-bot-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ai-name {
          font-size: 0.95rem;
          font-weight: 800;
        }
        .ai-status {
          font-size: 0.75rem;
          opacity: 0.9;
        }
        .ai-close-btn {
          background: transparent;
          border: none;
          color: #FFF;
          cursor: pointer;
        }
        .ai-chat-body {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          background: var(--bg-card);
        }
        .ai-message-bubble {
          max-width: 85%;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          font-size: 0.85rem;
          line-height: 1.4;
        }
        .bot-msg {
          background: var(--secondary-blue-light);
          color: var(--text-main);
          align-self: flex-start;
          border-bottom-left-radius: 2px;
        }
        .user-msg {
          background: var(--secondary-blue);
          color: #FFFFFF;
          align-self: flex-end;
          border-bottom-right-radius: 2px;
        }
        .bot-inline-icon {
          color: var(--secondary-blue);
          margin-bottom: 0.2rem;
        }
        .ai-quick-prompts {
          display: flex;
          gap: 0.4rem;
          padding: 0.5rem;
          overflow-x: auto;
          background: var(--bg-main);
          border-top: 1px solid var(--border-color);
        }
        .ai-quick-prompts button {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.3rem 0.6rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          white-space: nowrap;
          cursor: pointer;
        }
        .ai-quick-prompts button:hover {
          border-color: var(--secondary-blue);
          color: var(--secondary-blue);
        }
        .ai-chat-input-form {
          display: flex;
          align-items: center;
          padding: 0.6rem 0.8rem;
          background: var(--bg-card);
          border-top: 1px solid var(--border-color);
        }
        .ai-chat-input-form input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.85rem;
          color: var(--text-main);
        }
        .ai-send-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--secondary-blue);
          color: #FFF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default AIChatWidget;
