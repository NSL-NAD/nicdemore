"use client";

import { motion } from "framer-motion";
import { fadeInUp, stagger, viewportOnce } from "@/lib/motion";
import { SectionReveal } from "@/components/SectionReveal";

const sections = [
  {
    label: "Purpose",
    imagePosition: "right" as const,
    paragraphs: [
      "I\u2019ve never been interested in doing things halfway. Whether I\u2019m launching a course, helping a client grow, or exploring a new city with a camera in hand, I show up with intention.",
      "Behind every project I take on is a belief in doing good work with good people \u2014 and leaving things better than I found them. That\u2019s what drives me.",
      "I\u2019m always working on something new and thinking of new ideas \u2014 from developing an architecture course for beginners like me to developing tools for agencies. If you\u2019re curious, take a look around. If you want to build something, reach out.",
    ],
  },
  {
    label: "Entrepreneurship",
    imagePosition: "left" as const,
    paragraphs: [
      "I like ideas \u2014 but I care more about making them work.",
      "I\u2019ve spent most of my career in the space between vision and execution. As an operator, I focus on strategy, systems, and momentum. I like solving problems others avoid, bringing clarity to complex challenges, and building things that run smooth \u2014 not just fast. I work across creative and operational roles, always with an eye toward purpose, sustainability, and long-term value.",
    ],
  },
  {
    label: "Principles",
    imagePosition: "right" as const,
    paragraphs: [
      "I\u2019m guided by a few simple truths: stay curious, keep your word, do the right thing even when it\u2019s hard.",
      "My worldview is shaped by Stoicism, my faith, and the people who\u2019ve influenced me along the way. I believe in thoughtful work, honest relationships, and using your energy to leave things better than you found them. Not everything needs to be loud. Stillness is powerful. And if something matters \u2014 put in the effort.",
    ],
  },
  {
    label: "Passions",
    imagePosition: "left" as const,
    paragraphs: [
      "I have always been a curious person. This has led me to philosophy, to exploring the world through travel, and to embracing a continuous drive for learning.",
      "I have been blessed with an incredible family, have found true fulfillment in being an uncle, a friend, a brother, and now a husband.",
      "My next chapter includes fatherhood, continuing to understand my purpose, and building things that create positive change in the world.",
      "It really is a beautiful life.",
    ],
  },
];

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="aspect-[4/3] bg-surface rounded-lg border border-line relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-light/20 to-surface" />
      <span className="relative font-mono text-xs tracking-wider uppercase text-ink-muted/60">
        [{label} photo]
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 w-full py-24">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeInUp}
              className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-6"
            >
              About
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-display text-5xl sm:text-6xl lg:text-[80px] leading-[1.05] font-semibold text-ink"
            >
              Being the difference.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg sm:text-xl text-ink-muted max-w-2xl leading-relaxed"
            >
              I believe in building things that matter &mdash; businesses that
              solve problems, ideas that bring people together, and spaces that
              inspire better living. This site is a window into the work I do,
              the values I hold, and the projects I&apos;m building to make a
              meaningful difference.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content sections */}
      {sections.map((section, index) => {
        const imageOnRight = section.imagePosition === "right";
        return (
          <section
            key={section.label}
            className={index === 0 ? "border-t border-line" : ""}
          >
            <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text */}
                <SectionReveal
                  className={imageOnRight ? "md:order-1" : "md:order-2"}
                >
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-6">
                    {section.label}
                  </p>
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-ink-muted leading-relaxed text-base lg:text-lg"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </SectionReveal>

                {/* Image placeholder */}
                <SectionReveal
                  className={imageOnRight ? "md:order-2" : "md:order-1"}
                  delay={0.15}
                >
                  <ImagePlaceholder label={section.label} />
                </SectionReveal>
              </div>
            </div>

            {/* Divider between sections */}
            {index < sections.length - 1 && (
              <div className="mx-auto max-w-6xl px-6">
                <div className="border-b border-line" />
              </div>
            )}
          </section>
        );
      })}

      {/* Personal footer */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 text-center">
          <SectionReveal>
            <p className="font-mono text-sm tracking-wider text-ink-muted">
              Milwaukee, WI &middot;{" "}
              <a
                href="mailto:nademore@gmail.com"
                className="text-accent hover:text-ink transition-colors"
              >
                nademore@gmail.com
              </a>
            </p>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
