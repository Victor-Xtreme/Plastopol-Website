// src/types/index.ts

// -----------------------------
// Basic Utility Types
// -----------------------------

export type ProductStatus = "active" | "draft" | "archived";

export type Category =
  | "office"
  | "dining"
  | "lounge"
  | "outdoor"
  | "other";


// -----------------------------
// Core Sub-Structures
// -----------------------------

export interface Pricing {
  rep: number;
  semi: number;
  virgin: number;
}

export interface Specification {
  key: string;
  value: string;
}


// -----------------------------
// Main Product Type
// -----------------------------

export interface Product {
  // Identity
  id: string;            // internal (e.g., chair-042)
  slug: string;          // URL (e.g., ergo-comfort-chair)
  modelName: string;

  // State control
  status: ProductStatus;

  // Pricing
  pricing: Pricing;

  // Variants
  colors: string[];

  // Display content
  description: string;
  features: string[];
  specifications: Specification[];

  // Organization
  category: Category;
  tags: string[];

  // Media
  images: string[];      // ["slug-001.jpg", ...]
  thumbnail: string;

  // Availability
  inStock: boolean;
  leadTime: string;
}


// -----------------------------
// API / Admin Payloads
// -----------------------------

// Input from admin form BEFORE processing
export interface ProductInput {
  modelName: string;
  pricing: Pricing;
  colors: string[];
  description: string;
  features: string[];
  specifications: Specification[];
  category: Category;
  tags: string[];
  inStock: boolean;
  leadTime: string;
}

// After processing (what gets saved)
export interface ProductRecord extends Product {}


// -----------------------------
// Search / Catalog Types
// -----------------------------

export interface SearchResult {
  item: Product;
  score?: number;
}

export interface CatalogFilters {
  category?: Category;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  inStock?: boolean;
}
