@echo off
REM Converts all PNG and JPG images in public/ to WebP using cwebp, deletes originals, and converts videos to WebP using ffmpeg

REM Change directory to the public folder
cd /d "%~dp0public"

REM Convert PNG files to WebP and delete originals
for /R %%f in (*.png) do (
    echo Converting %%f to WebP...
    cwebp -q 80 "%%f" -o "%%~dpnf.webp"
    if exist "%%~dpnf.webp" del "%%f"
)

REM Convert JPG/JPEG files to WebP and delete originals
for /R %%f in (*.jpg *.jpeg) do (
    echo Converting %%f to WebP...
    cwebp -q 80 "%%f" -o "%%~dpnf.webp"
    if exist "%%~dpnf.webp" del "%%f"
)

REM Convert videos (mp4, webm) to animated WebP using ffmpeg
@REM for /R %%f in (*.mp4 *.webm) do (
@REM     echo Converting %%f to animated WebP...
@REM     ffmpeg -i "%%f" -vcodec libwebp -filter:v fps=fps=15 -lossless 0 -q:v 80 -loop 0 -preset default -an -vsync 0 -s 800:600 "%%~dpnf.webp"
@REM )

echo Done!
pause