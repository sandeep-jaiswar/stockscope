'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Star, Bell, Share, Settings, Eye } from 'lucide-react';
import { Stock, ChartData } from '@/lib/types';
import { cn, formatCurrency, formatPercentage, getChangeColorClass, getRelativeTime } from '@/lib/utils';
import { generateChartData, getTechnicalIndicators, getIndustryPeers } from '@/lib/stock-data';
import { TIMEFRAMES } from '@/lib/constants';
import StockChart from '@/components/ui/chart';
import LoadingSpinner from '@/components/ui/loading-spinner';
import MetricDisplay from '@/components/ui/metric-display';

interface StockDetailsProps {
  stock: Stock;
}

export default function StockDetails({ stock }: StockDetailsProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const isPositive = stock.change >= 0;
  const technicalIndicators = getTechnicalIndicators(stock.symbol);
  const industryPeers = getIndustryPeers(stock.symbol);

  useEffect(() => {
    const loadChartData = async () => {
      setIsLoadingChart(true);
      try {
        const timeframe = TIMEFRAMES.find(t => t.value === selectedTimeframe);
        const days = timeframe?.days || 1;
        const data = generateChartData(stock.symbol, days);
        setChartData(data);
      } catch (error) {
        console.error('Error loading chart data:', error);
      } finally {
        setIsLoadingChart(false);
      }
    };

    loadChartData();
  }, [selectedTimeframe, stock.symbol]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'technicals', label: 'Technicals' },
    { id: 'fundamentals', label: 'Fundamentals' },
    { id: 'news', label: 'News' }
  ];

  const timeframes = ['1D', '5D', '1M', '3M', '6M', '1Y', '2Y', '5Y'];

  const keyMetrics = [
    { label: 'Market Cap', value: stock.marketCap },
    { label: 'P/E Ratio', value: stock.pe, format: 'number' as const },
    { label: 'EPS', value: stock.eps, format: 'currency' as const },
    { label: '52W High', value: stock.high52w, format: 'currency' as const },
    { label: '52W Low', value: stock.low52w, format: 'currency' as const },
    { label: 'Beta', value: stock.beta, format: 'number' as const },
    { label: 'Dividend', value: stock.dividend, format: 'currency' as const },
    { label: 'Volume', value: stock.volume.toLocaleString() }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-secondary-900">{stock.symbol}</h1>
                <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                  NASDAQ
                </span>
              </div>
              <div className="hidden md:block text-sm text-secondary-600">
                {stock.name} • {stock.sector}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-secondary-400 hover:text-secondary-600 rounded-lg hover:bg-secondary-100 transition-colors duration-200">
                <Star className="h-5 w-5" />
              </button>
              <button className="p-2 text-secondary-400 hover:text-secondary-600 rounded-lg hover:bg-secondary-100 transition-colors duration-200">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-secondary-400 hover:text-secondary-600 rounded-lg hover:bg-secondary-100 transition-colors duration-200">
                <Share className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Price Display */}
        <div className="px-6 py-4 border-t border-secondary-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div>
                <div className="text-3xl font-bold text-secondary-900">
                  {formatCurrency(stock.price)}
                </div>
                <div className={cn(
                  "flex items-center text-lg font-semibold",
                  getChangeColorClass(stock.change)
                )}>
                  {isPositive ? (
                    <TrendingUp className="h-5 w-5 mr-1" />
                  ) : (
                    <TrendingDown className="h-5 w-5 mr-1" />
                  )}
                  {formatCurrency(stock.change)} ({formatPercentage(stock.changePercent, 2)})
                </div>
              </div>
              <div className="text-sm text-secondary-600 space-y-1">
                <div>Volume: <span className="text-secondary-900 font-medium">{stock.volume.toLocaleString()}</span></div>
                <div>Updated: <span className="text-secondary-900 font-medium">{getRelativeTime(stock.lastUpdated)}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200",
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Key Metrics Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl border border-secondary-200 p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Key Metrics</h3>
              <div className="space-y-3">
                {keyMetrics.map((metric) => (
                  <MetricDisplay
                    key={metric.label}
                    label={metric.label}
                    value={metric.value}
                    format={metric.format}
                    size="sm"
                    layout="horizontal"
                    showChange={false}
                  />
                ))}
              </div>
            </div>

            {/* Technical Indicators */}
            {technicalIndicators && (
              <div className="bg-white rounded-xl border border-secondary-200 p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Technical Indicators</h3>
                <div className="space-y-3">
                  <MetricDisplay
                    label="RSI (14)"
                    value={technicalIndicators.rsi.toFixed(1)}
                    size="sm"
                    layout="horizontal"
                    showChange={false}
                  />
                  <MetricDisplay
                    label="MACD"
                    value={technicalIndicators.macd.toFixed(2)}
                    size="sm"
                    layout="horizontal"
                    showChange={false}
                  />
                  <MetricDisplay
                    label="SMA 20"
                    value={technicalIndicators.sma20}
                    format="currency"
                    size="sm"
                    layout="horizontal"
                    showChange={false}
                  />
                  <MetricDisplay
                    label="SMA 50"
                    value={technicalIndicators.sma50}
                    format="currency"
                    size="sm"
                    layout="horizontal"
                    showChange={false}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Main Chart Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-secondary-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4 md:mb-0">Price Chart</h2>
                <div className="flex flex-wrap gap-2">
                  {timeframes.map((timeframe) => (
                    <button
                      key={timeframe}
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                        selectedTimeframe === timeframe
                          ? "bg-primary-100 text-primary-700"
                          : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100"
                      )}
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-96">
                {isLoadingChart ? (
                  <div className="flex items-center justify-center h-full">
                    <LoadingSpinner size="lg" />
                  </div>
                ) : (
                  <StockChart
                    data={chartData}
                    symbol={stock.symbol}
                    timeframe={selectedTimeframe}
                    height={384}
                  />
                )}
              </div>
            </div>

            {/* Industry Peers */}
            {industryPeers.length > 0 && (
              <div className="bg-white rounded-xl border border-secondary-200 p-6 mt-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Industry Peers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {industryPeers.map((peer) => (
                    <div
                      key={peer.symbol}
                      className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 cursor-pointer transition-colors duration-200"
                      onClick={() => window.location.href = `/stock/${peer.symbol}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-secondary-900">{peer.symbol}</span>
                        <span className={cn(
                          "text-sm font-medium",
                          getChangeColorClass(peer.change)
                        )}>
                          {formatPercentage(peer.changePercent, 2)}
                        </span>
                      </div>
                      <div className="text-sm text-secondary-600 truncate mb-1">{peer.name}</div>
                      <div className="font-semibold text-secondary-900">{formatCurrency(peer.price)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}