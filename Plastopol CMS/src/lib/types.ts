// src/lib/types.ts

export type ProductStatus = "active" | "draft" | "archived";

export type Category = "office" | "dining" | "lounge" | "outdoor" | "other";

export interface Specification {
  key: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  modelName: string;
  status: ProductStatus;
  colors: string[];
  description: string;
  features: string[];
  specifications: Specification[];
  category: Category;
  tags: string[];
  images: string[];
  thumbnail: string;
  inStock: boolean;
  leadTime: string;
}

export interface CmsConfig {
  repo_path: string;
  default_branch: string;
}

export interface CommitEntry {
  hash: string;
  message: string;
  date: string;
}

export type BuildStatus = "idle" | "building" | "success" | "error";

export interface AppState {
  config: CmsConfig | null;
  products: Product[];
  selectedId: string | null;
  unsaved: boolean;
  buildStatus: BuildStatus;
  buildMessage: string;
}
