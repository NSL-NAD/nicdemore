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
        <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-bold text-base tracking-tight transition-colors"
            style={{ color: 'var(--color-text-primary)' }}
          >
            <span className="text-accent">N</span>
            <span>ic DeMore</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((section) => {
              const isActive = isHome && activeSection === section.id;
              const href = isHome ? `#${section.id}` : `/#${section.id}`;

              return (
                <a
                  key={section.id}
                  href={href}
                  onClick={(e) => handleNavClick(e, section.id)}
                  className={`relative px-3 py-2 text-xs font-medium tracking-widest uppercase underline-reveal transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-muted hover:text-primary"
                  }`}
                  style={{
                    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
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
                </a>
              );
            })}

            {/* About page link */}
            <Link
              href="/about"
              className={`relative px-3 py-2 text-xs font-medium tracking-widest uppercase underline-reveal transition-colors ${
                pathname === '/about' ? 'text-primary' : 'text-muted hover:text-primary'
              }`}
              style={{
                color: pathname === '/about' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
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

            {/* Retro toggle — excluded from resume pages */}
            {!isResumePage && (
              <div className="ml-3">
                <RetroToggle />
              </div>
            )}
          </div>

          {/* Mobile: RetroToggle + Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            {!isResumePage && <RetroToggle />}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 block"
                style={{ background: 'var(--color-text-primary)' }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-0.5 block"
                style={{ background: 'var(--color-text-primary)' }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 block"
                style={{ background: 'var(--color-text-primary)' }}
              />
            </button>
          </div>
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
            >
              <nav className="flex flex-col items-center justify-center h-full gap-8">
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
