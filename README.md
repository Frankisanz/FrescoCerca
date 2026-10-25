# FrescoCerca

FrescoCerca ayuda a descubrir destinos españoles donde las noches de verano
pueden ser más llevaderas. Combina referencias climáticas, altitud, cercanía y
preferencias de viaje en un buscador editorial transparente.

El proyecto incluye:

- buscador interactivo con 30 destinos y 14 ciudades de salida;
- fichas indexables de destinos y guías desde cada ciudad;
- biblioteca editorial, especial del eclipse de 2026 y enlazado interno;
- metadatos, datos estructurados, `robots.txt`, sitemap y tarjeta social;
- páginas de metodología, privacidad, cookies y aviso legal.

Las referencias climáticas son orientativas y no sustituyen la predicción
meteorológica oficial.

## Desarrollo local

Requiere Node.js 22.13 o superior.

```bash
npm install
npm run dev
```

La web queda disponible en `http://localhost:3000`.

## Verificación

```bash
npm run lint
npm run build
npm run build:vercel
npm test
```

`npm run build` valida la versión de Sites/vinext y `npm run build:vercel`
genera la aplicación nativa de Next.js que se publica en Vercel.

## URL canónica

En producción puede configurarse `NEXT_PUBLIC_SITE_URL` con la URL pública final:

```bash
NEXT_PUBLIC_SITE_URL=https://frescocerca.es
```

Si no se define, la aplicación usa `https://frescocerca.es`.

## Contenido y datos

- `lib/destinations.ts`: destinos, ciudades de origen y referencias.
- `lib/content.ts`: guías editoriales y contenido SEO.
- `lib/site.ts`: configuración central de dominio, marca y datos legales.
- `app/sitemap.ts`: inventario de rutas públicas para buscadores.

Antes de ampliar el dataset deben verificarse fuentes, fechas y criterios con la
metodología publicada en `/metodologia`.

## Fichas visuales de destino

Cada destino tiene una imagen propia en `public/images/destinos/<slug>.webp` (1200×630). Muestra la altitud y los
rangos orientativos de julio y agosto que ya figuran en la ficha. Se usa como `og:image`, como `ImageObject` del
Article y en el sitemap de imágenes, y se muestra en la página con su texto alternativo y su pie. Si cambias o añades
un destino en `lib/destinations.ts`, regenera las imágenes:

```bash
node --experimental-strip-types scripts/generate-destination-cards.mjs
```

Las guías siguen sin imagen social genérica. `/llms.txt` se genera desde los mismos datos que las páginas.
