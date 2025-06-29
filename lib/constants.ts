export const TIMEFRAMES = [
  { label: '1D', value: '1D', days: 1 },
  { label: '1W', value: '1W', days: 7 },
  { label: '1M', value: '1M', days: 30 },
  { label: '3M', value: '3M', days: 90 },
  { label: '1Y', value: '1Y', days: 365 },
  { label: '5Y', value: '5Y', days: 1825 },
] as const;

export const CHART_COLORS = {
  primary: '#3B82F6',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  info: '#6366F1',
  neutral: '#6B7280',
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 200,
  slow: 300,
} as const;

export const API_ENDPOINTS = {
  stocks: '/api/stocks',
  search: '/api/search',
  backtest: '/api/backtest',
  chart: '/api/chart',
} as const;

export const ERROR_MESSAGES = {
  STOCK_NOT_FOUND: 'Stock not found. Please check the symbol and try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  INVALID_INPUT: 'Invalid input. Please check your data and try again.',
  BACKTEST_FAILED: 'Backtest failed. Please try again with different parameters.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

export const SUCCESS_MESSAGES = {
  BACKTEST_COMPLETE: 'Backtest completed successfully!',
  WATCHLIST_ADDED: 'Added to watchlist',
  WATCHLIST_REMOVED: 'Removed from watchlist',
} as const;