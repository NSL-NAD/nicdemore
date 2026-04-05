"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ease } from "@/lib/motion";
import { RetroToggle } from "@/components/RetroToggle";
import { NeonScrollHandler } from "@/components/NeonScrollHandler";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "skillset", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Ventures" },
  { id: "architecture", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// 3D perspective entrance — elements fly in from outside viewport
const LAND_EASE = [0.12, 0.9, 0.25, 1] as const;

// Each nav element has unique entry direction + timing
// Logo from NW, center links from N (scattered), right items from NE
// Varied durations for organic feel. Overlaps with hero build.
// Compressed to 5s total — nav starts earlier, overlapping with hero build
const NAV_ENTRIES: Array<{ delay: number; dur: number; x: number; y: number; z: number; blur: number }> = [
  { delay: 0.5, dur: 2.0, x: -200, y: -120, z: 500, blur: 6 },   // 0: Logo — from NW, starts with h1
  { delay: 0.9, dur: 1.4, x: -40,  y: -100, z: 400, blur: 4 },   // 1: Overview
  { delay: 1.3, dur: 1.1, x: 0,    y: -80,  z: 350, blur: 3 },   // 2: Journey
  { delay: 1.15, dur: 1.2, x: 10,  y: -90,  z: 365, blur: 3 },   // 3: Skills
  { delay: 1.0, dur: 1.5, x: 20,   y: -100, z: 380, blur: 4 },   // 4: Ventures
  { delay: 1.5, dur: 1.2, x: 40,   y: -90,  z: 360, blur: 3 },   // 5: Architecture
  { delay: 1.1, dur: 1.3, x: 60,   y: -80,  z: 340, blur: 3 },   // 6: Contact
  { delay: 1.4, dur: 1.4, x: 80,   y: -100, z: 380, blur: 4 },   // 7: About
  { delay: 0.8, dur: 1.8, x: 150,  y: -90,  z: 420, blur: 5 },   // 8: Available indicator
  { delay: 1.2, dur: 1.6, x: 200,  y: -110, z: 450, blur: 5 },   // 9: Retro toggle — from NE
  { delay: 1.4, dur: 1.1, x: 100,  y: -80,  z: 350, blur: 4 },   // 10: Mobile hamburger
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isResumePage = pathname.startsWith("/resume");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    const ids = sections.map((s) => s.id);
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [isHome]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (isHome) {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setMobileOpen(false);
        }
      } else {
        setMobileOpen(false);
      }
    },
    [isHome]
  );

  const navDrop3D = (index: number) => {
    const e = NAV_ENTRIES[Math.min(index, NAV_ENTRIES.length - 1)];
    return {
      initial: {
        x: e.x,
        y: e.y,
        z: e.z,
        filter: `blur(${e.blur}px)`,
      },
      animate: {
        x: 0,
        y: 0,
        z: 0,
        filter: 'blur(0px)',
        transition: {
          duration: e.dur,
          ease: LAND_EASE,
          delay: e.delay,
          filter: { duration: e.dur * 0.7, delay: e.delay + e.dur * 0.1 },
        },
      },
    };
  };

  return (
    <>
      <NeonScrollHandler />
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 nav-header-frost backdrop-blur-md border-b"
        style={{
          background: 'color-mix(in srgb, var(--color-base) 85%, transparent)',
          borderColor: 'var(--color-border)',
          perspective: '1200px',
        }}
      >
        <nav
          className="mx-auto px-12 h-16 flex items-center justify-between"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Logo + Coordinates */}
          <motion.div
            {...navDrop3D(0)}
            className="flex items-center gap-3"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Link
              href="/"
              className="font-display font-bold text-base tracking-tight transition-colors"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <span className="text-accent">N</span>
              <span>ic DeMore</span>
            </Link>
            <div
              className="hidden md:flex items-center gap-1"
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '9px',
                letterSpacing: '0.08em',
                color: 'var(--color-text-secondary)',
                opacity: 0.55,
              }}
            >
              <span>📍</span>
              <span>43.0389° N, 87.9065° W</span>
            </div>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1" style={{ transformStyle: 'preserve-3d' }}>
            {sections.map((section, i) => {
              const isActive = isHome && activeSection === section.id;
              const href = isHome ? `#${section.id}` : `/#${section.id}`;

              return (
                <motion.a
                  key={section.id}
                  {...navDrop3D(i + 1)}
                  href={href}
                  onClick={(e) => handleNavClick(e, section.id)}
                  className={`relative px-3 py-2 text-xs tracking-widest uppercase transition-all duration-200 nav-link-hover ${
                    isActive
                      ? "text-primary font-bold nav-active"
                      : "text-muted font-medium"
                  }`}
                  style={{
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {section.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-px"
                      style={{ background: 'var(--color-accent)' }}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </motion.a>
              );
            })}

            {/* About page link */}
            <motion.div {...navDrop3D(sections.length + 1)} className="flex items-center" style={{ transformStyle: 'preserve-3d' }}>
              <Link
                href="/about"
                className={`relative px-3 py-2 text-xs tracking-widest uppercase transition-all duration-200 nav-link-hover ${
                  pathname === '/about' ? 'text-primary font-bold' : 'text-muted font-medium'
                }`}
                style={{
                  color: pathname === '/about' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                }}
              >
                About
                {pathname === '/about' && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-px"
                    style={{ background: 'var(--color-accent)' }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            </motion.div>

            {/* Retro toggle */}
            {!isResumePage && (
              <motion.div {...navDrop3D(sections.length + 2)} className="flex items-center ml-1" style={{ transformStyle: 'preserve-3d' }}>
                <RetroToggle />
              </motion.div>
            )}
          </div>

          {/* Mobile: RetroToggle + Hamburger */}
          <motion.div
            {...navDrop3D(10)}
            className="md:hidden flex items-center gap-3"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {!isResumePage && <RetroToggle />}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 block"
                style={{ background: 'var(--color-text-primary)' }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-0.5 block"
                style={{ background: 'var(--color-text-primary)' }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 block"
                style={{ background: 'var(--color-text-primary)' }}
              />
            </button>
          </motion.div>
        </nav>

        {/* Mobile overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease }}
              className="fixed inset-0 top-16 backdrop-blur-md md:hidden z-30"
              style={{ background: 'color-mix(in srgb, var(--color-base) 96%, transparent)' }}
              onClick={() => setMobileOpen(false)}
            >
              <nav className="flex flex-col items-center justify-center h-full gap-8" onClick={e => e.stopPropagation()}>
                {sections.map((section) => {
                  const href = isHome ? `#${section.id}` : `/#${section.id}`;
                  return (
                    <a
                      key={section.id}
                      href={href}
                      onClick={(e) => handleNavClick(e, section.id)}
                      className="font-display text-2xl font-bold transition-colors hover:text-accent"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {section.label}
                    </a>
                  );
                })}
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-2xl font-bold transition-colors hover:text-accent"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  About
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
