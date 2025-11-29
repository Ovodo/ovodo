"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const TIERS = [
  {
    name: "Gold",
    startPercent: 0,
    endPercent: 26.32,
    color: "#e9ec6b",
    glowColor: "rgba(233, 236, 107, 0.6)",
    totalTokens: 25000,
    royaltyPercent: 25,
    leverageMultiplier: 5,
  },
  {
    name: "Silver",
    startPercent: 26.32,
    endPercent: 57.9,
    color: "#c0c0c0",
    glowColor: "rgba(192, 192, 192, 0.6)",
    totalTokens: 30000,
    royaltyPercent: 15,
    leverageMultiplier: 3,
  },
  {
    name: "Bronze",
    startPercent: 57.9,
    endPercent: 100,
    color: "#cd7f32",
    glowColor: "rgba(205, 127, 50, 0.6)",
    totalTokens: 40000,
    royaltyPercent: 10,
    leverageMultiplier: 2,
  },
];

interface PresaleMeterProps {
  soldTokens: number;
  totalTokens: number;
  currentPrice: number;
  daysRemaining: number;
}

export default function PresaleMeter({
  soldTokens,
  totalTokens,
  currentPrice,
  daysRemaining,
}: PresaleMeterProps) {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  const percentageSold = (soldTokens / totalTokens) * 100;

  // Determine current tier
  const currentTierIndex = TIERS.findIndex(
    (tier) =>
      percentageSold >= tier.startPercent && percentageSold < tier.endPercent
  );
  const currentTier = TIERS[currentTierIndex] || TIERS[TIERS.length - 1];

  // Calculate tokens remaining in current tier
  const currentTierTokens = currentTier.totalTokens;
  const tierStartTokens = (currentTier.startPercent / 100) * totalTokens;
  const tierSoldTokens = soldTokens - tierStartTokens;
  const tierRemainingTokens = currentTierTokens - tierSoldTokens;

  return (
    <div className="w-full space-y-4">
      {/* Three Tier Cards Inspired by the Image */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TIERS.map((tier, index) => {
          const isActive = index === currentTierIndex;
          const isPassed = percentageSold >= tier.endPercent;
          const tierPercentage = tier.endPercent - tier.startPercent;

          // Calculate how much of this tier is filled
          let tierFillPercent = 0;
          if (isPassed) {
            tierFillPercent = 100;
          } else if (isActive) {
            tierFillPercent =
              ((percentageSold - tier.startPercent) / tierPercentage) * 100;
          }

          return (
            <motion.div
              key={tier.name}
              className={`relative rounded-3xl p-6 overflow-hidden cursor-pointer transition-all duration-300 ${
                isActive ? "shadow-2xl" : "shadow-lg"
              }`}
              style={{
                background: `linear-gradient(135deg, ${tier.color}30, ${tier.color}10)`,
              }}
              whileHover={{ scale: 1.02, y: -4 }}
              onMouseEnter={() => setHoveredTier(index)}
              onMouseLeave={() => setHoveredTier(null)}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute top-4 right-4 w-3 h-3 rounded-full"
                  style={{ backgroundColor: tier.color }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Completed checkmark */}
              {isPassed && (
                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: tier.color }}
                >
                  ✓
                </div>
              )}

              <div className="relative z-10 space-y-4">
                {/* Header */}
                <div>
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-1"
                    style={{ color: tier.color }}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-myWhite/60 text-sm">
                    {tier.royaltyPercent}% Royalties • {tier.leverageMultiplier}
                    x Leverage
                  </p>
                </div>

                {/* Mini progress indicator */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-myWhite/70">
                    <span>Progress</span>
                    <span className="font-bold" style={{ color: tier.color }}>
                      {tierFillPercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: tier.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${tierFillPercent}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs text-myWhite/60 mb-1">
                      Total Tokens
                    </div>
                    <div className="text-lg font-bold text-white">
                      {tier.totalTokens.toLocaleString()}
                    </div>
                  </div>
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: `${tier.color}40` }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-xl">→</span>
                  </motion.div>
                </div>

                {/* Status badge */}
                <div className="pt-4 border-t border-white/10">
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${tier.color}20`,
                      color: tier.color,
                      border: `1px solid ${tier.color}40`,
                    }}
                  >
                    {isPassed
                      ? "Completed"
                      : isActive
                      ? "Active Now"
                      : "Upcoming"}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Overall Progress Bar */}
      <motion.div
        className="relative rounded-3xl p-8 overflow-hidden shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${currentTier.color}25, ${currentTier.color}10)`,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                Overall Presale Progress
              </h3>
              <p className="text-myWhite/70 text-sm">
                Current:{" "}
                <span
                  className="font-bold"
                  style={{ color: currentTier.color }}
                >
                  {currentTier.name} Tier
                </span>
              </p>
            </div>
            <div className="text-right">
              <div
                className="text-4xl md:text-5xl font-bold"
                style={{ color: currentTier.color }}
              >
                {percentageSold.toFixed(1)}%
              </div>
              <div className="text-xs text-myWhite/60 mt-1">
                {soldTokens.toLocaleString()} / {totalTokens.toLocaleString()}{" "}
                tokens
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-20 bg-black/30 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10">
            {/* Tier segment backgrounds */}
            <div className="absolute inset-0 flex">
              {TIERS.map((tier, index) => (
                <div
                  key={tier.name}
                  className="relative h-full flex items-center justify-center"
                  style={{
                    width: `${tier.endPercent - tier.startPercent}%`,
                    backgroundColor: `${tier.color}08`,
                    borderRight:
                      index < TIERS.length - 1
                        ? `1px solid ${tier.color}20`
                        : "none",
                  }}
                >
                  <span
                    className="text-sm font-bold opacity-30"
                    style={{ color: tier.color }}
                  >
                    {tier.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Filled progress */}
            <motion.div
              className="absolute inset-y-0 left-0 overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${percentageSold}%` }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <div className="h-full flex">
                {TIERS.map((tier) => {
                  const tierWidth = tier.endPercent - tier.startPercent;
                  const isFilled = percentageSold >= tier.endPercent;
                  const isPartial =
                    percentageSold > tier.startPercent &&
                    percentageSold < tier.endPercent;

                  if (!isFilled && !isPartial) return null;

                  const fillPercent = isPartial
                    ? ((percentageSold - tier.startPercent) / tierWidth) * 100
                    : 100;

                  return (
                    <div
                      key={tier.name}
                      className="h-full relative"
                      style={{ width: `${tierWidth}%` }}
                    >
                      <motion.div
                        className="h-full"
                        style={{
                          width: `${fillPercent}%`,
                          background: `linear-gradient(90deg, ${tier.color}CC, ${tier.color})`,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${fillPercent}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Progress indicator */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-white shadow-2xl flex items-center justify-center"
              style={{
                left: `calc(${percentageSold}% - 16px)`,
                backgroundColor: currentTier.color,
              }}
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-white"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-xs text-myWhite/60 mb-1">Current Price</div>
              <div className="text-xl font-bold text-lemon">
                ${currentPrice.toFixed(4)}
              </div>
            </div>
            <div className="bg-black/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-xs text-myWhite/60 mb-1">Tier Remaining</div>
              <div className="text-xl font-bold text-secondary">
                {tierRemainingTokens.toLocaleString()}
              </div>
            </div>
            <div className="bg-black/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-xs text-myWhite/60 mb-1">Days Left</div>
              <div className="text-xl font-bold text-white">
                {daysRemaining}d
              </div>
            </div>
            <div className="bg-black/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-xs text-myWhite/60 mb-1">Your Benefits</div>
              <div
                className="text-xl font-bold"
                style={{ color: currentTier.color }}
              >
                {currentTier.royaltyPercent}% + {currentTier.leverageMultiplier}
                x
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hover Tooltip */}
      {hoveredTier !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary/98 backdrop-blur-xl border-2 rounded-2xl p-5 min-w-[280px] z-50 shadow-2xl"
          style={{ borderColor: TIERS[hoveredTier].color }}
        >
          <div>
            <p
              className="font-bold text-2xl mb-4 text-center"
              style={{ color: TIERS[hoveredTier].color }}
            >
              {TIERS[hoveredTier].name} Tier Benefits
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-myWhite/70">Royalty Share:</span>
                <span className="font-bold text-lemon text-lg">
                  {TIERS[hoveredTier].royaltyPercent}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-myWhite/70">Trading Leverage:</span>
                <span className="font-bold text-secondary text-lg">
                  {TIERS[hoveredTier].leverageMultiplier}x
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-myWhite/70">Total Tokens:</span>
                <span className="font-bold text-white text-lg">
                  {TIERS[hoveredTier].totalTokens.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
