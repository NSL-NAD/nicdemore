"use client";

import { motion } from "framer-motion";
import { EASING_PREMIUM, EASING_SMOOTH, viewportOnce } from "@/lib/motion";

const impact = [
  { stat: "100%", label: "Impact-driven brands" },
  { stat: "0", label: "Compromise on quality" },
  { stat: "∞", label: "Good at scale" },
];

export function Giveable() {
  return (
    <section
      id="giveable"
      className="py-24 sm:py-32 lg:py-40 relative overflow-hidden"
      style={{ background: 'var(--color-forest)' }}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(244,99,30,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(0,180,100,0.06) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: EASING_SMOOTH }}
              className="block text-xs tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '11px' }}
            >
              05 / Purpose Project
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.65, ease: EASING_PREMIUM }}
              data-neon-header="cyan"
              className="font-display font-bold mb-6 leading-tight"
              style={{
                fontSize: 'clamp(36px, 5vw, 60px)',
                color: '#FAF9F6',
                letterSpacing: '-0.02em',
              }}
            >
              Building Good at Scale
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: EASING_PREMIUM, delay: 0.1 }}
              className="text-lg leading-relaxed mb-6"
              style={{
                color: 'rgba(242, 237, 229, 0.8)',
                fontFamily: 'var(--font-dm-serif)',
                fontSize: 'clamp(17px, 1.8vw, 20px)',
              }}
            >
              Traveling through Kenya, I saw small local brands creating profound community impact —
              women learning to sew, artisans preserving traditional crafts. Back home, I noticed a gap:
              conscious consumers wanted to give gifts that meant something, but no registry was built for it.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: EASING_PREMIUM, delay: 0.18 }}
              className="text-base leading-relaxed mb-10"
              style={{ color: 'rgba(242, 237, 229, 0.6)' }}
            >
              Giveable is the curated registry where 100% of brands are impact-driven.
              Gift-giving becomes a vehicle for doing good — without the friction of a donation ask.
              Every transaction generates measurable impact through the brands&apos; built-in giving models.
            </motion.p>

            {/* Impact stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="grid grid-cols-3 gap-6 mb-10"
            >
              {impact.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.45 }}
                  className="text-center"
                >
                  <div
                    className="font-display font-bold mb-1"
                    style={{
                      fontSize: 'clamp(28px, 3.5vw, 40px)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    {item.stat}
                  </div>
                  <div
                    className="text-xs leading-tight"
                    style={{
                      color: 'rgba(242, 237, 229, 0.5)',
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: '10px',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.4, duration: 0.45 }}
              className="flex items-center gap-4"
            >
              <a
                href="https://giveable.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-sm transition-all hover:scale-[1.02]"
                style={{
                  background: 'var(--color-accent)',
                  color: '#fff',
                  fontFamily: 'var(--font-syne)',
                }}
              >
                See Giveable
                <span>→</span>
              </a>
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

          {/* Right: abstract visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.75, ease: EASING_PREMIUM, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* GAS ethos card */}
            <div
              className="p-8 rounded-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(242, 237, 229, 0.1)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                {/* GAS triple dot */}
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-accent)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-accent)', opacity: 0.6 }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-accent)', opacity: 0.3 }} />
                </div>
                <span
                  className="font-bold text-sm"
                  style={{
                    color: 'var(--color-accent)',
                    fontFamily: 'var(--font-syne)',
                    letterSpacing: '0.06em',
                  }}
                >
                  Good at Scale Studio
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-dm-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(18px, 1.8vw, 22px)',
                  color: 'rgba(242, 237, 229, 0.75)',
                  lineHeight: 1.5,
                }}
              >
                &ldquo;Doing good and doing well aren&apos;t in conflict. They&apos;re the same thing done right.&rdquo;
              </p>
            </div>

            {/* Registry model breakdown */}
            <div
              className="p-6 rounded-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(242, 237, 229, 0.08)',
              }}
            >
              <p
                className="mb-4 text-xs uppercase tracking-widest"
                style={{ color: 'rgba(242,237,229,0.4)', fontFamily: 'var(--font-jetbrains)', fontSize: '10px' }}
              >
                How it works
              </p>
              {[
                ["Brands apply", "Vetted for genuine impact + quality"],
                ["Registries created", "Free for anyone — weddings, birthdays, all occasions"],
                ["Gifts purchased", "10–15% commission to Giveable"],
                ["Impact generated", "Every purchase creates measurable good"],
              ].map(([step, desc]) => (
                <div key={step} className="flex items-start gap-3 mb-3 last:mb-0">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--color-accent)' }} />
                  <div>
                    <span className="text-sm font-medium" style={{ color: 'rgba(242,237,229,0.85)' }}>{step}</span>
                    <span className="text-sm" style={{ color: 'rgba(242,237,229,0.45)' }}> — {desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
