"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpStatProps {
  end: number;
  suffix?: string;
  label: string;
}

export function CountUpStat({ end, suffix = "", label }: CountUpStatProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 1500;
    const step = 16;
    const increment = end / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [hasStarted, end]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-display font-extrabold leading-none"
        style={{
          fontSize: "clamp(40px, 5vw, 64px)",
          color: "var(--color-text-primary)",
          letterSpacing: "-0.03em",
        }}
      >
        {count}{suffix}
      </div>
      <div
        className="mt-2 uppercase"
        style={{
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-jetbrains)",
          fontSize: "10px",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </div>
    </div>
  );
}
