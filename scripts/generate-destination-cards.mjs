// Genera una ficha visual (1200×630, WebP) por destino a partir de los datos de
// lib/destinations.ts: altitud y rangos orientativos de julio y agosto. Sirve como
// og:image propia de cada ficha y como imagen para Google Imágenes y la búsqueda
// multimodal. No añade ningún dato que no esté ya en la página.
//
// Uso: node --experimental-strip-types scripts/generate-destination-cards.mjs
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { DESTINATIONS, CLIMATE_METHODOLOGY } = await import(
  path.join(root, "lib/destinations.ts")
);
const outDir = path.join(root, "public/images/destinos");
await mkdir(outDir, { recursive: true });

const W = 1200;
const H = 630;
const SCALE_MIN = 5;
const SCALE_MAX = 40;
const BAR_X = 80;
const BAR_W = 1040;

const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const xFor = (celsius) =>
  BAR_X + ((celsius - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * BAR_W;

function rangeBar(y, label, range, color) {
  const [from, to] = range;
  const x1 = xFor(from);
  const x2 = xFor(to);
  return `
  <text x="${BAR_X}" y="${y - 16}" font-size="24" font-weight="600" fill="#153a43">${esc(label)}</text>
  <rect x="${BAR_X}" y="${y}" width="${BAR_W}" height="28" rx="14" fill="#e6efef"/>
  <rect x="${x1}" y="${y}" width="${x2 - x1}" height="28" rx="14" fill="${color}"/>
  <text x="${x2 + 14}" y="${y + 22}" font-size="24" font-weight="700" fill="#153a43">${from}–${to} °C</text>`;
}

function ticks(y) {
  let out = "";
  for (let c = 10; c <= 35; c += 5) {
    const x = xFor(c);
    out += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 8}" stroke="#8aa3a6"/>`;
    out += `<text x="${x}" y="${y + 30}" font-size="18" fill="#5b7275" text-anchor="middle">${c} °C</text>`;
  }
  return out;
}

function card(d) {
  const title = d.nombre.length > 24 ? 50 : 60;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Inter, sans-serif">
  <rect width="${W}" height="${H}" fill="#f7fbfa"/>
  <rect width="${W}" height="10" fill="#153a43"/>
  <text x="${BAR_X}" y="96" font-size="22" font-weight="600" fill="#2d7a77">${esc(d.provincia)} · ${esc(d.comunidad)}</text>
  <text x="${BAR_X}" y="${96 + title + 6}" font-size="${title}" font-weight="800" fill="#10262c">${esc(d.nombre)}</text>
  <text x="1120" y="64" font-size="24" font-weight="800" fill="#153a43" text-anchor="end">FrescoCerca</text>
  <rect x="${BAR_X}" y="200" width="250" height="56" rx="28" fill="#153a43"/>
  <text x="${BAR_X + 125}" y="237" font-size="26" font-weight="700" fill="#fff" text-anchor="middle">${d.altitudM.toLocaleString("es-ES")} m de altitud</text>
  <text x="${BAR_X + 280}" y="237" font-size="22" fill="#3d5659">Referencia orientativa de julio y agosto</text>
  ${rangeBar(338, "Noches (mínimas)", d.climaVerano.minimasC, "#3f8fb0")}
  ${rangeBar(436, "Días (máximas)", d.climaVerano.maximasC, "#e08a3c")}
  ${ticks(476)}
  <line x1="${BAR_X}" y1="548" x2="1120" y2="548" stroke="#d3e0e0"/>
  <text x="${BAR_X}" y="586" font-size="18" fill="#5b7275">Estimación editorial a partir de ${esc(CLIMATE_METHODOLOGY.fuente)}. No es una predicción.</text>
</svg>`;
}

for (const d of DESTINATIONS) {
  const file = path.join(outDir, `${d.slug}.webp`);
  await sharp(Buffer.from(card(d)), { density: 72 })
    .webp({ quality: 82 })
    .toFile(file);
}
console.log(`${DESTINATIONS.length} fichas en ${path.relative(root, outDir)}`);
