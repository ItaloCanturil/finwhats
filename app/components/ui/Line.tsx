'use client';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface LineProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  variant?: 'light' | 'medium' | 'dark';
  className?: string;
}

const Line = ({ 
  width = 'full', 
  height = '1px',
  variant = 'medium',
  className = '',
  ...props 
}: LineProps) => {
  const baseClasses = 'block'
  const variantClasses = {
    light: 'bg-background-overlay-light',
    medium: 'bg-line-background',
    dark: 'bg-text-primary'
  }

  const widthClass = width === 'full' ? 'w-full' : `w-[${width}]`
  const heightClass = `h-[${height}]`

  const combinedClasses = twMerge(
    baseClasses,
    variantClasses[variant],
    widthClass,
    heightClass,
    className
  )

  return <div className={combinedClasses} {...props} />
}

export default Line