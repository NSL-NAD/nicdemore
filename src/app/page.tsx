"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ease, fadeInUp, stagger, viewportOnce } from "@/lib/motion";
import { SectionReveal } from "@/components/SectionReveal";

const ventures = [
  {
    name: "GAS Studio",
    description:
      "AI-native venture studio. Building purposeful ventures powered by automation and agentic AI systems.",
    href: "https://goodatscale.studio",
    featured: true,
  },
  {
    name: "Margle Media",
    description:
      "Full-service digital marketing agency. Clients include Cousins Subs, Johnsonville, Frito-Lay, and Instant Pot.",
    href: "https://www.marglemedia.com",
    featured: true,
  },
  {
    name: "FOA Course",
    description:
      "Foundations of Architecture — a course for aspiring homeowners designing their dream home.",
    href: "https://foacourse.com",
    featured: false,
  },
  {
    name: "Giveable",
    description:
      "Coming soon — curated charitable registry marketplace where every gift creates measurable good.",
    href: null,
    featured: false,
  },
];

const values = ["Curiosity", "Integrity", "Kindness", "Creativity"];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 w-full py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.h1
                variants={fadeInUp}
                className="font-display text-5xl sm:text-6xl lg:text-[80px] leading-[1.05] font-semibold text-ink"
              >
                Building things
                <br />
                that matter.
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-lg sm:text-xl text-ink-muted max-w-md"
              >
                Founder. Operator. Builder. Based in Milwaukee.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  href="/ventures"
                  className="inline-flex items-center px-6 py-3 bg-ink text-white text-sm font-medium rounded-md hover:bg-accent transition-colors"
                >
                  See My Work
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-ink text-ink text-sm font-medium rounded-md hover:border-accent hover:text-accent transition-colors"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-surface rounded-lg border border-line flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-light/30 to-surface" />
                <div className="relative flex flex-col items-center gap-4 text-ink-muted">
                  <div className="w-16 h-16 rounded-full border-2 border-ink-muted/30 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="ml-1"
                    >
                      <path
                        d="M8 5v14l11-7L8 5z"
                        fill="currentColor"
                        opacity="0.4"
                      />
                    </svg>
                  </div>
                  <span className="font-mono text-xs tracking-wider uppercase opacity-60">
                    [hero video]
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="border-y border-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <SectionReveal>
              <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl leading-snug text-ink italic">
                &ldquo;I like ideas — but I care more about making them
                work.&rdquo;
              </blockquote>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <p className="text-ink-muted leading-relaxed text-base lg:text-lg">
                Engineer by training. Entrepreneur by choice. I co-founded
                Margle Media in 2017 and have spent the years since learning
                every dimension of building and running something real. Now
                I&apos;m applying that foundation — and everything AI has
                unlocked — to building ventures that are genuinely good.
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Ventures strip */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionReveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-10">
              What I&apos;m Building
            </p>
          </SectionReveal>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {ventures.map((v) => (
              <motion.div key={v.name} variants={fadeInUp}>
                <VentureCard {...v} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values strip */}
      <section className="border-y border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value} className="text-center py-6">
                  <h3 className="font-display text-xl sm:text-2xl text-ink">
                    {value}
                  </h3>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA footer strip */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <SectionReveal>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink">
              Always do your best.
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="mt-4 text-lg text-ink-muted">
              Let&apos;s build something worth building.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <Link
              href="/contact"
              className="inline-flex items-center mt-8 px-8 py-3 bg-accent text-white text-sm font-medium rounded-md hover:bg-ink transition-colors"
            >
              Say Hello
            </Link>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

function VentureCard({
  name,
  description,
  href,
}: {
  name: string;
  description: string;
  href: string | null;
  featured?: boolean;
}) {
  const inner = (
    <div className="group relative bg-surface rounded-lg p-6 sm:p-8 border border-transparent hover:border-line transition-all duration-200 hover:-translate-y-[3px] hover:shadow-md">
      <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-transparent group-hover:bg-accent transition-colors rounded-full" />
      <h3 className="font-display text-xl font-semibold text-ink">{name}</h3>
      <p className="mt-2 text-sm text-ink-muted leading-relaxed">
        {description}
      </p>
      {href && (
        <span className="mt-4 inline-block text-xs font-mono text-accent">
          Visit &rarr;
        </span>
      )}
      {!href && (
        <span className="mt-4 inline-block font-mono text-xs text-ink-muted/50">
          Coming Soon
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return inner;
}
