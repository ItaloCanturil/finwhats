'use client';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ListProps {
  children: ReactNode
  as?: 'ul' | 'ol' | 'div'
  variant?: 'default' | 'navigation' | 'horizontal'
  className?: string
  [key: string]: any
}

interface ListItemProps {
  children: ReactNode
  className?: string
  [key: string]: any
}

const List = ({ 
  children, 
  as: Component = 'div', 
  variant = 'default',
  className = '',
  ...props 
}: ListProps) => {
  const baseClasses = 'flex'
  const variantClasses = {
    default: 'flex-col',
    navigation: 'flex-col',
    horizontal: 'flex-row'
  }

  const combinedClasses = twMerge(
    baseClasses,
    variantClasses[variant],
    className
  )

  const ElementComponent = Component as any;

  return (
    <ElementComponent className={combinedClasses} {...props}>
      {children}
    </ElementComponent>
  )
}

const ListItem = ({ children, className = '', ...props }: ListItemProps) => {
  return (
    <li className={twMerge('list-none', className)} {...props}>
      {children}
    </li>
  )
}

List.Item = ListItem

export default List