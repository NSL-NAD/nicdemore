"use client";
import { motion } from "framer-motion";
import { useRetro } from "@/contexts/RetroContext";

export function VaporwaveSun() {
  const { isRetro } = useRetro();

  if (!isRetro) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="pointer-events-none select-none"
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: '5%',
        top: '15%',
        zIndex: 2,
        width: 'clamp(160px, 20vw, 280px)',
        height: 'clamp(80px, 10vw, 140px)',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 280 140"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <radialGradient id="sun-grad" cx="50%" cy="100%" r="100%">
            <stop offset="0%" stopColor="#FF2D78" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#FF6B00" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#7B2FBE" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0A0A14" stopOpacity="0.3" />
          </radialGradient>
          <filter id="sun-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sun semicircle */}
        <path
          d="M 0 140 A 140 140 0 0 1 280 140 Z"
          fill="url(#sun-grad)"
          filter="url(#sun-glow)"
        />

        {/* Horizontal lines creating the retro stripe effect */}
        {[1, 2, 3, 4, 5, 6, 7].map((n) => {
          const y = 140 - n * (140 / 8);
          const xOffset = Math.sqrt(Math.max(0, 140 * 140 - (140 - y) * (140 - y)));
          return (
            <line
              key={n}
              x1={140 - xOffset}
              y1={y + 2}
              x2={140 + xOffset}
              y2={y + 2}
              stroke="#0A0A14"
              strokeWidth={n < 3 ? 4 : n < 6 ? 3 : 2}
              opacity={0.7}
            />
          );
        })}

        {/* Outer glow ring */}
        <path
          d="M 10 140 A 130 130 0 0 1 270 140"
          fill="none"
          stroke="#FF2D78"
          strokeWidth="1"
          opacity="0.4"
          filter="url(#sun-glow)"
        />
      </svg>
    </motion.div>
  );
}
