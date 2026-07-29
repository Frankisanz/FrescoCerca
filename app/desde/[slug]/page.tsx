import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  formatCelsius,
  fromCities,
  getDestinationCandidates,
  getFromCity,
  serializeJsonLd,
} from "@/lib/content";
import {
  CITY_GUIDE_MAX_TRAVEL_HOURS,
  formatTravelTime,
} from "@/lib/destination-ranking";

type FromCityPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return fromCities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({
  params,
}: FromCityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getFromCity(slug);

  if (!city) {
    return { title: "Ciudad de salida no encontrada" };
  }

  const url = absoluteUrl(`/desde/${city.slug}`);
  return {
    title: city.title,
    description: city.description,
    alternates: { canonical: url },
    openGraph: {
      title: city.title,
      description: city.description,
      url,
      type: "article",
    },
  };
}

export default async function FromCityPage({ params }: FromCityPageProps) {
  const { slug } = await params;
  const city = getFromCity(slug);

  if (!city) {
    notFound();
  }

  const candidates = getDestinationCandidates(city, 6);
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
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: city.title,
    description: city.description,
    mainEntityOfPage: absoluteUrl(path),
    author: {
      "@type": "Organization",
      name: "FrescoCerca",
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: "FrescoCerca",
      url: absoluteUrl("/"),
    },
    datePublished: "2026-07-27",
    dateModified: "2026-07-29",
  };

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
      </header>

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
