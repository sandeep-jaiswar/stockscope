import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/contexts/theme-context';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'BacktestBuddy - Professional Stock Analysis & Backtesting Platform',
  description: 'Advanced stock analysis, technical indicators, and strategy backtesting. Search stocks, analyze performance, and make data-driven investment decisions with our comprehensive financial platform.',
  keywords: 'stock analysis, backtesting, technical indicators, financial data, investment research, trading strategies',
  authors: [{ name: 'BacktestBuddy Team' }],
  creator: 'BacktestBuddy',
  publisher: 'BacktestBuddy',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3B82F6',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://backtestbuddy.app',
    title: 'BacktestBuddy - Professional Stock Analysis Platform',
    description: 'Advanced stock analysis, technical indicators, and strategy backtesting platform for informed investment decisions.',
    siteName: 'BacktestBuddy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BacktestBuddy - Professional Stock Analysis Platform',
    description: 'Advanced stock analysis, technical indicators, and strategy backtesting platform for informed investment decisions.',
    creator: '@backtestbuddy',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <div id="root">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}