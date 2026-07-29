import type { Metadata } from "next";
import Link from "next/link";
import {
  createPageMetadata,
  createWebPageJsonLd,
  serializeJsonLd,
  siteConfig,
} from "@/lib/site";

const title = "Sobre FrescoCerca";
const description =
  "Conoce el propósito, los principios editoriales y la persona responsable de FrescoCerca.";
const path = "/sobre-frescocerca";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    createWebPageJsonLd({
      title,
      description,
      path,
      type: "AboutPage",
    }),
    {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url.toString(),
      founder: {
        "@type": "Person",
        name: siteConfig.legal.owner,
      },
      email: siteConfig.legal.email,
    },
  ],
};

export default function SobreFrescoCercaPage() {
  return (
    <main
      id="contenido"
      className="content-page about-page mx-auto min-h-screen w-full max-w-4xl px-5 py-10 sm:px-8 lg:py-16"
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
            El proyecto
          </p>
          <h1 className="content-page__title mt-3 text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
            Encontrar un respiro cerca de casa
          </h1>
          <p className="content-page__lead mt-5 max-w-3xl text-lg leading-8 text-current/70">
            FrescoCerca nace para hacer más sencilla una pregunta cotidiana:
            ¿adónde puedo ir cerca para encontrar condiciones habitualmente más
            suaves?
          </p>
        </header>

        <section className="content-page__body mt-10 space-y-10 text-base leading-8 text-current/80">
          <section className="about-page__section" aria-labelledby="proposito">
            <h2
              id="proposito"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              Nuestro propósito
            </h2>
            <p className="mt-3">
              El sitio organiza información dispersa para facilitar una primera
              comparación entre destinos. Queremos que la distancia, el tiempo
              orientativo de viaje y el contexto climático se entiendan de un
              vistazo, sin convertir una estimación en una promesa.
            </p>
          </section>

          <section className="about-page__section" aria-labelledby="principios">
            <h2
              id="principios"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              Principios editoriales
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              <li className="about-page__principle rounded-2xl border border-current/10 p-5">
                <strong className="block text-current">Claridad</strong>
                <span className="mt-1 block">
                  Separamos los datos orientativos de la información oficial en
                  tiempo real.
                </span>
              </li>
              <li className="about-page__principle rounded-2xl border border-current/10 p-5">
                <strong className="block text-current">Trazabilidad</strong>
                <span className="mt-1 block">
                  Identificamos fuentes y límites cuando una cifra necesita
                  contexto.
                </span>
              </li>
              <li className="about-page__principle rounded-2xl border border-current/10 p-5">
                <strong className="block text-current">Utilidad</strong>
                <span className="mt-1 block">
                  Priorizamos comparaciones comprensibles y decisiones que
                  puedan verificarse.
                </span>
              </li>
              <li className="about-page__principle rounded-2xl border border-current/10 p-5">
                <strong className="block text-current">Corrección</strong>
                <span className="mt-1 block">
                  Rectificamos los errores comunicados y revisamos los
                  contenidos cuando cambian las fuentes.
                </span>
              </li>
            </ul>
          </section>

          <section
            className="about-page__section"
            aria-labelledby="proceso-editorial"
          >
            <h2
              id="proceso-editorial"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              Cómo trabajamos cada ficha
            </h2>
            <p className="mt-3">
              Cada destino combina referencias climáticas comparables con
              información oficial del municipio, la comunidad autónoma, el
              espacio natural o el servicio de transporte correspondiente. Las
              fuentes concretas aparecen al final de cada ficha para que puedas
              comprobarlas y ampliar la información.
            </p>
            <p className="mt-3">
              El contenido se redacta para resolver decisiones reales: cuándo
              conviene caminar, qué preguntar al alojamiento, cómo organizar el
              acceso y qué condiciones hay que revisar antes de salir. No
              publicamos posiciones patrocinadas ni alteramos el orden a cambio
              de pagos.
            </p>
            <p className="mt-3">
              Indicamos la fecha de revisión y distinguimos siempre entre una
              referencia histórica, una estimación y una predicción. Si
              detectas un dato desactualizado, puedes escribirnos y revisaremos
              la fuente antes de corregirlo.
            </p>
          </section>

          <section
            className="about-page__section"
            aria-labelledby="version-inicial"
          >
            <h2
              id="version-inicial"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              Una primera versión sencilla
            </h2>
            <p className="mt-3">
              Esta versión no ofrece cuentas de usuario, formularios, analítica
              de audiencia ni publicidad. Tampoco utiliza cookies no necesarias.
              Si estas funciones cambian, se explicará antes de activarlas y se
              actualizarán las políticas correspondientes.
            </p>
            <p className="mt-3">
              FrescoCerca es un proyecto de {siteConfig.legal.owner}. No está
              afiliado a AEMET, la DGT ni los servicios de emergencias.
            </p>
          </section>

          <nav
            className="about-page__links flex flex-wrap gap-x-6 gap-y-3 border-t border-current/10 pt-8"
            aria-label="Más información sobre FrescoCerca"
          >
            <Link
              href="/metodologia"
              className="font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
            >
              Ver metodología
            </Link>
            <Link
              href="/aviso-legal"
              className="font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
            >
              Aviso legal
            </Link>
            <a
              href={`mailto:${siteConfig.legal.email}`}
              className="font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
            >
              Contactar
            </a>
          </nav>
        </section>
      </article>
    </main>
  );
}
