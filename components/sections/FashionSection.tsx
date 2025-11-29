"use client";

import { motion } from "framer-motion";
import { IoShirt } from "react-icons/io5";

export default function FashionSection() {
  return (
    <section className="relative z-10 container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="backdrop-blur-md bg-gradient-to-br from-myWhite/5 via-primary/60 to-primary/80 border-2 border-myWhite/30 rounded-3xl overflow-hidden"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left - Info */}
          <div className="p-8 lg:p-12 order-2 lg:order-1">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-myWhite/20 border border-myWhite/40 rounded-full px-4 py-2 mb-4">
                <IoShirt className="text-myWhite" />
                <span className="text-myWhite font-semibold text-sm">
                  Upcoming Release
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-myWhite mb-4">
                Fashion & Merch
              </h2>
              <p className="text-xl text-myWhite/80 mb-6">
                Exclusive Streetwear Collection
              </p>

              <p className="text-myWhite/70 mb-8 leading-relaxed">
                Premium streetwear and exclusive merchandise for the OVD
                community. Token holders will get early access to limited drops,
                special discounts, and unique designs you won't find anywhere
                else.
              </p>

              {/* Teaser Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-myWhite/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-myWhite text-xs">✓</span>
                  </div>
                  <p className="text-myWhite/80 text-sm">
                    Limited edition streetwear drops
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-myWhite/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-myWhite text-xs">✓</span>
                  </div>
                  <p className="text-myWhite/80 text-sm">
                    Exclusive merch for token holders
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-myWhite/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-myWhite text-xs">✓</span>
                  </div>
                  <p className="text-myWhite/80 text-sm">
                    Early access and special pricing
                  </p>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-myWhite text-myWhite px-8 py-4 rounded-full font-bold text-lg hover:bg-myWhite/10 transition-all"
              >
                Join Waitlist
              </motion.button>
            </motion.div>
          </div>

          {/* Right - Visual Placeholder */}
          <div className="p-8 lg:p-12 order-1 lg:order-2">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative w-full max-w-md mx-auto"
            >
              {/* Question Mark Placeholder */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-myWhite/50 shadow-2xl shadow-myWhite/40 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="text-myWhite text-9xl font-bold opacity-60">
                    ?
                  </span>
                </motion.div>

                {/* Pulsing glow */}
                <motion.div
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-t from-myWhite/20 to-transparent"
                />
              </div>

              {/* Coming Soon badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-myWhite to-secondary px-4 py-2 rounded-full border-2 border-primary shadow-lg"
              >
                <span className="text-primary font-bold text-sm">
                  COMING SOON
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
