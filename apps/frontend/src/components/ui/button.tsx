import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseClasses =
    'px-4 py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition';

  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses =
        'bg-mint text-white hover:bg-mint-light focus:ring-mint-dark';
      break;
    case 'secondary':
      variantClasses =
        'bg-indigo text-white hover:bg-indigo-light focus:ring-indigo-dark';
      break;
    case 'outline':
      variantClasses =
        'border border-mint text-mint hover:bg-mint hover:text-white focus:ring-mint';
      break;
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
