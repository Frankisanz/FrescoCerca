import type { Metadata } from "next";
import Link from "next/link";
import { EditorialByline } from "@/app/components/editorial-byline";
import { EditorialHeroImage } from "@/app/components/editorial-hero-image";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  formatCelsius,
  fromCities,
  getRankedDestinations,
  guides,
  serializeJsonLd,
} from "@/lib/content";
import { CLIMATE_METHODOLOGY } from "@/lib/destinations";
import {
  createArticleJsonLd,
  createArticleMetadata,
} from "@/lib/site";

const title = "Destinos frescos de España para este verano";
const description =
  "Explora pueblos y destinos de montaña con datos estivales de referencia, altitud y criterios prácticos para preparar una escapada con menos calor.";

export const metadata: Metadata = createArticleMetadata({
  title,
  description,
  path: "/destinos",
});

const regionalApproaches = [
  {
    kicker: "Norte y cordilleras",
    title: "Noches frescas en el norte y los Pirineos",
    text: "Compara el núcleo exacto y no solo la comunidad autónoma: la altitud, el fondo de valle, la humedad y el alojamiento pueden cambiar el descanso.",
    links: [
      { label: "Ochagavía", href: "/destinos/ochagavia" },
      { label: "Boí", href: "/destinos/boi" },
      { label: "Pola de Somiedo", href: "/destinos/pola-de-somiedo" },
    ],
  },
  {
    kicker: "Centro e interior alto",
    title: "Pueblos de montaña para dormir sin calor acumulado",
    text: "Las zonas elevadas pueden perder temperatura al anochecer, aunque una tarde soleada siga siendo intensa. Revisa orientación, sombra y ventilación del dormitorio.",
    links: [
      { label: "Valdelinares", href: "/destinos/valdelinares" },
      {
        label: "Navarredonda de Gredos",
        href: "/destinos/navarredonda-de-gredos",
      },
      { label: "Bronchales", href: "/destinos/bronchales" },
    ],
  },
  {
    kicker: "Sierras del sur",
    title: "Escapadas con menos calor desde Andalucía y el sureste",
    text: "Busca un alivio relativo, no una promesa de frío. La cota, la mínima prevista y una habitación protegida del sol de tarde pesan más que la etiqueta de «casa rural».",
    links: [
      { label: "Capileira", href: "/destinos/capileira" },
      { label: "Grazalema", href: "/destinos/grazalema" },
      { label: "Cazorla", href: "/destinos/cazorla" },
    ],
  },
] as const;

export default function DestinationsIndexPage() {
  const rankedDestinations = getRankedDestinations();

  const breadcrumb = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Destinos", path: "/destinos" },
  ]);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Destinos frescos de España",
    numberOfItems: rankedDestinations.length,
    itemListElement: rankedDestinations.map((destination, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: destination.name,
      url: absoluteUrl(`/destinos/${destination.slug}`),
    })),
  };
  const articleJsonLd = createArticleJsonLd({
    title,
    description,
    path: "/destinos",
    articleSection: "Destinos frescos de España",
    citations: [CLIMATE_METHODOLOGY.fuenteUrl],
  });

  return (
    <main id="contenido" className="content-shell destinations-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([breadcrumb, articleJsonLd, itemList]),
        }}
      />

      <nav className="content-breadcrumb" aria-label="Migas de pan">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Destinos</span>
      </nav>

      <header className="content-hero content-hero--destinations">
        <p className="content-eyebrow">Atlas FrescoCerca</p>
        <h1>{title}</h1>
        <p className="content-lead">
          Una selección editorial para descubrir lugares potencialmente más
          templados. Compara su altitud y referencias climáticas de verano;
          después verifica la predicción oficial para las fechas de tu viaje.
        </p>
        <div className="content-notice" role="note">
          <strong>Información climática, no meteorología en directo.</strong>{" "}
          Las temperaturas son valores orientativos del dataset y no garantizan
          el tiempo durante una estancia concreta. Las estimaciones editoriales
          se apoyan en{" "}
          <a href={CLIMATE_METHODOLOGY.fuenteUrl}>
            mapas y valores climatológicos normales de AEMET
          </a>{" "}
          y se explica en la metodología.
        </div>
        <EditorialByline sourceSummary="Estimaciones de julio y agosto basadas en información climática abierta de AEMET, redondeadas para comparar y nunca presentadas como mediciones directas ni predicciones." />
      </header>

      <EditorialHeroImage
        preload
        caption="El frescor útil suele notarse después del atardecer; la altitud no sustituye la previsión ni las condiciones del alojamiento."
      />

      <section className="content-section" aria-labelledby="listado-destinos">
        <div className="content-section-heading">
          <div>
            <p className="content-kicker">{rankedDestinations.length} lugares</p>
            <h2 id="listado-destinos">Compara antes de elegir</h2>
          </div>
          <p>
            La lista prioriza el alivio nocturno y después el diurno. La
            distancia y la previsión de tus fechas pueden cambiar por completo
            cuál es la mejor opción.
          </p>
        </div>

        <div className="destination-grid">
          {rankedDestinations.map((destination) => (
            <article className="destination-card" key={destination.slug}>
              <div className="destination-card__heading">
                <div>
                  <p className="destination-card__region">
                    {destination.province} · {destination.region}
                  </p>
                  <h3>
                    <Link href={`/destinos/${destination.slug}`}>
                      {destination.name}
                    </Link>
                  </h3>
                </div>
                <span className="destination-card__altitude">
                  {destination.altitude.toLocaleString("es-ES")} m
                </span>
              </div>

              <p>{destination.description}</p>

              <dl className="destination-metrics">
                <div>
                  <dt>Máxima estival</dt>
                  <dd>{formatCelsius(destination.summerHigh)}</dd>
                </div>
                <div>
                  <dt>Mínima estival</dt>
                  <dd>{formatCelsius(destination.summerLow)}</dd>
                </div>
              </dl>

              <ul className="destination-tags" aria-label="Características">
                {destination.tags.slice(0, 3).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <Link
                className="content-text-link"
                href={`/destinos/${destination.slug}`}
                aria-label={`Ver la guía de ${destination.name}`}
              >
                Ver destino <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section content-section--soft">
        <div className="content-section-heading">
          <div>
            <p className="content-kicker">Búsqueda por regiones</p>
            <h2>Qué región comparar para escapar del calor</h2>
          </div>
          <p>
            Una región sirve para acotar la búsqueda. La decisión se toma con
            la localidad, la previsión de tus fechas y las condiciones reales
            del alojamiento.
          </p>
        </div>
        <div className="article-related-grid">
          {regionalApproaches.map((approach) => (
            <article className="article-related-card" key={approach.title}>
              <p>{approach.kicker}</p>
              <h3>{approach.title}</h3>
              <p>{approach.text}</p>
              <p>
                {approach.links.map((link, index) => (
                  <span key={link.href}>
                    {index > 0 && " · "}
                    <Link href={link.href}>{link.label}</Link>
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section content-section--soft">
        <div className="content-section-heading">
          <div>
            <p className="content-kicker">Empieza desde casa</p>
            <h2>Guías según tu ciudad de salida</h2>
          </div>
          <p>
            Ordenamos candidatos por una combinación orientativa de cercanía,
            altitud y temperatura estival de referencia.
          </p>
        </div>
        <div className="content-link-grid">
          {fromCities.map((city) => (
            <Link
              className="content-link-card"
              href={`/desde/${city.slug}`}
              key={city.slug}
            >
              <span>Desde</span>
              <strong>{city.name}</strong>
              <span aria-hidden="true">Explorar opciones →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="content-section-heading">
          <div>
            <p className="content-kicker">Decide con criterio</p>
            <h2>Antes de reservar</h2>
          </div>
        </div>
        <div className="article-related-grid">
          {guides.slice(0, 3).map((guide) => (
            <article className="article-related-card" key={guide.slug}>
              <p>{guide.eyebrow}</p>
              <h3>
                <Link href={`/guias/${guide.slug}`}>{guide.title}</Link>
              </h3>
              <span>{guide.readingMinutes} min de lectura</span>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section content-section--soft">
        <div className="content-section-heading">
          <div>
            <p className="content-kicker">Especial 12 de agosto de 2026</p>
            <h2>¿Buscas un destino para ver el eclipse?</h2>
          </div>
          <p>
            Estar en una zona fresca o elevada no garantiza totalidad ni un
            horizonte visible. Confirma primero el punto en el visor oficial y
            prepara una alternativa meteorológica y de acceso.
          </p>
        </div>
        <Link className="content-text-link" href="/eclipse-2026">
          Preparar una escapada para el eclipse de 2026{" "}
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
