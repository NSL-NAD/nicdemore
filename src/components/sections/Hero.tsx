"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { EASING_PREMIUM } from "@/lib/motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const words = ["Builder.", "Engineer.", "Founder."];

// =====================================================
// 3D PERSPECTIVE CINEMATIC SYSTEM
//
// Elements enter from OUTSIDE the viewport, flying in from
// the direction matching their final position on screen.
// They start at high Z (close to camera), blurry, and
// decelerate smoothly as they land at z:0 on the grid.
//
// perspective(1200px) on parent = camera distance
// translateZ(800px) = element is 800px closer to viewer
// translateX/Y offsets = element is off-screen in that direction
// =====================================================

// Smooth deceleration — fast start, very slow landing
const LAND_EASE = [0.12, 0.9, 0.25, 1] as const;

// Cinematic timing — ~8s total, slowed down for drama
// Multiple elements in flight simultaneously
const T = {
  // Wave 1: Hero anchors
  video:     { delay: 0.3,  dur: 3.0 },   // SE corner, first piece — slow & dramatic
  name:      { delay: 0.7,  dur: 2.8 },   // lands on top of video

  // Wave 2: Overlapping scatter
  overview:  { delay: 1.4,  dur: 1.6 },   // quick label from W
  h2Group:   { delay: 1.6,  dur: 2.4 },   // all 3 words drop as ONE unit from W
  card:      { delay: 2.0,  dur: 2.8 },   // frosted card — slow, heavy, from SW

  // Wave 3: Card contents land inside card
  subhead:   { delay: 2.8,  dur: 2.0 },   // text from W
  btnLeft:   { delay: 3.4,  dur: 1.6 },   // from SW
  btnRight:  { delay: 3.6,  dur: 1.4 },   // from S
};

// =====================================================
// 3D DROP ANIMATION
// Each element has:
//   - startX, startY: off-screen position (px offset from final)
//   - startZ: depth (closer to camera)
//   - blur: clears as it lands
//   - NO opacity change — fully visible in flight
//   - shadow grows as element approaches the grid
// =====================================================
const drop3D = (
  delay: number,
  dur: number,
  startX: number,
  startY: number,
  startZ: number,
  startBlur: number,
) => ({
  initial: {
    x: startX,
    y: startY,
    z: startZ,
    filter: `blur(${startBlur}px)`,
    // No opacity: 0 — element is visible from the start
  },
  animate: {
    x: 0,
    y: 0,
    z: 0,
    filter: 'blur(0px)',
    transition: {
      duration: dur,
      ease: LAND_EASE,
      delay,
      filter: { duration: dur * 0.7, delay: delay + dur * 0.1 },
    },
  },
});

// Heavy variant — more dramatic Z depth and blur
const drop3DHeavy = (
  delay: number,
  dur: number,
  startX: number,
  startY: number,
  startZ: number,
) => ({
  initial: {
    x: startX,
    y: startY,
    z: startZ,
    filter: 'blur(12px)',
  },
  animate: {
    x: 0,
    y: 0,
    z: 0,
    filter: 'blur(0px)',
    transition: {
      duration: dur,
      ease: LAND_EASE,
      delay,
      filter: { duration: dur * 0.8, delay: delay + dur * 0.05 },
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
        boxShadow: '0 0 0 1px var(--color-accent), 0 38px 100px rgba(0,0,0,0.32), 0 12px 38px rgba(0,0,0,0.19)',
        borderRadius: '4px',
        overflow: 'hidden',
        height: '100%',
        minHeight: '460px',
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

  // Scroll parallax — increased H1 movement
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const h1Y = useTransform(scrollYProgress, [0, 1], [0, 60]);   // increased from 30
  const h2Y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="relative min-h-screen flex items-center overflow-visible"
      /* TRANSPARENT — grid shows through. overflow-visible so 3D elements can fly in from outside */
    >
      {/* 3D PERSPECTIVE CONTAINER — camera at 1200px distance */}
      <motion.div
        style={{
          opacity: heroOpacity,
          y: heroY,
          perspective: 1200,
          perspectiveOrigin: '50% 40%',
        }}
        className="relative w-full mx-auto px-12 pt-28 pb-16 md:pt-32 md:pb-20"
      >
        {/* MOBILE LAYOUT */}
        <div className="md:hidden flex flex-col gap-6" style={{ transformStyle: 'preserve-3d' }}>
          <div>
            <motion.p
              {...drop3D(T.overview.delay, T.overview.dur, -200, -60, 400, 6)}
              className="font-mono text-xs tracking-widest uppercase mb-3"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '10px', transformStyle: 'preserve-3d' }}
            >
              // Overview
            </motion.p>

            <motion.h1
              {...drop3D(T.name.delay, T.name.dur, -300, -150, 600, 8)}
              data-neon-header="pink"
              className="font-display font-extrabold leading-none mb-0"
              style={{
                fontSize: 'clamp(52px, 14vw, 80px)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.035em',
                textShadow: '0 5px 15px rgba(0,0,0,0.15)',
                transformStyle: 'preserve-3d',
              }}
            >
              Nic DeMore
            </motion.h1>

            {/* H2 words — grouped as one unit */}
            <motion.div
              {...drop3D(T.h2Group.delay, T.h2Group.dur, -250, -80, 500, 6)}
              className="mb-5"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {words.map((word, i) => (
                <div
                  key={word}
                  className="font-display font-black"
                  style={{
                    fontSize: 'clamp(28px, 8vw, 48px)',
                    lineHeight: '0.9',
                    color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    letterSpacing: '-0.02em',
                    textShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  }}
                >
                  {word}
                </div>
              ))}
            </motion.div>

            {/* Frosted glass card — mobile */}
            <motion.div
              {...drop3DHeavy(T.card.delay, T.card.dur, -180, 200, 700)}
              className="frosted-card rounded-xl p-5 mb-5 inline-block"
              style={{
                boxShadow: '0 25px 75px rgba(0,0,0,0.15), 0 10px 30px rgba(0,0,0,0.1)',
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.p
                {...drop3D(T.subhead.delay, T.subhead.dur, -120, 0, 300, 4)}
                className="text-base leading-relaxed mb-5"
                style={{ color: 'var(--color-text-secondary)', maxWidth: '360px', transformStyle: 'preserve-3d' }}
              >
                Milwaukee native. Mechanical engineer turned entrepreneur.
                Building AI-native ventures and tools for the builders.
              </motion.p>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  {...drop3D(T.btnLeft.delay, T.btnLeft.dur, -100, 80, 350, 4)}
                  href="#work"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-medium text-sm transition-all"
                  style={{
                    background: 'var(--color-accent)',
                    color: '#fff',
                    fontFamily: 'var(--font-syne)',
                    boxShadow: '0 5px 20px rgba(244, 99, 30, 0.32)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  See my work ↓
                </motion.a>
                <motion.a
                  {...drop3D(T.btnRight.delay, T.btnRight.dur, 0, 100, 300, 3)}
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-medium text-sm transition-all duration-200 hero-btn-outline"
                  style={{
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border)',
                    fontFamily: 'var(--font-syne)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  Get in touch →
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Video — mobile */}
          <motion.div
            {...drop3DHeavy(T.video.delay, T.video.dur, 200, 300, 800)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <HeroVideoPlayer />
          </motion.div>
        </div>

        {/* =====================================================
            DESKTOP LAYOUT — 3D PERSPECTIVE
            Elements fly in from directions matching their position:
            - Video: from SE (bottom-right, outside viewport)
            - H1: from NW-ish (above-left)
            - H2 group: from W (left side)
            - Card: from SW (below-left)
            - Nav: from N (above)
            ===================================================== */}
        <div className="hidden md:block" style={{ transformStyle: 'preserve-3d' }}>
          {/* // Overview label — from W */}
          <motion.p
            {...drop3D(T.overview.delay, T.overview.dur, -300, -40, 400, 5)}
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '11px', transformStyle: 'preserve-3d' }}
          >
            // Overview
          </motion.p>

          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            {/* H1 — flies in from NW, above & left of viewport */}
            <motion.div style={{ x: textX, transformStyle: 'preserve-3d' }} className="relative z-[3]">
              <motion.h1
                {...drop3D(T.name.delay, T.name.dur, -500, -250, 800, 10)}
                data-neon-header="pink"
                className="font-display font-extrabold leading-none"
                style={{
                  fontSize: 'clamp(64px, 7.5vw, 110px)',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.035em',
                  y: h1Y,
                  zIndex: 3,
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  textShadow: '0 8px 25px rgba(0,0,0,0.19), 0 3px 8px rgba(0,0,0,0.13)',
                  transformStyle: 'preserve-3d',
                }}
              >
                Nic DeMore
              </motion.h1>
            </motion.div>

            {/* Grid: left column + right video */}
            <div
              className="grid md:grid-cols-[1fr_1.5fr] gap-6 lg:gap-10 md:items-end"
              style={{ marginTop: '-8px', transformStyle: 'preserve-3d' }}
            >
              {/* Left column: h2 words + frosted card */}
              <motion.div style={{ x: textX, transformStyle: 'preserve-3d' }} className="relative z-[2]">
                {/* H2 words — grouped, fly in from W (left) */}
                <motion.div
                  {...drop3D(T.h2Group.delay, T.h2Group.dur, -400, -60, 600, 7)}
                  className="mb-6"
                  style={{ y: h2Y, transformStyle: 'preserve-3d' }}
                >
                  {words.map((word, i) => (
                    <div
                      key={word}
                      className="font-display font-black"
                      style={{
                        fontSize: 'clamp(36px, 4vw, 56px)',
                        lineHeight: '0.9',
                        color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-primary)',
                        letterSpacing: '-0.02em',
                        textShadow: '0 4px 13px rgba(0,0,0,0.1)',
                      }}
                    >
                      {word}
                    </div>
                  ))}
                </motion.div>

                {/* Frosted glass card — flies in from SW */}
                <motion.div
                  {...drop3DHeavy(T.card.delay, T.card.dur, -350, 300, 800)}
                  className="frosted-card rounded-xl p-6 inline-block"
                  style={{
                    boxShadow: '0 32px 88px rgba(0,0,0,0.18), 0 13px 38px rgba(0,0,0,0.13)',
                    maxWidth: '440px',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <motion.p
                    {...drop3D(T.subhead.delay, T.subhead.dur, -200, 0, 400, 5)}
                    className="text-lg leading-relaxed mb-6"
                    style={{ color: 'var(--color-text-secondary)', transformStyle: 'preserve-3d' }}
                  >
                    Milwaukee native. Mechanical engineer turned entrepreneur.
                    Building AI-native ventures and tools that let small teams
                    operate at scale.
                  </motion.p>

                  <div className="flex items-center gap-4" style={{ transformStyle: 'preserve-3d' }}>
                    <motion.a
                      {...drop3D(T.btnLeft.delay, T.btnLeft.dur, -150, 120, 400, 4)}
                      href="#work"
                      className="group inline-flex items-center gap-2 px-5 py-3 rounded-sm font-semibold text-sm transition-all hover:scale-[1.02]"
                      style={{
                        background: 'var(--color-accent)',
                        color: '#fff',
                        fontFamily: 'var(--font-syne)',
                        boxShadow: '0 8px 25px rgba(244, 99, 30, 0.38)',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      See my work
                      <span className="transition-transform duration-200 group-hover:translate-x-1">↓</span>
                    </motion.a>
                    <motion.a
                      {...drop3D(T.btnRight.delay, T.btnRight.dur, 0, 150, 350, 3)}
                      href="#contact"
                      className="group inline-flex items-center gap-2 px-5 py-3 rounded-sm font-medium text-sm transition-all duration-200 hero-btn-outline"
                      style={{
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border)',
                        fontFamily: 'var(--font-syne)',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      Get in touch
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right column: Video — flies in from SE (bottom-right, outside viewport) */}
              <motion.div
                style={{
                  x: videoX,
                  y: videoY,
                  zIndex: 1,
                  position: 'relative',
                  alignSelf: 'stretch',
                  transformStyle: 'preserve-3d',
                }}
                className="relative"
              >
                <motion.div
                  {...drop3DHeavy(T.video.delay, T.video.dur, 600, 400, 900)}
                  style={{ minHeight: '580px', height: '100%', transformStyle: 'preserve-3d' }}
                >
                  <HeroVideoPlayer />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
