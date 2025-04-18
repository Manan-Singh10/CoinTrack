import { create } from "zustand";

export const useCurrencyStore = create((set) => ({
  currency: "",
  setCurrency: (newCurrency) => {
    set({ currency: newCurrency });
  },
}));
