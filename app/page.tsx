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
  SparklesIcon
} from '@heroicons/react/24/outline';
import SearchBar from '@/components/search-bar';

export default function Home() {
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

  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: "Smart Search",
      description: "Intelligent stock search with real-time suggestions and comprehensive data."
    },
    {
      icon: ChartBarIcon,
      title: "Advanced Analytics", 
      description: "Interactive charts, technical indicators, and detailed financial metrics."
    },
    {
      icon: BoltIcon,
      title: "Strategy Backtesting",
      description: "Test trading strategies with historical data and get performance analysis."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-secondary-200">
        <div className="flex items-center space-x-6">
          <button className="text-sm text-secondary-700 hover:text-secondary-900 transition-colors duration-200">About</button>
          <button className="text-sm text-secondary-700 hover:text-secondary-900 transition-colors duration-200">Features</button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-sm text-secondary-700 hover:text-secondary-900 transition-colors duration-200">Sign in</button>
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">B</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl font-normal text-center mb-4">
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
          <p className="text-xl text-secondary-600 text-center max-w-2xl mx-auto">
            Professional stock analysis and backtesting platform for informed investment decisions
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mb-8">
          <SearchBar 
            placeholder="Search stocks, strategies, or ask questions..." 
            variant="default"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button className="px-6 py-3 bg-secondary-100 hover:bg-secondary-200 text-secondary-800 rounded-lg border border-secondary-300 transition-all duration-200 font-medium">
            Stock Analysis
          </button>
          <button className="px-6 py-3 bg-secondary-100 hover:bg-secondary-200 text-secondary-800 rounded-lg border border-secondary-300 transition-all duration-200 font-medium">
            I'm Feeling Lucky
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="text-center mb-16">
          <p className="text-sm text-secondary-600 mb-4">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
            {quickSearches.map((search, index) => (
              <button
                key={index}
                className="px-4 py-2 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:bg-secondary-50 transition-colors duration-200"
              >
                <div className="p-3 bg-primary-100 text-primary-600 rounded-xl w-fit mx-auto mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">{feature.title}</h3>
                <p className="text-secondary-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary-100 border-t border-secondary-200">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between text-sm text-secondary-600">
            <span>United States</span>
          </div>
        </div>
        <div className="border-t border-secondary-200 px-6 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-secondary-600">
              <button className="hover:text-secondary-900 transition-colors duration-200">Advertising</button>
              <button className="hover:text-secondary-900 transition-colors duration-200">Business</button>
              <button className="hover:text-secondary-900 transition-colors duration-200">How BacktestBuddy works</button>
            </div>
            <div className="flex flex-wrap items-center space-x-6 text-sm text-secondary-600">
              <button className="hover:text-secondary-900 transition-colors duration-200">Privacy</button>
              <button className="hover:text-secondary-900 transition-colors duration-200">Terms</button>
              <button className="hover:text-secondary-900 transition-colors duration-200">Settings</button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white border-t border-secondary-200 px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary-600 mr-2" />
                      <div className="text-2xl font-bold text-secondary-900">{stat.value}</div>
                    </div>
                    <div className="text-sm text-secondary-600">{stat.label}</div>
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