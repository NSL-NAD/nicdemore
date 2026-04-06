"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { EASING_PREMIUM, EASING_SMOOTH, viewportOnce } from "@/lib/motion";
import { ventures, type VentureStatus, type Venture } from "@/data/ventures";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// ─── Status helpers ────────────────────────────────────────────────────────────

function StatusDot({ status }: { status: VentureStatus }) {
  const colors: Record<VentureStatus, string> = {
    LIVE:    '#F4631E',
    BUILD:   '#C4A45A',
    TEST:    '#4A90D9',
    QUEUE:   'var(--color-text-light)',
    STEALTH: 'var(--color-border)',
    CONCEPT: 'var(--color-text-light)',
  };
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
      style={{ background: colors[status] }}
    />
  );
}

function StatusBadge({ status }: { status: VentureStatus }) {
  const labels: Record<VentureStatus, string> = {
    LIVE:    'Live',
    BUILD:   'Building',
    TEST:    'Testing',
    QUEUE:   'Queued',
    STEALTH: '████████',
    CONCEPT: 'Concept',
  };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium flex-shrink-0"
      style={{
        fontFamily: 'var(--font-jetbrains)',
        fontSize: '10px',
        letterSpacing: '0.06em',
        color: status === 'LIVE' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
        background: 'var(--color-surface-alt)',
        border: '1px solid var(--color-border)',
        whiteSpace: 'nowrap',
      }}
    >
      <StatusDot status={status} />
      {labels[status]}
    </span>
  );
}

// ─── Card transform calculator ─────────────────────────────────────────────────

interface CardTransform {
  x: number;
  z: number;
  rotateY: number;
  scale: number;
  opacity: number;
  zIndex: number;
  pointerEvents: 'auto' | 'none';
  display: 'block' | 'none';
}

function getCardTransform(
  index: number,
  activeIndex: number,
  isMobile: boolean
): CardTransform {
  const offset = index - activeIndex;
  const absOffset = Math.abs(offset);
  const sign = offset === 0 ? 0 : Math.sign(offset);

  if (isMobile) {
    return {
      x: sign * absOffset * 340,
      z: 0,
      rotateY: 0,
      scale: 1,
      opacity: absOffset === 0 ? 1 : 0,
      zIndex: ventures.length - absOffset,
      pointerEvents: absOffset === 0 ? 'auto' : 'none',
      display: absOffset > 1 ? 'none' : 'block',
    };
  }

  if (absOffset > 3) {
    return {
      x: sign * 1000,
      z: -320,
      rotateY: -sign * 50,
      scale: 0.5,
      opacity: 0,
      zIndex: 0,
      pointerEvents: 'none',
      display: 'none',
    };
  }

  const OFFSETS: number[] = [0,   330,  570,  750];
  const SCALES:  number[] = [1,  0.84, 0.70, 0.58];
  const ROTATES: number[] = [0,    20,   32,   40];

  return {
    x:          sign * OFFSETS[absOffset],
    z:          -absOffset * 100,
    rotateY:    absOffset === 0 ? 0 : -sign * ROTATES[absOffset],
    scale:      SCALES[absOffset],
    opacity:    1,
    zIndex:     ventures.length - absOffset,
    pointerEvents: absOffset > 2 ? 'none' : 'auto',
    display:    'block',
  };
}

// ─── VentureCard — with 3D tilt + orange cursor glare ─────────────────────────

function VentureCard({ venture, isActive }: { venture: Venture; isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // 3D tilt springs (same mechanic as Journey ParallaxCard)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const SPRING = { stiffness: 180, damping: 22, mass: 0.5 };
  const rotateX = useSpring(rawY, SPRING);
  const rotateY = useSpring(rawX, SPRING);
  const hoverScale = useSpring(1, SPRING);
  const TILT = 4;

  // Orange cursor-tracking glare
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  const glareBackground = useTransform(
    [glareX, glareY] as MotionValue<number>[],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(244,99,30,0.18) 0%, transparent 62%)`
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top) / rect.height;
    const nx = (cx - 0.5) * 2;
    const ny = (cy - 0.5) * 2;
    rawX.set(nx * TILT);
    rawY.set(-ny * TILT);
    glareX.set(cx * 100);
    glareY.set(cy * 100);
  }

  function handleMouseEnter() {
    glareOpacity.set(1);
    setHovered(true);
    hoverScale.set(1.012);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    glareOpacity.set(0);
    setHovered(false);
    hoverScale.set(1);
  }

  const borderColor = isActive
    ? 'rgba(244,99,30,0.55)'
    : hovered
    ? 'rgba(244,99,30,0.38)'
    : 'rgba(0,0,0,0.08)';

  const shadow = isActive
    ? '0 20px 56px rgba(0,0,0,0.50), 0 0 0 1px rgba(244,99,30,0.35)'
    : hovered
    ? '0 16px 48px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.14)'
    : 'none';

  return (
    // Perspective wrapper — needed for rotateX/rotateY to render in 3D
    <div style={{ perspective: '800px', height: '100%' }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col retro-card"
        style={{
          rotateX,
          rotateY,
          scale: hoverScale,
          transformStyle: 'preserve-3d',
          height: '100%',
          position: 'relative',
          background: 'var(--color-base)',
          border: `1px solid ${borderColor}`,
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: shadow,
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        {/* Orange cursor glare overlay */}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            pointerEvents: 'none',
            opacity: glareOpacity,
            background: glareBackground,
            zIndex: 10,
          }}
        />

        <div className="relative p-6 flex flex-col flex-1" style={{ zIndex: 11 }}>
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <h3
              className="font-display font-bold text-xl leading-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {venture.name}
            </h3>
            <StatusBadge status={venture.status} />
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-5 flex-1"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {venture.description}
          </p>

          {/* Tags */}
          {venture.tags && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {venture.tags.map((tag) => (
                <motion.span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-sm cursor-default"
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '10px',
                    letterSpacing: '0.06em',
                    background: 'transparent',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                  }}
                  whileHover={{
                    y: -2,
                    backgroundColor: 'rgba(244,99,30,0.14)',
                    color: '#F4631E',
                    borderColor: 'rgba(244,99,30,0.45)',
                    boxShadow: '0 0 10px rgba(244,99,30,0.22)',
                  }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}

          {/* Stack */}
          {venture.stack && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {venture.stack.map((tech) => (
                <motion.span
                  key={tech}
                  className="text-xs px-2 py-0.5 rounded-sm cursor-default"
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '10px',
                    letterSpacing: '0.06em',
                    color: 'var(--color-accent)',
                    background: 'transparent',
                    border: '1px solid rgba(244, 99, 30, 0.25)',
                  }}
                  whileHover={{
                    y: -2,
                    backgroundColor: 'rgba(244,99,30,0.12)',
                    borderColor: 'rgba(244,99,30,0.55)',
                    boxShadow: '0 0 10px rgba(244,99,30,0.22)',
                  }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center justify-between mt-auto pt-2">
            <span
              className="text-xs tracking-widest"
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '10px',
                color: 'var(--color-text-light)',
              }}
            >
              {venture.year}
            </span>
            {venture.url ? (
              <a
                href={venture.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 hover:text-[var(--color-accent)]"
                style={{
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-syne)',
                  fontSize: '12px',
                }}
                onClick={(e) => { if (isActive) e.stopPropagation(); }}
              >
                Visit →
              </a>
            ) : (
              <span
                className="text-xs"
                style={{
                  color: 'var(--color-text-light)',
                  fontFamily: 'var(--font-syne)',
                  fontSize: '12px',
                }}
              >
                In development
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Arrow button ──────────────────────────────────────────────────────────────

function ArrowButton({
  dir,
  onClick,
  disabled,
}: {
  dir: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? 'Previous venture' : 'Next venture'}
      onPointerDown={(e) => e.stopPropagation()}
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.92 }}
      transition={{ duration: 0.15 }}
      style={{
        position: 'absolute',
        // calc(50% - 24px) centers the 48px button without using transform,
        // which Framer Motion owns — using transform: translateY here gets
        // dropped the moment whileHover applies scale.
        top: 'calc(50% - 24px)',
        ...(dir === 'left' ? { left: '20px' } : { right: '20px' }),
        zIndex: 20,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: disabled ? 'rgba(244,99,30,0.20)' : 'var(--color-accent)',
        border: 'none',
        color: disabled ? 'rgba(255,255,255,0.30)' : '#fff',
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        lineHeight: 1,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        boxShadow: disabled ? 'none' : '0 4px 20px rgba(244,99,30,0.45)',
      }}
    >
      {dir === 'left' ? '←' : '→'}
    </motion.button>
  );
}

// ─── Main Ventures Section ─────────────────────────────────────────────────────

export function Ventures() {
  // GAS Studio is index 2 — start centered on it
  const [activeIndex, setActiveIndex] = useState(2);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const sectionRef  = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Cooldown lock — fires once per trackpad gesture, ignores rapid repeat events
  const wheelLocked = useRef(false);

  // Scroll-driven parallax — container drifts slowly against page scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const containerY = useTransform(scrollYProgress, [0, 1], [28, -28]);

  const CARD_WIDTH  = isMobile ? 300 : 360;
  const CARD_HEIGHT = isMobile ? 400 : 440;
  const CAROUSEL_H  = isMobile ? 420 : 460;

  const prev = useCallback(() => setActiveIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setActiveIndex((i) => Math.min(ventures.length - 1, i + 1)), []);

  function handlePointerDown(e: React.PointerEvent) {
    if ((e.target as HTMLElement).closest('button')) return;
    setDragStart(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (dragStart === null) return;
    const delta = e.clientX - dragStart;
    if (delta < -50) next();
    else if (delta > 50) prev();
    setDragStart(null);
  }

  // Native (non-passive) wheel listener on the carousel — lets us call
  // preventDefault() to stop Chrome from treating horizontal swipe as Back/Forward.
  // React's onWheel is always passive and cannot call preventDefault.
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      if (wheelLocked.current) return;
      if (Math.abs(e.deltaX) < 5) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) * 3) return;
      e.preventDefault(); // claim the gesture before Chrome's Back/Forward kicks in
      if (e.deltaX > 0) next();
      else prev();
      wheelLocked.current = true;
      setTimeout(() => { wheelLocked.current = false; }, 650);
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, [next, prev]);

  const liveCount    = ventures.filter((v) => v.status === 'LIVE').length;
  const buildCount   = ventures.filter((v) => v.status === 'BUILD' || v.status === 'TEST').length;
  const conceptCount = ventures.filter((v) => v.status === 'CONCEPT' || v.status === 'QUEUE').length;

  return (
    <section
      ref={sectionRef}
      id="work"
      className="pt-0 pb-0"
      style={{
        background: 'transparent',
        position: 'relative',
        zIndex: 20,
        // Pull Architecture section up behind the bottom of this layer
        marginBottom: isMobile ? '-100px' : '-120px',
      }}
    >
        {/* Parallax wrapper — moves the entire green card at a different scroll rate */}
        <motion.div style={{ y: containerY }}>
          {/* Entrance animation wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{
              background: 'var(--color-forest)',
              borderRadius: '24px 24px 0 0',
              boxShadow: '0 24px 64px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12)',
              overflow: 'clip',
            }}
          >

            {/* ── Header ──────────────────────────────────────────── */}
            <div className="pt-12 px-5 md:px-12 mb-10">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: EASING_SMOOTH }}
                className="block text-xs tracking-widest uppercase mb-4 section-label"
                style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '11px' }}
              >
                // Ventures
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.55, ease: EASING_PREMIUM }}
                data-neon-header="pink"
                className="font-display font-extrabold mb-4"
                style={{
                  fontSize: 'clamp(36px, 4vw, 60px)',
                  color: 'rgba(255,255,255,0.95)',
                  letterSpacing: '-0.03em',
                }}
              >
                What I&apos;m Building
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.55, ease: EASING_PREMIUM, delay: 0.1 }}
                className="max-w-2xl text-lg leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.62)' }}
              >
                From education platforms to AI infrastructure — each venture is a bet on building something that matters.
              </motion.p>
            </div>

            {/* ── DepthDeck Carousel ──────────────────────────────── */}
            <div
              ref={carouselRef}
              className="relative select-none"
              style={{ height: `${CAROUSEL_H}px`, touchAction: 'pan-y' }}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            >
              <ArrowButton dir="left" onClick={prev} disabled={activeIndex === 0} />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  perspective: '1000px',
                  perspectiveOrigin: '50% 50%',
                }}
              >
                {ventures.map((venture, index) => {
                  const t = getCardTransform(index, activeIndex, isMobile);
                  return (
                    <motion.div
                      key={venture.id}
                      onClick={() => { if (index !== activeIndex) setActiveIndex(index); }}
                      animate={{
                        x: t.x,
                        z: t.z,
                        rotateY: t.rotateY,
                        scale: t.scale,
                        opacity: t.opacity,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 240,
                        damping: 24,
                        mass: 0.9,
                      }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: isMobile ? '0' : `calc(50% - ${CARD_WIDTH / 2}px)`,
                        width: isMobile ? '100%' : `${CARD_WIDTH}px`,
                        height: `${CARD_HEIGHT}px`,
                        padding: isMobile ? '0 56px' : undefined,
                        boxSizing: isMobile ? 'border-box' as const : undefined,
                        marginTop: `-${CARD_HEIGHT / 2}px`,
                        transformStyle: 'preserve-3d',
                        cursor: index !== activeIndex ? 'pointer' : 'default',
                        zIndex: t.zIndex,
                        display: t.display,
                        pointerEvents: t.pointerEvents,
                      }}
                    >
                      <VentureCard venture={venture} isActive={index === activeIndex} />
                    </motion.div>
                  );
                })}
              </div>

              <ArrowButton dir="right" onClick={next} disabled={activeIndex === ventures.length - 1} />
            </div>

            {/* ── Dots + Status bar ─────────────────────────────────── */}
            <div className="px-5 md:px-12 pb-12 pt-6">
              <div className="flex items-center justify-center gap-2 mb-6">
                {ventures.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    animate={{
                      scale: i === activeIndex ? 1.25 : 0.8,
                      opacity: i === activeIndex ? 1 : 0.4,
                    }}
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      border: 'none',
                      background: i === activeIndex ? 'var(--color-accent)' : 'rgba(255,255,255,0.50)',
                      cursor: 'pointer',
                      padding: 0,
                      outline: 'none',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    aria-label={`Go to venture ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.10)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    color: 'rgba(255,255,255,0.42)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {liveCount} Live
                  {' · '}
                  {buildCount} Building
                  {conceptCount > 0 && ` · ${conceptCount} Concept`}
                  {' · '}
                  12×12
                </span>
                <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.10)' }} />
              </div>
            </div>

          </motion.div>
        </motion.div>
    </section>
  );
}
