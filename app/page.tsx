"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
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

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl lg:text-8xl font-bold text-lemon mb-6">
            Welcome to the <span className="inline-block scale-x-[-1]">𝄢</span>{" "}
            rew
          </h1>
          <p className="text-xl lg:text-2xl text-myWhite/80 mb-4 max-w-3xl mx-auto">
            Discover, collect, and trade unique sound NFTs on the blockchain
          </p>
          <p className="text-lg text-secondary/70 mb-12 max-w-2xl mx-auto">
            Join the future of music ownership where creators meet collectors in
            a decentralized ecosystem
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/sounds">
              <button className="bg-lemon hover:scale-105 cursor-pointer duration-300 active:scale-95 text-primary px-10 py-4 rounded-full text-lg font-bold shadow-lg shadow-lemon/30  hover:shadow-lemon/50 transition-all">
                Explore Sounds
              </button>
            </Link>
            <Link href="/signup">
              <button className="hover:scale-105 cursor-pointer duration-300 active:scale-95 border-2 border-lemon text-lemon px-10 py-4 rounded-full text-lg font-bold hover:bg-lemon/10 transition-all">
                Join Now
              </button>
            </Link>
          </div>
        </motion.div>
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
    </div>
  );
}
