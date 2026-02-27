import { useCallback } from 'react';
import type { Product } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useCustomProducts() {
  const [customProducts, setCustomProducts] = useLocalStorage<Product[]>('custom-products', []);

  const addCustomProduct = useCallback(
    (data: Omit<Product, 'id' | 'isCustom'>): Product => {
      const newProduct: Product = {
        ...data,
        id: `custom-${Date.now()}`,
        isCustom: true,
      };
      setCustomProducts((prev) => [newProduct, ...prev]);
      return newProduct;
    },
    [setCustomProducts]
  );

  const deleteCustomProduct = useCallback(
    (productId: string) => {
      setCustomProducts((prev) => prev.filter((p) => p.id !== productId));
    },
    [setCustomProducts]
  );

  return { customProducts, addCustomProduct, deleteCustomProduct };
}
