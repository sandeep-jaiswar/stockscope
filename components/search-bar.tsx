'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { searchStocks, Stock } from '@/lib/stock-data';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';
import { useLocalStorage } from '@/hooks/use-local-storage';
import LoadingSpinner from '@/components/ui/loading-spinner';
import SearchSuggestions from '@/components/ui/search-suggestions';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  variant?: 'default' | 'minimal';
}

export default function SearchBar({ 
  placeholder = "Search stocks by symbol, name, or industry...",
  className,
  autoFocus = false,
  variant = 'default'
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
          handleDirectSearch(query);
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
    const newRecentSearches = [stock.symbol, ...recentSearches.filter(s => s !== stock.symbol)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    setSuggestions([]);
    
    router.push(`/stock/${stock.symbol}`);
  }, [recentSearches, setRecentSearches, router]);

  const handleRecentSearch = useCallback((symbol: string) => {
    const stock = suggestions.find(s => s.symbol === symbol) || 
                  searchStocks(symbol)[0];
    if (stock) {
      handleSelect(stock);
    } else {
      router.push(`/stock/${symbol}`);
      setQuery('');
      setIsOpen(false);
    }
  }, [suggestions, handleSelect, router]);

  const handleDirectSearch = useCallback((searchQuery: string) => {
    const upperQuery = searchQuery.trim().toUpperCase();
    router.push(`/stock/${upperQuery}`);
    setQuery('');
    setIsOpen(false);
  }, [router]);

  const clearRecentSearches = useCallback(() => {
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
      handleDirectSearch(query);
    }
  };

  const inputClasses = variant === 'minimal' 
    ? "w-full pl-12 pr-12 py-3 text-base bg-white border border-secondary-300 rounded-full shadow-sm hover:shadow-md focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 placeholder:text-secondary-400"
    : "w-full pl-12 pr-12 py-4 text-lg bg-white border border-secondary-300 rounded-2xl shadow-lg hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 placeholder:text-secondary-400";

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)} ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5 z-10" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className={inputClasses}
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
        <SearchSuggestions
          suggestions={suggestions}
          recentSearches={recentSearches}
          query={query}
          selectedIndex={selectedIndex}
          isLoading={isLoading}
          onSelect={handleSelect}
          onRecentSelect={handleRecentSearch}
          onClearRecent={clearRecentSearches}
          onDirectSearch={handleDirectSearch}
        />
      )}
    </div>
  );
}