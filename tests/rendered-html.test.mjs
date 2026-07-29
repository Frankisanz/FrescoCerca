import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

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
  assert.match(html, /Dónde ver el eclipse/i);
  assert.match(html, /rel=["']canonical["']/i);
  assert.match(html, /Instituto Geográfico Nacional/i);
});
