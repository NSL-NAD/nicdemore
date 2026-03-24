"use client";

import { motion } from "framer-motion";
import { fadeInUp, stagger, viewportOnce } from "@/lib/motion";
import { SectionReveal } from "@/components/SectionReveal";

interface Venture {
  name: string;
  status: "Active" | "Live" | "In Development";
  description: string;
  tags: string[];
  href: string | null;
  featured: boolean;
}

const ventures: Venture[] = [
  {
    name: "GAS Studio",
    status: "Active",
    description:
      "AI-native venture studio. Building purposeful ventures powered by automation and agentic AI systems.",
    tags: ["AI", "Venture Studio", "Automation"],
    href: "https://goodatscale.studio",
    featured: true,
  },
  {
    name: "Margle Media",
    status: "Active",
    description:
      "Full-service digital marketing agency. Clients include Cousins Subs, Johnsonville, Frito-Lay, and Instant Pot. Built from zero across strategy, media, content, and management.",
    tags: ["Agency", "Marketing", "Strategy"],
    href: "https://www.marglemedia.com",
    featured: true,
  },
  {
    name: "FOA Course",
    status: "Live",
    description:
      "Foundations of Architecture — a self-paced course for aspiring homeowners who want to design their dream home.",
    tags: ["Education", "Architecture"],
    href: "https://foacourse.com",
    featured: false,
  },
  {
    name: "Giveable",
    status: "In Development",
    description:
      "Curated marketplace for impact-driven brands. The registry platform where every gift creates measurable good.",
    tags: ["Marketplace", "Social Impact"],
    href: null,
    featured: false,
  },
  {
    name: "Blue Hut",
    status: "In Development",
    description:
      "AI-powered tools for creative agencies. Streamlining operations and unlocking scale.",
    tags: ["AI", "SaaS", "Agency Tools"],
    href: null,
    featured: false,
  },
];

const featuredVentures = ventures.filter((v) => v.featured);
const standardVentures = ventures.filter((v) => !v.featured);

function StatusBadge({ status }: { status: Venture["status"] }) {
  const base = "font-mono text-xs px-3 py-1 rounded-full inline-block";

  if (status === "In Development") {
    return (
      <span className={`${base} bg-accent-light text-ink-muted`}>
        {status}
      </span>
    );
  }

  return (
    <span className={`${base} bg-accent text-white`}>{status}</span>
  );
}

function VentureCard({ venture }: { venture: Venture }) {
  const inner = (
    <div className="group relative bg-surface rounded-lg p-6 sm:p-8 border border-transparent hover:border-line transition-all duration-200 hover:-translate-y-[3px] hover:shadow-md h-full flex flex-col">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink">
          {venture.name}
        </h3>
        <StatusBadge status={venture.status} />
      </div>
      <p className="text-sm sm:text-base text-ink-muted leading-relaxed flex-1">
        {venture.description}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {venture.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs bg-background text-ink-muted rounded-full px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
      {venture.href && (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-mono text-accent group-hover:gap-2 transition-all">
          Visit <span aria-hidden="true">&rarr;</span>
        </span>
      )}
    </div>
  );

  if (venture.href) {
    return (
      <a href={venture.href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }

  return inner;
}

function FeaturedVentureCard({ venture }: { venture: Venture }) {
  const inner = (
    <div className="group relative bg-surface rounded-lg p-8 sm:p-10 border border-transparent hover:border-line transition-all duration-200 hover:-translate-y-[3px] hover:shadow-md h-full flex flex-col">
      <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-transparent group-hover:bg-accent transition-colors rounded-full" />
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
            {venture.name}
          </h3>
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-accent">
            Featured
          </span>
        </div>
        <StatusBadge status={venture.status} />
      </div>
      <p className="text-base sm:text-lg text-ink-muted leading-relaxed flex-1 max-w-xl">
        {venture.description}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {venture.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs bg-background text-ink-muted rounded-full px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
      {venture.href && (
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-mono text-accent group-hover:gap-2 transition-all">
          Visit <span aria-hidden="true">&rarr;</span>
        </span>
      )}
    </div>
  );

  if (venture.href) {
    return (
      <a href={venture.href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }

  return inner;
}

export default function VenturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.h1
              variants={fadeInUp}
              className="font-display text-5xl sm:text-6xl lg:text-[80px] leading-[1.05] font-semibold text-ink"
            >
              What I&apos;m building.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg sm:text-xl text-ink-muted max-w-lg"
            >
              A portfolio of ventures spanning AI, marketing, education, and
              social impact — each built with intention.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured ventures */}
      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-6">
          <SectionReveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-8">
              Featured
            </p>
          </SectionReveal>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {featuredVentures.map((v) => (
              <motion.div key={v.name} variants={fadeInUp}>
                <FeaturedVentureCard venture={v} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Standard ventures */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionReveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-8">
              All Ventures
            </p>
          </SectionReveal>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {standardVentures.map((v) => (
              <motion.div key={v.name} variants={fadeInUp}>
                <VentureCard venture={v} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
