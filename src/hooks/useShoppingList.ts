import { useCallback } from 'react';
import type { ShoppingItem, Product, StockItem } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useShoppingList() {
  const [items, setItems] = useLocalStorage<ShoppingItem[]>('shopping-list', []);
  const [stock, setStock] = useLocalStorage<StockItem[]>('stock', []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      const newItem: ShoppingItem = {
        id: `${product.id}-${Date.now()}`,
        product,
        quantity,
        checked: false,
        addedAt: Date.now(),
      };
      return [newItem, ...prev];
    });
  }, [setItems]);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, [setItems]);

  const toggleCheck = useCallback((itemId: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, checked: !i.checked } : i))
    );
  }, [setItems]);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
      );
    }
  }, [setItems]);

  const clearChecked = useCallback(() => {
    setItems((prev) => prev.filter((i) => !i.checked));
  }, [setItems]);

  const clearAll = useCallback(() => {
    setItems([]);
  }, [setItems]);

  // Stock management
  const getStock = useCallback(
    (productId: string): number => {
      return stock.find((s) => s.productId === productId)?.quantity ?? 0;
    },
    [stock]
  );

  const updateStock = useCallback(
    (productId: string, quantity: number) => {
      setStock((prev) => {
        const existing = prev.find((s) => s.productId === productId);
        if (quantity <= 0) {
          return prev.filter((s) => s.productId !== productId);
        }
        if (existing) {
          return prev.map((s) =>
            s.productId === productId
              ? { ...s, quantity, updatedAt: Date.now() }
              : s
          );
        }
        return [...prev, { productId, quantity, updatedAt: Date.now() }];
      });
    },
    [setStock]
  );

  return {
    items,
    stock,
    addItem,
    removeItem,
    toggleCheck,
    updateQuantity,
    clearChecked,
    clearAll,
    getStock,
    updateStock,
  };
}
