// src/lib/constants.ts

import { Category } from "@/types";

// Categories used across app
export const CATEGORIES: Category[] = [
  "office",
  "dining",
  "lounge",
  "outdoor",
  "other",
];

// Default filters
export const DEFAULT_FILTERS = {
  category: undefined,
  minPrice: 0,
  maxPrice: Infinity,
  colors: [],
  inStock: undefined,
};

// Image settings
export const IMAGE_CONFIG = {
  folder: "/products/",
  extension: ".jpg",
  padLength: 3, // for 001, 002...
};

// App-level settings
export const APP_CONFIG = {
  siteName: "Chair Catalog",
  currency: "INR",
};
