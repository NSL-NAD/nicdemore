"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ease } from "@/lib/motion";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "architecture", label: "Architecture" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-line/50"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg text-ink hover:text-accent transition-colors"
        >
          Nic DeMore
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
                className={`relative px-3 py-2 text-sm transition-colors ${
                  isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {section.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            className="w-5 h-0.5 bg-ink block"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-5 h-0.5 bg-ink block"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            className="w-5 h-0.5 bg-ink block"
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            className="fixed inset-0 top-16 bg-background/95 backdrop-blur-md md:hidden z-30"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {sections.map((section) => {
                const href = isHome ? `#${section.id}` : `/#${section.id}`;
                return (
                  <a
                    key={section.id}
                    href={href}
                    onClick={(e) => handleNavClick(e, section.id)}
                    className="font-display text-2xl text-ink hover:text-accent transition-colors"
                  >
                    {section.label}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
