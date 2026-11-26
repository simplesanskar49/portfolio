/**
 * Renders the site icons with Playwright's Chromium, using the site's own font:
 * "SK" on a circle filled with the accent's gradient (same gradient as the scroll bar).
 *
 *   public/icons/favicon-<accent>.png  96 px tab icon per accent (swapped by useAccentFavicon)
 *   public/favicon.ico                 16 + 32 + 48 px, teal (default /favicon.ico requests)
 *   public/apple-touch-icon.png        180 px, teal, full-bleed (iOS rounds it itself)
 *
 *   npm run icons
 *
 * After regenerating, bump ICON_VERSION in src/constants/accent.ts so browsers refetch.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";

import { chromium } from "@playwright/test";

import { ACCENTS, DEFAULT_ACCENT } from "../src/constants/accent.ts";

const INK = "#0b0f12";

const font = await readFile(
  new URL(
    "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
    import.meta.url,
  ),
);
const fontUrl = `data:font/woff2;base64,${font.toString("base64")}`;

const browser = await chromium.launch();
const page = await browser.newPage();

async function renderPng(
  size: number,
  colours: { swatch: string; swatch2: string },
  shape: "circle" | "square" = "circle",
): Promise<Buffer> {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<!doctype html><html><head><style>
    @font-face { font-family: Inter; src: url(${fontUrl}); font-weight: 100 900; }
    html, body { margin: 0; background: transparent; }
    .icon {
      width: ${String(size)}px; height: ${String(size)}px;
      border-radius: ${shape === "circle" ? "50%" : "0"};
      background: linear-gradient(135deg, ${colours.swatch}, ${colours.swatch2});
      color: ${INK};
      display: flex; align-items: center; justify-content: center;
      font: 800 ${String(size * 0.44)}px/1 Inter; letter-spacing: -0.05em;
    }
  </style></head><body><div class="icon">SK</div></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  return page.locator(".icon").screenshot({ omitBackground: true });
}

/** ICO container holding PNG images (supported by every current browser). */
function toIco(images: { size: number; png: Buffer }[]): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, png }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((image) => image.png)]);
}

const publicDir = new URL("../public/", import.meta.url);
await mkdir(new URL("icons/", publicDir), { recursive: true });

for (const accent of ACCENTS) {
  await writeFile(
    new URL(`icons/favicon-${accent.id}.png`, publicDir),
    await renderPng(96, accent),
  );
}

const teal = ACCENTS.find((accent) => accent.id === DEFAULT_ACCENT);
if (!teal) throw new Error("default accent missing from ACCENTS");
const icoImages: { size: number; png: Buffer }[] = [];
for (const size of [16, 32, 48]) icoImages.push({ size, png: await renderPng(size, teal) });
await writeFile(new URL("favicon.ico", publicDir), toIco(icoImages));
await writeFile(new URL("apple-touch-icon.png", publicDir), await renderPng(180, teal, "square"));

await browser.close();
console.log(`Wrote ${String(ACCENTS.length)} tab icons, favicon.ico and apple-touch-icon.png`);
