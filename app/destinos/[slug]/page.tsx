import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  editorialDestinations as destinations,
  getDestination,
  getDestinationCatalogBenchmark,
  getNearbyDestinations,
  serializeJsonLd,
} from "@/lib/content";
import { getDestinationEditorial } from "@/lib/destination-editorial";
import { CLIMATE_METHODOLOGY } from "@/lib/destinations";
import {
  createArticleJsonLd,
  createArticleMetadata,
  EDITORIAL_PUBLISHED_DATE,
  EDITORIAL_REVIEW_DATE,
  siteConfig,
} from "@/lib/site";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

function formatRange(range: readonly [number, number]) {
  return `${range[0]}–${range[1]} °C`;
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  const editorial = getDestinationEditorial(slug);

  if (!destination || !editorial) {
    return { title: "Destino no encontrado" };
  }

  return createArticleMetadata({
    title: editorial.seoTitle,
    description: editorial.seoDescription,
    path: `/destinos/${destination.slug}`,
    publishedTime: EDITORIAL_PUBLISHED_DATE,
    modifiedTime: EDITORIAL_REVIEW_DATE,
  });
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestination(slug);
  const editorial = getDestinationEditorial(slug);

  if (!destination) {
    notFound();
  }

  if (!editorial) {
    throw new Error(`Falta contenido editorial para ${destination.slug}`);
  }

  const nearby = getNearbyDestinations(destination);
  const benchmark = getDestinationCatalogBenchmark(destination);
  const comparisonRows = [
    { destination, distance: 0 },
    ...nearby.map((candidate) => ({
      destination: candidate.destination,
      distance: candidate.distance,
    })),
  ];
  const climateReviewLabel = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${CLIMATE_METHODOLOGY.revisado}T00:00:00Z`));
  const destinationUrl =
    `/destinos/${destination.slug}` as `/destinos/${string}`;
  const destinationAbsoluteUrl = absoluteUrl(destinationUrl);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Destinos", path: "/destinos" },
    { name: destination.name, path: destinationUrl },
  ]);
  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "@id": `${destinationAbsoluteUrl}#destination`,
    name: destination.name,
    description: editorial.localOverview,
    url: destinationAbsoluteUrl,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: `${destination.province}, ${destination.region}`,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: destination.lat,
      longitude: destination.lng,
      elevation: destination.altitude,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Máximas estivales orientativas",
        value: formatRange(destination.summerHighRange),
      },
      {
        "@type": "PropertyValue",
        name: "Mínimas estivales orientativas",
        value: formatRange(destination.summerLowRange),
      },
    ],
  };
  const articleJsonLd = {
    ...createArticleJsonLd({
      title: editorial.seoTitle,
      description: editorial.seoDescription,
      path: destinationUrl,
      citations: editorial.sources.map((source) => source.url),
      articleSection: "Destinos para noches más frescas",
      publishedTime: EDITORIAL_PUBLISHED_DATE,
      modifiedTime: EDITORIAL_REVIEW_DATE,
    }),
    about: { "@id": `${destinationAbsoluteUrl}#destination` },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `¿Hace fresco en ${destination.name} durante el verano?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `La estimación editorial orientativa de FrescoCerca sitúa el rango de máximas entre ${formatRange(destination.summerHighRange)} y el de mínimas entre ${formatRange(destination.summerLowRange)}. Se basa en información climática abierta de AEMET, pero no reproduce una estación concreta ni es una predicción: comprueba AEMET para las fechas del viaje.`,
        },
      },
      {
        "@type": "Question",
        name: `¿Qué debo mirar al reservar en ${destination.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: editorial.stayAdvice,
        },
      },
      {
        "@type": "Question",
        name: `¿Cómo organizar el día si hace calor en ${destination.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Prioriza ${editorial.dayPlan[0].title.toLowerCase()} por la mañana, ${editorial.dayPlan[1].title.toLowerCase()} durante las horas centrales y ${editorial.dayPlan[2].title.toLowerCase()} al final del día. Adapta siempre el plan a los avisos y condiciones reales.`,
        },
      },
    ],
  };

  return (
    <main id="contenido" className="content-shell destination-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([
            breadcrumb,
            placeJsonLd,
            articleJsonLd,
            faqJsonLd,
          ]),
        }}
      />

      <nav className="content-breadcrumb" aria-label="Migas de pan">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link href="/destinos">Destinos</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{destination.name}</span>
      </nav>

      <header className="content-hero destination-hero">
        <div className="destination-hero__copy">
          <p className="content-eyebrow">
            {destination.province} · {destination.region}
          </p>
          <h1>{editorial.seoTitle}</h1>
          <p className="content-lead">{destination.description}</p>
          <ul className="destination-tags" aria-label="Ideal para">
            {destination.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <p className="editorial-byline">
            <Link href={siteConfig.editorial.profilePath}>
              {siteConfig.editorial.responsible}
            </Link>
            <span aria-hidden="true">·</span>
            <time dateTime={CLIMATE_METHODOLOGY.revisado}>
              Fuentes revisadas el {climateReviewLabel}
            </time>
          </p>
        </div>

        <aside
          className="destination-summary"
          aria-label={`Datos orientativos de ${destination.name}`}
        >
          <p>Referencia de julio y agosto</p>
          <dl className="destination-summary__metrics">
            <div>
              <dt>Máximas</dt>
              <dd>{formatRange(destination.summerHighRange)}</dd>
            </div>
            <div>
              <dt>Mínimas</dt>
              <dd>{formatRange(destination.summerLowRange)}</dd>
            </div>
            <div>
              <dt>Altitud</dt>
              <dd>{destination.altitude.toLocaleString("es-ES")} m</dd>
            </div>
          </dl>
          <small>
            Referencias históricas redondeadas. Consulta la predicción antes de
            reservar.
          </small>
        </aside>
      </header>

      <div className="content-notice" role="note">
        <strong>No es una previsión meteorológica.</strong> Esta ficha sirve para
        comparar. Revisa AEMET, avisos, accesos y condiciones del alojamiento
        para las fechas concretas.
      </div>

      <div className="destination-layout">
        <article className="article-body destination-article">
          <section className="article-section">
            <p className="content-kicker">Contexto local</p>
            <h2>Qué hace diferente a {destination.name}</h2>
            <p>{editorial.localOverview}</p>
            <p>{editorial.coolingFactors}</p>
            <p>
              La estimación editorial utilizada se mueve entre{" "}
              {formatRange(destination.summerHighRange)} de máxima y{" "}
              {formatRange(destination.summerLowRange)} de mínima. La noche, la
              orientación del alojamiento y el episodio meteorológico concreto
              importan más que una media aislada.
            </p>
            <div className="destination-benchmark" role="group" aria-label="Posición dentro del catálogo">
              <div>
                <strong>{benchmark.nightPosition} de {benchmark.total}</strong>
                <span>por mínima nocturna de referencia</span>
              </div>
              <div>
                <strong>{benchmark.altitudePosition} de {benchmark.total}</strong>
                <span>por altitud, de mayor a menor</span>
              </div>
              <div>
                <strong>
                  {benchmark.differenceFromMedian === 0
                    ? "Igual a la mediana"
                    : benchmark.differenceFromMedian < 0
                      ? Math.abs(benchmark.differenceFromMedian) + " °C menos"
                      : benchmark.differenceFromMedian + " °C más"}
                </strong>
                <span>frente a la mediana nocturna del catálogo</span>
              </div>
            </div>
            <p className="catalog-method-note">
              La posición compara el valor central de nuestras bandas
              editoriales. No convierte la estimación en una medición local ni
              anticipa el tiempo de una fecha concreta.
            </p>
          </section>

          <section className="article-section">
            <p className="content-kicker">Un día con sentido</p>
            <h2>Plan adaptado a las horas de calor</h2>
            <ol className="destination-day-plan">
              {editorial.dayPlan.map((item) => (
                <li key={item.time}>
                  <span>{item.time}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="article-section">
            <p className="content-kicker">Preparar la estancia</p>
            <h2>Dónde dormir y cómo llegar</h2>
            <div className="destination-practical-grid">
              <div>
                <h3>Al elegir alojamiento</h3>
                <p>{editorial.stayAdvice}</p>
              </div>
              <div>
                <h3>Acceso y desplazamientos</h3>
                <p>{editorial.accessAdvice}</p>
              </div>
            </div>
            <h3 className="destination-checks-title">Tres comprobaciones locales</h3>
            <ul className="article-checklist">
              {editorial.checks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </section>

          <section className="article-section destination-sources">
            <p className="content-kicker">Trazabilidad</p>
            <h2>Fuente marco, estimación y límites</h2>
            <p>
              Los rangos térmicos son estimaciones editoriales orientativas,
              redondeadas a partir de mapas y datos climáticos abiertos de
              AEMET, la altitud y el contexto geográfico. No reproducen la tabla
              de una estación concreta ni una medición directa de este
              municipio. Los planes y accesos se contrastan con estas fuentes:
            </p>
            <ul>
              <li>
                <a href={destination.sourceUrl} rel="noreferrer" target="_blank">
                  AEMET: mapas y valores climatológicos normales
                </a>
                <span>{destination.sourceNote}</span>
              </li>
              {editorial.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} rel="noreferrer" target="_blank">
                    {source.label}
                  </a>
                  <span>{source.supports}</span>
                </li>
              ))}
            </ul>
            <p className="destination-sources__note">
              Los horarios, aforos, permisos y accesos pueden cambiar. Confirma
              siempre la información vigente en la fuente enlazada.
            </p>
          </section>

          <section className="article-section article-faq">
            <p className="content-kicker">Preguntas frecuentes</p>
            <h2>Antes de viajar a {destination.name}</h2>
            <details>
              <summary>¿Hace fresco en verano?</summary>
              <p>
                Puede ofrecer una referencia más suave que una ciudad baja y
                continental, especialmente por la noche, pero no hay garantía.
                Compara la mínima prevista de tus fechas y los avisos oficiales.
              </p>
            </details>
            <details>
              <summary>¿Qué importancia tiene la altitud?</summary>
              <p>
                Sus {destination.altitude.toLocaleString("es-ES")} metros ayudan
                a interpretar el contexto, pero relieve, humedad, viento, sombra
                y edificio también condicionan el descanso.
              </p>
            </details>
            <details>
              <summary>¿Qué debo preguntar al alojamiento?</summary>
              <p>{editorial.stayAdvice}</p>
            </details>
          </section>
        </article>

        <aside className="destination-aside">
          <div className="destination-aside__panel">
            <p className="content-kicker">Ficha rápida</p>
            <h2>Ideal para</h2>
            <p>{destination.bestFor}</p>
          </div>
          <div className="destination-aside__panel">
            <p className="content-kicker">Coordenadas</p>
            <p>
              {destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}
            </p>
            <small>
              Úsalas solo como referencia general; confirma la dirección del
              alojamiento.
            </small>
          </div>
          <div className="destination-aside__panel">
            <p className="content-kicker">Cómo se ha hecho</p>
            <p>
              Datos comparables, contexto local y enlaces a fuentes públicas,
              sin posiciones patrocinadas.
            </p>
            <Link className="content-text-link" href="/metodologia">
              Ver metodología <span aria-hidden="true">→</span>
            </Link>
          </div>
          <Link
            className="content-cta"
            href="/guias/pueblos-con-noches-frescas-en-verano"
          >
            Cómo encontrar una noche más fresca
            <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </div>

      {nearby.length > 0 && (
        <section className="content-section content-section--soft">
          <div className="content-section-heading">
            <div>
              <p className="content-kicker">Sigue comparando</p>
              <h2>Otros destinos relativamente cercanos</h2>
            </div>
            <p>
              Distancias geográficas aproximadas; no representan kilómetros ni
              duración exacta por carretera.
            </p>
          </div>
          <div className="catalog-table-wrap" tabIndex={0}>
            <table className="catalog-table catalog-table--compact">
              <caption>
                {destination.name} frente a tres alternativas cercanas
              </caption>
              <thead>
                <tr>
                  <th scope="col">Destino</th>
                  <th scope="col">Mínimas</th>
                  <th scope="col">Máximas</th>
                  <th scope="col">Altitud</th>
                  <th scope="col">Distancia geográfica</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(({ destination: candidate, distance }) => (
                  <tr key={candidate.slug}>
                    <th scope="row">
                      {candidate.slug === destination.slug ? (
                        <strong>{candidate.name} (actual)</strong>
                      ) : (
                        <Link href={"/destinos/" + candidate.slug}>
                          {candidate.name}
                        </Link>
                      )}
                    </th>
                    <td>{formatRange(candidate.summerLowRange)}</td>
                    <td>{formatRange(candidate.summerHighRange)}</td>
                    <td>{candidate.altitude.toLocaleString("es-ES")} m</td>
                    <td>{distance === 0 ? "—" : distance + " km aprox."}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}
