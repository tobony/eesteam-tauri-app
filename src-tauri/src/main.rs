// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// use tauri::Manager;
// use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

// fn main() {
//     let ctx = tauri::generate_context!();
//     tauri::Builder::default()
// .setup(|app| {
//     let window = app.get_window("main").unwrap();

//     // 웹뷰에서 window.__TAURI__.shell.open 함수를 사용할 수 있도록 합니다.
//     window.set_title("Calculator App").unwrap();
//     Ok(())
// })
// .menu(Menu::new()) // 기본 메뉴를 제거합니다.
//         .run(ctx)
//         .expect("error while running tauri application");
// }
