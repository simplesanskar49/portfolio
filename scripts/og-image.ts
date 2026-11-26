/**
 * Renders the Open Graph / Twitter card image (public/og.png, 1200 × 630) from
 * the profile content, using Playwright's Chromium. Re-run after changing the
 * name, title or subtitle:  npm run og-image
 */
import { chromium } from "@playwright/test";

import { profile } from "../src/content/profile.ts";

const WIDTH = "1200";
const HEIGHT = "630";

const escape = (text: string) =>
  text.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c,
  );

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden;
    background: #0b0f12; color: #f6f8f9;
    font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
    display: flex; flex-direction: column; justify-content: center; padding: 0 96px;
    background-image:
      radial-gradient(60rem 30rem at 85% -10%, rgb(45 212 191 / 0.18), transparent 60%),
      radial-gradient(40rem 25rem at 0% 110%, rgb(34 211 238 / 0.10), transparent 60%),
      linear-gradient(rgb(45 212 191 / 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgb(45 212 191 / 0.06) 1px, transparent 1px);
    background-size: auto, auto, 48px 48px, 48px 48px;
  }
  .eyebrow { font: 600 22px ui-monospace, "SF Mono", Menlo, monospace; letter-spacing: 0.2em; text-transform: uppercase; color: #2dd4bf; }
  h1 { margin-top: 20px; font-size: 96px; font-weight: 700; letter-spacing: -0.03em; line-height: 1; }
  .subtitle { margin-top: 28px; font-size: 34px; color: #b8c2c8; }
  .bar { margin-top: 48px; width: 160px; height: 6px; border-radius: 3px; background: linear-gradient(90deg, #2dd4bf, #22d3ee); }
</style>
</head>
<body>
  <p class="eyebrow">${escape(profile.title)}</p>
  <h1>${escape(profile.name)}</h1>
  <p class="subtitle">${escape(profile.subtitle)}</p>
  <div class="bar"></div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(WIDTH), height: Number(HEIGHT) } });
await page.setContent(html);
await page.screenshot({ path: new URL("../public/og.png", import.meta.url).pathname });
await browser.close();
console.log("Wrote public/og.png");
