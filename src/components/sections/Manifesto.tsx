"use client";

import { motion } from "framer-motion";

export function Manifesto() {
  return (
    <section
      className="py-20 px-6 text-center"
      style={{ background: 'var(--color-base)', position: 'relative' }}
    >
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto font-display leading-relaxed"
        style={{
          maxWidth: '800px',
          fontSize: 'clamp(22px, 3vw, 36px)',
          color: 'var(--color-text-primary)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
        }}
      >
        Milwaukee native. Mechanical engineer turned founder.{' '}
        <span style={{ color: 'var(--color-accent)' }}>
          Building ventures that do genuinely good work — at scale.
        </span>
      </motion.p>
    </section>
  );
}
