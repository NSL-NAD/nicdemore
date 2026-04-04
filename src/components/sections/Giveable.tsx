"use client";

import { motion } from "framer-motion";
import { EASING_PREMIUM, EASING_SMOOTH, EASING_SNAPPY, viewportOnce } from "@/lib/motion";

const howItWorks = [
  {
    step: "01",
    title: "Create Registry",
    desc: "Set up a registry in minutes. Choose your occasion, add details, and customize your preferences.",
  },
  {
    step: "02",
    title: "Add Products",
    desc: "Browse a curated collection of gifts from verified impact-driven brands and add your favorites.",
  },
  {
    step: "03",
    title: "Share It",
    desc: "Share your registry with friends and family via link, text, email, or QR code.",
  },
  {
    step: "04",
    title: "Create Impact",
    desc: "Every gift purchased creates measurable charitable impact. Track your total over time.",
  },
];

export function Giveable() {
  return (
    <section
      id="giveable"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      style={{ background: 'var(--color-forest)' }}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 80% 20%, rgba(244,99,30,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(0,180,100,0.06) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ── Two-column header area ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-12 items-start">
          {/* Left: label + h2 + desc + button */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: EASING_SMOOTH }}
              className="block text-xs tracking-widest uppercase mb-5"
              style={{
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '11px',
              }}
            >
              // Purpose Project
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.65, ease: EASING_PREMIUM }}
              data-neon-header="cyan"
              className="font-display font-bold mb-6 leading-tight"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                color: '#FAF9F6',
                letterSpacing: '-0.02em',
              }}
            >
              Every Gift Creates Change
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: EASING_PREMIUM, delay: 0.1 }}
              className="text-lg leading-relaxed mb-8"
              style={{ color: 'rgba(242, 237, 229, 0.8)' }}
            >
              &ldquo;Meaningful gift registries where 100% of products come from verified impact-driven brands. Every gift purchased creates measurable change.&rdquo;
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3, duration: 0.45 }}
              className="flex items-center gap-4"
            >
              <motion.a
                href="https://giveable.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 12px 40px rgba(244,99,30,0.55)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-sm"
                style={{
                  background: 'var(--color-accent)',
                  color: '#fff',
                  fontFamily: 'var(--font-syne)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(244,99,30,0.32)',
                }}
              >
                See Giveable
                <span>→</span>
              </motion.a>
              <span
                className="text-xs"
                style={{
                  color: 'rgba(242, 237, 229, 0.35)',
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '10px',
                  letterSpacing: '0.06em',
                }}
              >
                BUILDING NOW · 2025–
              </span>
            </motion.div>
          </div>

          {/* Right: story context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASING_PREMIUM, delay: 0.15 }}
            className="space-y-5 text-base leading-relaxed"
            style={{ color: 'rgba(242, 237, 229, 0.72)' }}
          >
            <p>
              Traveling through Kenya, I saw small local brands creating profound community impact —
              women learning to sew, artisans preserving traditional crafts. Back home, I noticed the gap:
              conscious consumers wanted to give gifts that meant something, but no registry was built for it.
            </p>
            <p>
              Giveable is the curated registry where 100% of brands are impact-driven.
              Gift-giving becomes a vehicle for doing good — without the friction of a donation ask.
              Every transaction generates measurable impact through the brands&apos; built-in giving models.
            </p>
            <div className="flex items-center gap-8 pt-2">
              {[
                { stat: '100%', label: 'Impact-driven brands' },
                { stat: '20+', label: 'Causes supported' },
                { stat: '$1M', label: 'Impact goal' },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    className="font-display font-bold"
                    style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: 'var(--color-accent)' }}
                  >
                    {item.stat}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{
                      color: 'rgba(242, 237, 229, 0.45)',
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: '10px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── How It Works grid — mirrors the Architecture image grid ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {howItWorks.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: EASING_SNAPPY, delay: i * 0.1 }}
              className="p-5 flex flex-col gap-3"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(242,237,229,0.09)',
                borderRadius: '10px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  color: 'var(--color-accent)',
                  opacity: 0.7,
                }}
              >
                {item.step}
              </span>
              <div>
                <p
                  className="font-semibold mb-1.5 leading-snug"
                  style={{
                    color: 'rgba(242,237,229,0.92)',
                    fontFamily: 'var(--font-syne)',
                    fontSize: '14px',
                  }}
                >
                  {item.title}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{
                    color: 'rgba(242,237,229,0.50)',
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '11px',
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
