// src/features/catalog/sortProducts.ts

import { Product } from "../../types";

export function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'priceAsc':
      return sorted.sort((a, b) => a.pricing.rep - b.pricing.rep);

    case 'priceDesc':
      return sorted.sort((a, b) => b.pricing.rep - a.pricing.rep);

    case 'name':
      return sorted.sort((a, b) =>
        a.modelName.localeCompare(b.modelName)
      );

    case 'newest':
    default:
      // Keep original order (assumes data is already sorted by newest)
      return sorted;
  }
}