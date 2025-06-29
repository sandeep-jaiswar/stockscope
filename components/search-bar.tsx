'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, TrendingUp, Clock, X } from 'lucide-react';
import { searchStocks, Stock } from '@/lib/stock-data';
import { cn, formatCurrency, getChangeColorClass } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export default function SearchBar({ 
  placeholder = "Search stocks by symbol, name, or industry...",
  className,
  autoFocus = false
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Stock[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('recent-searches', []);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const debouncedQuery = useDebounce(query, 300);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      const results = searchStocks(searchQuery);
      setSuggestions(results);
      setIsOpen(true);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
    setSelectedIndex(-1);
  }, []);

  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelect(suggestions[selectedIndex]);
        } else if (suggestions.length > 0) {
          handleSelect(suggestions[0]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = (stock: Stock) => {
    const newRecentSearches = [stock.symbol, ...recentSearches.filter(s => s !== stock.symbol)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    router.push(`/stock/${stock.symbol}`);
  };

  const handleRecentSearch = (symbol: string) => {
    const stock = suggestions.find(s => s.symbol === symbol) || 
                  searchStocks(symbol)[0];
    if (stock) {
      handleSelect(stock);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const showRecentSearches = !query.trim() && recentSearches.length > 0;

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim() || showRecentSearches) {
              setIsOpen(true);
            }
          }}
          onBlur={() => {
            // Delay closing to allow for click events
            setTimeout(() => setIsOpen(false), 150);
          }}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 text-lg bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
          aria-label="Search stocks"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600"></div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 max-h-96 overflow-y-auto">
          {showRecentSearches && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Recent Searches
                </h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((symbol) => (
                  <button
                    key={symbol}
                    onClick={() => handleRecentSearch(symbol)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors duration-200"
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
          )}

          {suggestions.length > 0 && (
            <div role="listbox">
              {suggestions.map((stock, index) => (
                <div
                  key={stock.symbol}
                  onClick={() => handleSelect(stock)}
                  className={cn(
                    "px-6 py-4 cursor-pointer transition-all duration-150 border-b border-gray-100 last:border-b-0",
                    selectedIndex === index
                      ? "bg-blue-50 border-blue-200"
                      : "hover:bg-gray-50"
                  )}
                  role="option"
                  aria-selected={selectedIndex === index}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex-shrink-0">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-900">{stock.symbol}</div>
                        <div className="text-sm text-gray-600 truncate">{stock.name}</div>
                        <div className="text-xs text-gray-500">{stock.sector}</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-gray-900">{formatCurrency(stock.price)}</div>
                      <div className={cn(
                        "text-sm font-medium",
                        getChangeColorClass(stock.change)
                      )}>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {query.trim() && suggestions.length === 0 && !isLoading && (
            <div className="p-6 text-center text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>No stocks found for "{query}"</p>
              <p className="text-sm mt-1">Try searching by symbol, company name, or industry</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}