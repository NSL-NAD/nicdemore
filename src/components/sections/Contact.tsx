"use client";

import { motion } from "framer-motion";
import { EASING_PREMIUM, EASING_SMOOTH, viewportOnce } from "@/lib/motion";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 sm:py-32 lg:py-40"
      style={{ background: 'var(--color-base)' }}
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease: EASING_SMOOTH }}
          className="block text-xs tracking-widest uppercase mb-6"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '11px' }}
        >
          06 / Contact
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: EASING_PREMIUM }}
          data-neon-header="cyan"
          className="font-display font-bold mb-4"
          style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.025em',
          }}
        >
          Let&apos;s Work Together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASING_PREMIUM, delay: 0.1 }}
          className="text-lg leading-relaxed max-w-2xl mx-auto mb-12"
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 2vw, 22px)',
            color: 'var(--color-text-secondary)',
          }}
        >
          I&apos;m always interested in connecting with people who care about craft,
          design, and building things that actually matter. Let&apos;s talk.
        </motion.p>

        {/* Email — primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <a
            href="mailto:nademore@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 font-bold text-base transition-all hover:scale-[1.02]"
            style={{
              background: 'var(--color-accent)',
              color: '#fff',
              fontFamily: 'var(--font-syne)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            nademore@gmail.com
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-8 mb-12"
        >
          <a
            href="https://www.linkedin.com/in/nic-demore"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-reveal text-sm font-medium transition-colors hover:text-accent"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-syne)' }}
          >
            LinkedIn
          </a>
          <div className="w-1 h-1 rounded-full" style={{ background: 'var(--color-border)' }} />
          <a
            href="https://www.instagram.com/nicdemore/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-reveal text-sm font-medium transition-colors hover:text-accent"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-syne)' }}
          >
            Instagram
          </a>
          <div className="w-1 h-1 rounded-full" style={{ background: 'var(--color-border)' }} />
          <a
            href="https://goodatscale.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-reveal text-sm font-medium transition-colors hover:text-accent"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-syne)' }}
          >
            GAS Studio
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs tracking-widest"
          style={{
            color: 'var(--color-text-light)',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '11px',
            letterSpacing: '0.1em',
          }}
        >
          Based in Milwaukee, WI — available to relocate or work remotely
        </motion.p>
      </div>
    </section>
  );
}
