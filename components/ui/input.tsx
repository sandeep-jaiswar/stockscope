'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { getInputClasses } from '@/lib/design-system';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error' | 'success';
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export default function Input({
  variant = 'default',
  label,
  error,
  success,
  hint,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const baseClasses = getInputClasses(variant);
  const widthClass = fullWidth ? 'w-full' : '';
  
  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon;
  const paddingClass = hasLeftIcon ? 'pl-10' : hasRightIcon ? 'pr-10' : '';

  return (
    <div className={cn(widthClass, className)}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-secondary-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="h-5 w-5 text-secondary-400">
              {leftIcon}
            </div>
          </div>
        )}
        
        <input
          id={inputId}
          className={cn(
            baseClasses,
            paddingClass,
            error && 'border-error-300 focus:border-error-500 focus:ring-error-500',
            success && 'border-success-300 focus:border-success-500 focus:ring-success-500'
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="h-5 w-5 text-secondary-400">
              {rightIcon}
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-error-600">{error}</p>
      )}
      
      {success && (
        <p className="mt-2 text-sm text-success-600">{success}</p>
      )}
      
      {hint && !error && !success && (
        <p className="mt-2 text-sm text-secondary-500">{hint}</p>
      )}
    </div>
  );
}