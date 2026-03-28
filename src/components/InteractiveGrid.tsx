"use client";

import { useEffect, useRef } from "react";

export function InteractiveGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };

    const onTouch = (e: TouchEvent) => {
      el.style.setProperty("--mx", `${e.touches[0].clientX}px`);
      el.style.setProperty("--my", `${e.touches[0].clientY}px`);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return <div ref={ref} className="interactive-grid" aria-hidden="true" />;
}
