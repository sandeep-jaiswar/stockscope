'use client';

import { useState, useMemo, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Activity, Info, Building2, Calendar, DollarSign, Eye, Settings, Bell, Share, Star } from 'lucide-react';
import { Stock, ChartData } from '@/lib/types';
import { cn, formatCurrency, formatPercentage, formatNumber, getChangeColorClass, getRelativeTime } from '@/lib/utils';
import { generateChartData, getTechnicalIndicators, getIndustryPeers } from '@/lib/stock-data';
import { TIMEFRAMES } from '@/lib/constants';
import StockChart from '@/components/ui/chart';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface StockDetailsProps {
  stock: Stock;
}

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  format?: 'currency' | 'percentage' | 'number';
  size?: 'sm' | 'md';
}

function MetricCard({ label, value, change, format, size = 'md' }: MetricCardProps) {
  const formattedValue = useMemo(() => {
    if (typeof value === 'number') {
      switch (format) {
        case 'currency':
          return formatCurrency(value);
        case 'percentage':
          return formatPercentage(value);
        case 'number':
          return formatNumber(value);
        default:
          return value.toString();
      }
    }
    return value;
  }, [value, format]);

  return (
    <div className={cn(
      "bg-white border border-gray-200 rounded-lg",
      size === 'sm' ? 'p-3' : 'p-4'
    )}>
      <div className="flex items-center justify-between mb-1">
        <span className={cn(
          "text-gray-600 font-medium",
          size === 'sm' ? 'text-xs' : 'text-sm'
        )}>
          {label}
        </span>
        {change !== undefined && (
          <span className={cn(
            "font-medium",
            size === 'sm' ? 'text-xs' : 'text-sm',
            getChangeColorClass(change)
          )}>
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
        )}
      </div>
      <div className={cn(
        "font-bold text-gray-900",
        size === 'sm' ? 'text-sm' : 'text-lg'
      )}>
        {formattedValue}
      </div>
    </div>
  );
}

export default function StockDetails({ stock }: StockDetailsProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const isPositive = stock.change >= 0;
  const technicalIndicators = getTechnicalIndicators(stock.symbol);
  const industryPeers = getIndustryPeers(stock.symbol);

  // Load chart data when timeframe changes
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
    { id: 'news', label: 'News' },
    { id: 'analysis', label: 'Analysis' }
  ];

  const timeframes = ['1D', '5D', '1M', '3M', '6M', '1Y', '2Y', '5Y', 'MAX'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">{stock.symbol}</h1>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                NASDAQ
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {stock.name} • {stock.sector}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Star className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Share className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Price Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div>
              <div className="text-3xl font-bold text-gray-900">
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
            <div className="text-sm text-gray-600">
              <div>Pre-market: <span className="text-gray-900 font-medium">{formatCurrency(stock.price * 1.002)}</span></div>
              <div>After hours: <span className="text-gray-900 font-medium">{formatCurrency(stock.price * 0.998)}</span></div>
            </div>
          </div>
          <div className="text-right text-sm text-gray-600">
            <div>Volume: <span className="text-gray-900 font-medium">{stock.volume.toLocaleString()}</span></div>
            <div>Avg Volume: <span className="text-gray-900 font-medium">{(stock.volume * 0.85).toLocaleString()}</span></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200",
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Quick Stats */}
          <div className="col-span-2 space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Statistics</h3>
              <div className="space-y-3">
                <MetricCard label="Market Cap" value={stock.marketCap} size="sm" />
                <MetricCard label="P/E Ratio" value={stock.pe} format="number" size="sm" />
                <MetricCard label="EPS" value={stock.eps} format="currency" size="sm" />
                <MetricCard label="52W High" value={stock.high52w} format="currency" size="sm" />
                <MetricCard label="52W Low" value={stock.low52w} format="currency" size="sm" />
                <MetricCard label="Beta" value={stock.beta} format="number" size="sm" />
                <MetricCard label="Dividend" value={stock.dividend} format="currency" size="sm" />
              </div>
            </div>

            {/* Technical Indicators */}
            {technicalIndicators && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Technical Indicators</h3>
                <div className="space-y-3">
                  <MetricCard label="RSI (14)" value={technicalIndicators.rsi.toFixed(1)} size="sm" />
                  <MetricCard label="MACD" value={technicalIndicators.macd.toFixed(2)} size="sm" />
                  <MetricCard label="SMA 20" value={technicalIndicators.sma20} format="currency" size="sm" />
                  <MetricCard label="SMA 50" value={technicalIndicators.sma50} format="currency" size="sm" />
                  <MetricCard label="SMA 200" value={technicalIndicators.sma200} format="currency" size="sm" />
                </div>
              </div>
            )}
          </div>

          {/* Main Chart Area */}
          <div className="col-span-7">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Price Chart</h2>
                <div className="flex items-center space-x-2">
                  {timeframes.map((timeframe) => (
                    <button
                      key={timeframe}
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className={cn(
                        "px-3 py-1 text-sm font-medium rounded transition-colors duration-200",
                        selectedTimeframe === timeframe
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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

            {/* Additional Charts Row */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Volume</h3>
                <div className="h-32 bg-gray-50 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Volume Chart</span>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">RSI</h3>
                <div className="h-32 bg-gray-50 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-sm">RSI Chart</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 space-y-6">
            {/* Market Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Market Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Open</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(stock.price * 0.995)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">High</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(stock.price * 1.02)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Low</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(stock.price * 0.98)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Previous Close</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(stock.price - stock.change)}</span>
                </div>
              </div>
            </div>

            {/* News & Analysis */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Latest News</h3>
              <div className="space-y-3">
                <div className="border-l-2 border-blue-500 pl-3">
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {stock.name} Reports Strong Q4 Earnings
                  </div>
                  <div className="text-xs text-gray-500">2 hours ago • MarketWatch</div>
                </div>
                <div className="border-l-2 border-green-500 pl-3">
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    Analyst Upgrades {stock.symbol} to Buy
                  </div>
                  <div className="text-xs text-gray-500">4 hours ago • Bloomberg</div>
                </div>
                <div className="border-l-2 border-yellow-500 pl-3">
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    Sector Outlook Remains Positive
                  </div>
                  <div className="text-xs text-gray-500">1 day ago • Reuters</div>
                </div>
              </div>
            </div>

            {/* Industry Peers */}
            {industryPeers.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Industry Peers</h3>
                <div className="space-y-3">
                  {industryPeers.map((peer) => (
                    <div
                      key={peer.symbol}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                      onClick={() => window.location.href = `/stock/${peer.symbol}`}
                    >
                      <div>
                        <div className="text-sm font-medium text-gray-900">{peer.symbol}</div>
                        <div className="text-xs text-gray-500 truncate">{peer.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(peer.price)}</div>
                        <div className={cn(
                          "text-xs font-medium",
                          getChangeColorClass(peer.change)
                        )}>
                          {formatPercentage(peer.changePercent, 2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analyst Estimates */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Analyst Estimates</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Price Target</span>
                  <span className="text-sm font-medium text-green-600">{formatCurrency(stock.price * 1.15)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Strong Buy</span>
                  <span className="text-sm font-medium text-gray-900">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Buy</span>
                  <span className="text-sm font-medium text-gray-900">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Hold</span>
                  <span className="text-sm font-medium text-gray-900">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sell</span>
                  <span className="text-sm font-medium text-gray-900">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}