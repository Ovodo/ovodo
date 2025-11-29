"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
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
  );
}
