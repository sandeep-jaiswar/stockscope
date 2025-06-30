'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MagnifyingGlassIcon, 
  ArrowTrendingUpIcon, 
  ClockIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { searchStocks, Stock } from '@/lib/stock-data';
import { cn, formatCurrency, getChangeColorClass } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';
import { useLocalStorage } from '@/hooks/use-local-storage';
import LoadingSpinner from '@/components/ui/loading-spinner';

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
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        } else if (query.trim()) {
          // Navigate directly to symbol
          const upperQuery = query.trim().toUpperCase();
          router.push(`/stock/${upperQuery}`);
          setQuery('');
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = useCallback((stock: Stock) => {
    // Update recent searches
    const newRecentSearches = [stock.symbol, ...recentSearches.filter(s => s !== stock.symbol)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    
    // Clear search state
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    setSuggestions([]);
    
    // Navigate to stock details page
    router.push(`/stock/${stock.symbol}`);
  }, [recentSearches, setRecentSearches, router]);

  const handleRecentSearch = useCallback((symbol: string) => {
    // Find stock from recent searches or search for it
    const stock = suggestions.find(s => s.symbol === symbol) || 
                  searchStocks(symbol)[0];
    if (stock) {
      handleSelect(stock);
    } else {
      // If stock not found, navigate directly
      router.push(`/stock/${symbol}`);
      setQuery('');
      setIsOpen(false);
    }
  }, [suggestions, handleSelect, router]);

  const clearRecentSearches = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
  }, [setRecentSearches]);

  const handleInputFocus = () => {
    if (query.trim() || recentSearches.length > 0) {
      setIsOpen(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
    } else if (query.trim()) {
      // Try to navigate to the symbol directly
      const upperQuery = query.trim().toUpperCase();
      router.push(`/stock/${upperQuery}`);
      setQuery('');
      setIsOpen(false);
    }
  };

  const showRecentSearches = !query.trim() && recentSearches.length > 0;

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)} ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md focus-within:shadow-md transition-shadow duration-200">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-4 text-base bg-transparent rounded-full focus:outline-none placeholder:text-gray-500"
            aria-label="Search stocks"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            role="combobox"
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <LoadingSpinner size="sm" color="primary" />
            </div>
          )}
        </div>
      </form>

      {isOpen && (
        <div className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 max-h-[480px] overflow-y-auto">
          {showRecentSearches && (
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                  <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                  Recent searches
                </h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
                >
                  <XMarkIcon className="h-3 w-3" />
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((symbol) => (
                  <button
                    key={symbol}
                    onClick={() => handleRecentSearch(symbol)}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-all duration-200 hover:shadow-sm"
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
                  onClick={() => handleSelect(stock)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "w-full px-6 py-4 text-left cursor-pointer transition-all duration-150 hover:bg-gray-50",
                    selectedIndex === index && "bg-blue-50 border-l-4 border-blue-500"
                  )}
                  role="option"
                  aria-selected={selectedIndex === index}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 bg-blue-100 rounded-xl flex-shrink-0">
                        <ArrowTrendingUpIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-bold text-gray-900 text-lg">{stock.symbol}</span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                            {stock.sector}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 truncate mb-1">{stock.name}</div>
                        <div className="text-xs text-gray-500">{stock.industry}</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <div className="font-bold text-gray-900 text-lg mb-1">{formatCurrency(stock.price)}</div>
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
            <div className="px-6 py-8 text-center text-gray-500">
              <div className="p-3 bg-gray-100 rounded-full w-fit mx-auto mb-4">
                <MagnifyingGlassIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">No stocks found</h3>
              <p className="text-sm mb-4">No results for "{query}"</p>
              <p className="text-xs text-gray-400 mb-6">Try searching by symbol, company name, or industry</p>
              <button
                onClick={() => {
                  const upperQuery = query.trim().toUpperCase();
                  router.push(`/stock/${upperQuery}`);
                  setQuery('');
                  setIsOpen(false);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 text-sm font-medium shadow-lg hover:shadow-xl"
              >
                Search for "{query.toUpperCase()}" anyway
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}