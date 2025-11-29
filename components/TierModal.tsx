"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaGift,
  FaRobot,
  FaMusic,
  FaCrown,
  FaPalette,
  FaUsers,
} from "react-icons/fa";

interface TierBenefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TierDetails {
  name: string;
  color: string;
  price: string;
  raise: string;
  royalty: string;
  leverage: string;
  benefits: TierBenefit[];
}

interface TierModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: "gold" | "silver" | "bronze" | null;
  showAll?: boolean;
}

const TIER_DATA: Record<"gold" | "silver" | "bronze", TierDetails> = {
  gold: {
    name: "Gold Tier",
    color: "#e9ec6b",
    price: "0.5 DIZZLE = 1 USDT",
    raise: "$50,000",
    royalty: "25% of pool",
    leverage: "3x Leverage",
    benefits: [
      {
        icon: <FaGift className="text-xl" />,
        title: "Quarterly Airdrops",
        description: "Exclusive token airdrops and NFT rewards to your wallet",
      },
      {
        icon: <FaRobot className="text-xl" />,
        title: "Premium Trading Bot",
        description: "Advanced algo bot with 3x leverage and custom strategies",
      },
      {
        icon: <FaMusic className="text-xl" />,
        title: "Multi-Artist Royalties",
        description: "Earn from multiple artists, not just Ovdizzle releases",
      },
      {
        icon: <FaCrown className="text-xl" />,
        title: "VIP Governance",
        description: "Vote on platform decisions and artist selections",
      },
      {
        icon: <FaPalette className="text-xl" />,
        title: "Early Art Access",
        description: "First access to art & fashion drops before public",
      },
      {
        icon: <FaUsers className="text-xl" />,
        title: "Gold Discord & Events",
        description: "Private channel, alpha calls, and VIP concert access",
      },
    ],
  },
  silver: {
    name: "Silver Tier",
    color: "#c0c0c0",
    price: "1 DIZZLE = 1 USDT",
    raise: "$30,000",
    royalty: "15% of pool",
    leverage: "2x Leverage",
    benefits: [
      {
        icon: <FaGift className="text-xl" />,
        title: "Monthly Airdrops",
        description: "Regular rewards and promotional tokens monthly",
      },
      {
        icon: <FaRobot className="text-xl" />,
        title: "Standard Trading Bot",
        description: "Algo trading with 2x leverage and preset strategies",
      },
      {
        icon: <FaMusic className="text-xl" />,
        title: "Ovdizzle Royalties",
        description: "15% share of royalties plus select collaborations",
      },
      {
        icon: <FaCrown className="text-xl" />,
        title: "Priority Features",
        description: "Early access to new features and reduced fees",
      },
      {
        icon: <FaPalette className="text-xl" />,
        title: "24h Preview Access",
        description: "Early access to art & fashion before Bronze tier",
      },
      {
        icon: <FaUsers className="text-xl" />,
        title: "Silver Community",
        description: "Discord access with weekly AMAs and 20% merch discounts",
      },
    ],
  },
  bronze: {
    name: "Bronze Tier",
    color: "#cd7f32",
    price: "2 DIZZLE = 1 USDT",
    raise: "$20,000",
    royalty: "10% of pool",
    leverage: "1.5x Leverage",
    benefits: [
      {
        icon: <FaGift className="text-xl" />,
        title: "Seasonal Rewards",
        description: "Quarterly airdrops and bonus rewards for holders",
      },
      {
        icon: <FaRobot className="text-xl" />,
        title: "Basic Trading Bot",
        description: "Core trading features with 1.5x leverage access",
      },
      {
        icon: <FaMusic className="text-xl" />,
        title: "Royalty Share",
        description: "10% of Ovdizzle streaming and licensing royalties",
      },
      {
        icon: <FaCrown className="text-xl" />,
        title: "Holder Exclusives",
        description: "Behind-the-scenes content and music previews",
      },
      {
        icon: <FaPalette className="text-xl" />,
        title: "12h Early Entry",
        description: "Early access window before general public sales",
      },
      {
        icon: <FaUsers className="text-xl" />,
        title: "Bronze Community",
        description: "Discord channel, monthly raffles, and 10% discounts",
      },
    ],
  },
};

export default function TierModal({
  isOpen,
  onClose,
  tier,
  showAll = false,
}: TierModalProps) {
  const displayTiers = showAll
    ? (["gold", "silver", "bronze"] as const)
    : tier
    ? [tier]
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="pointer-events-auto w-full max-w-7xl max-h-[90vh] overflow-y-auto bg-primary/95 backdrop-blur-xl border-2 border-lemon/30 rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 p-6 border-b border-lemon/20 backdrop-blur-xl bg-primary/90">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-lemon mb-2">
                      Presale Tiers Overview
                    </h2>
                    <p className="text-myWhite/70 text-sm">
                      Choose your tier and unlock exclusive benefits • Total
                      Royalty Pool: 50%
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-myWhite/10 rounded-full transition-colors"
                  >
                    <FaTimes className="text-myWhite/70 text-xl" />
                  </button>
                </div>
              </div>

              {/* Tiers Grid */}
              <div className="p-6">
                <div
                  className={`grid ${
                    showAll ? "md:grid-cols-3" : "md:grid-cols-1"
                  } gap-6`}
                >
                  {displayTiers.map((tierKey, index) => {
                    const tierData = TIER_DATA[tierKey];
                    return (
                      <motion.div
                        key={tierKey}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-myWhite/5 backdrop-blur-sm rounded-2xl border-2 overflow-hidden"
                        style={{ borderColor: `${tierData.color}40` }}
                      >
                        {/* Tier Header */}
                        <div
                          className="p-5 border-b"
                          style={{
                            borderColor: `${tierData.color}20`,
                            background: `linear-gradient(to bottom, ${tierData.color}15, transparent)`,
                          }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: tierData.color }}
                            />
                            <h3
                              className="text-2xl font-bold"
                              style={{ color: tierData.color }}
                            >
                              {tierData.name}
                            </h3>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-myWhite/60">Price:</span>
                              <span
                                className="font-bold"
                                style={{ color: tierData.color }}
                              >
                                {tierData.price}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-myWhite/60">Target:</span>
                              <span className="font-bold text-myWhite">
                                {tierData.raise}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-myWhite/60">Royalty:</span>
                              <span
                                className="font-bold"
                                style={{ color: tierData.color }}
                              >
                                {tierData.royalty}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-myWhite/60">Trading:</span>
                              <span className="font-bold text-secondary">
                                {tierData.leverage}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Benefits List */}
                        <div className="p-5 space-y-3">
                          {tierData.benefits.map((benefit, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 p-3 bg-myWhite/5 rounded-lg hover:bg-myWhite/10 transition-all"
                            >
                              <div
                                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{
                                  backgroundColor: `${tierData.color}20`,
                                }}
                              >
                                <div style={{ color: tierData.color }}>
                                  {benefit.icon}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-myWhite text-sm mb-1">
                                  {benefit.title}
                                </h4>
                                <p className="text-xs text-myWhite/60 leading-relaxed">
                                  {benefit.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <div className="p-5 pt-0">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 rounded-xl font-bold text-primary shadow-lg transition-all"
                            style={{
                              backgroundColor: tierData.color,
                              boxShadow: `0 10px 30px ${tierData.color}40`,
                            }}
                          >
                            Join {tierData.name.split(" ")[0]}
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <p className="text-center text-myWhite/50 text-sm mt-6">
                  Limited slots available • First come, first served • 30 days
                  per tier
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
