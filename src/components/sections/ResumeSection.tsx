"use client";

import { motion } from "framer-motion";
import { ease, viewportOnce } from "@/lib/motion";

interface TimelineEntry {
  year: string;
  title: string;
  org: string;
  description: string;
}

const timeline: TimelineEntry[] = [
  {
    year: "2025–Present",
    title: "Founder",
    org: "Good at Scale Studio",
    description:
      "Building AI-native operational infrastructure — autonomous agents, venture automation, intelligence systems. Building the future of how one-person studios operate at enterprise scale.",
  },
  {
    year: "2025–Present",
    title: "Course Creator",
    org: "Foundations of Architecture",
    description:
      "Built and launched an online architecture education platform as a self-funded, solo-built product. 0 to live in 8 weeks.",
  },
  {
    year: "2017–2026",
    title: "Co-Founder, President & COO",
    org: "Margle Media",
    description:
      "Built a 7-figure digital marketing agency from zero. Led operations, strategy, and a team serving Fortune 500 brands including Johnsonville, Frito-Lay, and Cousins Subs. Exiting 2026.",
  },
  {
    year: "2012–2016",
    title: "B.S. Mechanical Engineering",
    org: "Marquette University",
    description:
      "Engineering fundamentals: thermodynamics, materials science, systems design. The training that taught me to think in constraints and tolerances.",
  },
];

const skillGroups = [
  {
    name: "Engineering & Systems",
    skills: [
      "Mechanical Engineering",
      "Systems Architecture",
      "Infrastructure Design",
      "Technical Operations",
      "CI/CD & DevOps",
    ],
  },
  {
    name: "AI & Automation",
    skills: [
      "LLM Integration",
      "Agent Systems",
      "Prompt Engineering",
      "AI-Native Development",
      "Autonomous Operations",
    ],
  },
  {
    name: "Product & Strategy",
    skills: [
      "Product Management",
      "Venture Building",
      "Growth Strategy",
      "Business Operations",
      "Team Leadership",
    ],
  },
  {
    name: "Creative & Design",
    skills: [
      "Architectural Design",
      "UI/UX",
      "Brand Development",
      "Visual Design",
      "Sketching & Drawing",
    ],
  },
];

export function ResumeSection() {
  return (
    <section id="resume" className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease }}
          className="font-mono text-xs tracking-widest text-accent uppercase mb-4 block"
        >
          Experience
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink mb-16"
        >
          The path so far
        </motion.h2>

        {/* Timeline */}
        <div className="relative mb-24">
          {/* Center spine */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-line" />

          <div className="space-y-12">
            {timeline.map((entry, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={entry.org}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, ease }}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12"
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-1 w-3 h-3 rounded-full bg-accent border-2 border-background z-10" />

                  {/* Content — alternating sides */}
                  <div
                    className={`pl-10 md:pl-0 ${
                      isLeft
                        ? "md:text-right md:pr-12"
                        : "md:col-start-2 md:pl-12"
                    }`}
                  >
                    <span className="font-mono text-xs text-accent tracking-wide">
                      {entry.year}
                    </span>
                    <h3 className="font-display text-xl text-ink mt-1">
                      {entry.title}
                    </h3>
                    <p className="font-medium text-ink-muted text-sm mb-2">
                      {entry.org}
                    </p>
                    <p className="text-ink-muted text-sm leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Skills */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease }}
          className="font-display text-2xl sm:text-3xl text-ink mb-10"
        >
          What I bring
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease, delay: gi * 0.1 }}
            >
              <h4 className="font-display text-base text-ink mb-4">
                {group.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs text-ink-muted bg-surface border border-line px-2.5 py-1.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resume links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease }}
          className="mt-16 pt-8 border-t border-line flex flex-wrap gap-6"
        >
          <a
            href="/resume/anthropic"
            className="text-sm font-medium text-ink animated-underline hover:text-accent transition-colors"
          >
            View Anthropic cover letter →
          </a>
          <a
            href="/resume/apple"
            className="text-sm font-medium text-ink animated-underline hover:text-accent transition-colors"
          >
            View Apple cover letter →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
