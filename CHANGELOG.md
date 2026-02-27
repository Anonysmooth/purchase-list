# Changelog

Toutes les modifications notables sont documentées dans ce fichier.

---

## [Unreleased]

### Ajouts

- **Produits personnalisés** — Il est maintenant possible de créer ses propres produits depuis le catalogue via un bouton `+` dans la barre de recherche (`src/components/Catalog.tsx`, `src/components/CreateProductModal.tsx`, `src/hooks/useCustomProducts.ts`)
  - Formulaire de création avec nom, emoji (grille de sélection thématique), catégorie et unité
  - Si une recherche ne donne aucun résultat, un bouton « Créer "{terme}" » pré-remplit le formulaire avec le nom recherché
  - Les produits personnalisés sont persistés dans le `localStorage` et apparaissent en tête de catalogue
  - Un bouton de suppression (icône poubelle) est affiché sur chaque produit personnalisé
  - À la création, le produit est automatiquement ajouté à la liste de courses

### Correctifs

- **Safe area top** — Ajout de la classe `.pt-safe` (`env(safe-area-inset-top)`) sur le header pour éviter le chevauchement avec la barre de statut Android/iOS (`src/App.tsx`, `src/index.css`)
- **Safe area bottom** — Correction de la classe `.pb-safe` (`env(safe-area-inset-bottom)`) sur le BottomNav, qui était déclarée sans plugin Tailwind et donc sans effet (`src/index.css`, `src/components/BottomNav.tsx`)
- **Hauteur viewport** — Remplacement de `min-h-screen` (`100vh`) par `min-h-dvh` (dynamic viewport height) pour éviter le débordement du contenu sur les appareils Android avec barre de navigation (ex : Samsung S24) (`src/App.tsx`)
- **Viewport meta** — Ajout de `viewport-fit=cover` dans le meta viewport, prérequis pour que `env(safe-area-inset-*)` retourne des valeurs non nulles sur Android (`index.html`)
