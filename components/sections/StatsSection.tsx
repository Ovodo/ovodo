"use client";

import { motion } from "framer-motion";

export default function StatsSection() {
  return (
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
  );
}
