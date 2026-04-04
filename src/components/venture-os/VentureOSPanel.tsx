"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ventures, type VentureStatus } from '@/data/ventures';
import { ventureOSFeed } from '@/data/ventureOSFeed';

const statusColors: Record<VentureStatus, string> = {
  LIVE:    '#F4631E',
  BUILD:   '#C4A45A',
  TEST:    '#4A90D9',
  QUEUE:   'var(--color-text-light)',
  STEALTH: 'var(--color-border)',
  CONCEPT: 'var(--color-text-light)',
};

const statusLabels: Record<VentureStatus, string> = {
  LIVE:    'LIVE',
  BUILD:   'BUILD',
  TEST:    'TEST',
  QUEUE:   'QUEUE',
  STEALTH: '████',
  CONCEPT: 'CONCEPT',
};

interface Props {
  onClose: () => void;
}

export function VentureOSPanel({ onClose }: Props) {
  const liveCount = ventures.filter(v => v.status === 'LIVE').length;
  const buildCount = ventures.filter(v => v.status === 'BUILD' || v.status === 'TEST').length;
  const [feedIndex, setFeedIndex] = useState(0);

  // Cycle through feed items every 4.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setFeedIndex(i => (i + 1) % ventureOSFeed.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentFeed = ventureOSFeed[feedIndex];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      style={{
        width: '280px',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      {/* Header — Venture OS label + Available for Collabs + close */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'var(--color-text-secondary)',
            textTransform: 'uppercase',
          }}
        >
          Venture OS
        </span>

        {/* Available for Collabs — sits between title and × */}
        <div className="flex items-center gap-1.5">
          <span
            className="pulse-dot inline-block rounded-full flex-shrink-0"
            style={{ width: '6px', height: '6px', background: 'rgb(34,197,94)' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '9px',
              letterSpacing: '0.06em',
              color: 'var(--color-text-secondary)',
            }}
          >
            Available for Collabs
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close Venture OS"
          className="text-xs hover:text-accent transition-colors"
          style={{
            color: 'var(--color-text-light)',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '11px',
            minWidth: '24px',
            minHeight: '24px',
          }}
        >
          ×
        </button>
      </div>

      {/* Live Feed — cycling activity item */}
      <div
        className="px-4 py-2.5 border-b overflow-hidden"
        style={{ borderColor: 'var(--color-border)', minHeight: '52px' }}
      >
        <div
          className="text-xs mb-1 flex items-center gap-1.5"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jetbrains)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          <span className="pulse-dot inline-block rounded-full flex-shrink-0" style={{ width: '6px', height: '6px', background: 'var(--color-accent)' }} />
          Activity Feed
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeed.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <p
              className="text-xs leading-snug"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-syne)', fontSize: '11px' }}
            >
              {currentFeed.event}
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-jetbrains)', fontSize: '9px' }}
            >
              {currentFeed.venture}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Ventures list */}
      <div className="py-2">
        {ventures.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="px-4 py-2.5 group"
          >
            <div className="flex items-center justify-between mb-0.5">
              {v.url ? (
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium underline-reveal transition-colors hover:text-accent"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-syne)' }}
                >
                  {v.name}
                </a>
              ) : (
                <span
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-syne)' }}
                >
                  {v.name}
                </span>
              )}
              <div className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: statusColors[v.status] }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                    color: v.status === 'LIVE' ? 'var(--color-accent)' : 'var(--color-text-light)',
                    textTransform: 'uppercase',
                  }}
                >
                  {statusLabels[v.status]}
                </span>
              </div>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '10px',
              }}
            >
              {v.description.length > 52 ? v.description.slice(0, 52) + '…' : v.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-t"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '9px',
            color: 'var(--color-text-light)',
            letterSpacing: '0.06em',
          }}
        >
          {liveCount} live · {buildCount} building
        </span>
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '9px',
            color: 'var(--color-text-light)',
          }}
        >
          {new Date().getFullYear()}
        </span>
      </div>
    </motion.div>
  );
}
