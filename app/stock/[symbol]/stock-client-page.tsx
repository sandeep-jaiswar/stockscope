'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStock, Stock } from '@/lib/stock-data';
import StockDetails from '@/components/stock-details';
import BacktestForm from '@/components/backtest-form';
import Header from '@/components/header';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { ErrorBoundary } from '@/components/ui/error-boundary';

interface StockClientPageProps {
  symbol: string;
}

export default function StockClientPage({ symbol }: StockClientPageProps) {
  const router = useRouter();
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStock = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const stockData = getStock(symbol);
        if (!stockData) {
          setError(`Stock symbol "${symbol}" not found`);
          return;
        }
        
        setStock(stockData);
      } catch (err) {
        setError('Failed to load stock data');
        console.error('Error loading stock:', err);
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      loadStock();
    }
  }, [symbol]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header showBackButton />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="text-gray-600 mt-4">Loading {symbol} data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !stock) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header showBackButton />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center max-w-md">
            <div className="p-4 bg-red-100 rounded-full w-fit mx-auto mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Stock Not Found</h1>
            <p className="text-gray-600 mb-8">
              {error || `The stock symbol "${symbol}" doesn't exist in our database.`}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Search Another Stock
              </button>
              <button
                onClick={() => router.back()}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <Header showBackButton currentStock={stock.symbol} />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Stock Details - Takes up 2 columns */}
            <div className="lg:col-span-2">
              <StockDetails stock={stock} />
            </div>

            {/* Backtest Form - Takes up 1 column */}
            <div className="lg:col-span-1">
              <BacktestForm stock={stock} />
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}