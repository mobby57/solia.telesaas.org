import type { ButtonHTMLAttributes, ReactNode } from 'react';
import React from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'highlight';
}

const variantStyles = {
  primary: 'bg-blueViolet text-white hover:scale-105 shadow-md',
  secondary: 'bg-mintGreen text-white hover:scale-105 shadow-md',
  highlight: 'bg-goldenYellow text-darkGray hover:scale-105 shadow-md',
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-2xl px-6 py-3 transition-transform ease-in-out ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
