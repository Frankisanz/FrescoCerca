import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  getGuide,
  guides,
  serializeJsonLd,
} from "@/lib/content";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    return { title: "Guía no encontrada" };
  }

  const url = absoluteUrl(`/guias/${guide.slug}`);
  return {
    title: guide.seoTitle,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      type: "article",
      publishedTime: guide.published,
      modifiedTime: guide.updated,
      images: [absoluteUrl("/og.png")],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: [absoluteUrl("/og.png")],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  const path = `/guias/${guide.slug}`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Guías", path: "/guias" },
    { name: guide.title, path },
  ]);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline: guide.title,
    description: guide.description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl("/og.png"),
    inLanguage: "es-ES",
    datePublished: guide.published,
    dateModified: guide.updated,
    author: {
      "@type": "Organization",
      name: "FrescoCerca",
      url: absoluteUrl("/sobre-frescocerca"),
    },
    publisher: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
    citation: guide.sources?.map((source) => source.url),
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const relatedGuides = guides
    .filter((candidate) => candidate.slug !== guide.slug)
    .slice(0, 3);

  return (
    <main id="contenido" className="content-shell article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([breadcrumb, articleJsonLd, faqJsonLd]),
        }}
      />

      <nav className="content-breadcrumb" aria-label="Migas de pan">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link href="/guias">Guías</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{guide.title}</span>
      </nav>

      <article>
        <header className="content-hero article-hero">
          <p className="content-eyebrow">{guide.eyebrow}</p>
          <h1>{guide.title}</h1>
          <p className="content-lead">{guide.description}</p>
          <div className="article-meta">
            <span>{guide.readingMinutes} minutos de lectura</span>
            <span>
              Actualizada el{" "}
              <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>
            </span>
          </div>
          <p className="editorial-byline">
            <Link href="/sobre-frescocerca">Equipo editorial FrescoCerca</Link>
            <span aria-hidden="true">·</span>
            <span>
              {guide.sources?.length
                ? "Fuentes oficiales enlazadas al final"
                : "Revisión editorial y metodología transparente"}
            </span>
          </p>
        </header>

        <div className="article-layout">
          <div className="article-body">
            <div className="article-introduction">
              {guide.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {guide.sections.map((section) => (
              <section className="article-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="article-checklist">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="article-section article-takeaways">
              <p className="content-kicker">Resumen útil</p>
              <h2>Qué debes llevarte de esta guía</h2>
              <ul className="article-checklist">
                {guide.takeaways.map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ul>
            </section>

            <section className="article-section article-faq">
              <p className="content-kicker">Preguntas frecuentes</p>
              <h2>Respuestas rápidas</h2>
              {guide.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </section>

            {guide.sources?.length ? (
              <section className="article-section destination-sources">
                <p className="content-kicker">Fuentes y límites</p>
                <h2>Información oficial consultada</h2>
                <p>
                  Estas fuentes respaldan el método de la guía. Los horarios,
                  servicios, avisos y condiciones meteorológicas pueden cambiar:
                  comprueba siempre la información vigente para tus fechas.
                </p>
                <ul>
                  {guide.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} rel="noreferrer" target="_blank">
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="destination-sources__note">
                  FrescoCerca no ofrece una previsión ni garantiza que un destino
                  vaya a resultar fresco durante un viaje concreto.
                </p>
              </section>
            ) : null}
          </div>

          <aside className="article-aside">
            <nav className="article-aside__panel" aria-label="En esta guía">
              <p className="content-kicker">En esta guía</p>
              <ol>
                {guide.sections.map((section, index) => (
                  <li key={section.heading}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.heading}
                  </li>
                ))}
              </ol>
            </nav>
            <div className="article-aside__panel">
              <p className="content-kicker">Nota editorial</p>
              <p>
                FrescoCerca orienta la búsqueda con referencias climáticas. No
                sustituye predicciones, avisos oficiales ni consejo médico o
                veterinario.
              </p>
            </div>
            <Link className="content-cta" href="/destinos">
              Comparar destinos
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </article>

      <section className="content-section content-section--soft">
        <div className="content-section-heading">
          <div>
            <p className="content-kicker">Sigue preparando el viaje</p>
            <h2>Otras guías recomendadas</h2>
          </div>
        </div>
        <div className="article-related-grid">
          {relatedGuides.map((relatedGuide) => (
            <article className="article-related-card" key={relatedGuide.slug}>
              <p>{relatedGuide.eyebrow}</p>
              <h3>
                <Link href={`/guias/${relatedGuide.slug}`}>
                  {relatedGuide.title}
                </Link>
              </h3>
              <span>{relatedGuide.readingMinutes} min de lectura</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
