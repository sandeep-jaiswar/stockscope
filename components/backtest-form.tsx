'use client';

import { useState } from 'react';
import { PlayIcon, BoltIcon, CalendarIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
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
    `Moving average crossover strategy for ${stock.symbol}`,
    `Buy ${stock.symbol} when price breaks above 20-day SMA`,
    `Momentum strategy: buy ${stock.symbol} on 3-day winning streaks`
  ];

  const clearHistory = () => {
    setBacktestHistory([]);
  };

  return (
    <div className="space-y-6">
      {/* Main Backtest Form */}
      <Card variant="elevated" padding="xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-secondary-900 mb-3">Strategy Backtester</h2>
          <p className="text-secondary-600 text-lg">
            Describe your trading strategy in plain English and get comprehensive performance analysis.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="strategy" className="block text-sm font-semibold text-secondary-700 mb-3">
              Strategy Description
            </label>
            <textarea
              id="strategy"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Example: "Buy ${stock.symbol} when the stock drops 10% from its 30-day high, hold for 6 months, then sell"`}
              rows={4}
              className="w-full px-4 py-3 border border-secondary-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all duration-200"
              disabled={isLoading}
            />
          </div>

          <Card variant="gradient" padding="lg">
            <h3 className="text-lg font-semibold text-secondary-800 mb-4 flex items-center">
              <BoltIcon className="h-5 w-5 text-primary-600 mr-2" />
              Strategy Examples
            </h3>
            <div className="grid gap-3">
              {sampleQueries.map((sample, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setQuery(sample)}
                  disabled={isLoading}
                  className="text-left p-3 bg-white rounded-lg hover:bg-primary-50 border border-secondary-200 hover:border-primary-300 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sample}
                </button>
              ))}
            </div>
          </Card>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={!query.trim()}
            icon={!isLoading ? <PlayIcon className="h-5 w-5" /> : undefined}
          >
            {isLoading ? 'Running Backtest...' : 'Execute Backtest'}
          </Button>
        </form>

        {error && (
          <Card variant="outlined" padding="md" className="mt-6 border-error-300 bg-error-50">
            <div className="flex items-center">
              <InformationCircleIcon className="h-5 w-5 text-error-600 mr-2" />
              <p className="text-error-700 font-medium">Error</p>
            </div>
            <p className="text-error-600 mt-1">{error}</p>
          </Card>
        )}

        {result && (
          <Card variant="gradient" padding="lg" className="mt-8 bg-gradient-to-br from-success-50 to-success-100 border-success-200">
            <h3 className="text-lg font-semibold text-success-800 mb-4 flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Backtest Results
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card variant="default" padding="md">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-600">Total Return</span>
                  <Badge variant={result.totalReturn >= 0 ? 'success' : 'error'} size="md">
                    {formatPercentage(result.totalReturn)}
                  </Badge>
                </div>
              </Card>
              
              <Card variant="default" padding="md">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-600">Sharpe Ratio</span>
                  <span className="font-bold text-secondary-900">{result.sharpeRatio.toFixed(2)}</span>
                </div>
              </Card>
              
              <Card variant="default" padding="md">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-600">Max Drawdown</span>
                  <Badge variant="error" size="md">
                    -{result.maxDrawdown.toFixed(1)}%
                  </Badge>
                </div>
              </Card>
              
              <Card variant="default" padding="md">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-600">Win Rate</span>
                  <span className="font-bold text-secondary-900">{result.winRate.toFixed(1)}%</span>
                </div>
              </Card>
            </div>

            <Card variant="default" padding="md">
              <h4 className="font-semibold text-secondary-900 mb-2">Performance Summary</h4>
              <p className="text-secondary-700 text-sm leading-relaxed">
                Strategy generated <strong>{formatPercentage(result.totalReturn)}</strong> total return 
                over 1 year with <strong>{result.totalTrades}</strong> trades. 
                Maximum drawdown was <strong>{result.maxDrawdown.toFixed(1)}%</strong> with a 
                Sharpe ratio of <strong>{result.sharpeRatio.toFixed(2)}</strong>. 
                {result.totalReturn > result.benchmarkReturn ? 
                  `Outperformed market benchmark by ${formatPercentage(result.totalReturn - result.benchmarkReturn)}.` :
                  `Underperformed market benchmark by ${formatPercentage(result.benchmarkReturn - result.totalReturn)}.`
                }
              </p>
            </Card>
          </Card>
        )}
      </Card>

      {/* Backtest History */}
      {backtestHistory.length > 0 && (
        <Card variant="elevated" padding="xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-secondary-900">Recent Backtests</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
            >
              Clear History
            </Button>
          </div>
          
          <div className="space-y-4">
            {backtestHistory.slice(0, 3).map((test) => (
              <Card key={test.id} variant="ghost" padding="md">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="primary" size="md">{test.symbol}</Badge>
                  <Badge variant={test.totalReturn >= 0 ? 'success' : 'error'} size="md">
                    {formatPercentage(test.totalReturn)}
                  </Badge>
                </div>
                <p className="text-sm text-secondary-600 truncate">{test.strategy}</p>
                <p className="text-xs text-secondary-500 mt-1">
                  {new Date(test.createdAt).toLocaleDateString()}
                </p>
              </Card>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}