"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoConstruct } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";

interface InProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageName?: string;
}

export default function InProgressModal({
  isOpen,
  onClose,
  pageName = "This page",
}: InProgressModalProps) {
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className="bg-gradient-to-br from-primary via-primary to-purple-900 rounded-2xl border-2 border-lemon/30 shadow-2xl shadow-lemon/20 p-8 relative overflow-hidden">
              {/* Animated background effect */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-lemon rounded-full blur-3xl animate-pulse" />
                <div
                  className="absolute bottom-0 left-0 w-32 h-32 bg-secondary rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-myWhite/60 hover:text-lemon transition-colors z-10 cursor-pointer"
              >
                <RiCloseLine size={28} />
              </button>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Icon */}
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="inline-block mb-6"
                >
                  <div className="bg-gradient-to-br from-lemon to-secondary p-4 rounded-full">
                    <IoConstruct size={48} className="text-primary" />
                  </div>
                </motion.div>

                {/* Title */}
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-lemon via-secondary to-lemon bg-clip-text text-transparent font-[Patrick_Hand]">
                  Coming Soon!
                </h2>

                {/* Message */}
                <p className="text-myWhite/90 text-lg mb-2">
                  {pageName} is currently under construction.
                </p>
                <p className="text-myWhite/70 text-sm mb-6">
                  We're working hard to bring you something amazing. Stay tuned!
                </p>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mb-6">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      className="w-2 h-2 rounded-full bg-lemon"
                    />
                  ))}
                </div>

                {/* Close button */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(233, 236, 107, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="bg-gradient-to-r from-lemon to-secondary text-primary px-8 py-3 rounded-full font-bold text-lg shadow-lg shadow-lemon/30 transition-all cursor-pointer"
                >
                  Got It!
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
