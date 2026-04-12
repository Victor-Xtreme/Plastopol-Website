// src/components/ActionBar.ts

import { state, subscribe, setBuildStatus } from "../lib/store";
import { gitCommitPush, gitPull, gitLog, writeProducts } from "../lib/tauri";
import { validateProduct } from "../lib/product";

export function renderActionBar(container: HTMLElement) {
  container.innerHTML = `
    <div class="action-bar">
      <div class="action-left">
        <span id="save-indicator" class="save-indicator">—</span>
      </div>
      <div class="action-center">
        <input id="commit-msg" class="commit-input" placeholder="Commit message…" value="Update products" />
      </div>
      <div class="action-right">
        <button id="btn-pull" class="btn secondary">↓ Pull</button>
        <button id="btn-history" class="btn secondary">History</button>
        <button id="btn-build" class="btn primary">↑ Build &amp; Push</button>
      </div>
    </div>
  `;

  document.getElementById("btn-build")?.addEventListener("click", onBuild);
  document.getElementById("btn-pull")?.addEventListener("click", onPull);
  document.getElementById("btn-history")?.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("cms:show-history"));
  });

  // Ctrl+Enter → build
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") onBuild();
  });

  subscribe(updateBuildBtn);
}

function updateBuildBtn() {
  const btn = document.getElementById("btn-build") as HTMLButtonElement | null;
  if (!btn) return;
  const { buildStatus } = state;
  btn.disabled = buildStatus === "building";
  btn.textContent =
    buildStatus === "building" ? "Building…"
    : buildStatus === "success" ? "✓ Pushed!"
    : buildStatus === "error"   ? "✗ Error"
    : "↑ Build & Push";
}

async function onBuild() {
  const { config, products } = state;
  if (!config?.repo_path) return alert("No repo configured.");

  // Validate all products
  const errors = products.flatMap((p) => validateProduct(p, products));
  if (errors.length) {
    alert("Validation errors:\n" + errors.map((e) => e.message).join("\n"));
    return;
  }

  const msgEl = document.getElementById("commit-msg") as HTMLInputElement;
  const message = msgEl.value.trim() || "Update products";

  setBuildStatus("building");
  try {
    const json = JSON.stringify(products, null, 2);
    await writeProducts(config.repo_path, json);
    await gitCommitPush(config.repo_path, message, config.default_branch);
    setBuildStatus("success", "Pushed successfully");
    setTimeout(() => setBuildStatus("idle"), 4000);
  } catch (err: any) {
    setBuildStatus("error", String(err));
    alert("Build failed:\n" + err);
  }
}

async function onPull() {
  const { config } = state;
  if (!config?.repo_path) return alert("No repo configured.");
  try {
    const out = await gitPull(config.repo_path);
    alert("Pull complete:\n" + out);
  } catch (err) {
    alert("Pull failed:\n" + err);
  }
}
