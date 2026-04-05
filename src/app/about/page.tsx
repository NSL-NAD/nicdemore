"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { EASING_PREMIUM, viewportOnce } from "@/lib/motion";
import { CountUpStat } from "@/components/CountUpStat";

// ─────────────────────────────────────────────────────────────────────────────
// Card data
// ─────────────────────────────────────────────────────────────────────────────

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

// Row definitions: each row pairs cards (+ optional quote) with an image
const rows = [
  {
    cardIndices: [0, 1],
    quote: "Always do your best.",
    image: { src: "/nicdemore.jpg", alt: "Nic DeMore — portrait" },
    cardsFirst: true,
  },
  {
    cardIndices: [2, 3, 4],
    image: {
      src: "/imagery/IMG_7546.jpeg",
      alt: "Nic DeMore — on the lake",
    },
    cardsFirst: false,
  },
  {
    cardIndices: [5, 6],
    quote: "Leave things better than you found them.",
    image: {
      src: "/imagery/IMG_9277.JPG",
      alt: "Nic DeMore — Milwaukee waterfront",
    },
    cardsFirst: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Journey-style entrance animation (matches BriefHistory TimelineCard)
// ─────────────────────────────────────────────────────────────────────────────

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const hiddenLeft = {
  opacity: 0,
  x: "-60vw",
  y: 40,
  z: -80,
  rotateY: -16,
  rotateZ: -25,
  filter: "blur(14px)",
};
const hiddenRight = {
  opacity: 0,
  x: "60vw",
  y: 40,
  z: -80,
  rotateY: 16,
  rotateZ: 25,
  filter: "blur(14px)",
};
const visibleState = {
  opacity: 1,
  x: 0,
  y: 0,
  z: 0,
  rotateY: 0,
  rotateZ: 0,
  filter: "blur(0px)",
};

function entranceTransition(delay: number) {
  return {
    duration: 2.2,
    ease: ENTRANCE_EASE,
    delay,
    filter: { duration: 1.8, delay: delay + 0.1 },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// AboutParallaxCard — 3D mouse-tracked tilt + glare
// ─────────────────────────────────────────────────────────────────────────────

const TILT = 4;
const SPRING = { stiffness: 180, damping: 22, mass: 0.5 };

function AboutParallaxCard({
  card,
  fromLeft,
  delay,
  inView,
}: {
  card: (typeof cards)[0];
  fromLeft: boolean;
  delay: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const rotateX = useSpring(rawY, SPRING);
  const rotateY = useSpring(rawX, SPRING);
  const scale = useSpring(1, SPRING);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width;
      const cy = (e.clientY - rect.top) / rect.height;
      rawX.set((cx - 0.5) * 2 * TILT);
      rawY.set(-((cy - 0.5) * 2) * TILT);
      glareX.set(cx * 100);
      glareY.set(cy * 100);
      glareOpacity.set(0.15);
    },
    [rawX, rawY, glareX, glareY, glareOpacity]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    scale.set(1);
    glareOpacity.set(0);
    setHovered(false);
  }, [rawX, rawY, scale, glareOpacity]);

  const handleMouseEnter = useCallback(() => {
    scale.set(1.012);
    setHovered(true);
  }, [scale]);

  const glareBackground = useTransform(
    [glareX, glareY] as MotionValue<number>[],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.5) 0%, transparent 65%)`
  );

  return (
    <div className="flex-1" style={{ perspective: "800px" }}>
      <motion.div
        ref={cardRef}
        initial={fromLeft ? hiddenLeft : hiddenRight}
        animate={inView ? visibleState : fromLeft ? hiddenLeft : hiddenRight}
        transition={entranceTransition(delay)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          position: "relative",
          background: "var(--color-forest)",
          border: `1px solid ${hovered ? "var(--color-accent)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: "16px",
          boxShadow: hovered
            ? "0 16px 48px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)"
            : "0 2px 12px rgba(0,0,0,0.15)",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          cursor: "default",
          height: "100%",
        }}
        className="p-6 flex flex-col justify-center"
      >
        <h3
          className="font-display font-bold text-base mb-2"
          style={{ color: "rgba(255,255,255,0.95)" }}
        >
          {card.title}
        </h3>
        <p
          style={{
            fontSize: "14px",
            lineHeight: "1.7",
            color: "rgba(255,255,255,0.70)",
            fontFamily: "var(--font-syne)",
          }}
        >
          {card.body}
        </p>

        {/* Glare overlay */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "16px",
            pointerEvents: "none",
            opacity: glareOpacity,
            background: glareBackground,
            zIndex: 20,
          }}
        />
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QuoteCard — accent pull-quote styled to match card grid
// ─────────────────────────────────────────────────────────────────────────────

function QuoteCard({
  text,
  fromLeft,
  delay,
  inView,
}: {
  text: string;
  fromLeft: boolean;
  delay: number;
  inView: boolean;
}) {
  return (
    <div className="flex-1" style={{ perspective: "800px" }}>
      <motion.div
        initial={fromLeft ? hiddenLeft : hiddenRight}
        animate={inView ? visibleState : fromLeft ? hiddenLeft : hiddenRight}
        transition={entranceTransition(delay)}
        className="p-6 flex items-center h-full"
        style={{
          background: "var(--color-forest)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-serif)",
            fontStyle: "italic",
            fontSize: "clamp(18px, 2vw, 24px)",
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.5,
          }}
        >
          &ldquo;{text}&rdquo;
        </p>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ParallaxImage — image with scroll-driven internal parallax
// ─────────────────────────────────────────────────────────────────────────────

function ParallaxImage({
  src,
  alt,
  fromLeft,
  delay,
  inView,
}: {
  src: string;
  alt: string;
  fromLeft: boolean;
  delay: number;
  inView: boolean;
}) {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <div style={{ perspective: "800px" }}>
      <motion.div
        ref={imgRef}
        initial={fromLeft ? hiddenLeft : hiddenRight}
        animate={inView ? visibleState : fromLeft ? hiddenLeft : hiddenRight}
        transition={entranceTransition(delay)}
        className="relative overflow-hidden rounded-2xl h-full"
        style={{
          minHeight: "720px",
          border: "1px solid var(--color-accent)",
          boxShadow:
            "0 0 0 1px var(--color-accent), 0 24px 60px rgba(0,0,0,0.15)",
        }}
      >
        <motion.div style={{ y: imgY }} className="absolute inset-0">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ transform: "scale(1.15)" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CardImageRow — a single alternating row (cards + image)
// ─────────────────────────────────────────────────────────────────────────────

function CardImageRow({
  row,
}: {
  row: (typeof rows)[0];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const cardsFromLeft = row.cardsFirst;
  const imageFromLeft = !row.cardsFirst;

  const cardElements = (
    <>
      {row.cardIndices.map((ci, i) => (
        <AboutParallaxCard
          key={cards[ci].title}
          card={cards[ci]}
          fromLeft={cardsFromLeft}
          delay={i * 0.1}
          inView={inView}
        />
      ))}
      {row.quote && (
        <QuoteCard
          text={row.quote}
          fromLeft={cardsFromLeft}
          delay={row.cardIndices.length * 0.1}
          inView={inView}
        />
      )}
    </>
  );

  const imageElement = (
    <ParallaxImage
      src={row.image.src}
      alt={row.image.alt}
      fromLeft={imageFromLeft}
      delay={0.15}
      inView={inView}
    />
  );

  // Desktop: cardsFirst → cards col-1, image col-2. !cardsFirst → image col-1, cards col-2.
  // Mobile: image always shows first (via order classes).
  const cardsOrder = row.cardsFirst ? "order-2 lg:order-1" : "order-2 lg:order-2";
  const imageOrder = row.cardsFirst ? "order-1 lg:order-2" : "order-1 lg:order-1";

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-stretch">
      <div className={`flex flex-col gap-5 ${cardsOrder}`}>
        {cardElements}
      </div>
      <div className={imageOrder}>
        {imageElement}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AboutPage
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const philRef = useRef<HTMLDivElement>(null);

  // Page-level scroll for wordmark parallax
  const { scrollYProgress: pageScroll } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"],
  });
  const wordmarkY = useTransform(pageScroll, [0, 1], ["0%", "25%"]);

  // Title parallax
  const { scrollYProgress: titleScroll } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(titleScroll, [0, 1], [0, -40]);

  // Stats parallax
  const { scrollYProgress: statsScroll } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"],
  });
  const statsY = useTransform(statsScroll, [0, 1], [20, -20]);

  // Philosophy parallax
  const { scrollYProgress: philScroll } = useScroll({
    target: philRef,
    offset: ["start end", "end start"],
  });
  const philY = useTransform(philScroll, [0, 1], [60, 0]);

  return (
    <div
      ref={pageRef}
      className="min-h-screen pt-24 pb-16"
      style={{ position: "relative" }}
    >
      {/* "DEMORE" wordmark — positioned between heading and stats, overlapping both */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "clamp(320px, 42vh, 480px)",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        <motion.div
          style={{
            y: wordmarkY,
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "clamp(88px, 17.6vw, 220px)",
            letterSpacing: "-0.04em",
            color: "var(--color-text-primary)",
            opacity: 0.054,
            lineHeight: 1,
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          }}
        >
          DEMORE
        </motion.div>
      </div>

      {/* Opaque header area — masks the grid glow above the stats */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "var(--color-base)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
              <Link
                href="/"
                className="text-sm animated-underline transition-colors"
                style={{ color: "var(--color-text-secondary)" }}
              >
                &larr; Back to nicdemore.com
              </Link>
            </motion.div>
          </motion.div>

          {/* Page title — parallax drift */}
          <motion.section
            ref={titleRef}
            style={{ y: titleY }}
            className="pt-4 pb-4 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASING_PREMIUM }}
              className="mb-6"
            >
              <p
                className="font-mono text-xs tracking-widest uppercase mb-6"
                style={{
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                }}
              >
                // About
              </p>
              <h1
                data-neon-header="pink"
                className="font-display font-extrabold leading-none mb-6 mx-auto"
                style={{
                  fontSize: "clamp(48px, 6vw, 84px)",
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.035em",
                  maxWidth: "800px",
                }}
              >
                Builder. Engineer.
                <br />
                <span style={{ color: "var(--color-accent)" }}>Founder.</span>
              </h1>
            </motion.div>
          </motion.section>

          {/* Stats row — parallax drift */}
          <motion.div ref={statsRef} style={{ y: statsY }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 px-2">
              <CountUpStat end={9} suffix="+" label="Years Operating" />
              <CountUpStat end={12} label="Ventures in 2025" />
              <CountUpStat end={50} suffix="+" label="Team Members Led" />
              <CountUpStat end={8} label="Skill Domains" />
            </div>
          </motion.div>
        </div>
      </div>

      <div
        className="mx-auto max-w-7xl px-6"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Alternating card + image rows */}
        <div className="mt-12 space-y-10 mx-auto max-w-6xl">
          {rows.map((row, i) => (
            <CardImageRow key={i} row={row} />
          ))}
        </div>

        {/* Philosophy section — parallax rise */}
        <motion.div ref={philRef} style={{ y: philY }} className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASING_PREMIUM }}
            className="mx-auto max-w-3xl"
          >
            <div
              className="h-px mb-12"
              style={{ background: "var(--color-border)" }}
            />

            <span
              className="block text-xs tracking-widest uppercase mb-8"
              style={{
                color: "var(--color-accent)",
                fontFamily: "var(--font-jetbrains)",
                fontSize: "11px",
                letterSpacing: "0.08em",
              }}
            >
              // Philosophy
            </span>

            <div className="lg:grid lg:grid-cols-2 lg:gap-12">
              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, ease: EASING_PREMIUM }}
                  className="text-lg leading-relaxed"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  I believe the best work comes from people who genuinely care —
                  not just about shipping, but about what the thing they&apos;re
                  building does in the world. That&apos;s been my north star
                  since I started my first business at 18, and it&apos;s the
                  lens I bring to everything I build now.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.5,
                    delay: 0.08,
                    ease: EASING_PREMIUM,
                  }}
                  className="text-lg leading-relaxed"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  The mechanical engineering background wasn&apos;t just a
                  degree. It was a way of seeing. Systems. Constraints. Forces in
                  tension. You learn to ask: what is this thing actually doing,
                  and will it hold? That question applies to code, to
                  organizations, to strategy, to life.
                </motion.p>
              </div>
              <div className="space-y-6 mt-6 lg:mt-0">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.5,
                    delay: 0.16,
                    ease: EASING_PREMIUM,
                  }}
                  className="text-lg leading-relaxed"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Nine years running Margle taught me that building a business is
                  a deeply human project. You can have the best strategy in the
                  world — but if you can&apos;t build a team that trusts each
                  other, none of it works. I learned operations, finance, client
                  management, and leadership the hard way: by doing all of it,
                  at the same time, under real pressure.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.5,
                    delay: 0.24,
                    ease: EASING_PREMIUM,
                  }}
                  className="text-lg leading-relaxed"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Now I&apos;m building AI-native infrastructure and
                  purpose-driven ventures. Not because it&apos;s trendy —
                  because I genuinely believe this is the moment where the tools
                  exist to do good work at a scale that wasn&apos;t possible
                  before. That excites me every day.
                </motion.p>
              </div>
            </div>

            <div
              className="mt-12 pt-8"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-dm-serif)",
                  fontStyle: "italic",
                  fontSize: "18px",
                }}
              >
                &ldquo;Always do your best. Leave things better than you found
                them. It really is a beautiful life.&rdquo;
              </p>
              <p
                className="mt-3"
                style={{
                  color: "var(--color-text-light)",
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "11px",
                }}
              >
                — Personal operating system, circa always
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
