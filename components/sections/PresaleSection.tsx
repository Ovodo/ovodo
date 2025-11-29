"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import PresaleMeter from "@/components/PresaleMeter";

interface PresaleSectionProps {
  onLearnMore: () => void;
}

export default function PresaleSection({ onLearnMore }: PresaleSectionProps) {
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const previewAudioRef = useRef<HTMLAudioElement>(null);

  return (
    <section className="relative z-10 container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="backdrop-blur-md bg-gradient-to-br from-lemon/5 via-primary/60 to-primary/80 border-2 border-lemon/30 rounded-3xl overflow-hidden"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left - Album Art and Header */}
          <div className="p-8 lg:p-12 space-y-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative w-full max-w-md mx-auto"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-lemon/50 shadow-2xl shadow-lemon/40">
                <Image
                  src="/ovdizzle.png"
                  alt="Ovdizzle Album"
                  fill
                  className="object-contain"
                />
                {/* Pulsing glow */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-t from-lemon/20 to-transparent"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-lemon to-secondary px-4 py-2 rounded-full border-2 border-primary shadow-lg"
              >
                <span className="text-primary font-bold text-sm">
                  NEW RELEASE
                </span>
              </motion.div>
            </motion.div>

            {/* Play Preview Button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (previewAudioRef.current) {
                    if (isPreviewPlaying) {
                      previewAudioRef.current.pause();
                      setIsPreviewPlaying(false);
                    } else {
                      previewAudioRef.current.play();
                      setIsPreviewPlaying(true);
                    }
                  }
                }}
                className="flex items-center gap-2 bg-lemon/10 hover:bg-lemon/20 border-2 border-lemon/40 rounded-full px-6 py-3 transition-all group"
              >
                {isPreviewPlaying ? (
                  <FaPause className="text-lemon text-lg" />
                ) : (
                  <FaPlay className="text-lemon text-lg" />
                )}
                <span className="text-lemon font-semibold text-sm">
                  {isPreviewPlaying ? "Pause Preview" : "Play Preview"}
                </span>
              </motion.button>
            </div>

            {/* Hidden audio element for preview */}
            <audio
              ref={previewAudioRef}
              onEnded={() => setIsPreviewPlaying(false)}
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
            >
              <source src="/music/preview.mp3" type="audio/mpeg" />
            </audio>

            {/* Header Info Below Image */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-[Patrick_Hand] font-bold text-lemon mb-2">
                Ovdizzle Presale
              </h2>
              <p className="text-lg text-secondary mb-2">
                Exclusive First Edition NFT Release
              </p>
              <p className="text-myWhite/70 text-sm">
                Early supporters get higher royalty shares. The sooner you join,
                the better your rewards!
              </p>
            </motion.div>
          </div>

          {/* Right - Presale Details with Meter */}
          <div className="p-8 lg:p-12 lg:border-l-2 lg:border-lemon/20">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Presale Meter */}
              <div className="mb-8">
                <PresaleMeter
                  soldTokens={15000}
                  totalTokens={95000}
                  currentPrice={0.5}
                  daysRemaining={25}
                />
              </div>

              {/* Total Royalty Pool */}
              <div className="bg-secondary/10 border-l-4 border-secondary rounded-lg p-4">
                <p className="text-secondary font-bold mb-1 text-sm">
                  Total Royalty Pool: 50%
                </p>
                <p className="text-myWhite/70 text-xs">
                  All token holders share 50% of music royalties forever
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(173, 248, 2, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-lemon to-secondary text-primary px-6 py-4 rounded-full font-bold text-lg shadow-lg shadow-lemon/40"
                >
                  Join Presale
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLearnMore}
                  className="flex-1 border-2 border-lemon text-lemon px-6 py-4 rounded-full font-bold hover:bg-lemon/10 transition-all"
                >
                  Learn More
                </motion.button>
              </div>

              {/* Countdown Timer */}
              <div className="text-center">
                <p className="text-myWhite/50 text-sm mb-3">Presale ends in:</p>
                <div className="flex justify-center gap-3">
                  {["45", "12", "30", "15"].map((num, idx) => (
                    <div
                      key={idx}
                      className="bg-primary/80 border border-lemon/30 rounded-lg px-3 py-2"
                    >
                      <p className="text-lemon font-bold text-xl">{num}</p>
                      <p className="text-myWhite/50 text-xs">
                        {["Days", "Hours", "Mins", "Secs"][idx]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
