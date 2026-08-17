import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialByline } from "@/app/components/editorial-byline";
import { EditorialHeroImage } from "@/app/components/editorial-hero-image";
import {
  breadcrumbJsonLd,
  formatCelsius,
  fromCities,
  getDestinationCandidates,
  getFromCity,
  serializeJsonLd,
} from "@/lib/content";
import { getDestinationEditorial } from "@/lib/destination-editorial";
import {
  CLIMATE_METHODOLOGY,
  ORIGIN_CLIMATE_METHODOLOGY,
} from "@/lib/destinations";
import {
  CITY_GUIDE_MAX_TRAVEL_HOURS,
  formatTravelTime,
} from "@/lib/destination-ranking";
import {
  createArticleJsonLd,
  createArticleMetadata,
} from "@/lib/site";

type FromCityPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return fromCities.map((city) => ({ slug: city.slug }));
}

function formatRange(range: readonly [number, number]) {
  return range[0] + "–" + range[1] + " °C";
}

export async function generateMetadata({
  params,
}: FromCityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getFromCity(slug);

  if (!city) {
    return { title: "Ciudad de salida no encontrada" };
  }

  const path = `/desde/${city.slug}` as const;
  return createArticleMetadata({
    title: city.title,
    description: city.description,
    path,
  });
}

export default async function FromCityPage({ params }: FromCityPageProps) {
  const { slug } = await params;
  const city = getFromCity(slug);

  if (!city) {
    notFound();
  }

  const candidates = getDestinationCandidates(city, 6);
  const candidateSources = Array.from(
    new Map(
      candidates.flatMap(({ destination }) => {
        const editorial = getDestinationEditorial(destination.slug);
        return (editorial?.sources ?? []).map((source) => [
          source.url,
          { ...source, destinationName: destination.name },
        ] as const);
      }),
    ).values(),
  );
  const candidatesByTravelTime = [...candidates].sort(
    (left, right) => left.estimatedTravelHours - right.estimatedTravelHours,
  );
  const shortestTripCandidate = candidatesByTravelTime[0];
  const comparisonNames = candidates
    .slice(0, 3)
    .map(({ destination }) => destination.name);
  const comparisonLabel = new Intl.ListFormat("es-ES", {
    style: "long",
    type: "conjunction",
  }).format(comparisonNames);
  const path = `/desde/${city.slug}`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Desde tu ciudad", path: "/desde" },
    { name: city.name, path },
  ]);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const citationUrls = Array.from(
    new Set([
      CLIMATE_METHODOLOGY.fuenteUrl,
      ...candidates.map(({ destination }) => destination.sourceUrl),
      ...candidateSources.map((source) => source.url),
    ]),
  );
  const articleJsonLd = createArticleJsonLd({
    title: city.title,
    description: city.description,
    path: path as `/desde/${string}`,
    articleSection: `Escapadas frescas desde ${city.name}`,
    citations: citationUrls,
  });

  return (
    <main id="contenido" className="content-shell from-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([breadcrumb, articleJsonLd, faqJsonLd]),
        }}
      />

      <nav className="content-breadcrumb" aria-label="Migas de pan">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link href="/desde">Desde tu ciudad</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{city.name}</span>
      </nav>

      <header className="content-hero from-hero">
        <p className="content-eyebrow">Guía desde {city.province}</p>
        <h1>{city.title}</h1>
        <p className="content-lead">{city.introduction[0]}</p>
        <p>{city.introduction[1]}</p>
        <div className="content-notice" role="note">
          <strong>Sin previsión en directo.</strong> Las recomendaciones se
          apoyan en referencias geográficas y climáticas. Comprueba el tiempo,
          los avisos y la ruta para tus fechas.
        </div>
        <EditorialByline
          reviewedOn="17 de agosto de 2026"
          sourceSummary="Estimaciones climáticas editoriales basadas en información abierta de AEMET; selección, fuentes locales de cada candidato y tiempos explicados en la metodología pública de FrescoCerca."
        />
      </header>

      <EditorialHeroImage
        preload
        caption={`Una escapada desde ${city.name} debe equilibrar descanso y trayecto: la imagen es editorial y no representa un destino concreto del listado.`}
      />

      <section className="content-section" aria-labelledby="candidatos">
        <div className="content-section-heading">
          <div>
            <p className="content-kicker">Primera lista corta</p>
            <h2 id="candidatos">Destinos para comparar desde {city.name}</h2>
          </div>
          <p>
            Solo mostramos opciones dentro de unas{" "}
            {CITY_GUIDE_MAX_TRAVEL_HOURS} horas estimadas. Confirma siempre la
            ruta y el tráfico reales.
          </p>
        </div>

        {candidates.length > 0 && (
          <div className="catalog-table-wrap" tabIndex={0}>
            <table className="catalog-table origin-comparison-table">
              <caption>
                Matriz de seis candidatos calculada para salir desde {city.name}
              </caption>
              <thead>
                <tr>
                  <th scope="col">Destino</th>
                  <th scope="col">Trayecto estimado</th>
                  <th scope="col">Mínimas</th>
                  <th scope="col">Máximas</th>
                  <th scope="col">Altitud</th>
                  <th scope="col">Alivio nocturno</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(
                  ({ destination, estimatedTravelHours, indicativeDifference }) => (
                    <tr key={destination.slug}>
                      <th scope="row">
                        <Link href={"/destinos/" + destination.slug}>
                          {destination.name}
                        </Link>
                        <span>{destination.province}</span>
                      </th>
                      <td>{formatTravelTime(estimatedTravelHours)}</td>
                      <td>{formatRange(destination.summerLowRange)}</td>
                      <td>{formatRange(destination.summerHighRange)}</td>
                      <td>{destination.altitude.toLocaleString("es-ES")} m</td>
                      <td>
                        {indicativeDifference > 0
                          ? "−" + formatCelsius(indicativeDifference)
                          : "Sin ventaja clara"}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        )}

        {candidates.length > 0 ? (
          <div className="destination-grid">
            {candidates.map(
              ({
                destination,
                distance,
                estimatedTravelHours,
                indicativeDifference,
              }) => (
                <article className="destination-card" key={destination.slug}>
                  <div className="destination-card__heading">
                    <div>
                      <p className="destination-card__region">
                        {destination.province} · aprox. {distance} km en línea
                        recta
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
                      <dt>Trayecto estimado</dt>
                      <dd>{formatTravelTime(estimatedTravelHours)}</dd>
                    </div>
                    <div>
                      <dt>Alivio nocturno</dt>
                      <dd>
                        {indicativeDifference > 0
                          ? `−${formatCelsius(indicativeDifference)}`
                          : "Sin ventaja clara"}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    className="content-text-link"
                    href={`/destinos/${destination.slug}`}
                  >
                    Revisar ficha <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ),
            )}
          </div>
        ) : (
          <div className="content-empty">
            <h3>Estamos ampliando el radio</h3>
            <p>
              Consulta el índice general mientras incorporamos más destinos a
              esta salida.
            </p>
            <Link href="/destinos">Ver todos los destinos</Link>
          </div>
        )}
      </section>

      <div className="article-layout">
        <article className="article-body">
          <section className="article-section">
            <p className="content-kicker">Estrategia local</p>
            <h2>Cómo buscar desde {city.name}</h2>
            <p>{city.strategy}</p>
            <p>{city.routeAdvice}</p>
          </section>

          <section className="article-section">
            <p className="content-kicker">Direcciones posibles</p>
            <h2>Zonas que merece la pena comparar</h2>
            <div className="article-definition-list">
              {city.areaIdeas.map((area) => (
                <div key={area.name}>
                  <h3>{area.name}</h3>
                  <p>{area.reason}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="article-section">
            <p className="content-kicker">Duración y movilidad</p>
            <h2>Plan de 24 o 48 horas desde {city.name}</h2>
            <div className="article-definition-list">
              <div>
                <h3>Si solo tienes 24 horas</h3>
                <p>
                  {shortestTripCandidate ? (
                    <>
                      Empieza comparando{" "}
                      <Link
                        href={`/destinos/${shortestTripCandidate.destination.slug}`}
                      >
                        {shortestTripCandidate.destination.name}
                      </Link>
                      : entre los candidatos mostrados es el de menor tiempo
                      estimado, con{" "}
                      {formatTravelTime(
                        shortestTripCandidate.estimatedTravelHours,
                      )}
                      . Esa cifra no contempla tráfico ni el punto exacto de
                      salida; confírmala antes de elegir.
                    </>
                  ) : (
                    <>
                      Reduce el radio y reserva el tiempo suficiente para
                      comprobar el alojamiento antes de que anochezca.
                    </>
                  )}
                </p>
              </div>
              <div>
                <h3>Si puedes dedicar 48 horas</h3>
                <p>
                  {comparisonLabel
                    ? `Compara ${comparisonLabel} con la misma previsión, el trayecto real y las condiciones del dormitorio. Dos noches permiten ampliar el radio, pero no justifican forzar una ruta con avisos o calor intenso.`
                    : "Compara varias regiones con los mismos criterios y conserva una alternativa interior o más cercana."}
                </p>
              </div>
              <div>
                <h3>Una escapada desde {city.name} sin coche</h3>
                <p>
                  Este ranking no evalúa horarios ni el último tramo. Construye
                  primero una cadena de ida y vuelta con los operadores
                  oficiales y después compara el clima. Nuestra{" "}
                  <Link href="/guias/escapadas-frescas-sin-coche">
                    guía de transporte público
                  </Link>{" "}
                  explica qué comprobar.
                </p>
              </div>
              <div>
                <h3>¿Se puede dormir fresco sin aire acondicionado?</h3>
                <p>
                  Ningún destino lo garantiza. Pregunta por planta, orientación,
                  persianas, ventilación cruzada, ruido y temperatura del
                  dormitorio. Contrasta la mínima horaria y revisa el método
                  para{" "}
                  <Link href="/guias/como-elegir-destino-fresco">
                    elegir alojamiento y destino
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          <section className="article-section">
            <p className="content-kicker">Puede encajarte si buscas</p>
            <h2>Tipos de escapada</h2>
            <ul className="article-checklist">
              {city.usefulFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="article-section">
            <p className="content-kicker">Método de decisión</p>
            <h2>Elige en cinco comprobaciones</h2>
            <ol className="article-numbered-list">
              <li>
                Mira la mínima prevista y la humedad durante las horas de sueño.
              </li>
              <li>
                Comprueba la ruta real, no solo la distancia que aparece aquí.
              </li>
              <li>
                Confirma ventilación, sombra y climatización del alojamiento.
              </li>
              <li>
                Revisa avisos oficiales, accesos y riesgo de incendio.
              </li>
              <li>
                Conserva una alternativa por si cambia el pronóstico.
              </li>
            </ol>
          </section>

          <section className="article-section destination-sources">
            <p className="content-kicker">Trazabilidad</p>
            <h2>De dónde salen las referencias de esta guía</h2>
            <p>
              Los rangos de los destinos son estimaciones editoriales
              orientativas basadas en{" "}
              <a
                href={CLIMATE_METHODOLOGY.fuenteUrl}
                rel="noreferrer"
                target="_blank"
              >
                {CLIMATE_METHODOLOGY.fuente}
              </a>
              . {CLIMATE_METHODOLOGY.metodologia}
            </p>
            <p>{ORIGIN_CLIMATE_METHODOLOGY}</p>
            <h3>Fuentes locales de los candidatos mostrados</h3>
            <ul>
              {candidateSources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} rel="noreferrer" target="_blank">
                    {source.label}
                  </a>
                  <span>
                    {source.destinationName}: {source.supports}
                  </span>
                </li>
              ))}
            </ul>
            <p>
              Revisión editorial de la base climática:{" "}
              {CLIMATE_METHODOLOGY.revisado}.{" "}
              <Link href="/metodologia#correcciones">
                Consulta el cálculo y comunica una corrección
              </Link>
              .
            </p>
          </section>

          <section className="article-section article-faq">
            <p className="content-kicker">Preguntas frecuentes</p>
            <h2>Dudas al salir desde {city.name}</h2>
            {city.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </section>
        </article>

        <aside className="article-aside">
          <div className="article-aside__panel">
            <p className="content-kicker">Recuerda</p>
            <h2>La referencia no es el pronóstico</h2>
            <p>
              Una media de verano ayuda a descubrir. La decisión final se toma
              con datos cercanos a tu fecha y las condiciones del alojamiento.
            </p>
          </div>
          <Link className="content-cta" href="/guias/como-elegir-destino-fresco">
            Método completo de comparación
            <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </div>
    </main>
  );
}
