'use client';
import NextLink from 'next/link';
import { ReactNode, AnchorHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: 'default' | 'underline';
  className?: string;
}

const Link = ({ 
  href, 
  children, 
  external = false, 
  variant = 'default',
  className = '',
  ...props 
}: LinkProps) => {
  const baseClasses = 'transition-colors hover:opacity-80'
  const variantClasses = {
    default: '',
    underline: 'underline'
  }

  const combinedClasses = twMerge(
    baseClasses,
    variantClasses[variant],
    className
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <NextLink href={href} className={combinedClasses} {...props}>
      {children}
    </NextLink>
  )
}

export default Link;
