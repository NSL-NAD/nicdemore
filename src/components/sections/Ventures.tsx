"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASING_PREMIUM, EASING_SMOOTH, viewportOnce } from "@/lib/motion";
import { ventures, type VentureStatus } from "@/data/ventures";

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
      className="inline-block w-2 h-2 rounded-full"
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
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium"
      style={{
        fontFamily: 'var(--font-jetbrains)',
        fontSize: '10px',
        letterSpacing: '0.06em',
        color: status === 'LIVE' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
        background: 'var(--color-surface-alt)',
        border: '1px solid var(--color-border)',
      }}
    >
      <StatusDot status={status} />
      {labels[status]}
    </span>
  );
}

function VentureCard({ venture, index }: { venture: typeof ventures[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASING_PREMIUM, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden cursor-default flex flex-col h-full"
      style={{
        border: '1px solid var(--color-border)',
        background: hovered ? 'var(--color-forest)' : 'var(--color-base)',
        transition: 'background 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      {/* Accent top line — reveals on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5"
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASING_PREMIUM }}
        style={{ background: 'var(--color-accent)', transformOrigin: 'left' }}
      />

      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3
            className="font-display font-bold text-xl leading-tight transition-colors duration-300"
            style={{ color: hovered ? '#FAF9F6' : 'var(--color-text-primary)' }}
          >
            {venture.name}
          </h3>
          <StatusBadge status={venture.status} />
        </div>

        <p
          className="text-sm leading-relaxed mb-5 transition-colors duration-300 flex-1"
          style={{ color: hovered ? 'rgba(242, 237, 229, 0.75)' : 'var(--color-text-secondary)' }}
        >
          {venture.description}
        </p>

        {/* Tags */}
        {venture.tags && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {venture.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-sm transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '10px',
                  letterSpacing: '0.06em',
                  background: hovered ? 'rgba(255,255,255,0.08)' : 'var(--color-surface)',
                  color: hovered ? 'rgba(242, 237, 229, 0.6)' : 'var(--color-text-secondary)',
                  border: `1px solid ${hovered ? 'rgba(255,255,255,0.12)' : 'var(--color-border)'}`,
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
                className="text-xs px-2 py-0.5 rounded-sm transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '10px',
                  letterSpacing: '0.06em',
                  color: hovered ? 'var(--color-accent)' : 'var(--color-accent)',
                  background: hovered ? 'rgba(244, 99, 30, 0.15)' : 'transparent',
                  border: `1px solid ${hovered ? 'rgba(244, 99, 30, 0.3)' : 'rgba(244, 99, 30, 0.25)'}`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs tracking-widest"
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '10px',
              color: hovered ? 'rgba(242,237,229,0.4)' : 'var(--color-text-light)',
            }}
          >
            {venture.year}
          </span>
          {venture.url ? (
            <a
              href={venture.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-300"
              style={{
                color: hovered ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                fontFamily: 'var(--font-syne)',
                fontSize: '12px',
              }}
            >
              Visit
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          ) : (
            <span
              className="text-xs italic"
              style={{
                color: hovered ? 'rgba(242,237,229,0.35)' : 'var(--color-text-light)',
                fontFamily: 'var(--font-dm-serif)',
                fontSize: '12px',
              }}
            >
              In development
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Ventures() {
  return (
    <section
      id="work"
      className="py-24 sm:py-32 lg:py-40"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
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
            data-neon-header="pink"
            className="font-display font-bold mb-4"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
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

        {/* Venture grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {ventures.map((v, i) => (
            <VentureCard key={v.id} venture={v} index={i} />
          ))}
        </div>

        {/* Bottom flourish */}
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
            {ventures.filter(v => v.status === 'LIVE').length} Live ·{' '}
            {ventures.filter(v => v.status === 'BUILD' || v.status === 'TEST').length} Building ·{' '}
            {new Date().getFullYear()}
          </span>
          <div className="h-px flex-1" style={{ background: 'var(--color-border)' }} />
        </motion.div>
      </div>
    </section>
  );
}
