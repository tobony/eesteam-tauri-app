@echo off
set destination=.\version\
set source1=src-tauri\target\release\eeSteam.exe
set source3=src-tauri\target\release\bundle\nsis\
@REM set source2=src-tauri\target\release\bundle\msi\

rem Delete all files in the destination folder
del /q %destination%*

xcopy /y %source1% %destination%
xcopy /y %source3%eesteam_*-setup.exe %destination%
@REM xcopy /y %source2%eesteam_*.msi %destination%