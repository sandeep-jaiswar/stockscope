'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', dot = false, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors';
    
    const variantClasses = {
      primary: 'bg-primary-100 text-primary-800 border border-primary-200',
      secondary: 'bg-secondary-100 text-secondary-800 border border-secondary-200',
      success: 'bg-success-100 text-success-800 border border-success-200',
      warning: 'bg-warning-100 text-warning-800 border border-warning-200',
      error: 'bg-error-100 text-error-800 border border-error-200',
      neutral: 'bg-neutral-100 text-neutral-800 border border-neutral-200'
    };

    const sizeClasses = {
      sm: dot ? 'h-2 w-2' : 'px-2 py-0.5 text-xs',
      md: dot ? 'h-2.5 w-2.5' : 'px-2.5 py-1 text-sm',
      lg: dot ? 'h-3 w-3' : 'px-3 py-1.5 text-base'
    };

    const dotClasses = dot ? 'rounded-full' : '';

    return (
      <span
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          dotClasses,
          className
        )}
        {...props}
      >
        {!dot && children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;