import { useState, useMemo } from 'react';
import type { Product, Category } from '../types';
import { PRODUCTS, CATEGORY_LABELS, CATEGORY_EMOJIS, CATEGORY_COLORS } from '../data/products';
import { CreateProductModal } from './CreateProductModal';

interface CatalogProps {
  onAdd: (product: Product, qty: number) => void;
  getStock: (productId: string) => number;
  itemsInList: string[]; // product ids already in list
  customProducts: Product[];
  onDeleteCustomProduct: (productId: string) => void;
  onCreateCustomProduct: (product: Omit<Product, 'id' | 'isCustom'>) => void;
}

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

export function Catalog({ onAdd, getStock, itemsInList, customProducts, onDeleteCustomProduct, onCreateCustomProduct }: CatalogProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [addedFeedback, setAddedFeedback] = useState<Record<string, boolean>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createInitialName, setCreateInitialName] = useState('');

  const allProducts = useMemo(() => [...customProducts, ...PRODUCTS], [customProducts]);

  const filteredProducts = useMemo(() => {
    let list = allProducts;
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    return list;
  }, [search, activeCategory, allProducts]);

  const handleAdd = (product: Product) => {
    onAdd(product, 1);
    setAddedFeedback((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedFeedback((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  // Group by category when "all" selected
  const grouped = useMemo(() => {
    if (activeCategory !== 'all') return null;
    const groups: Record<string, Product[]> = {};
    for (const p of filteredProducts) {
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category].push(p);
    }
    return groups;
  }, [filteredProducts, activeCategory]);

  const openCreate = (name = '') => {
    setCreateInitialName(name);
    setShowCreateModal(true);
  };

  return (
    <div className="pb-2">
      {/* Search bar + create button */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="search"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={() => openCreate('')}
          className="flex-shrink-0 w-12 bg-white dark:bg-gray-800 border-2 border-green-400 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center text-2xl font-light hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors shadow-sm"
          title="Nouveau produit"
        >
          +
        </button>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4 -mx-4 px-4">
        <button
          onClick={() => setActiveCategory('all')}
          className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
            activeCategory === 'all'
              ? 'bg-green-500 text-white border-green-500'
              : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          Tous
        </button>
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              activeCategory === cat
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {CATEGORY_EMOJIS[cat]} {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Results */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-4xl block mb-3">😕</span>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Aucun produit trouvé</p>
          {search ? (
            <div className="mt-4">
              <p className="text-gray-400 dark:text-gray-500 text-xs mb-3">
                "{search}" n'est pas dans le catalogue
              </p>
              <button
                onClick={() => openCreate(search)}
                className="bg-green-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:bg-green-600 transition-colors"
              >
                + Créer "{search}"
              </button>
            </div>
          ) : (
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Essayez un autre terme</p>
          )}
        </div>
      ) : activeCategory === 'all' && !search ? (
        // Grouped view
        <div className="space-y-5">
          {Object.entries(grouped || {}).map(([cat, products]) => (
            <div key={cat}>
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                {CATEGORY_EMOJIS[cat]} {CATEGORY_LABELS[cat]}
              </h3>
              <div className="space-y-2">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    stockQty={getStock(product.id)}
                    inList={itemsInList.includes(product.id)}
                    added={addedFeedback[product.id] ?? false}
                    onAdd={() => handleAdd(product)}
                    onDelete={product.isCustom ? () => onDeleteCustomProduct(product.id) : undefined}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Flat list view (when searching or filtered by category)
        <div className="space-y-2">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              stockQty={getStock(product.id)}
              inList={itemsInList.includes(product.id)}
              added={addedFeedback[product.id] ?? false}
              onAdd={() => handleAdd(product)}
              onDelete={product.isCustom ? () => onDeleteCustomProduct(product.id) : undefined}
            />
          ))}
        </div>
      )}

      {/* Create modal */}
      {showCreateModal && (
        <CreateProductModal
          initialName={createInitialName}
          onClose={() => setShowCreateModal(false)}
          onCreate={(data) => {
            onCreateCustomProduct(data);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}

function ProductCard({
  product,
  stockQty,
  inList,
  added,
  onAdd,
  onDelete,
}: {
  product: Product;
  stockQty: number;
  inList: boolean;
  added: boolean;
  onAdd: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <span className="text-2xl flex-shrink-0">{product.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{product.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`text-xs px-1.5 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[product.category]}`}>
            {CATEGORY_LABELS[product.category]}
          </span>
          {stockQty > 0 ? (
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              🏠 {stockQty} {product.unit} en stock
            </span>
          ) : null}
        </div>
      </div>
      {onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-gray-300 dark:text-gray-600 hover:text-red-400 transition-colors"
          title="Supprimer ce produit"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </button>
      )}
      <button
        onClick={onAdd}
        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
          added
            ? 'bg-green-500 text-white scale-90'
            : inList
            ? 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/60'
            : 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-md'
        }`}
      >
        {added ? '✓' : '+'}
      </button>
    </div>
  );
}
