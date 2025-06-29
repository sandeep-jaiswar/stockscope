'use client';

import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: {
    text: string;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  };
  showBackButton?: boolean;
  actions?: React.ReactNode;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  showBackButton = false,
  actions,
  breadcrumbs
}) => {
  const router = useRouter();

  return (
    <div className="bg-white border-b border-secondary-200 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-secondary-500">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  {crumb.href ? (
                    <button
                      onClick={() => router.push(crumb.href!)}
                      className="hover:text-secondary-700 transition-colors"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className="text-secondary-900 font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                icon={<ArrowLeftIcon className="h-4 w-4" />}
                className="shrink-0"
              >
                Back
              </Button>
            )}
            
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold text-secondary-900">{title}</h1>
                {badge && (
                  <Badge variant={badge.variant} size="md">
                    {badge.text}
                  </Badge>
                )}
              </div>
              {subtitle && (
                <p className="mt-1 text-lg text-secondary-600">{subtitle}</p>
              )}
            </div>
          </div>

          {actions && (
            <div className="flex items-center space-x-3">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;