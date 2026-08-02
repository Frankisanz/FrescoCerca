import type { Metadata } from "next";
import Link from "next/link";
import { EditorialHeroImage } from "./components/editorial-hero-image";
import { EscapeFinder } from "./components/escape-finder";

export const metadata: Metadata = {
  title: "Escapadas frescas cerca de ti",
  description:
    "Encuentra pueblos y destinos donde dormir más fresco este verano. Compara temperatura orientativa, distancia y tipo de escapada desde tu ciudad.",
  alternates: { canonical: "/" },
};

const benefits = [
  {
    number: "01",
    title: "Menos calor, de verdad",
    text: "Priorizamos la temperatura nocturna, la altitud y el entorno. Porque descansar importa más que una máxima bonita.",
  },
  {
    number: "02",
    title: "A una distancia razonable",
    text: "Ordenamos las opciones desde tu ciudad y estimamos el tiempo de carretera para evitar viajes desproporcionados.",
  },
  {
    number: "03",
    title: "Con un plan que encaje",
    text: "Filtra montaña, agua, niños o perro. Una escapada fresca también tiene que apetecerte cuando llegues.",
  },
];

const collections = [
  {
    kicker: "Para una noche",
    title: "Bosque, baño y vuelta a casa",
    text: "Opciones sencillas para improvisar cuando la ciudad no baja de 25 °C.",
    href: "/guias/pueblos-con-noches-frescas-en-verano",
    className: "collection-forest",
  },
  {
    kicker: "Con la familia",
    title: "Dormir bien también es un plan",
    text: "Destinos tranquilos, paseos cortos y alternativas para las horas centrales.",
    href: "/guias/escapadas-frescas-con-ninos",
    className: "collection-lake",
  },
  {
    kicker: "Con cuatro patas",
    title: "Sombra, senderos y agua cerca",
    text: "Cómo elegir alojamientos y rutas más cómodas cuando viajas con perro.",
    href: "/guias/escapadas-frescas-con-perro",
    className: "collection-dog",
  },
];

const faqs = [
  {
    question: "¿FrescoCerca muestra una predicción meteorológica en directo?",
    answer:
      "No. La primera versión compara referencias climáticas estivales y características del destino. Antes de salir debes consultar la predicción y los avisos oficiales de AEMET.",
  },
  {
    question: "¿Cómo se calcula el tiempo de viaje?",
    answer:
      "Estimamos la distancia entre el origen y el destino y aplicamos un factor de carretera. Sirve para comparar opciones, no sustituye a un navegador ni contempla tráfico, obras o paradas.",
  },
  {
    question: "¿Por qué dais tanta importancia a la mínima nocturna?",
    answer:
      "Una máxima algo más baja ayuda, pero para una escapada contra el calor la posibilidad de dormir y ventilar suele marcar una diferencia mayor.",
  },
  {
    question: "¿Los alojamientos pagan por aparecer?",
    answer:
      "No en esta versión. Si en el futuro incorporamos recomendaciones patrocinadas o enlaces de afiliación, estarán identificados con claridad y no alterarán el criterio de temperatura.",
  },
];

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Buscador de escapadas frescas de FrescoCerca",
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      inLanguage: "es-ES",
      description:
        "Compara destinos frescos de España según origen, distancia y tipo de escapada.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <main id="contenido">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <section className="hero">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="site-shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span aria-hidden="true">●</span> Escapadas frescas por España
            </p>
            <h1>
              Busca un lugar donde{" "}
              <span className="headline-highlight">dormir fresco.</span>
            </h1>
            <p className="hero-lead">
              Dinos desde dónde sales y cuánto quieres conducir. Comparamos
              destinos de montaña, bosque y agua para que encuentres una noche
              más llevadera cerca de casa.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#buscador">
                Encontrar mi escapada
                <span aria-hidden="true">↓</span>
              </a>
              <Link className="text-link" href="/metodologia">
                Ver cómo calculamos
              </Link>
            </div>
            <ul className="hero-trust" aria-label="Características del servicio">
              <li>Gratis</li>
              <li>Sin registro</li>
              <li>Criterio explicado</li>
            </ul>
          </div>

          <aside className="climate-card" aria-label="Ejemplo de comparación">
            <div className="climate-card-top">
              <span>Una noche de agosto</span>
              <span className="live-chip">Ejemplo</span>
            </div>
            <div className="temperature-route">
              <div>
                <span className="temp-label">Tu ciudad</span>
                <strong>27°</strong>
                <small>mínima</small>
              </div>
              <div className="route-line" aria-hidden="true">
                <span />
              </div>
              <div>
                <span className="temp-label">En la sierra</span>
                <strong>16°</strong>
                <small>mínima orientativa</small>
              </div>
            </div>
            <div className="climate-card-bottom">
              <span className="night-drop">−11 °C por la noche</span>
              <span>1 h 50 min</span>
            </div>
          </aside>
        </div>
      </section>

      <section
        className="finder-section"
        id="buscador"
        aria-label="Buscador de escapadas frescas"
      >
        <div className="site-shell">
          <EscapeFinder />
        </div>
      </section>

      <section className="why-section section-pad">
        <div className="site-shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow eyebrow-dark">No buscamos solo grados</p>
              <h2>Una recomendación que entiende el viaje.</h2>
            </div>
            <p>
              Convertimos datos dispersos en una decisión fácil de comparar,
              manteniendo visibles las limitaciones.
            </p>
          </div>
          <div className="benefit-grid">
            {benefits.map((benefit) => (
              <article className="benefit-card" key={benefit.number}>
                <span>{benefit.number}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="collections-section section-pad">
        <div className="site-shell">
          <div className="section-heading">
            <p className="eyebrow eyebrow-dark">Elige tu manera de escapar</p>
            <h2>No todo el mundo busca el mismo fresco.</h2>
          </div>
          <div className="collection-grid">
            {collections.map((collection) => (
              <Link
                className={`collection-card ${collection.className}`}
                href={collection.href}
                key={collection.title}
              >
                <span className="collection-kicker">{collection.kicker}</span>
                <span className="collection-art" aria-hidden="true" />
                <h3>{collection.title}</h3>
                <p>{collection.text}</p>
                <span className="collection-link">
                  Abrir guía <span aria-hidden="true">↗</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="eclipse-callout">
        <div className="site-shell eclipse-grid">
          <div className="eclipse-visual" aria-hidden="true">
            <span className="eclipse-sun" />
            <span className="eclipse-moon" />
            <span className="eclipse-glow" />
          </div>
          <div>
            <p className="eyebrow">Especial · 12 de agosto de 2026</p>
            <h2>El eclipse se disfruta mejor con horizonte… y un plan B.</h2>
            <p>
              Te explicamos cómo valorar nubosidad, orientación, acceso y
              temperatura sin competir con el visor astronómico oficial.
            </p>
            <Link className="button button-light" href="/eclipse-2026">
              Preparar mi escapada para el eclipse
            </Link>
          </div>
        </div>
      </section>

      <section className="editorial-section section-pad">
        <div className="site-shell">
          <EditorialHeroImage caption="Una buena escapada no termina al llegar: el alojamiento y el descenso nocturno deciden si realmente podrás descansar." />
          <div className="editorial-grid">
            <div className="editorial-intro">
              <p className="eyebrow eyebrow-dark">Guías que sí resuelven dudas</p>
              <h2>Antes de reservar, entiende qué estás comparando.</h2>
              <p>
                Temperatura media no es previsión, altitud no garantiza una
                noche fría y “pueblo fresco” no significa lo mismo para todos.
              </p>
              <Link className="text-link" href="/guias">
                Ver todas las guías
              </Link>
            </div>
            <div className="article-list">
              <Link href="/guias/pueblos-con-noches-frescas-en-verano">
                <span className="article-index">01</span>
                <span>
                  <small>Descanso nocturno · 11 min</small>
                  <strong>Pueblos con noches frescas: cómo elegir bien</strong>
                </span>
                <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/guias/escapadas-frescas-sin-coche">
                <span className="article-index">02</span>
                <span>
                  <small>Transporte público · 12 min</small>
                  <strong>Cómo preparar una escapada fresca sin coche</strong>
                </span>
                <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/guias/escapadas-frescas-de-fin-de-semana">
                <span className="article-index">03</span>
                <span>
                  <small>48 horas · 12 min</small>
                  <strong>Escapadas frescas de fin de semana</strong>
                </span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section section-pad">
        <div className="site-shell faq-grid">
          <div>
            <p className="eyebrow eyebrow-dark">Preguntas frecuentes</p>
            <h2>Lo importante, sin letra pequeña.</h2>
            <p>
              Queremos ayudarte a comparar, no darte una falsa sensación de
              precisión.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="site-shell final-cta-inner">
          <div>
            <p className="eyebrow">La próxima noche fresca puede estar cerca</p>
            <h2>Sal del calor. No del mapa.</h2>
          </div>
          <a className="button button-light" href="#buscador">
            Buscar destino
          </a>
        </div>
      </section>
    </main>
  );
}
