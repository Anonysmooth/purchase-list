export type Category =
  | 'alimentation'
  | 'boissons'
  | 'vaisselle'
  | 'linge'
  | 'hygiene'
  | 'menage'
  | 'bebe'
  | 'autre';

export interface Product {
  id: string;
  name: string;
  category: Category;
  unit: string; // kg, L, pièces, etc.
  emoji: string;
  isCustom?: boolean;
}

export interface ShoppingItem {
  id: string;
  product: Product;
  quantity: number;
  checked: boolean;
  addedAt: number;
}

export interface StockItem {
  productId: string;
  quantity: number;
  updatedAt: number;
}

export type Tab = 'list' | 'catalog' | 'stock';
