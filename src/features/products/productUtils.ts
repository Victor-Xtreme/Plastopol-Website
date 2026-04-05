// src/features/products/productUtils.ts

import { Product } from "@/types";

export function getThumbnail(product: Product): string {
  return product.thumbnail || product.images[0];
}

export function getBasePrice(product: Product): number {
  return product.pricing.rep;
}
