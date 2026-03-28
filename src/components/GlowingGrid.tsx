"use client";

import { useEffect, useRef, useCallback } from "react";

// Grid configuration — matches retro grid sizing (22px squares)
const GRID_SIZE = 22;
const LINE_WIDTH = 1;
const BASE_LINE_OPACITY = 0.045; // subtle always-visible grid
const MAX_LINE_OPACITY = 0.55;
const GLOW_RADIUS = 280;
const FOLLOW_SPEED = 0.12; // smooth follow (0 = instant, higher = slower)
const ACCENT = { r: 244, g: 99, b: 30 }; // --color-accent #F4631E
const BASE_COLOR = { r: 28, g: 25, b: 23 }; // neutral dark

export function GlowingGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const smoothMouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Smooth mouse follow
    const target = mouseRef.current;
    const sm = smoothMouse.current;
    sm.x += (target.x - sm.x) * FOLLOW_SPEED;
    sm.y += (target.y - sm.y) * FOLLOW_SPEED;

    ctx.clearRect(0, 0, w, h);

    const mx = sm.x;
    const my = sm.y;

    // Draw horizontal lines
    const rows = Math.ceil(h / GRID_SIZE) + 1;
    const cols = Math.ceil(w / GRID_SIZE) + 1;

    for (let row = 0; row <= rows; row++) {
      const y = row * GRID_SIZE;

      for (let col = 0; col < cols; col++) {
        const x1 = col * GRID_SIZE;
        const x2 = x1 + GRID_SIZE;
        const segMidX = (x1 + x2) / 2;
        const dx = segMidX - mx;
        const dy = y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const t = Math.max(0, 1 - dist / GLOW_RADIUS);
        const eased = t * t * (3 - 2 * t); // smoothstep

        const opacity = BASE_LINE_OPACITY + (MAX_LINE_OPACITY - BASE_LINE_OPACITY) * eased;

        if (eased > 0.01) {
          const r = Math.round(BASE_COLOR.r + (ACCENT.r - BASE_COLOR.r) * eased);
          const g = Math.round(BASE_COLOR.g + (ACCENT.g - BASE_COLOR.g) * eased);
          const b = Math.round(BASE_COLOR.b + (ACCENT.b - BASE_COLOR.b) * eased);
          ctx.strokeStyle = `rgba(${r},${g},${b},${opacity})`;
        } else {
          ctx.strokeStyle = `rgba(${BASE_COLOR.r},${BASE_COLOR.g},${BASE_COLOR.b},${opacity})`;
        }

        ctx.lineWidth = LINE_WIDTH;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
      }
    }

    // Draw vertical lines
    for (let col = 0; col <= cols; col++) {
      const x = col * GRID_SIZE;

      for (let row = 0; row < rows; row++) {
        const y1 = row * GRID_SIZE;
        const y2 = y1 + GRID_SIZE;
        const segMidY = (y1 + y2) / 2;
        const dx = x - mx;
        const dy = segMidY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const t = Math.max(0, 1 - dist / GLOW_RADIUS);
        const eased = t * t * (3 - 2 * t); // smoothstep

        const opacity = BASE_LINE_OPACITY + (MAX_LINE_OPACITY - BASE_LINE_OPACITY) * eased;

        if (eased > 0.01) {
          const r = Math.round(BASE_COLOR.r + (ACCENT.r - BASE_COLOR.r) * eased);
          const g = Math.round(BASE_COLOR.g + (ACCENT.g - BASE_COLOR.g) * eased);
          const b = Math.round(BASE_COLOR.b + (ACCENT.b - BASE_COLOR.b) * eased);
          ctx.strokeStyle = `rgba(${r},${g},${b},${opacity})`;
        } else {
          ctx.strokeStyle = `rgba(${BASE_COLOR.r},${BASE_COLOR.g},${BASE_COLOR.b},${opacity})`;
        }

        ctx.lineWidth = LINE_WIDTH;
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.stroke();
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => {
      mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
