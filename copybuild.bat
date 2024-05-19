@echo off
set destination=.\version\
set source1=src-tauri\target\release\eeSteam.exe
set source2=src-tauri\target\release\bundle\msi\eeSteam_0.1.0_x64_en-US.msi
set source3=src-tauri\target\release\bundle\nsis\eeSteam_0.1.0_x64-setup.exe

xcopy /y %source1% %destination%
xcopy /y %source2% %destination%
xcopy /y %source3% %destination%
