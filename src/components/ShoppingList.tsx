import { useState } from 'react';
import type { ShoppingItem } from '../types';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../data/products';

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onClearChecked: () => void;
  onClearAll: () => void;
  getStock: (productId: string) => number;
  onAddProduct: () => void;
}

function ItemRow({
  item,
  onToggle,
  onRemove,
  onUpdateQuantity,
  stockQty,
}: {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  stockQty: number;
}) {
  return (
    <div
      className={`flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border transition-all ${
        item.checked ? 'opacity-50 border-gray-100' : 'border-gray-100'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(item.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          item.checked
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300'
        }`}
      >
        {item.checked && <span className="text-xs">✓</span>}
      </button>

      {/* Emoji */}
      <span className="text-xl flex-shrink-0">{item.product.emoji}</span>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`font-medium text-sm truncate ${item.checked ? 'line-through text-gray-400' : 'text-gray-900'}`}>
          {item.product.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`text-xs px-1.5 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[item.product.category]}`}>
            {CATEGORY_LABELS[item.product.category]}
          </span>
          {stockQty > 0 && (
            <span className="text-xs text-blue-600 font-medium">
              🏠 Stock: {stockQty} {item.product.unit}
            </span>
          )}
        </div>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-lg font-bold hover:bg-gray-200 active:bg-gray-300 transition-colors"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-bold text-gray-800">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-lg font-bold hover:bg-gray-200 active:bg-gray-300 transition-colors"
        >
          +
        </button>
      </div>

      {/* Delete */}
      <button
        onClick={() => onRemove(item.id)}
        className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-gray-300 hover:text-red-400 active:text-red-600 transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

export function ShoppingList({
  items,
  onToggle,
  onRemove,
  onUpdateQuantity,
  onClearChecked,
  onClearAll,
  getStock,
  onAddProduct,
}: ShoppingListProps) {
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const unchecked = items.filter((i) => !i.checked);
  const checked = items.filter((i) => i.checked);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <span className="text-6xl mb-4">🛒</span>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Liste vide</h2>
        <p className="text-gray-500 text-sm mb-6">
          Commencez à ajouter des produits à votre liste de courses
        </p>
        <button
          onClick={onAddProduct}
          className="bg-green-500 text-white px-6 py-3 rounded-2xl font-semibold text-sm shadow-md hover:bg-green-600 active:bg-green-700 transition-colors"
        >
          + Ajouter des produits
        </button>
      </div>
    );
  }

  return (
    <div className="pb-2">
      {/* Actions bar */}
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-800">{unchecked.length}</span> article{unchecked.length !== 1 ? 's' : ''} restant{unchecked.length !== 1 ? 's' : ''}
        </p>
        <div className="flex gap-2">
          {checked.length > 0 && (
            <button
              onClick={onClearChecked}
              className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors font-medium"
            >
              Suppr. cochés ({checked.length})
            </button>
          )}
          <button
            onClick={() => setShowConfirmClear(true)}
            className="text-xs bg-red-50 text-red-500 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors font-medium"
          >
            Tout vider
          </button>
        </div>
      </div>

      {/* Confirm dialog */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Vider la liste ?</h3>
            <p className="text-gray-500 text-sm mb-6">
              Tous les articles seront supprimés de votre liste de courses.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => { onClearAll(); setShowConfirmClear(false); }}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors"
              >
                Vider
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unchecked items */}
      <div className="space-y-2">
        {unchecked.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            onToggle={onToggle}
            onRemove={onRemove}
            onUpdateQuantity={onUpdateQuantity}
            stockQty={getStock(item.product.id)}
          />
        ))}
      </div>

      {/* Checked items */}
      {checked.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">
            Dans le panier ({checked.length})
          </p>
          <div className="space-y-2">
            {checked.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                onToggle={onToggle}
                onRemove={onRemove}
                onUpdateQuantity={onUpdateQuantity}
                stockQty={getStock(item.product.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
