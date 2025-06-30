'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStock, Stock } from '@/lib/stock-data';
import StockDetails from '@/components/stock-details';
import BacktestForm from '@/components/backtest-form';
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
  const [showBacktest, setShowBacktest] = useState(false);

  useEffect(() => {
    const loadStock = async () => {
      try {
        setLoading(true);
        setError(null);
        
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
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-secondary-600 mt-4">Loading {symbol} data...</p>
        </div>
      </div>
    );
  }

  if (error || !stock) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="p-4 bg-error-100 rounded-full w-fit mx-auto mb-4">
            <svg className="h-8 w-8 text-error-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">Stock Not Found</h1>
          <p className="text-secondary-600 mb-8">
            {error || `The stock symbol "${symbol}" doesn't exist in our database.`}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Search Another Stock
            </button>
            <button
              onClick={() => router.back()}
              className="w-full bg-secondary-100 hover:bg-secondary-200 text-secondary-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-secondary-50">
        <StockDetails stock={stock} />
        
        {/* Floating Action Button for Backtest */}
        <button
          onClick={() => setShowBacktest(!showBacktest)}
          className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 z-50 lg:hidden"
          aria-label="Toggle backtest form"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>

        {/* Backtest Panel */}
        <div className={`fixed inset-x-0 bottom-0 lg:bottom-6 lg:right-6 lg:left-auto lg:w-96 max-h-[70vh] lg:max-h-[calc(100vh-100px)] overflow-y-auto z-40 transform transition-transform duration-300 ${
          showBacktest ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'
        } ${showBacktest ? 'lg:block' : 'lg:block'}`}>
          <BacktestForm stock={stock} />
        </div>

        {/* Overlay for mobile */}
        {showBacktest && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setShowBacktest(false)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}