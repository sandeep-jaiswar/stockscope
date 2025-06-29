'use client';

import { useState, useMemo, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Activity, Info, Building2, Calendar, DollarSign } from 'lucide-react';
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
  icon: React.ComponentType<{ className?: string }>;
  tooltip?: string;
  change?: number;
  format?: 'currency' | 'percentage' | 'number';
}

function MetricCard({ label, value, icon: Icon, tooltip, change, format }: MetricCardProps) {
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
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-200">
            <Icon className="h-4 w-4 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-600">{label}</span>
          {tooltip && (
            <div className="relative group/tooltip">
              <Info className="h-3 w-3 text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                {tooltip}
              </div>
            </div>
          )}
        </div>
        {change !== undefined && (
          <span className={cn("text-xs font-medium", getChangeColorClass(change))}>
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
        )}
      </div>
      <div className="text-xl font-bold text-gray-900">{formattedValue}</div>
    </div>
  );
}

export default function StockDetails({ stock }: StockDetailsProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  
  const isPositive = stock.change >= 0;
  const technicalIndicators = getTechnicalIndicators(stock.symbol);
  const industryPeers = getIndustryPeers(stock.symbol);

  // Load chart data when timeframe changes
  useEffect(() => {
    const loadChartData = async () => {
      setIsLoadingChart(true);
      try {
        const timeframe = TIMEFRAMES.find(t => t.value === selectedTimeframe);
        const days = timeframe?.days || 30;
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

  const keyMetrics = [
    { 
      label: 'Market Cap', 
      value: stock.marketCap, 
      icon: Building2,
      tooltip: 'Total market value of all outstanding shares'
    },
    { 
      label: 'P/E Ratio', 
      value: stock.pe, 
      icon: Activity,
      tooltip: 'Price-to-earnings ratio indicates valuation',
      format: 'number' as const
    },
    { 
      label: 'EPS', 
      value: stock.eps, 
      icon: DollarSign,
      tooltip: 'Earnings per share over the last 12 months',
      format: 'currency' as const
    },
    { 
      label: 'Volume', 
      value: stock.volume.toLocaleString(), 
      icon: Activity,
      tooltip: 'Number of shares traded today'
    },
    { 
      label: '52W High', 
      value: stock.high52w, 
      icon: TrendingUp,
      tooltip: 'Highest price in the last 52 weeks',
      format: 'currency' as const
    },
    { 
      label: '52W Low', 
      value: stock.low52w, 
      icon: TrendingDown,
      tooltip: 'Lowest price in the last 52 weeks',
      format: 'currency' as const
    },
    { 
      label: 'Dividend Yield', 
      value: stock.dividend > 0 ? ((stock.dividend / stock.price) * 100) : 0, 
      icon: DollarSign,
      tooltip: 'Annual dividend as percentage of current price',
      format: 'percentage' as const
    },
    { 
      label: 'Beta', 
      value: stock.beta, 
      icon: Activity,
      tooltip: 'Measure of stock volatility relative to market',
      format: 'number' as const
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stock Header */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-4xl font-bold text-gray-900">{stock.symbol}</h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {stock.sector}
              </span>
            </div>
            <p className="text-xl text-gray-600 mb-1">{stock.name}</p>
            <p className="text-sm text-gray-500">{stock.industry}</p>
          </div>
          <div className="text-left lg:text-right">
            <div className="text-4xl font-bold text-gray-900 mb-1">
              {formatCurrency(stock.price)}
            </div>
            <div className={cn(
              "flex items-center text-lg font-semibold lg:justify-end",
              getChangeColorClass(stock.change)
            )}>
              {isPositive ? (
                <TrendingUp className="h-5 w-5 mr-1" />
              ) : (
                <TrendingDown className="h-5 w-5 mr-1" />
              )}
              {formatPercentage(stock.change, 2)} ({formatPercentage(stock.changePercent, 2)})
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {getRelativeTime(stock.lastUpdated)}
            </p>
          </div>
        </div>

        {/* Company Description */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">About {stock.name}</h3>
          <p className="text-gray-700 leading-relaxed">{stock.description}</p>
        </div>

        {/* Chart Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Price Chart</h2>
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {TIMEFRAMES.map((timeframe) => (
                <button
                  key={timeframe.value}
                  onClick={() => setSelectedTimeframe(timeframe.value)}
                  className={cn(
                    "px-3 py-1 text-sm font-medium rounded-md transition-all duration-200",
                    selectedTimeframe === timeframe.value
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
            {isLoadingChart ? (
              <div className="flex items-center justify-center h-[300px]">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <StockChart
                data={chartData}
                symbol={stock.symbol}
                timeframe={selectedTimeframe}
                height={300}
              />
            )}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </div>

      {/* Technical Indicators */}
      {technicalIndicators && (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricCard
              label="RSI (14)"
              value={technicalIndicators.rsi}
              icon={Activity}
              tooltip="Relative Strength Index - momentum oscillator (0-100)"
              format="number"
            />
            <MetricCard
              label="MACD"
              value={technicalIndicators.macd}
              icon={TrendingUp}
              tooltip="Moving Average Convergence Divergence"
              format="number"
            />
            <MetricCard
              label="SMA 20"
              value={technicalIndicators.sma20}
              icon={BarChart3}
              tooltip="20-day Simple Moving Average"
              format="currency"
            />
            <MetricCard
              label="SMA 50"
              value={technicalIndicators.sma50}
              icon={BarChart3}
              tooltip="50-day Simple Moving Average"
              format="currency"
            />
            <MetricCard
              label="SMA 200"
              value={technicalIndicators.sma200}
              icon={BarChart3}
              tooltip="200-day Simple Moving Average"
              format="currency"
            />
            <MetricCard
              label="Bollinger Upper"
              value={technicalIndicators.bollinger.upper}
              icon={TrendingUp}
              tooltip="Bollinger Band Upper Limit"
              format="currency"
            />
          </div>
        </div>
      )}

      {/* Industry Peers */}
      {industryPeers.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Industry Peers</h2>
          <div className="grid gap-4">
            {industryPeers.map((peer) => (
              <div
                key={peer.symbol}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={() => window.location.href = `/stock/${peer.symbol}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{peer.symbol}</div>
                    <div className="text-sm text-gray-600">{peer.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{formatCurrency(peer.price)}</div>
                  <div className={cn(
                    "text-sm font-medium",
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
    </div>
  );
}