use serde::{Deserialize, Serialize};
use std::process::Command;

fn run_git(repo: &str, args: &[&str]) -> Result<String, String> {
    let out = Command::new("git")
        .args(args)
        .current_dir(repo)
        .output()
        .map_err(|e| format!("Failed to run git: {}", e))?;

    if out.status.success() {
        Ok(String::from_utf8_lossy(&out.stdout).trim().to_string())
    } else {
        Err(String::from_utf8_lossy(&out.stderr).trim().to_string())
    }
}

#[tauri::command]
pub fn git_pull(repo_path: String) -> Result<String, String> {
    run_git(&repo_path, &["pull"])
}

#[tauri::command]
pub fn git_commit_push(
    repo_path: String,
    message: String,
    branch: String,
) -> Result<String, String> {
    run_git(&repo_path, &["add", "."])?;
    run_git(&repo_path, &["commit", "-m", &message])?;
    run_git(&repo_path, &["push", "origin", &branch])
}

#[derive(Serialize, Deserialize)]
pub struct CommitEntry {
    pub hash: String,
    pub message: String,
    pub date: String,
}

#[tauri::command]
pub fn git_log(repo_path: String) -> Result<Vec<CommitEntry>, String> {
    let raw = run_git(
        &repo_path,
        &["log", "--oneline", "--format=%H|%s|%cd", "--date=short", "-20"],
    )?;
    let entries = raw
        .lines()
        .filter_map(|line| {
            let parts: Vec<&str> = line.splitn(3, '|').collect();
            if parts.len() == 3 {
                Some(CommitEntry {
                    hash: parts[0].to_string(),
                    message: parts[1].to_string(),
                    date: parts[2].to_string(),
                })
            } else {
                None
            }
        })
        .collect();
    Ok(entries)
}

#[tauri::command]
pub fn git_revert_last(repo_path: String) -> Result<String, String> {
    run_git(&repo_path, &["revert", "--no-edit", "HEAD"])
}
