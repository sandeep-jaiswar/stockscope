'use client';

import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react';
import { Stock } from '@/lib/stock-data';
import { cn } from '@/lib/utils';

interface StockDetailsProps {
  stock: Stock;
}

export default function StockDetails({ stock }: StockDetailsProps) {
  const isPositive = stock.change >= 0;

  const metrics = [
    { label: 'Market Cap', value: stock.marketCap, icon: BarChart3 },
    { label: 'P/E Ratio', value: stock.pe.toFixed(1), icon: Activity },
    { label: 'EPS', value: `$${stock.eps.toFixed(2)}`, icon: TrendingUp },
    { label: 'Volume', value: stock.volume.toLocaleString(), icon: Activity },
    { label: '52W High', value: `$${stock.high52w.toFixed(2)}`, icon: TrendingUp },
    { label: '52W Low', value: `$${stock.low52w.toFixed(2)}`, icon: TrendingDown },
    { label: 'Dividend', value: stock.dividend > 0 ? `$${stock.dividend.toFixed(2)}` : 'N/A', icon: Activity },
    { label: 'Beta', value: stock.beta.toFixed(2), icon: Activity },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{stock.symbol}</h1>
            <p className="text-xl text-gray-600">{stock.name}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-gray-900 mb-1">
              ${stock.price.toFixed(2)}
            </div>
            <div className={cn(
              "flex items-center text-lg font-semibold",
              isPositive ? "text-green-600" : "text-red-600"
            )}>
              {isPositive ? (
                <TrendingUp className="h-5 w-5 mr-1" />
              ) : (
                <TrendingDown className="h-5 w-5 mr-1" />
              )}
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>

        {/* Price Chart Placeholder */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-600">Interactive Price Chart</p>
              <p className="text-sm text-gray-500 mt-2">Chart integration would go here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Metrics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{metric.label}</span>
                </div>
                <div className="text-xl font-bold text-gray-900">{metric.value}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}