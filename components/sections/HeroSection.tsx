"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { IoMusicalNotes, IoShirt } from "react-icons/io5";
import { BiNetworkChart } from "react-icons/bi";
import { FaPalette } from "react-icons/fa";

export default function HeroSection() {
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
          <h1 className="text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-lemon via-secondary to-lemon bg-clip-text text-transparent animate-pulse font-[Patrick_Hand]">
            Vibe with Dizzle
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
              className="relative bg-gradient-to-r from-primary/50 to-primary/30 backdrop-blur-sm border-2 border-lemon/40 rounded-full px-3 py-1.5 flex items-center gap-1.5 cursor-pointer overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-lemon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
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
              className="relative bg-gradient-to-r from-primary/50 to-primary/30 backdrop-blur-sm border-2 border-secondary/40 rounded-full px-3 py-1.5 flex items-center gap-1.5 cursor-pointer overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
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
              className="relative bg-gradient-to-r from-primary/50 to-primary/30 backdrop-blur-sm border-2 border-lovelypink/40 rounded-full px-3 py-1.5 flex items-center gap-1.5 cursor-pointer overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-lovelypink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
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
              className="relative bg-gradient-to-r from-primary/50 to-primary/30 backdrop-blur-sm border-2 border-myWhite/40 rounded-full px-3 py-1.5 flex items-center gap-1.5 cursor-pointer overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-myWhite/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
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
                backgroundImage: `linear-gradient(rgba(233, 236, 107, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(233, 236, 107, 0.1) 1px, transparent 1px)`,
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
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
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
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
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
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
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
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 text-myWhite font-bold text-sm">
                  Fashion
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
