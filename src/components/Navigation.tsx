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
  { id: "skillset", label: "My Skillset" },
  { id: "work", label: "Ventures" },
  { id: "architecture", label: "Architecture" },
  { id: "contact", label: "Contact" },
];

// Cinematic entrance — nav drops in last, after hero elements
const Z_DROP_EASE = [0.16, 1, 0.3, 1] as const;

// Randomized nav timing — elements land alongside hero elements
// Logo lands with h2 (~1.2s), links scatter across 1.5-3.5s window
// Durations vary so landings feel organic
const NAV_TIMINGS = [
  { delay: 1.2, dur: 1.4 },  // 0: Logo + coords — lands with h2
  { delay: 1.8, dur: 1.0 },  // 1: Overview link
  { delay: 2.3, dur: 0.8 },  // 2: My Skillset — fast
  { delay: 1.9, dur: 1.2 },  // 3: Ventures
  { delay: 2.6, dur: 0.9 },  // 4: Architecture — lands with buttons
  { delay: 2.1, dur: 1.1 },  // 5: Contact
  { delay: 2.4, dur: 1.0 },  // 6: About
  { delay: 1.6, dur: 1.5 },  // 7: Available indicator — slow, lands with card
  { delay: 2.0, dur: 1.3 },  // 8: Retro toggle — lands with card
  { delay: 2.5, dur: 0.9 },  // 9: Mobile hamburger
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

  const navItemDrop = (index: number) => {
    const t = NAV_TIMINGS[Math.min(index, NAV_TIMINGS.length - 1)];
    return {
      initial: { opacity: 0, scale: 1.12, filter: 'blur(3px)' },
      animate: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration: t.dur,
          ease: Z_DROP_EASE,
          delay: t.delay,
          opacity: { duration: t.dur * 0.5, delay: t.delay },
          filter: { duration: t.dur * 0.6, delay: t.delay },
        },
      },
    };
  };

  return (
    <>
      <NeonScrollHandler />
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md border-b"
            : "bg-transparent"
        }`}
        style={scrolled ? {
          background: 'color-mix(in srgb, var(--color-base) 85%, transparent)',
          borderColor: 'var(--color-border)',
        } : undefined}
      >
        <nav className="mx-auto px-12 h-16 flex items-center justify-between">
          {/* Logo + Coordinates */}
          <motion.div
            {...navItemDrop(0)}
            className="flex items-center gap-3"
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
          <div className="hidden md:flex items-center gap-1">
            {sections.map((section, i) => {
              const isActive = isHome && activeSection === section.id;
              const href = isHome ? `#${section.id}` : `/#${section.id}`;

              return (
                <motion.a
                  key={section.id}
                  {...navItemDrop(i + 1)}
                  href={href}
                  onClick={(e) => handleNavClick(e, section.id)}
                  className={`relative px-3 py-2 text-xs tracking-widest uppercase transition-all duration-200 nav-link-hover ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-muted font-medium"
                  }`}
                  style={{
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
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
            <motion.div {...navItemDrop(sections.length + 1)}>
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

            {/* Available for ventures indicator */}
            <motion.div
              {...navItemDrop(sections.length + 2)}
              className="hidden md:flex items-center gap-2 mr-3"
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'rgb(34,197,94)',
                  flexShrink: 0,
                  animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '10px',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-secondary)',
                }}
              >
                Available for ventures
              </span>
            </motion.div>

            {/* Retro toggle — excluded from resume pages */}
            {!isResumePage && (
              <motion.div {...navItemDrop(sections.length + 3)} className="ml-1">
                <RetroToggle />
              </motion.div>
            )}
          </div>

          {/* Mobile: RetroToggle + Hamburger */}
          <motion.div
            {...navItemDrop(0)}
            className="md:hidden flex items-center gap-3"
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
