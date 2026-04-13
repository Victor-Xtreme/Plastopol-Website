// src/components/ProductEditor.ts

import type { Product } from "../lib/types";
import { upsertProduct, getSelected, subscribe, state } from "../lib/store";
import { scheduleAutosave, markUnsaved } from "../lib/autosave";
import { validateProduct, generateUniqueSlug } from "../lib/product";
import { renderEditorFields, readEditorFields } from "./EditorFields";
import { renderEditorLists, readEditorLists } from "./EditorLists";
import { renderImageManager } from "./ImageManager";
import { cmsLog, cmsWarn } from "../lib/logger";

export function mountProductEditor(container: HTMLElement) {
  subscribe(() => {
    const product = getSelected();
    cmsLog("ProductEditor", "store notify — selectedId:", state.selectedId ?? "null", "resolved:", product ? product.modelName : "null");
    if (!product) {
      renderEmpty(container);
    } else {
      renderEditor(container, product);
    }
  });
  renderEmpty(container);
}

function renderEmpty(container: HTMLElement) {
  cmsLog("ProductEditor", "renderEmpty()");
  container.innerHTML = `
    <div class="editor-empty">
      <p>Select a product from the sidebar, or add a new one.</p>
    </div>
  `;
}

function renderEditor(container: HTMLElement, product: Product) {
  cmsLog("ProductEditor", "renderEditor() — id:", product.id, "name:", product.modelName);
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

  let draft: Product = structuredClone(product);

  const fieldsEl = container.querySelector<HTMLElement>("#section-fields")!;
  const listsEl  = container.querySelector<HTMLElement>("#section-lists")!;
  const imagesEl = container.querySelector<HTMLElement>("#section-images")!;

  cmsLog("ProductEditor", "sub-sections found — fields:", !!fieldsEl, "lists:", !!listsEl, "images:", !!imagesEl);

  renderEditorFields(fieldsEl, draft);
  renderEditorLists(listsEl, draft);
  renderImageManager(imagesEl, draft);

  container.addEventListener("fields:change", () => {
    Object.assign(draft, readEditorFields(fieldsEl));
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
    cmsLog("ProductEditor", "Save Product clicked — draft id:", draft.id, "name:", draft.modelName);
    Object.assign(draft, readEditorFields(fieldsEl));
    Object.assign(draft, readEditorLists(listsEl));
    saveProduct(container, draft);
  });
}

function onDraftChange() {
  markUnsaved();
  scheduleAutosave();
}

function saveProduct(container: HTMLElement, draft: Product) {
  const otherSlugs = state.products.filter((p) => p.id !== draft.id).map((p) => p.slug);
  draft.slug = generateUniqueSlug(draft.modelName, otherSlugs);

  const errors = validateProduct(draft, state.products);
  const errEl = container.querySelector<HTMLElement>("#validation-errors")!;

  if (errors.length) {
    cmsWarn("ProductEditor", "validation errors:", JSON.stringify(errors));
    errEl.innerHTML = errors.map(e => `<p>• ${e.message}</p>`).join("");
    errEl.classList.remove("hidden");
    return;
  }

  errEl.classList.add("hidden");
  cmsLog("ProductEditor", "upserting product:", draft.id);
  upsertProduct(draft);
  scheduleAutosave();
}
