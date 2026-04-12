// src/lib/store.ts
// Simple observable store — no framework dependency.

import type { AppState, Product, CmsConfig, BuildStatus } from "./types";

type Listener = (state: AppState) => void;

const listeners: Listener[] = [];

export const state: AppState = {
  config: null,
  products: [],
  selectedId: null,
  unsaved: false,
  buildStatus: "idle",
  buildMessage: "",
};

export function subscribe(fn: Listener): () => void {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx >= 0) listeners.splice(idx, 1);
  };
}

function notify() {
  listeners.forEach((fn) => fn({ ...state }));
}

export function setConfig(config: CmsConfig) {
  state.config = config;
  notify();
}

export function setProducts(products: Product[]) {
  state.products = products;
  notify();
}

export function setSelectedId(id: string | null) {
  state.selectedId = id;
  notify();
}

export function setUnsaved(v: boolean) {
  state.unsaved = v;
  notify();
}

export function setBuildStatus(status: BuildStatus, message = "") {
  state.buildStatus = status;
  state.buildMessage = message;
  notify();
}

export function upsertProduct(product: Product) {
  const idx = state.products.findIndex((p) => p.id === product.id);
  if (idx >= 0) {
    state.products[idx] = product;
  } else {
    state.products.push(product);
  }
  state.unsaved = true;
  notify();
}

export function removeProduct(id: string) {
  state.products = state.products.filter((p) => p.id !== id);
  state.selectedId = state.selectedId === id ? null : state.selectedId;
  state.unsaved = true;
  notify();
}

export function getSelected(): Product | null {
  return state.products.find((p) => p.id === state.selectedId) ?? null;
}
