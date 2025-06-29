import { Stock, ChartData, TechnicalIndicators } from './types';

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
    beta: 1.24,
    sector: "Technology",
    industry: "Consumer Electronics",
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
    lastUpdated: new Date().toISOString()
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
    beta: 1.05,
    sector: "Technology",
    industry: "Internet Content & Information",
    description: "Alphabet Inc. provides online advertising services in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.",
    lastUpdated: new Date().toISOString()
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
    beta: 0.89,
    sector: "Technology",
    industry: "Software—Infrastructure",
    description: "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.",
    lastUpdated: new Date().toISOString()
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
    beta: 2.08,
    sector: "Consumer Cyclical",
    industry: "Auto Manufacturers",
    description: "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.",
    lastUpdated: new Date().toISOString()
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
    beta: 1.15,
    sector: "Consumer Cyclical",
    industry: "Internet Retail",
    description: "Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally.",
    lastUpdated: new Date().toISOString()
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
    beta: 1.68,
    sector: "Technology",
    industry: "Semiconductors",
    description: "NVIDIA Corporation operates as a computing company in the United States, Taiwan, China, and internationally.",
    lastUpdated: new Date().toISOString()
  }
];

export function searchStocks(query: string): Stock[] {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return mockStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(lowercaseQuery) ||
    stock.name.toLowerCase().includes(lowercaseQuery) ||
    stock.sector.toLowerCase().includes(lowercaseQuery) ||
    stock.industry.toLowerCase().includes(lowercaseQuery)
  );
}

export function getStock(symbol: string): Stock | undefined {
  return mockStocks.find(stock => stock.symbol === symbol.toUpperCase());
}

export function generateChartData(symbol: string, days: number = 30): ChartData[] {
  const stock = getStock(symbol);
  if (!stock) return [];

  const data: ChartData[] = [];
  const basePrice = stock.price;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Generate realistic price movement
    const volatility = stock.beta * 0.02;
    const randomChange = (Math.random() - 0.5) * volatility;
    const price = basePrice * (1 + randomChange * (i / days));
    const volume = stock.volume * (0.8 + Math.random() * 0.4);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.max(price, stock.low52w),
      volume: Math.floor(volume)
    });
  }
  
  return data;
}

export function getTechnicalIndicators(symbol: string): TechnicalIndicators | null {
  const stock = getStock(symbol);
  if (!stock) return null;

  // Mock technical indicators based on current price
  const price = stock.price;
  
  return {
    rsi: 45 + Math.random() * 20, // RSI between 45-65
    macd: (Math.random() - 0.5) * 2,
    sma20: price * (0.98 + Math.random() * 0.04),
    sma50: price * (0.95 + Math.random() * 0.1),
    sma200: price * (0.85 + Math.random() * 0.3),
    bollinger: {
      upper: price * 1.05,
      middle: price,
      lower: price * 0.95
    }
  };
}

export function getIndustryPeers(symbol: string): Stock[] {
  const stock = getStock(symbol);
  if (!stock) return [];

  return mockStocks.filter(s => 
    s.symbol !== symbol && 
    (s.sector === stock.sector || s.industry === stock.industry)
  ).slice(0, 3);
}