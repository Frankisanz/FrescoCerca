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

test("publishes passive AdSense ownership signals without loading ad code", async () => {
  const layout = await source("app/layout.tsx");
  const adsTxt = await source("public/ads.txt");

  assert.match(layout, /"google-adsense-account": "ca-pub-5290446197600060"/);
  assert.doesNotMatch(layout, /pagead2\.googlesyndication\.com/);
  assert.equal(
    adsTxt.trim(),
    "google.com, pub-5290446197600060, DIRECT, f08c47fec0942fa0",
  );
});

test("uses frescocerca.es as the canonical production origin", async () => {
  const site = await source("lib/site.ts");

  assert.match(
    site,
    /const DEFAULT_SITE_URL = "https:\/\/frescocerca\.es"/,
  );
  assert.doesNotMatch(site, /frescocerca\.vercel\.app/);
});

test("keeps every noindex route out of the sitemap source", async () => {
  const sitemap = await source("app/sitemap.ts");

  assert.doesNotMatch(sitemap, /"\/(?:aviso-legal|privacidad|cookies)"/);
  assert.doesNotMatch(sitemap, /"\/eclipse-2026"/);
  assert.match(sitemap, /CLIMATE_METHODOLOGY\.revisado/);
  assert.match(sitemap, /latestGuideUpdate/);
  assert.match(sitemap, /toLastModified/);
});

test("keeps the completed eclipse available as a noindex historical archive", async () => {
  const eclipse = await source("app/eclipse-2026/page.tsx");

  assert.match(eclipse, /Archivo del eclipse solar total de 2026 en España/);
  assert.match(eclipse, /updatedDate = "2026-08-17"/);
  assert.match(
    eclipse,
    /robots:\s*\{[\s\S]*?index:\s*false,[\s\S]*?follow:\s*true/,
  );
  assert.match(eclipse, /El eclipse de 2026 ya se celebró/);
});

test("redirects alternate production hosts to the apex canonical domain", async () => {
  const nextConfig = await source("next.config.ts");

  assert.match(nextConfig, /value:\s*"www\.frescocerca\.es"/);
  assert.match(nextConfig, /value:\s*"frescocerca\.vercel\.app"/);
  assert.equal(
    nextConfig.match(/destination:\s*"https:\/\/frescocerca\.es\/:path\*"/g)
      ?.length,
    2,
  );
});

test("cross-links city guides to strengthen crawl discovery", async () => {
  const cityGuide = await source("app/desde/[slug]/page.tsx");

  assert.match(cityGuide, /nearbyOriginCities/);
  assert.match(cityGuide, /calculateDirectDistanceKm\(city, originCity\)/);
  assert.match(cityGuide, /href=\{`\/desde\/\$\{originCity\.slug\}`\}/);
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

test("ships the current high-value comparison and decision tools", async () => {
  const atlas = await source("app/destinos/page.tsx");
  const destinationPage = await source("app/destinos/[slug]/page.tsx");
  const originPage = await source("app/desde/[slug]/page.tsx");
  const guideData = await source("lib/guide-growth.ts");
  const guidePage = await source("app/guias/[slug]/page.tsx");

  assert.match(atlas, /<table className="catalog-table">/);
  assert.match(atlas, /Comparación editorial de los 30 destinos/);

  assert.match(destinationPage, /getDestinationCatalogBenchmark/);
  assert.match(destinationPage, /aria-label="Posición dentro del catálogo"/);
  assert.match(destinationPage, /frente a la mediana nocturna del catálogo/);

  assert.match(originPage, /Matriz de seis candidatos calculada para salir desde/);
  assert.match(originPage, /Fuentes locales de los candidatos mostrados/);
  assert.match(originPage, /candidateSources\.map/);

  assert.match(guideData, /slug: "checklist-alojamiento-fresco-verano"/);
  assert.match(guideData, /checklistTitle: "Las doce preguntas"/);
  assert.match(guideData, /decisionTitle: "Semáforo de decisión"/);
  assert.match(guideData, /IDAE — Recomendaciones de ahorro energético/);
  assert.match(guideData, /Ministerio de Sanidad — Calor extremo/);
  assert.match(guidePage, /className="article-section guide-toolkit"/);
  assert.match(guidePage, /guide\.sources\.map/);
});

test("detail articles opt out of the generic social image fallback", async () => {
  const site = await source("lib/site.ts");
  const articleMetadata = site.slice(
    site.indexOf("export function createArticleMetadata"),
    site.indexOf("export function createArticleJsonLd"),
  );

  assert.match(articleMetadata, /image = null/);
  assert.match(articleMetadata, /images:\s*image[\s\S]*?:\s*\[\]/);
  assert.match(articleMetadata, /images:\s*imageUrl \? \[imageUrl\] : \[\]/);
  assert.doesNotMatch(articleMetadata, /frescocerca-refugio-editorial-og\.jpg/);
  assert.doesNotMatch(articleMetadata, /absoluteUrl\("\/og\.png"\)/);
});

test("keeps the destination atlas and editorial image hydration-safe", async () => {
  const atlas = await source("app/components/destination-atlas-map.tsx");
  const editorialImage = await source("app/components/editorial-hero-image.tsx");

  assert.ok(
    atlas.includes(
      "<title>{`${destination.name}: ${destination.summerLowRange[0]}–${destination.summerLowRange[1]} °C`}</title>",
    ),
    "each SVG title must be a single string child",
  );
  assert.doesNotMatch(atlas, /<title>\s*\{destination\.name\}/);

  assert.match(editorialImage, /priority=\{preload\}/);
  assert.doesNotMatch(editorialImage, /\s+preload=\{/);
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
