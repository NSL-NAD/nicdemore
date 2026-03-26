"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ease, viewportOnce } from "@/lib/motion";
import { DownloadPDFButton } from "@/components/DownloadPDFButton";

interface CoverLetter {
  company: string;
  greeting: string;
  paragraphs: string[];
  closing: string;
}

const coverLetters: Record<string, CoverLetter> = {
  anthropic: {
    company: "Anthropic",
    greeting: "To the team at Anthropic,",
    paragraphs: [
      "I\u2019ve been building AI-native infrastructure since early 2025. Not because it was strategic \u2014 because I couldn\u2019t stop. I built Alfred, a persistent AI chief-of-staff who manages my ventures, runs autonomous agents, and helps me operate at a scale that shouldn\u2019t be possible for a solo founder. I built The Grid, a venture operations dashboard where the agent team works. I wrote SOUL.md and MEMORY.md \u2014 the files that give AI systems continuity and character. I\u2019ve been living inside the problem Anthropic is trying to solve, and I\u2019ve built a body of work that proves it.",
      "What draws me to Anthropic isn\u2019t just the technology \u2014 it\u2019s the posture. Building powerful AI and taking safety seriously isn\u2019t a contradiction; it\u2019s the only version of this that works. I\u2019ve seen firsthand what happens when AI systems operate autonomously in real business contexts. The alignment questions aren\u2019t theoretical to me. They\u2019re Tuesday.",
      "I bring an unusual combination: a mechanical engineering foundation that trained me to think in systems and constraints, a decade of entrepreneurship that taught me to ship under pressure, and a year of deep, daily work building with Claude at the systems level. I don\u2019t just use the API. I build infrastructure on top of it \u2014 agent orchestration, persistent memory, autonomous workflows.",
      "I want to help build the tools and systems that make AI useful, safe, and genuinely aligned with the people who use it. I\u2019ve been doing that independently. I\u2019d like to do it with the team that\u2019s setting the standard.",
    ],
    closing: "\u2014 Nic DeMore",
  },
  apple: {
    company: "Apple",
    greeting: "To the team at Apple,",
    paragraphs: [
      "I build things that are complete \u2014 not just functional, but considered. The gap between something that works and something that feels right is where I live. That\u2019s a gap I\u2019ve been closing my entire career, from mechanical engineering to digital products to the AI-native systems I build today.",
      "My training is in engineering, but my instinct is design. I fell in love with architecture \u2014 the discipline of making spaces that serve people beautifully. I studied it obsessively, built a course to teach others what I learned, and apply that same eye to every product I touch. The way a great building balances structure and beauty, load and light \u2014 that\u2019s the same tension that makes great software.",
      "I co-founded and operated a 7-figure digital agency, learning what it takes to serve the world\u2019s most demanding brands at scale. Now I\u2019m building AI-native infrastructure: autonomous agent systems, venture operations platforms, and tools that let small teams operate with the precision and reach of much larger ones. The common thread is craft \u2014 the conviction that how something is built matters as much as what it does.",
      "Apple\u2019s standard is the one I grew up with and the one I hold myself to. I\u2019d like to bring my engineering foundation, my design eye, and my builder\u2019s instinct to a team that refuses to ship anything less than excellent.",
    ],
    closing: "\u2014 Nic DeMore",
  },
};

const timeline = [
  {
    year: "2025\u2013Present",
    title: "Founder",
    org: "Good at Scale Studio",
    description:
      "Building AI-native operational infrastructure \u2014 autonomous agents, venture automation, intelligence systems. Building the future of how one-person studios operate at enterprise scale.",
  },
  {
    year: "2025\u2013Present",
    title: "Course Creator",
    org: "Foundations of Architecture",
    description:
      "Built and launched an online architecture education platform as a self-funded, solo-built product. 0 to live in 8 weeks.",
  },
  {
    year: "2017\u20132026",
    title: "Co-Founder, President & COO",
    org: "Margle Media",
    description:
      "Built a 7-figure digital marketing agency from zero. Led operations, strategy, and a team serving Fortune 500 brands including Johnsonville, Frito-Lay, and Cousins Subs. Exiting 2026.",
  },
  {
    year: "2012\u20132016",
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

export default function ResumePage() {
  const params = useParams();
  const companySlug = (params?.company as string[] | undefined)?.[0];
  const letter = companySlug ? coverLetters[companySlug] : null;

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-6">
        {/* Back link + Download */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="mb-12 flex items-center justify-between gap-4 flex-wrap"
        >
          <Link
            href="/"
            className="text-sm text-ink-muted hover:text-ink animated-underline transition-colors"
          >
            &larr; Back to nicdemore.com
          </Link>
          <DownloadPDFButton
            label={letter ? `Download Cover Letter — ${letter.company}` : "Download Resume as PDF"}
            filename={letter ? `nic-demore-cover-letter-${companySlug}` : "nic-demore-resume"}
          />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <h1 className="font-display text-4xl sm:text-5xl text-ink mb-2">
            Nic DeMore
          </h1>
          <p className="text-ink-muted text-lg">Builder. Engineer. Founder.</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-ink-muted">
            <span>Milwaukee, WI</span>
            <span className="text-line">|</span>
            <a
              href="mailto:nademore@gmail.com"
              className="text-accent animated-underline"
            >
              nademore@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Cover letter */}
        {letter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="mb-20 bg-white rounded-lg border border-line p-8 sm:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-accent rounded-full" />
              <h2 className="font-display text-xl text-ink">
                A note for {letter.company}
              </h2>
            </div>

            <p className="text-ink-muted italic mb-6">{letter.greeting}</p>

            <div className="space-y-4 text-ink-muted leading-relaxed">
              {letter.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <p className="mt-8 font-medium text-ink">{letter.closing}</p>
          </motion.div>
        )}

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease }}
          className="mb-20"
        >
          <h2 className="font-display text-2xl text-ink mb-10">Experience</h2>

          <div className="relative">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-line" />

            <div className="space-y-10">
              {timeline.map((entry, i) => (
                <motion.div
                  key={entry.org}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                  className="relative pl-10"
                >
                  <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-background" />
                  <span className="font-mono text-xs text-accent tracking-wide">
                    {entry.year}
                  </span>
                  <h3 className="font-display text-lg text-ink mt-1">
                    {entry.title}
                  </h3>
                  <p className="font-medium text-ink-muted text-sm mb-1.5">
                    {entry.org}
                  </p>
                  <p className="text-ink-muted text-sm leading-relaxed">
                    {entry.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Value section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease }}
          className="mb-20 resume-section"
        >
          <h2 className="font-display text-2xl text-ink mb-6">The Value I Bring to the Table</h2>
          <div className="space-y-3 text-ink-muted leading-relaxed">
            <p>
              A mechanical engineering foundation means I think in systems and constraints — I see the structure underneath things. A decade of agency work means I know how to operate under pressure, serve demanding stakeholders, and ship. And a year of daily, deep work building AI-native infrastructure means I&apos;m not just using these tools — I&apos;m building on top of them.
            </p>
            <p>
              I bring the unusual combination of builder, operator, and strategic thinker to every problem. I can go deep technically and surface commercially. I&apos;ve built things from zero, run teams, served enterprise clients, and built the kind of AI infrastructure most people are still theorizing about.
            </p>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease }}
        >
          <h2 className="font-display text-2xl text-ink mb-10">Skills</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {skillGroups.map((group) => (
              <div key={group.name}>
                <h3 className="font-display text-base text-ink mb-3">
                  {group.name}
                </h3>
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
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
