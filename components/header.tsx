'use client';

import { useRouter, usePathname } from 'next/navigation';
import { TrendingUp, Search, Home, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  showBackButton?: boolean;
  currentStock?: string;
}

export default function Header({ showBackButton = false, currentStock }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Navigation */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-100"
                aria-label="Back to search"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium hidden sm:inline">Back</span>
              </button>
            )}
            
            {/* Breadcrumb for stock pages */}
            {currentStock && (
              <nav className="flex items-center space-x-2 text-sm text-gray-500">
                <button
                  onClick={() => router.push('/')}
                  className="hover:text-gray-700 transition-colors duration-200"
                >
                  Search
                </button>
                <span>/</span>
                <span className="text-gray-900 font-medium">{currentStock}</span>
              </nav>
            )}
          </div>

          {/* Center Section - Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push('/')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
              aria-label="Go to homepage"
            >
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StockScope
              </span>
            </button>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-3">
            {!isHomePage && (
              <button
                onClick={() => router.push('/')}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                  "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
                aria-label="New search"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            )}
            
            {/* Quick actions menu placeholder */}
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}