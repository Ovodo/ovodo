# Music Folder

Add your music files (`.mp3`, `.wav`, `.m4a`, etc.) to this folder.

## How to Add New Music

1. **Add your music file** to this folder (`/public/music/`)

   - Example: `YourSong.mp3`

2. **Update the music files list** in `/app/utils/getMusicFiles.ts`

   - Add the path to your new file in the array:

   ```typescript
   return [
     "/music/Fami.mp3",
     "/music/YourSong.mp3", // Add this line
   ];
   ```

3. **Reload your app** - The player will automatically:
   - Extract the song title, artist, and duration from the file's metadata
   - Display the embedded album artwork (if present)
   - Add it to the playlist

## Metadata Tips

For best results, make sure your music files have proper ID3 tags:

- **Title**: Song name
- **Artist**: Artist name
- **Album Art**: Embedded cover image

You can edit these using tools like:

- **Windows**: Windows Media Player, Mp3tag
- **Mac**: Music app, Kid3
- **Linux**: EasyTAG, Kid3

## Current Files

- Fami.mp3
