import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  // Alimentation
  { id: 'pain', name: 'Pain', category: 'alimentation', unit: 'pièce(s)', emoji: '🍞' },
  { id: 'lait', name: 'Lait', category: 'alimentation', unit: 'L', emoji: '🥛' },
  { id: 'oeufs', name: 'Oeufs', category: 'alimentation', unit: 'pièce(s)', emoji: '🥚' },
  { id: 'beurre', name: 'Beurre', category: 'alimentation', unit: 'g', emoji: '🧈' },
  { id: 'fromage', name: 'Fromage', category: 'alimentation', unit: 'g', emoji: '🧀' },
  { id: 'yaourt', name: 'Yaourt', category: 'alimentation', unit: 'pièce(s)', emoji: '🥛' },
  { id: 'poulet', name: 'Poulet', category: 'alimentation', unit: 'kg', emoji: '🍗' },
  { id: 'boeuf', name: 'Boeuf', category: 'alimentation', unit: 'kg', emoji: '🥩' },
  { id: 'saumon', name: 'Saumon', category: 'alimentation', unit: 'kg', emoji: '🐟' },
  { id: 'thon', name: 'Thon (conserve)', category: 'alimentation', unit: 'boîte(s)', emoji: '🐟' },
  { id: 'tomates', name: 'Tomates', category: 'alimentation', unit: 'kg', emoji: '🍅' },
  { id: 'pommes_de_terre', name: 'Pommes de terre', category: 'alimentation', unit: 'kg', emoji: '🥔' },
  { id: 'carottes', name: 'Carottes', category: 'alimentation', unit: 'kg', emoji: '🥕' },
  { id: 'oignons', name: 'Oignons', category: 'alimentation', unit: 'kg', emoji: '🧅' },
  { id: 'ail', name: 'Ail', category: 'alimentation', unit: 'tête(s)', emoji: '🧄' },
  { id: 'salade', name: 'Salade', category: 'alimentation', unit: 'pièce(s)', emoji: '🥬' },
  { id: 'pommes', name: 'Pommes', category: 'alimentation', unit: 'kg', emoji: '🍎' },
  { id: 'bananes', name: 'Bananes', category: 'alimentation', unit: 'kg', emoji: '🍌' },
  { id: 'oranges', name: 'Oranges', category: 'alimentation', unit: 'kg', emoji: '🍊' },
  { id: 'riz', name: 'Riz', category: 'alimentation', unit: 'kg', emoji: '🍚' },
  { id: 'pates', name: 'Pâtes', category: 'alimentation', unit: 'g', emoji: '🍝' },
  { id: 'farine', name: 'Farine', category: 'alimentation', unit: 'kg', emoji: '🌾' },
  { id: 'sucre', name: 'Sucre', category: 'alimentation', unit: 'kg', emoji: '🍬' },
  { id: 'sel', name: 'Sel', category: 'alimentation', unit: 'kg', emoji: '🧂' },
  { id: 'huile', name: "Huile d'olive", category: 'alimentation', unit: 'L', emoji: '🫙' },
  { id: 'conserves_tomates', name: 'Tomates en conserve', category: 'alimentation', unit: 'boîte(s)', emoji: '🥫' },
  { id: 'confiture', name: 'Confiture', category: 'alimentation', unit: 'pot(s)', emoji: '🍓' },
  { id: 'nutella', name: 'Nutella', category: 'alimentation', unit: 'pot(s)', emoji: '🍫' },

  // Boissons
  { id: 'eau', name: 'Eau minérale', category: 'boissons', unit: 'bouteille(s)', emoji: '💧' },
  { id: 'jus_orange', name: "Jus d'orange", category: 'boissons', unit: 'L', emoji: '🍊' },
  { id: 'cafe', name: 'Café', category: 'boissons', unit: 'g', emoji: '☕' },
  { id: 'the', name: 'Thé', category: 'boissons', unit: 'boîte(s)', emoji: '🍵' },
  { id: 'biere', name: 'Bière', category: 'boissons', unit: 'bouteille(s)', emoji: '🍺' },
  { id: 'vin', name: 'Vin', category: 'boissons', unit: 'bouteille(s)', emoji: '🍷' },
  { id: 'sodas', name: 'Sodas', category: 'boissons', unit: 'bouteille(s)', emoji: '🥤' },

  // Vaisselle
  { id: 'liquide_vaisselle', name: 'Liquide vaisselle', category: 'vaisselle', unit: 'flacon(s)', emoji: '🧴' },
  { id: 'tablettes_lave_vaisselle', name: 'Tablettes lave-vaisselle', category: 'vaisselle', unit: 'pièce(s)', emoji: '💊' },
  { id: 'sel_lave_vaisselle', name: 'Sel lave-vaisselle', category: 'vaisselle', unit: 'kg', emoji: '🧂' },
  { id: 'liquide_rincage', name: 'Liquide de rinçage', category: 'vaisselle', unit: 'flacon(s)', emoji: '🧴' },
  { id: 'eponge', name: 'Éponge', category: 'vaisselle', unit: 'pièce(s)', emoji: '🧽' },
  { id: 'torchons', name: 'Torchons', category: 'vaisselle', unit: 'pièce(s)', emoji: '🧻' },

  // Linge
  { id: 'lessive', name: 'Lessive', category: 'linge', unit: 'kg', emoji: '🫧' },
  { id: 'assouplissant', name: 'Assouplissant', category: 'linge', unit: 'L', emoji: '🫧' },
  { id: 'detachant', name: 'Détachant', category: 'linge', unit: 'flacon(s)', emoji: '🧴' },
  { id: 'tablettes_linge', name: 'Tablettes lessive', category: 'linge', unit: 'pièce(s)', emoji: '💊' },
  { id: 'cintres', name: 'Cintres', category: 'linge', unit: 'pièce(s)', emoji: '🪝' },

  // Hygiène
  { id: 'savon', name: 'Savon', category: 'hygiene', unit: 'pièce(s)', emoji: '🧼' },
  { id: 'shampoing', name: 'Shampooing', category: 'hygiene', unit: 'flacon(s)', emoji: '🧴' },
  { id: 'apres_shampoing', name: 'Après-shampooing', category: 'hygiene', unit: 'flacon(s)', emoji: '🧴' },
  { id: 'gel_douche', name: 'Gel douche', category: 'hygiene', unit: 'flacon(s)', emoji: '🚿' },
  { id: 'dentifrice', name: 'Dentifrice', category: 'hygiene', unit: 'tube(s)', emoji: '🦷' },
  { id: 'brosse_dents', name: 'Brosse à dents', category: 'hygiene', unit: 'pièce(s)', emoji: '🪥' },
  { id: 'deodorant', name: 'Déodorant', category: 'hygiene', unit: 'pièce(s)', emoji: '🧴' },
  { id: 'papier_toilette', name: 'Papier toilette', category: 'hygiene', unit: 'rouleau(x)', emoji: '🧻' },
  { id: 'mouchoirs', name: 'Mouchoirs', category: 'hygiene', unit: 'paquet(s)', emoji: '🤧' },
  { id: 'coton', name: 'Coton', category: 'hygiene', unit: 'paquet(s)', emoji: '☁️' },
  { id: 'rasoir', name: 'Rasoir', category: 'hygiene', unit: 'pièce(s)', emoji: '🪒' },
  { id: 'serviettes_hygieniques', name: 'Serviettes hygiéniques', category: 'hygiene', unit: 'paquet(s)', emoji: '🩹' },

  // Ménage
  { id: 'liquide_menager', name: 'Produit ménager multi-usages', category: 'menage', unit: 'flacon(s)', emoji: '🧹' },
  { id: 'desinfectant', name: 'Désinfectant', category: 'menage', unit: 'flacon(s)', emoji: '🦠' },
  { id: 'deboucheur', name: 'Déboucheur', category: 'menage', unit: 'flacon(s)', emoji: '🪠' },
  { id: 'detartrant', name: 'Détartrant', category: 'menage', unit: 'flacon(s)', emoji: '🧴' },
  { id: 'sacs_poubelle', name: 'Sacs poubelle', category: 'menage', unit: 'rouleau(x)', emoji: '🗑️' },
  { id: 'papier_cuisine', name: 'Papier cuisine (essuie-tout)', category: 'menage', unit: 'rouleau(x)', emoji: '🧻' },
  { id: 'gants_menage', name: 'Gants ménage', category: 'menage', unit: 'paire(s)', emoji: '🧤' },
  { id: 'balai', name: 'Balai / Serpillière', category: 'menage', unit: 'pièce(s)', emoji: '🧹' },
  { id: 'sac_aspirateur', name: "Sac aspirateur", category: 'menage', unit: 'paquet(s)', emoji: '🌀' },

  // Bébé
  { id: 'couches', name: 'Couches', category: 'bebe', unit: 'paquet(s)', emoji: '👶' },
  { id: 'lingettes_bebe', name: 'Lingettes bébé', category: 'bebe', unit: 'paquet(s)', emoji: '🧻' },
  { id: 'lait_bebe', name: 'Lait maternisé', category: 'bebe', unit: 'boîte(s)', emoji: '🍼' },
  { id: 'compotes_bebe', name: 'Compotes bébé', category: 'bebe', unit: 'pièce(s)', emoji: '🍎' },
];

export const CATEGORY_LABELS: Record<string, string> = {
  alimentation: 'Alimentation',
  boissons: 'Boissons',
  vaisselle: 'Vaisselle',
  linge: 'Linge',
  hygiene: 'Hygiène',
  menage: 'Ménage',
  bebe: 'Bébé',
  autre: 'Autre',
};

export const CATEGORY_EMOJIS: Record<string, string> = {
  alimentation: '🛒',
  boissons: '🥤',
  vaisselle: '🍽️',
  linge: '👕',
  hygiene: '🧼',
  menage: '🧹',
  bebe: '👶',
  autre: '📦',
};

export const CATEGORY_COLORS: Record<string, string> = {
  alimentation: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
  boissons: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  vaisselle: 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800',
  linge: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
  hygiene: 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800',
  menage: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
  bebe: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800',
  autre: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600',
};
