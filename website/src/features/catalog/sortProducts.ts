// src/features/catalog/sortProducts.ts

import { Product } from "@/types";

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export function sortProducts(
  products: Product[],
  sort?: SortOption
): Product[] {
  if (!sort) return products;

  return [...products].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.pricing.rep - b.pricing.rep;

      case "price-desc":
        return b.pricing.rep - a.pricing.rep;

      case "name-asc":
        return a.modelName.localeCompare(b.modelName);

      case "name-desc":
        return b.modelName.localeCompare(a.modelName);

      default:
        return 0;
    }
  });
}
