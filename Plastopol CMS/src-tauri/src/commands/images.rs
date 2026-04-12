use std::fs;
use std::path::PathBuf;

fn images_dir(repo_path: &str) -> PathBuf {
    PathBuf::from(repo_path)
        .join("public")
        .join("images")
        .join("products")
}

/// Copies an image from any source path into the products image directory,
/// renaming it to the given filename (e.g. "chair-001.jpg").
#[tauri::command]
pub fn copy_image(
    repo_path: String,
    source_path: String,
    filename: String,
) -> Result<(), String> {
    let dest_dir = images_dir(&repo_path);
    fs::create_dir_all(&dest_dir).map_err(|e| e.to_string())?;
    let dest = dest_dir.join(&filename);
    fs::copy(&source_path, &dest)
        .map(|_| ())
        .map_err(|e| format!("Copy failed: {}", e))
}

/// Deletes a named image file from the products image directory.
#[tauri::command]
pub fn delete_image(repo_path: String, filename: String) -> Result<(), String> {
    let path = images_dir(&repo_path).join(&filename);
    if path.exists() {
        fs::remove_file(&path).map_err(|e| e.to_string())
    } else {
        Err(format!("File not found: {}", filename))
    }
}

/// Lists all image filenames in the products image directory.
#[tauri::command]
pub fn list_images(repo_path: String) -> Result<Vec<String>, String> {
    let dir = images_dir(&repo_path);
    if !dir.exists() {
        return Ok(vec![]);
    }
    let entries = fs::read_dir(&dir).map_err(|e| e.to_string())?;
    let mut names: Vec<String> = entries
        .filter_map(|e| {
            let entry = e.ok()?;
            let name = entry.file_name().to_string_lossy().to_string();
            // Only image files
            if name.ends_with(".jpg") || name.ends_with(".jpeg")
                || name.ends_with(".png") || name.ends_with(".webp")
            {
                Some(name)
            } else {
                None
            }
        })
        .collect();
    names.sort();
    Ok(names)
}
