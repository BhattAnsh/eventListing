import React from 'react';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
};

export const Button = ({
  onClick,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  fullWidth = false,
  size = 'medium',
  icon,
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center transition-all duration-200 font-medium focus:outline-none';
  
  const variantStyles = {
    primary: 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]',
    secondary: 'bg-[var(--gray-200)] text-[var(--foreground)] hover:bg-[var(--gray-300)]',
    outline: 'bg-white border border-[var(--gray-300)] text-[var(--foreground)] hover:bg-[var(--gray-100)]',
    text: 'bg-transparent text-[var(--accent)] hover:text-[var(--accent-hover)] hover:bg-[var(--gray-100)]',
  };
  
  const sizeStyles = {
    small: 'text-sm px-3 py-1.5 rounded-full',
    medium: 'px-4 py-2 rounded-full',
    large: 'text-base px-6 py-3 rounded-full',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
