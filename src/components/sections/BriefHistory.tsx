"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { EASING_PREMIUM, EASING_SMOOTH, LAND_EASE, viewportOnce } from "@/lib/motion";
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
// TimelineCard — cinematic 3D entrance + dot pulse
// ─────────────────────────────────────────────────────────────────────────────

function TimelineCard({
  item,
  index,
}: {
  item: TimelineEntry;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  // Scroll progress used for the animated line inside the card
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    // Perspective container — required for translateZ to create real depth
    <div style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}>
      <motion.div
        ref={ref}
        // 3D cinematic entrance — modeled on hero drop3D pattern
        initial={{
          opacity: 0,
          x: isLeft ? -160 : 160,
          z: 300,
          rotateY: isLeft ? -12 : 12,
          filter: "blur(6px)",
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          z: 0,
          rotateY: 0,
          filter: "blur(0px)",
        }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.9,
          ease: LAND_EASE,
          delay: 0.05,
          // Blur clears before position fully settles — simulates focus pull
          filter: {
            duration: 0.9 * 0.7,
            delay: 0.05 + 0.9 * 0.1,
          },
        }}
        // REQUIRED: preserve-3d must be on every element in the chain
        // between the perspective container and animated child.
        // Without this, Z-axis silently falls back to flat 2D.
        style={{ transformStyle: "preserve-3d" }}
        className="relative md:grid md:grid-cols-[1fr_40px_1fr] md:gap-0"
      >
        {/* LEFT COLUMN — desktop only */}
        <div
          className={`hidden md:block ${
            isLeft ? "md:pr-8" : "md:col-start-3 md:pl-8"
          }`}
        >
          {isLeft && (
            <div className="md:text-right">
              <CardContent item={item} lineWidth={lineWidth} align="right" />
            </div>
          )}
          {!isLeft && (
            <div>
              <CardContent item={item} lineWidth={lineWidth} align="left" />
            </div>
          )}
        </div>

        {/* CENTER SPINE DOT — desktop only */}
        <div className="hidden md:flex flex-col items-center md:col-start-2">
          <motion.div
            className="w-3 h-3 rounded-full z-10 shrink-0 mt-1"
            style={{ background: "var(--color-accent)" }}
            initial={{ scale: 1, boxShadow: '0 0 0px 0px rgba(244,99,30,0)' }}
            whileInView={{
              scale: [1, 1.8, 1],
              boxShadow: [
                '0 0 0 0 rgba(244,99,30,0)',
                '0 0 0 8px rgba(244,99,30,0.4)',
                '0 0 0 0 rgba(244,99,30,0)',
              ],
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.9 }}
          />
        </div>

        {/* RIGHT COLUMN — empty placeholder for left-side cards */}
        {isLeft && <div className="hidden md:block" />}

        {/* MOBILE LAYOUT */}
        <div className="md:hidden pl-8 relative">
          {/* Dot — mobile */}
          <motion.div
            className="absolute left-0 top-1.5 w-3 h-3 rounded-full z-10"
            style={{ background: "var(--color-accent)" }}
            initial={{ scale: 1, boxShadow: '0 0 0px 0px rgba(244,99,30,0)' }}
            whileInView={{
              scale: [1, 1.8, 1],
              boxShadow: [
                '0 0 0 0 rgba(244,99,30,0)',
                '0 0 0 8px rgba(244,99,30,0.4)',
                '0 0 0 0 rgba(244,99,30,0)',
              ],
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.9 }}
          />
          <CardContent item={item} lineWidth={lineWidth} align="left" />
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CardContent — frosted glass + premium hover treatment
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
  const { isRetro } = useRetro();
  const hoverBorderColor = isRetro ? "var(--retro-cyan)" : "var(--color-accent)";

  return (
    <motion.div
      className="pb-10 p-3 sm:p-4 max-w-[calc(100vw-2rem)]"
      style={{
        // Always show a subtle border; elevate on hover with solid + glow
        border: `1px solid ${hovered ? hoverBorderColor : "var(--color-border)"}`,
        // Frosted glass — inline to bypass any CSS class conflicts
        backdropFilter: 'blur(12px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
        background: hovered
          ? isRetro
            ? "rgba(0, 20, 30, 0.85)"
            : "rgba(250, 249, 246, 0.85)"
          : isRetro
          ? "rgba(0, 20, 30, 0.6)"
          : "rgba(250, 249, 246, 0.75)",
        borderRadius: "4px",
      }}
      animate={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)' }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Year badge */}
      <span
        className={`inline-block font-mono text-xs tracking-wide px-2 py-0.5 rounded-sm mb-2 ${
          align === "right" ? "md:ml-auto" : ""
        }`}
        style={{
          color: item.accent ? "#fff" : "var(--color-accent)",
          background: item.accent ? "var(--color-accent)" : "var(--color-surface)",
          fontFamily: "var(--font-jetbrains)",
          fontSize: "10px",
          border: item.accent ? "none" : "1px solid var(--color-border)",
          display: "inline-block",
        }}
      >
        {item.year}
      </span>

      <h3
        className="font-display font-bold text-xl mb-0.5"
        style={{ color: "var(--color-text-primary)" }}
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
        style={{ color: "var(--color-text-secondary)" }}
      >
        {item.description}
      </p>

      {/* Skills tags — always left-aligned */}
      <div className="flex flex-wrap gap-1.5">
        {item.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-0.5 rounded-sm"
            style={{
              background: "var(--color-surface)",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "10px",
              border: "1px solid var(--color-border)",
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
// BriefHistory — section wrapper with transparent background + scroll spine
// ─────────────────────────────────────────────────────────────────────────────

export function BriefHistory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isRetro } = useRetro();

  // Section-level scroll progress for the spine fill
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.1"],
  });
  const spineHeight = useTransform(sectionProgress, [0, 1], ["0%", "100%"]);

  // Scrim adapts to retro dark mode vs. light mode
  const scrimBackground = isRetro
    ? "rgba(3, 8, 12, 0.72)"
    : "rgba(250, 249, 246, 0.58)";

  return (
    <section
      ref={sectionRef}
      id="skillset"
      className="py-24 sm:py-32 lg:py-40 section-glow"
      style={{
        // Transparent so GlowingGrid shows through from fixed canvas in layout.tsx
        background: "transparent",
        position: "relative",
      }}
    >
      {/* Scrim — semi-transparent overlay for readability over the grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: scrimBackground, zIndex: 0 }}
      />

      {/* Grid corner markers — above scrim */}
      <span
        className="grid-marker"
        style={{ top: "24px", left: "16px", position: "absolute", zIndex: 1 }}
      >
        +
      </span>
      <span
        className="grid-marker"
        style={{ top: "24px", right: "16px", position: "absolute", zIndex: 1 }}
      >
        +
      </span>
      <span
        className="grid-marker"
        style={{ bottom: "24px", left: "16px", position: "absolute", zIndex: 1 }}
      >
        +
      </span>
      <span
        className="grid-marker"
        style={{ bottom: "24px", right: "16px", position: "absolute", zIndex: 1 }}
      >
        +
      </span>

      {/* All content above the scrim */}
      <div className="relative overflow-x-hidden" style={{ zIndex: 1 }}>
        <div className="mx-auto max-w-6xl px-6">
          {/* Section header */}
          <div className="mb-16">
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

          {/* Timeline — alternating left/right cards */}
          <div className="relative mb-24">
            {/* Desktop spine — center, scroll-driven orange fill */}
            <div
              className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px"
              style={{ background: "var(--color-border)" }}
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

            {/* Mobile spine — left edge, scroll-driven orange fill */}
            <div
              className="md:hidden absolute left-1.5 top-0 bottom-0"
              style={{ background: "var(--color-border)", width: "2px" }}
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
                <TimelineCard key={item.year + item.org} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
