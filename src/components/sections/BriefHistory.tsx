"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { EASING_PREMIUM, EASING_SMOOTH, viewportOnce } from "@/lib/motion";
import { useRetro } from "@/contexts/RetroContext";

interface TimelineEntry {
  year: string;
  role: string;
  org: string;
  description: string;
  skills: string[];
  accent?: boolean;
}

const timeline: TimelineEntry[] = [
  {
    year: "1993–2012",
    role: "Learning About Life",
    org: "Milwaukee, WI",
    description:
      "Raised in Milwaukee with deep roots and a curious mind. Grew up watching my grandfather fish McKinley Pier. Learned early that hard work, integrity, and showing up for people is the foundation everything else is built on.",
    skills: ["Curiosity", "Resilience", "Creative Thinking", "Problem Solving"],
  },
  {
    year: "2012",
    role: "First Business Launch — Age 18",
    org: "Direct Sales",
    description:
      "Started my first business straight out of high school. Surrounded myself with mentors, absorbed everything I could, and learned the basics of what it means to build something from nothing — sales, communication, and the discipline it takes to actually execute.",
    skills: ["Sales", "Business Fundamentals", "Mentorship", "Hustle"],
  },
  {
    year: "2012–2016",
    role: "Mechanical Engineering",
    org: "Marquette University",
    description:
      "Systems thinking baked in from day one. Engineering taught me to see the world as a set of forces, tolerances, and constraints — and to design solutions that hold up under pressure. That lens never left.",
    skills: ["Systems Thinking", "Engineering", "Problem Solving", "Technical Design"],
    accent: true,
  },
  {
    year: "2017",
    role: "Co-Founded Margle Media",
    org: "Digital Marketing Agency",
    description:
      "Co-founded Margle Media and scaled it to a full-service agency serving national brands. Touched every dimension of the business: paid strategy for Cousins Subs, Johnsonville, Frito-Lay, Florsheim, Instant Pot; built and managed ops, AR/AP, cashflow, and utilization reporting; hired and led the team through direct reports, reviews, and org structure; handled IT, legal, and creative production; owned client relationships end-to-end. The real-world MBA.",
    skills: [
      "Operations",
      "Digital Marketing",
      "Finance & Accounting",
      "Client Management",
      "Leadership",
      "Business Strategy",
    ],
  },
  {
    year: "2017–2025",
    role: "Running Every Dimension",
    org: "Margle Media",
    description:
      "Nine years operating every function of a growing agency — sales, ops, finance, HR, client management, production, legal, IT. If a digital agency can ask it of you, I've done it. Built the leadership team, managed the P&L, grew the client roster, and kept the machine running.",
    skills: [
      "P&L Management",
      "Operations",
      "People Management",
      "Client Management",
      "Financial Strategy",
    ],
  },
  {
    year: "2024",
    role: "Home Design Educator + Course Creator",
    org: "Foundations of Architecture",
    description:
      "Spent two years learning architecture to design my dream home — obsessively. Turned that education into FOA, a course for non-architects who want to approach their space with genuine intention. Not an architect. Just someone who learned until it clicked.",
    skills: ["Curriculum Design", "Content Creation", "Architecture", "Teaching"],
  },
  {
    year: "2025–",
    role: "AI Builder + Venture Studio",
    org: "Good at Scale Studio",
    description:
      "Building AI-native infrastructure and purpose-driven ventures. Autonomous agent systems, AI ops, and a studio built to do good — at scale. The 12×12 challenge: 12 ventures in 12 months.",
    skills: ["AI Systems", "Venture Building", "Agent Infrastructure", "Product Development"],
    accent: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TimelineCard — cinematic 3D entrance from off-screen + per-card spine segments
// ─────────────────────────────────────────────────────────────────────────────

function TimelineCard({
  item,
  index,
  isFirst,
  isLast,
  dotRef,
}: {
  item: TimelineEntry;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  dotRef?: React.RefObject<HTMLDivElement>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  // Scroll progress for the animated accent line inside the card
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Dot shared between desktop center column and mobile
  const dotEl = (ref?: React.RefObject<HTMLDivElement>) => (
    <motion.div
      ref={ref}
      className="w-3 h-3 rounded-full shrink-0"
      style={{ background: "var(--color-accent)", zIndex: 10, position: "relative" }}
      initial={{ scale: 1, boxShadow: "0 0 0 0 rgba(244,99,30,0)" }}
      whileInView={{
        scale: 1,
        boxShadow: [
          "0 0 0 0 rgba(244,99,30,0)",
          "0 0 0 8px rgba(244,99,30,0.45)",
          "0 0 0 0 rgba(244,99,30,0)",
        ],
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.9 }}
    />
  );

  return (
    // Perspective wrapper — required for translateZ depth
    <div style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}>
      <motion.div
        ref={ref}
        initial={{
          opacity: 0,
          x: isLeft ? -560 : 560,
          y: 40,
          z: -60,
          rotateY: isLeft ? -18 : 18,
          filter: "blur(12px)",
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          z: 0,
          rotateY: 0,
          filter: "blur(0px)",
        }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.05,
          filter: { duration: 1.0, delay: 0.05 },
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative md:grid md:grid-cols-[1fr_40px_1fr] md:gap-0"
      >
        {/* LEFT COLUMN — card content or empty */}
        <div
          className={`hidden md:block ${
            isLeft ? "md:pr-8" : "md:col-start-3 md:pl-8"
          }`}
        >
          {isLeft && (
            <CardContent item={item} lineWidth={lineWidth} align="right" />
          )}
          {!isLeft && (
            <CardContent item={item} lineWidth={lineWidth} align="left" />
          )}
        </div>

        {/* CENTER SPINE — dot + gray connectors above/below */}
        {/*
          Structure: [top connector 4px] [dot 12px] [bottom connector flex-1]
          Top connector: transparent for first card, gray for all others
          Bottom connector: transparent for last card, gray for all others
          This ensures the gray track starts exactly at the first dot
          and ends exactly at the last dot — no overflow above or below.
        */}
        <div className="hidden md:flex flex-col items-center md:col-start-2">
          {/* Top 4px connector (matches the mt-1 spacing the dot previously used) */}
          <div
            className="w-[6px] shrink-0"
            style={{
              height: "4px",
              background: isFirst ? "transparent" : "var(--color-border)",
            }}
          />

          {/* Dot */}
          {dotEl(dotRef)}

          {/* Bottom connector fills the rest of the row height */}
          <div
            className="w-[6px] flex-1"
            style={{
              background: isLast ? "transparent" : "var(--color-border)",
              minHeight: 0,
            }}
          />
        </div>

        {/* Right-column spacer for left-side cards */}
        {isLeft && <div className="hidden md:block" />}

        {/* MOBILE LAYOUT */}
        <div className="md:hidden pl-8 relative">
          <motion.div
            className="absolute left-0 top-1.5 w-3 h-3 rounded-full"
            style={{ background: "var(--color-accent)", zIndex: 10 }}
            initial={{ scale: 1, boxShadow: "0 0 0 0 rgba(244,99,30,0)" }}
            whileInView={{
              scale: 1,
              boxShadow: [
                "0 0 0 0 rgba(244,99,30,0)",
                "0 0 0 8px rgba(244,99,30,0.45)",
                "0 0 0 0 rgba(244,99,30,0)",
              ],
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.9 }}
          />
          <CardContent item={item} lineWidth={lineWidth} align="left" />
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CardContent — deep forest green + orange year tag
// ─────────────────────────────────────────────────────────────────────────────

function CardContent({
  item,
  lineWidth,
  align,
}: {
  item: TimelineEntry;
  lineWidth: MotionValue<string>;
  align: "left" | "right";
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="pb-10 p-3 sm:p-4 max-w-[calc(100vw-2rem)]"
      style={{
        background: "var(--color-forest)",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        border: `1px solid ${hovered ? "var(--color-accent)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: "4px",
      }}
      animate={{ boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
      whileHover={{
        y: -4,
        boxShadow: "0 16px 48px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Year badge — solid orange pill */}
      <div className={`mb-2 flex ${align === "right" ? "justify-end" : "justify-start"}`}>
        <span
          className="inline-block font-mono tracking-wide px-2 py-0.5 rounded-sm"
          style={{
            background: "var(--color-accent)",
            color: "#fff",
            fontFamily: "var(--font-jetbrains)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          {item.year}
        </span>
      </div>

      <h3
        className="font-display font-bold text-xl mb-0.5"
        style={{ color: "rgba(255,255,255,0.95)" }}
      >
        {item.role}
      </h3>
      <p
        className="text-sm mb-3 font-medium"
        style={{
          color: "var(--color-accent)",
          fontFamily: "var(--font-jetbrains)",
          fontSize: "11px",
        }}
      >
        {item.org}
      </p>

      {/* Scroll-animated accent line */}
      <div
        className="h-px mb-3 overflow-hidden"
        style={{ background: "var(--color-border-subtle)" }}
      >
        <motion.div
          style={{
            width: lineWidth,
            height: "100%",
            background: "var(--color-accent)",
            opacity: 0.4,
            marginLeft: align === "right" ? "auto" : undefined,
          }}
        />
      </div>

      {/* Description — always left-aligned for readability */}
      <p
        className="text-sm leading-relaxed mb-4 text-left"
        style={{ color: "rgba(255,255,255,0.70)" }}
      >
        {item.description}
      </p>

      {/* Skills tags */}
      <div className="flex flex-wrap gap-1.5">
        {item.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-0.5 rounded-sm"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.65)",
              border: "1px solid rgba(255,255,255,0.12)",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "10px",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BriefHistory — section wrapper with scroll spine + orange fill overlay
// ─────────────────────────────────────────────────────────────────────────────

export function BriefHistory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const firstDotRef = useRef<HTMLDivElement>(null);
  const lastDotRef = useRef<HTMLDivElement>(null);
  const { isRetro } = useRetro();

  // Orange fill grows as the section scrolls
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.15"],
  });
  const spineHeight = useTransform(sectionProgress, [0, 1], ["0%", "100%"]);

  // Measure first/last dot positions to bound the orange fill overlay exactly
  const [spineRange, setSpineRange] = useState({ top: 0, bottom: 0 });

  useEffect(() => {
    const measure = () => {
      if (!timelineRef.current || !firstDotRef.current || !lastDotRef.current) return;
      const wrapperRect = timelineRef.current.getBoundingClientRect();
      const firstRect = firstDotRef.current.getBoundingClientRect();
      const lastRect = lastDotRef.current.getBoundingClientRect();
      const r = firstRect.height / 2; // dot radius
      setSpineRange({
        top: firstRect.top - wrapperRect.top + r,
        bottom: wrapperRect.bottom - lastRect.bottom + r,
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (timelineRef.current) ro.observe(timelineRef.current);
    return () => ro.disconnect();
  }, []);

  const scrimBackground = isRetro
    ? "rgba(3, 8, 12, 0.72)"
    : "rgba(250, 249, 246, 0.58)";

  return (
    <section
      ref={sectionRef}
      id="skillset"
      className="py-24 sm:py-32 lg:py-40 section-glow"
      style={{ background: "transparent", position: "relative" }}
    >
      {/* Scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: scrimBackground, zIndex: 0 }}
      />

      {/* Grid corner markers */}
      <span className="grid-marker" style={{ top: "24px", left: "16px", position: "absolute", zIndex: 1 }}>+</span>
      <span className="grid-marker" style={{ top: "24px", right: "16px", position: "absolute", zIndex: 1 }}>+</span>
      <span className="grid-marker" style={{ bottom: "24px", left: "16px", position: "absolute", zIndex: 1 }}>+</span>
      <span className="grid-marker" style={{ bottom: "24px", right: "16px", position: "absolute", zIndex: 1 }}>+</span>

      {/* All content above the scrim */}
      <div className="relative overflow-x-hidden" style={{ zIndex: 1 }}>

        {/* ── Section header — full-width px-12, matching Hero padding ── */}
        <div className="px-12 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: EASING_SMOOTH }}
            className="block text-xs tracking-widest uppercase mb-4"
            style={{
              color: "var(--color-accent)",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "11px",
            }}
          >
            // My Skillset
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, ease: EASING_SMOOTH }}
            data-neon-header="pink"
            className="font-display font-extrabold mb-4"
            style={{
              fontSize: "clamp(36px, 4vw, 60px)",
              color: "var(--color-text-primary)",
              letterSpacing: "-0.03em",
              marginLeft: "-12px",
            }}
          >
            How I Got Here
          </motion.h2>

          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASING_PREMIUM, delay: 0.1 }}
            className="max-w-2xl"
            style={{
              fontFamily: "var(--font-dm-serif)",
              fontStyle: "italic",
              fontSize: "clamp(20px, 2.5vw, 28px)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.5,
            }}
          >
            &ldquo;I build things because I can&apos;t help it. It&apos;s the
            most honest thing I know how to do.&rdquo;
          </motion.blockquote>
        </div>

        {/* ── Timeline — constrained + centered ── */}
        <div className="mx-auto max-w-6xl px-12">
          <div className="relative mb-24" ref={timelineRef}>

            {/* Orange fill overlay — bounded from first dot center to last dot center */}
            <div
              className="hidden md:block absolute left-1/2 pointer-events-none"
              style={{
                top: spineRange.top,
                bottom: spineRange.bottom,
                width: "6px",
                transform: "translateX(-3px)",
                zIndex: 5,
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: spineHeight,
                  width: "100%",
                  background: "var(--color-accent)",
                  transformOrigin: "top",
                }}
              />
            </div>

            {/* Mobile spine — left edge */}
            <div
              className="md:hidden absolute left-1.5 top-0 bottom-0"
              style={{ background: "var(--color-border)", width: "4px" }}
            >
              <motion.div
                style={{
                  height: spineHeight,
                  width: "100%",
                  background: "var(--color-accent)",
                  transformOrigin: "top",
                }}
              />
            </div>

            <div className="space-y-0">
              {timeline.map((item, i) => (
                <TimelineCard
                  key={item.year + item.org}
                  item={item}
                  index={i}
                  isFirst={i === 0}
                  isLast={i === timeline.length - 1}
                  dotRef={
                    i === 0
                      ? firstDotRef
                      : i === timeline.length - 1
                      ? lastDotRef
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
