'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  ArrowTrendingUpIcon, 
  MagnifyingGlassIcon, 
  Bars3Icon, 
  XMarkIcon, 
  HomeIcon, 
  ChartBarIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import SearchBar from './search-bar';
import Button from './ui/button';
import Card from './ui/card';

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
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Markets', href: '/markets', icon: ChartBarIcon },
    { name: 'Watchlist', href: '/watchlist', icon: ClockIcon },
  ];

  return (
    <>
      <header className="glass sticky top-0 z-50 border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - Logo & Navigation */}
            <div className="flex items-center space-x-8">
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
                aria-label="Go to homepage"
              >
                <div className="p-2 gradient-primary rounded-xl shadow-lg">
                  <ArrowTrendingUpIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">
                  <span className="text-blue-500">B</span>
                  <span className="text-red-500">a</span>
                  <span className="text-yellow-500">c</span>
                  <span className="text-blue-500">k</span>
                  <span className="text-green-500">t</span>
                  <span className="text-red-500">e</span>
                  <span className="text-blue-500">s</span>
                  <span className="text-yellow-500">t</span>
                  <span className="text-green-500">B</span>
                  <span className="text-red-500">u</span>
                  <span className="text-blue-500">d</span>
                  <span className="text-yellow-500">d</span>
                  <span className="text-green-500">y</span>
                </span>
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Button
                      key={item.name}
                      variant={isActive ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => router.push(item.href)}
                      icon={<Icon className="h-4 w-4" />}
                      className="gap-2"
                    >
                      {item.name}
                    </Button>
                  );
                })}
              </nav>
            </div>

            {/* Center Section - Breadcrumb */}
            {currentStock && (
              <nav className="hidden sm:flex items-center space-x-2 text-sm text-secondary-500">
                <button
                  onClick={() => router.push('/')}
                  className="hover:text-secondary-700 transition-colors duration-200"
                >
                  Search
                </button>
                <span>/</span>
                <span className="text-secondary-900 font-medium">{currentStock}</span>
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                icon={<MagnifyingGlassIcon className="h-4 w-4" />}
                className="lg:hidden"
                aria-label="Open search"
              />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                icon={isMobileMenuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
                className="md:hidden"
                aria-label="Toggle menu"
              />

              {/* User Avatar Placeholder */}
              <div className="hidden sm:block w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">B</span>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-secondary-200 py-4">
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Button
                      key={item.name}
                      variant={isActive ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => {
                        router.push(item.href);
                        setIsMobileMenuOpen(false);
                      }}
                      icon={<Icon className="h-4 w-4" />}
                      fullWidth
                      className="justify-start gap-3"
                    >
                      {item.name}
                    </Button>
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
          <Card variant="default" padding="lg" className="relative m-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-secondary-900">Search Stocks</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(false)}
                icon={<XMarkIcon className="h-5 w-5" />}
              />
            </div>
            <SearchBar 
              placeholder="Search stocks by symbol, name, or industry..."
              autoFocus
            />
          </Card>
        </div>
      )}
    </>
  );
}