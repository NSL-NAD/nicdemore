"use client";

import { motion } from "framer-motion";
import { ease, viewportOnce } from "@/lib/motion";

const links = [
  { label: "Email", href: "mailto:nademore@gmail.com", display: "nademore@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com", display: "LinkedIn" },
  { label: "X / Twitter", href: "https://x.com", display: "@nicdemore" },
  { label: "GitHub", href: "https://github.com", display: "GitHub" },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 lg:py-40 bg-surface/50">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink mb-6"
        >
          Let&apos;s build something worth building.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="text-ink-muted text-lg max-w-xl mx-auto mb-12 leading-relaxed"
        >
          I&apos;m always interested in connecting with people who care about craft,
          design, and building things that matter. Let&apos;s talk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-12"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="text-ink animated-underline hover:text-accent transition-colors text-sm font-medium"
            >
              {link.display}
            </a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
          className="font-mono text-xs text-ink-muted/60 tracking-wide"
        >
          Milwaukee, WI — available to relocate or work remotely
        </motion.p>
      </div>
    </section>
  );
}
