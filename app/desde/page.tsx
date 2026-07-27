import type { Metadata } from "next";
import Link from "next/link";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  fromCities,
  getDestinationCandidates,
  serializeJsonLd,
} from "@/lib/content";

const title = "Escapadas frescas desde tu ciudad";
const description =
  "Consulta guías de salida desde Madrid, Sevilla, Córdoba, Jaén, Úbeda, Murcia, Zaragoza, Toledo y Valladolid para comparar destinos menos calurosos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/desde") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/desde"),
    type: "website",
  },
};

export default function FromCitiesIndexPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Desde tu ciudad", path: "/desde" },
  ]);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Guías de escapadas frescas por ciudad de salida",
    numberOfItems: fromCities.length,
    itemListElement: fromCities.map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: city.title,
      url: absoluteUrl(`/desde/${city.slug}`),
    })),
  };

  return (
    <main id="contenido" className="content-shell from-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([breadcrumb, itemList]),
        }}
      />

      <nav className="content-breadcrumb" aria-label="Migas de pan">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Desde tu ciudad</span>
      </nav>

      <header className="content-hero content-hero--from">
        <p className="content-eyebrow">Punto de partida</p>
        <h1>{title}</h1>
        <p className="content-lead">
          El mejor lugar no es solo el que tiene una temperatura menor: debe
          compensar el trayecto. Estas guías combinan cercanía geográfica,
          altitud y referencias estivales para crear una primera lista corta.
        </p>
      </header>

      <section className="content-section" aria-labelledby="ciudades-salida">
        <div className="content-section-heading">
          <div>
            <p className="content-kicker">{fromCities.length} puntos de salida</p>
            <h2 id="ciudades-salida">Elige tu ciudad</h2>
          </div>
          <p>
            Cada guía explica una estrategia distinta según las sierras,
            carreteras y alternativas accesibles desde ese origen.
          </p>
        </div>

        <div className="from-grid">
          {fromCities.map((city) => {
            const candidates = getDestinationCandidates(city, 3);
            return (
              <article className="from-card" key={city.slug}>
                <p className="from-card__region">{city.province}</p>
                <h2>
                  <Link href={`/desde/${city.slug}`}>{city.title}</Link>
                </h2>
                <p>{city.description}</p>
                {candidates.length > 0 && (
                  <p className="from-card__preview">
                    Algunos candidatos:{" "}
                    {candidates
                      .map(({ destination }) => destination.name)
                      .join(", ")}
                    .
                  </p>
                )}
                <Link className="content-text-link" href={`/desde/${city.slug}`}>
                  Abrir guía de salida <span aria-hidden="true">→</span>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="content-section content-section--soft">
        <div className="content-section-heading">
          <div>
            <p className="content-kicker">Cómo funciona</p>
            <h2>Una selección para explorar, no una promesa</h2>
          </div>
        </div>
        <ol className="content-steps">
          <li>
            <span>01</span>
            <div>
              <h3>Acotamos la distancia</h3>
              <p>
                Usamos distancia en línea recta para ordenar posibilidades, no
                como sustituto de un navegador.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Comparamos referencias</h3>
              <p>
                Altitud y temperaturas estivales ayudan a descubrir candidatos
                con perfiles diferentes.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Tú verificas el viaje</h3>
              <p>
                Predicción, carretera y alojamiento deben comprobarse para la
                fecha exacta antes de reservar.
              </p>
            </div>
          </li>
        </ol>
      </section>
    </main>
  );
}
