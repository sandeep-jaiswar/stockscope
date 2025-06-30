'use client';

import { useState } from 'react';
import { 
  ChartBarIcon, 
  MagnifyingGlassIcon, 
  BoltIcon, 
  ShieldCheckIcon, 
  ClockIcon,
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  SparklesIcon,
  MicrophoneIcon,
  CameraIcon
} from '@heroicons/react/24/outline';
import SearchBar from '@/components/search-bar';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const quickSearches = [
    "AAPL stock analysis",
    "Tesla backtest strategy", 
    "Microsoft dividend history",
    "NVIDIA technical indicators",
    "S&P 500 momentum strategy",
    "Apple vs Google comparison"
  ];

  const stats = [
    { label: "Stocks Tracked", value: "10,000+", icon: BuildingOfficeIcon },
    { label: "Backtests Run", value: "50,000+", icon: ChartBarIcon },
    { label: "Active Users", value: "25,000+", icon: UserGroupIcon },
    { label: "Success Rate", value: "94%", icon: CheckBadgeIcon }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-6">
          <button className="text-sm text-gray-700 hover:underline">About</button>
          <button className="text-sm text-gray-700 hover:underline">Features</button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-sm text-gray-700 hover:underline">Sign in</button>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">B</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-7xl font-normal text-center mb-2">
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
          </h1>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mb-8">
          <SearchBar placeholder="Search stocks, strategies, or ask questions..." />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-12">
          <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded border border-gray-300 transition-colors duration-200 font-medium">
            Stock Analysis
          </button>
          <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded border border-gray-300 transition-colors duration-200 font-medium">
            I'm Feeling Lucky
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
            {quickSearches.slice(0, 4).map((search, index) => (
              <button
                key={index}
                className="px-3 py-1 text-sm text-blue-600 hover:underline"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-6">
              <span>United States</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 px-6 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-600">
              <button className="hover:underline">Advertising</button>
              <button className="hover:underline">Business</button>
              <button className="hover:underline">How BacktestBuddy works</button>
            </div>
            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-600">
              <button className="hover:underline">Privacy</button>
              <button className="hover:underline">Terms</button>
              <button className="hover:underline">Settings</button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white border-t border-gray-200 px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-center">
                      <Icon className="h-6 w-6 text-blue-600 mr-2" />
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}