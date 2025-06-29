'use client';

import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Card from '@/components/ui/card';
import Tooltip from '@/components/ui/tooltip';
import { cn, formatCurrency, formatPercentage, formatNumber } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  tooltip?: string;
  change?: number;
  format?: 'currency' | 'percentage' | 'number';
  trend?: 'up' | 'down' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon: Icon,
  tooltip,
  change,
  format,
  trend,
  size = 'md'
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

  const trendColors = {
    up: 'text-success-600',
    down: 'text-error-600',
    neutral: 'text-secondary-600'
  };

  const sizeClasses = {
    sm: {
      card: 'p-4',
      icon: 'h-4 w-4',
      value: 'text-lg',
      label: 'text-xs'
    },
    md: {
      card: 'p-6',
      icon: 'h-5 w-5',
      value: 'text-xl',
      label: 'text-sm'
    },
    lg: {
      card: 'p-8',
      icon: 'h-6 w-6',
      value: 'text-2xl',
      label: 'text-base'
    }
  };

  return (
    <Card 
      variant="gradient" 
      padding="none"
      hover
      className={cn('group', sizeClasses[size].card)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary-100 text-primary-600 rounded-lg group-hover:bg-primary-200 transition-colors duration-200">
            <Icon className={sizeClasses[size].icon} />
          </div>
          <span className={cn('font-medium text-secondary-600', sizeClasses[size].label)}>
            {label}
          </span>
          {tooltip && (
            <Tooltip content={tooltip}>
              <InformationCircleIcon className="h-3 w-3 text-secondary-400 cursor-help" />
            </Tooltip>
          )}
        </div>
        {change !== undefined && (
          <span className={cn('text-xs font-medium', trendColors[trend || 'neutral'])}>
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
        )}
      </div>
      <div className={cn('font-bold text-secondary-900', sizeClasses[size].value)}>
        {formattedValue}
      </div>
    </Card>
  );
};

export default MetricCard;