"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { EASING_PREMIUM } from "@/lib/motion";

const cards = [
  {
    title: "The Foundation",
    body: "Milwaukee raised. Marquette educated. Mechanical engineering gave me a systems lens I've never set down — every problem is a design problem, every process has a load it has to bear.",
  },
  {
    title: "The Entrepreneur",
    body: "Co-founded Margle Media at 22 with no clients and no playbook. Built it to seven figures. Learned that building an organization is the hardest and most rewarding design challenge there is.",
  },
  {
    title: "The Operator",
    body: "Nine years running every dimension of a growing agency — sales, finance, ops, people, legal, creative, production. If a digital marketing agency can ask it of you, I've done it.",
  },
  {
    title: "The Student",
    body: "Two years obsessively studying architecture to design my dream home. Watched, absorbed, applied. Turned that education into a course — because the process changed how I see space, and that was worth sharing.",
  },
  {
    title: "The Builder",
    body: "Now building a studio of purpose-driven ventures under one roof. AI-native infrastructure, autonomous agents, and businesses built to do genuinely good work — at scale.",
  },
  {
    title: "The Values",
    body: "Integrity isn't a policy — it's a foundation. Curiosity over certainty. Always do your best. Leave things better than you found them. It really is a beautiful life.",
  },
  {
    title: "The Personal",
    body: "Husband to Natasha. Dad to Leo. Deep Milwaukee roots — my grandfather fished McKinley Pier. Passionate about travel, photography, design, and building things that last.",
  },
];

// Organic positions for desktop floating cards around center photo
const cardPositions = [
  { top: "2%", left: "0%", delay: 0 },      // top-left
  { top: "0%", right: "0%", delay: 0.3 },    // top-right
  { top: "28%", left: "-2%", delay: 0.6 },   // mid-left
  { top: "30%", right: "-2%", delay: 0.9 },  // mid-right
  { top: "56%", left: "0%", delay: 1.2 },    // lower-left
  { top: "58%", right: "0%", delay: 1.5 },   // lower-right
  { top: "82%", left: "50%", delay: 1.8 },   // bottom-center
];

// Drift animations — each card floats on a unique cycle
const driftKeyframes = [
  { x: [0, 6, -4, 2, 0], y: [0, -8, 4, -3, 0] },
  { x: [0, -5, 7, -2, 0], y: [0, 6, -5, 3, 0] },
  { x: [0, 8, -3, 5, 0], y: [0, -4, 7, -6, 0] },
  { x: [0, -6, 4, -7, 0], y: [0, 5, -3, 8, 0] },
  { x: [0, 4, -8, 3, 0], y: [0, -7, 5, -2, 0] },
  { x: [0, -3, 6, -5, 0], y: [0, 8, -4, 6, 0] },
  { x: [0, 5, -5, 4, 0], y: [0, -3, 6, -4, 0] },
];

function FloatingCard({
  card,
  index,
}: {
  card: typeof cards[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const pos = cardPositions[index];
  const drift = driftKeyframes[index];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: hovered ? 0 : drift.x,
        y: hovered ? 0 : drift.y,
      }}
      transition={
        hovered
          ? { duration: 0.3, ease: EASING_PREMIUM }
          : {
              opacity: { duration: 0.6, delay: pos.delay },
              scale: { duration: 0.6, delay: pos.delay },
              x: { duration: 12 + index * 2, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 14 + index * 2, repeat: Infinity, ease: "easeInOut" },
            }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute w-[280px] p-5 rounded-sm cursor-default transition-shadow duration-300"
      style={{
        ...pos,
        transform: index === 6 ? 'translateX(-50%)' : undefined,
        background: 'var(--color-surface)',
        border: `1px solid ${hovered ? 'var(--color-accent)' : 'var(--color-border)'}`,
        boxShadow: hovered
          ? '0 0 20px rgba(244, 99, 30, 0.15), var(--shadow-lg)'
          : 'var(--shadow-sm)',
        zIndex: hovered ? 20 : 10,
      }}
    >
      <h3
        className="font-display font-bold text-sm mb-2"
        style={{ color: hovered ? 'var(--color-accent)' : 'var(--color-text-primary)' }}
      >
        {card.title}
      </h3>
      <p
        className="text-xs leading-relaxed"
        style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-syne)' }}
      >
        {card.body}
      </p>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div
      className="min-h-screen pt-24 pb-16"
      style={{ background: 'var(--color-base)' }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="text-sm animated-underline transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            &larr; Back to nicdemore.com
          </Link>
        </motion.div>

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASING_PREMIUM }}
          className="text-center mb-16"
        >
          <span
            className="block text-xs tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '11px' }}
          >
            About
          </span>
          <h1
            data-neon-header="pink"
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.025em',
            }}
          >
            The Full Picture
          </h1>
        </motion.div>

        {/* DESKTOP: floating cards around photo */}
        <div className="hidden lg:block relative" style={{ minHeight: '900px' }}>
          {/* Center photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASING_PREMIUM }}
            className="absolute left-1/2 top-[15%] -translate-x-1/2 w-[300px] z-[15]"
          >
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                aspectRatio: '3/4',
                boxShadow: '0 0 30px rgba(244, 99, 30, 0.1), var(--shadow-lg)',
                border: '2px solid var(--color-accent)',
              }}
            >
              <Image
                src="/nicdemore.jpg"
                alt="Nic DeMore"
                fill
                priority
                className="object-cover object-top"
                sizes="300px"
              />
            </div>
          </motion.div>

          {/* Floating cards */}
          {cards.map((card, i) => (
            <FloatingCard key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* MOBILE/TABLET: stacked grid */}
        <div className="lg:hidden">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASING_PREMIUM }}
            className="mx-auto w-[240px] mb-12"
          >
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                aspectRatio: '3/4',
                boxShadow: '0 0 30px rgba(244, 99, 30, 0.1), var(--shadow-lg)',
                border: '2px solid var(--color-accent)',
              }}
            >
              <Image
                src="/nicdemore.jpg"
                alt="Nic DeMore"
                fill
                priority
                className="object-cover object-top"
                sizes="240px"
              />
            </div>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASING_PREMIUM }}
                className="p-5 rounded-sm"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h3
                  className="font-display font-bold text-sm mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
