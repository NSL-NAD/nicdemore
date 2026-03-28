"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASING_PREMIUM, viewportOnce } from "@/lib/motion";

const skillGroups = [
  { icon: "⚙", label: "Engineering", skills: ["Systems Architecture", "Mechanical Engineering", "Infrastructure Design", "Process Engineering"] },
  { icon: "📡", label: "Digital Marketing", skills: ["Paid Search / SEM", "Paid Social", "Omnichannel Strategy", "Performance Marketing"] },
  { icon: "🔧", label: "Operations", skills: ["Business Operations", "Process Development", "Workflow Automation", "Capacity Planning"] },
  { icon: "💰", label: "Finance", skills: ["P&L Management", "Financial Forecasting", "Cashflow Management", "Revenue Modeling"] },
  { icon: "🤝", label: "Client Management", skills: ["Account Management", "Client Strategy", "Retention Strategy", "Stakeholder Communication"] },
  { icon: "📊", label: "Business Strategy", skills: ["Go-to-Market", "Competitive Research", "Revenue Strategy", "OKR Frameworks"] },
  { icon: "👥", label: "People & Leadership", skills: ["Direct Reports", "Leadership Development", "Hiring & Onboarding", "Culture Building"] },
  { icon: "🤖", label: "AI + Automation", skills: ["LLM Integration", "Agent Systems", "Prompt Engineering", "Autonomous Workflows"] },
  { icon: "🚀", label: "Product + Ventures", skills: ["Product Management", "Venture Building", "MVP Development", "Growth Strategy"] },
];

function FlipCard({ group, index }: { group: typeof skillGroups[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className="cursor-pointer"
      style={{ perspective: "1000px", height: "160px" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
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
            borderRadius: "2px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "28px" }}>{group.icon}</span>
          <span
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              textAlign: "center",
              padding: "0 8px",
            }}
          >
            {group.label}
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
            background: "var(--color-forest)",
            border: "1px solid var(--color-accent)",
            borderRadius: "2px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            justifyContent: "center",
          }}
        >
          {group.skills.map((skill) => (
            <span
              key={skill}
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "10px",
                color: "#FAF9F6",
                letterSpacing: "0.04em",
                lineHeight: "1.4",
              }}
            >
              — {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function SkillsFlip() {
  return (
    <section
      className="py-24 sm:py-32"
      style={{ background: "var(--color-base)", position: "relative" }}
    >
      <div className="mx-auto max-w-6xl px-6">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <FlipCard key={group.label} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
