#!/bin/bash
# Converts all PNG and JPG images in public/ to WebP using cwebp, deletes originals, and converts videos to WebP using ffmpeg

cd "$(dirname "$0")/public" || exit 1

# Convert PNG files to WebP and delete originals
find . -type f -iname "*.png" -exec sh -c '
  for img; do
    echo "Converting $img to WebP..."
    cwebp -q 80 "$img" -o "${img%.*}.webp" && rm "$img"
  done
' sh {} +

# Convert JPG/JPEG files to WebP and delete originals
find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -exec sh -c '
  for img; do
    echo "Converting $img to WebP..."
    cwebp -q 80 "$img" -o "${img%.*}.webp" && rm "$img"
  done
' sh {} +

# Convert videos (mp4, webm) to animated WebP using ffmpeg (uncomment if needed)
# find . -type f \( -iname "*.mp4" -o -iname "*.webm" \) -exec sh -c '
#   for vid; do
#     echo "Converting $vid to animated WebP..."
#     ffmpeg -i "$vid" -vcodec libwebp -filter:v fps=fps=15 -lossless 0 -q:v 80 -loop 0 -preset default -an -vsync 0 -s 800:600 "${vid%.*}.webp"
#   done
# ' sh {} +

echo "Done!"