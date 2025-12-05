"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import * as musicMetadata from "music-metadata-browser";
import { getMusicFiles } from "./utils/getMusicFiles";
import TierModal from "@/components/TierModal";
import FloatingMusicPlayer from "@/components/FloatingMusicPlayer";
import HeroSection from "@/components/sections/HeroSection";
import PresaleSection from "@/components/sections/PresaleSection";
import TradingBotSection from "@/components/sections/TradingBotSection";
import ArtsSection from "@/components/sections/ArtsSection";
import FashionSection from "@/components/sections/FashionSection";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  url: string;
}

export default function Home() {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isHoveringPlayer, setIsHoveringPlayer] = useState(false);
  const [isTierModalOpen, setIsTierModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<
    "gold" | "silver" | "bronze" | null
  >(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Generate deterministic particle positions to avoid hydration errors
  const particlePositions = Array.from({ length: 25 }, (_, i) => {
    const seed = i * 12345;
    const pseudoRandom1 = ((seed * 9301 + 49297) % 233280) / 233280;
    const pseudoRandom2 = ((seed * 9307 + 49299) % 233281) / 233281;
    const pseudoRandom3 = ((seed * 9311 + 49301) % 233282) / 233282;

    return {
      top: pseudoRandom1 * 100,
      left: pseudoRandom2 * 100,
      xVariation: pseudoRandom3 * 30 - 15,
      color: i % 3 === 0 ? "#e9ec6b" : i % 3 === 1 ? "#9be8a1" : "#fe8daa",
      duration: 4 + pseudoRandom1 * 3,
    };
  });

  // Load music files and extract metadata
  useEffect(() => {
    const loadMusicFiles = async () => {
      try {
        const musicFiles = getMusicFiles();
        const tracks: Track[] = [];

        for (let i = 0; i < musicFiles.length; i++) {
          const fileUrl = musicFiles[i];

          try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const metadata = await musicMetadata.parseBlob(blob);

            let coverUrl = "/hero2.png";
            if (metadata.common.picture && metadata.common.picture.length > 0) {
              const picture = metadata.common.picture[0];
              const blob = new Blob([new Uint8Array(picture.data)], {
                type: picture.format,
              });
              coverUrl = URL.createObjectURL(blob);
            }

            const duration = metadata.format.duration || 0;
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);
            const durationString = `${minutes}:${seconds
              .toString()
              .padStart(2, "0")}`;

            tracks.push({
              id: i + 1,
              title: fileUrl.split("/").pop()?.replace(".mp3", "") || "Unknown",
              artist: "Ovd",
              duration: durationString,
              cover: coverUrl,
              url: fileUrl,
            });
          } catch (error) {
            console.error(`Error loading metadata for ${fileUrl}:`, error);
            tracks.push({
              id: i + 1,
              title: fileUrl.split("/").pop()?.replace(".mp3", "") || "Unknown",
              artist: "Ovd",
              duration: "0:00",
              cover: "/hero2.png",
              url: fileUrl,
            });
          }
        }

        setPlaylist(tracks);
        setLoading(false);
      } catch (error) {
        console.error("Error loading music files:", error);
        setLoading(false);
      }
    };

    loadMusicFiles();
  }, []);

  // Update audio source when track changes
  useEffect(() => {
    if (audioRef.current && playlist.length > 0) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = playlist[currentTrack].url;
      if (wasPlaying || isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.log("Play failed:", err));
      }
    }
  }, [currentTrack, playlist]);

  // Load audio source when playlist loads
  useEffect(() => {
    if (playlist.length > 0 && !loading && audioRef.current) {
      audioRef.current.src = playlist[0].url;
      // Removed auto-play - user must click play button
    }
  }, [playlist, loading]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    if (playlist.length > 0) {
      if (isShuffle) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * playlist.length);
        } while (randomIndex === currentTrack && playlist.length > 1);
        setCurrentTrack(randomIndex);
      } else {
        setCurrentTrack((prev) => (prev + 1) % playlist.length);
      }
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    if (playlist.length > 0) {
      if (isShuffle) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * playlist.length);
        } while (randomIndex === currentTrack && playlist.length > 1);
        setCurrentTrack(randomIndex);
      } else {
        setCurrentTrack(
          (prev) => (prev - 1 + playlist.length) % playlist.length
        );
      }
      setIsPlaying(true);
    }
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
    }
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const handleTrackEnd = () => {
    if (!isLooping) {
      nextTrack();
    }
  };

  return (
    <div className="min-h-screen bg-primary relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-lemon/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-40 left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lovelypink/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Floating particles across entire page */}
      {particlePositions.map((particle, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            x: [0, particle.xVariation, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: i * 0.15,
          }}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            background: particle.color,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            boxShadow: `0 0 10px ${particle.color}`,
          }}
        />
      ))}

      {/* All Sections */}
      <HeroSection />
      <PresaleSection
        onLearnMore={() => {
          setSelectedTier(null);
          setIsTierModalOpen(true);
        }}
      />
      <TradingBotSection />
      <ArtsSection />
      <FashionSection />
      <StatsSection />
      <CTASection />

      {/* Floating Music Player */}
      <FloatingMusicPlayer
        isHoveringPlayer={isHoveringPlayer}
        setIsHoveringPlayer={setIsHoveringPlayer}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        playlist={playlist}
        currentTrack={currentTrack}
        isPlayerOpen={isPlayerOpen}
        setIsPlayerOpen={setIsPlayerOpen}
        loading={loading}
        isLooping={isLooping}
        toggleLoop={toggleLoop}
        isShuffle={isShuffle}
        toggleShuffle={toggleShuffle}
        prevTrack={prevTrack}
        nextTrack={nextTrack}
        selectTrack={selectTrack}
      />

      {/* Hidden audio element */}
      <audio ref={audioRef} onEnded={handleTrackEnd} />

      {/* Tier Details Modal */}
      <TierModal
        isOpen={isTierModalOpen}
        onClose={() => setIsTierModalOpen(false)}
        tier={selectedTier}
        showAll={selectedTier === null}
      />
    </div>
  );
}
