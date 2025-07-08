import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const getButtonStyles = () => {
    const baseStyles = {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      position: 'relative' as const,
      overflow: 'hidden' as const,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          background: 'linear-gradient(45deg, #40465f, #764ba2)',
          color: 'white',
          boxShadow: '0 4px 15px rgba(176, 132, 219, 0.3)',
        };
      case 'secondary':
        return {
          ...baseStyles,
          background: 'linear-gradient(45deg, #b084db, #8a2be2)',
          color: 'white',
          boxShadow: '0 4px 15px rgba(176, 132, 219, 0.3)',
        };
      case 'outline':
        return {
          ...baseStyles,
          background: 'transparent',
          color: '#b084db',
          border: '2px solid #b084db',
          boxShadow: 'none',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <button
      {...props}
      style={getButtonStyles()}
      onMouseEnter={(e) => {
        if (variant !== 'outline') {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(176, 132, 219, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        if (variant !== 'outline') {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(176, 132, 219, 0.3)';
        }
      }}
    >
      {children}
    </button>
  );
};

export default Button;