"use client";

import { motion } from "framer-motion";
import { ease, viewportOnce } from "@/lib/motion";

interface Venture {
  name: string;
  description: string;
  tags: string[];
  status: "Live" | "Pre-launch" | "In Development";
  stack?: string[];
  url?: string;
  featured?: boolean;
}

const ventures: Venture[] = [
  {
    name: "FOA Course",
    description:
      "Foundations of Architecture — a course for non-architects who want to design their dream home. From spatial flow to materiality, the framework to think like the pros.",
    tags: ["Education", "Architecture"],
    status: "Live",
    stack: ["Next.js", "Supabase", "Stripe"],
    url: "https://foacourse.com",
    featured: true,
  },
  {
    name: "Giveable",
    description:
      "Curated marketplace of impact-driven brands for conscious gift registries.",
    tags: ["Marketplace", "Social Impact"],
    status: "Pre-launch",
    stack: ["Next.js", "Supabase", "Stripe Connect"],
    url: "https://giveable.vercel.app",
  },
  {
    name: "Good at Scale Studio",
    description:
      "Venture building brand. AI-native systems, purpose-driven businesses. The ethos: doing good at scale.",
    tags: ["Studio", "Brand"],
    status: "Live",
    url: "https://goodatscale.studio",
  },
  {
    name: "The Grid",
    description:
      "Internal venture operations dashboard. A command center for the agent team — where autonomous AI systems coordinate, report, and build.",
    tags: ["Internal Tool", "AI"],
    status: "In Development",
  },
];

function StatusBadge({ status }: { status: Venture["status"] }) {
  const colors = {
    Live: "bg-green-100 text-green-800",
    "Pre-launch": "bg-amber-100 text-amber-800",
    "In Development": "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-full ${colors[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "Live"
            ? "bg-green-500"
            : status === "Pre-launch"
            ? "bg-amber-500"
            : "bg-blue-500"
        }`}
      />
      {status}
    </span>
  );
}

function VentureCard({ venture, index }: { venture: Venture; index: number }) {
  const isFeatured = venture.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, ease, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`group bg-white rounded-lg border border-line p-6 sm:p-8 transition-shadow hover:shadow-lg hover:border-accent/40 ${
        isFeatured ? "lg:col-span-3" : ""
      }`}
    >
      <div className={isFeatured ? "grid grid-cols-1 lg:grid-cols-2 gap-8" : ""}>
        <div>
          <div className="flex items-start justify-between mb-4">
            <h3
              className={`font-display text-ink ${
                isFeatured ? "text-2xl sm:text-3xl" : "text-xl"
              }`}
            >
              {venture.name}
            </h3>
            <StatusBadge status={venture.status} />
          </div>

          <p
            className={`text-ink-muted leading-relaxed mb-6 ${
              isFeatured ? "text-base" : "text-sm"
            }`}
          >
            {venture.description}
          </p>
        </div>

        <div className={isFeatured ? "flex flex-col justify-between" : ""}>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {venture.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-ink-muted bg-surface px-2.5 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stack */}
          {venture.stack && (
            <div className="flex flex-wrap gap-2 mb-6">
              {venture.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs text-accent border border-accent/20 px-2.5 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Link */}
          {venture.url && (
            <a
              href={venture.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors group/link"
            >
              Visit
              <span className="transition-transform group-hover/link:translate-x-1">
                →
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Ventures() {
  const featured = ventures.filter((v) => v.featured);
  const rest = ventures.filter((v) => !v.featured);

  return (
    <section id="work" className="py-24 sm:py-32 lg:py-40 bg-surface/50">
      <div className="mx-auto max-w-6xl px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease }}
          className="font-mono text-xs tracking-widest text-accent uppercase mb-4 block"
        >
          Ventures & Work
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink mb-4"
        >
          Things I&apos;ve built
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="text-ink-muted text-lg max-w-2xl mb-16"
        >
          From education platforms to AI infrastructure — each venture is a bet
          on building something that matters.
        </motion.p>

        {/* Featured venture */}
        <div className="grid grid-cols-1 gap-6 mb-6">
          {featured.map((venture, i) => (
            <VentureCard key={venture.name} venture={venture} index={i} />
          ))}
        </div>

        {/* Rest */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rest.map((venture, i) => (
            <VentureCard
              key={venture.name}
              venture={venture}
              index={i + featured.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
