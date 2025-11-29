"use client";

import { motion } from "framer-motion";
import { FaPalette } from "react-icons/fa";

export default function ArtsSection() {
  return (
    <section className="relative z-10 container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="backdrop-blur-md bg-gradient-to-br from-lovelypink/5 via-primary/60 to-primary/80 border-2 border-lovelypink/30 rounded-3xl overflow-hidden"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left - Visual Placeholder */}
          <div className="p-8 lg:p-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative w-full max-w-md mx-auto"
            >
              {/* Question Mark Placeholder */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-lovelypink/50 shadow-2xl shadow-lovelypink/40 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="text-lovelypink text-9xl font-bold opacity-60">
                    ?
                  </span>
                </motion.div>

                {/* Pulsing glow */}
                <motion.div
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-t from-lovelypink/20 to-transparent"
                />
              </div>

              {/* Coming Soon badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-lovelypink to-lemon px-4 py-2 rounded-full border-2 border-primary shadow-lg"
              >
                <span className="text-primary font-bold text-sm">
                  COMING SOON
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right - Info */}
          <div className="p-8 lg:p-12 lg:border-l-2 lg:border-lovelypink/20">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-lovelypink/20 border border-lovelypink/40 rounded-full px-4 py-2 mb-4">
                <FaPalette className="text-lovelypink" />
                <span className="text-lovelypink font-semibold text-sm">
                  Upcoming Release
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-lovelypink mb-4">
                Digital Arts NFTs
              </h2>
              <p className="text-xl text-myWhite/80 mb-6">
                Exclusive Digital Collectibles
              </p>

              <p className="text-myWhite/70 mb-8 leading-relaxed">
                We're curating an exclusive collection of digital art pieces.
                Stay tuned for unique NFT drops, artist collaborations, and
                limited edition collectibles that blend creativity with
                blockchain technology.
              </p>

              {/* Teaser Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-lovelypink/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-lovelypink text-xs">✓</span>
                  </div>
                  <p className="text-myWhite/80 text-sm">
                    Limited edition digital artworks
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-lovelypink/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-lovelypink text-xs">✓</span>
                  </div>
                  <p className="text-myWhite/80 text-sm">
                    Artist collaborations and exclusive drops
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-lovelypink/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-lovelypink text-xs">✓</span>
                  </div>
                  <p className="text-myWhite/80 text-sm">
                    Token holder benefits and early access
                  </p>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-lovelypink text-lovelypink px-8 py-4 rounded-full font-bold text-lg hover:bg-lovelypink/10 transition-all"
              >
                Notify Me
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
