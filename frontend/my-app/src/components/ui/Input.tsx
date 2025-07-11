import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div style={{ 
      marginBottom: '20px',
      position: 'relative' as const
    }}>
      <label 
        htmlFor={id} 
        style={{ 
          display: 'block', 
          marginBottom: '8px',
          color: '#7a0909',
          fontSize: '0.9rem',
          fontWeight: '600'
        }}
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        style={{
          width: '100%',
          padding: '15px 20px',
          boxSizing: 'border-box' as const,
          border: '2px solid #333333',
          borderRadius: '12px',
          backgroundColor: '#ffffff',
          color: '#111',
          fontSize: '1rem',
          transition: 'all 0.3s ease',
          outline: 'none',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#b084db';
          e.target.style.boxShadow = '0 0 0 3px rgba(176, 132, 219, 0.1)';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#333333';
          e.target.style.boxShadow = 'none';
          e.target.style.transform = 'translateY(0)';
        }}
      />
    </div>
  );
};

export default Input;