import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  editorialDestinations as destinations,
  formatCelsius,
  getDestination,
  getNearbyDestinations,
  guides,
  serializeJsonLd,
} from "@/lib/content";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);

  if (!destination) {
    return { title: "Destino no encontrado" };
  }

  const title = `${destination.name} en verano: clima, altitud y guía fresca`;
  const description = `${destination.description} Consulta temperaturas estivales orientativas, altitud, ideas y qué comprobar antes de viajar.`;
  const url = absoluteUrl(`/destinos/${destination.slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
  };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestination(slug);

  if (!destination) {
    notFound();
  }

  const nearby = getNearbyDestinations(destination);
  const destinationUrl = `/destinos/${destination.slug}`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Destinos", path: "/destinos" },
    { name: destination.name, path: destinationUrl },
  ]);
  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    description: destination.description,
    url: absoluteUrl(destinationUrl),
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
        name: "Máxima estival orientativa",
        value: destination.summerHigh,
        unitCode: "CEL",
      },
      {
        "@type": "PropertyValue",
        name: "Mínima estival orientativa",
        value: destination.summerLow,
        unitCode: "CEL",
      },
    ],
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
          text: `Las referencias del dataset sitúan su máxima estival en torno a ${formatCelsius(destination.summerHigh)} y su mínima en ${formatCelsius(destination.summerLow)}. Son valores orientativos: el tiempo de una fecha concreta debe comprobarse en la predicción oficial.`,
        },
      },
      {
        "@type": "Question",
        name: `¿A qué altitud está ${destination.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${destination.name} se sitúa aproximadamente a ${destination.altitude.toLocaleString("es-ES")} metros según la referencia utilizada por FrescoCerca.`,
        },
      },
      {
        "@type": "Question",
        name: `¿Qué debo revisar antes de viajar a ${destination.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Comprueba la previsión horaria, los avisos oficiales, la ruta, las condiciones del alojamiento y cualquier restricción local o de acceso a espacios naturales.",
        },
      },
    ],
  };

  const altitudeContext =
    destination.altitude >= 1200
      ? "Su cota elevada la convierte en un candidato lógico cuando quieres comparar noches de montaña."
      : destination.altitude >= 800
        ? "Su altitud intermedia puede aportar contraste frente a ciudades más bajas, según el episodio meteorológico."
        : "La altitud no debe ser el único criterio aquí: vegetación, orientación, viento y alojamiento ganan importancia.";

  return (
    <main id="contenido" className="content-shell destination-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([breadcrumb, placeJsonLd, faqJsonLd]),
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
          <h1>{destination.name}: una escapada para comparar con calma</h1>
          <p className="content-lead">{destination.description}</p>
          <ul className="destination-tags" aria-label="Ideal para">
            {destination.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <aside
          className="destination-summary"
          aria-label={`Datos orientativos de ${destination.name}`}
        >
          <p>Referencia de verano</p>
          <dl className="destination-summary__metrics">
            <div>
              <dt>Máxima</dt>
              <dd>{formatCelsius(destination.summerHigh)}</dd>
            </div>
            <div>
              <dt>Mínima</dt>
              <dd>{formatCelsius(destination.summerLow)}</dd>
            </div>
            <div>
              <dt>Altitud</dt>
              <dd>{destination.altitude.toLocaleString("es-ES")} m</dd>
            </div>
          </dl>
          <small>
            Fuente y método:{" "}
            <a href={destination.sourceUrl} rel="noreferrer" target="_blank">
              {destination.sourceNote}
            </a>
          </small>
        </aside>
      </header>

      <div className="content-notice" role="note">
        <strong>No es una previsión meteorológica.</strong> Los datos ayudan a
        descubrir destinos. Comprueba AEMET y los avisos oficiales para las
        fechas concretas antes de reservar o desplazarte.
      </div>

      <div className="destination-layout">
        <article className="article-body destination-article">
          <section className="article-section">
            <p className="content-kicker">Por qué considerarlo</p>
            <h2>Qué puede aportar {destination.name}</h2>
            <p>
              {altitudeContext} Su referencia estival de{" "}
              {formatCelsius(destination.summerHigh)} durante el día y{" "}
              {formatCelsius(destination.summerLow)} por la noche permite
              situarlo frente a otros destinos del atlas, pero no predice un fin
              de semana concreto.
            </p>
            <p>
              {destination.bestFor} La utilidad real dependerá de la ubicación
              exacta del alojamiento, su orientación y ventilación, además de
              las condiciones previstas.
            </p>
          </section>

          <section className="article-section">
            <p className="content-kicker">Plan inteligente</p>
            <h2>Cómo organizar una estancia</h2>
            <p>
              Reserva las actividades al aire libre para primera hora y el
              atardecer. Durante la franja central, deja margen para descansar,
              visitar un espacio interior o cambiar el plan si la temperatura
              sube más de lo esperado.
            </p>
            <ul className="article-checklist">
              <li>Revisa la predicción horaria entre 48 y 72 horas antes.</li>
              <li>
                Pregunta al alojamiento por sombra, ventilación y climatización.
              </li>
              <li>
                Comprueba acceso, aparcamiento y restricciones en espacios
                naturales.
              </li>
              <li>
                Lleva una alternativa por tormentas, viento, humo o calor
                persistente.
              </li>
            </ul>
          </section>

          <section className="article-section">
            <p className="content-kicker">Interpretar los datos</p>
            <h2>Qué significan estas temperaturas</h2>
            <p>
              Son referencias climáticas útiles para comparar lugares, no
              observaciones en directo ni un pronóstico. Una media suaviza días
              muy distintos y no refleja por sí sola humedad, viento o
              acumulación de calor en el edificio donde dormirás.
            </p>
            <p>
              Si buscas descansar, prioriza la mínima prevista de tus fechas.
              Después compara la máxima, el trayecto y las condiciones del
              alojamiento. Así evitas recorrer más kilómetros por una ventaja
              térmica que quizá no exista ese día.
            </p>
          </section>

          <section className="article-section article-faq">
            <p className="content-kicker">Preguntas frecuentes</p>
            <h2>Antes de viajar a {destination.name}</h2>
            <details>
              <summary>
                ¿Hace fresco en {destination.name} durante el verano?
              </summary>
              <p>
                Sus datos de referencia ayudan a considerarlo como candidato,
                pero no garantizan el tiempo. Consulta siempre una previsión
                cercana a la fecha.
              </p>
            </details>
            <details>
              <summary>¿Qué importancia tiene su altitud?</summary>
              <p>
                Los {destination.altitude.toLocaleString("es-ES")} metros son un
                indicador útil, no una garantía. Relieve, humedad, viento y
                orientación también influyen.
              </p>
            </details>
            <details>
              <summary>¿Qué debo comprobar el día anterior?</summary>
              <p>
                Predicción horaria, avisos oficiales, estado de la carretera,
                posibles restricciones y condiciones finales de entrada al
                alojamiento.
              </p>
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
          <Link
            className="content-cta"
            href={`/guias/${guides[0].slug}`}
          >
            Aprende a comparar destinos
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
          <div className="destination-grid destination-grid--compact">
            {nearby.map(({ destination: candidate, distance }) => (
              <article className="destination-card" key={candidate.slug}>
                <p className="destination-card__region">
                  A unos {distance} km en línea recta
                </p>
                <h3>
                  <Link href={`/destinos/${candidate.slug}`}>
                    {candidate.name}
                  </Link>
                </h3>
                <p>{candidate.description}</p>
                <Link
                  className="content-text-link"
                  href={`/destinos/${candidate.slug}`}
                >
                  Comparar destino <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
