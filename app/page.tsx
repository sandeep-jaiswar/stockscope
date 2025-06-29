'use client';

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
import Card from '@/components/ui/card';

export default function Home() {
  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: "Smart Search",
      description: "Intelligent stock search with real-time suggestions, recent searches, and comprehensive company data.",
      color: "primary"
    },
    {
      icon: ChartBarIcon,
      title: "Advanced Analytics",
      description: "Interactive charts, technical indicators, and detailed financial metrics with industry comparisons.",
      color: "success"
    },
    {
      icon: ArrowTrendingUpIcon,
      title: "Strategy Backtesting",
      description: "Test trading strategies with historical data using natural language queries and get detailed performance analysis.",
      color: "warning"
    },
    {
      icon: BoltIcon,
      title: "Real-time Data",
      description: "Live market data, price alerts, and instant updates to keep you informed of market movements.",
      color: "error"
    },
    {
      icon: ShieldCheckIcon,
      title: "Risk Analysis",
      description: "Comprehensive risk metrics including beta, volatility, and drawdown analysis for informed decisions.",
      color: "secondary"
    },
    {
      icon: ClockIcon,
      title: "Portfolio Tracking",
      description: "Track your investments, monitor performance, and get personalized insights and recommendations.",
      color: "primary"
    }
  ];

  const stats = [
    { label: "Stocks Tracked", value: "10,000+", icon: BuildingOfficeIcon },
    { label: "Backtests Run", value: "50,000+", icon: ChartBarIcon },
    { label: "Active Users", value: "25,000+", icon: UserGroupIcon },
    { label: "Success Rate", value: "94%", icon: CheckBadgeIcon }
  ];

  return (
    <div className="min-h-screen gradient-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Logo and Title */}
            <div className="flex items-center justify-center mb-8 animate-fade-in">
              <div className="p-4 gradient-primary rounded-2xl shadow-lg mr-4">
                <ArrowTrendingUpIcon className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                StockScope
              </h1>
            </div>
            
            <div className="animate-slide-up">
              <p className="text-xl md:text-2xl text-secondary-600 mb-4 max-w-3xl mx-auto leading-relaxed text-balance">
                Professional-grade stock analysis and backtesting platform
              </p>
              
              <p className="text-lg text-secondary-500 mb-12 max-w-2xl mx-auto text-balance">
                Search any stock, analyze technical indicators, backtest trading strategies, 
                and make data-driven investment decisions with our comprehensive financial tools.
              </p>
            </div>

            {/* Search Section */}
            <div className="mb-16 animate-scale-in">
              <SearchBar placeholder="Search stocks by symbol, name, or industry..." />
              <p className="text-sm text-secondary-500 mt-3 flex items-center justify-center gap-2">
                <SparklesIcon className="h-4 w-4" />
                Try searching for: AAPL, Tesla, Microsoft, or "Technology"
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                
                return (
                  <Card
                    key={index}
                    variant="default"
                    padding="lg"
                    hover
                    className="glass animate-fade-in group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`p-3 bg-${feature.color}-100 text-${feature.color}-600 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">{feature.title}</h3>
                    <p className="text-secondary-600 leading-relaxed">{feature.description}</p>
                  </Card>
                );
              })}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index} 
                    className="text-center animate-fade-in"
                    style={{ animationDelay: `${(index + 6) * 100}ms` }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <Icon className="h-6 w-6 text-primary-600 mr-2" />
                      <div className="text-3xl font-bold text-secondary-900">{stat.value}</div>
                    </div>
                    <div className="text-sm text-secondary-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="relative">
        <svg
          className="absolute bottom-0 w-full h-20 text-white dark:text-secondary-900"
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