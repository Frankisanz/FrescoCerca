import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  CITY_GUIDE_MAX_TRAVEL_HOURS,
  rankDestinations,
} from "../lib/destination-ranking.ts";
import { DESTINATIONS, ORIGIN_CITIES } from "../lib/destinations.ts";

process.env.NEXT_PUBLIC_SITE_URL = "https://frescocerca.vercel.app";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the Spanish, indexable FrescoCerca homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang=["']es["']/i);
  assert.match(html, /<title>[^<]*FrescoCerca/i);
  assert.match(html, /Busca un lugar donde/i);
  assert.match(html, /Buscador de escapadas/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /og:image/i);
  assert.match(
    html,
    /<meta name="google-adsense-account" content="ca-pub-5290446197600060"/i,
  );
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("renders the Barcelona escape guide with its own canonical URL", async () => {
  const response = await render("/desde/barcelona");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Escapadas frescas desde Barcelona/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/frescocerca\.vercel\.app\/desde\/barcelona"/,
  );
  assert.match(html, /Escapadas frescas desde otras ciudades/);
  assert.match(html, /href="\/desde\/valencia"/);
  assert.match(html, /href="\/desde\/zaragoza"/);
});

test("renders the Malaga guide with the shared travel cap", async () => {
  const response = await render("/desde/malaga");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /dentro de unas[^<]*5[^<]*horas estimadas/i);
  assert.match(html, /href="\/destinos\/capileira"/);
  assert.doesNotMatch(html, /href="\/destinos\/valdelinares"/);
});

test("exposes a complete installable PWA manifest and offline worker", async () => {
  const response = await render("/manifest.webmanifest");
  assert.equal(response.status, 200);

  const manifest = await response.json();
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.scope, "/");
  assert.equal(manifest.start_url, "/");
  assert.ok(
    manifest.icons.some(
      (icon) => icon.src === "/icons/icon-192.png" && icon.sizes === "192x192",
    ),
  );
  assert.ok(
    manifest.icons.some(
      (icon) => icon.src === "/icons/icon-512.png" && icon.sizes === "512x512",
    ),
  );
  assert.ok(manifest.icons.some((icon) => icon.purpose === "maskable"));

  const worker = await readFile(new URL("../public/sw.js", import.meta.url), "utf8");
  assert.match(worker, /addEventListener\("install"/);
  assert.match(worker, /addEventListener\("fetch"/);
  assert.match(worker, /offline\.html/);

  const icon = await readFile(
    new URL("../public/icons/icon-512.png", import.meta.url),
  );
  assert.equal(icon.readUInt32BE(16), 512);
  assert.equal(icon.readUInt32BE(20), 512);
});

test("renders an editorial route with a canonical URL", async () => {
  const response = await render("/eclipse-2026");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Eclipse solar total del 12 de agosto de 2026/i);
  assert.match(html, /rel=["']canonical["']/i);
  assert.match(html, /Instituto Geográfico Nacional/i);
});

test("answers eclipse search intent with fresh, accessible and sourced content", async () => {
  const response = await render("/eclipse-2026");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>[^<]*Eclipse solar total 2026 en España/i);
  assert.match(html, /<time dateTime="2026-08-05">05\/08\/2026<\/time>/i);
  assert.match(
    html,
    /Responsable editorial de[\s\S]{0,120}FrescoCerca[\s\S]{0,120}5 de agosto de 2026/,
  );
  assert.match(html, /"dateModified":"2026-08-05"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /aria-label="Contenido de la guía"/);
  assert.match(html, /id="hora-por-ciudad"/);
  assert.match(html, /id="total-o-parcial"/);
  assert.match(html, /id="nubes"/);
  assert.match(html, /id="seguridad"/);
  assert.match(html, /id="perseidas"/);
  assert.match(html, /Horarios oficiales de referencia del eclipse solar/);
  assert.match(html, /<th scope="col">Ciudad<\/th>/);
  assert.match(html, /role="region" aria-label="Horarios por ciudad/);
  assert.match(html, /class="eclipse-facts" role="list"/);
  assert.match(html, /Madrid[\s\S]*99 % de cobertura/);
  assert.match(html, /Barcelona[\s\S]*99 % de cobertura/);
  assert.match(html, /EN ISO 12312-2:2015/);
  assert.match(html, /visualizadores\.ign\.es\/eclipses\/2026/);
  assert.match(html, /aemet\.es\/es\/noticias\/2026\/05\/estudio_nubosidad_eclipse/);
  assert.match(html, /dgt\.es\/comunicacion\/notas-de-prensa\/20260122-resolucion/);
  assert.match(html, /astronomia\.ign\.es\/perseidas/);
  assert.match(html, /href="\/desde\/madrid"/);
  assert.match(html, /href="\/desde\/barcelona"/);
  assert.match(html, /href="\/guias\/escapadas-frescas-sin-coche"/);
  assert.match(html, /href="\/guias\/escapadas-frescas-de-fin-de-semana"/);
});

test("renders the editorial identity, Article schema and visual on key routes", async () => {
  for (const pathname of [
    "/eclipse-2026",
    "/destinos",
    "/desde",
    "/desde/barcelona",
  ]) {
    const response = await render(pathname);
    const html = await response.text();

    assert.equal(response.status, 200, pathname);
    assert.match(html, /Francisco Javier Sanchez Fuentes/, pathname);
    assert.match(html, /"@type":"Article"/, pathname);
    assert.match(
      html,
      /frescocerca-refugio-editorial-og\.jpg/,
      pathname,
    );
    assert.match(html, /frescocerca-refugio-editorial\.webp/, pathname);
    assert.match(html, /Ilustraci.n editorial\./, pathname);
  }
});

test("publishes an honest visible responsible-editor profile", async () => {
  const response = await render("/sobre-frescocerca");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /id="responsable-editorial"/);
  assert.match(html, /Francisco Javier Sanchez Fuentes/);
  assert.match(html, /no atribuye titulaciones/i);
  assert.match(html, /"@type":"Person"/);
});

test("destination articles use the central person author and editorial image", async () => {
  const response = await render("/destinos/capileira");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Francisco Javier Sanchez Fuentes/);
  assert.match(html, /frescocerca-refugio-editorial-og\.jpg/);
  assert.match(html, /"author":\{"@type":"Person"/);
  assert.match(html, /"publisher":\{"@type":"Organization"/);
  assert.doesNotMatch(html, /Equipo editorial FrescoCerca/);
});

test("publishes the new high-intent guides with sources and rich metadata", async () => {
  const slugs = [
    "pueblos-con-noches-frescas-en-verano",
    "escapadas-frescas-sin-coche",
    "escapadas-frescas-de-fin-de-semana",
  ];

  for (const slug of slugs) {
    const response = await render(`/guias/${slug}`);
    const html = await response.text();

    assert.equal(response.status, 200, slug);
    assert.match(
      html,
      new RegExp(
        `<link rel="canonical" href="https://frescocerca\\.vercel\\.app/guias/${slug}"`,
      ),
    );
    assert.match(html, /Información oficial consultada/);
    assert.match(html, /FAQPage/);
    assert.match(html, /property="og:image"/);
    assert.match(html, /frescocerca-refugio-editorial-og\.jpg/);
    assert.match(html, /Francisco Javier Sanchez Fuentes/);
    assert.match(html, /"author":\{"@type":"Person"/);
    assert.doesNotMatch(html, /Equipo editorial FrescoCerca/);
    assert.match(html, /29 de julio de 2026/);
  }
});

test("includes every new guide in the sitemap", async () => {
  const response = await render("/sitemap.xml");
  const xml = await response.text();

  assert.equal(response.status, 200);
  assert.match(xml, /guias\/pueblos-con-noches-frescas-en-verano/);
  assert.match(xml, /guias\/escapadas-frescas-sin-coche/);
  assert.match(xml, /guias\/escapadas-frescas-de-fin-de-semana/);
});

test("publishes the eclipse review date and current update frequency", async () => {
  const response = await render("/sitemap.xml");
  const xml = await response.text();

  assert.equal(response.status, 200);
  assert.match(
    xml,
    /<loc>https:\/\/frescocerca\.vercel\.app\/eclipse-2026<\/loc>[\s\S]*?<lastmod>2026-08-05T00:00:00\.000Z<\/lastmod>[\s\S]*?<changefreq>daily<\/changefreq>/,
  );
});

test("keeps legal information available but out of the search index", async () => {
  for (const { pathname, modified } of [
    { pathname: "/aviso-legal", modified: "2026-07-27" },
    { pathname: "/privacidad", modified: "2026-07-27" },
    { pathname: "/cookies", modified: "2026-08-05" },
  ]) {
    const response = await render(pathname);
    const html = await response.text();

    assert.equal(response.status, 200, pathname);
    assert.match(
      html,
      /<meta name="robots" content="noindex, follow"\s*\/?>/i,
      pathname,
    );
    assert.match(html, new RegExp(`"dateModified":"${modified}"`), pathname);
    assert.match(html, new RegExp(`<time dateTime="${modified}">`, "i"), pathname);
  }
});

test("excludes noindex legal routes from the sitemap", async () => {
  const response = await render("/sitemap.xml");
  const xml = await response.text();

  assert.equal(response.status, 200);
  assert.doesNotMatch(xml, /<loc>[^<]*\/aviso-legal<\/loc>/);
  assert.doesNotMatch(xml, /<loc>[^<]*\/privacidad<\/loc>/);
  assert.doesNotMatch(xml, /<loc>[^<]*\/cookies<\/loc>/);
});

test("shared ranking prioritizes nighttime relief over a cooler daytime maximum", () => {
  const origin = {
    slug: "test-origin",
    nombre: "Origen",
    provincia: "Pruebas",
    coordenadas: { lat: 40, lng: -3 },
    maximaEstivalOrientativaC: 36,
    minimaNocturnaEstivalOrientativaC: 24,
  };
  const commonDestination = {
    provincia: "Pruebas",
    comunidad: "Región de pruebas",
    coordenadas: { lat: 40.1, lng: -3.1 },
    altitudM: 1_000,
    etiquetas: ["naturaleza"],
    descripcion: "Destino de prueba.",
    mejorPara: ["Pruebas"],
    fuente: "Fuente de prueba",
    fuenteUrl: "https://example.com",
    metodologia: "Metodología de prueba",
    lat: 40.1,
    lng: -3.1,
    altitude: 1_000,
  };
  const coolerDay = {
    ...commonDestination,
    slug: "dia-fresco",
    nombre: "Día fresco",
    climaVerano: {
      maximasC: [20, 22],
      minimasC: [19, 21],
      periodo: "julio-agosto",
    },
    summerHigh: 21,
    summerLow: 20,
  };
  const coolerNight = {
    ...commonDestination,
    slug: "noche-fresca",
    nombre: "Noche fresca",
    climaVerano: {
      maximasC: [28, 30],
      minimasC: [10, 12],
      periodo: "julio-agosto",
    },
    summerHigh: 29,
    summerLow: 11,
  };

  const [first] = rankDestinations([coolerDay, coolerNight], {
    origin,
    maxTravelHours: 5,
    limit: 2,
  });

  assert.equal(first.destination.slug, "noche-fresca");
});

test("city guide ranking enforces a reasonable travel limit for every origin", () => {
  for (const origin of ORIGIN_CITIES) {
    const results = rankDestinations(DESTINATIONS, {
      origin,
      maxTravelHours: CITY_GUIDE_MAX_TRAVEL_HOURS,
      limit: 6,
      diversify: true,
    });

    assert.equal(results.length, 6, `expected six results for ${origin.slug}`);
    assert.ok(
      results.every(
        (result) =>
          result.estimatedTravelHours <= CITY_GUIDE_MAX_TRAVEL_HOURS,
      ),
      `found an over-limit result for ${origin.slug}`,
    );
  }
});

test("city guide ranking removes former long-distance anomalies and keeps variety", () => {
  const resultSlugs = (originSlug) => {
    const origin = ORIGIN_CITIES.find((city) => city.slug === originSlug);
    assert.ok(origin);

    return rankDestinations(DESTINATIONS, {
      origin,
      maxTravelHours: CITY_GUIDE_MAX_TRAVEL_HOURS,
      limit: 6,
      diversify: true,
    });
  };

  const malaga = resultSlugs("malaga");
  const bilbao = resultSlugs("bilbao");
  const sevilla = resultSlugs("sevilla");
  const madrid = resultSlugs("madrid");

  assert.ok(
    !malaga.some(({ destination }) => destination.slug === "valdelinares"),
  );
  assert.ok(
    !bilbao.some(({ destination }) => destination.slug === "valdelinares"),
  );
  assert.ok(
    !sevilla.some(
      ({ destination }) => destination.slug === "navarredonda-de-gredos",
    ),
  );

  const madridRegionCounts = Object.groupBy(
    madrid,
    ({ destination }) => destination.comunidad,
  );
  assert.ok(Object.keys(madridRegionCounts).length >= 3);
  assert.ok(
    Object.values(madridRegionCounts).every(
      (destinations) => (destinations?.length ?? 0) <= 2,
    ),
  );
});
