"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MusicSubdomain() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-lemon/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-40 left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-block px-6 py-2 bg-lemon/20 rounded-full border border-lemon/50 mb-6">
            <p className="text-lemon font-semibold">music.ovd.dev</p>
          </div>

          <h1 className="text-6xl lg:text-8xl font-bold text-lemon mb-6">
            Music Subdomain
          </h1>

          <p className="text-xl lg:text-2xl text-myWhite/80 mb-8 max-w-3xl mx-auto">
            Welcome to the music subdomain! This is a test page demonstrating
            subdomain routing.
          </p>

          <div className="backdrop-blur-md bg-gradient-to-br from-primary/40 via-purple-900/20 to-indigo-900/30 border border-lemon/20 rounded-3xl p-12 max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-6">
              Subdomain Routing Active
            </h2>
            <div className="space-y-4 text-left text-myWhite/70">
              <p>
                ✅ Middleware is successfully routing music.ovd.dev to this page
              </p>
              <p>✅ URL stays as music.ovd.dev (no visible rewrites)</p>
              <p>✅ All your main app routes are still accessible</p>
              <p>✅ This subdomain can have its own pages and functionality</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-md bg-primary/60 border border-lemon/20 rounded-2xl p-6 hover:border-lemon/50 transition-all"
            >
              <h3 className="text-xl font-bold text-lemon mb-3">
                Current Domain
              </h3>
              <p className="text-myWhite/70 font-mono text-sm break-all">
                {typeof window !== "undefined"
                  ? window.location.hostname
                  : "music.ovd.dev"}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-md bg-primary/60 border border-secondary/20 rounded-2xl p-6 hover:border-secondary/50 transition-all"
            >
              <h3 className="text-xl font-bold text-secondary mb-3">
                Route Path
              </h3>
              <p className="text-myWhite/70 font-mono text-sm">/music</p>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-lemon text-primary px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Go to Homepage
              </motion.button>
            </Link>
            <a
              href="https://www.ovd.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-lemon text-lemon px-8 py-3 rounded-full font-bold hover:bg-lemon/10 transition-all"
              >
                Visit Main Site
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Next Steps Section */}
      <div className="relative z-10 container mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-gradient-to-br from-primary/40 via-purple-900/20 to-indigo-900/30 border border-lovelypink/20 rounded-3xl p-12 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-lovelypink mb-6 text-center">
            Next Steps
          </h2>
          <div className="space-y-4 text-myWhite/70">
            <div className="flex items-start gap-4">
              <span className="text-2xl">🎵</span>
              <div>
                <h4 className="font-bold text-lemon mb-2">
                  Build Your Music Platform
                </h4>
                <p>
                  Add more pages under /music directory for your music-specific
                  features
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">🌐</span>
              <div>
                <h4 className="font-bold text-secondary mb-2">
                  DNS Configuration
                </h4>
                <p>
                  Add A or CNAME record for music.ovd.dev pointing to your
                  server IP or domain
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">🚀</span>
              <div>
                <h4 className="font-bold text-lovelypink mb-2">Deploy</h4>
                <p>
                  Deploy this updated code to production and test music.ovd.dev
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
