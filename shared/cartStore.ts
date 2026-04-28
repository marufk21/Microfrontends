import { createStore, type StoreApi } from "zustand/vanilla";

export type CartItem = {
  name: string;
  price: number;
};

export type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
};

declare global {
  interface Window {
    __cartStore?: StoreApi<CartState>;
  }
}

export const cartStore =
  window.__cartStore ??
  createStore<CartState>((set) => ({
    items: [],
    addItem: (item) =>
      set((state) => ({
        items: [...state.items, item],
      })),
  }));

window.__cartStore = cartStore;
