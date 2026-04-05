"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASING_PREMIUM, viewportOnce } from "@/lib/motion";

const skillGroups = [
  {
    label: "Engineering",
    icon: "wrench",
    skills: ["Systems Architecture", "Mechanical Engineering", "Infrastructure Design", "Process Engineering", "Rapid Prototyping", "Technical Documentation"],
  },
  {
    label: "Digital Marketing",
    icon: "trending",
    skills: ["Paid Search / SEM", "Paid Social", "Omnichannel Strategy", "Performance Marketing", "Creative Strategy", "Attribution Modeling", "Analytics & Reporting"],
  },
  {
    label: "Operations",
    icon: "sliders",
    skills: ["Business Operations", "Process Development", "Workflow Automation", "Capacity Planning", "Vendor Management", "SOP Development", "KPI Tracking"],
  },
  {
    label: "Finance",
    icon: "bar-chart",
    skills: ["P&L Management", "Financial Forecasting", "Cashflow Management", "Revenue Modeling", "AR/AP Management", "Budget Management", "Utilization Reporting"],
  },
  {
    label: "Client Management",
    icon: "users",
    skills: ["Account Management", "Client Strategy", "Retention Strategy", "Stakeholder Communication", "Relationship Building", "Contract Negotiation", "Upsell Strategy"],
  },
  {
    label: "Business Strategy",
    icon: "target",
    skills: ["Go-to-Market", "Competitive Research", "Revenue Strategy", "OKR Frameworks", "Market Analysis", "Pricing Strategy", "Partnership Development"],
  },
  {
    label: "People & Leadership",
    icon: "crown",
    skills: ["Direct Reports", "Leadership Development", "Hiring & Onboarding", "Culture Building", "Performance Management", "Compensation Design"],
  },
  {
    label: "AI + Automation",
    icon: "cpu",
    skills: ["LLM Integration", "Agent Systems", "Prompt Engineering", "Autonomous Workflows", "RAG Systems", "Agentic Workflows", "AI Product Design"],
  },
  {
    label: "Product + Ventures",
    icon: "rocket",
    skills: ["Product Management", "Venture Building", "MVP Development", "Growth Strategy", "User Research", "Roadmap Planning", "Monetization Strategy"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Icon — clean stroke SVGs, 24×24 viewBox
// ─────────────────────────────────────────────────────────────────────────────
function Icon({ name, size = 36 }: { name: string; size?: number }) {
  const shared = {
    width: size,
    height: size,
    viewBox: "0 0 24 24" as const,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "wrench":
      return (
        <svg {...shared}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "trending":
      return (
        <svg {...shared}>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      );
    case "sliders":
      return (
        <svg {...shared}>
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      );
    case "bar-chart":
      return (
        <svg {...shared}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      );
    case "users":
      return (
        <svg {...shared}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "target":
      return (
        <svg {...shared}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "crown":
      return (
        <svg {...shared}>
          <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
        </svg>
      );
    case "cpu":
      return (
        <svg {...shared}>
          <rect x="9" y="9" width="6" height="6" />
          <path d="M15 9V7a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2" />
          <path d="M15 15v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2" />
          <path d="M9 15H7a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2" />
          <path d="M15 9h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...shared}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m3.96 17.17 4.87-4.87" />
          <path d="M17.5 2.5s4 4 2 12l-10-10c8-2 12 2 12 2z" />
          <circle cx="14.5" cy="9.5" r="1.5" />
        </svg>
      );
    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SkillTagBack — matches BriefHistory card tag style + hover, adapted for light bg
// ─────────────────────────────────────────────────────────────────────────────
function SkillTagBack({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05, duration: 0.2 } }}
      whileHover={{
        y: -2,
        backgroundColor: "rgba(244,99,30,0.18)",
        color: "#F4631E",
        borderColor: "rgba(244,99,30,0.45)",
        boxShadow: "0 0 10px rgba(244,99,30,0.22)",
        transition: { duration: 0.15, delay: 0 },
      }}
      style={{
        display: "inline-block",
        fontFamily: "var(--font-jetbrains)",
        fontSize: "10px",
        letterSpacing: "0.04em",
        color: "rgba(0,0,0,0.55)",
        padding: "3px 8px",
        border: "1px solid rgba(0,0,0,0.14)",
        borderRadius: "4px",
        background: "rgba(0,0,0,0.05)",
        cursor: "default",
        whiteSpace: "nowrap" as const,
      }}
    >
      {skill}
    </motion.span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FlipCard — forest green front + neutral back, 16px radius, smooth flip
// ─────────────────────────────────────────────────────────────────────────────
function FlipCard({ group, index }: { group: typeof skillGroups[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className="cursor-pointer"
      style={{ perspective: "1200px", height: "360px" }}
      whileHover={{ y: -6 }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.82s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* ── FRONT — deep forest green, icon + display label + skill count ── */}
        <div
          className="retro-card"
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "var(--color-forest)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.54), 0 16px 48px rgba(0,0,0,0.42)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            padding: "28px 20px",
          }}
        >
          {/* Icon — orange tint */}
          <div style={{ color: "rgba(244,99,30,0.88)" }}>
            <Icon name={group.icon} size={38} />
          </div>

          {/* Category label — large display font */}
          <span
            className="font-display font-bold"
            style={{
              fontSize: "clamp(15px, 1.8vw, 21px)",
              color: "rgba(255,255,255,0.95)",
              textAlign: "center",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {group.label}
          </span>

          {/* Skill count badge */}
          <span
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "9px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              padding: "3px 10px",
              border: "1px solid rgba(244,99,30,0.4)",
              borderRadius: "4px",
              background: "rgba(244,99,30,0.08)",
            }}
          >
            {group.skills.length} skills
          </span>
        </div>

        {/* ── BACK — neutral/cream, prominent orange header + BriefHistory-style tags ── */}
        <div
          className="retro-card"
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(250,249,246,0.98)",
            border: "1px solid rgba(244,99,30,0.28)",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.54), 0 16px 48px rgba(0,0,0,0.42)",
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "14px",
            height: "100%",
          }}
        >
          {/* Category header — large, orange, display font */}
          <div>
            <span
              className="font-display font-extrabold"
              style={{
                fontSize: "clamp(17px, 2vw, 22px)",
                color: "var(--color-accent)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                display: "block",
              }}
            >
              {group.label}
            </span>
            {/* Accent rule */}
            <div
              style={{
                height: "2px",
                width: "28px",
                background: "var(--color-accent)",
                borderRadius: "2px",
                marginTop: "8px",
                opacity: 0.5,
              }}
            />
          </div>

          {/* Spacer — pushes tags to bottom of card */}
          <div style={{ flex: 1 }} />

          {/* Skill tags — pinned to bottom, remount on flip to re-fire stagger */}
          <div
            key={flipped ? "back" : "front"}
            style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
          >
            {group.skills.map((skill, i) => (
              <SkillTagBack key={skill} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SkillsFlip — section with full-width header (px-12) matching other sections
// ─────────────────────────────────────────────────────────────────────────────
export function SkillsFlip() {
  return (
    <section
      id="skills"
      className="pt-12 sm:pt-16 pb-2 sm:pb-4"
      style={{ background: "transparent", position: "relative" }}
    >
      {/* Scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(250, 249, 246, 0.72)", zIndex: 0 }}
      />

      <div className="relative" style={{ zIndex: 1 }}>
        {/* ── Section header — full-width px-12, matching all other sections ── */}
        <div className="px-12 mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: EASING_PREMIUM }}
            className="block text-xs tracking-widest uppercase mb-4 section-label"
            style={{
              color: "var(--color-accent)",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "11px",
            }}
          >
            // Skill Areas
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            data-neon-header="pink"
            className="font-display font-extrabold mb-5"
            style={{
              fontSize: "clamp(36px, 4vw, 60px)",
              color: "var(--color-text-primary)",
              letterSpacing: "-0.03em",
            }}
          >
            What I Bring
          </motion.h2>

          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASING_PREMIUM, delay: 0.1 }}
            className="max-w-2xl text-lg leading-relaxed"
            style={{
              color: "var(--color-text-secondary)",
            }}
          >
            An operator with rare breadth and serious depth — across engineering,
            marketing, finance, AI, and everything in between. I gravitate toward
            hard problems, stay relentlessly curious, and have a compulsion for
            distilling complexity into clarity.
          </motion.blockquote>
        </div>

        {/* ── Cards grid — constrained to max-w-6xl ── */}
        <div className="mx-auto max-w-6xl px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {skillGroups.map((group, i) => (
              <FlipCard key={group.label} group={group} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
