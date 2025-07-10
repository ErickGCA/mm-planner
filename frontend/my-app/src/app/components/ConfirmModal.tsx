import React from 'react';

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.35)',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 12,
  padding: '32px 28px 24px 28px',
  minWidth: 320,
  maxWidth: 400,
  boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
  textAlign: 'center',
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 700,
  marginBottom: 12,
  color: '#7a0909',
};

const messageStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  marginBottom: 24,
  color: '#222',
};

const buttonRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 12,
  justifyContent: 'center',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 22px',
  borderRadius: 8,
  border: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background 0.2s',
};

const confirmStyle: React.CSSProperties = {
  ...buttonStyle,
  background: '#7a0909',
  color: '#fff',
};

const cancelStyle: React.CSSProperties = {
  ...buttonStyle,
  background: '#eee',
  color: '#7a0909',
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {title && <div style={titleStyle}>{title}</div>}
        <div style={messageStyle}>{message}</div>
        <div style={buttonRowStyle}>
          <button style={cancelStyle} onClick={onCancel}>{cancelText}</button>
          <button style={confirmStyle} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 