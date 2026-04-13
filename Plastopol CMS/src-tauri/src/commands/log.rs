// src-tauri/src/commands/log.rs
use std::fs::{OpenOptions};
use std::io::Write;
use std::path::PathBuf;
use chrono::Local;

fn log_path(repo_path: &str) -> PathBuf {
    PathBuf::from(repo_path).join("cms-logs.txt")
}

#[tauri::command]
pub fn write_log(repo_path: String, message: String) -> Result<(), String> {
    let path = log_path(&repo_path);
    let timestamp = Local::now().format("%Y-%m-%d %H:%M:%S%.3f");
    let line = format!("[{}] {}\n", timestamp, message);

    let mut file = OpenOptions::new()
        .create(true)
        .append(true)
        .open(&path)
        .map_err(|e| format!("Cannot open log file: {}", e))?;

    file.write_all(line.as_bytes())
        .map_err(|e| format!("Cannot write log: {}", e))
}