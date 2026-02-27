import { useState } from 'react';
import './index.css';
import type { Tab } from './types';
import { useShoppingList } from './hooks/useShoppingList';
import { BottomNav } from './components/BottomNav';
import { ShoppingList } from './components/ShoppingList';
import { Catalog } from './components/Catalog';
import { StockManager } from './components/StockManager';

const TAB_TITLES: Record<Tab, string> = {
  list: 'Ma liste de courses',
  catalog: 'Catalogue produits',
  stock: 'Mon stock',
};

const TAB_ICONS: Record<Tab, string> = {
  list: '📋',
  catalog: '🔍',
  stock: '🏠',
};

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('list');
  const {
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
  } = useShoppingList();

  const itemsInList = items.map((i) => i.product.id);

  const handleGoToCatalog = () => setActiveTab('catalog');

  return (
    <div className="min-h-dvh bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40 pt-safe">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">{TAB_ICONS[activeTab]}</span>
          <h1 className="text-lg font-bold text-gray-900 tracking-tight">
            {TAB_TITLES[activeTab]}
          </h1>
          {activeTab === 'list' && items.length > 0 && (
            <span className="ml-auto text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full">
              {items.filter((i) => !i.checked).length}/{items.length}
            </span>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 pt-4 pb-24">
        {activeTab === 'list' && (
          <ShoppingList
            items={items}
            onToggle={toggleCheck}
            onRemove={removeItem}
            onUpdateQuantity={updateQuantity}
            onClearChecked={clearChecked}
            onClearAll={clearAll}
            getStock={getStock}
            onAddProduct={handleGoToCatalog}
          />
        )}
        {activeTab === 'catalog' && (
          <Catalog
            onAdd={addItem}
            getStock={getStock}
            itemsInList={itemsInList}
          />
        )}
        {activeTab === 'stock' && (
          <StockManager
            stock={stock}
            onUpdateStock={updateStock}
          />
        )}
      </main>

      {/* Bottom navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        listCount={items.filter((i) => !i.checked).length}
      />
    </div>
  );
}

export default App;
