use std::fs;
use std::path::PathBuf;

fn products_path(repo_path: &str) -> PathBuf {
    PathBuf::from(repo_path).join("content").join("products.json")
}

/// Reads products.json and returns raw JSON string.
#[tauri::command]
pub fn read_products(repo_path: String) -> Result<String, String> {
    let path = products_path(&repo_path);
    fs::read_to_string(&path).map_err(|e| format!("Cannot read products.json: {}", e))
}

/// Writes products.json atomically via a temp file to prevent corruption.
#[tauri::command]
pub fn write_products(repo_path: String, json: String) -> Result<(), String> {
    // Validate JSON before writing
    serde_json::from_str::<serde_json::Value>(&json)
        .map_err(|e| format!("Invalid JSON: {}", e))?;

    let path = products_path(&repo_path);
    let tmp_path = path.with_extension("json.tmp");

    // Write to temp file first
    fs::write(&tmp_path, &json)
        .map_err(|e| format!("Cannot write temp file: {}", e))?;

    // Atomically rename
    fs::rename(&tmp_path, &path)
        .map_err(|e| format!("Cannot finalize write: {}", e))?;

    Ok(())
}
