import StockClientPage from './stock-client-page';

interface StockPageWrapperProps {
  symbol: string;
}

export default function StockPageWrapper({ symbol }: StockPageWrapperProps) {
  return <StockClientPage symbol={symbol} />;
}