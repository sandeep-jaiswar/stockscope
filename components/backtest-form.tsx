'use client';

import { useState } from 'react';
import { Play, Loader2, Zap, Calendar, DollarSign, TrendingUp, BarChart3, AlertCircle } from 'lucide-react';
import { Stock, BacktestResult } from '@/lib/types';
import { formatCurrency, formatPercentage, generateId } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';
import LoadingSpinner from '@/components/ui/loading-spinner';

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
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Strategy Backtester</h2>
          <p className="text-gray-600 text-lg">
            Describe your trading strategy in plain English and get comprehensive performance analysis.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="strategy" className="block text-sm font-semibold text-gray-700 mb-3">
              Strategy Description
            </label>
            <textarea
              id="strategy"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Example: "Buy ${stock.symbol} when the stock drops 10% from its 30-day high, hold for 6 months, then sell"`}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
              disabled={isLoading}
            />
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Zap className="h-5 w-5 text-blue-600 mr-2" />
              Strategy Examples
            </h3>
            <div className="grid gap-3">
              {sampleQueries.map((sample, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setQuery(sample)}
                  disabled={isLoading}
                  className="text-left p-3 bg-white rounded-lg hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="border-white border-t-transparent" />
                <span>Running Backtest...</span>
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                <span>Execute Backtest</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-700 font-medium">Error</p>
            </div>
            <p className="text-red-600 mt-1">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Backtest Results
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Return</span>
                  <span className={`font-bold ${result.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(result.totalReturn)}
                  </span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sharpe Ratio</span>
                  <span className="font-bold text-gray-900">{result.sharpeRatio.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Max Drawdown</span>
                  <span className="font-bold text-red-600">-{result.maxDrawdown.toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Win Rate</span>
                  <span className="font-bold text-gray-900">{result.winRate.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Performance Summary</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Strategy generated <strong>{formatPercentage(result.totalReturn)}</strong> total return 
                over 1 year with <strong>{result.totalTrades}</strong> trades. 
                Maximum drawdown was <strong>{result.maxDrawdown.toFixed(1)}%</strong> with a 
                Sharpe ratio of <strong>{result.sharpeRatio.toFixed(2)}</strong>. 
                {result.totalReturn > result.benchmarkReturn ? 
                  `Outperformed market benchmark by ${formatPercentage(result.totalReturn - result.benchmarkReturn)}.` :
                  `Underperformed market benchmark by ${formatPercentage(result.benchmarkReturn - result.totalReturn)}.`
                }
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Backtest History */}
      {backtestHistory.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Backtests</h3>
            <button
              onClick={clearHistory}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Clear History
            </button>
          </div>
          
          <div className="space-y-4">
            {backtestHistory.slice(0, 3).map((test) => (
              <div key={test.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{test.symbol}</span>
                  <span className={`font-bold ${test.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(test.totalReturn)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">{test.strategy}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(test.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}