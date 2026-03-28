"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { EASING_PREMIUM } from "@/lib/motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const words = ["Builder.", "Engineer.", "Founder."];

// Z-axis "drop onto table" easing — smooth deceleration, no bounce
const Z_DROP_EASE = [0.16, 1, 0.3, 1] as const;

// Cinematic timing — doubled, ~7s total, elements drop simultaneously
// Elements start dropping at overlapping times (simultaneous build feel)
const T = {
  video:     { delay: 0.3,  dur: 1.8 },  // first piece placed
  name:      { delay: 0.8,  dur: 1.6 },  // lands ON TOP of video
  overview:  { delay: 1.2,  dur: 1.2 },  // label fades in
  h2_0:      { delay: 1.6,  dur: 1.4 },  // Builder.
  h2_1:      { delay: 1.9,  dur: 1.4 },  // Engineer.
  h2_2:      { delay: 2.2,  dur: 1.4 },  // Founder.
  card:      { delay: 2.6,  dur: 1.6 },  // frosted card
  subhead:   { delay: 3.0,  dur: 1.4 },  // text inside card
  btnLeft:   { delay: 3.5,  dur: 1.2 },  // See my work
  btnRight:  { delay: 3.8,  dur: 1.2 },  // Get in touch
};

// Z-axis drop: starts scaled up (closer to viewer) + transparent,
// lands at scale(1) + full opacity with shadow growing as it "lands"
const zDrop = (delay: number, dur: number, shadow: string) => ({
  initial: {
    opacity: 0,
    scale: 1.15,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: dur,
      ease: Z_DROP_EASE,
      delay,
      opacity: { duration: dur * 0.5, delay },
      filter: { duration: dur * 0.6, delay },
    },
  },
  style: {
    willChange: 'transform, opacity, filter' as const,
  },
  // Shadow is applied via className/inline — grows with the element
  whileInView: undefined,
});

// Larger Z-drop for hero video and frosted card (more dramatic)
const zDropHeavy = (delay: number, dur: number) => ({
  initial: {
    opacity: 0,
    scale: 1.25,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: dur,
      ease: Z_DROP_EASE,
      delay,
      opacity: { duration: dur * 0.4, delay },
      filter: { duration: dur * 0.7, delay },
    },
  },
});

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
        boxShadow: '0 0 0 1px var(--color-accent), 0 30px 80px rgba(0,0,0,0.25), 0 10px 30px rgba(0,0,0,0.15)',
        borderRadius: '3px',
        overflow: 'hidden',
        height: '100%',
        minHeight: '420px',
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
  const h1Y = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const h2Y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="relative min-h-screen flex items-center overflow-hidden"
      /* TRANSPARENT background so the GlowingGrid shows through */
    >
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative w-full mx-auto px-6 pt-28 pb-16 md:pt-32 md:pb-20"
      >
        {/* MOBILE LAYOUT */}
        <div className="md:hidden flex flex-col gap-6">
          <div>
            <motion.p
              {...zDrop(T.overview.delay, T.overview.dur, 'none')}
              className="font-mono text-xs tracking-widest uppercase mb-3"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '10px' }}
            >
              // Overview
            </motion.p>

            <motion.h1
              {...zDrop(T.name.delay, T.name.dur, 'text')}
              data-neon-header="pink"
              className="font-display font-extrabold leading-none mb-1"
              style={{
                fontSize: 'clamp(52px, 14vw, 80px)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.035em',
                textShadow: '0 4px 12px rgba(0,0,0,0.12)',
              }}
            >
              Nic DeMore
            </motion.h1>

            <div className="mb-5">
              {words.map((word, i) => (
                <motion.div
                  key={word}
                  {...zDrop(
                    T.h2_0.delay + i * 0.3,
                    T.h2_0.dur,
                    'text'
                  )}
                  className="font-display font-black"
                  style={{
                    fontSize: 'clamp(28px, 8vw, 48px)',
                    lineHeight: '0.9',
                    color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    letterSpacing: '-0.02em',
                    textShadow: '0 3px 8px rgba(0,0,0,0.08)',
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </div>

            {/* Frosted glass card — mobile */}
            <motion.div
              {...zDropHeavy(T.card.delay, T.card.dur)}
              className="frosted-card rounded-xl p-5 mb-5"
              style={{
                boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)',
              }}
            >
              <motion.p
                {...zDrop(T.subhead.delay, T.subhead.dur, 'none')}
                className="text-base leading-relaxed max-w-sm mb-5"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Milwaukee native. Mechanical engineer turned entrepreneur.
                Building AI-native ventures and tools for the builders.
              </motion.p>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  {...zDrop(T.btnLeft.delay, T.btnLeft.dur, 'none')}
                  href="#work"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-medium text-sm transition-all"
                  style={{
                    background: 'var(--color-accent)',
                    color: '#fff',
                    fontFamily: 'var(--font-syne)',
                    boxShadow: '0 4px 16px rgba(244, 99, 30, 0.25)',
                  }}
                >
                  See my work ↓
                </motion.a>
                <motion.a
                  {...zDrop(T.btnRight.delay, T.btnRight.dur, 'none')}
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-medium text-sm transition-all duration-200 hero-btn-outline"
                  style={{
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border)',
                    fontFamily: 'var(--font-syne)',
                  }}
                >
                  Get in touch →
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Video — full width on mobile */}
          <motion.div {...zDropHeavy(T.video.delay, T.video.dur)}>
            <HeroVideoPlayer />
          </motion.div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden md:block">
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-6 lg:gap-8 md:items-start">
            {/* Left column: name + h2 + frosted card */}
            <motion.div style={{ x: textX }} className="relative z-[3]">
              <motion.p
                {...zDrop(T.overview.delay, T.overview.dur, 'none')}
                className="text-xs tracking-widest uppercase mb-4"
                style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '11px' }}
              >
                // Overview
              </motion.p>

              {/* H1 — single line, overlaps video top-left corner */}
              <motion.h1
                {...zDrop(T.name.delay, T.name.dur, 'text')}
                data-neon-header="pink"
                className="font-display font-extrabold leading-none mb-2"
                style={{
                  fontSize: 'clamp(64px, 7vw, 100px)',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.035em',
                  y: h1Y,
                  zIndex: 3,
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  textShadow: '0 6px 20px rgba(0,0,0,0.15), 0 2px 6px rgba(0,0,0,0.1)',
                }}
              >
                Nic DeMore
              </motion.h1>

              <motion.div
                className="mb-6"
                style={{ y: h2Y }}
              >
                {words.map((word, i) => {
                  const key = `h2_${i}` as keyof typeof T;
                  const timing = T[key] || { delay: T.h2_0.delay + i * 0.3, dur: T.h2_0.dur };
                  return (
                    <motion.div
                      key={word}
                      {...zDrop(timing.delay, timing.dur, 'text')}
                      className="font-display font-black"
                      style={{
                        fontSize: 'clamp(36px, 4vw, 56px)',
                        lineHeight: '0.9',
                        color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-primary)',
                        letterSpacing: '-0.02em',
                        textShadow: '0 3px 10px rgba(0,0,0,0.08)',
                      }}
                    >
                      {word}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Frosted glass card — subhead + buttons */}
              <motion.div
                {...zDropHeavy(T.card.delay, T.card.dur)}
                className="frosted-card rounded-xl p-6"
                style={{
                  boxShadow: '0 25px 70px rgba(0,0,0,0.14), 0 10px 30px rgba(0,0,0,0.1)',
                }}
              >
                <motion.p
                  {...zDrop(T.subhead.delay, T.subhead.dur, 'none')}
                  className="text-lg leading-relaxed max-w-md mb-6"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Milwaukee native. Mechanical engineer turned entrepreneur.
                  Building AI-native ventures and tools that let small teams
                  operate at scale.
                </motion.p>

                <div className="flex items-center gap-4">
                  <motion.a
                    {...zDrop(T.btnLeft.delay, T.btnLeft.dur, 'none')}
                    href="#work"
                    className="group inline-flex items-center gap-2 px-5 py-3 rounded-sm font-semibold text-sm transition-all hover:scale-[1.02]"
                    style={{
                      background: 'var(--color-accent)',
                      color: '#fff',
                      fontFamily: 'var(--font-syne)',
                      boxShadow: '0 6px 20px rgba(244, 99, 30, 0.3)',
                    }}
                  >
                    See my work
                    <span className="transition-transform duration-200 group-hover:translate-x-1">↓</span>
                  </motion.a>
                  <motion.a
                    {...zDrop(T.btnRight.delay, T.btnRight.dur, 'none')}
                    href="#contact"
                    className="group inline-flex items-center gap-2 px-5 py-3 rounded-sm font-medium text-sm transition-all duration-200 hero-btn-outline"
                    style={{
                      color: 'var(--color-text-primary)',
                      border: '1px solid var(--color-border)',
                      fontFamily: 'var(--font-syne)',
                    }}
                  >
                    Get in touch
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column: Hero Video — large, H1 overlaps its top edge */}
            <motion.div
              style={{ x: videoX, y: videoY, marginTop: '-40px', zIndex: 1, position: 'relative' }}
              className="relative"
            >
              <motion.div
                {...zDropHeavy(T.video.delay, T.video.dur)}
                style={{ minHeight: '520px', height: '100%' }}
              >
                <HeroVideoPlayer />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
