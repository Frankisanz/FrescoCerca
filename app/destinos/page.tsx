import type { Metadata } from "next";
import Link from "next/link";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  editorialDestinations as destinations,
  formatCelsius,
  fromCities,
  guides,
  serializeJsonLd,
} from "@/lib/content";

const title = "Destinos frescos de España para este verano";
const description =
  "Explora pueblos y destinos de montaña con datos estivales de referencia, altitud y criterios prácticos para preparar una escapada con menos calor.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/destinos") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/destinos"),
    type: "website",
  },
};

export default function DestinationsIndexPage() {
  const sortedDestinations = [...destinations].sort(
    (left, right) =>
      left.summerHigh - right.summerHigh ||
      right.altitude - left.altitude ||
      left.name.localeCompare(right.name, "es"),
  );

  const breadcrumb = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Destinos", path: "/destinos" },
  ]);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Destinos frescos de España",
    numberOfItems: sortedDestinations.length,
    itemListElement: sortedDestinations.map((destination, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: destination.name,
      url: absoluteUrl(`/destinos/${destination.slug}`),
    })),
  };

  return (
    <main id="contenido" className="content-shell destinations-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([breadcrumb, itemList]),
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
          el tiempo durante una estancia concreta.
        </div>
      </header>

      <section className="content-section" aria-labelledby="listado-destinos">
        <div className="content-section-heading">
          <div>
            <p className="content-kicker">{sortedDestinations.length} lugares</p>
            <h2 id="listado-destinos">Compara antes de elegir</h2>
          </div>
          <p>
            La lista comienza por las máximas estivales de referencia más
            contenidas. La distancia y la previsión de tus fechas pueden cambiar
            por completo cuál es la mejor opción.
          </p>
        </div>

        <div className="destination-grid">
          {sortedDestinations.map((destination) => (
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
    </main>
  );
}
