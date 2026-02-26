import { useState, useMemo } from 'react';
import type { StockItem, Category } from '../types';
import { PRODUCTS, CATEGORY_LABELS, CATEGORY_EMOJIS, CATEGORY_COLORS } from '../data/products';

interface StockManagerProps {
  stock: StockItem[];
  onUpdateStock: (productId: string, qty: number) => void;
}

export function StockManager({ stock, onUpdateStock }: StockManagerProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all' | 'instock'>('instock');

  const stockMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of stock) map[s.productId] = s.quantity;
    return map;
  }, [stock]);

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;

    if (activeCategory === 'instock') {
      list = list.filter((p) => (stockMap[p.id] ?? 0) > 0);
    } else if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    return list;
  }, [search, activeCategory, stockMap]);

  const stockedCount = stock.filter((s) => s.quantity > 0).length;

  const categories: (Category | 'all' | 'instock')[] = [
    'instock',
    'all',
    'alimentation',
    'boissons',
    'vaisselle',
    'linge',
    'hygiene',
    'menage',
    'bebe',
  ];

  const getCategoryLabel = (cat: string) => {
    if (cat === 'instock') return `En stock (${stockedCount})`;
    if (cat === 'all') return 'Tous';
    return CATEGORY_LABELS[cat];
  };

  return (
    <div className="pb-2">
      {/* Header info */}
      <div className="bg-blue-50 rounded-xl p-4 mb-4 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🏠</span>
        <div>
          <p className="text-sm font-semibold text-blue-800">Gestion du stock</p>
          <p className="text-xs text-blue-600 mt-0.5">
            Indiquez les quantités que vous avez déjà à la maison. Ces informations apparaîtront dans votre liste de courses.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
        <input
          type="search"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4 -mx-4 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat !== 'all' && cat !== 'instock' && CATEGORY_EMOJIS[cat] + ' '}
            {cat === 'instock' && '📦 '}
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-4xl block mb-3">
            {activeCategory === 'instock' ? '📭' : '😕'}
          </span>
          <p className="text-gray-500 text-sm">
            {activeCategory === 'instock' && stockedCount === 0
              ? 'Aucun produit en stock'
              : 'Aucun produit trouvé'}
          </p>
          {activeCategory === 'instock' && stockedCount === 0 && (
            <p className="text-gray-400 text-xs mt-1">
              Parcourez tous les produits pour indiquer votre stock
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredProducts.map((product) => {
            const qty = stockMap[product.id] ?? 0;
            return (
              <div
                key={product.id}
                className={`flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border transition-all ${
                  qty > 0 ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100'
                }`}
              >
                <span className="text-2xl flex-shrink-0">{product.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">{product.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs px-1.5 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[product.category]}`}>
                      {CATEGORY_LABELS[product.category]}
                    </span>
                    <span className="text-xs text-gray-400">{product.unit}</span>
                  </div>
                </div>

                {/* Stock quantity controls */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => onUpdateStock(product.id, qty - 1)}
                    disabled={qty === 0}
                    className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-lg font-bold hover:bg-gray-200 active:bg-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <span className={`w-10 text-center text-sm font-bold ${qty > 0 ? 'text-blue-600' : 'text-gray-300'}`}>
                    {qty}
                  </span>
                  <button
                    onClick={() => onUpdateStock(product.id, qty + 1)}
                    className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
