import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function ToastNotification() {
  const { toast } = useCart();

  if (!toast.show) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 20px',
      backgroundColor: '#ffffff',
      color: '#0f172a',
      borderRadius: '16px',
      boxShadow: '0 20px 30px -10px rgba(15, 23, 42, 0.2), 0 0 15px rgba(37, 99, 235, 0.15)',
      border: '1px solid rgba(226, 232, 240, 0.8)',
      backdropFilter: 'blur(12px)',
      animation: 'slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      maxWidth: '380px'
    }}>
      {getIcon()}
      <span style={{ fontSize: '0.925rem', fontWeight: 600, flex: 1 }}>
        {toast.message}
      </span>
    </div>
  );
}
