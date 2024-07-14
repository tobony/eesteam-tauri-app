@echo off
set destination=.\version\
set source1=src-tauri\target\release\eeSteam.exe
set source2=src-tauri\target\release\bundle\msi\
set source3=src-tauri\target\release\bundle\nsis\

xcopy /y %source1% %destination%
xcopy /y %source2%eesteam_*.msi %destination%
xcopy /y %source3%eesteam_*-setup.exe %destination%