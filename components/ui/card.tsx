'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { getCardClasses } from '@/lib/design-system';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  ...props
}: CardProps) {
  const baseClasses = getCardClasses(variant);
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const hoverClass = hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200' : '';

  return (
    <div
      className={cn(
        baseClasses,
        paddingClasses[padding],
        hoverClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action, children, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-6', className)} {...props}>
      <div>
        {title && <h3 className="text-xl font-semibold text-secondary-900">{title}</h3>}
        {subtitle && <p className="text-sm text-secondary-600 mt-1">{subtitle}</p>}
        {children}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-6 pt-6 border-t border-secondary-200', className)} {...props}>
      {children}
    </div>
  );
}