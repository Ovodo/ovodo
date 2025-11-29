"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Footer from "@/components/Footer";
import {
  FaMusic,
  FaRobot,
  FaPalette,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaGift,
  FaLink,
  FaCoins,
  FaLock,
  FaBurn,
  FaHandHoldingUsd,
} from "react-icons/fa";

export default function Whitepaper() {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "vision", label: "Vision & Mission" },
    { id: "tokenomics", label: "Tokenomics" },
    { id: "distribution", label: "Token Distribution" },
    { id: "benefits", label: "Holder Benefits" },
    { id: "kol", label: "KOL Program" },
    { id: "trading", label: "Trading Bot" },
    { id: "royalties", label: "Royalty System" },
    { id: "roadmap", label: "Roadmap" },
  ];

  return (
    <div className="min-h-screen bg-primary relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-lemon/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-40 left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Header */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-lemon mb-4">
            Dizzle Token
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-2">
            Whitepaper v1.0
          </p>
          <p className="text-myWhite/70 max-w-2xl mx-auto">
            Revolutionizing Music Royalties Through Blockchain Technology
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeSection === section.id
                  ? "bg-lemon text-primary"
                  : "bg-myWhite/10 text-myWhite/70 hover:bg-myWhite/20"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-md bg-myWhite/5 border-2 border-lemon/30 rounded-3xl p-8 md:p-12 max-w-5xl mx-auto"
        >
          {activeSection === "introduction" && <Introduction />}
          {activeSection === "vision" && <Vision />}
          {activeSection === "tokenomics" && <Tokenomics />}
          {activeSection === "distribution" && <Distribution />}
          {activeSection === "benefits" && <Benefits />}
          {activeSection === "kol" && <KOLProgram />}
          {activeSection === "trading" && <TradingBot />}
          {activeSection === "royalties" && <RoyaltySystem />}
          {activeSection === "roadmap" && <Roadmap />}
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function Introduction() {
  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-lemon mb-6">Introduction</h2>

      <p className="text-myWhite/80 mb-4">
        Dizzle Token represents a paradigm shift in how music creators and fans
        interact in the digital age. By leveraging blockchain technology, we're
        creating a transparent, equitable ecosystem where supporters directly
        benefit from an artist's success.
      </p>

      <h3 className="text-2xl font-bold text-secondary mb-4">The Problem</h3>
      <ul className="text-myWhite/80 space-y-2 mb-6">
        <li>Artists receive only 10-15% of streaming revenue</li>
        <li>Fans have no ownership stake in the music they support</li>
        <li>Opaque royalty distribution systems</li>
        <li>Limited direct artist-fan engagement opportunities</li>
        <li>High barriers to entry for music investment</li>
      </ul>

      <h3 className="text-2xl font-bold text-secondary mb-4">The Solution</h3>
      <p className="text-myWhite/80 mb-4">
        Dizzle Token creates a decentralized music economy where:
      </p>
      <ul className="text-myWhite/80 space-y-2">
        <li>50% of all music royalties are distributed to token holders</li>
        <li>Transparent blockchain-based royalty tracking</li>
        <li>Tiered benefits system rewarding early supporters</li>
        <li>Integrated trading tools for additional passive income</li>
        <li>Cross-platform utility including music, art, and fashion</li>
      </ul>
    </div>
  );
}

function Vision() {
  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-lemon mb-6">Vision & Mission</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-lemon/10 border-l-4 border-lemon rounded-lg p-6">
          <h3 className="text-xl font-bold text-lemon mb-3">Our Vision</h3>
          <p className="text-myWhite/80">
            To become the leading decentralized music royalty platform,
            empowering artists to maintain creative control while providing fans
            with tangible ownership and rewards from their favorite music.
          </p>
        </div>

        <div className="bg-secondary/10 border-l-4 border-secondary rounded-lg p-6">
          <h3 className="text-xl font-bold text-secondary mb-3">Our Mission</h3>
          <p className="text-myWhite/80">
            To democratize music revenue, creating a sustainable ecosystem where
            artists thrive, supporters profit, and the music industry operates
            with unprecedented transparency.
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-lemon mb-4">Core Values</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            icon: <FaShieldAlt />,
            title: "Transparency",
            desc: "On-chain royalty tracking",
          },
          {
            icon: <FaUsers />,
            title: "Community",
            desc: "Shared success model",
          },
          {
            icon: <FaChartLine />,
            title: "Innovation",
            desc: "Cutting-edge DeFi integration",
          },
        ].map((value, idx) => (
          <div
            key={idx}
            className="bg-myWhite/5 rounded-lg p-4 text-center hover:bg-myWhite/10 transition-all"
          >
            <div className="text-3xl text-lemon mb-2 flex justify-center">
              {value.icon}
            </div>
            <h4 className="font-bold text-myWhite mb-1">{value.title}</h4>
            <p className="text-sm text-myWhite/60">{value.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tokenomics() {
  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-lemon mb-6">Tokenomics</h2>

      <div className="bg-lemon/5 border border-lemon/30 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-lemon mb-4">Token Details</h3>
        <div className="grid md:grid-cols-2 gap-4 text-myWhite/80">
          <div>
            <p className="font-semibold text-secondary">Token Name:</p>
            <p>Dizzle Token</p>
          </div>
          <div>
            <p className="font-semibold text-secondary">Symbol:</p>
            <p>Dizzle</p>
          </div>
          <div>
            <p className="font-semibold text-secondary">Total Supply:</p>
            <p>100,000,000 Dizzle</p>
          </div>
          <div>
            <p className="font-semibold text-secondary">Blockchain:</p>
            <p>Ethereum / Polygon (Multichain)</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-secondary mb-4">Token Utility</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[
          {
            icon: <FaMusic />,
            title: "Royalty Distribution",
            desc: "Receive 50% of all music streaming and licensing royalties",
          },
          {
            icon: <FaRobot />,
            title: "Trading Bot Access",
            desc: "Unlock leverage trading based on tier level",
          },
          {
            icon: <FaPalette />,
            title: "Exclusive Drops",
            desc: "Early access to art, fashion, and NFT collections",
          },
          {
            icon: <FaUsers />,
            title: "Governance Rights",
            desc: "Vote on platform decisions and artist collaborations",
          },
          {
            icon: <FaGift />,
            title: "Staking Rewards",
            desc: "Earn additional tokens through staking mechanisms",
          },
          {
            icon: <FaShieldAlt />,
            title: "Fee Discounts",
            desc: "Reduced platform fees and priority services",
          },
        ].map((utility, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 bg-myWhite/5 rounded-lg p-4 hover:bg-myWhite/10 transition-all"
          >
            <div className="text-2xl text-lemon mt-1">{utility.icon}</div>
            <div>
              <h4 className="font-bold text-myWhite mb-1">{utility.title}</h4>
              <p className="text-sm text-myWhite/70">{utility.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-secondary mb-4">
        Deflationary Mechanism
      </h3>
      <div className="bg-secondary/10 border-l-4 border-secondary rounded-lg p-6">
        <ul className="text-myWhite/80 space-y-2">
          <li>
            <strong className="text-secondary">2% Burn on Transactions:</strong>{" "}
            Reduces supply over time, increasing scarcity
          </li>
          <li>
            <strong className="text-secondary">Quarterly Buyback:</strong> 10%
            of platform profits used to buy and burn tokens
          </li>
          <li>
            <strong className="text-secondary">NFT Burn Mechanic:</strong>{" "}
            Special NFTs can be burned for bonus Dizzle rewards
          </li>
        </ul>
      </div>
    </div>
  );
}

function Distribution() {
  const distribution = [
    {
      name: "Presale (3 Tiers)",
      percentage: 40,
      color: "#e9ec6b",
      amount: "40M Dizzle",
    },
    {
      name: "Liquidity Pool",
      percentage: 20,
      color: "#9be8a1",
      amount: "20M Dizzle",
    },
    {
      name: "Team & Advisors",
      percentage: 15,
      color: "#fe8daa",
      amount: "15M Dizzle (2yr vest)",
    },
    {
      name: "Marketing & Partnerships",
      percentage: 10,
      color: "#449bc0",
      amount: "10M Dizzle",
    },
    {
      name: "KOL Referral Pool",
      percentage: 8,
      color: "#f69d3c",
      amount: "8M Dizzle",
    },
    {
      name: "Staking Rewards",
      percentage: 5,
      color: "#cd7f32",
      amount: "5M Dizzle (5yr)",
    },
    {
      name: "Treasury/Reserve",
      percentage: 2,
      color: "#c0c0c0",
      amount: "2M Dizzle",
    },
  ];

  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-lemon mb-6">Token Distribution</h2>

      <div className="mb-8">
        {distribution.map((item, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-myWhite font-semibold">{item.name}</span>
              <span className="text-myWhite/70">{item.amount}</span>
            </div>
            <div className="w-full bg-myWhite/10 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 1, delay: idx * 0.1 }}
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
              />
            </div>
            <p className="text-sm text-myWhite/60 mt-1">
              {item.percentage}% of total supply
            </p>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-secondary mb-4">
        Presale Breakdown
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            tier: "Gold",
            price: "0.5 Dizzle = 1 USDT",
            allocation: "16M Dizzle",
            raise: "$50,000",
            color: "#e9ec6b",
          },
          {
            tier: "Silver",
            price: "1 Dizzle = 1 USDT",
            allocation: "14M Dizzle",
            raise: "$30,000",
            color: "#c0c0c0",
          },
          {
            tier: "Bronze",
            price: "2 Dizzle = 1 USDT",
            allocation: "10M Dizzle",
            raise: "$20,000",
            color: "#cd7f32",
          },
        ].map((tier, idx) => (
          <div
            key={idx}
            className="bg-myWhite/5 border-2 rounded-xl p-4"
            style={{ borderColor: `${tier.color}40` }}
          >
            <h4
              className="text-xl font-bold mb-3"
              style={{ color: tier.color }}
            >
              {tier.tier} Tier
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-myWhite/70">
                <strong className="text-myWhite">Price:</strong> {tier.price}
              </p>
              <p className="text-myWhite/70">
                <strong className="text-myWhite">Allocation:</strong>{" "}
                {tier.allocation}
              </p>
              <p className="text-myWhite/70">
                <strong className="text-myWhite">Target:</strong> {tier.raise}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-lemon/10 border-l-4 border-lemon rounded-lg p-6 mt-8">
        <p className="text-myWhite/80">
          <strong className="text-lemon">Vesting Schedule:</strong> Team tokens
          vest linearly over 24 months with 6-month cliff. Staking rewards
          distributed over 5 years. All presale tokens fully unlocked at TGE.
        </p>
      </div>
    </div>
  );
}

function Benefits() {
  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-lemon mb-6">
        Token Holder Benefits
      </h2>

      <div className="space-y-6">
        <BenefitCard
          icon={<FaMusic />}
          title="Music Royalty Sharing"
          description="Token holders collectively receive 50% of all streaming, licensing, and performance royalties generated by OvDizzle's music catalog. Distributed quarterly based on holdings."
          color="#e9ec6b"
        />

        <BenefitCard
          icon={<FaRobot />}
          title="Algorithmic Trading Bot"
          description="Access to proprietary trading algorithms with leverage ranging from 1.5x to 3x based on tier. Automate your trading strategies and generate passive income."
          color="#9be8a1"
        />

        <BenefitCard
          icon={<FaPalette />}
          title="Exclusive Art & Fashion Access"
          description="Early access to limited edition art pieces and fashion collections. Gold tier gets first pick, followed by Silver and Bronze with staggered access windows."
          color="#fe8daa"
        />

        <BenefitCard
          icon={<FaGift />}
          title="Airdrops & Rewards"
          description="Regular token airdrops, NFT giveaways, and bonus rewards. Frequency ranges from seasonal (Bronze) to quarterly (Gold) with exclusive surprise drops for long-term holders."
          color="#f69d3c"
        />

        <BenefitCard
          icon={<FaUsers />}
          title="Governance & Voting"
          description="Participate in platform decisions including artist collaborations, feature development, and tokenomics adjustments. Voting power weighted by tier and holding duration."
          color="#449bc0"
        />

        <BenefitCard
          icon={<FaCoins />}
          title="Staking Opportunities"
          description="Stake Dizzle tokens to earn additional yield. APY varies from 8-15% based on lock-up period. Staked tokens also grant bonus multipliers on royalty distributions."
          color="#cd7f32"
        />

        <BenefitCard
          icon={<FaChartLine />}
          title="Platform Fee Discounts"
          description="Reduced trading fees, lower NFT marketplace commissions, and priority customer support. Discounts range from 10% (Bronze) to 40% (Gold)."
          color="#c0c0c0"
        />
      </div>
    </div>
  );
}

function BenefitCard({ icon, title, description, color }: any) {
  return (
    <div className="flex items-start gap-4 bg-myWhite/5 rounded-xl p-6 hover:bg-myWhite/10 transition-all">
      <div
        className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-myWhite mb-2">{title}</h3>
        <p className="text-myWhite/70 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function KOLProgram() {
  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-lemon mb-6">
        KOL Referral Program
      </h2>

      <div className="bg-gradient-to-r from-lemon/10 to-secondary/10 border-2 border-lemon/30 rounded-xl p-6 mb-8">
        <p className="text-lg text-myWhite/90 mb-0">
          Our Key Opinion Leader (KOL) program rewards influencers and community
          builders with generous token allocations. Total allocation:{" "}
          <strong className="text-lemon">8,000,000 Dizzle</strong>
        </p>
      </div>

      <h3 className="text-2xl font-bold text-secondary mb-4">How It Works</h3>
      <div className="space-y-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-lemon/20 text-lemon rounded-full flex items-center justify-center font-bold">
            1
          </div>
          <div>
            <h4 className="font-bold text-myWhite mb-1">
              Get Your Unique Referral Link
            </h4>
            <p className="text-myWhite/70">
              Apply as a KOL and receive a personalized referral code embedded
              in your link
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-lemon/20 text-lemon rounded-full flex items-center justify-center font-bold">
            2
          </div>
          <div>
            <h4 className="font-bold text-myWhite mb-1">Share & Promote</h4>
            <p className="text-myWhite/70">
              Share your link on social media, YouTube, Twitter, Discord, or any
              platform
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-lemon/20 text-lemon rounded-full flex items-center justify-center font-bold">
            3
          </div>
          <div>
            <h4 className="font-bold text-myWhite mb-1">Earn Commission</h4>
            <p className="text-myWhite/70">
              Receive instant token allocation for every purchase made through
              your link
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-secondary mb-4">
        Commission Structure
      </h3>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          {
            tier: "Gold Referral",
            commission: "15%",
            example: "User buys $1,000 → You get 150 Dizzle",
            color: "#e9ec6b",
          },
          {
            tier: "Silver Referral",
            commission: "12%",
            example: "User buys $1,000 → You get 120 Dizzle",
            color: "#c0c0c0",
          },
          {
            tier: "Bronze Referral",
            commission: "10%",
            example: "User buys $1,000 → You get 100 Dizzle",
            color: "#cd7f32",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-myWhite/5 border-2 rounded-xl p-5"
            style={{ borderColor: `${item.color}40` }}
          >
            <h4 className="font-bold mb-2" style={{ color: item.color }}>
              {item.tier}
            </h4>
            <p className="text-2xl font-bold text-myWhite mb-2">
              {item.commission}
            </p>
            <p className="text-sm text-myWhite/60">{item.example}</p>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-secondary mb-4">
        Bonus Incentives
      </h3>
      <div className="space-y-3">
        {[
          {
            icon: <FaChartLine />,
            title: "Volume Bonuses",
            desc: "$10K+ sales = 5% bonus | $50K+ = 10% bonus | $100K+ = 20% bonus",
          },
          {
            icon: <FaGift />,
            title: "Monthly Top Performers",
            desc: "Top 3 KOLs each month receive 5,000 bonus Dizzle + exclusive NFT",
          },
          {
            icon: <FaCrown className="inline" />,
            title: "Lifetime Ambassador Status",
            desc: "$250K+ in referrals unlocks lifetime 20% commission + special perks",
          },
        ].map((bonus, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 bg-myWhite/5 rounded-lg p-4"
          >
            <div className="text-2xl text-lemon mt-1">{bonus.icon}</div>
            <div>
              <h4 className="font-bold text-myWhite mb-1">{bonus.title}</h4>
              <p className="text-sm text-myWhite/70">{bonus.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-secondary/10 border-l-4 border-secondary rounded-lg p-6 mt-8">
        <h4 className="font-bold text-secondary mb-2">Real-Time Tracking</h4>
        <p className="text-myWhite/80">
          Access your personalized dashboard to track clicks, conversions,
          earnings, and claim rewards. All transactions recorded on-chain for
          complete transparency.
        </p>
      </div>
    </div>
  );
}

function TradingBot() {
  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-lemon mb-6">
        Algorithmic Trading Bot
      </h2>

      <p className="text-myWhite/80 mb-8">
        Dizzle token holders get exclusive access to a sophisticated trading bot
        designed to generate passive income through algorithmic strategies
        across major cryptocurrency exchanges.
      </p>

      <h3 className="text-2xl font-bold text-secondary mb-4">
        Leverage by Tier
      </h3>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          {
            tier: "Gold",
            leverage: "3x",
            features: [
              "Custom strategies",
              "Advanced analytics",
              "Priority execution",
            ],
            color: "#e9ec6b",
          },
          {
            tier: "Silver",
            leverage: "2x",
            features: [
              "Preset strategies",
              "Standard analytics",
              "Normal execution",
            ],
            color: "#c0c0c0",
          },
          {
            tier: "Bronze",
            leverage: "1.5x",
            features: [
              "Basic strategies",
              "Basic analytics",
              "Standard execution",
            ],
            color: "#cd7f32",
          },
        ].map((tier, idx) => (
          <div
            key={idx}
            className="bg-myWhite/5 border-2 rounded-xl p-5"
            style={{ borderColor: `${tier.color}40` }}
          >
            <h4
              className="text-xl font-bold mb-2"
              style={{ color: tier.color }}
            >
              {tier.tier} Tier
            </h4>
            <p className="text-3xl font-bold text-myWhite mb-4">
              {tier.leverage} Leverage
            </p>
            <ul className="space-y-2 text-sm text-myWhite/70">
              {tier.features.map((feature, i) => (
                <li key={i}>✓ {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-secondary mb-4">
        Trading Strategies
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            name: "Market Making",
            desc: "Provide liquidity and earn from spreads",
          },
          {
            name: "Arbitrage",
            desc: "Exploit price differences across exchanges",
          },
          {
            name: "Trend Following",
            desc: "Ride momentum in trending markets",
          },
          {
            name: "Mean Reversion",
            desc: "Profit from price corrections",
          },
        ].map((strategy, idx) => (
          <div
            key={idx}
            className="bg-myWhite/5 rounded-lg p-4 border-l-4 border-lemon/50"
          >
            <h4 className="font-bold text-myWhite mb-1">{strategy.name}</h4>
            <p className="text-sm text-myWhite/70">{strategy.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-lemon/10 border-l-4 border-lemon rounded-lg p-6 mt-8">
        <h4 className="font-bold text-lemon mb-2">Risk Management</h4>
        <p className="text-myWhite/80">
          Built-in stop-loss, position sizing, and risk limits. Users maintain
          full control with the ability to pause or adjust strategies at any
          time.
        </p>
      </div>
    </div>
  );
}

function RoyaltySystem() {
  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-lemon mb-6">
        Royalty Distribution System
      </h2>

      <div className="bg-gradient-to-r from-lemon/10 to-secondary/10 border-2 border-lemon/30 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-lemon mb-3">50% Royalty Pool</h3>
        <p className="text-myWhite/80 mb-0">
          Half of all music revenue is distributed to Dizzle token holders based
          on tier allocation and holding duration.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-secondary mb-4">
        Tier Allocation
      </h3>
      <div className="space-y-4 mb-8">
        {[
          { tier: "Gold", share: "25%", color: "#e9ec6b" },
          { tier: "Silver", share: "15%", color: "#c0c0c0" },
          { tier: "Bronze", share: "10%", color: "#cd7f32" },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div
              className="w-24 h-10 rounded-lg flex items-center justify-center font-bold"
              style={{ backgroundColor: `${item.color}20`, color: item.color }}
            >
              {item.tier}
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-myWhite font-semibold">
                  {item.share} of pool
                </span>
              </div>
              <div className="w-full bg-myWhite/10 rounded-full h-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: item.color,
                    width: `${parseInt(item.share)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-secondary mb-4">
        Revenue Sources
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[
          "Streaming royalties (Spotify, Apple Music, etc.)",
          "Sync licensing (TV, film, commercials)",
          "Performance royalties (radio, live events)",
          "Mechanical royalties (downloads, physical sales)",
          "YouTube monetization",
          "NFT music sales",
        ].map((source, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-myWhite/5 rounded-lg p-3"
          >
            <FaMusic className="text-lemon" />
            <span className="text-myWhite/80">{source}</span>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-secondary mb-4">
        Distribution Schedule
      </h3>
      <div className="bg-secondary/10 border-l-4 border-secondary rounded-lg p-6">
        <ul className="text-myWhite/80 space-y-2">
          <li>
            <strong className="text-secondary">Quarterly Distribution:</strong>{" "}
            Royalties paid every 3 months directly to wallets
          </li>
          <li>
            <strong className="text-secondary">Transparent Tracking:</strong>{" "}
            View real-time revenue and upcoming payouts on dashboard
          </li>
          <li>
            <strong className="text-secondary">Automatic Calculation:</strong>{" "}
            Smart contracts handle all distribution math
          </li>
          <li>
            <strong className="text-secondary">Holding Bonus:</strong> 1-year+
            holders receive 10% bonus multiplier
          </li>
        </ul>
      </div>
    </div>
  );
}

function Roadmap() {
  const phases = [
    {
      phase: "Q1 2025",
      title: "Foundation",
      items: [
        "Complete smart contract audit",
        "Launch presale (Gold tier)",
        "Marketing campaign kickoff",
        "KOL partnership program launch",
      ],
    },
    {
      phase: "Q2 2025",
      title: "Expansion",
      items: [
        "Silver & Bronze tier sales",
        "DEX listing (Uniswap/PancakeSwap)",
        "Trading bot beta release",
        "First royalty distribution",
      ],
    },
    {
      phase: "Q3 2025",
      title: "Growth",
      items: [
        "CEX listings (2-3 exchanges)",
        "Art & fashion marketplace launch",
        "Mobile app release",
        "Multi-artist expansion",
      ],
    },
    {
      phase: "Q4 2025",
      title: "Scaling",
      items: [
        "Staking platform launch",
        "Cross-chain bridge (Polygon, BSC)",
        "DAO governance implementation",
        "100K+ holder milestone",
      ],
    },
  ];

  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-lemon mb-6">Roadmap</h2>

      <div className="space-y-6">
        {phases.map((phase, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-myWhite/5 border-l-4 border-lemon rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-lemon/20 text-lemon rounded-full flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <div>
                <p className="text-sm text-lemon font-semibold">
                  {phase.phase}
                </p>
                <h3 className="text-xl font-bold text-myWhite">
                  {phase.title}
                </h3>
              </div>
            </div>
            <ul className="space-y-2 text-myWhite/70">
              {phase.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-lemon/10 to-secondary/10 border-2 border-lemon/30 rounded-xl p-6 mt-8">
        <h3 className="text-xl font-bold text-lemon mb-3">Long-Term Vision</h3>
        <p className="text-myWhite/80 mb-0">
          By 2026, establish Dizzle as the premier music royalty token, expand
          to 50+ artists, and become a case study for blockchain in the music
          industry.
        </p>
      </div>
    </div>
  );
}

// Helper component
function FaCrown({ className }: { className?: string }) {
  return <FaUsers className={className} />;
}
