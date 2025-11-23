"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  FaMusic,
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaTimes,
  FaRandom,
  FaRedoAlt,
} from "react-icons/fa";
import * as musicMetadata from "music-metadata-browser";
import { getMusicFiles } from "./utils/getMusicFiles";

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
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load music files and extract metadata
  useEffect(() => {
    const loadMusicFiles = async () => {
      try {
        // Get list of music files from the public/music folder
        const musicFiles = getMusicFiles();

        const tracks: Track[] = [];

        for (let i = 0; i < musicFiles.length; i++) {
          const fileUrl = musicFiles[i];

          try {
            // Fetch the audio file
            const response = await fetch(fileUrl);
            const blob = await response.blob();

            // Parse metadata
            const metadata = await musicMetadata.parseBlob(blob);

            // Extract album art
            let coverUrl = "/hero2.png"; // Default fallback
            if (metadata.common.picture && metadata.common.picture.length > 0) {
              const picture = metadata.common.picture[0];
              const blob = new Blob([new Uint8Array(picture.data)], {
                type: picture.format,
              });
              coverUrl = URL.createObjectURL(blob);
            }

            // Format duration
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
            // Add track with basic info if metadata extraction fails
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

  // Auto-play when playlist loads
  useEffect(() => {
    if (playlist.length > 0 && !loading && audioRef.current) {
      audioRef.current.src = playlist[0].url;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Autoplay prevented:", err));
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
        // Random track that's not the current one
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
        // Random track that's not the current one
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
    <div className="min-h-screen bg-primary  relative overflow-hidden">
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
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.15,
          }}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            background:
              i % 3 === 0 ? "#e9ec6b" : i % 3 === 1 ? "#9be8a1" : "#fe8daa",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: `0 0 10px ${
              i % 3 === 0 ? "#e9ec6b" : i % 3 === 1 ? "#9be8a1" : "#fe8daa"
            }`,
          }}
        />
      ))}

      {/* Hero Section */}
      <section className="relative  z-10 flex items-center mx-auto w-[90%] px-6 min-h-[calc(100vh-56px)]">
        <div className="grid  lg:grid-cols-2 gap-x-12 flex-1 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left  py-10 relative z-20"
          >
            {/* Glowing badge */}
            {/* <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-lemon/10 border border-lemon/30 rounded-full px-5 py-2 mb-6 backdrop-blur-sm"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-lemon text-xl"
              >
                ⚡
              </motion.span>
              <span className="text-lemon font-semibold text-sm">
                Decentralized Music Label
              </span>
            </motion.div> */}

            <h1 className="text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-lemon via-secondary to-lemon bg-clip-text text-transparent animate-pulse font-[Patrick_Hand]">
              Vibe with Ovd.
            </h1>

            {/* Glowing underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 0.5, duration: 3 }}
              className="h-1 bg-gradient-to-r from-lemon to-secondary rounded-full mb-8 shadow-lg shadow-lemon/50"
            />

            <p className="text-xl lg:text-2xl text-myWhite/90 mb-4 max-w-2xl font-light">
              Where creativity meets{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-lovelypink font-semibold">
                blockchain innovation
              </span>
            </p>

            <p className="text-lg text-myWhite/70 mb-8 max-w-xl leading-relaxed">
              Hold{" "}
              <span className="inline-flex items-center gap-1 text-lemon font-bold">
                <span className="inline-block scale-x-[-1]">𝄢</span> Clef
              </span>{" "}
              tokens to unlock exclusive music, NFTs, and premium services
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-primary/50 backdrop-blur-sm border border-lemon/30 rounded-full px-4 py-2 flex items-center gap-2"
              >
                {/* <span className="text-xl">🎵</span> */}
                <span className="text-lemon text-sm font-semibold">Music</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-primary/50 backdrop-blur-sm border border-secondary/30 rounded-full px-4 py-2 flex items-center gap-2"
              >
                {/* <span className="text-xl">⛓️</span> */}
                <span className="text-secondary text-sm font-semibold">
                  Blockchain
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-primary/50 backdrop-blur-sm border border-lovelypink/30 rounded-full px-4 py-2 flex items-center gap-2"
              >
                {/* <span className="text-xl">🎨</span> */}
                <span className="text-lovelypink text-sm font-semibold">
                  Arts
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-primary/50 backdrop-blur-sm border border-myWhite/30 rounded-full px-4 py-2 flex items-center gap-2"
              >
                {/* <span className="text-xl">👕</span> */}
                <span className="text-myWhite text-sm font-semibold">
                  Fashion
                </span>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/sounds">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(233, 236, 107, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-gradient-to-r from-lemon to-secondary text-primary px-10 py-4 rounded-full text-lg font-bold shadow-lg shadow-lemon/40 transition-all overflow-hidden group"
                >
                  <span className="relative z-10">Join the Label</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary to-lemon opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </motion.button>
              </Link>
              <Link href="/pricing">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative border-2 border-lemon text-lemon px-10 py-4 rounded-full text-lg font-bold hover:bg-lemon/10 transition-all backdrop-blur-sm group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Clef Tokens
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Image with advanced effects */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] lg:h-[450px] hidden lg:block"
          >
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(233, 236, 107, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(233, 236, 107, 0.1) 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            {/* Main image container */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
              {/* Glowing backdrop */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-lemon/20 via-secondary/20 to-lovelypink/20 blur-3xl"
              />

              {/* Image with multiple border effects */}
              <div className="relative w-full h-full border-2 border-lemon/50 rounded-3xl overflow-hidden shadow-2xl shadow-lemon/30">
                <Image
                  src="/hero2.png"
                  alt="Ovd"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Animated scanline effect */}
                <motion.div
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-lemon/10 to-transparent h-32"
                  style={{ filter: "blur(2px)" }}
                />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-lemon" />
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-secondary" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-lovelypink" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-lemon" />

                {/* Pulsing outer glow */}
                <motion.div
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-1 border-2 border-secondary/50 rounded-3xl pointer-events-none blur-sm"
                />
              </div>

              {/* Floating icons around image */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 pointer-events-none"
              >
                {/* Clef symbol */}
                <div className="absolute -top-8 -right-8 text-6xl scale-x-[-1] opacity-80">
                  <motion.span
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-lemon drop-shadow-[0_0_10px_rgba(233,236,107,0.8)]"
                  >
                    𝄢
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Feature 1 */}
          <motion.div
            whileHover={{ y: -10 }}
            className="backdrop-blur-md bg-gradient-to-br from-primary/60 via-purple-900/30 to-indigo-900/40 border border-lemon/20 rounded-2xl p-8 hover:border-lemon/50 transition-all"
          >
            <div className="w-16 h-16 bg-lemon/20 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">🎵</span>
            </div>
            <h3 className="text-2xl font-bold text-lemon mb-4">Sound NFTs</h3>
            <p className="text-myWhite/70">
              Own unique audio assets on the blockchain. Buy, sell, and trade
              exclusive sounds from emerging artists.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            whileHover={{ y: -10 }}
            className="backdrop-blur-md bg-gradient-to-br from-primary/60 via-purple-900/30 to-indigo-900/40 border border-secondary/20 rounded-2xl p-8 hover:border-secondary/50 transition-all"
          >
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">🔗</span>
            </div>
            <h3 className="text-2xl font-bold text-secondary mb-4">
              Decentralized
            </h3>
            <p className="text-myWhite/70">
              Built on blockchain technology for transparent ownership, secure
              transactions, and creator royalties.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            whileHover={{ y: -10 }}
            className="backdrop-blur-md bg-gradient-to-br from-primary/60 via-purple-900/30 to-indigo-900/40 border border-lovelypink/20 rounded-2xl p-8 hover:border-lovelypink/50 transition-all"
          >
            <div className="w-16 h-16 bg-lovelypink/20 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">💎</span>
            </div>
            <h3 className="text-2xl font-bold text-lovelypink mb-4">
              Rare Collectibles
            </h3>
            <p className="text-myWhite/70">
              Discover limited edition samples, beats, and vocals. Build your
              collection of audio treasures.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-gradient-to-br from-primary/40 via-purple-900/20 to-indigo-900/30 border border-lemon/10 rounded-3xl p-12"
        >
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <h4 className="text-5xl font-bold text-lemon mb-2">10K+</h4>
              <p className="text-myWhite/60 text-lg">Sound NFTs</p>
            </div>
            <div>
              <h4 className="text-5xl font-bold text-secondary mb-2">5K+</h4>
              <p className="text-myWhite/60 text-lg">Creators</p>
            </div>
            <div>
              <h4 className="text-5xl font-bold text-lovelypink mb-2">50K+</h4>
              <p className="text-myWhite/60 text-lg">Collectors</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-lemon mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-myWhite/70 mb-10 max-w-2xl mx-auto">
            Join thousands of creators and collectors in the new era of digital
            music ownership
          </p>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-lemon to-secondary text-primary px-12 py-5 rounded-full text-xl font-bold shadow-2xl shadow-lemon/40 hover:shadow-lemon/60 transition-all"
            >
              Get Started Now
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Floating Music Player Button */}
      <div
        className="fixed bottom-8 right-8 z-50"
        onMouseEnter={() => setIsHoveringPlayer(true)}
        onMouseLeave={() => setIsHoveringPlayer(false)}
      >
        <motion.div className="relative">
          {/* Expandable Container */}
          <motion.div
            animate={{
              width: isHoveringPlayer ? 280 : 64,
              borderRadius: isHoveringPlayer ? "9999px" : "9999px",
            }}
            className="bg-gradient-to-br from-lemon to-secondary shadow-2xl shadow-lemon/40 h-16 flex items-center overflow-hidden"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Play/Pause Button (Left) */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-16 h-16 flex items-center justify-center shrink-0 relative z-10"
            >
              {isPlaying ? (
                <FaPause className="text-primary text-2xl" />
              ) : (
                <FaPlay className="text-primary text-2xl ml-1" />
              )}
            </motion.button>

            {/* Extended Info - Visible on Hover */}
            {playlist.length > 0 && (
              <motion.div
                animate={{
                  opacity: isHoveringPlayer ? 1 : 0,
                  x: isHoveringPlayer ? 0 : -20,
                }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 px-4 flex-1 min-w-0"
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold text-sm truncate"
                    style={{ color: "#25092c" }}
                  >
                    {playlist[currentTrack]?.title || "No Track"}
                  </p>
                  <p
                    className="text-xs truncate"
                    style={{ color: "rgba(37, 9, 44, 0.7)" }}
                  >
                    {playlist[currentTrack]?.artist || "Unknown Artist"}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPlayerOpen(!isPlayerOpen)}
                  className="w-10 h-10 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors shrink-0"
                >
                  <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{
                      duration: 3,
                      repeat: isPlaying ? Infinity : 0,
                      ease: "linear",
                    }}
                  >
                    <FaMusic className="text-primary text-sm" />
                  </motion.div>
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Pulsing Border */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-lemon pointer-events-none"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Music Player Modal */}
      <AnimatePresence>
        {isPlayerOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100, y: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 100, y: 100 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-28 right-8 w-96 bg-primary/95 backdrop-blur-xl border-2 border-lemon/50 rounded-3xl shadow-2xl shadow-lemon/30 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-lemon/20 to-secondary/20 p-4 flex items-center justify-between border-b border-lemon/30">
              <h3 className="text-lemon font-bold text-lg flex items-center gap-2">
                <FaMusic className="text-sm" />
                Now Playing
              </h3>
              <button
                onClick={() => setIsPlayerOpen(false)}
                className="text-myWhite/70 hover:text-lemon transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <FaMusic className="text-lemon text-4xl" />
                </motion.div>
                <p className="text-myWhite/70 mt-4">Loading music...</p>
              </div>
            ) : playlist.length === 0 ? (
              <div className="p-12 text-center">
                <FaMusic className="text-myWhite/30 text-4xl mx-auto mb-4" />
                <p className="text-myWhite/70">No music files found</p>
                <p className="text-myWhite/50 text-sm mt-2">
                  Add .mp3 files to the /public/music folder
                </p>
              </div>
            ) : (
              <>
                {/* Current Track Display */}
                <div className="p-6 border-b border-lemon/10">
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-lemon/30">
                      <Image
                        src={playlist[currentTrack].cover}
                        alt={playlist[currentTrack].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-myWhite font-bold text-lg mb-1">
                        {playlist[currentTrack].title}
                      </h4>
                      <p className="text-secondary text-sm mb-2">
                        {playlist[currentTrack].artist}
                      </p>
                      <p className="text-myWhite/50 text-xs">
                        {playlist[currentTrack].duration}
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-6 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevTrack}
                      disabled={playlist.length <= 1}
                      className="text-lemon hover:text-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <FaStepBackward className="text-xl" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={togglePlay}
                      className="w-14 h-14 bg-gradient-to-r from-lemon to-secondary rounded-full flex items-center justify-center shadow-lg shadow-lemon/40"
                    >
                      {isPlaying ? (
                        <FaPause className="text-primary text-xl" />
                      ) : (
                        <FaPlay className="text-primary text-xl ml-1" />
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextTrack}
                      disabled={playlist.length <= 1}
                      className="text-lemon hover:text-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <FaStepForward className="text-xl" />
                    </motion.button>
                  </div>

                  {/* Loop and Shuffle Controls */}
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleLoop}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        isLooping
                          ? "bg-lemon/20 border border-lemon/40 text-lemon"
                          : "bg-primary/40 border border-myWhite/20 text-myWhite/60 hover:text-lemon hover:border-lemon/20"
                      }`}
                    >
                      <FaRedoAlt className="text-sm" />
                      <span className="text-xs font-semibold">Loop</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleShuffle}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        isShuffle
                          ? "bg-secondary/20 border border-secondary/40 text-secondary"
                          : "bg-primary/40 border border-myWhite/20 text-myWhite/60 hover:text-secondary hover:border-secondary/20"
                      }`}
                    >
                      <FaRandom className="text-sm" />
                      <span className="text-xs font-semibold">Shuffle</span>
                    </motion.button>
                  </div>
                </div>

                {/* Playlist */}
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-4">
                    <h4 className="text-myWhite/70 text-sm font-semibold mb-3 uppercase tracking-wide">
                      Playlist ({playlist.length}{" "}
                      {playlist.length === 1 ? "track" : "tracks"})
                    </h4>
                    <div className="space-y-2">
                      {playlist.map((track, index) => (
                        <motion.div
                          key={track.id}
                          whileHover={{ x: 4 }}
                          onClick={() => selectTrack(index)}
                          className={`p-3 rounded-xl cursor-pointer transition-all ${
                            currentTrack === index
                              ? "bg-lemon/20 border border-lemon/40"
                              : "bg-primary/40 border border-transparent hover:border-lemon/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={track.cover}
                                alt={track.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`font-semibold text-sm truncate ${
                                  currentTrack === index
                                    ? "text-lemon"
                                    : "text-myWhite"
                                }`}
                              >
                                {track.title}
                              </p>
                              <p className="text-myWhite/50 text-xs truncate">
                                {track.artist}
                              </p>
                            </div>
                            <p className="text-myWhite/40 text-xs flex-shrink-0">
                              {track.duration}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden audio element */}
      <audio ref={audioRef} onEnded={handleTrackEnd} />
    </div>
  );
}
