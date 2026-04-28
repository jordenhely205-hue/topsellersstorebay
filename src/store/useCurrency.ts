import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrencyState {
  currency: 'USD' | 'GBP';
  symbol: string;
  rate: number; // For now 1.0 for simplicity, but could be dynamic
  setCurrency: (currency: 'USD' | 'GBP') => void;
  formatPrice: (amount: number) => string;
}

export const useCurrency = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: 'USD',
      symbol: '$',
      rate: 1.0,
      setCurrency: (currency) => set({ 
        currency, 
        symbol: currency === 'USD' ? '$' : '£',
        rate: currency === 'USD' ? 1.0 : 0.8 // Simple mock rate
      }),
      formatPrice: (amount) => {
        const { symbol, rate } = get();
        return `${symbol}${(amount * rate).toFixed(2)}`;
      }
    }),
    { name: 'currency-storage' }
  )
);
