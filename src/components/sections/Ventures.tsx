"use client";

import { useState } from "react";
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
  const sign = Math.sign(offset);

  if (isMobile) {
    // Mobile: simple slide, no 3D
    return {
      x: sign * absOffset * 380,
      z: 0,
      rotateY: 0,
      scale: 1,
      opacity: absOffset === 0 ? 1 : 0,
      zIndex: ventures.length - absOffset,
      pointerEvents: absOffset === 0 ? 'auto' : 'none',
      display: absOffset > 1 ? 'none' : 'block',
    };
  }

  // Desktop: full DepthDeck 3D coverflow
  // rotateY: negative sign so left cards angle right (toward center), right cards angle left (toward center)
  const rawX = offset === 0 ? 0 : sign * Math.min(200 + (absOffset - 1) * 140, 440);

  return {
    x: rawX,
    z: -absOffset * 80,
    rotateY: offset === 0 ? 0 : -sign * Math.min(absOffset * 18, 45),
    scale: Math.max(0.65, 1 - absOffset * 0.12),
    opacity: Math.max(0.45, 1 - absOffset * 0.18),
    zIndex: ventures.length - absOffset,
    pointerEvents: absOffset > 3 ? 'none' : 'auto',
    display: absOffset > 4 ? 'none' : 'block',
  };
}

// ─── VentureCard ───────────────────────────────────────────────────────────────

function VentureCard({ venture, isActive }: { venture: Venture; isActive: boolean }) {
  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: 'var(--color-base)',
        border: `1px solid ${isActive ? 'rgba(244,99,30,0.55)' : 'var(--color-border)'}`,
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: isActive
          ? '0 24px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(244,99,30,0.2)'
          : '0 4px 16px rgba(0,0,0,0.06)',
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
              onClick={(e) => e.stopPropagation()}
            >
              Visit
              <span>→</span>
            </a>
          ) : (
            <span
              className="text-xs italic"
              style={{
                color: 'var(--color-text-light)',
                fontFamily: 'var(--font-dm-serif)',
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

// ─── Main Ventures Section ─────────────────────────────────────────────────────

export function Ventures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const CARD_WIDTH = 320;
  const CONTAINER_HEIGHT = isMobile ? 480 : 460;

  function handlePointerDown(e: React.PointerEvent) {
    setDragStart(e.clientX);
  }

  function handlePointerUp(e: React.PointerEvent) {
    const delta = e.clientX - dragStart;
    if (delta < -50 && activeIndex < ventures.length - 1) {
      setActiveIndex((i) => i + 1);
    } else if (delta > 50 && activeIndex > 0) {
      setActiveIndex((i) => i - 1);
    }
  }

  return (
    <section
      id="work"
      className="py-24 sm:py-32 lg:py-40"
      style={{ background: 'transparent', position: 'relative', overflow: 'hidden' }}
    >
      {/* Section background overlay — lets GlowingGrid show through */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(245, 241, 235, 0.78)', zIndex: 0 }}
      />

      <div className="relative" style={{ zIndex: 1 }}>
        <div className="mx-auto max-w-7xl px-6">

          {/* ── Header ──────────────────────────────────────────── */}
          <div className="mb-16">
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
              transition={{ duration: 0.55, ease: EASING_SMOOTH }}
              className="font-display font-extrabold mb-4"
              style={{
                fontSize: 'clamp(36px, 4vw, 60px)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.03em',
                marginLeft: '-12px',
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
              style={{ color: 'var(--color-text-secondary)' }}
            >
              From education platforms to AI infrastructure — each venture is a bet on building something that matters.
            </motion.p>
          </div>

          {/* ── DepthDeck Carousel ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            {/* Outer clip wrapper */}
            <div
              className="relative w-full select-none"
              style={{ overflow: 'hidden', paddingTop: '8px', paddingBottom: '8px' }}
            >
              {/* Perspective container */}
              <div
                className="relative mx-auto"
                style={{
                  perspective: '1200px',
                  perspectiveOrigin: '50% 50%',
                  transformStyle: 'preserve-3d',
                  width: isMobile ? '100%' : `${CARD_WIDTH}px`,
                  height: `${CONTAINER_HEIGHT}px`,
                  cursor: 'grab',
                }}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
              >
                {ventures.map((venture, index) => {
                  const t = getCardTransform(index, activeIndex, isMobile);
                  return (
                    <motion.div
                      key={venture.id}
                      onClick={() => {
                        if (index !== activeIndex) setActiveIndex(index);
                      }}
                      animate={{
                        x: t.x,
                        z: t.z,
                        rotateY: t.rotateY,
                        scale: t.scale,
                        opacity: t.opacity,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 30,
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: isMobile ? '0' : `calc(50% - ${CARD_WIDTH / 2}px)`,
                        width: isMobile ? '100%' : `${CARD_WIDTH}px`,
                        height: `${CONTAINER_HEIGHT}px`,
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
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
            </div>

            {/* ── Navigation Dots ─────────────────────────────────── */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {ventures.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  animate={{
                    scale: i === activeIndex ? 1 : 0.7,
                    opacity: i === activeIndex ? 1 : 0.4,
                  }}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    border: 'none',
                    background: i === activeIndex ? 'var(--color-accent)' : 'var(--color-border)',
                    cursor: 'pointer',
                    padding: 0,
                    outline: 'none',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  aria-label={`Go to venture ${i + 1}`}
                />
              ))}
            </div>

            {/* ── Venture name hint ───────────────────────────────── */}
            <div className="flex items-center justify-center mt-4">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASING_SMOOTH }}
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-light)',
                }}
              >
                {activeIndex + 1} / {ventures.length}
              </motion.span>
            </div>
          </motion.div>

          {/* ── Bottom flourish ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="h-px flex-1" style={{ background: 'var(--color-border)' }} />
            <span
              className="text-xs tracking-widest"
              style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-jetbrains)', fontSize: '10px' }}
            >
              {ventures.filter((v) => v.status === 'LIVE').length} Live ·{' '}
              {ventures.filter((v) => v.status === 'BUILD' || v.status === 'TEST').length} Building ·{' '}
              {new Date().getFullYear()} · 12×12 →
            </span>
            <div className="h-px flex-1" style={{ background: 'var(--color-border)' }} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
