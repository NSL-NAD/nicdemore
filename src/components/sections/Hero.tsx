"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

const words = [
  { text: "Builder.", accent: true },
  { text: "Engineer.", accent: false },
  { text: "Founder.", accent: false },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay },
  }),
};

export function Hero() {
  return (
    <section
      id="overview"
      className="relative min-h-screen flex items-center justify-center blueprint-grid overflow-hidden"
    >
      <div className="mx-auto max-w-5xl px-6 py-32 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          {words.map((word) => (
            <motion.h1
              key={word.text}
              variants={wordVariants}
              className={`font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.95] tracking-tight ${
                word.accent ? "text-accent" : "text-ink"
              }`}
            >
              {word.text}
            </motion.h1>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          custom={1.0}
          initial="hidden"
          animate="visible"
          className="text-ink-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Mechanical engineer turned entrepreneur. Building AI-native systems
          and purpose-driven ventures from Milwaukee.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={1.3}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-8 text-base font-medium"
        >
          <a
            href="#work"
            className="animated-underline text-ink hover:text-accent transition-colors"
          >
            View my work ↓
          </a>
          <a
            href="#about"
            className="animated-underline text-ink hover:text-accent transition-colors"
          >
            Read my story →
          </a>
        </motion.div>
      </div>

      {/* Subtle scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-ink-muted/30 flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-ink-muted/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
