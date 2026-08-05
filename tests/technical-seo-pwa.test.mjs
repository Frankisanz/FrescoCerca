import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectFile = (pathname) => new URL(`../${pathname}`, import.meta.url);

async function source(pathname) {
  return readFile(projectFile(pathname), "utf8");
}

function relativeLuminance([red, green, blue]) {
  const channels = [red, green, blue].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastForWhiteAlpha(alpha, background = [21, 58, 67]) {
  const foreground = background.map((channel) =>
    Math.round(255 * alpha + channel * (1 - alpha)),
  );
  const light = relativeLuminance(foreground);
  const dark = relativeLuminance(background);
  return (light + 0.05) / (dark + 0.05);
}

function alphaFromRule(css, selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const block = css.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`));
  assert.ok(block, `missing CSS rule for ${selector}`);

  const color = block[1].match(
    /color:\s*rgba\(255,\s*255,\s*255,\s*([\d.]+)\)/,
  );
  assert.ok(color, `missing white alpha color for ${selector}`);
  return Number(color[1]);
}

test("does not force a second service-worker update after registration", async () => {
  const controls = await source("app/components/pwa-controls.tsx");

  assert.doesNotMatch(controls, /registration\.update\s*\(/);
  assert.match(controls, /observeInstallation\(registration\.installing\)/);
  assert.match(controls, /addEventListener\("updatefound", handleUpdateFound\)/);
});

test("precaches the editorial visual in the current PWA cache", async () => {
  const serviceWorker = await source("public/sw.js");

  assert.match(serviceWorker, /CACHE_VERSION\s*=\s*"frescocerca-v4"/);
  assert.match(
    serviceWorker,
    /"\/images\/frescocerca-refugio-editorial\.webp"/,
  );
});

test("marks legal routes noindex in their shared metadata helper", async () => {
  for (const pathname of [
    "app/aviso-legal/page.tsx",
    "app/privacidad/page.tsx",
    "app/cookies/page.tsx",
  ]) {
    assert.match(await source(pathname), /noIndex:\s*true/);
  }
});

test("keeps noindex legal routes out of the sitemap source", async () => {
  const sitemap = await source("app/sitemap.ts");

  assert.doesNotMatch(sitemap, /"\/(?:aviso-legal|privacidad|cookies)"/);
  assert.match(sitemap, /CLIMATE_METHODOLOGY\.revisado/);
  assert.match(sitemap, /latestGuideUpdate/);
  assert.match(sitemap, /toLastModified/);
  assert.match(sitemap, /eclipse:\s*"2026-08-05"/);
  assert.match(sitemap, /path:\s*"\/eclipse-2026"[\s\S]*changeFrequency:\s*"daily"/);
});

test("labels climate ranges as editorial estimates without unnamed stations", async () => {
  const destinations = await source("lib/destinations.ts");
  const methodology = await source("app/metodologia/page.tsx");
  const destinationPage = await source("app/destinos/[slug]/page.tsx");

  assert.doesNotMatch(destinations, /estaciones representativas cercanas/i);
  assert.match(destinations, /Estimaciones editoriales orientativas/);
  assert.match(methodology, /No se atribuyen a una estación concreta/);
  assert.match(destinationPage, /No reproducen la tabla/);
});

test("secondary text colors meet WCAG AA contrast on the dark surface", async () => {
  const css = await source("app/globals.css");

  for (const selector of [".temperature-route small", ".article-meta-row"]) {
    const alpha = alphaFromRule(css, selector);
    assert.ok(
      contrastForWhiteAlpha(alpha) >= 4.5,
      `${selector} must reach a 4.5:1 contrast ratio`,
    );
  }
});
