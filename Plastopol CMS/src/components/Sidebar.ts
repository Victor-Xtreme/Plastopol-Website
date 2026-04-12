// src/components/Sidebar.ts

import { state, setSelectedId, subscribe } from "../lib/store";
import { searchProducts, highlightText } from "../lib/search";
import type { Product } from "../lib/types";

const STATUS_COLORS: Record<string, string> = {
  active: "#22c55e",
  draft: "#f59e0b",
  archived: "#6b7280",
};

export function renderSidebar(container: HTMLElement) {
  container.innerHTML = `
    <div class="sidebar">
      <div class="sidebar-header">
        <span class="sidebar-title">Products</span>
        <button id="add-product-btn" class="btn-icon" title="Add product">＋</button>
      </div>
      <input id="search-input" class="search-input" placeholder="Search products…" />
      <div id="product-list" class="product-list"></div>
    </div>
  `;

  const searchInput = container.querySelector<HTMLInputElement>("#search-input")!;
  const addBtn = container.querySelector<HTMLButtonElement>("#add-product-btn")!;

  searchInput.addEventListener("input", () => renderList(searchInput.value));
  addBtn.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("cms:add-product"));
  });

  subscribe(() => renderList(searchInput.value));
  renderList("");

  // Keyboard shortcut: Ctrl+F focuses search
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "f") {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

function renderList(query: string) {
  const list = document.getElementById("product-list");
  if (!list) return;

  const matches = searchProducts(state.products, query);

  if (matches.length === 0) {
    list.innerHTML = `<div class="empty-state">No products found</div>`;
    return;
  }

  list.innerHTML = matches
    .map(({ product, fields }) => renderItem(product, query, fields))
    .join("");

  list.querySelectorAll<HTMLElement>("[data-id]").forEach((el) => {
    el.addEventListener("click", () => setSelectedId(el.dataset.id!));
    wireHoverActions(el);
  });
}

function renderItem(product: Product, query: string, fields: string[]): string {
  const active = state.selectedId === product.id ? "selected" : "";
  const color = STATUS_COLORS[product.status] ?? "#6b7280";
  const name = highlightText(product.modelName || "(Unnamed)", query);

  return `
    <div class="product-item ${active}" data-id="${product.id}">
      <div class="product-item-main">
        <span class="product-item-name">${name}</span>
        <span class="status-dot" style="background:${color}" title="${product.status}"></span>
      </div>
      <div class="product-item-sub">${product.category} · ${product.status}</div>
      <div class="item-actions" hidden>
        <button class="action-btn" data-action="edit" data-id="${product.id}">Edit</button>
        <button class="action-btn danger" data-action="delete" data-id="${product.id}">Delete</button>
      </div>
    </div>
  `;
}

function wireHoverActions(el: HTMLElement) {
  const actions = el.querySelector<HTMLElement>(".item-actions")!;
  el.addEventListener("mouseenter", () => (actions.hidden = false));
  el.addEventListener("mouseleave", () => (actions.hidden = true));

  actions.querySelectorAll<HTMLButtonElement>("[data-action]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const action = btn.dataset.action!;
      const id = btn.dataset.id!;
      document.dispatchEvent(new CustomEvent(`cms:${action}-product`, { detail: { id } }));
    });
  });
}
