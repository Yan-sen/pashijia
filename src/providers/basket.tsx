import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type BasketItem = {
  id: number;
  latinName: string;
  chineseName: string | null;
  morph: string | null;
  size: string | null;
  priceUsd: string | null;
  showPrice: boolean;
  quantity: string;
};

const KEY = "psj-basket";

function load(): BasketItem[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as BasketItem[];
  } catch {
    return [];
  }
}

const BasketCtx = createContext<{
  items: BasketItem[];
  has: (id: number) => boolean;
  toggle: (item: Omit<BasketItem, "quantity">) => void;
  remove: (id: number) => void;
  setQty: (id: number, q: string) => void;
  clear: () => void;
}>({ items: [], has: () => false, toggle: () => {}, remove: () => {}, setQty: () => {}, clear: () => {} });

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const has = (id: number) => items.some((i) => i.id === id);
  const toggle = (item: Omit<BasketItem, "quantity">) =>
    setItems((arr) =>
      arr.some((i) => i.id === item.id) ? arr.filter((i) => i.id !== item.id) : [...arr, { ...item, quantity: "" }]
    );
  const remove = (id: number) => setItems((arr) => arr.filter((i) => i.id !== id));
  const setQty = (id: number, q: string) =>
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, quantity: q } : i)));
  const clear = () => setItems([]);

  return (
    <BasketCtx.Provider value={{ items, has, toggle, remove, setQty, clear }}>
      {children}
    </BasketCtx.Provider>
  );
}

export const useBasket = () => useContext(BasketCtx);
