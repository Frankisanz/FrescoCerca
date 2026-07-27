import type { Metadata } from "next";
import Link from "next/link";
import {
  createPageMetadata,
  createWebPageJsonLd,
  serializeJsonLd,
  siteConfig,
} from "@/lib/site";

const title = "Aviso legal";
const description =
  "Información sobre la titularidad, las condiciones de uso y la responsabilidad de FrescoCerca.";
const path = "/aviso-legal";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path,
});

const jsonLd = createWebPageJsonLd({
  title,
  description,
  path,
});

export default function AvisoLegalPage() {
  return (
    <main
      id="contenido"
      className="content-page legal-page mx-auto min-h-screen w-full max-w-4xl px-5 py-10 sm:px-8 lg:py-16"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <article className="content-page__article">
        <header className="content-page__header border-b border-current/10 pb-8">
          <Link
            href="/"
            className="content-page__back-link text-sm font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
          >
            ← Volver a {siteConfig.name}
          </Link>
          <p className="content-page__eyebrow mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            Información legal
          </p>
          <h1 className="content-page__title mt-3 text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
            Aviso legal
          </h1>
          <p className="content-page__lead mt-5 max-w-3xl text-lg leading-8 text-current/70">
            Este aviso identifica a la persona responsable del sitio y establece
            sus condiciones básicas de utilización.
          </p>
        </header>

        <section className="content-page__body mt-10 space-y-10 text-base leading-8 text-current/80">
          <section className="legal-page__section" aria-labelledby="titular">
            <h2
              id="titular"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              1. Titular del sitio
            </h2>
            <address className="mt-3 not-italic">
              <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[10rem_1fr]">
                <dt className="font-semibold text-current">Titular</dt>
                <dd>{siteConfig.legal.owner}</dd>
                <dt className="font-semibold text-current">NIF</dt>
                <dd>{siteConfig.legal.nif}</dd>
                <dt className="font-semibold text-current">Domicilio</dt>
                <dd>{siteConfig.legal.address}</dd>
                <dt className="font-semibold text-current">
                  Correo electrónico
                </dt>
                <dd>
                  <a
                    href={`mailto:${siteConfig.legal.email}`}
                    className="font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
                  >
                    {siteConfig.legal.email}
                  </a>
                </dd>
              </dl>
            </address>
          </section>

          <section className="legal-page__section" aria-labelledby="finalidad">
            <h2
              id="finalidad"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              2. Finalidad
            </h2>
            <p className="mt-3">
              FrescoCerca ofrece información orientativa para comparar destinos,
              condiciones climáticas habituales y estimaciones de distancia o
              desplazamiento. El acceso es público y, en esta versión, no
              requiere registro ni contratación.
            </p>
          </section>

          <section className="legal-page__section" aria-labelledby="uso">
            <h2
              id="uso"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              3. Uso responsable
            </h2>
            <p className="mt-3">
              Al navegar por el sitio, la persona usuaria se compromete a
              utilizarlo de forma lícita, a no intentar dañar su funcionamiento
              y a no emplear sus contenidos para inducir a error o vulnerar
              derechos de terceros.
            </p>
          </section>

          <section
            className="legal-page__section"
            aria-labelledby="informacion"
          >
            <h2
              id="informacion"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              4. Carácter orientativo y responsabilidad
            </h2>
            <p className="mt-3">
              Aunque se procura mantener la información clara y actualizada, no
              se garantiza que esté libre de errores ni que refleje las
              condiciones existentes en un momento concreto. Las referencias
              climáticas no son predicciones ni avisos oficiales; las
              distancias y tiempos no sustituyen un servicio de navegación.
            </p>
            <p className="mt-3">
              Cada persona debe contrastar la información relevante antes de
              viajar y adoptar las precauciones adecuadas. Consulta la{" "}
              <Link
                href="/metodologia"
                className="font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
              >
                metodología
              </Link>{" "}
              para conocer estos límites con más detalle.
            </p>
          </section>

          <section className="legal-page__section" aria-labelledby="enlaces">
            <h2
              id="enlaces"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              5. Enlaces externos
            </h2>
            <p className="mt-3">
              Los enlaces a páginas de terceros se facilitan como referencia.
              Sus contenidos, disponibilidad y políticas dependen de sus
              respectivos responsables. Incluir un enlace no implica afiliación
              ni aprobación de todo el contenido enlazado.
            </p>
          </section>

          <section className="legal-page__section" aria-labelledby="propiedad">
            <h2
              id="propiedad"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              6. Propiedad intelectual
            </h2>
            <p className="mt-3">
              Los textos, el diseño y los elementos propios de FrescoCerca están
              protegidos por la normativa aplicable. Los nombres, datos y
              materiales procedentes de terceros pertenecen a sus respectivos
              titulares y se utilizan con fines informativos, conforme a sus
              condiciones o licencias cuando correspondan.
            </p>
          </section>

          <section className="legal-page__section" aria-labelledby="normativa">
            <h2
              id="normativa"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              7. Normativa y jurisdicción
            </h2>
            <p className="mt-3">
              Este sitio se rige por la legislación española, incluida la{" "}
              <a
                href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758"
                className="font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
              >
                Ley 34/2002, de servicios de la sociedad de la información
              </a>
              . Las controversias se someterán a los órganos que correspondan
              conforme a la normativa aplicable, respetando en todo caso los
              fueros imperativos de consumidores y usuarios.
            </p>
          </section>

          <footer className="legal-page__footer border-t border-current/10 pt-6 text-sm text-current/60">
            Última actualización: 27 de julio de 2026.
          </footer>
        </section>
      </article>
    </main>
  );
}
