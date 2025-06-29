export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  pe: number;
  eps: number;
  high52w: number;
  low52w: number;
  dividend: number;
  beta: number;
  sector: string;
  industry: string;
  description: string;
  lastUpdated: string;
}

export interface BacktestResult {
  id: string;
  strategy: string;
  symbol: string;
  totalReturn: number;
  annualizedReturn: number;
  maxDrawdown: number;
  sharpeRatio: number;
  winRate: number;
  totalTrades: number;
  startDate: string;
  endDate: string;
  initialCapital: number;
  finalValue: number;
  benchmarkReturn: number;
  createdAt: string;
}

export interface ChartData {
  date: string;
  price: number;
  volume: number;
}

export interface TechnicalIndicators {
  rsi: number;
  macd: number;
  sma20: number;
  sma50: number;
  sma200: number;
  bollinger: {
    upper: number;
    middle: number;
    lower: number;
  };
}

export interface SearchSuggestion {
  symbol: string;
  name: string;
  type: 'stock' | 'etf' | 'crypto';
  exchange: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  defaultTimeframe: '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y';
  watchlist: string[];
  recentSearches: string[];
}