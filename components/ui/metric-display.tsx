'use client';

import React from 'react';
import { cn, formatCurrency, formatPercentage, formatNumber } from '@/lib/utils';

interface MetricDisplayProps {
  label: string;
  value: string | number;
  change?: number;
  format?: 'currency' | 'percentage' | 'number';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
  showChange?: boolean;
  className?: string;
}

const MetricDisplay: React.FC<MetricDisplayProps> = ({
  label,
  value,
  change,
  format,
  size = 'md',
  layout = 'vertical',
  showChange = true,
  className
}) => {
  const formattedValue = React.useMemo(() => {
    if (typeof value === 'number') {
      switch (format) {
        case 'currency':
          return formatCurrency(value);
        case 'percentage':
          return formatPercentage(value);
        case 'number':
          return formatNumber(value);
        default:
          return value.toString();
      }
    }
    return value;
  }, [value, format]);

  const sizeClasses = {
    xs: {
      container: 'p-2',
      label: 'text-xs',
      value: 'text-sm',
      change: 'text-xs'
    },
    sm: {
      container: 'p-3',
      label: 'text-xs',
      value: 'text-base',
      change: 'text-xs'
    },
    md: {
      container: 'p-4',
      label: 'text-sm',
      value: 'text-lg',
      change: 'text-sm'
    },
    lg: {
      container: 'p-6',
      label: 'text-base',
      value: 'text-2xl',
      change: 'text-base'
    }
  };

  const changeColorClass = change !== undefined ? (
    change >= 0 ? 'text-success-600' : 'text-error-600'
  ) : 'text-secondary-600';

  if (layout === 'horizontal') {
    return (
      <div className={cn(
        'bg-white border border-secondary-200 rounded-lg flex items-center justify-between',
        sizeClasses[size].container,
        className
      )}>
        <span className={cn('text-secondary-600 font-medium', sizeClasses[size].label)}>
          {label}
        </span>
        <div className="text-right">
          <div className={cn('font-bold text-secondary-900', sizeClasses[size].value)}>
            {formattedValue}
          </div>
          {showChange && change !== undefined && (
            <div className={cn('font-medium', sizeClasses[size].change, changeColorClass)}>
              {change >= 0 ? '+' : ''}{change.toFixed(2)}%
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'bg-white border border-secondary-200 rounded-lg',
      sizeClasses[size].container,
      className
    )}>
      <div className="flex items-center justify-between mb-1">
        <span className={cn('text-secondary-600 font-medium', sizeClasses[size].label)}>
          {label}
        </span>
        {showChange && change !== undefined && (
          <span className={cn('font-medium', sizeClasses[size].change, changeColorClass)}>
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
        )}
      </div>
      <div className={cn('font-bold text-secondary-900', sizeClasses[size].value)}>
        {formattedValue}
      </div>
    </div>
  );
};

export default MetricDisplay;