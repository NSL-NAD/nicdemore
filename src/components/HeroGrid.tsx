"use client";

import { useEffect, useRef, useCallback } from "react";

const DOT_SPACING = 32;
const DOT_BASE_RADIUS = 1;
const DOT_MAX_RADIUS = 3.5;
const GLOW_RADIUS = 200;
const BASE_OPACITY = 0.12;
const MAX_OPACITY = 0.6;
const ACCENT_COLOR = { r: 244, g: 99, b: 30 }; // matches --color-accent

export function HeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    const cols = Math.ceil(w / DOT_SPACING) + 1;
    const rows = Math.ceil(h / DOT_SPACING) + 1;
    const offsetX = (w % DOT_SPACING) / 2;
    const offsetY = (h % DOT_SPACING) / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * DOT_SPACING;
        const y = offsetY + row * DOT_SPACING;
        const dx = x - mx;
        const dy = y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const t = Math.max(0, 1 - dist / GLOW_RADIUS);
        const eased = t * t * t; // cubic ease for smooth falloff

        const radius = DOT_BASE_RADIUS + (DOT_MAX_RADIUS - DOT_BASE_RADIUS) * eased;
        const opacity = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * eased;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);

        if (eased > 0.01) {
          // Blend from neutral gray to accent color
          const r = Math.round(140 + (ACCENT_COLOR.r - 140) * eased);
          const g = Math.round(140 + (ACCENT_COLOR.g - 140) * eased);
          const b = Math.round(140 + (ACCENT_COLOR.b - 140) * eased);
          ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
        } else {
          ctx.fillStyle = `rgba(140,140,140,${opacity})`;
        }

        ctx.fill();
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    };

    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("mouseleave", onLeave);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
