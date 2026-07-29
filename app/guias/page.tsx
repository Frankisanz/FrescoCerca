import type { Metadata } from "next";
import Link from "next/link";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  guides,
  serializeJsonLd,
} from "@/lib/content";

const title = "Guías de escapadas frescas y noches con menos calor";
const description =
  "Guías para encontrar noches frescas, preparar escapadas sin coche o de fin de semana y elegir destinos responsables con niños o con perro.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/guias") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/guias"),
    type: "website",
    images: [absoluteUrl("/og.png")],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteUrl("/og.png")],
  },
};

export default function GuidesIndexPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Guías", path: "/guias" },
  ]);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Guías FrescoCerca",
    numberOfItems: guides.length,
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: absoluteUrl(`/guias/${guide.slug}`),
    })),
  };

  return (
    <main id="contenido" className="content-shell guides-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([breadcrumb, itemList]),
        }}
      />

      <nav className="content-breadcrumb" aria-label="Migas de pan">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Guías</span>
      </nav>

      <header className="content-hero content-hero--guides">
        <p className="content-eyebrow">Biblioteca FrescoCerca</p>
        <h1>{title}</h1>
        <p className="content-lead">
          Elegir bien requiere algo más que ordenar pueblos por temperatura.
          Estas guías explican qué mirar, qué preguntar y cuándo cambiar el plan.
        </p>
      </header>

      <section className="content-section" aria-labelledby="guias-principales">
        <div className="content-section-heading">
          <div>
            <p className="content-kicker">Lecturas prácticas</p>
            <h2 id="guias-principales">Empieza por tu necesidad</h2>
          </div>
          <p>
            Contenido editorial sin predicciones en directo ni promesas sobre el
            tiempo de un viaje concreto.
          </p>
        </div>

        <div className="article-card-grid">
          {guides.map((guide, index) => (
            <article
              className={`article-card${index === 0 ? " article-card--featured" : ""}`}
              key={guide.slug}
            >
              <div className="article-card__meta">
                <span>{guide.eyebrow}</span>
                <span>{guide.readingMinutes} min</span>
              </div>
              <h2>
                <Link href={`/guias/${guide.slug}`}>{guide.title}</Link>
              </h2>
              <p>{guide.description}</p>
              <Link
                className="content-text-link"
                href={`/guias/${guide.slug}`}
                aria-label={`Leer: ${guide.title}`}
              >
                Leer guía <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section content-section--soft">
        <div className="content-section-heading">
          <div>
            <p className="content-kicker">Explora después</p>
            <h2>Pasa de la teoría a una lista de lugares</h2>
          </div>
          <Link className="content-cta content-cta--inline" href="/destinos">
            Ver todos los destinos
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
