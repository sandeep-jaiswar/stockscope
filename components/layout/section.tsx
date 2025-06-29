'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'muted' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
}

const Section: React.FC<SectionProps> = ({
  children,
  className,
  background = 'default',
  padding = 'lg',
  maxWidth = '7xl'
}) => {
  const backgroundClasses = {
    default: 'bg-white',
    muted: 'bg-secondary-50',
    gradient: 'gradient-background'
  };

  const paddingClasses = {
    none: '',
    sm: 'py-4',
    md: 'py-8',
    lg: 'py-12',
    xl: 'py-16'
  };

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <section className={cn(backgroundClasses[background], paddingClasses[padding], className)}>
      <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', maxWidthClasses[maxWidth])}>
        {children}
      </div>
    </section>
  );
};

export default Section;