// src/main.ts
import { mountConfigModal } from "./components/ConfigModal";
import { renderSidebar } from "./components/Sidebar";
import { mountProductEditor } from "./components/ProductEditor";
import { renderActionBar } from "./components/ActionBar";
import { mountHistoryModal } from "./components/HistoryModal";
import { state, setProducts, setSelectedId, removeProduct, upsertProduct } from "./lib/store";
import { readProducts } from "./lib/tauri";
import { emptyProduct } from "./lib/product";

window.addEventListener("DOMContentLoaded", async () => {
  const root = document.getElementById("app")!;

  // Build shell layout
  root.innerHTML = `
    <div id="sidebar-pane"></div>
    <div id="editor-pane"></div>
    <div id="action-bar-pane"></div>
  `;

  // Mount modals into root (they manage their own visibility)
  await mountConfigModal(root);
  mountHistoryModal(root);

  // Mount main panels
  renderSidebar(document.getElementById("sidebar-pane")!);
  mountProductEditor(document.getElementById("editor-pane")!);
  renderActionBar(document.getElementById("action-bar-pane")!);

  // Load products once config is available
  document.addEventListener("cms:config-saved", () => loadProducts());
  if (state.config?.repo_path) loadProducts();

  // Global product event bus
  document.addEventListener("cms:add-product", () => {
    const p = emptyProduct();
    upsertProduct(p);
    setSelectedId(p.id);
  });

  document.addEventListener("cms:edit-product", (e: Event) => {
    setSelectedId((e as CustomEvent).detail.id);
  });

  document.addEventListener("cms:delete-product", (e: Event) => {
    const { id } = (e as CustomEvent).detail;
    if (confirm("Delete this product?")) removeProduct(id);
  });

  document.addEventListener("cms:open-settings", () => {
    document.dispatchEvent(new CustomEvent("cms:open-settings"));
  });

  // Warn on close if unsaved
  window.addEventListener("beforeunload", (e) => {
    if (state.unsaved) {
      e.preventDefault();
      e.returnValue = "";
    }
  });
});

async function loadProducts() {
  const repoPath = state.config?.repo_path;
  if (!repoPath) return;
  try {
    const raw = await readProducts(repoPath);
    setProducts(JSON.parse(raw));
  } catch (err) {
    console.error("Failed to load products:", err);
  }
}
