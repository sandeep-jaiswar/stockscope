'use client';

import { useState } from 'react';
import { PlayIcon, BoltIcon, CalendarIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Stock, BacktestResult } from '@/lib/types';
import { formatCurrency, formatPercentage, generateId } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';
import LoadingSpinner from '@/components/ui/loading-spinner';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Badge from '@/components/ui/badge';

interface BacktestFormProps {
  stock: Stock;
}

export default function BacktestForm({ stock }: BacktestFormProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BacktestResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [backtestHistory, setBacktestHistory] = useLocalStorage<BacktestResult[]>('backtest-history', []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
      
      // Generate realistic backtest results
      const totalReturn = -10 + Math.random() * 40; // -10% to +30%
      const annualizedReturn = totalReturn * (365 / 252); // Approximate annualization
      const maxDrawdown = Math.random() * 25; // 0% to 25%
      const sharpeRatio = 0.5 + Math.random() * 2; // 0.5 to 2.5
      const winRate = 40 + Math.random() * 40; // 40% to 80%
      const totalTrades = Math.floor(20 + Math.random() * 100);
      const initialCapital = 10000;
      const finalValue = initialCapital * (1 + totalReturn / 100);
      const benchmarkReturn = -5 + Math.random() * 20; // Market benchmark

      const backtestResult: BacktestResult = {
        id: generateId(),
        strategy: query,
        symbol: stock.symbol,
        totalReturn,
        annualizedReturn,
        maxDrawdown,
        sharpeRatio,
        winRate,
        totalTrades,
        startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date().toISOString(),
        initialCapital,
        finalValue,
        benchmarkReturn,
        createdAt: new Date().toISOString()
      };

      setResult(backtestResult);
      
      // Save to history
      const newHistory = [backtestResult, ...backtestHistory.slice(0, 9)]; // Keep last 10
      setBacktestHistory(newHistory);
      
    } catch (error) {
      setError('Backtest failed. Please try again with different parameters.');
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQueries = [
    `Buy ${stock.symbol} when RSI < 30, sell when RSI > 70`,
    `Dollar cost average $1000 monthly into ${stock.symbol}`,
    `Buy ${stock.symbol} on 5% dips, sell on 10% gains`,
    `Moving average crossover strategy for ${stock.symbol}`
  ];

  if (isMinimized) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BoltIcon className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Strategy Backtester</span>
          </div>
          <button
            onClick={() => setIsMinimized(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <Card variant="elevated" padding="none" className="bg-white shadow-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <BoltIcon className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Strategy Backtester</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="strategy" className="block text-sm font-medium text-gray-700 mb-2">
              Strategy Description
            </label>
            <textarea
              id="strategy"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Example: "Buy ${stock.symbol} when the stock drops 10% from its 30-day high, hold for 6 months, then sell"`}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              disabled={isLoading}
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Examples</h3>
            <div className="space-y-1">
              {sampleQueries.map((sample, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setQuery(sample)}
                  disabled={isLoading}
                  className="text-left w-full p-2 text-xs text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors duration-200 disabled:opacity-50"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            loading={isLoading}
            disabled={!query.trim()}
            icon={!isLoading ? <PlayIcon className="h-4 w-4" /> : undefined}
          >
            {isLoading ? 'Running Backtest...' : 'Execute Backtest'}
          </Button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <InformationCircleIcon className="h-4 w-4 text-red-600 mr-2" />
              <p className="text-red-700 text-sm font-medium">Error</p>
            </div>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-sm font-semibold text-green-800 mb-3 flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Backtest Results
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-white p-2 rounded">
                <div className="text-xs text-gray-600">Total Return</div>
                <div className={`text-sm font-bold ${result.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(result.totalReturn)}
                </div>
              </div>
              <div className="bg-white p-2 rounded">
                <div className="text-xs text-gray-600">Sharpe Ratio</div>
                <div className="text-sm font-bold text-gray-900">{result.sharpeRatio.toFixed(2)}</div>
              </div>
              <div className="bg-white p-2 rounded">
                <div className="text-xs text-gray-600">Max Drawdown</div>
                <div className="text-sm font-bold text-red-600">-{result.maxDrawdown.toFixed(1)}%</div>
              </div>
              <div className="bg-white p-2 rounded">
                <div className="text-xs text-gray-600">Win Rate</div>
                <div className="text-sm font-bold text-gray-900">{result.winRate.toFixed(1)}%</div>
              </div>
            </div>

            <div className="bg-white p-3 rounded">
              <h4 className="text-xs font-medium text-gray-700 mb-1">Summary</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Strategy generated <strong>{formatPercentage(result.totalReturn)}</strong> return 
                with <strong>{result.totalTrades}</strong> trades. 
                {result.totalReturn > result.benchmarkReturn ? 
                  ` Outperformed benchmark by ${formatPercentage(result.totalReturn - result.benchmarkReturn)}.` :
                  ` Underperformed benchmark by ${formatPercentage(result.benchmarkReturn - result.totalReturn)}.`
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}