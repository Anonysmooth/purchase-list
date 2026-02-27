import { useState } from 'react';
import type { Product, Category } from '../types';
import { CATEGORY_LABELS, CATEGORY_EMOJIS } from '../data/products';

const EMOJI_GRID: { theme: string; emojis: string[] }[] = [
  { theme: 'Alimentation', emojis: ['🍞', '🥛', '🥚', '🧈', '🧀', '🍗', '🥩', '🐟', '🍅', '🥔', '🥕', '🍎', '🍌', '🍊', '🍚', '🍝', '🌾', '🧂', '🫙', '🥫'] },
  { theme: 'Boissons',     emojis: ['💧', '☕', '🍵', '🍺', '🍷', '🥤', '🧃', '🫖'] },
  { theme: 'Hygiène',      emojis: ['🧼', '🧴', '🪥', '🦷', '🪒', '🧻', '🤧'] },
  { theme: 'Maison',       emojis: ['🧹', '🧽', '🗑️', '🪣', '🪠', '🧤', '🫧'] },
  { theme: 'Bébé',         emojis: ['👶', '🍼', '🧸'] },
  { theme: 'Divers',       emojis: ['📦', '🛒', '🏷️', '✏️', '💊', '🪝', '🌿', '🧯'] },
];

const UNIT_CHIPS = ['pièce(s)', 'kg', 'L', 'g', 'paquet(s)', 'bouteille(s)', 'flacon(s)', 'boîte(s)'];

interface CreateProductModalProps {
  onClose: () => void;
  onCreate: (product: Omit<Product, 'id' | 'isCustom'>) => void;
  initialName?: string;
}

export function CreateProductModal({ onClose, onCreate, initialName = '' }: CreateProductModalProps) {
  const [name, setName] = useState(initialName);
  const [category, setCategory] = useState<Category>('autre');
  const [unit, setUnit] = useState('pièce(s)');
  const [customUnit, setCustomUnit] = useState('');
  const [useCustomUnit, setUseCustomUnit] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('📦');
  const [showPicker, setShowPicker] = useState(false);

  const effectiveUnit = useCustomUnit ? customUnit : unit;
  const isValid = name.trim().length > 0 && effectiveUnit.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    onCreate({
      name: name.trim(),
      category,
      unit: effectiveUnit.trim(),
      emoji: selectedEmoji,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-end justify-center z-50 px-4 pb-[calc(4rem+env(safe-area-inset-bottom))]"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-800 dark:text-white text-base">Nouveau produit</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto">

          {/* Emoji selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              Emoji
            </label>
            <button
              type="button"
              onClick={() => setShowPicker(!showPicker)}
              className="w-14 h-14 text-3xl flex items-center justify-center bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-green-400 transition-colors"
            >
              {selectedEmoji}
            </button>
            {showPicker && (
              <div className="mt-2 max-h-44 overflow-y-auto bg-gray-50 dark:bg-gray-700 rounded-xl p-3 space-y-3">
                {EMOJI_GRID.map(({ theme, emojis }) => (
                  <div key={theme}>
                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-semibold mb-1.5">{theme}</p>
                    <div className="flex flex-wrap gap-1">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => { setSelectedEmoji(emoji); setShowPicker(false); }}
                          className={`w-9 h-9 text-xl flex items-center justify-center rounded-lg transition-colors ${
                            selectedEmoji === emoji
                              ? 'bg-green-100 dark:bg-green-900/40 ring-2 ring-green-400'
                              : 'hover:bg-white dark:hover:bg-gray-600'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nom */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              Nom <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex : Granola maison"
              className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              autoFocus={!initialName}
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              Catégorie
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {CATEGORY_EMOJIS[key]} {label}
                </option>
              ))}
            </select>
          </div>

          {/* Unité */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              Unité <span className="text-red-400">*</span>
            </label>
            {!useCustomUnit ? (
              <>
                <div className="flex flex-wrap gap-2">
                  {UNIT_CHIPS.map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUnit(u)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        unit === u
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setUseCustomUnit(true)}
                  className="mt-2 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 underline"
                >
                  Autre unité…
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={customUnit}
                  onChange={(e) => setCustomUnit(e.target.value)}
                  placeholder="Ex : barquette, sachet…"
                  className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => { setUseCustomUnit(false); setCustomUnit(''); }}
                  className="mt-2 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 underline"
                >
                  ← Choisir parmi les unités
                </button>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-5 py-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              isValid
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  );
}
