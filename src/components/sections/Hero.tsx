"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { EASING_PREMIUM } from "@/lib/motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { HeroGrid } from "@/components/HeroGrid";

const words = ["Builder.", "Engineer.", "Founder."];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.75, ease: EASING_PREMIUM },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASING_PREMIUM, delay },
  }),
};

function HeroVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="relative w-full group film-grain"
      style={{
        background: 'var(--color-surface)',
        boxShadow: '0 0 0 1px var(--color-accent), 0 24px 60px rgba(0,0,0,0.15)',
        borderRadius: '2px',
        overflow: 'hidden',
        height: '100%',
        minHeight: '280px',
      }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster="/hero-video-poster.jpg"
        muted
        playsInline
        onEnded={() => setIsPlaying(false)}
        style={{ display: 'block' }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Play/Pause overlay */}
      <button
        onClick={handlePlayPause}
        className="absolute inset-0 flex items-center justify-center transition-opacity"
        style={{ background: isPlaying ? 'transparent' : 'rgba(0,0,0,0.35)' }}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {!isPlaying && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center justify-center w-14 h-14 rounded-full"
            style={{ background: 'var(--color-accent)', backdropFilter: 'blur(4px)' }}
          >
            <svg width="20" height="22" viewBox="0 0 20 22" fill="white" aria-hidden="true">
              <path d="M2 1.5l17 9.5-17 9.5V1.5z" />
            </svg>
          </motion.div>
        )}
      </button>

      {/* Controls bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 transition-opacity ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}
      >
        <button
          onClick={handlePlayPause}
          className="text-white text-xs font-medium px-2 py-1 rounded"
          style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '10px', letterSpacing: '0.06em' }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸ PAUSE" : "▶ PLAY"}
        </button>
        <button
          onClick={handleMuteToggle}
          className="text-white text-xs font-medium px-2 py-1 rounded"
          style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '10px', letterSpacing: '0.06em' }}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? "🔇 UNMUTE" : "🔊 MUTE"}
        </button>
      </div>

      {/* Video caption */}
      <div
        className="absolute top-3 left-3 px-2 py-1 rounded"
        style={{
          background: 'rgba(0,0,0,0.5)',
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '9px',
          letterSpacing: '0.1em',
          color: 'var(--color-accent)',
          backdropFilter: 'blur(4px)',
        }}
      >
        NIC DEMORE — INTRO
      </div>

    </div>
  );
}


export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { normX, normY } = useMousePosition();

  // Parallax springs — only on desktop
  const videoX = useSpring(isMobile ? 0 : normX * 6, { stiffness: 50, damping: 20 });
  const videoY = useSpring(isMobile ? 0 : normY * 4, { stiffness: 50, damping: 20 });
  const textX = useSpring(isMobile ? 0 : normX * -4, { stiffness: 50, damping: 20 });

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  // Parallax depth: h1 and h2 move at slightly different scroll rates
  const h1Y = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const h2Y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--color-base)' }}
    >
      {/* Interactive dot grid background */}
      <HeroGrid />

      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative w-full mx-auto max-w-7xl px-1.5 pt-28 pb-16 md:pt-32 md:pb-20"
      >
        {/* MOBILE LAYOUT */}
        <div className="md:hidden flex flex-col gap-6">
          {/* Name + tagline — tight */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-mono text-xs tracking-widest uppercase mb-3"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '10px' }}
            >
              // Overview
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASING_PREMIUM }}
              data-neon-header="pink"
              className="font-display font-extrabold leading-none mb-1"
              style={{
                fontSize: 'clamp(52px, 14vw, 80px)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.035em',
              }}
            >
              Nic DeMore
            </motion.h1>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-5"
            >
              {words.map((word, i) => (
                <motion.div
                  key={word}
                  variants={wordVariants}
                  className="font-display font-black"
                  style={{
                    fontSize: 'clamp(28px, 8vw, 48px)',
                    lineHeight: '0.9',
                    color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={1.0}
              initial="hidden"
              animate="visible"
              className="text-base leading-relaxed max-w-sm mb-5"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Milwaukee native. Mechanical engineer turned entrepreneur.
              Building AI-native ventures and tools for the builders.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={1.2}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-medium text-sm transition-all"
                style={{
                  background: 'var(--color-accent)',
                  color: '#fff',
                  fontFamily: 'var(--font-syne)',
                }}
              >
                See my work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-medium text-sm transition-colors duration-200"
                style={{
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--color-border)',
                  fontFamily: 'var(--font-syne)',
                }}
              >
                Get in touch
              </a>
            </motion.div>
          </div>

          {/* Video — full width on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASING_PREMIUM }}
          >
            <HeroVideoPlayer />
          </motion.div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden md:block">
          {/* h1 + h2 — tight, full width */}
          <motion.div style={{ x: textX }}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '11px' }}
            >
              // Overview
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASING_PREMIUM }}
              data-neon-header="pink"
              className="font-display font-extrabold leading-none mb-2"
              style={{
                fontSize: 'clamp(64px, 7vw, 100px)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.035em',
                y: h1Y,
                zIndex: 2,
                position: 'relative',
                textShadow: '0 2px 20px rgba(0,0,0,0.3), 0 0 40px rgba(244,99,30,0.08)',
              }}
            >
              Nic DeMore
            </motion.h1>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-4"
              style={{ y: h2Y }}
            >
              {words.map((word, i) => (
                <motion.div
                  key={word}
                  variants={wordVariants}
                  className="font-display font-black"
                  style={{
                    fontSize: 'clamp(36px, 4vw, 56px)',
                    lineHeight: '0.9',
                    color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Two columns: left = body + CTAs, right = video */}
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-6 lg:gap-8 md:items-start">
            {/* Left: body copy + CTA buttons */}
            <motion.div style={{ x: textX }} className="pt-2">
              <motion.p
                variants={fadeUp}
                custom={1.0}
                initial="hidden"
                animate="visible"
                className="text-lg leading-relaxed max-w-md mb-8"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Milwaukee native. Mechanical engineer turned entrepreneur.
                Building AI-native ventures and tools that let small teams
                operate at scale.
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={1.3}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-4"
              >
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-sm font-semibold text-sm transition-all hover:scale-[1.02]"
                  style={{
                    background: 'var(--color-accent)',
                    color: '#fff',
                    fontFamily: 'var(--font-syne)',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  See my work
                  <span className="transition-transform duration-200 group-hover:translate-x-1">↓</span>
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-sm font-medium text-sm transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  style={{
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border)',
                    fontFamily: 'var(--font-syne)',
                  }}
                >
                  Get in touch
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Hero Video — much larger, overlapped by H1 */}
            <motion.div
              style={{ x: videoX, y: videoY, marginTop: '-140px', zIndex: 0, position: 'relative' }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: EASING_PREMIUM }}
                style={{ minHeight: '400px', height: '100%' }}
              >
                <HeroVideoPlayer />
              </motion.div>
            </motion.div>
          </div>

          {/* Cross-column accent — architectural annotation, desktop only */}
          <div className="hidden lg:flex items-center gap-2 mt-6">
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-accent)', opacity: 0.5, flexShrink: 0 }} />
            <div style={{ width: '40px', height: '1px', background: 'var(--color-accent)', opacity: 0.4, flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '9px',
              letterSpacing: '0.18em',
              color: 'var(--color-text-secondary)',
              opacity: 0.5,
              textTransform: 'uppercase',
            }}>
              NIC DEMORE · GOOD AT SCALE STUDIO · MKE, WI · EST. 2017
            </span>
            <div style={{ width: '40px', height: '1px', background: 'var(--color-text-secondary)', opacity: 0.3, flexShrink: 0 }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-text-secondary)', opacity: 0.3, flexShrink: 0 }} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
