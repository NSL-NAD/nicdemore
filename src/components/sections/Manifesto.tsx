"use client";

import { motion } from "framer-motion";

export function Manifesto() {
  return (
    <section
      className="pt-4 pb-0 relative mt-4 md:-mt-6"
      style={{ background: 'transparent', position: 'relative', zIndex: 20 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="w-full text-center px-5 md:px-12 flex items-center justify-center"
        style={{
          minHeight: '562px',
          background: 'var(--color-forest)',
          borderRadius: '24px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08)',
        }}
      >
        <p
          className="font-display leading-relaxed max-w-[90%] md:max-w-[50%]"
          style={{
            fontSize: 'clamp(22px, 3vw, 36px)',
            color: 'rgba(255,255,255,0.92)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            margin: '0 auto',
          }}
        >
          Good work, done right, reaches further than you expect.{' '}
          <span style={{ color: 'var(--color-accent)' }}>
            The whole point is doing good at scale: building things that solve real problems, create real impact, and compound over time.
          </span>
        </p>
      </motion.div>
    </section>
  );
}
