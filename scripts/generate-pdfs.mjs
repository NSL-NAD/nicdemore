/**
 * generate-pdfs.mjs
 * Generates resume + cover letter PDFs from the live nicdemore.com site.
 * Captures in screen media (Syne, JetBrains Mono, GAS Orange brand design).
 *
 * Usage:
 *   node scripts/generate-pdfs.mjs
 *   node scripts/generate-pdfs.mjs --url http://localhost:3000
 *
 * Output: public/pdfs/*.pdf
 */

import puppeteer from "puppeteer-core";
import { existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUTPUT_DIR = join(ROOT, "public", "pdfs");

// ── CLI flags ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const urlFlag =
  args.find((a) => a.startsWith("--url="))?.split("=")[1] ??
  args[args.indexOf("--url") + 1];
const BASE_URL = urlFlag?.replace(/\/$/, "") ?? "https://nicdemore.com";

// ── Pages ─────────────────────────────────────────────────────────────────────
const PAGES = [
  { path: "/resume",                  file: "nic-demore-resume",                        type: "resume" },
  { path: "/resume/anthropic",        file: "nic-demore-cover-letter-anthropic",         type: "cover"  },
  { path: "/resume/apple",            file: "nic-demore-cover-letter-apple",             type: "cover"  },
  { path: "/resume/apple-app-review", file: "nic-demore-cover-letter-apple-app-review",  type: "cover"  },
  { path: "/resume/apple-ads",        file: "nic-demore-cover-letter-apple-ads",         type: "cover"  },
  { path: "/resume/apple-social",     file: "nic-demore-cover-letter-apple-social",      type: "cover"  },
];

// ── Shared CSS (both types) ────────────────────────────────────────────────────
const SHARED_CSS = `
  /* Pure white background — eliminates cream #FAF9F6 framing effect */
  html, body {
    background: white !important;
  }

  /* Hide all page chrome */
  nav,
  footer,
  .grain-overlay,
  .no-print,
  .grid-lines,
  .section-glow,
  .film-grain::after,
  .fixed {
    display: none !important;
  }

  /* Remove page wrapper padding */
  .resume-page-wrapper {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  /* Freeze all Framer Motion / CSS animations */
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
  }

  /* Force all motion-hidden elements visible */
  [style*="opacity: 0"],
  [style*="opacity:0"] {
    opacity: 1 !important;
  }
  [style*="translateY"] {
    transform: none !important;
  }

  /* Preserve brand colors on print */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
`;

// ── Resume-specific: compress spacing to hit ~2 pages ─────────────────────────
const RESUME_CSS = `
  /* Tighter base typography */
  body {
    font-size: 13px !important;
    line-height: 1.45 !important;
  }

  h1 { font-size: 34px !important; margin-bottom: 4px !important; }
  h2 { font-size: 17px !important; margin-bottom: 8px !important; margin-top: 0 !important; }
  h3 { font-size: 13.5px !important; margin-bottom: 2px !important; }

  /* Section spacing */
  .mb-16, .mb-20 { margin-bottom: 18px !important; }
  .mb-12          { margin-bottom: 14px !important; }
  .mb-10, .mb-8   { margin-bottom: 10px !important; }
  .mb-6           { margin-bottom: 8px !important; }
  .mt-4           { margin-top: 6px !important; }

  /* Stack spacing */
  .space-y-10 > * + * { margin-top: 12px !important; }
  .space-y-8  > * + * { margin-top: 10px !important; }
  .space-y-6  > * + * { margin-top: 8px !important; }
  .space-y-4  > * + * { margin-top: 6px !important; }
  .space-y-3  > * + * { margin-top: 4px !important; }

  /* Gap utility compression */
  .gap-8 { gap: 12px !important; }
  .gap-4 { gap: 8px !important; }
  .gap-2 { gap: 3px !important; }

  /* Force 3-column skills grid regardless of breakpoint */
  .grid.grid-cols-1 {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 10px !important;
  }

  /* Compact skill tags */
  .flex.flex-wrap.gap-2 { gap: 3px !important; row-gap: 3px !important; }
  .font-mono.text-xs    { font-size: 10px !important; }

  /* Cover letter card padding */
  .p-5, .sm\\:p-8, .md\\:p-10 { padding: 14px !important; }

  /* Timeline indent */
  .pl-10 { padding-left: 28px !important; }

  /* Relax line-height on body copy */
  .leading-relaxed { line-height: 1.42 !important; }

  /* Header contact strip */
  .flex.flex-wrap.gap-4 { gap: 12px !important; }
`;

// ── Cover letter: tighten up but don't need aggressive compression ─────────────
const COVER_CSS = `
  body { font-size: 14px !important; line-height: 1.55 !important; }
  .mb-8 { margin-bottom: 16px !important; }
  .space-y-4 > * + * { margin-top: 12px !important; }
  .p-5, .sm\\:p-8, .md\\:p-10 { padding: 28px !important; }
`;

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`\n📄  Generating PDFs from ${BASE_URL}\n`);

  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--font-render-hinting=medium",
    ],
  });

  for (const { path: pagePath, file, type } of PAGES) {
    const isResume = type === "resume";
    const url = `${BASE_URL}${pagePath}`;
    console.log(`  → ${url}`);

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 });
    await page.emulateMediaType("screen");
    await page.goto(url, { waitUntil: "networkidle0", timeout: 45_000 });

    // Wait for fonts + Framer Motion entrances to settle
    await new Promise((r) => setTimeout(r, 2500));

    // ── 1. Dismiss cookie banner (click "Got it" if visible) ──────────────────
    await page.evaluate(() => {
      document.querySelectorAll("button").forEach((btn) => {
        if (btn.textContent?.trim() === "Got it") btn.click();
      });
    });
    await new Promise((r) => setTimeout(r, 200));

    // ── 2. Remove the cream scrim overlay (only hidden via @media print, ──────
    //       but we're capturing in screen mode)
    await page.evaluate(() => {
      document
        .querySelectorAll('[style*="rgba(250, 249, 246"]')
        .forEach((el) => el.remove());
    });

    // ── 3. For cover letters: strip the resume sections below the letter ───────
    //       so each cover letter outputs as a clean single page
    if (!isResume) {
      await page.evaluate(() => {
        // .resume-section[0] = header, [1]+ = Value I Bring / Experience / Skills
        const sections = document.querySelectorAll(".resume-section");
        for (let i = 1; i < sections.length; i++) {
          sections[i].remove();
        }
      });
    }

    // ── 4. Inject CSS ─────────────────────────────────────────────────────────
    await page.addStyleTag({ content: SHARED_CSS });
    await page.addStyleTag({ content: isResume ? RESUME_CSS : COVER_CSS });

    // Short reflow pause
    await new Promise((r) => setTimeout(r, 400));

    // ── 5. Generate PDF ───────────────────────────────────────────────────────
    await page.pdf({
      path: join(OUTPUT_DIR, `${file}.pdf`),
      format: "Letter",
      printBackground: true,
      // scale: shrinks the web content to fit page — 0.73 for dense resume,
      // 0.82 for cover letters (less content)
      scale: isResume ? 0.73 : 0.82,
      margin: {
        top: "0.45in",
        right: "0.5in",
        bottom: "0.45in",
        left: "0.5in",
      },
    });

    await page.close();
    console.log(`     ✓  public/pdfs/${file}.pdf`);
  }

  await browser.close();
  console.log("\n✅  All PDFs saved to public/pdfs/\n");
  console.log("Next: git add public/pdfs && git commit -m 'Regenerate PDFs'\n");
}

main().catch((err) => {
  console.error("\n❌  PDF generation failed:", err.message);
  process.exit(1);
});
