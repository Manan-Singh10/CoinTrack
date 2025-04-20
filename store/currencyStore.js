import { create } from "zustand";

export const useCurrencyStore = create((set) => ({
  currency: "usd",
  setCurrency: (newCurrency) => {
    set({ currency: newCurrency });
  },
}));
