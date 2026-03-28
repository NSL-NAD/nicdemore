"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { EASING_PREMIUM } from "@/lib/motion";
import { useRetro } from "@/contexts/RetroContext";
import { CountUpStat } from "@/components/CountUpStat";

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
  const { isRetro } = useRetro();
  const pos = cardPositions[index];
  const drift = driftKeyframes[index];

  const hoverBorder = isRetro ? 'var(--retro-cyan)' : 'var(--color-accent)';
  const hoverGlow = isRetro
    ? '0 0 16px rgba(0,229,255,0.35), 0 0 40px rgba(0,229,255,0.12), var(--shadow-lg)'
    : '0 0 20px rgba(244, 99, 30, 0.15), var(--shadow-lg)';
  const hoverTitleColor = isRetro ? 'var(--retro-cyan)' : 'var(--color-accent)';

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
      className="absolute p-5 rounded-sm cursor-default transition-shadow duration-300"
      style={{
        ...pos,
        minWidth: '220px',
        maxWidth: '260px',
        transform: index === 6 ? 'translateX(-50%)' : undefined,
        background: 'var(--color-surface)',
        border: `1px solid ${hovered ? hoverBorder : 'var(--color-border)'}`,
        boxShadow: hovered ? hoverGlow : 'var(--shadow-sm)',
        zIndex: hovered ? 20 : 10,
      }}
    >
      <h3
        className="font-display font-bold text-sm mb-2"
        style={{ color: hovered ? hoverTitleColor : 'var(--color-text-primary)' }}
      >
        {card.title}
      </h3>
      <p
        style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-syne)' }}
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
      style={{ background: 'var(--color-base)', position: 'relative' }}
    >
      {/* Ghost / watermark text */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: 'clamp(80px, 18vw, 220px)',
          letterSpacing: '-0.04em',
          color: 'var(--color-text-primary)',
          opacity: 0.025,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
          lineHeight: 1,
        }}
      >
        NIC DEMORE
      </div>

      <div className="mx-auto max-w-7xl px-6" style={{ position: 'relative', zIndex: 1 }}>
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
        <section className="pt-4 pb-12 text-center" style={{ background: 'var(--color-base)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASING_PREMIUM }}
            className="mb-16"
          >
            <p
              className="font-mono text-xs tracking-widest uppercase mb-6"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)' }}
            >
              // About
            </p>
            <h1
              data-neon-header="pink"
              className="font-display font-extrabold leading-none mb-6 mx-auto"
              style={{
                fontSize: 'clamp(48px, 6vw, 84px)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.035em',
                maxWidth: '800px',
              }}
            >
              Builder. Engineer.<br />
              <span style={{ color: 'var(--color-accent)' }}>Founder.</span>
            </h1>
          </motion.div>
        </section>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 px-2 border-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <CountUpStat end={9} suffix="+" label="Years Operating" />
          <CountUpStat end={12} label="Ventures in 2025" />
          <CountUpStat end={50} suffix="+" label="Team Members Led" />
          <CountUpStat end={8} label="Skill Domains" />
        </div>

        {/* DESKTOP: floating cards around photo */}
        <div className="hidden lg:block relative" style={{ minHeight: '900px' }}>
          {/* Center photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASING_PREMIUM }}
            className="absolute left-1/2 top-[15%] -translate-x-1/2 w-[380px] z-[15]"
          >
            <div className="relative overflow-hidden" style={{ height: '440px' }}>
              <Image
                src="/nicdemore.jpg"
                alt="Nic DeMore"
                width={440}
                height={440}
                priority
                style={{
                  objectFit: 'cover',
                  objectPosition: 'top',
                  width: '100%',
                  height: '440px',
                  borderRadius: '2px',
                  boxShadow: '0 0 0 1px var(--color-accent), 0 24px 60px rgba(0,0,0,0.15)',
                }}
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

        {/* Full-bleed portrait section */}
        <div
          className="relative mt-16 -mx-6"
          style={{
            height: 'clamp(400px, 60vh, 700px)',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/nicdemore.jpg"
            alt="Nic DeMore"
            fill
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 40%, var(--color-base) 100%)',
            }}
          />
        </div>

        {/* Narrative section — below the floating cards area */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASING_PREMIUM }}
          className="mt-24 mx-auto max-w-2xl"
        >
          <div className="h-px mb-12" style={{ background: 'var(--color-border)' }} />

          <span
            className="block text-xs tracking-widest uppercase mb-8"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '11px' }}
          >
            // Philosophy
          </span>

          <div className="space-y-6" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
            <p className="text-base">
              I believe the best work comes from people who genuinely care — not just about shipping, but about what the thing they&apos;re building does in the world. That&apos;s been my north star since I started my first business at 18, and it&apos;s the lens I bring to everything I build now.
            </p>
            <p className="text-base">
              The mechanical engineering background wasn&apos;t just a degree. It was a way of seeing. Systems. Constraints. Forces in tension. You learn to ask: what is this thing actually doing, and will it hold? That question applies to code, to organizations, to strategy, to life.
            </p>
            <p className="text-base">
              Nine years running Margle taught me that building a business is a deeply human project. You can have the best strategy in the world — but if you can&apos;t build a team that trusts each other, none of it works. I learned operations, finance, client management, and leadership the hard way: by doing all of it, at the same time, under real pressure.
            </p>
            <p className="text-base">
              Now I&apos;m building AI-native infrastructure and purpose-driven ventures. Not because it&apos;s trendy — because I genuinely believe this is the moment where the tools exist to do good work at a scale that wasn&apos;t possible before. That excites me every day.
            </p>
          </div>

          <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--color-border)' }}>
            <p
              className="text-sm"
              style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: '16px' }}
            >
              &ldquo;Always do your best. Leave things better than you found them. It really is a beautiful life.&rdquo;
            </p>
            <p
              className="text-xs mt-3"
              style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-jetbrains)', fontSize: '11px' }}
            >
              — Personal operating system, circa always
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
