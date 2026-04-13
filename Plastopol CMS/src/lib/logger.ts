// src/lib/logger.ts
// Writes log entries to <repo_path>/cms-logs.txt via Tauri fs plugin.
// Falls back to console if no repo path is set yet.

import { writeTextFile, readTextFile } from "@tauri-apps/plugin-fs";
import { state } from "./store";

const MAX_LINES = 500;
let queue: string[] = [];
let flushing = false;

function timestamp(): string {
  return new Date().toISOString().replace("T", " ").slice(0, 23);
}

export function log(level: "INFO" | "WARN" | "ERROR", tag: string, ...args: unknown[]) {
  const parts = args.map(a =>
    typeof a === "object" ? JSON.stringify(a) : String(a)
  );
  const line = `[${timestamp()}] [${level}] [${tag}] ${parts.join(" ")}`;

  // Always mirror to console so devtools still works if open
  if (level === "ERROR") console.error(line);
  else if (level === "WARN") console.warn(line);
  else console.log(line);

  queue.push(line);
  scheduleFlush();
}

export const cmsLog  = (tag: string, ...a: unknown[]) => log("INFO",  tag, ...a);
export const cmsWarn = (tag: string, ...a: unknown[]) => log("WARN",  tag, ...a);
export const cmsErr  = (tag: string, ...a: unknown[]) => log("ERROR", tag, ...a);

function scheduleFlush() {
  if (flushing) return;
  flushing = true;
  // Small delay to batch rapid calls
  setTimeout(flush, 300);
}

async function flush() {
  flushing = false;
  const repoPath = state.config?.repo_path;
  if (!repoPath || queue.length === 0) return;

  const logPath = repoPath.replace(/\\/g, "/") + "/cms-logs.txt";
  const batch = queue.splice(0, queue.length).join("\n") + "\n";

  try {
    let existing = "";
    try { existing = await readTextFile(logPath); } catch { /* file may not exist yet */ }

    // Trim to MAX_LINES to avoid unbounded growth
    const lines = existing.split("\n");
    const trimmed = lines.length > MAX_LINES
      ? lines.slice(lines.length - MAX_LINES).join("\n") + "\n"
      : existing;

    await writeTextFile(logPath, trimmed + batch);
  } catch (err) {
    console.error("[logger] failed to write logs.txt:", err);
  }
}
