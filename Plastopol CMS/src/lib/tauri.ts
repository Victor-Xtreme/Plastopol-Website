// src/lib/tauri.ts
// Typed wrappers around Tauri's invoke() so the rest of the app
// never imports @tauri-apps/api directly.

import { invoke } from "@tauri-apps/api/tauri";
import { open as dialogOpen } from "@tauri-apps/api/dialog";
import type { CmsConfig, CommitEntry } from "./types";

export async function getConfig(): Promise<CmsConfig> {
  return invoke("get_config");
}

export async function saveConfig(config: CmsConfig): Promise<void> {
  return invoke("save_config", { config });
}

export async function gitPull(repoPath: string): Promise<string> {
  return invoke("git_pull", { repoPath });
}

export async function gitCommitPush(
  repoPath: string,
  message: string,
  branch: string
): Promise<string> {
  return invoke("git_commit_push", { repoPath, message, branch });
}

export async function gitLog(repoPath: string): Promise<CommitEntry[]> {
  return invoke("git_log", { repoPath });
}

export async function gitRevertLast(repoPath: string): Promise<string> {
  return invoke("git_revert_last", { repoPath });
}

export async function readProducts(repoPath: string): Promise<string> {
  return invoke("read_products", { repoPath });
}

export async function writeProducts(
  repoPath: string,
  json: string
): Promise<void> {
  return invoke("write_products", { repoPath, json });
}

export async function copyImage(
  repoPath: string,
  sourcePath: string,
  filename: string
): Promise<void> {
  return invoke("copy_image", { repoPath, sourcePath, filename });
}

export async function deleteImage(
  repoPath: string,
  filename: string
): Promise<void> {
  return invoke("delete_image", { repoPath, filename });
}

export async function listImages(repoPath: string): Promise<string[]> {
  return invoke("list_images", { repoPath });
}

export async function pickFolder(): Promise<string | null> {
  const result = await dialogOpen({ directory: true, multiple: false });
  return typeof result === "string" ? result : null;
}
