'use client';

import { TrendingUp, Search, BarChart3, Activity, Zap, Shield, Clock } from 'lucide-react';
import SearchBar from '@/components/search-bar';

export default function Home() {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Intelligent stock search with real-time suggestions, recent searches, and comprehensive company data.",
      color: "blue"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Interactive charts, technical indicators, and detailed financial metrics with industry comparisons.",
      color: "green"
    },
    {
      icon: Activity,
      title: "Strategy Backtesting",
      description: "Test trading strategies with historical data using natural language queries and get detailed performance analysis.",
      color: "purple"
    },
    {
      icon: Zap,
      title: "Real-time Data",
      description: "Live market data, price alerts, and instant updates to keep you informed of market movements.",
      color: "yellow"
    },
    {
      icon: Shield,
      title: "Risk Analysis",
      description: "Comprehensive risk metrics including beta, volatility, and drawdown analysis for informed decisions.",
      color: "red"
    },
    {
      icon: Clock,
      title: "Portfolio Tracking",
      description: "Track your investments, monitor performance, and get personalized insights and recommendations.",
      color: "indigo"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 bg-blue-100 text-blue-600",
      green: "from-green-500 to-green-600 bg-green-100 text-green-600",
      purple: "from-purple-500 to-purple-600 bg-purple-100 text-purple-600",
      yellow: "from-yellow-500 to-yellow-600 bg-yellow-100 text-yellow-600",
      red: "from-red-500 to-red-600 bg-red-100 text-red-600",
      indigo: "from-indigo-500 to-indigo-600 bg-indigo-100 text-indigo-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Logo and Title */}
            <div className="flex items-center justify-center mb-8">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mr-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StockScope
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              Professional-grade stock analysis and backtesting platform
            </p>
            
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Search any stock, analyze technical indicators, backtest trading strategies, 
              and make data-driven investment decisions with our comprehensive financial tools.
            </p>

            {/* Search Section */}
            <div className="mb-16">
              <SearchBar placeholder="Search stocks by symbol, name, or industry..." />
              <p className="text-sm text-gray-500 mt-3">
                Try searching for: AAPL, Tesla, Microsoft, or "Technology"
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const colorClasses = getColorClasses(feature.color);
                const [gradientClasses, bgClass, textClass] = colorClasses.split(' ');
                
                return (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group hover:-translate-y-1"
                  >
                    <div className={`p-3 ${bgClass} rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 ${textClass}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Stats Section */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { label: "Stocks Tracked", value: "10,000+" },
                { label: "Backtests Run", value: "50,000+" },
                { label: "Active Users", value: "25,000+" },
                { label: "Success Rate", value: "94%" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
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