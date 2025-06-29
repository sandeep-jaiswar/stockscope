'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { TrendingUp, Search, Menu, X, Home, BarChart3, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchBar from './search-bar';

interface HeaderProps {
  showBackButton?: boolean;
  currentStock?: string;
}

export default function Header({ showBackButton = false, currentStock }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Markets', href: '/markets', icon: BarChart3 },
    { name: 'Watchlist', href: '/watchlist', icon: Clock },
  ];

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - Logo & Navigation */}
            <div className="flex items-center space-x-8">
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

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <button
                      key={item.name}
                      onClick={() => router.push(item.href)}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200",
                        isActive
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Center Section - Breadcrumb */}
            {currentStock && (
              <nav className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
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

            {/* Right Section - Search & Actions */}
            <div className="flex items-center space-x-3">
              {/* Desktop Search */}
              <div className="hidden lg:block">
                {!isHomePage && (
                  <div className="w-80">
                    <SearchBar placeholder="Search another stock..." />
                  </div>
                )}
              </div>

              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="lg:hidden flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                aria-label="Open search"
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

              {/* User Menu Placeholder */}
              <div className="hidden sm:block w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        router.push(item.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-all duration-200",
                        isActive
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsSearchOpen(false)} />
          <div className="relative bg-white p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Search Stocks</h2>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SearchBar 
              placeholder="Search stocks by symbol, name, or industry..."
              autoFocus
            />
          </div>
        </div>
      )}
    </>
  );
}