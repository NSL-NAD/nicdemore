/**
 * generate-pdfs.mjs
 * Generates resume + cover letter PDFs from the live nicdemore.com site.
 * Captures in screen media (full brand design: Syne, JetBrains Mono, GAS Orange).
 *
 * Usage:
 *   node scripts/generate-pdfs.mjs
 *   node scripts/generate-pdfs.mjs --url http://localhost:3000   (local dev)
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

// ── Parse CLI flags ────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const urlFlag = args.find((a) => a.startsWith("--url="))?.split("=")[1]
  ?? args[args.indexOf("--url") + 1];
const BASE_URL = urlFlag?.replace(/\/$/, "") ?? "https://nicdemore.com";

// ── Pages to export ────────────────────────────────────────────────────────────
const PAGES = [
  { path: "/resume",                   file: "nic-demore-resume" },
  { path: "/resume/anthropic",         file: "nic-demore-cover-letter-anthropic" },
  { path: "/resume/apple",             file: "nic-demore-cover-letter-apple" },
  { path: "/resume/apple-app-review",  file: "nic-demore-cover-letter-apple-app-review" },
  { path: "/resume/apple-ads",         file: "nic-demore-cover-letter-apple-ads" },
  { path: "/resume/apple-social",      file: "nic-demore-cover-letter-apple-social" },
];

// ── CSS injected into every page before capture ────────────────────────────────
// Strips chrome, nav, footer, grid overlay, grain, cookie banner.
// Keeps ALL brand design: Syne, JetBrains Mono, GAS Orange, card layouts.
const CLEANUP_CSS = `
  /* ── Hide chrome & decorative overlays ── */
  nav,
  footer,
  .grain-overlay,
  .no-print,
  .grid-lines,
  [class*="cookie"],
  [class*="venture-os"] {
    display: none !important;
  }

  /* ── Remove page top/bottom padding ── */
  .resume-page-wrapper {
    padding-top: 20px !important;
    padding-bottom: 20px !important;
  }

  /* ── Freeze all animations ── */
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
  }

  /* ── Force elements visible (Framer Motion sets opacity:0 on mount) ── */
  [style*="opacity: 0"],
  [style*="opacity:0"] {
    opacity: 1 !important;
  }

  /* ── Remove transform offsets left by enter animations ── */
  [style*="translateY"] {
    transform: none !important;
  }

  /* ── Ensure background renders ── */
  body {
    background: #FAF9F6 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
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
      "--disable-web-security",
      "--font-render-hinting=medium",
    ],
  });

  for (const { path: pagePath, file } of PAGES) {
    const url = `${BASE_URL}${pagePath}`;
    console.log(`  → ${url}`);

    const page = await browser.newPage();

    // Wide viewport so layout doesn't collapse
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });

    // Stay in screen media so full brand design renders (not @media print CSS)
    await page.emulateMediaType("screen");

    await page.goto(url, { waitUntil: "networkidle0", timeout: 45_000 });

    // Give web fonts + Framer Motion entrance animations time to settle
    await new Promise((r) => setTimeout(r, 2500));

    // Inject cleanup CSS (hides nav/footer/overlays, freezes motion)
    await page.addStyleTag({ content: CLEANUP_CSS });

    // One more tick for any reflow
    await new Promise((r) => setTimeout(r, 300));

    // Get the full content height after cleanup so we paginate correctly
    const contentHeight = await page.evaluate(() => {
      const el = document.querySelector(".resume-page-wrapper");
      return el ? el.scrollHeight + 40 : document.body.scrollHeight;
    });

    const outputPath = join(OUTPUT_DIR, `${file}.pdf`);

    await page.pdf({
      path: outputPath,
      format: "Letter",
      printBackground: true,
      // Use screen media render, no forced @page styles
      margin: {
        top: "0.5in",
        right: "0.55in",
        bottom: "0.5in",
        left: "0.55in",
      },
    });

    await page.close();
    console.log(`     ✓  public/pdfs/${file}.pdf`);
  }

  await browser.close();
  console.log("\n✅  All PDFs saved to public/pdfs/\n");
  console.log(
    "Next: git add public/pdfs/*.pdf && git commit -m 'Add generated resume PDFs'\n"
  );
}

main().catch((err) => {
  console.error("\n❌  PDF generation failed:", err.message);
  process.exit(1);
});
