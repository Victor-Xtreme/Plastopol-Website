// src/features/products/getProducts.ts

import productsData from "../../data/products.json";
import { Product } from "../../types";

export function getProducts(): Product[] {
  return (productsData as Product[]).filter( p => p.status === "active");
}
