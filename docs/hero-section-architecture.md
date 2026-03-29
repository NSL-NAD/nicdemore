# Hero Section Architecture — Cinematic 3D Build Animation

> **Project:** nicdemore.com
> **Stack:** Next.js 14 + Framer Motion + Canvas API + Tailwind
> **Status:** ~90% complete (final 10% = human + Claude Code polish)
> **Last Updated:** March 2026

---

## Table of Contents

1. [Overview & Design Intent](#overview--design-intent)
2. [The 3D Animation System](#the-3d-animation-system)
3. [Interactive Glowing Grid](#interactive-glowing-grid)
4. [Parallax & Scroll Behavior](#parallax--scroll-behavior)
5. [Frosted Glass Card System](#frosted-glass-card-system)
6. [Nav Integration](#nav-integration)
7. [Key Files](#key-files)
8. [Decision Log](#decision-log)
9. [Lessons for Future Builds](#lessons-for-future-builds)
10. [Agent Evaluation Checklist](#agent-evaluation-checklist)

---

## Overview & Design Intent

The hero section creates the illusion that the website is **building itself in front of the viewer**. On page load, elements fly in from **outside the viewport** along the Z-axis (toward the viewer), decelerating smoothly as they land into their final positions on a visible grid surface.

**Core visual metaphor:** Elements are being placed onto graph paper by an invisible hand — each piece arrives from a different direction based on its final position on screen, creating an organic, non-template feel.

**Key principles:**
- Elements enter from **outside the viewport** (not from within it)
- Entry direction correlates to final position (top-left elements enter from NW, bottom-right from SE)
- Z-axis creates depth (elements start large/close to camera, shrink to resting size)
- Blur clears as elements approach final position (simulates focus pull)
- Speed decelerates dramatically near landing (gravity without bounce)
- Multiple elements animate simultaneously with staggered starts for organic feel
- No opacity animation — elements are visible immediately upon entering the viewport

---

## The 3D Animation System

### How CSS 3D Works in This Context

CSS provides pseudo-3D through `perspective` and `translateZ`:

```
perspective: 1200px    — sets "camera distance" from the screen
translateZ(800px)      — element is 800px closer to camera (appears larger)
translateZ(0px)        — element is at resting position on the page
```

Combined with X/Y translation, this creates a true flight path from outside the viewport into position.

### Implementation: `drop3D()` and `drop3DHeavy()`

Two factory functions generate Framer Motion animation props:

```tsx
// Standard drop — for text, labels, buttons
const drop3D = (delay, dur, startX, startY, startZ, startBlur) => ({
  initial: {
    x: startX,      // pixels from final X position
    y: startY,      // pixels from final Y position
    z: startZ,      // pixels toward camera (perspective depth)
    filter: `blur(${startBlur}px)`,
  },
  animate: {
    x: 0, y: 0, z: 0,
    filter: 'blur(0px)',
    transition: {
      duration: dur,
      ease: LAND_EASE,          // [0.22, 0.85, 0.32, 1]
      delay,
      filter: {                 // blur clears slightly before position settles
        duration: dur * 0.7,
        delay: delay + dur * 0.1,
      },
    },
  },
});

// Heavy drop — for large elements (video, frosted card)
// Higher blur (12px), no configurable blur param
const drop3DHeavy = (delay, dur, startX, startY, startZ) => ({
  // Same structure, blur fixed at 12px, clears at dur * 0.8
});
```

### The `LAND_EASE` Curve

```tsx
const LAND_EASE = [0.22, 0.85, 0.32, 1];
```

This is a custom cubic-bezier that creates **fast initial movement with very slow final approach**. It mimics gravity-style deceleration without any bounce or snap at the end.

**Why this specific curve matters:** Earlier iterations used `[0.12, 0.9, 0.25, 1]` which caused a visible "snap" at the end — the element would jump the last few pixels into position. The current curve eliminates that by having an even more gradual tail.

### Required CSS Properties

For `translateZ` to work, every animated element AND its parent chain needs:

```tsx
style={{ transformStyle: 'preserve-3d' }}
```

The perspective container (the main `motion.div` wrapping the hero) needs:

```tsx
style={{
  perspective: 1200,           // camera distance in px
  perspectiveOrigin: '50% 40%', // slight upward vanishing point
}}
```

**Critical gotcha:** If ANY element in the parent chain is missing `transformStyle: 'preserve-3d'`, the Z-axis animation silently falls back to flat 2D movement. This was the #1 debugging issue during development.

### Timing Architecture

```tsx
const T = {
  // Wave 1: Big pieces start immediately, overlapping
  video:     { delay: 0.2,  dur: 2.6 },   // first to start, slow landing
  name:      { delay: 0.4,  dur: 2.4 },   // overlaps video
  overview:  { delay: 0.6,  dur: 1.4 },   // "// Overview" label
  h2Group:   { delay: 0.7,  dur: 2.0 },   // Builder/Engineer/Founder as unit

  // Wave 2: Card + contents start while wave 1 still landing
  card:      { delay: 1.0,  dur: 2.2 },   // frosted card
  subhead:   { delay: 1.3,  dur: 1.6 },   // text inside card
  btnLeft:   { delay: 1.5,  dur: 1.4 },   // See my work
  btnRight:  { delay: 1.6,  dur: 1.3 },   // Get in touch
};
```

**Key timing principles:**
- Total animation: ~5 seconds
- Multiple elements in flight simultaneously (never strictly sequential)
- Wave 1 is still landing when Wave 2 begins
- Duration varies per element (larger elements = longer flight = more dramatic)
- The H2 words (Builder, Engineer, Founder) are grouped as a single animation unit to avoid template-feeling sequential drops

### Entry Direction Strategy

Each element's starting `x, y, z` is calculated based on where it lands on screen:

| Element | Final Position | Entry Direction | Start (x, y, z) |
|---------|---------------|-----------------|------------------|
| H1 "Nic DeMore" | Top-left | NW (above-left) | (-500, -250, 800) |
| Video | Right/center | SE (below-right) | (600, 400, 900) |
| H2 group | Left, below H1 | W (left) | (-400, -60, 600) |
| Frosted card | Bottom-left | SW | (-300, 150, 700) |
| "// Overview" | Top-left | NW | (-300, -40, 400) |
| See my work btn | Inside card | Slight SW | (-100, 40, 300) |
| Get in touch btn | Inside card | Below | (0, 50, 250) |

**Rule of thumb:** Start position = final position direction extrapolated outside viewport, with higher Z for larger/more important elements.

---

## Interactive Glowing Grid

### Design

A full-viewport canvas-rendered grid that acts as the "surface" elements land on:
- Always visible at low opacity (like graph paper)
- On mouse hover, grid lines near cursor glow orange
- Smooth radial falloff from cursor position
- Lines only (no dots at intersections)
- Grid extends behind the nav bar (canvas is `fixed inset-0`)

### Implementation: `GlowingGrid.tsx`

Canvas-based for performance (hundreds of line segments per frame).

```tsx
// Configuration
const GRID_SIZE = 22;           // px per square (matches retro grid)
const BASE_LINE_OPACITY = 0.09; // always-visible base
const MAX_LINE_OPACITY = 0.65;  // full glow near cursor
const GLOW_RADIUS = 320;        // px radius of glow effect
const FOLLOW_SPEED = 0.1;       // smooth mouse follow (0-1)
const ACCENT = { r: 244, g: 99, b: 30 };     // GAS orange
const BASE_COLOR = { r: 180, g: 170, b: 160 }; // warm gray
```

**How it works:**
1. Canvas runs in `requestAnimationFrame` loop
2. Mouse position is smoothly interpolated (not raw) via `FOLLOW_SPEED`
3. For each grid line segment, calculate distance from segment midpoint to cursor
4. Apply smoothstep easing: `t * t * (3 - 2 * t)` for natural falloff
5. Interpolate color from base gray to accent orange based on proximity
6. Line width increases slightly near cursor (1px base → 1.5px at cursor)

**Performance notes:**
- Uses `devicePixelRatio` scaling for crisp rendering on retina
- Segment-by-segment drawing (not full-line) for per-segment color control
- Canvas resizes on window resize
- Touch support included for mobile

### Integration

Mounted in `layout.tsx` as a fixed, full-viewport canvas at `z-index: 0`:

```tsx
<canvas className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
```

All hero content sits above at `z-index: 1+`.

---

## Parallax & Scroll Behavior

### H1 Dramatic Parallax

The "Nic DeMore" heading follows the scroll much further than other elements, creating a strong layered depth feel:

```tsx
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start start", "end start"],
});

const h1Y = useTransform(scrollYProgress, [0, 1], [0, 350]);  // 350px travel
const h2Y = useTransform(scrollYProgress, [0, 1], [0, 350]);  // matches H1
```

**Key behavior:**
- H1 and H2 move together as a unit (same `350px` range)
- H2 slides behind the frosted card (card stays in place, `z-index` layering)
- H1 eventually moves behind the nav bar
- The hero section itself fades out as user scrolls:

```tsx
const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
```

### Mouse-Reactive Parallax

Video and text shift slightly based on mouse position (subtle depth cue):

```tsx
const { normX, normY } = useMousePosition();  // -1 to 1 range

const videoX = useSpring(normX * 6, { stiffness: 50, damping: 20 });
const videoY = useSpring(normY * 4, { stiffness: 50, damping: 20 });
const textX  = useSpring(normX * -4, { stiffness: 50, damping: 20 });
```

Video moves WITH mouse, text moves OPPOSITE — creates parallax depth between layers.

---

## Frosted Glass Card System

### CSS Implementation

```css
.frosted-card {
  background: linear-gradient(
    135deg,
    rgba(244, 99, 30, 0.05) 0%,     /* subtle orange tint */
    rgba(250, 249, 246, 0.82) 35%,   /* semi-transparent base */
    rgba(245, 241, 235, 0.78) 100%
  );
  backdrop-filter: blur(24px) saturate(1.5);
  border: 1px solid rgba(244, 99, 30, 0.12);
}
```

**Hover state:** Border glows orange, slight box-shadow, background becomes slightly more opaque (but still allows grid to glow through).

**Retro mode:** Dark variant with cyan accents instead of orange.

### Card Layout

The card contains the subhead text and both CTA buttons. Key layout decisions:
- `inline-block` so it wraps content tightly (no excess whitespace)
- `max-width: 440px` prevents card from stretching full column width
- `rounded-xl` for generous corner radius
- Card stays in place during scroll; H2 text slides behind it

---

## Nav Integration

### Cinematic Nav Entry

Nav elements also participate in the 3D build animation:

```tsx
const NAV_ENTRIES = [
  { delay: 0.5, dur: 2.0, x: -200, y: -120, z: 500, blur: 6 },  // Logo — NW
  { delay: 0.9, dur: 1.4, x: -40,  y: -100, z: 400, blur: 4 },  // Overview
  // ... scattered entry points for each nav item
  { delay: 1.2, dur: 1.6, x: 200,  y: -110, z: 450, blur: 5 },  // Retro toggle — NE
];
```

Nav items enter from above (N/NW/NE) with varied timing, overlapping with the hero build.

### Frosted Nav on Hover

When hovering over the nav area, a frosted glass background appears so text is readable over the glowing grid:

```css
.nav-header-frost:hover {
  background: color-mix(in srgb, var(--color-base) 78%, transparent);
  backdrop-filter: blur(16px) saturate(1.4);
}
```

On scroll (past 40px), the nav becomes permanently frosted with a border.

---

## Key Files

| File | Purpose |
|------|---------|
| `src/components/sections/Hero.tsx` | Hero section layout, 3D drop animations, parallax, video player |
| `src/components/GlowingGrid.tsx` | Canvas-based interactive grid with orange glow |
| `src/components/Navigation.tsx` | Nav with 3D entry animations, frosted glass states |
| `src/app/globals.css` | `.frosted-card`, `.hero-btn-outline`, `.nav-header-frost`, `.film-grain` |
| `src/lib/motion.ts` | Shared easing curves (`EASING_PREMIUM`, `EASING_SMOOTH`, etc.) |
| `src/hooks/useMousePosition.ts` | Normalized mouse position hook for parallax |
| `src/hooks/useMediaQuery.ts` | Responsive breakpoint hook (disables parallax on mobile) |

---

## Decision Log

### Why Framer Motion `perspective` + `translateZ` (not Three.js)

**Considered:**
1. **Three.js / React Three Fiber** — Real 3D engine with XYZ camera. Rejected: overkill for HTML elements, adds ~150KB, requires WebGL context.
2. **CSS `scale()` only** — Fake Z-axis by scaling elements larger/smaller. Rejected: doesn't create true perspective distortion, feels flat.
3. **Framer Motion `perspective` + `translateZ`** — Selected. True perspective with pixel-based Z values, zero additional dependencies (already using Framer Motion), works with standard HTML/React components.

### Why Canvas Grid (not CSS/SVG)

The grid requires per-segment color interpolation based on mouse distance. With ~2000+ line segments on a 1080p screen, CSS/SVG would create thousands of DOM elements. Canvas handles this in a single compositing pass at 60fps.

### Why No Opacity Fade

Early iterations used `opacity: 0 → 1` during the drop animation. This felt like a standard fade-in rather than a physical object entering the viewport. Removing opacity and using only blur + Z-position makes elements feel like they exist in physical space outside the viewport and are being moved into view.

### Why Grouped H2 Words

Initially each word (Builder, Engineer, Founder) dropped separately with staggered timing. This felt like a typical "stagger children" animation — predictable and templated. Grouping them as a single unit that drops together feels more intentional, like a single card being placed.

### Why H2 Parallax Matches H1

When only H1 had dramatic parallax, scrolling caused H1 to overlap H2 (they moved at different speeds). Making H2 chase the scroll at the same rate as H1 keeps them as a visual unit. The H2 then slides behind the frosted card (which stays in place), creating a natural layering effect.

---

## Lessons for Future Builds

### 1. `transformStyle: 'preserve-3d'` Must Propagate

Every element in the chain between the `perspective` container and the animated child needs `transformStyle: 'preserve-3d'`. Missing it on ANY intermediate div silently kills Z-axis animation. **This is the single most common 3D CSS debugging issue.**

### 2. Ease Curves Make or Break Landing Feel

The difference between a good and bad landing is entirely in the last 10% of the curve. `[0.22, 0.85, 0.32, 1]` works well for gravity-without-bounce. Test by watching the final 200ms of the animation — if there's any visible jump or snap, the tail of the curve needs to be flatter.

### 3. Blur Timing Should Lead Position

The blur should clear ~70-80% through the position animation. If blur and position finish simultaneously, the element feels like it stops AND clarifies at the same time, which reads as artificial. Clearing blur slightly before position settles creates the illusion of the element coming into focus as it approaches.

### 4. Simultaneous > Sequential

Sequential one-at-a-time animations feel like template/generic motion libraries. Real "building" feels like multiple things happening at once with organic variation. Aim for:
- 3+ elements in flight at any given time during peak animation
- Varied durations (not all 2.0s)
- Staggered starts within 0-1.5s of each other, not evenly spaced

### 5. Entry Direction Must Match Spatial Position

Elements in the top-left should enter from the NW (negative X, negative Y). Bottom-right elements from the SE. This creates a coherent spatial narrative — things are coming from "beyond the edges" of the viewport. If a bottom-right element entered from the top-left, it would feel wrong even if the viewer can't articulate why.

### 6. Shadows Sell Z-Depth

Without shadows, all elements look like they're on the same plane regardless of Z-position or scale. Shadow intensity should correlate with element "height" above the grid:
- Video player & frosted card: dramatic shadows (they're the heaviest pieces)
- H1 text: medium shadows (floating above but lighter)
- Buttons & labels: subtle shadows

### 7. Mobile Must Be Different (Not Disabled)

Mobile can't do mouse-reactive parallax, and complex 3D on mobile GPUs causes jank. The solution: keep the 3D drop animations (they're one-shot, not ongoing) but disable the mouse-following parallax and reduce Z-distances. The grid still works on mobile via touch events.

### 8. Padding Investigation Workflow

When padding changes don't appear to work, check this chain:
1. Is there a `max-width` wrapper inside the padded container?
2. Is the padding being overridden by a more specific Tailwind class?
3. Is the element using `px-X` on the outer container but the inner content has its own padding?
4. Check computed styles in dev tools, not just the class list.

---

## Agent Evaluation Checklist

Use this when evaluating whether a website's hero section (or any section) has "custom" vs "template" animation quality:

### Motion Quality

- [ ] **Entry direction matches spatial position** — Elements enter from directions that make spatial sense relative to their final position
- [ ] **Multiple simultaneous animations** — 3+ elements in motion at peak, not strict one-at-a-time
- [ ] **Varied timing** — Different elements have different durations and delays (not uniform stagger)
- [ ] **No snap or jump at landing** — Final frames of animation are smooth deceleration, no visible position jump
- [ ] **Blur/focus transition** — Elements clarify as they approach, blur clears before position fully settles
- [ ] **Depth cues** — Shadows, scale, or Z-position create sense of elements existing in 3D space
- [ ] **Scroll-reactive parallax** — Different layers move at different rates on scroll, creating depth

### Visual Polish

- [ ] **Interactive background** — Grid, particles, or other reactive background that responds to cursor
- [ ] **Frosted glass elements** — Semi-transparent cards with backdrop blur over interactive backgrounds
- [ ] **Hover state depth** — Hover states on cards include border glow, shadow changes, or subtle background shifts
- [ ] **No flat elements** — Every element has at least subtle shadow or border to lift it from the surface
- [ ] **Responsive degradation** — Mobile disables mouse-dependent features but keeps one-shot animations

### Anti-Patterns (Template Indicators)

- [ ] All elements fade in from the same direction (usually bottom-up)
- [ ] Uniform stagger timing (every element 0.1s after the previous)
- [ ] No depth variation (all shadows identical, no z-axis)
- [ ] Opacity-only animation (no blur, no scale, no position)
- [ ] Animation plays on scroll-into-view only (no page load cinematic)
- [ ] Background is static (no interaction, no grid, no particles)

---

## Appendix: Color & Design Tokens Used

```css
--color-accent: #F4631E      /* GAS orange — primary brand */
--color-base: #FAF9F6        /* warm off-white background */
--color-text-primary          /* near-black, theme-dependent */
--color-text-secondary        /* muted gray */
--color-border                /* subtle gray border */
--color-surface               /* card/video background */
--font-display                /* Syne — headings */
--font-jetbrains              /* JetBrains Mono — code/labels */
```
