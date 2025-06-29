import { mockStocks } from '@/lib/stock-data';
import StockPageWrapper from './stock-page-wrapper';

export async function generateStaticParams() {
  return mockStocks.map((stock) => ({
    symbol: stock.symbol,
  }));
}

interface StockPageProps {
  params: {
    symbol: string;
  };
}

export default function StockPage({ params }: StockPageProps) {
  return <StockPageWrapper symbol={params.symbol} />;
}