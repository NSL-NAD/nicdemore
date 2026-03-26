"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASING_PREMIUM, EASING_SMOOTH, viewportOnce } from "@/lib/motion";

const timeline = [
  {
    year: "2012–2016",
    role: "Mechanical Engineering",
    org: "Marquette University",
    description: "Systems thinking baked in from day one. Engineering taught me to see the world as a set of forces, tolerances, and constraints. That lens never left.",
    accent: true,
  },
  {
    year: "2017",
    role: "Co-Founded Margle Media",
    org: "Digital Marketing Agency",
    description: "Built from zero — no clients, no playbook. Scaled to seven figures and served brands like Johnsonville, Frito-Lay, Cousins Subs, and Instant Pot.",
    accent: false,
  },
  {
    year: "2017–2025",
    role: "Digital Strategy at Scale",
    org: "Margle Media",
    description: "Nine years of learning how organizations actually work — ops, people, client pressure, strategy. The real MBA. Every dimension of a running business.",
    accent: false,
  },
  {
    year: "2024",
    role: "Home Design Educator + Course Creator",
    org: "Foundations of Architecture",
    description: "Spent two years learning architecture to design my dream home. Turned that obsession into FOA — a course for non-architects who want to design theirs.",
    accent: false,
  },
  {
    year: "2025–",
    role: "AI Builder + Venture Studio",
    org: "Good at Scale Studio",
    description: "Building AI-native infrastructure and purpose-driven ventures. Autonomous agent systems, venture operations, and the future of how one-person studios operate at scale.",
    accent: true,
  },
];

const skillGroups = [
  {
    label: "Engineering",
    skills: ["Systems Architecture", "Mechanical Engineering", "Infrastructure Design", "Technical Ops"],
  },
  {
    label: "Digital Marketing",
    skills: ["Paid Search", "Paid Social", "Organic Growth", "Omnichannel Strategy"],
  },
  {
    label: "AI + Automation",
    skills: ["LLM Integration", "Agent Systems", "Prompt Engineering", "Autonomous Workflows"],
  },
  {
    label: "Product + Ventures",
    skills: ["Product Management", "Venture Building", "Growth Strategy", "Operations"],
  },
  {
    label: "Design + Architecture",
    skills: ["Home Design Education", "Spatial Design", "UI/UX", "Brand Development"],
  },
];

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timeline)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASING_PREMIUM, delay: index * 0.05 }}
      className="relative pl-8 md:pl-0 md:grid md:grid-cols-[160px_1fr] md:gap-10 group"
    >
      {/* Timeline dot — mobile */}
      <div
        className="md:hidden absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 z-10"
        style={{
          background: item.accent ? 'var(--color-accent)' : 'var(--color-base)',
          borderColor: item.accent ? 'var(--color-accent)' : 'var(--color-border)',
        }}
      />

      {/* Year — desktop */}
      <div className="hidden md:flex flex-col items-end pt-1">
        <span
          className="font-mono text-xs tracking-wide"
          style={{
            color: item.accent ? 'var(--color-accent)' : 'var(--color-text-light)',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '11px',
          }}
        >
          {item.year}
        </span>
      </div>

      {/* Content */}
      <div className="pb-10">
        {/* Year — mobile */}
        <span
          className="md:hidden font-mono text-xs tracking-wide block mb-1"
          style={{
            color: 'var(--color-accent)',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '10px',
          }}
        >
          {item.year}
        </span>

        <h3
          className="font-display font-bold text-xl mb-0.5"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {item.role}
        </h3>
        <p
          className="text-sm mb-3 font-medium"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '11px' }}
        >
          {item.org}
        </p>

        {/* Animated line */}
        <div
          className="h-px mb-3 overflow-hidden"
          style={{ background: 'var(--color-border-subtle)' }}
        >
          <motion.div
            style={{ width: lineWidth, height: '100%', background: 'var(--color-accent)', opacity: 0.4 }}
          />
        </div>

        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export function BriefHistory() {
  return (
    <section
      id="skillset"
      className="py-24 sm:py-32 lg:py-40"
      style={{ background: 'var(--color-base)' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: EASING_SMOOTH }}
            className="block text-xs tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '11px' }}
          >
            02 / My Skillset
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, ease: EASING_SMOOTH }}
            data-neon-header="pink"
            className="font-display font-bold mb-4"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
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
              fontFamily: 'var(--font-dm-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5,
            }}
          >
            &ldquo;I build things because I can&apos;t help it. It&apos;s the most honest thing I know how to do.&rdquo;
          </motion.blockquote>
        </div>

        {/* Timeline */}
        <div className="relative mb-24">
          {/* Vertical rail — desktop only */}
          <div
            className="hidden md:block absolute left-[160px] top-0 bottom-0 w-px"
            style={{ background: 'var(--color-border)', marginLeft: '20px' }}
          />
          {/* Vertical rail — mobile */}
          <div
            className="md:hidden absolute left-1.5 top-0 bottom-0 w-px"
            style={{ background: 'var(--color-border)' }}
          />

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <TimelineItem key={item.year + item.org} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Skills grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASING_PREMIUM }}
        >
          <div className="flex items-center gap-4 mb-8">
            <h3
              className="font-display font-semibold text-lg"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Skill Areas
            </h3>
            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.45, ease: EASING_PREMIUM, delay: i * 0.07 }}
                className="p-5 rounded-sm"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <div
                  className="text-xs font-medium tracking-widest uppercase mb-3"
                  style={{
                    color: 'var(--color-accent)',
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                  }}
                >
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded-sm"
                      style={{
                        background: 'var(--color-base)',
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'var(--font-jetbrains)',
                        fontSize: '11px',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
