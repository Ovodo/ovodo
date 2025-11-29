"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BiNetworkChart } from "react-icons/bi";

export default function TradingBotSection() {
  return (
    <section className="relative z-10 container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="backdrop-blur-md bg-gradient-to-br from-secondary/5 via-primary/60 to-primary/80 border-2 border-secondary/30 rounded-3xl overflow-hidden"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left - Bot Details */}
          <div className="p-8 lg:p-12 order-2 lg:order-1">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/40 rounded-full px-4 py-2 mb-4">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-secondary font-semibold text-sm">
                  In Development
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
                Daily 2k
              </h2>
              <p className="text-xl text-myWhite/80 mb-6">
                Automated Trading Intelligence
              </p>

              <p className="text-myWhite/70 mb-8 leading-relaxed">
                Get early access to our advanced trading bot with exclusive
                benefits for token holders. No subscription fees, enhanced
                leverage, and priority features.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <h3 className="text-myWhite font-bold text-lg mb-4">
                  Token Holder Benefits:
                </h3>

                <div className="bg-primary/50 backdrop-blur-sm rounded-xl p-4 border border-secondary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <BiNetworkChart className="text-secondary text-2xl" />
                    <h4 className="text-secondary font-bold">
                      Free Access for Life
                    </h4>
                  </div>
                  <p className="text-myWhite/70 text-sm">
                    Token holders never pay subscription fees - lifetime access
                    to all bot features
                  </p>
                </div>

                <div className="bg-primary/50 backdrop-blur-sm rounded-xl p-4 border border-secondary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <BiNetworkChart className="text-secondary text-2xl" />
                    <h4 className="text-secondary font-bold">
                      Enhanced Leverage
                    </h4>
                  </div>
                  <p className="text-myWhite/70 text-sm">
                    Early buyers unlock higher leverage multipliers based on
                    purchase timing and volume
                  </p>
                </div>

                <div className="bg-primary/50 backdrop-blur-sm rounded-xl p-4 border border-secondary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <BiNetworkChart className="text-secondary text-2xl" />
                    <h4 className="text-secondary font-bold">
                      Staking Privileges
                    </h4>
                  </div>
                  <p className="text-myWhite/70 text-sm">
                    Stake multiples of your initial purchase amount with boosted
                    returns for early adopters
                  </p>
                </div>
              </div>

              {/* Tier Indicator */}
              <div className="bg-gradient-to-r from-secondary/10 to-transparent border-l-4 border-secondary rounded-lg p-4 mb-6">
                <p className="text-secondary font-bold mb-2">Tier System</p>
                <p className="text-myWhite/70 text-sm">
                  Earlier buyers = Higher tier = Greater leverage & staking
                  multiples
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(155, 232, 161, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-secondary to-lemon text-primary px-6 py-4 rounded-full font-bold text-lg shadow-lg shadow-secondary/40"
                >
                  Reserve Access
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 border-2 border-secondary text-secondary px-6 py-4 rounded-full font-bold hover:bg-secondary/10 transition-all"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right - Visual */}
          <div className="p-8 lg:p-12 order-1 lg:order-2">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative w-full max-w-md mx-auto"
            >
              {/* Bot Visual */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-secondary/50 shadow-2xl shadow-secondary/40 bg-gradient-to-br from-primary/80 to-secondary/20">
                <Image
                  src="/tech.png"
                  alt="Trading Bot"
                  fill
                  className="object-cover opacity-90"
                />
                {/* Animated overlay */}
                <motion.div
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent"
                />

                {/* Floating stats */}
                <div className="absolute bottom-4 left-4 right-4 bg-primary/90 backdrop-blur-md rounded-lg p-3 border border-secondary/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-myWhite/60 text-xs">Win Rate</p>
                      <p className="text-secondary font-bold text-lg">87.3%</p>
                    </div>
                    <div>
                      <p className="text-myWhite/60 text-xs">Avg Return</p>
                      <p className="text-lemon font-bold text-lg">+24.5%</p>
                    </div>
                    <div>
                      <p className="text-myWhite/60 text-xs">Active Trades</p>
                      <p className="text-lovelypink font-bold text-lg">142</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-secondary to-lemon px-4 py-2 rounded-full border-2 border-primary shadow-lg"
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
