"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";
import { FaTwitter, FaDiscord, FaTelegram } from "react-icons/fa";
import { IoMusicalNotes, IoShirt } from "react-icons/io5";
import { FaPalette } from "react-icons/fa";
import { BiNetworkChart } from "react-icons/bi";
import { useState } from "react";
import { submitWaitlist } from "@/app/actions/waitlist";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<"creative" | "collector" | "">("");
  const [creativeField, setCreativeField] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    instagram: "",
    website: "",
  });
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  const platforms = [
    { id: "twitter", name: "Twitter", icon: FaTwitter, color: "#1DA1F2" },
    { id: "discord", name: "Discord", icon: FaDiscord, color: "#5865F2" },
    { id: "telegram", name: "Telegram", icon: FaTelegram, color: "#0088cc" },
  ];

  const interests = [
    { id: "music", name: "Music", icon: IoMusicalNotes, color: "#e9ec6b" },
    { id: "art", name: "Art", icon: FaPalette, color: "#fe8daa" },
    { id: "fashion", name: "Fashion", icon: IoShirt, color: "#f1e9da" },
    {
      id: "technology",
      name: "Technology",
      icon: BiNetworkChart,
      color: "#9be8a1",
    },
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((p) => p !== platformId)
        : [...prev, platformId]
    );
  };

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((i) => i !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!userType) {
      setError("Please select if you're a creative or collector");
      return;
    }

    if (selectedPlatforms.length === 0) {
      setError("Please select at least one community platform");
      return;
    }

    if (selectedInterests.length === 0) {
      setError("Please select at least one interest");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitWaitlist({
        email,
        userType,
        creativeField: userType === "creative" ? creativeField : undefined,
        portfolioLink: userType === "creative" ? portfolioLink : undefined,
        socialLinks: userType === "creative" ? socialLinks : undefined,
        platforms: selectedPlatforms,
        interests: selectedInterests,
      });

      if (result.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          onClose();
          // Reset form
          setEmail("");
          setUserType("");
          setCreativeField("");
          setPortfolioLink("");
          setSocialLinks({ twitter: "", instagram: "", website: "" });
          setSelectedPlatforms([]);
          setSelectedInterests([]);
          setSubmitSuccess(false);
        }, 2000);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setEmail("");
      setUserType("");
      setCreativeField("");
      setPortfolioLink("");
      setSocialLinks({ twitter: "", instagram: "", website: "" });
      setSelectedPlatforms([]);
      setSelectedInterests([]);
      setError("");
      setSubmitSuccess(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-br from-primary via-purple-900 to-primary rounded-3xl border-2 border-lemon/30 shadow-2xl shadow-lemon/20 p-8 relative overflow-hidden">
              {/* Animated background effects */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-lemon rounded-full blur-3xl animate-pulse" />
                <div
                  className="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="absolute top-4 right-4 text-myWhite/60 hover:text-lemon transition-colors z-10 cursor-pointer disabled:opacity-50"
              >
                <RiCloseLine size={32} />
              </button>

              {/* Content */}
              <div className="relative z-10">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="text-6xl mb-4"
                    >
                      🎉
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-lemon via-secondary to-lemon bg-clip-text text-transparent font-[Patrick_Hand]">
                      You're on the list!
                    </h2>
                    <p className="text-myWhite/90 text-lg">
                      We'll be in touch soon with exclusive updates.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-lemon via-secondary to-lemon bg-clip-text text-transparent font-[Patrick_Hand] text-center">
                      Join the Waitlist
                    </h2>
                    <p className="text-myWhite/80 text-center mb-8">
                      Be first to access exclusive drops and opportunities
                    </p>

                    {/* Email Input */}
                    <div className="mb-6">
                      <label className="block text-myWhite font-semibold mb-3 text-sm">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-primary/50 border-2 border-lemon/30 text-myWhite placeholder-myWhite/40 focus:border-lemon focus:outline-none transition-all disabled:opacity-50"
                      />
                    </div>

                    {/* User Type Selection */}
                    <div className="mb-6">
                      <label className="block text-myWhite font-semibold mb-3 text-sm">
                        I am a *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <motion.button
                          type="button"
                          onClick={() => setUserType("creative")}
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative p-4 rounded-xl border-2 transition-all disabled:opacity-50 ${
                            userType === "creative"
                              ? "border-lemon bg-lemon/20"
                              : "border-myWhite/20 bg-primary/30 hover:border-myWhite/40"
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-2xl mb-2">🎨</div>
                            <span className="text-sm text-myWhite font-medium">
                              Creative
                            </span>
                            <p className="text-xs text-myWhite/60 mt-1">
                              Artist, Producer, Designer
                            </p>
                          </div>
                          {userType === "creative" && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-5 h-5 bg-lemon rounded-full flex items-center justify-center"
                            >
                              <span className="text-primary text-xs">✓</span>
                            </motion.div>
                          )}
                        </motion.button>

                        <motion.button
                          type="button"
                          onClick={() => setUserType("collector")}
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative p-4 rounded-xl border-2 transition-all disabled:opacity-50 ${
                            userType === "collector"
                              ? "border-lemon bg-lemon/20"
                              : "border-myWhite/20 bg-primary/30 hover:border-myWhite/40"
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-2xl mb-2">💎</div>
                            <span className="text-sm text-myWhite font-medium">
                              Collector
                            </span>
                            <p className="text-xs text-myWhite/60 mt-1">
                              Fan, Investor, Supporter
                            </p>
                          </div>
                          {userType === "collector" && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-5 h-5 bg-lemon rounded-full flex items-center justify-center"
                            >
                              <span className="text-primary text-xs">✓</span>
                            </motion.div>
                          )}
                        </motion.button>
                      </div>
                    </div>

                    {/* Creative Fields - Only show if user type is creative */}
                    <AnimatePresence>
                      {userType === "creative" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mb-6 space-y-4"
                        >
                          {/* Creative Field */}
                          <div>
                            <label className="block text-myWhite font-semibold mb-3 text-sm">
                              Your Creative Field
                            </label>
                            <input
                              type="text"
                              value={creativeField}
                              onChange={(e) => setCreativeField(e.target.value)}
                              placeholder="e.g., Music Producer, Visual Artist, Fashion Designer"
                              disabled={isSubmitting}
                              className="w-full px-4 py-3 rounded-xl bg-primary/50 border-2 border-lemon/30 text-myWhite placeholder-myWhite/40 focus:border-lemon focus:outline-none transition-all disabled:opacity-50"
                            />
                          </div>

                          {/* Portfolio Link */}
                          <div>
                            <label className="block text-myWhite font-semibold mb-3 text-sm">
                              Portfolio / Work Link
                            </label>
                            <input
                              type="url"
                              value={portfolioLink}
                              onChange={(e) => setPortfolioLink(e.target.value)}
                              placeholder="https://your-portfolio.com"
                              disabled={isSubmitting}
                              className="w-full px-4 py-3 rounded-xl bg-primary/50 border-2 border-lemon/30 text-myWhite placeholder-myWhite/40 focus:border-lemon focus:outline-none transition-all disabled:opacity-50"
                            />
                          </div>

                          {/* Social Links */}
                          <div>
                            <label className="block text-myWhite font-semibold mb-3 text-sm">
                              Social Links (Optional)
                            </label>
                            <div className="space-y-2">
                              <input
                                type="url"
                                value={socialLinks.twitter}
                                onChange={(e) =>
                                  setSocialLinks({
                                    ...socialLinks,
                                    twitter: e.target.value,
                                  })
                                }
                                placeholder="Twitter / X"
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 rounded-lg bg-primary/50 border-2 border-lemon/20 text-myWhite placeholder-myWhite/40 focus:border-lemon focus:outline-none transition-all disabled:opacity-50 text-sm"
                              />
                              <input
                                type="url"
                                value={socialLinks.instagram}
                                onChange={(e) =>
                                  setSocialLinks({
                                    ...socialLinks,
                                    instagram: e.target.value,
                                  })
                                }
                                placeholder="Instagram"
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 rounded-lg bg-primary/50 border-2 border-lemon/20 text-myWhite placeholder-myWhite/40 focus:border-lemon focus:outline-none transition-all disabled:opacity-50 text-sm"
                              />
                              <input
                                type="url"
                                value={socialLinks.website}
                                onChange={(e) =>
                                  setSocialLinks({
                                    ...socialLinks,
                                    website: e.target.value,
                                  })
                                }
                                placeholder="Website"
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 rounded-lg bg-primary/50 border-2 border-lemon/20 text-myWhite placeholder-myWhite/40 focus:border-lemon focus:outline-none transition-all disabled:opacity-50 text-sm"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Platform Selection */}
                    <div className="mb-8">
                      <label className="block text-myWhite font-semibold mb-3 text-sm">
                        Preferred Community Platform *
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {platforms.map((platform) => {
                          const Icon = platform.icon;
                          const isSelected = selectedPlatforms.includes(
                            platform.id
                          );
                          return (
                            <motion.button
                              key={platform.id}
                              type="button"
                              onClick={() => togglePlatform(platform.id)}
                              disabled={isSubmitting}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`relative p-4 rounded-xl border-2 transition-all disabled:opacity-50 ${
                                isSelected
                                  ? "border-lemon bg-lemon/20"
                                  : "border-myWhite/20 bg-primary/30 hover:border-myWhite/40"
                              }`}
                            >
                              <Icon
                                size={28}
                                className="mx-auto mb-2"
                                style={{
                                  color: isSelected
                                    ? platform.color
                                    : "#f1e9da",
                                }}
                              />
                              <span className="text-xs text-myWhite font-medium">
                                {platform.name}
                              </span>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  className="absolute top-2 right-2 w-5 h-5 bg-lemon rounded-full flex items-center justify-center"
                                >
                                  <span className="text-primary text-xs">
                                    ✓
                                  </span>
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interest Selection */}
                    <div className="mb-8">
                      <label className="block text-myWhite font-semibold mb-3 text-sm">
                        Your Interests * (Select all that apply)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {interests.map((interest) => {
                          const Icon = interest.icon;
                          const isSelected = selectedInterests.includes(
                            interest.id
                          );
                          return (
                            <motion.button
                              key={interest.id}
                              type="button"
                              onClick={() => toggleInterest(interest.id)}
                              disabled={isSubmitting}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`relative p-4 rounded-xl border-2 transition-all disabled:opacity-50 ${
                                isSelected
                                  ? "border-lemon bg-lemon/20"
                                  : "border-myWhite/20 bg-primary/30 hover:border-myWhite/40"
                              }`}
                            >
                              <Icon
                                size={24}
                                className="mx-auto mb-2"
                                style={{
                                  color: isSelected
                                    ? interest.color
                                    : "#f1e9da",
                                }}
                              />
                              <span className="text-xs text-myWhite font-medium">
                                {interest.name}
                              </span>
                              {isSelected && (
                                <motion.div
                                  layoutId={`interest-selected-${interest.id}`}
                                  className="absolute top-2 right-2 w-5 h-5 bg-lemon rounded-full flex items-center justify-center"
                                >
                                  <span className="text-primary text-xs">
                                    ✓
                                  </span>
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm text-center"
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 40px rgba(233, 236, 107, 0.6)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-lemon to-secondary text-primary px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-lemon/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="inline-block w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                          />
                          Joining...
                        </span>
                      ) : (
                        "Join the Waitlist"
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
