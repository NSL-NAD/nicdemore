"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASING_PREMIUM, viewportOnce } from "@/lib/motion";

const skillGroups = [
  { label: "Engineering", skills: ["Systems Architecture", "Mechanical Engineering", "Infrastructure Design", "Process Engineering"] },
  { label: "Digital Marketing", skills: ["Paid Search / SEM", "Paid Social", "Omnichannel Strategy", "Performance Marketing"] },
  { label: "Operations", skills: ["Business Operations", "Process Development", "Workflow Automation", "Capacity Planning"] },
  { label: "Finance", skills: ["P&L Management", "Financial Forecasting", "Cashflow Management", "Revenue Modeling"] },
  { label: "Client Management", skills: ["Account Management", "Client Strategy", "Retention Strategy", "Stakeholder Communication"] },
  { label: "Business Strategy", skills: ["Go-to-Market", "Competitive Research", "Revenue Strategy", "OKR Frameworks"] },
  { label: "People & Leadership", skills: ["Direct Reports", "Leadership Development", "Hiring & Onboarding", "Culture Building"] },
  { label: "AI + Automation", skills: ["LLM Integration", "Agent Systems", "Prompt Engineering", "Autonomous Workflows"] },
  { label: "Product + Ventures", skills: ["Product Management", "Venture Building", "MVP Development", "Growth Strategy"] },
];

function SkillTag({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{ y: -2, scale: 1.04 }}
      style={{
        fontFamily: "var(--font-jetbrains)",
        fontSize: "10px",
        letterSpacing: "0.04em",
        color: "var(--color-accent)",
        padding: "3px 8px",
        border: "1px solid rgba(244, 99, 30, 0.35)",
        borderRadius: "2px",
        background: "transparent",
        cursor: "default",
        display: "inline-block",
      }}
    >
      {skill}
    </motion.span>
  );
}

function FlipCard({ group, index }: { group: typeof skillGroups[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => { setHovered(true); setFlipped(true); }}
      onMouseLeave={() => { setHovered(false); setFlipped(false); }}
      whileHover={{ scale: 1.03 }}
      className="cursor-pointer"
      style={{
        perspective: "1000px",
        minHeight: "220px",
        height: "auto",
        filter: hovered ? "drop-shadow(0 8px 24px rgba(244, 99, 30, 0.2))" : "none",
        transition: "filter 0.2s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "220px",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            padding: "20px",
          }}
        >
          {/* Category label */}
          <span
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            {group.label}
          </span>

          {/* Skill count badge */}
          <span
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "9px",
              letterSpacing: "0.08em",
              color: "var(--color-accent)",
              textTransform: "uppercase",
              padding: "2px 8px",
              border: "1px solid rgba(244, 99, 30, 0.3)",
              borderRadius: "2px",
            }}
          >
            {group.skills.length} skills
          </span>
        </div>

        {/* Back */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#1a1a1a",
            border: "1px solid var(--color-accent)",
            borderRadius: "12px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* Category label on back */}
          <span
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "9px",
              letterSpacing: "0.12em",
              color: "var(--color-accent)",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            {group.label}
          </span>

          {/* Skill tags — orange boxed */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {group.skills.map((skill, i) => (
              <SkillTag key={skill} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SkillsFlip() {
  return (
    <section
      className="py-24 sm:py-32"
      style={{ background: "transparent", position: "relative" }}
    >
      {/* Scrim for readability over GlowingGrid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(250, 249, 246, 0.72)", zIndex: 0 }}
      />

      <div className="relative mx-auto max-w-6xl px-6" style={{ zIndex: 1 }}>
        <div className="mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: EASING_PREMIUM }}
            className="block text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-jetbrains)", fontSize: "11px" }}
          >
            // Skill Areas
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            data-neon-header="pink"
            className="font-display font-extrabold"
            style={{
              fontSize: "clamp(36px, 4vw, 60px)",
              color: "var(--color-text-primary)",
              letterSpacing: "-0.03em",
              marginLeft: "-12px",
            }}
          >
            What I Bring
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.1, ease: EASING_PREMIUM }}
            className="mt-4 text-sm"
            style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)", fontSize: "11px", letterSpacing: "0.04em" }}
          >
            Hover or tap a card to flip
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <FlipCard key={group.label} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
