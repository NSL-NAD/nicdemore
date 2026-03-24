"use client";

import { motion } from "framer-motion";
import { ease, viewportOnce } from "@/lib/motion";

const concepts = [
  { name: "Spatial Flow", desc: "How movement through a space shapes experience" },
  { name: "Materiality", desc: "The honesty and character of raw materials" },
  { name: "Light & Shadow", desc: "Architecture's most powerful and free material" },
  { name: "Proportion", desc: "The mathematics of what feels right" },
];

export function Architecture() {
  return (
    <section id="architecture" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Background architectural word */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 2, ease }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-text"
        aria-hidden="true"
      >
        MATERIALITY
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease }}
          className="font-mono text-xs tracking-widest text-accent uppercase mb-4 block"
        >
          Passion Project
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink mb-6 max-w-3xl"
        >
          Architecture as a way of seeing
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="text-ink-muted text-lg max-w-2xl mb-16 leading-relaxed"
        >
          I&apos;m not an architect. I&apos;m an engineer who fell in love with how buildings
          think. It started when I decided to design my dream home from scratch — and
          realized I needed to learn how to see the world the way architects do.
        </motion.p>

        {/* Editorial image placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease }}
          className="bg-surface border border-line rounded-lg aspect-[21/9] mb-16 flex items-center justify-center"
        >
          <span className="font-mono text-sm text-ink-muted/50 tracking-wide">
            [ Architectural photograph ]
          </span>
        </motion.div>

        {/* Story + concepts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease }}
            className="space-y-5 text-ink-muted leading-relaxed"
          >
            <p>
              That obsession became hundreds of hours studying residential design,
              construction systems, and the principles that make great spaces feel
              inevitable. I learned from architects — as collaborators and mentors,
              never competitors.
            </p>
            <p>
              I built{" "}
              <a
                href="https://foacourse.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent animated-underline"
              >
                Foundations of Architecture
              </a>
              {" "}to give other non-architects the same framework: a way to think
              about space, light, materials, and proportion so you can be a better
              partner to the professionals who bring buildings to life.
            </p>
            <p>
              This passion bleeds into everything I do. The way I think about product
              design, user experience, and systems architecture — it all comes back
              to the same question: does this space serve the people in it?
            </p>
          </motion.div>

          {/* Concepts */}
          <div className="space-y-4">
            {concepts.map((concept, i) => (
              <motion.div
                key={concept.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                className="border-l-2 border-accent/30 pl-6 py-3 hover:border-accent transition-colors"
              >
                <h3 className="font-display text-lg text-ink mb-1">{concept.name}</h3>
                <p className="text-ink-muted text-sm">{concept.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
