"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { IoMusicalNotes, IoShirt } from "react-icons/io5";
import { BiNetworkChart } from "react-icons/bi";
import { FaPalette } from "react-icons/fa";
import WaitlistModal from "../WaitlistModal";

export default function HeroSection() {
  const progress = 10; // 10% progress
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <section className="relative  z-10 flex items-center mx-auto w-[90%] px-6 min-h-[calc(100vh-56px)]">
      <div className="grid  lg:grid-cols-2 gap-x-12 flex-1 items-center">
        {/* Left Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left  py-10 relative z-20"
        >
          <h1 className="text-6xl lg:text-8xl font-bold mb-6 bg-linear-to-r from-lemon via-secondary to-lemon bg-clip-text text-transparent animate-pulse font-[Patrick_Hand]">
            Own the Art.
          </h1>

          {/* Glowing underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ delay: 0.5, duration: 3 }}
            className="h-1 bg-linear-to-r from-lemon to-secondary rounded-full mb-8 shadow-lg shadow-lemon/50"
          />

          <p className="text-xl lg:text-2xl text-myWhite/90 mb-6 max-w-2xl font-light">
            Where{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-lemon to-secondary font-semibold">
              music
            </span>
            ,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-lovelypink to-complimentsec font-semibold">
              art
            </span>
            , and{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-myWhite to-secondary font-semibold">
              fashion
            </span>{" "}
            meet{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary to-lemon font-semibold">
              blockchain innovation
            </span>
          </p>

          <div className="mb-8 max-w-2xl">
            <p className="text-base lg:text-lg text-myWhite/80 mb-3 leading-relaxed">
              Join a creative ecosystem where artists, collectors, and fans
              connect across music, art,fashion, and technology.
            </p>
            {/* <p className="text-sm lg:text-base text-lemon/90 italic">
              Be first in line for exclusive music drops, collectibles, and
              special access to tracks and albums.
            </p> */}
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{
                scale: 1.1,
                y: -5,
                boxShadow: "0 10px 30px rgba(173, 248, 2, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-linear-to-r from-primary/50 to-primary/30 backdrop-blur-sm border-2 border-lemon/40 rounded-full px-3 py-1.5 flex items-center gap-1.5 cursor-pointer overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-lemon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="relative z-10"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <IoMusicalNotes className="text-lemon text-sm" />
              </motion.div>
              <span className="text-lemon text-xs font-bold relative z-10">
                Music
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{
                scale: 1.1,
                y: -5,
                boxShadow: "0 10px 30px rgba(155, 232, 161, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-linear-to-r from-primary/50 to-primary/30 backdrop-blur-sm border-2 border-secondary/40 rounded-full px-3 py-1.5 flex items-center gap-1.5 cursor-pointer overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.3,
                }}
              />
              <motion.div
                className="relative z-10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <BiNetworkChart className="text-secondary text-sm" />
              </motion.div>
              <span className="text-secondary text-xs font-bold relative z-10">
                Blockchain
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{
                scale: 1.1,
                y: -5,
                boxShadow: "0 10px 30px rgba(254, 141, 170, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-linear-to-r from-primary/50 to-primary/30 backdrop-blur-sm border-2 border-lovelypink/40 rounded-full px-3 py-1.5 flex items-center gap-1.5 cursor-pointer overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-lovelypink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.6,
                }}
              />
              <motion.div
                className="relative z-10"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <FaPalette className="text-lovelypink text-sm" />
              </motion.div>
              <span className="text-lovelypink text-xs font-bold relative z-10">
                Arts
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              whileHover={{
                scale: 1.1,
                y: -5,
                boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-linear-to-r from-primary/50 to-primary/30 backdrop-blur-sm border-2 border-myWhite/40 rounded-full px-3 py-1.5 flex items-center gap-1.5 cursor-pointer overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-myWhite/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.9,
                }}
              />
              <motion.div
                className="relative z-10"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <IoShirt className="text-myWhite text-sm" />
              </motion.div>
              <span className="text-myWhite text-xs font-bold relative z-10">
                Fashion
              </span>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <motion.button
              onClick={() => setIsWaitlistOpen(true)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(233, 236, 107, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-linear-to-r from-lemon to-secondary text-primary px-10 py-4 rounded-full text-lg font-bold shadow-lg shadow-lemon/40 transition-all overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10">Join the Waitlist</span>
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-secondary to-lemon opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side - Image Grid */}
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
                backgroundImage: `linear-linear(rgba(233, 236, 107, 0.1) 1px, transparent 1px),
                              linear-linear(90deg, rgba(233, 236, 107, 0.1) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Main image grid container */}
          <div className="relative w-full h-full grid grid-cols-2 grid-rows-2 gap-3">
            {/* Music Image - Top Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative rounded-2xl overflow-hidden border-2 border-lemon/50 shadow-lg shadow-lemon/20 group"
            >
              <Image
                src="/music.png"
                alt="Music"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 text-lemon font-bold text-sm">
                  Music
                </div>
              </div>
            </motion.div>

            {/* Blockchain Image - Top Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative rounded-2xl overflow-hidden border-2 border-secondary/50 shadow-lg shadow-secondary/20 group"
            >
              <Image
                src="/chain.png"
                alt="Blockchain"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 text-secondary font-bold text-sm">
                  Blockchain
                </div>
              </div>
            </motion.div>

            {/* Tech/Arts Image - Bottom Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative rounded-2xl overflow-hidden border-2 border-lovelypink/50 shadow-lg shadow-lovelypink/20 group"
            >
              <Image
                src="/tech.png"
                alt="Tech & Arts"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 text-lovelypink font-bold text-sm">
                  Arts
                </div>
              </div>
            </motion.div>

            {/* Fashion Image - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative rounded-2xl overflow-hidden border-2 border-myWhite/50 shadow-lg shadow-myWhite/20 group"
            >
              <Image
                src="/fashion.png"
                alt="Fashion"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 text-myWhite font-bold text-sm">
                  Fashion
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </section>
  );
}
