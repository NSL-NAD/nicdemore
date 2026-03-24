"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ease, fadeInUp, viewportOnce } from "@/lib/motion";
import { SectionReveal } from "@/components/SectionReveal";
import { useParams } from "next/navigation";
import { useRef } from "react";

/* ─── Data ────────────────────────────────────────────────────────── */

const coverLetters: Record<string, string> = {
  anthropic:
    "I\u2019m building AI-native infrastructure for a portfolio of ventures \u2014 using Claude as the backbone of an agentic system I designed and operate daily. I\u2019m not just using AI; I\u2019m building with it at the systems level. That\u2019s the work I want to do more of, at scale, with people who are shaping where this goes.",
  apple:
    "I build things that are complete \u2014 not just functional. From the agency I co-founded to the venture infrastructure I\u2019m building today, the bar has always been: does this feel right? Apple\u2019s standard for that is the one I grew up with. I\u2019d like to bring that same standard to what you\u2019re building next.",
};

interface TimelineEntry {
  side: "right" | "left";
  role: string;
  company: string;
  date: string;
  bullets: string[];
}

const timeline: TimelineEntry[] = [
  {
    side: "right",
    role: "Co-Founder, President & COO",
    company: "Margle Media",
    date: "Feb 2017 \u2013 Present",
    bullets: [
      "Full-service digital marketing agency",
      "Clients: Cousins Subs, Johnsonville, Frito-Lay, Instant Pot",
      "Built from zero across strategy, media, content, management",
    ],
  },
  {
    side: "left",
    role: "Mechanical Engineering",
    company: "Marquette University",
    date: "2012 \u2013 2016",
    bullets: [
      "Engineering degree",
      "Systems thinking that underlies everything since",
    ],
  },
  {
    side: "right",
    role: "Founder",
    company: "Good at Scale Studio",
    date: "2025 \u2013 Present",
    bullets: [
      "AI-native venture studio",
      "Building purposeful ventures powered by automation and agentic AI systems",
    ],
  },
  {
    side: "left",
    role: "Course Creator",
    company: "Foundations of Architecture",
    date: "2025 \u2013 Present",
    bullets: [
      "Self-educated through designing a personal dream home",
      "Built a course for aspiring homeowners",
      "Live at foacourse.com",
    ],
  },
  {
    side: "right",
    role: "Building",
    company: "Giveable",
    date: "2026 \u2013 Present",
    bullets: [
      "Curated marketplace for impact-driven brands",
      "The registry platform where every gift creates measurable good",
    ],
  },
];

const skills = [
  "Company Building",
  "Digital Marketing",
  "AI & Automation",
  "Venture Design",
  "Systems Thinking",
  "Product Development",
];

/* ─── Timeline Card ───────────────────────────────────────────────── */

function TimelineCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isRight = entry.side === "right";

  return (
    <div
      ref={ref}
      className={`relative grid grid-cols-[24px_1fr] md:grid-cols-[1fr_24px_1fr] gap-4 md:gap-8 ${
        index !== timeline.length - 1 ? "pb-12 md:pb-16" : ""
      }`}
    >
      {/* Left column — card or empty */}
      <div className="hidden md:block">
        {!isRight && (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.6, ease }}
            className="bg-surface rounded-lg p-6 sm:p-8 border border-line"
          >
            <CardContent entry={entry} />
          </motion.div>
        )}
      </div>

      {/* Center dot */}
      <div className="flex justify-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.2 }}
          className="w-3 h-3 rounded-full bg-accent mt-2 ring-4 ring-background"
        />
      </div>

      {/* Right column — card or empty on desktop / always card on mobile */}
      <div>
        {/* Desktop: only show if right-side entry */}
        {isRight && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.6, ease }}
            className="hidden md:block bg-surface rounded-lg p-6 sm:p-8 border border-line"
          >
            <CardContent entry={entry} />
          </motion.div>
        )}

        {/* Mobile: always show card on the right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.6, ease }}
          className="md:hidden bg-surface rounded-lg p-6 sm:p-8 border border-line"
        >
          <CardContent entry={entry} />
        </motion.div>

        {/* Desktop: empty spacer for left-side entries */}
        {!isRight && <div className="hidden md:block" />}
      </div>
    </div>
  );
}

function CardContent({ entry }: { entry: TimelineEntry }) {
  return (
    <>
      <h3 className="font-display text-xl font-semibold text-ink">
        {entry.role}
      </h3>
      <p className="text-accent font-mono text-sm mt-1">{entry.company}</p>
      <p className="font-mono text-xs text-ink-muted mt-1">{entry.date}</p>
      <ul className="mt-4 space-y-2">
        {entry.bullets.map((bullet) => (
          <li
            key={bullet}
            className="text-sm text-ink-muted flex items-start gap-2"
          >
            <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-accent/40 shrink-0" />
            {bullet}
          </li>
        ))}
      </ul>
    </>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */

export default function ResumePage() {
  const params = useParams<{ company?: string[] }>();
  const companySlug = params.company?.[0]?.toLowerCase();
  const coverLetter = companySlug ? coverLetters[companySlug] : null;

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionReveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
              Resum&eacute;
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-tight">
              Nic DeMore
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="mt-4 text-lg text-ink-muted max-w-xl mx-auto">
              Founder. Operator. Builder. Based in Milwaukee.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Cover Letter (conditional) */}
      {coverLetter && (
        <section className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-3xl px-6">
            <SectionReveal>
              <div className="bg-accent-light/30 rounded-lg p-8 sm:p-10">
                <p className="font-display text-lg sm:text-xl leading-relaxed text-ink italic">
                  &ldquo;{coverLetter}&rdquo;
                </p>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* Timeline */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionReveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-12 text-center">
              Timeline
            </p>
          </SectionReveal>

          <div ref={timelineRef} className="relative">
            {/* Animated vertical line */}
            <motion.div
              style={{ scaleY: lineScaleY, transformOrigin: "top" }}
              className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-accent"
            />

            {/* Static track (subtle, behind the animated line) */}
            <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-line" />

            {/* Cards */}
            {timeline.map((entry, i) => (
              <TimelineCard key={entry.company} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="border-y border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <SectionReveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-10 text-center">
              Skills &amp; Expertise
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-surface rounded-lg p-4 text-center border border-transparent hover:border-line transition-colors"
                >
                  <span className="font-mono text-sm text-ink">{skill}</span>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionReveal>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink">
              Let&apos;s talk.
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="mt-4 text-lg text-ink-muted">
              Looking for what&apos;s next. Open to the right opportunity.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <a
              href="mailto:nic@nicdemore.com"
              className="inline-flex items-center mt-8 px-8 py-3 bg-accent text-white text-sm font-medium rounded-md hover:bg-ink transition-colors"
            >
              Get in Touch
            </a>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
