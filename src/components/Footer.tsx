"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { VaporwaveSun } from "@/components/VaporwaveSun";
import { useRetro } from "@/contexts/RetroContext";

export function Footer() {
  const { isRetro } = useRetro();
  const footerRef = useRef<HTMLElement>(null);

  // Parallax reveal: footer content rises from 60px below as it enters the viewport,
  // giving the feel of emerging from behind the Contact card above it
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "start 0.5"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <footer
      ref={footerRef}
      className="border-t py-12 sm:py-16"
      style={{
        background: '#1C1917',
        borderColor: 'rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        zIndex: 1,
        ...(isRetro ? { paddingBottom: '160px' } : {}),
      }}
    >
      {/* Solid cover to guarantee grid canvas is hidden behind footer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#1C1917',
          zIndex: 0,
        }}
      />
      <VaporwaveSun />
      <motion.div
        style={{ y: contentY, position: 'relative', zIndex: 2 }}
        className="mx-auto max-w-7xl px-6"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {/* GAS dot mark */}
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: '#F4631E' }}
                aria-hidden="true"
              />
              <Link
                href="/"
                className="font-display font-bold text-base transition-colors hover:text-accent"
                style={{ color: '#FAF9F6', fontFamily: 'var(--font-syne)' }}
              >
                Nic DeMore
              </Link>
            </div>
            <p
              className="text-sm"
              style={{
                color: 'rgba(250, 249, 246, 0.4)',
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '11px',
                letterSpacing: '0.06em',
              }}
            >
              Builder. Engineer. Founder. — Milwaukee, WI
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-5 text-sm" style={{ color: 'rgba(250,249,246,0.4)' }}>
            <a
              href="mailto:nademore@gmail.com"
              className="transition-colors hover:text-accent"
              style={{ color: 'rgba(250,249,246,0.4)', fontFamily: 'var(--font-syne)', fontSize: '13px' }}
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/nic-demore"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
              style={{ color: 'rgba(250,249,246,0.4)', fontFamily: 'var(--font-syne)', fontSize: '13px' }}
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/nicdemore/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
              style={{ color: 'rgba(250,249,246,0.4)', fontFamily: 'var(--font-syne)', fontSize: '13px' }}
            >
              Instagram
            </a>
            <a
              href="https://goodatscale.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
              style={{ color: 'rgba(250,249,246,0.4)', fontFamily: 'var(--font-syne)', fontSize: '13px' }}
            >
              GAS Studio
            </a>
            <Link
              href="/privacy"
              className="transition-colors hover:text-accent"
              style={{ color: 'rgba(250,249,246,0.4)', fontFamily: 'var(--font-syne)', fontSize: '13px' }}
            >
              Privacy
            </Link>
          </div>
        </div>

        <div
          className="pt-6 border-t flex items-center justify-between"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <p
            className="text-xs"
            style={{
              color: 'rgba(250,249,246,0.25)',
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '10px',
              letterSpacing: '0.04em',
            }}
          >
            &copy; {new Date().getFullYear()} Nic DeMore / Good at Scale Studio. All rights reserved.
          </p>
          <p
            className="text-xs hidden sm:block"
            style={{
              color: 'rgba(250,249,246,0.2)',
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '10px',
              letterSpacing: '0.04em',
            }}
          >
            Always do your best.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
