// src/components/ProductEditor.ts
// Orchestrates EditorFields, EditorLists, ImageManager for one product.

import type { Product } from "../lib/types";
import { upsertProduct, getSelected, subscribe, state } from "../lib/store";
import { scheduleAutosave, markUnsaved } from "../lib/autosave";
import { validateProduct } from "../lib/product";
import { renderEditorFields, readEditorFields } from "./EditorFields";
import { renderEditorLists, readEditorLists } from "./EditorLists";
import { renderImageManager } from "./ImageManager";

export function mountProductEditor(container: HTMLElement) {
  subscribe(() => {
    const product = getSelected();
    if (!product) {
      renderEmpty(container);
    } else {
      renderEditor(container, product);
    }
  });
  renderEmpty(container);
}

function renderEmpty(container: HTMLElement) {
  container.innerHTML = `
    <div class="editor-empty">
      <p>Select a product from the sidebar, or add a new one.</p>
    </div>
  `;
}

function renderEditor(container: HTMLElement, product: Product) {
  container.innerHTML = `
    <div class="editor-scroll">
      <div class="editor-section" id="section-fields"></div>
      <div class="editor-section" id="section-lists"></div>
      <div class="editor-section" id="section-images"></div>
      <div class="editor-section">
        <div id="validation-errors" class="validation-errors hidden"></div>
        <button class="btn primary full-width" id="btn-save-product">Save Product</button>
      </div>
    </div>
  `;

  // Clone to avoid mutating store directly until save
  let draft: Product = structuredClone(product);

  const fieldsEl = container.querySelector<HTMLElement>("#section-fields")!;
  const listsEl  = container.querySelector<HTMLElement>("#section-lists")!;
  const imagesEl = container.querySelector<HTMLElement>("#section-images")!;

  renderEditorFields(fieldsEl, draft);
  renderEditorLists(listsEl, draft);
  renderImageManager(imagesEl, draft);

  // Collect changes from all sub-editors
  container.addEventListener("fields:change", () => {
    Object.assign(draft, readEditorFields(fieldsEl, draft));
    onDraftChange();
  });
  container.addEventListener("lists:change", () => {
    Object.assign(draft, readEditorLists(listsEl));
    onDraftChange();
  });
  container.addEventListener("images:change", (e: Event) => {
    const { images, thumbnail } = (e as CustomEvent).detail;
    draft.images = images;
    draft.thumbnail = thumbnail;
    onDraftChange();
  });

  container.querySelector("#btn-save-product")!.addEventListener("click", () => {
    // Collect latest from all panels before saving
    Object.assign(draft, readEditorFields(fieldsEl, draft));
    Object.assign(draft, readEditorLists(listsEl));
    saveProduct(container, draft);
  });
}

function onDraftChange() {
  markUnsaved();
  scheduleAutosave();
}

function saveProduct(container: HTMLElement, draft: Product) {
  const errors = validateProduct(draft, state.products);
  const errEl = container.querySelector<HTMLElement>("#validation-errors")!;

  if (errors.length) {
    errEl.innerHTML = errors.map(e => `<p>• ${e.message}</p>`).join("");
    errEl.classList.remove("hidden");
    return;
  }

  errEl.classList.add("hidden");
  upsertProduct(draft);
  scheduleAutosave();
}
