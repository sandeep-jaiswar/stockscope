'use client';

import React from 'react';
import { ArrowTrendingUpIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Stock } from '@/lib/types';
import { cn, formatCurrency, getChangeColorClass } from '@/lib/utils';

interface SearchSuggestionsProps {
  suggestions: Stock[];
  recentSearches: string[];
  query: string;
  selectedIndex: number;
  isLoading: boolean;
  onSelect: (stock: Stock) => void;
  onRecentSelect: (symbol: string) => void;
  onClearRecent: () => void;
  onDirectSearch: (query: string) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  recentSearches,
  query,
  selectedIndex,
  isLoading,
  onSelect,
  onRecentSelect,
  onClearRecent,
  onDirectSearch
}) => {
  const showRecentSearches = !query.trim() && recentSearches.length > 0;

  return (
    <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-secondary-200 overflow-hidden z-50 max-h-[480px] overflow-y-auto">
      {showRecentSearches && (
        <div className="p-6 border-b border-secondary-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-secondary-700 flex items-center">
              <ClockIcon className="h-4 w-4 mr-2 text-secondary-500" />
              Recent searches
            </h3>
            <button
              onClick={onClearRecent}
              className="text-xs text-secondary-500 hover:text-secondary-700 transition-colors duration-200 flex items-center gap-1 px-2 py-1 rounded hover:bg-secondary-100"
            >
              <XMarkIcon className="h-3 w-3" />
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((symbol) => (
              <button
                key={symbol}
                onClick={() => onRecentSelect(symbol)}
                className="px-4 py-2 bg-secondary-100 hover:bg-secondary-200 rounded-xl text-sm font-medium text-secondary-700 transition-all duration-200 hover:shadow-sm"
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>
      )}

      {suggestions.length > 0 && (
        <div role="listbox" className="py-2">
          {suggestions.map((stock, index) => (
            <button
              key={stock.symbol}
              onClick={() => onSelect(stock)}
              className={cn(
                "w-full px-6 py-4 text-left cursor-pointer transition-all duration-150 hover:bg-secondary-50",
                selectedIndex === index && "bg-primary-50 border-l-4 border-primary-500"
              )}
              role="option"
              aria-selected={selectedIndex === index}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-100 rounded-xl flex-shrink-0">
                    <ArrowTrendingUpIcon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-bold text-secondary-900 text-lg">{stock.symbol}</span>
                      <span className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs font-medium rounded-md">
                        {stock.sector}
                      </span>
                    </div>
                    <div className="text-sm text-secondary-600 truncate mb-1">{stock.name}</div>
                    <div className="text-xs text-secondary-500">{stock.industry}</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="font-bold text-secondary-900 text-lg mb-1">{formatCurrency(stock.price)}</div>
                  <div className={cn(
                    "text-sm font-semibold flex items-center justify-end",
                    getChangeColorClass(stock.change)
                  )}>
                    <span className="mr-1">
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                    </span>
                    <span className="text-xs">
                      ({stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {query.trim() && suggestions.length === 0 && !isLoading && (
        <div className="px-6 py-8 text-center text-secondary-500">
          <div className="p-4 bg-secondary-100 rounded-full w-fit mx-auto mb-4">
            <ArrowTrendingUpIcon className="h-8 w-8 text-secondary-400" />
          </div>
          <h3 className="font-semibold text-secondary-900 mb-2">No stocks found</h3>
          <p className="text-sm mb-4">No results for "{query}"</p>
          <p className="text-xs text-secondary-400 mb-6">Try searching by symbol, company name, or industry</p>
          <button
            onClick={() => onDirectSearch(query)}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors duration-200 text-sm font-medium shadow-lg hover:shadow-xl"
          >
            Search for "{query.toUpperCase()}" anyway
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;