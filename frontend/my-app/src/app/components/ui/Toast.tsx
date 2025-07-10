import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

const toastStyles: Record<string, React.CSSProperties> = {
  base: {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    minWidth: '220px',
    padding: '16px 24px',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: 500,
    zIndex: 9999,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    fontSize: '1rem',
    transition: 'opacity 0.3s',
  },
  success: {
    background: '#22c55e',
  },
  error: {
    background: '#ef4444',
  },
};

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{ ...toastStyles.base, ...toastStyles[type] }}>
      {message}
    </div>
  );
};

export default Toast; 