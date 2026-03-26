"use client";
import { useRef, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export function MagneticButton({ children, className, style, href, onClick, ...rest }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    if (dist < 100) {
      x.set((e.clientX - cx) * 0.25);
      y.set((e.clientY - cy) * 0.25);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.div
      ref={ref}
      style={{ x: isMobile ? 0 : x, y: isMobile ? 0 : y, display: 'inline-flex', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} {...(rest as Record<string, unknown>)}>
        {inner}
      </a>
    );
  }

  return (
    <button onClick={onClick} {...(rest as Record<string, unknown>)}>
      {inner}
    </button>
  );
}
