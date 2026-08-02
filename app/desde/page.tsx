import type { Metadata } from "next";
import Link from "next/link";
import { EditorialByline } from "@/app/components/editorial-byline";
import { EditorialHeroImage } from "@/app/components/editorial-hero-image";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  fromCities,
  getDestinationCandidates,
  serializeJsonLd,
} from "@/lib/content";
import {
  CLIMATE_METHODOLOGY,
  ORIGIN_CLIMATE_METHODOLOGY,
} from "@/lib/destinations";
import {
  createArticleJsonLd,
  createArticleMetadata,
} from "@/lib/site";

const title = "Escapadas frescas desde tu ciudad";
const description =
  "Compara escapadas frescas desde 14 ciudades españolas con destinos, referencias estivales, distancia orientativa y consejos para elegir mejor.";

export const metadata: Metadata = createArticleMetadata({
  title,
  description,
  path: "/desde",
});

const planningModes = [
  {
    kicker: "Escapada de 24 horas",
    title: "Una noche fresca sin pasar el día en carretera",
    text: "Reduce el radio, compara la mínima prevista y llega con tiempo para comprobar la habitación. Una opción cercana y verificable suele ser más útil que perseguir la cifra más baja del catálogo.",
    href: "/guias/pueblos-con-noches-frescas-en-verano",
    label: "Cómo comparar noches frescas",
  },
  {
    kicker: "Plan de 48 horas",
    title: "Dos noches permiten ampliar la región",
    text: "Compara tres candidatos con los mismos criterios: trayecto real, descanso nocturno, actividades a la sombra y plan interior. Revisa todo de nuevo 24 horas antes.",
    href: "/guias/escapadas-frescas-de-fin-de-semana",
    label: "Preparar un fin de semana",
  },
  {
    kicker: "Transporte público",
    title: "La estación no es todavía el destino",
    text: "Confirma ida, último tramo y vuelta para tus fechas. FrescoCerca no calcula horarios ni garantiza conexiones rurales, por lo que el operador oficial debe cerrar la cadena completa.",
    href: "/guias/escapadas-frescas-sin-coche",
    label: "Organizar una escapada sin coche",
  },
  {
    kicker: "Dormir sin aire acondicionado",
    title: "Pregunta por la habitación, no por el pueblo",
    text: "Orientación, planta, persianas, ventilación cruzada, ruido y temperatura horaria deciden si podrás abrir las ventanas. Una noche climáticamente suave no garantiza un dormitorio confortable.",
    href: "/guias/como-elegir-destino-fresco",
    label: "Revisar alojamiento y previsión",
  },
] as const;

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
  const articleJsonLd = createArticleJsonLd({
    title,
    description,
    path: "/desde",
    articleSection: "Escapadas frescas por ciudad de salida",
    citations: [CLIMATE_METHODOLOGY.fuenteUrl],
  });

  return (
    <main id="contenido" className="content-shell from-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([breadcrumb, articleJsonLd, itemList]),
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
        <div className="content-notice" role="note">
          <strong>Comparación editorial, no una ruta en directo.</strong>{" "}
          {ORIGIN_CLIMATE_METHODOLOGY} Las estimaciones de los destinos se
          apoyan en{" "}
          <a href={CLIMATE_METHODOLOGY.fuenteUrl}>
            mapas y datos climáticos abiertos de AEMET
          </a>
          .
        </div>
        <EditorialByline sourceSummary="Estimaciones climáticas editoriales basadas en información abierta de AEMET; distancias y tiempos calculados con el método público de FrescoCerca." />
      </header>

      <EditorialHeroImage
        preload
        caption="Elegir bien el punto de salida y la duración evita que el trayecto se coma el descanso que buscas."
      />

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
            <p className="content-kicker">Según el tiempo y el transporte</p>
            <h2>Escapadas frescas de 24 o 48 horas, con o sin coche</h2>
          </div>
          <p>
            La duración y la forma de llegar cambian el radio razonable. Estas
            cuatro comprobaciones convierten una lista de destinos en un plan
            que todavía puedes verificar.
          </p>
        </div>
        <div className="article-related-grid">
          {planningModes.map((mode) => (
            <article className="article-related-card" key={mode.title}>
              <p>{mode.kicker}</p>
              <h3>{mode.title}</h3>
              <p>{mode.text}</p>
              <Link href={mode.href}>{mode.label} →</Link>
            </article>
          ))}
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
              <h3>Acotamos el tiempo estimado</h3>
              <p>
                Descartamos opciones que superan unas cinco horas orientativas
                por carretera. No sustituye la ruta de un navegador.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Priorizamos el descanso nocturno</h3>
              <p>
                Comparamos primero el alivio nocturno, después el diurno, la
                cercanía y la variedad regional.
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

      <section className="content-section">
        <div className="content-section-heading">
          <div>
            <p className="content-kicker">Viaje especial</p>
            <h2>Si sales para ver el eclipse de agosto de 2026</h2>
          </div>
          <p>
            La ciudad de salida solo resuelve el primer tramo. Confirma en el
            IGN si el lugar elegido está en la franja adecuada, el horizonte
            oeste, la previsión y una salida segura antes de desplazarte.
          </p>
        </div>
        <Link className="content-text-link" href="/eclipse-2026">
          Ver la guía del eclipse solar de 2026{" "}
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
