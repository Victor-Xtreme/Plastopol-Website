use std::fs;
use std::path::PathBuf;

fn images_dir(repo_path: &str) -> PathBuf {
    PathBuf::from(repo_path)
        .join("public")
        .join("images")
        .join("products")
}

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

#[tauri::command]
pub fn delete_image(repo_path: String, filename: String) -> Result<(), String> {
    let path = images_dir(&repo_path).join(&filename);
    if path.exists() {
        fs::remove_file(&path).map_err(|e| e.to_string())
    } else {
        Err(format!("File not found: {}", filename))
    }
}

#[tauri::command]
pub fn list_images(repo_path: String) -> Result<Vec<String>, String> {
    let dir = images_dir(&repo_path);
    if !dir.exists() {
        return Ok(vec![]);
    }
    let mut names: Vec<String> = fs::read_dir(&dir)
        .map_err(|e| e.to_string())?
        .filter_map(|e| {
            let name = e.ok()?.file_name().to_string_lossy().to_string();
            let ext = name.to_lowercase();
            if ext.ends_with(".jpg") || ext.ends_with(".jpeg")
                || ext.ends_with(".png") || ext.ends_with(".webp")
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
