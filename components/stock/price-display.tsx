'use client';

import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import { cn, formatCurrency, formatPercentage, getRelativeTime } from '@/lib/utils';
import Badge from '@/components/ui/badge';

interface PriceDisplayProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sector?: string;
  lastUpdated?: string;
  size?: 'sm' | 'md' | 'lg';
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  symbol,
  name,
  price,
  change,
  changePercent,
  sector,
  lastUpdated,
  size = 'lg'
}) => {
  const isPositive = change >= 0;
  
  const sizeClasses = {
    sm: {
      symbol: 'text-xl',
      price: 'text-2xl',
      change: 'text-sm',
      name: 'text-sm'
    },
    md: {
      symbol: 'text-2xl',
      price: 'text-3xl',
      change: 'text-base',
      name: 'text-base'
    },
    lg: {
      symbol: 'text-4xl',
      price: 'text-4xl',
      change: 'text-lg',
      name: 'text-xl'
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className={cn('font-bold text-secondary-900', sizeClasses[size].symbol)}>
              {symbol}
            </h1>
            {sector && (
              <Badge variant="primary" size="md">
                {sector}
              </Badge>
            )}
          </div>
          <p className={cn('text-secondary-600 mb-1', sizeClasses[size].name)}>
            {name}
          </p>
        </div>
        
        <div className="text-left lg:text-right">
          <div className={cn('font-bold text-secondary-900 mb-1', sizeClasses[size].price)}>
            {formatCurrency(price)}
          </div>
          <div className={cn(
            'flex items-center font-semibold lg:justify-end',
            sizeClasses[size].change,
            isPositive ? 'text-success-600' : 'text-error-600'
          )}>
            {isPositive ? (
              <ArrowTrendingUpIcon className="h-5 w-5 mr-1" />
            ) : (
              <ArrowTrendingDownIcon className="h-5 w-5 mr-1" />
            )}
            {formatCurrency(change)} ({formatPercentage(changePercent, 2)})
          </div>
          {lastUpdated && (
            <p className="text-sm text-secondary-500 mt-1">
              Last updated: {getRelativeTime(lastUpdated)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceDisplay;