"use client";
import { useEffect, useState } from "react";
import { SpotifyTrack } from "@/types/spotify";
import Image from "next/image";
import Link from "next/link";
const MusicPage = () => {
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [error, setError] = useState<string>("");

  const fetchNowPlaying = async () => {
    try {
      const response = await fetch("/api/spotify/now-playing");
      const data = await response.json();

      if (response.ok && data.isPlaying) {
        setCurrentTrack(data.track);
        setIsPlaying(data.isPlaying);
        setLastUpdated(new Date().toLocaleTimeString());
        setError("");
      } else {
        setCurrentTrack(null);
        setIsPlaying(false);
        setError(data.message || "Not currently playing");
      }
    } catch (err) {
      console.error("Error fetching now playing:", err);
      setError("Failed to fetch current track");
    }
  };

  useEffect(() => {
    // Fetch immediately
    fetchNowPlaying();

    // Then fetch every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            🎵 Music Room
          </h1>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto">
            Join me in real-time! See what I&apos;m currently listening to on
            Spotify.
            {lastUpdated && (
              <span className="block mt-2 text-sm text-primary/60">
                Last updated: {lastUpdated}
              </span>
            )}
          </p>
        </div>

        {/* Current Track Display */}
        <div className="bg-slate-500/20 backdrop-blur-lg rounded-2xl p-8 border border-primary/10">
          {error ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😴</div>
              <h2 className="text-2xl font-semibold text-primary mb-2">
                Nothing Playing Right Now
              </h2>
              <p className="text-primary/70">{error}</p>
              <button
                onClick={fetchNowPlaying}
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Refresh
              </button>
            </div>
          ) : currentTrack ? (
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Album Art */}
              <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={currentTrack.albumArt}
                  alt={`${currentTrack.album} album art`}
                  fill
                  className="object-cover"
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Track Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                    {isPlaying ? "🔴 Live" : "⏸️ Paused"}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {currentTrack.name}
                </h2>

                <p className="text-xl text-primary/80 mb-1">
                  by {currentTrack.artists.join(", ")}
                </p>

                <p className="text-lg text-primary/60 mb-6">
                  from &quot;{currentTrack.album}&quot;
                </p>

                {/* External Link */}
                {currentTrack.external_url && (
                  <Link
                    href={currentTrack.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.959-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.361 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    Listen on Spotify
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full mx-auto mb-4"></div>
              <p className="text-primary/70">Loading current track...</p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-primary mb-4">
            How it works
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-primary/70">
            <div className="p-4 bg-slate-500/10 rounded-lg">
              <div className="text-2xl mb-2">🎧</div>
              <p>Real-time sync with my Spotify account</p>
            </div>
            <div className="p-4 bg-slate-500/10 rounded-lg">
              <div className="text-2xl mb-2">🔄</div>
              <p>Updates every 30 seconds automatically</p>
            </div>
            <div className="p-4 bg-slate-500/10 rounded-lg">
              <div className="text-2xl mb-2">🔗</div>
              <p>Click to listen along on your own Spotify</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
