// src/features/products/getProductBySlug.ts

import { getProducts } from "./getProducts";
import { Product } from "../../types";

export function getProductBySlug(slug: string): Product | undefined {
  const products = getProducts();
  return products.find((p) => p.slug === slug);
}
