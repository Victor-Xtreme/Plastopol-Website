// src/components/ActionBar.ts

import { state, subscribe, setBuildStatus } from "../lib/store";
import { gitCommitPush, gitPull, writeProducts } from "../lib/tauri";
import { validateProduct } from "../lib/product";
import { cmsLog, cmsErr } from "../lib/logger";

export function renderActionBar(container: HTMLElement) {
  container.innerHTML = `
    <div class="action-bar">
      <div class="action-left">
        <button id="btn-settings" class="btn-settings" title="Change repo path">⚙ Repo</button>
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

  document.getElementById("btn-build")!.addEventListener("click", onBuild);
  document.getElementById("btn-settings")!.addEventListener("click", () => {
    cmsLog("ActionBar", "⚙ Repo clicked — dispatching cms:open-settings");
    document.dispatchEvent(new CustomEvent("cms:open-settings"));
  });
  document.getElementById("btn-pull")!.addEventListener("click", onPull);
  document.getElementById("btn-history")!.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("cms:show-history"));
  });

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
  cmsLog("ActionBar", "Build & Push clicked");
  const { config, products } = state;
  if (!config?.repo_path) return alert("No repo configured.");

  const errors = products.flatMap((p) => validateProduct(p, products));
  if (errors.length) {
    alert("Validation errors:\n" + errors.map((e) => e.message).join("\n"));
    return;
  }

  const msgEl = document.getElementById("commit-msg") as HTMLInputElement;
  const message = msgEl.value.trim() || "Update products";

  setBuildStatus("building");
  try {
    cmsLog("ActionBar", "writeProducts → repo:", config.repo_path);
    const json = JSON.stringify(products, null, 2);
    await writeProducts(config.repo_path, json);
    cmsLog("ActionBar", "writeProducts OK — gitCommitPush branch:", config.default_branch);
    await gitCommitPush(config.repo_path, message, config.default_branch);
    cmsLog("ActionBar", "gitCommitPush OK");
    setBuildStatus("success", "Pushed successfully");
    setTimeout(() => setBuildStatus("idle"), 4000);
  } catch (err: any) {
    cmsErr("ActionBar", "Build failed:", String(err));
    setBuildStatus("error", String(err));
    alert("Build failed:\n" + err);
  }
}

async function onPull() {
  cmsLog("ActionBar", "Pull clicked. state.config:", JSON.stringify(state.config));
  const { config } = state;
  if (!config?.repo_path) return alert("No repo configured.");

  const btn = document.getElementById("btn-pull") as HTMLButtonElement;
  btn.disabled = true;
  btn.textContent = "Pulling…";

  try {
    cmsLog("ActionBar", "calling gitPull(), repo:", config.repo_path);
    const out = await gitPull(config.repo_path);
    cmsLog("ActionBar", "gitPull() succeeded, output:", out);
    cmsLog("ActionBar", "dispatching cms:config-saved to trigger loadProducts()");
    document.dispatchEvent(new CustomEvent("cms:config-saved"));
    alert("Pull complete:\n" + out);
  } catch (err) {
    cmsErr("ActionBar", "gitPull() FAILED:", String(err));
    alert("Pull failed:\n" + err);
  } finally {
    btn.disabled = false;
    btn.textContent = "↓ Pull";
  }
}
