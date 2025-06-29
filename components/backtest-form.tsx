'use client';

import { useState } from 'react';
import { Play, Loader2, Zap, Calendar, DollarSign } from 'lucide-react';
import { Stock } from '@/lib/stock-data';

interface BacktestFormProps {
  stock: Stock;
}

export default function BacktestForm({ stock }: BacktestFormProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      // Simulate webhook call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response
      setResult(`Backtest completed for ${stock.symbol}: Strategy showed 15.4% return over 1 year with 12% max drawdown. Sharpe ratio: 1.42. Risk-adjusted performance beats market by 3.2%.`);
    } catch (error) {
      setResult('Backtest failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQueries = [
    `Buy ${stock.symbol} when RSI < 30 and sell when RSI > 70`,
    `Dollar cost average $1000 monthly into ${stock.symbol} for 2 years`,
    `Buy ${stock.symbol} when price drops 5% from 20-day high`,
    `Moving average crossover strategy for ${stock.symbol}`
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Backtest Strategy</h2>
        <p className="text-gray-600 text-lg">
          Describe your trading strategy in plain English and we'll run a comprehensive backtest analysis.
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
          />
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Zap className="h-5 w-5 text-blue-600 mr-2" />
            Quick Examples
          </h3>
          <div className="grid gap-3">
            {sampleQueries.map((sample, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setQuery(sample)}
                className="text-left p-3 bg-white rounded-lg hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-all duration-200 text-sm"
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
              <Loader2 className="h-5 w-5 animate-spin" />
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

      {result && (
        <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Backtest Results
          </h3>
          <p className="text-green-700 leading-relaxed">{result}</p>
        </div>
      )}
    </div>
  );
}