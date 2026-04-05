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
        position: 'fixed',
        left: '50%',
        bottom: '0',
        transform: 'translateX(-50%)',
        zIndex: 0,
        width: 'clamp(300px, 45vw, 600px)',
        height: 'clamp(150px, 22.5vw, 300px)',
        overflow: 'visible',
      }}
    >
      <svg
        viewBox="-60 -60 400 260"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          {/* Sun gradient: yellow/gold top → orange mid → hot pink bottom (correct synthwave) */}
          <linearGradient id="sun-grad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#FFB347" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#FF6B2D" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#FF5050" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FF3090" stopOpacity="1.0" />
          </linearGradient>

          {/* Ambient glow behind sun — large pink/purple haze */}
          <radialGradient id="sun-ambient" cx="50%" cy="80%" r="100%">
            <stop offset="0%" stopColor="#FF3090" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#B026FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0B0B1A" stopOpacity="0" />
          </radialGradient>

          {/* Crisp glow filter for the sun body */}
          <filter id="sun-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense outer ring glow */}
          <filter id="ring-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient pink/purple haze — extends far beyond sun */}
        <ellipse
          cx="140"
          cy="140"
          rx="220"
          ry="180"
          fill="url(#sun-ambient)"
        />

        {/* Sun semicircle */}
        <path
          d="M 0 140 A 140 140 0 0 1 280 140 Z"
          fill="url(#sun-grad)"
          filter="url(#sun-glow)"
        />

        {/* Horizontal stripe lines — classic synthwave */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
          const y = 140 - n * (140 / 10);
          const r = 140;
          const dy = r - y;
          const xOffset = Math.sqrt(Math.max(0, r * r - dy * dy));
          const strokeW = n <= 2 ? 5 : n <= 5 ? 4 : 3;
          return (
            <line
              key={n}
              x1={140 - xOffset + 2}
              y1={y}
              x2={140 + xOffset - 2}
              y2={y}
              stroke="#0B0B1A"
              strokeWidth={strokeW}
              opacity={0.8}
            />
          );
        })}

        {/* Outer glow ring — bright pink with heavy glow */}
        <path
          d="M -4 140 A 144 144 0 0 1 284 140"
          fill="none"
          stroke="#FF3090"
          strokeWidth="2"
          opacity="0.7"
          filter="url(#ring-glow)"
        />

        {/* Second outer ring — purple, wider glow */}
        <path
          d="M -10 140 A 150 150 0 0 1 290 140"
          fill="none"
          stroke="#B026FF"
          strokeWidth="1.5"
          opacity="0.3"
          filter="url(#ring-glow)"
        />
      </svg>
    </motion.div>
  );
}
