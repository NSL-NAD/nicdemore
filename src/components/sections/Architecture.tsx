"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { EASING_PREMIUM, EASING_SNAPPY, viewportOnce } from "@/lib/motion";

const archImages = [
  {
    src: "/imagery/ny-architecture.jpeg",
    alt: "New York architecture — geometric glass facade",
  },
  {
    src: "/imagery/DSC02423.jpeg",
    alt: "Architectural detail — light and structure",
  },
  {
    src: "/imagery/IMG_7214.JPG",
    alt: "Urban architecture — the built environment",
  },
  {
    src: "/imagery/ny-bridge.jpeg",
    alt: "New York bridge — structural engineering and design",
  },
];

function ArchImageReveal({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.6 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        ease: EASING_SNAPPY,
        delay: index * 0.12,
      }}
      className="relative overflow-hidden aspect-[4/3]"
      style={{ borderRadius: '10px' }}
    >
      <motion.div
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.6, ease: EASING_PREMIUM }}
        className="w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          quality={72}
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </motion.div>
    </motion.div>
  );
}

export function Architecture() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section
      ref={sectionRef}
      id="architecture"
      className="relative overflow-hidden"
      style={{ minHeight: "80vh", position: 'relative', zIndex: 10 }}
    >
      {/* Full-bleed background photo with parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/imagery/ny-building.jpeg"
          alt="Architecture photography — Nic DeMore's passion for architectural design"
          fill
          quality={80}
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(26,46,61,0.82) 0%, rgba(26,46,61,0.70) 60%, rgba(26,46,61,0.85) 100%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-16 sm:pt-44 sm:pb-20 lg:pt-52 lg:pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-14">
          {/* Left: label + headline + quote + button */}
          <div>
            {/* Section label — left-aligned with h2 */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5 }}
              className="block text-xs tracking-widest uppercase mb-5"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '11px' }}
            >
              // Passion Project
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.65, ease: EASING_PREMIUM }}
              data-neon-header="pink"
              className="font-display font-bold mb-6 leading-tight"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                color: '#FAF9F6',
                letterSpacing: '-0.02em',
                textShadow: '0 0 60px rgba(0,0,0,0.4)',
              }}
            >
              Architecture as a Way of Seeing
            </motion.h2>

            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: EASING_PREMIUM, delay: 0.1 }}
              className="mb-8 text-lg leading-relaxed"
              style={{
                color: 'rgba(242, 237, 229, 0.85)',
              }}
            >
              &ldquo;I spent two years learning architecture to design my dream home. That obsession became a course.&rdquo;
            </motion.blockquote>

            <motion.a
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: 0.25 }}
              href="https://foacourse.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.03,
                boxShadow: '0 12px 40px rgba(244,99,30,0.55)',
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-sm"
              style={{
                background: 'var(--color-accent)',
                color: '#fff',
                fontFamily: 'var(--font-syne)',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(244,99,30,0.32)',
              }}
            >
              Explore FOA Course
              <span>→</span>
            </motion.a>
          </div>

          {/* Right: story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASING_PREMIUM, delay: 0.15 }}
            className="space-y-5 text-base leading-relaxed"
            style={{ color: 'rgba(242, 237, 229, 0.75)' }}
          >
            <p>
              I&apos;m not an architect. I&apos;m an engineer who fell in love with how buildings think.
              It started when I decided to design my dream home from scratch, and realized
              I needed to learn how to see the world the way architects do.
            </p>
            <p>
              That obsession became hundreds of hours studying residential design, spatial flow,
              materiality, and the principles that make great spaces feel inevitable. I learned
              alongside architects, as collaborators, never competitors.
            </p>
            <p>
              I built{" "}
              <a
                href="https://foacourse.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-reveal font-medium"
                style={{ color: 'var(--color-accent)' }}
              >
                Foundations of Architecture
              </a>
              {" "}to give other non-architects the same framework: a way to think about space,
              light, materials, and proportion so they can be a better partner to the professionals
              who bring buildings to life.
            </p>
          </motion.div>
        </div>

        {/* Architecture image grid — rounded corners */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {archImages.map((img, i) => (
            <ArchImageReveal key={img.src} src={img.src} alt={img.alt} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
