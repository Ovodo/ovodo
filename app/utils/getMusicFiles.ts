/**
 * Get all music files from the public/music directory
 * This function should be updated manually when you add new music files
 * Or you can use the API route to scan the directory dynamically
 */

export const getMusicFiles = (): string[] => {
  // Add your music files here as you add them to public/music
  return [
    '/music/Fami.mp3',
    '/music/Siren.mp3',
    // Add more files here like:
    // '/music/YourSong.mp3',
    // '/music/AnotherTrack.mp3',
  ];
};
