"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { EASING_PREMIUM, viewportOnce } from "@/lib/motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { VaporwaveSun } from "@/components/VaporwaveSun";

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
    <div className="relative w-full rounded-lg overflow-hidden group" style={{ background: 'var(--color-surface)', aspectRatio: '16/9' }}>
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
            {/* Play icon */}
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
  const portraitX = useSpring(isMobile ? 0 : normX * 8, { stiffness: 50, damping: 20 });
  const portraitY = useSpring(isMobile ? 0 : normY * 6, { stiffness: 50, damping: 20 });
  const textX = useSpring(isMobile ? 0 : normX * -4, { stiffness: 50, damping: 20 });

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--color-base)' }}
    >
      {/* Subtle grid lines background */}
      <div className="absolute inset-0 grid-lines opacity-60" aria-hidden="true" />

      {/* Vaporwave Sun — retro mode only */}
      <VaporwaveSun />

      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative w-full mx-auto max-w-7xl px-6 pt-28 pb-16 md:pt-32 md:pb-20"
      >
        {/* MOBILE LAYOUT */}
        <div className="md:hidden flex flex-col gap-8">
          {/* Name + words */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-mono text-xs tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '10px' }}
            >
              01 / Overview
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASING_PREMIUM }}
              data-neon-header="pink"
              className="font-display font-extrabold leading-none tracking-tight mb-4"
              style={{
                fontSize: 'clamp(52px, 14vw, 80px)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Nic DeMore
            </motion.h1>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              {words.map((word, i) => (
                <motion.div
                  key={word}
                  variants={wordVariants}
                  className="font-display font-bold leading-tight"
                  style={{
                    fontSize: 'clamp(28px, 8vw, 48px)',
                    color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    letterSpacing: '-0.01em',
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
              className="text-base leading-relaxed max-w-sm mb-6"
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
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-medium text-sm transition-all underline-reveal"
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

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASING_PREMIUM }}
            className="relative w-full max-w-xs mx-auto"
          >
            <div className="relative rounded-lg overflow-hidden aspect-[3/4]" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <Image
                src="/nicdemore.jpg"
                alt="Nic DeMore, founder and entrepreneur based in Milwaukee, WI"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 280px, 400px"
              />
            </div>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASING_PREMIUM }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-jetbrains)', fontSize: '10px' }}
            >
              A brief introduction
            </p>
            <HeroVideoPlayer />
          </motion.div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start">
          {/* Left: Text */}
          <motion.div style={{ x: textX }}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs tracking-widest uppercase mb-6"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '11px' }}
            >
              01 / Overview
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASING_PREMIUM }}
              data-neon-header="pink"
              className="font-display font-extrabold leading-none tracking-tight mb-6"
              style={{
                fontSize: 'clamp(64px, 7vw, 100px)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.025em',
              }}
            >
              Nic DeMore
            </motion.h1>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-8 space-y-1"
            >
              {words.map((word, i) => (
                <motion.div
                  key={word}
                  variants={wordVariants}
                  className="font-display font-bold leading-tight"
                  style={{
                    fontSize: 'clamp(36px, 4vw, 56px)',
                    color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    letterSpacing: '-0.01em',
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
              className="flex items-center gap-4 mb-12"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-sm font-semibold text-sm transition-all hover:scale-[1.02]"
                style={{
                  background: 'var(--color-accent)',
                  color: '#fff',
                  fontFamily: 'var(--font-syne)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                See my work
                <span>↓</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-sm font-medium text-sm transition-all underline-reveal"
                style={{
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--color-border)',
                  fontFamily: 'var(--font-syne)',
                }}
              >
                Get in touch
                <span>→</span>
              </a>
            </motion.div>

            {/* Video: featured foreground element, below hero text on left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: EASING_PREMIUM }}
              className="max-w-md"
            >
              <div className="flex items-center justify-between mb-3">
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-jetbrains)', fontSize: '10px' }}
                >
                  A brief introduction
                </p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: 'var(--color-surface)',
                    color: 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '9px',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  28s
                </span>
              </div>
              <HeroVideoPlayer />
            </motion.div>
          </motion.div>

          {/* Right: Portrait */}
          <motion.div
            style={{ x: portraitX, y: portraitY }}
            className="relative mt-4 lg:mt-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: EASING_PREMIUM }}
              className="relative"
            >
              {/* Accent line top */}
              <div
                className="absolute -top-3 left-0 right-0 h-0.5 rounded-full"
                style={{ background: 'var(--color-accent)', opacity: 0.6 }}
              />
              <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '3/4', boxShadow: 'var(--shadow-lg)' }}>
                <Image
                  src="/nicdemore.jpg"
                  alt="Nic DeMore, founder and entrepreneur based in Milwaukee, WI"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 360px, 420px"
                />
              </div>

              {/* Badge overlay */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute bottom-4 -left-4 rounded-lg p-4"
                style={{
                  background: 'var(--color-base)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-md)',
                  minWidth: '160px',
                }}
              >
                <p
                  className="text-xs font-bold mb-1"
                  style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '10px', letterSpacing: '0.08em' }}
                >
                  BASED IN
                </p>
                <p
                  className="font-display font-semibold text-sm"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Milwaukee, WI
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border flex justify-center pt-1.5"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="w-1 h-1.5 rounded-full" style={{ background: 'var(--color-accent)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
