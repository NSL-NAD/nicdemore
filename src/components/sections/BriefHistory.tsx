"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
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
// SpineDot — gray by default, turns orange + pulses when scroll reaches it
// ─────────────────────────────────────────────────────────────────────────────

function SpineDot({
  dotRef,
  threshold,
  sectionProgress,
}: {
  dotRef?: (el: HTMLDivElement | null) => void;
  threshold: number;
  sectionProgress: MotionValue<number>;
}) {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    // Check current value immediately (handles page load mid-scroll)
    if (sectionProgress.get() >= threshold) {
      setActivated(true);
      return;
    }
    const unsubscribe = sectionProgress.on("change", (latest) => {
      if (latest >= threshold) {
        setActivated(true);
        unsubscribe();
      }
    });
    return unsubscribe;
  }, [sectionProgress, threshold]);

  return (
    <motion.div
      ref={dotRef}
      className="w-3 h-3 rounded-full shrink-0"
      animate={
        activated
          ? {
              backgroundColor: "#F4631E",
              boxShadow: [
                "0 0 0 0 rgba(244,99,30,0.65)",
                "0 0 0 12px rgba(244,99,30,0)",
                "0 0 0 0 rgba(244,99,30,0)",
              ],
            }
          : {
              backgroundColor: "rgba(160,155,148,0.45)",
              boxShadow: "0 0 0 0 rgba(244,99,30,0)",
            }
      }
      transition={
        activated
          ? {
              backgroundColor: { duration: 0.4, ease: "easeOut" },
              boxShadow: { duration: 1.0, delay: 0.3 },
            }
          : { duration: 0.3 }
      }
      style={{ zIndex: 10, position: "relative" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ParallaxCard — mouse-tracked 3D tilt + glare overlay (subtle, 4° max)
// ─────────────────────────────────────────────────────────────────────────────

function ParallaxCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const TILT = 4; // reduced from 10 — subtle, premium feel
  const SPRING = { stiffness: 180, damping: 22, mass: 0.5 };

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const rotateX = useSpring(rawY, SPRING);
  const rotateY = useSpring(rawX, SPRING);
  const scale = useSpring(1, SPRING);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top) / rect.height;
    const nx = (cx - 0.5) * 2;
    const ny = (cy - 0.5) * 2;
    rawX.set(nx * TILT);
    rawY.set(-ny * TILT);
    glareX.set(cx * 100);
    glareY.set(cy * 100);
    glareOpacity.set(0.15);
  }, [rawX, rawY, glareX, glareY, glareOpacity]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    scale.set(1);
    glareOpacity.set(0);
  }, [rawX, rawY, scale, glareOpacity]);

  const handleMouseEnter = useCallback(() => {
    scale.set(1.012);
  }, [scale]);

  const glareBackground = useTransform(
    [glareX, glareY] as MotionValue<number>[],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.5) 0%, transparent 65%)`
  );

  return (
    <div style={{ perspective: "800px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d", position: "relative" }}
      >
        {children}
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
        borderRadius: "16px",
        boxShadow: hovered
          ? "0 16px 48px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)"
          : "0 2px 12px rgba(0,0,0,0.15)",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
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

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-4 text-left"
        style={{ color: "rgba(255,255,255,0.70)" }}
      >
        {item.description}
      </p>

      {/* Skills tags — orange glow on hover */}
      <div className="flex flex-wrap gap-1.5">
        {item.skills.map((skill) => (
          <motion.span
            key={skill}
            className="text-xs px-2 py-0.5 rounded-sm cursor-default"
            style={{
              background: "rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.82)",
              border: "1px solid rgba(255,255,255,0.22)",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "10px",
            }}
            whileHover={{
              y: -2,
              backgroundColor: "rgba(244,99,30,0.18)",
              color: "#F4631E",
              borderColor: "rgba(244,99,30,0.45)",
              boxShadow: "0 0 10px rgba(244,99,30,0.22)",
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TimelineCard — cinematic 3D entrance: slides from off-screen + clockwise fall
// ─────────────────────────────────────────────────────────────────────────────

function TimelineCard({
  item,
  index,
  isFirst,
  isLast,
  setDotRef,
  dotThreshold,
  sectionProgress,
}: {
  item: TimelineEntry;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  setDotRef: (el: HTMLDivElement | null) => void;
  dotThreshold: number;
  sectionProgress: MotionValue<number>;
}) {
  // ref lives on the static grid row — used for scroll tracking + IntersectionObserver
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  // Watch the grid ROW (not the off-screen card) to trigger card entrance
  const rowInView = useInView(ref, { once: true, amount: 0.3 });

  // Scroll progress for the animated accent line inside the card
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const hiddenLeft = { opacity: 0, x: "-120vw", y: 40, z: -80, rotateY: -16, rotateZ: -45, filter: "blur(14px)" };
  const hiddenRight = { opacity: 0, x: "120vw", y: 40, z: -80, rotateY: 16, rotateZ: 45, filter: "blur(14px)" };
  const visible = { opacity: 1, x: 0, y: 0, z: 0, rotateY: 0, rotateZ: 0, filter: "blur(0px)" };

  const entranceTransition = {
    duration: 2.2,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    delay: 0.08,
    filter: { duration: 1.8, delay: 0.08 },
  };

  return (
    // Static grid row — spine stays put, only card content animates in
    <div
      ref={ref}
      className="relative md:grid md:grid-cols-[1fr_40px_1fr] md:gap-0"
    >
      {/* COL 1 — left card (even rows) or empty spacer (odd rows) */}
      <div className="hidden md:block md:pr-8">
        {isLeft && (
          <div style={{ perspective: "1000px" }}>
            <motion.div
              initial={hiddenLeft}
              animate={rowInView ? visible : hiddenLeft}
              transition={entranceTransition}
              style={{ transformStyle: "preserve-3d" }}
            >
              <ParallaxCard>
                <CardContent item={item} lineWidth={lineWidth} align="right" />
              </ParallaxCard>
            </motion.div>
          </div>
        )}
      </div>

      {/* COL 2 — CENTER SPINE: always visible, static */}
      <div className="hidden md:flex flex-col items-center md:col-start-2 h-full">
        {/* Top connector — transparent for first card */}
        <div
          className="w-[2.25px] shrink-0"
          style={{
            height: "4px",
            background: isFirst ? "transparent" : "var(--color-border)",
          }}
        />

        <SpineDot
          dotRef={setDotRef}
          threshold={dotThreshold}
          sectionProgress={sectionProgress}
        />

        {/* Bottom connector — transparent for last card */}
        <div
          className="w-[2.25px] flex-1"
          style={{
            background: isLast ? "transparent" : "var(--color-border)",
            minHeight: 0,
          }}
        />
      </div>

      {/* COL 3 — right card (odd rows) or empty spacer (even rows) */}
      <div className="hidden md:block md:col-start-3 md:pl-8">
        {!isLeft && (
          <div style={{ perspective: "1000px" }}>
            <motion.div
              initial={hiddenRight}
              animate={rowInView ? visible : hiddenRight}
              transition={entranceTransition}
              style={{ transformStyle: "preserve-3d" }}
            >
              <ParallaxCard>
                <CardContent item={item} lineWidth={lineWidth} align="left" />
              </ParallaxCard>
            </motion.div>
          </div>
        )}
      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden pl-8 relative">
        <div className="absolute left-0 top-1.5">
          <SpineDot
            dotRef={undefined}
            threshold={dotThreshold}
            sectionProgress={sectionProgress}
          />
        </div>
        <CardContent item={item} lineWidth={lineWidth} align="left" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BriefHistory — section wrapper with scroll spine + orange fill overlay
// ─────────────────────────────────────────────────────────────────────────────

export function BriefHistory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { isRetro } = useRetro();

  // All dot elements — measured to compute activation thresholds
  const dotEls = useRef<(HTMLDivElement | null)[]>(
    new Array(timeline.length).fill(null)
  );
  const [dotThresholds, setDotThresholds] = useState<number[]>(
    new Array(timeline.length).fill(0)
  );

  // Orange fill grows as the timeline scrolls — track timelineRef so progress
  // maps 1:1 to layout position of each dot (d / timelineHeight when dot is at center)
  const { scrollYProgress: sectionProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.5", "end 0.5"],
  });
  const spineHeight = useTransform(sectionProgress, [0, 1], ["0%", "100%"]);

  // Header reveal — measured directly from scrollY so the range is exact
  const { scrollY } = useScroll();
  const [sectionTop, setSectionTop] = useState(9999);
  useEffect(() => {
    const measure = () => {
      if (!sectionRef.current) return;
      setSectionTop(sectionRef.current.getBoundingClientRect().top + window.scrollY);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const headerY = useTransform(scrollY, (scrollVal) => {
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const start = sectionTop - vh;       // section top at viewport bottom
    const end = sectionTop - vh * 0.1;   // section top at 10% from viewport top
    if (end <= start) return 0;
    const progress = Math.max(0, Math.min(1, (scrollVal - start) / (end - start)));
    return -200 * (1 - progress);
  });

  // Spine range — initialized to 9999 so orange overlay is hidden until measured
  const [spineRange, setSpineRange] = useState({ top: 9999, bottom: 0 });

  useEffect(() => {
    const measure = () => {
      const firstDot = dotEls.current[0];
      const lastDot = dotEls.current[timeline.length - 1];
      if (!timelineRef.current || !firstDot || !lastDot) return;

      const wrapperRect = timelineRef.current.getBoundingClientRect();
      const firstRect = firstDot.getBoundingClientRect();
      const lastRect = lastDot.getBoundingClientRect();
      const r = firstRect.height / 2;

      const spineStart = firstRect.top - wrapperRect.top + r;
      const spineEnd = wrapperRect.bottom - lastRect.bottom + r;
      const spineTotal = wrapperRect.height - spineEnd - spineStart;

      setSpineRange({ top: spineStart, bottom: spineEnd });

      // Compute fractional position of each dot within the timeline height.
      // With offset ["start 0.5", "end 0.5"], sectionProgress = d / timelineHeight
      // when the item at offset d from timeline top is at viewport center.
      // So threshold = dotCenter / wrapperRect.height gives a perfect 1:1 match.
      const thresholds = dotEls.current.map((dotEl) => {
        if (!dotEl) return 0;
        const dotRect = dotEl.getBoundingClientRect();
        const dotCenter = dotRect.top - wrapperRect.top + r;
        return Math.max(0, Math.min(1, dotCenter / wrapperRect.height));
      });
      setDotThresholds(thresholds);
    };

    // Small delay to let layout stabilize after first render
    const timer = setTimeout(measure, 80);
    const ro = new ResizeObserver(measure);
    if (timelineRef.current) ro.observe(timelineRef.current);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, []);

  const scrimBackground = isRetro
    ? "rgba(3, 8, 12, 0.72)"
    : "rgba(250, 249, 246, 0.58)";

  return (
    <section
      ref={sectionRef}
      id="skillset"
      className="pt-24 sm:pt-32 lg:pt-40 pb-12 section-glow"
      style={{ background: "transparent", position: "relative", zIndex: 1 }}
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

      {/* ── Section header — outside overflow-x-hidden so Y transform isn't clipped ── */}
      <motion.div className="relative px-12 mb-8" style={{ y: headerY, zIndex: 1 }}>
          <motion.span
            className="block text-xs tracking-widest uppercase mb-4"
            style={{
              color: "var(--color-accent)",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "11px",
            }}
          >
            // My Journey
          </motion.span>

          <motion.h2
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
      </motion.div>

      {/* All remaining content — zIndex:3 ensures this always paints above the GPU-composited header motion.div */}
      {/* overflow-x:clip (not hidden) prevents horizontal scrollbar without creating a BFC or clipping overflow-y */}
      <div className="relative pt-4" style={{ overflowX: 'clip', zIndex: 3 }}>

        {/* ── Timeline — constrained + centered ── */}
        <div className="mx-auto max-w-6xl px-12">
          <div className="relative mb-8" ref={timelineRef}>

            {/* Orange fill overlay — bounded from first dot center to last dot center */}
            <div
              className="hidden md:block absolute left-1/2 pointer-events-none"
              style={{
                top: spineRange.top,
                bottom: spineRange.bottom,
                width: "2.25px",
                transform: "translateX(-1.125px)",
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
                  setDotRef={(el) => { dotEls.current[i] = el; }}
                  dotThreshold={dotThresholds[i]}
                  sectionProgress={sectionProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
