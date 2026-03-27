"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { EASING_PREMIUM, EASING_SMOOTH, viewportOnce } from "@/lib/motion";

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
    description: "Raised in Milwaukee with deep roots and a curious mind. Grew up watching my grandfather fish McKinley Pier. Learned early that hard work, integrity, and showing up for people is the foundation everything else is built on.",
    skills: ["Curiosity", "Work Ethic", "Integrity", "Family"],
  },
  {
    year: "2012",
    role: "First Business Launch — Age 18",
    org: "Direct Sales",
    description: "Started my first business straight out of high school. Surrounded myself with mentors, absorbed everything I could, and learned the basics of what it means to build something from nothing — sales, communication, and the discipline it takes to actually execute.",
    skills: ["Sales", "Mentorship", "Entrepreneurship", "Communication"],
  },
  {
    year: "2012–2016",
    role: "Mechanical Engineering",
    org: "Marquette University",
    description: "Systems thinking baked in from day one. Engineering taught me to see the world as a set of forces, tolerances, and constraints — and to design solutions that hold up under pressure. That lens never left.",
    skills: ["Systems Thinking", "Engineering", "Problem Solving", "Technical Design"],
    accent: true,
  },
  {
    year: "2017",
    role: "Co-Founded Margle Media",
    org: "Digital Marketing Agency",
    description: "Built from zero — no clients, no playbook. Scaled to seven figures and served brands like Johnsonville, Frito-Lay, Cousins Subs, Instant Pot, and Stella & Chewy's. The real-world MBA you can't buy.",
    skills: ["Agency Operations", "Business Development", "Client Strategy", "Leadership"],
  },
  {
    year: "2017–2025",
    role: "Running Every Dimension",
    org: "Margle Media",
    description: "Nine years operating every function of a growing agency — sales, ops, finance, HR, client management, production, legal, IT. If a digital agency can ask it of you, I've done it. Built the leadership team, managed the P&L, grew the client roster, and kept the machine running.",
    skills: ["P&L Management", "Operations", "People Management", "Client Management", "Financial Strategy"],
  },
  {
    year: "2024",
    role: "Home Design Educator + Course Creator",
    org: "Foundations of Architecture",
    description: "Spent two years learning architecture to design my dream home — obsessively. Turned that education into FOA, a course for non-architects who want to approach their space with genuine intention. Not an architect. Just someone who learned until it clicked.",
    skills: ["Curriculum Design", "Content Creation", "Architecture", "Teaching"],
  },
  {
    year: "2025–",
    role: "AI Builder + Venture Studio",
    org: "Good at Scale Studio",
    description: "Building AI-native infrastructure and purpose-driven ventures. Autonomous agent systems, AI ops, and a studio built to do good — at scale. The 12×12 challenge: 12 ventures in 12 months.",
    skills: ["AI Systems", "Venture Building", "Agent Infrastructure", "Product Development"],
    accent: true,
  },
];

const skillGroups = [
  { label: "Engineering", skills: ["Systems Architecture", "Mechanical Engineering", "Infrastructure Design", "Technical Operations", "Process Engineering", "Tolerance Analysis"] },
  { label: "Digital Marketing", skills: ["Paid Search (SEM)", "Paid Social", "Organic Social", "Omnichannel Strategy", "Performance Marketing", "Media Planning", "Campaign Management", "Attribution Modeling"] },
  { label: "Operations", skills: ["Business Operations", "Process Development", "Systems Design", "Workflow Automation", "Utilization Reporting", "Capacity Planning", "Vendor Management", "IT Management"] },
  { label: "Finance & Accounting", skills: ["P&L Management", "Financial Forecasting", "Budgeting", "AR/AP", "Cashflow Management", "Margin Reporting", "Invoicing", "Cost Analysis", "Revenue Modeling"] },
  { label: "Client & Account Management", skills: ["Account Management", "Client Strategy", "Client Reporting", "Relationship Management", "QBRs", "Retention Strategy", "Upsell Strategy", "Stakeholder Communication"] },
  { label: "Business Strategy", skills: ["Business Strategy", "Market Analysis", "Competitive Research", "Revenue Strategy", "Business Forecasting", "OKR Frameworks", "Go-to-Market", "Pricing Strategy"] },
  { label: "People & Leadership", skills: ["Direct Reports", "Leadership Team Development", "Performance Management", "HR Management", "Hiring & Onboarding", "Culture Building", "Team Structure", "Compensation Planning"] },
  { label: "AI + Automation", skills: ["LLM Integration", "Agent Systems", "Prompt Engineering", "Autonomous Workflows", "AI Infrastructure", "MCP Protocols", "Agentic Ops"] },
  { label: "Product + Ventures", skills: ["Product Management", "Venture Building", "MVP Development", "Growth Strategy", "Launch Strategy", "Marketplace Design", "SaaS Architecture"] },
  { label: "Design + Architecture", skills: ["Home Design Education", "Spatial Design", "Materiality", "UI/UX Design", "Brand Development", "Visual Identity", "Architectural Principles"] },
];

function TimelineCard({
  item,
  index,
}: {
  item: TimelineEntry;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASING_PREMIUM, delay: 0.05 }}
      className={`relative md:grid md:grid-cols-[1fr_40px_1fr] md:gap-0 ${
        isLeft ? '' : ''
      }`}
    >
      {/* LEFT COLUMN */}
      <div className={`${isLeft ? 'md:pr-8' : 'md:col-start-3 md:pl-8'} ${!isLeft ? 'hidden md:block' : ''}`}>
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

      {/* CENTER SPINE — desktop only */}
      <div className="hidden md:flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full border-2 z-10 shrink-0 mt-1"
          style={{
            background: item.accent ? 'var(--color-accent)' : 'var(--color-base)',
            borderColor: item.accent ? 'var(--color-accent)' : 'var(--color-border)',
          }}
        />
      </div>

      {/* RIGHT COLUMN — placeholder for left items, content for right items */}
      {isLeft && <div className="hidden md:block" />}

      {/* MOBILE LAYOUT */}
      <div className="md:hidden pl-8 relative">
        {/* Timeline dot — mobile */}
        <div
          className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 z-10"
          style={{
            background: item.accent ? 'var(--color-accent)' : 'var(--color-base)',
            borderColor: item.accent ? 'var(--color-accent)' : 'var(--color-border)',
          }}
        />
        <CardContent item={item} lineWidth={lineWidth} align="left" />
      </div>
    </motion.div>
  );
}

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
      className="pb-10 p-4 rounded-sm transition-colors duration-300"
      style={{
        border: `1px solid ${hovered ? 'var(--color-accent)' : 'transparent'}`,
        boxShadow: hovered ? '0 8px 30px rgba(244,99,30,0.12)' : 'none',
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Year badge */}
      <span
        className={`inline-block font-mono text-xs tracking-wide px-2 py-0.5 rounded-sm mb-2 ${
          align === 'right' ? 'md:ml-auto' : ''
        }`}
        style={{
          color: item.accent ? '#fff' : 'var(--color-accent)',
          background: item.accent ? 'var(--color-accent)' : 'var(--color-surface)',
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '10px',
          border: item.accent ? 'none' : '1px solid var(--color-border)',
          display: 'inline-block',
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
          style={{
            width: lineWidth,
            height: '100%',
            background: 'var(--color-accent)',
            opacity: 0.4,
            marginLeft: align === 'right' ? 'auto' : undefined,
          }}
        />
      </div>

      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {item.description}
      </p>

      {/* Skills tags */}
      <div className={`flex flex-wrap gap-1.5 ${align === 'right' ? 'md:justify-end' : ''}`}>
        {item.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-0.5 rounded-sm"
            style={{
              background: 'var(--color-surface)',
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '10px',
              border: '1px solid var(--color-border)',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function BriefHistory() {
  return (
    <section
      id="skillset"
      className="py-24 sm:py-32 lg:py-40 section-glow"
      style={{ background: 'var(--color-base)', position: 'relative' }}
    >
      {/* Grid markers — architectural detail */}
      <span className="grid-marker" style={{ top: '24px', left: '16px' }}>+</span>
      <span className="grid-marker" style={{ top: '24px', right: '16px' }}>+</span>
      <span className="grid-marker" style={{ bottom: '24px', left: '16px' }}>+</span>
      <span className="grid-marker" style={{ bottom: '24px', right: '16px' }}>+</span>
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
            // My Skillset
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

        {/* Timeline — center-aligned alternating */}
        <div className="relative mb-24">
          {/* Vertical spine — desktop (center) */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px"
            style={{ background: 'var(--color-border)' }}
          />
          {/* Vertical spine — mobile (left) */}
          <div
            className="md:hidden absolute left-1.5 top-0 bottom-0 w-px"
            style={{ background: 'var(--color-border)' }}
          />

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <TimelineCard key={item.year + item.org} item={item} index={i} />
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
                transition={{ duration: 0.45, ease: EASING_PREMIUM, delay: i * 0.05 }}
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
