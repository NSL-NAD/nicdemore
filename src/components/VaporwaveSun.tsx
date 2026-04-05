"use client";
import { motion } from "framer-motion";
import { useRetro } from "@/contexts/RetroContext";

export function VaporwaveSun() {
  const { isRetro } = useRetro();

  if (!isRetro) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="pointer-events-none select-none"
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(calc(-50% - 50px))',
        width: '520px',
        height: '260px',
        zIndex: 0,
      }}
    >
      {/* Sun atmospheric glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-60px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,45,123,0.18) 0%, rgba(255,107,45,0.08) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(20px)',
        }}
      />

      {/* Synthwave sun — CSS semicircle matching blue-hut */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '520px',
          height: '260px',
          borderRadius: '520px 520px 0 0',
          zIndex: 1,
          background: 'linear-gradient(180deg, #FF2D7B 0%, #FF6B2D 45%, #FFD600 100%)',
          overflow: 'hidden',
          pointerEvents: 'none',
          boxShadow: `
            0 0 60px rgba(255, 45, 123, 0.6),
            0 0 120px rgba(255, 45, 123, 0.35),
            0 0 200px rgba(255, 107, 45, 0.2),
            0 0 300px rgba(255, 214, 0, 0.1)
          `,
        }}
      >
        {/* CRT scan lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 10px, rgba(11,11,26,0.55) 10px, rgba(11,11,26,0.55) 13px)',
          }}
        />
        {/* Inner glow at top of sun */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '60%',
            background: 'radial-gradient(ellipse, rgba(255,255,200,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </motion.div>
  );
}
