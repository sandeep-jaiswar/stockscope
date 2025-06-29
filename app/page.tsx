'use client';

import { TrendingUp, Search, BarChart3, Activity } from 'lucide-react';
import SearchBar from '@/components/search-bar';
import Header from '@/components/header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32">
          <div className="text-center">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Advanced Stock Analysis
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Search any stock, analyze technical indicators, and test your trading strategies with historical data.
              </p>
            </div>

            {/* Search Section */}
            <div className="mb-16">
              <SearchBar />
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                <div className="p-3 bg-blue-100 rounded-xl w-fit mx-auto mb-4">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Search</h3>
                <p className="text-gray-600">
                  Intelligent stock search with real-time suggestions and comprehensive company data.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                <div className="p-3 bg-green-100 rounded-xl w-fit mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Analysis</h3>
                <p className="text-gray-600">
                  Detailed technical indicators, price charts, and comprehensive market metrics.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                <div className="p-3 bg-purple-100 rounded-xl w-fit mx-auto mb-4">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Strategy Backtesting</h3>
                <p className="text-gray-600">
                  Test your trading strategies with historical data using natural language queries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="relative">
        <svg
          className="absolute bottom-0 w-full h-20 text-white"
          fill="currentColor"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
}