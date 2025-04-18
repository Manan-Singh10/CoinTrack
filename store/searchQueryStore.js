import { create } from "zustand";

export const useSearchQueryStore = create((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
}));
