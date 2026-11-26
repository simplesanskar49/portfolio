/**
 * Renders the raster icons from public/favicon.svg with Playwright's Chromium:
 *   public/favicon.ico          (32 + 48 px, for browsers/tools that ignore SVG)
 *   public/apple-touch-icon.png (180 px, iOS home screen)
 * Re-run after editing favicon.svg:  npm run icons
 */
import { readFile, writeFile } from "node:fs/promises";

import { chromium } from "@playwright/test";

const publicDir = new URL("../public/", import.meta.url);
const svg = await readFile(new URL("favicon.svg", publicDir), "utf8");

const browser = await chromium.launch();
const page = await browser.newPage();

/** `background` fills the SVG's rounded corners (iOS applies its own mask, so it needs a full square). */
async function renderPng(size: number, background = "transparent"): Promise<Buffer> {
  await page.setViewportSize({ width: size, height: size });
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  await page.setContent(
    `<body style="margin:0;background:${background}">` +
      `<img width="${String(size)}" height="${String(size)}" src="${src}" style="display:block"></body>`,
  );
  return page.screenshot({ omitBackground: background === "transparent" });
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

const icoImages = [];
for (const size of [32, 48]) icoImages.push({ size, png: await renderPng(size) });
await writeFile(new URL("favicon.ico", publicDir), toIco(icoImages));
// Same teal as the icon tile (--color-teal-400).
await writeFile(new URL("apple-touch-icon.png", publicDir), await renderPng(180, "#2dd4bf"));

await browser.close();
console.log("Wrote public/favicon.ico and public/apple-touch-icon.png");
