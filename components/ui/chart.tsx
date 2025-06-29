'use client';

import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChartData } from '@/lib/types';
import { formatCurrency, getChangeColor } from '@/lib/utils';
import { CHART_COLORS } from '@/lib/constants';

interface StockChartProps {
  data: ChartData[];
  symbol: string;
  timeframe: string;
  type?: 'line' | 'area';
  height?: number;
}

export default function StockChart({ 
  data, 
  symbol, 
  timeframe, 
  type = 'area',
  height = 300 
}: StockChartProps) {
  const chartColor = useMemo(() => {
    if (data.length < 2) return CHART_COLORS.primary;
    const firstPrice = data[0].price;
    const lastPrice = data[data.length - 1].price;
    return getChangeColor(lastPrice - firstPrice);
  }, [data]);

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    if (timeframe === '1D') return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    if (timeframe === '1W') return date.toLocaleDateString('en-US', { weekday: 'short' });
    if (timeframe === '1M') return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600 mb-1">
            {new Date(label).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(data.price)}
          </p>
          <p className="text-sm text-gray-600">
            Volume: {data.volume.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
        <p className="text-gray-500">No chart data available</p>
      </div>
    );
  }

  const ChartComponent = type === 'area' ? AreaChart : LineChart;

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis}
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            domain={['dataMin - 5', 'dataMax + 5']}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {type === 'area' ? (
            <Area
              type="monotone"
              dataKey="price"
              stroke={chartColor}
              fill={chartColor}
              fillOpacity={0.1}
              strokeWidth={2}
            />
          ) : (
            <Line
              type="monotone"
              dataKey="price"
              stroke={chartColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: chartColor }}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}