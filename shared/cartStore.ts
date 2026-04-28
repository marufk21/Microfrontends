import { createStore, type StoreApi } from "zustand/vanilla";

export type Product = {
  name: string;
  price: number;
};

export type CartItem = Product & {
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  addItem: (item: Product) => void;
  incrementItem: (name: string) => void;
  decrementItem: (name: string) => void;
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
        items: state.items.some((existingItem) => existingItem.name === item.name)
          ? state.items.map((existingItem) =>
              existingItem.name === item.name
                ? { ...existingItem, quantity: existingItem.quantity + 1 }
                : existingItem,
            )
          : [...state.items, { ...item, quantity: 1 }],
      })),
    incrementItem: (name) =>
      set((state) => ({
        items: state.items.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      })),
    decrementItem: (name) =>
      set((state) => ({
        items: state.items
          .map((item) =>
            item.name === name ? { ...item, quantity: item.quantity - 1 } : item,
          )
          .filter((item) => item.quantity > 0),
      })),
  }));

window.__cartStore = cartStore;
