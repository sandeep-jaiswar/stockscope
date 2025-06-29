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
}

export const mockStocks: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.52,
    change: 2.45,
    changePercent: 1.36,
    volume: 45234567,
    marketCap: "2.85T",
    pe: 28.5,
    eps: 6.42,
    high52w: 199.62,
    low52w: 164.08,
    dividend: 0.96,
    beta: 1.24
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.56,
    change: -1.23,
    changePercent: -0.85,
    volume: 28456789,
    marketCap: "1.78T",
    pe: 24.8,
    eps: 5.75,
    high52w: 151.55,
    low52w: 121.46,
    dividend: 0.00,
    beta: 1.05
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 378.85,
    change: 4.67,
    changePercent: 1.25,
    volume: 32567890,
    marketCap: "2.81T",
    pe: 32.1,
    eps: 11.80,
    high52w: 384.30,
    low52w: 309.45,
    dividend: 3.00,
    beta: 0.89
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 248.42,
    change: 12.34,
    changePercent: 5.23,
    volume: 89456123,
    marketCap: "790.2B",
    pe: 45.6,
    eps: 5.44,
    high52w: 299.29,
    low52w: 152.37,
    dividend: 0.00,
    beta: 2.08
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 153.76,
    change: -2.11,
    changePercent: -1.35,
    volume: 41234567,
    marketCap: "1.59T",
    pe: 48.2,
    eps: 3.19,
    high52w: 170.40,
    low52w: 118.35,
    dividend: 0.00,
    beta: 1.15
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.28,
    change: 18.45,
    changePercent: 2.15,
    volume: 52345678,
    marketCap: "2.16T",
    pe: 65.4,
    eps: 13.38,
    high52w: 974.00,
    low52w: 419.38,
    dividend: 0.16,
    beta: 1.68
  }
];

export function searchStocks(query: string): Stock[] {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return mockStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(lowercaseQuery) ||
    stock.name.toLowerCase().includes(lowercaseQuery)
  );
}

export function getStock(symbol: string): Stock | undefined {
  return mockStocks.find(stock => stock.symbol === symbol.toUpperCase());
}