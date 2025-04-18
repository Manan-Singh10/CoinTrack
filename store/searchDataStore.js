import { create } from "zustand";

export const searchDataStore = create((set) => ({
  searchData: [],
  setSearchData: (data) => {
    set({ searchData: data });
  },
}));
