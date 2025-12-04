"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
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
import { IoMdArrowRoundDown } from "react-icons/io";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  url: string;
}

interface FloatingMusicPlayerProps {
  isHoveringPlayer: boolean;
  setIsHoveringPlayer: (value: boolean) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  playlist: Track[];
  currentTrack: number;
  isPlayerOpen: boolean;
  setIsPlayerOpen: (value: boolean) => void;
  loading: boolean;
  isLooping: boolean;
  toggleLoop: () => void;
  isShuffle: boolean;
  toggleShuffle: () => void;
  prevTrack: () => void;
  nextTrack: () => void;
  selectTrack: (index: number) => void;
}

export default function FloatingMusicPlayer({
  isHoveringPlayer,
  setIsHoveringPlayer,
  isPlaying,
  togglePlay,
  playlist,
  currentTrack,
  isPlayerOpen,
  setIsPlayerOpen,
  loading,
  isLooping,
  toggleLoop,
  isShuffle,
  toggleShuffle,
  prevTrack,
  nextTrack,
  selectTrack,
}: FloatingMusicPlayerProps) {
  const [showHint, setShowHint] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Hide hint after 5 seconds
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setShowHint(false);
    }
  };

  return (
    <>
      {/* Floating Music Player Button */}
      <div
        className="fixed bottom-8 right-8 z-50"
        onMouseEnter={() => {
          setIsHoveringPlayer(true);
          handleInteraction();
        }}
        onMouseLeave={() => setIsHoveringPlayer(false)}
        onClick={handleInteraction}
      >
        {/* Onboarding Hint */}
        <AnimatePresence>
          {showHint && !hasInteracted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-16 right-0 bg-gradient-to-r from-lemon to-secondary px-4 py-2 rounded-lg shadow-lg"
            >
              <div className="flex items-center gap-2">
                <span className="text-primary text-sm font-bold whitespace-nowrap">
                  Tap to explore playlist
                </span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <IoMdArrowRoundDown className="text-primary" size={18} />
                </motion.div>
              </div>
              {/* Arrow pointing down */}
              <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-secondary" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="relative"
          animate={
            showHint && !hasInteracted
              ? {
                  y: [0, -10, 0, -10, 0],
                  scale: [1, 1.05, 1, 1.05, 1],
                }
              : {}
          }
          transition={{
            duration: 2,
            times: [0, 0.25, 0.5, 0.75, 1],
            repeat: showHint && !hasInteracted ? 2 : 0,
            repeatDelay: 1,
          }}
        >
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
                    <h4 className="text-myWhite/70 text-xs font-semibold uppercase mb-3">
                      Playlist ({playlist.length} tracks)
                    </h4>
                    <div className="space-y-2">
                      {playlist.map((track, index) => (
                        <motion.button
                          key={track.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => selectTrack(index)}
                          className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${
                            index === currentTrack
                              ? "bg-lemon/20 border border-lemon/30"
                              : "bg-primary/30 border border-transparent hover:bg-primary/50 hover:border-lemon/20"
                          }`}
                        >
                          <div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
                            <Image
                              src={track.cover}
                              alt={track.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <p
                              className={`text-sm font-semibold truncate ${
                                index === currentTrack
                                  ? "text-lemon"
                                  : "text-myWhite"
                              }`}
                            >
                              {track.title}
                            </p>
                            <p className="text-xs text-myWhite/50 truncate">
                              {track.artist}
                            </p>
                          </div>
                          <span className="text-xs text-myWhite/40 shrink-0">
                            {track.duration}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
