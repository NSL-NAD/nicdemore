"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
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

  // Desktop: flanking cards have full opacity — depth via scale + rotation only
  const OFFSETS: number[] = [0,   330,  570,  750];
  const SCALES:  number[] = [1,  0.84, 0.70, 0.58];
  const ROTATES: number[] = [0,    20,   32,   40];

  return {
    x:          sign * OFFSETS[absOffset],
    z:          -absOffset * 100,
    rotateY:    absOffset === 0 ? 0 : -sign * ROTATES[absOffset],
    scale:      SCALES[absOffset],
    opacity:    1,   // no opacity reduction on flanking cards
    zIndex:     ventures.length - absOffset,
    pointerEvents: absOffset > 2 ? 'none' : 'auto',
    display:    'block',
  };
}

// ─── VentureCard ───────────────────────────────────────────────────────────────

function VentureCard({ venture, isActive }: { venture: Venture; isActive: boolean }) {
  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: 'var(--color-base)',
        border: `1px solid ${isActive ? 'rgba(244,99,30,0.55)' : 'rgba(0,0,0,0.08)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        // Shadow lives here (on the card itself) so overflow:clip on parent doesn't clip it
        boxShadow: isActive
          ? '0 20px 56px rgba(0,0,0,0.50), 0 0 0 1px rgba(244,99,30,0.35), 0 0 32px rgba(244,99,30,0.14)'
          : 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Active accent top bar */}
      <div
        style={{
          height: '2px',
          background: 'var(--color-accent)',
          transformOrigin: 'left',
          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      />

      <div className="p-6 flex flex-col flex-1">
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
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-sm"
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '10px',
                  letterSpacing: '0.06em',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Stack */}
        {venture.stack && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {venture.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-0.5 rounded-sm"
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '10px',
                  letterSpacing: '0.06em',
                  color: 'var(--color-accent)',
                  background: 'transparent',
                  border: '1px solid rgba(244, 99, 30, 0.25)',
                }}
              >
                {tech}
              </span>
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
      whileHover={disabled ? {} : { scale: 1.08, backgroundColor: 'rgba(255,255,255,0.18)' }}
      whileTap={disabled ? {} : { scale: 0.94 }}
      transition={{ duration: 0.15 }}
      style={{
        position: 'absolute',
        top: '50%',
        ...(dir === 'left' ? { left: '20px' } : { right: '20px' }),
        transform: 'translateY(-50%)',
        zIndex: 20,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: disabled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.10)',
        border: `1px solid ${disabled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.22)'}`,
        color: disabled ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.82)',
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        lineHeight: 1,
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {dir === 'left' ? '←' : '→'}
    </motion.button>
  );
}

// ─── Main Ventures Section ─────────────────────────────────────────────────────

export function Ventures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const CARD_WIDTH  = isMobile ? 300 : 360;
  const CARD_HEIGHT = isMobile ? 460 : 440;
  const CAROUSEL_H  = isMobile ? 480 : 460;

  const prev = useCallback(() => setActiveIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setActiveIndex((i) => Math.min(ventures.length - 1, i + 1)), []);

  function handlePointerDown(e: React.PointerEvent) {
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

  function handleWheel(e: React.WheelEvent) {
    // Only respond to intentional horizontal swipes (deltaX must dominate)
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    wheelAccum.current += e.deltaX;
    if (wheelTimer.current) clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(() => {
      if (wheelAccum.current > 60) next();
      else if (wheelAccum.current < -60) prev();
      wheelAccum.current = 0;
    }, 80);
  }

  // Status bar counts
  const liveCount    = ventures.filter((v) => v.status === 'LIVE').length;
  const buildCount   = ventures.filter((v) => v.status === 'BUILD' || v.status === 'TEST').length;
  const conceptCount = ventures.filter((v) => v.status === 'CONCEPT' || v.status === 'QUEUE').length;

  return (
    <section
      id="work"
      className="pt-0 pb-0"
      style={{ background: 'transparent', position: 'relative' }}
    >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          style={{
            background: 'var(--color-forest)',
            borderRadius: 0,
            // overflow:clip clips cards at edge without creating a stacking context
            overflow: 'clip',
          }}
        >

          {/* ── Header ──────────────────────────────────────────── */}
          <div className="pt-12 px-12 mb-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: EASING_SMOOTH }}
              className="block text-xs tracking-widest uppercase mb-4"
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
            className="relative select-none"
            style={{ height: `${CAROUSEL_H}px` }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onWheel={handleWheel}
          >
            {/* Left arrow */}
            <ArrowButton dir="left" onClick={prev} disabled={activeIndex === 0} />

            {/* Perspective container — cards absolutely positioned inside */}
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

            {/* Right arrow */}
            <ArrowButton dir="right" onClick={next} disabled={activeIndex === ventures.length - 1} />
          </div>

          {/* ── Dots + Status bar ─────────────────────────────────── */}
          <div className="px-12 pb-12 pt-6">

            {/* Navigation dots */}
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

            {/* Status bar */}
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
                {activeIndex + 1} / {ventures.length}
                {' · '}
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
    </section>
  );
}
