"use client";

import { useState, useEffect, useCallback } from "react";
import { CartItem } from "@/types";

const CART_KEY = "disstands-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setLoaded(true);
  }, []);

  const persist = useCallback((next: CartItem[]) => {
    setItems(next);
    saveCart(next);
  }, []);

  const addItem = useCallback(
    (item: CartItem) => {
      const existing = items.find(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );
      if (existing) {
        persist(
          items.map((i) =>
            i.productId === item.productId && i.variantId === item.variantId
              ? { ...i, m2: i.m2 + item.m2 }
              : i
          )
        );
      } else {
        persist([...items, item]);
      }
    },
    [items, persist]
  );

  const removeItem = useCallback(
    (productId: string, variantId: string) => {
      persist(items.filter((i) => !(i.productId === productId && i.variantId === variantId)));
    },
    [items, persist]
  );

  const updateM2 = useCallback(
    (productId: string, variantId: string, m2: number) => {
      if (m2 <= 0) return removeItem(productId, variantId);
      persist(
        items.map((i) =>
          i.productId === productId && i.variantId === variantId ? { ...i, m2 } : i
        )
      );
    },
    [items, persist, removeItem]
  );

  const clearCart = useCallback(() => persist([]), [persist]);

  const totalItems = items.length;
  const totalM2 = items.reduce((sum, i) => sum + i.m2, 0);
  const subtotal = items.reduce((sum, i) => sum + i.m2 * i.pricePerM2, 0);

  return { items, loaded, addItem, removeItem, updateM2, clearCart, totalItems, totalM2, subtotal };
}
