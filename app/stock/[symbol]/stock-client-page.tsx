'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStock, Stock } from '@/lib/stock-data';
import StockDetails from '@/components/stock-details';
import BacktestForm from '@/components/backtest-form';
import Header from '@/components/header';

interface StockClientPageProps {
  symbol: string;
}

export default function StockClientPage({ symbol }: StockClientPageProps) {
  const router = useRouter();
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (symbol) {
      const stockData = getStock(symbol);
      setStock(stockData || null);
      setLoading(false);
    }
  }, [symbol]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header showBackButton />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading stock data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header showBackButton />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Stock Not Found</h1>
            <p className="text-gray-600 mb-8">The stock symbol "{symbol}" doesn't exist in our database.</p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Try Another Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
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
  );
}