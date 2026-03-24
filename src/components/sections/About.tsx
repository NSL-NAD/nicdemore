"use client";

import { motion } from "framer-motion";
import { ease, viewportOnce } from "@/lib/motion";

const beliefs = [
  { title: "Systems over chaos.", body: "Good systems let good people do their best work." },
  { title: "Good design is honest.", body: "Whether it's a building or a business, beauty comes from truth." },
  { title: "Build for the long game.", body: "The things worth building take time. I'm not in a rush." },
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          {/* Pull quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease }}
            className="flex items-start"
          >
            <div className="relative">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease, delay: 0.2 }}
                className="font-display text-accent text-8xl sm:text-9xl leading-none absolute -top-4 -left-4 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </motion.span>
              <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink leading-snug pt-12 pl-2">
                I build things because I can&apos;t help it. It&apos;s the most honest thing I know how to do.
              </blockquote>
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="space-y-5 text-ink-muted leading-relaxed"
          >
            <p>
              I started as a mechanical engineer — the kind who sees the world as a system
              of forces, tolerances, and elegant constraints. That training never left me.
              It shows up in everything I build.
            </p>
            <p>
              Somewhere along the way, I fell in love with architecture. Not as a career —
              as a lens. The way a great building balances structure and beauty, function and
              feeling. I studied it obsessively, designed a dream home from scratch, and
              eventually built{" "}
              <a
                href="https://foacourse.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent animated-underline"
              >
                FOA Course
              </a>
              {" "}to share what I learned with others who think the same way.
            </p>
            <p>
              In 2017, I co-founded a digital marketing agency that grew to seven figures.
              I learned how to build teams, serve demanding clients, and operate under
              pressure. Now I&apos;m channeling all of that into what comes next: AI-native
              systems, purpose-driven ventures, and infrastructure that lets small teams
              operate at scale.
            </p>
            <p>
              I live in Milwaukee with my partner Natasha and our son Leo.
              I draw, I sketch buildings that don&apos;t exist yet, and I spend
              too much time thinking about Lake Tahoe.
            </p>
          </motion.div>
        </div>

        {/* Belief cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {beliefs.map((belief, i) => (
            <motion.div
              key={belief.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="bg-surface rounded-lg p-6 sm:p-8 border border-line"
            >
              <h3 className="font-display text-lg sm:text-xl text-ink mb-2">
                {belief.title}
              </h3>
              <p className="text-ink-muted text-sm leading-relaxed">
                {belief.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
