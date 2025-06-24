import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
}) => {
  const baseClasses =
    'inline-block px-2 py-1 rounded-full text-xs font-semibold';

  let variantClasses = '';
  switch (variant) {
    case 'default':
      variantClasses = 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      break;
    case 'success':
      variantClasses = 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200';
      break;
    case 'warning':
      variantClasses = 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200';
      break;
    case 'error':
      variantClasses = 'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200';
      break;
  }

  return (
    <span className={`${baseClasses} ${variantClasses}`}>
      {children}
    </span>
  );
};
