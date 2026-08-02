import type { Metadata } from "next";
import Link from "next/link";
import {
  createPageMetadata,
  createWebPageJsonLd,
  serializeJsonLd,
  siteConfig,
} from "@/lib/site";

const title = "Política de cookies";
const description =
  "Información sobre el uso actual de cookies y tecnologías similares en FrescoCerca.";
const path = "/cookies";
const lastModified = "2026-07-27";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path,
  noIndex: true,
});

const jsonLd = createWebPageJsonLd({
  title,
  description,
  path,
  modifiedTime: lastModified,
});

export default function CookiesPage() {
  return (
    <main
      id="contenido"
      className="content-page cookies-page mx-auto min-h-screen w-full max-w-4xl px-5 py-10 sm:px-8 lg:py-16"
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
            Uso transparente
          </p>
          <h1 className="content-page__title mt-3 text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
            Política de cookies
          </h1>
          <p className="content-page__lead mt-5 max-w-3xl text-lg leading-8 text-current/70">
            En su versión inicial, FrescoCerca no utiliza cookies no necesarias,
            analítica de audiencia ni publicidad comportamental.
          </p>
        </header>

        <section className="content-page__body mt-10 space-y-10 text-base leading-8 text-current/80">
          <section className="cookies-page__section" aria-labelledby="que-son">
            <h2
              id="que-son"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              1. Qué son las cookies
            </h2>
            <p className="mt-3">
              Las cookies son pequeños archivos o identificadores que un sitio
              puede guardar en el dispositivo para recordar información,
              mantener una función técnica, medir el uso o personalizar
              contenidos. Tecnologías como el almacenamiento local pueden
              cumplir fines parecidos.
            </p>
          </section>

          <section className="cookies-page__section" aria-labelledby="uso-actual">
            <h2
              id="uso-actual"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              2. Uso actual
            </h2>
            <div className="cookies-page__table-wrapper mt-5 overflow-x-auto rounded-2xl border border-current/10">
              <table className="cookies-page__table w-full min-w-[38rem] border-collapse text-left">
                <thead className="bg-current/5 text-current">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Categoría
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Estado
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Finalidad
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-current/10">
                    <th scope="row" className="px-4 py-3 font-semibold text-current">
                      Analítica
                    </th>
                    <td className="px-4 py-3">No utilizada</td>
                    <td className="px-4 py-3">
                      No se mide ni perfila la navegación.
                    </td>
                  </tr>
                  <tr className="border-t border-current/10">
                    <th scope="row" className="px-4 py-3 font-semibold text-current">
                      Publicidad
                    </th>
                    <td className="px-4 py-3">No utilizada</td>
                    <td className="px-4 py-3">
                      No se muestran anuncios ni se crean perfiles comerciales.
                    </td>
                  </tr>
                  <tr className="border-t border-current/10">
                    <th scope="row" className="px-4 py-3 font-semibold text-current">
                      Personalización
                    </th>
                    <td className="px-4 py-3">No utilizada</td>
                    <td className="px-4 py-3">
                      No existen cuentas ni preferencias persistentes.
                    </td>
                  </tr>
                  <tr className="border-t border-current/10">
                    <th scope="row" className="px-4 py-3 font-semibold text-current">
                      Técnica imprescindible
                    </th>
                    <td className="px-4 py-3">Solo si la infraestructura la necesita</td>
                    <td className="px-4 py-3">
                      Entrega, seguridad y funcionamiento básico del sitio.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              Las tecnologías estrictamente necesarias, si las emplea la
              infraestructura, no se utilizan para seguir al usuario con fines
              publicitarios y no requieren consentimiento. Los enlaces a
              terceros no instalan sus cookies mientras no se visite el sitio
              externo.
            </p>
          </section>

          <section className="cookies-page__section" aria-labelledby="cambios">
            <h2
              id="cambios"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              3. Si se activa analítica o publicidad
            </h2>
            <p className="mt-3">
              Antes de activar Google AdSense, una herramienta de analítica o
              cualquier tecnología no necesaria, FrescoCerca deberá:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                impedir su carga hasta que exista una decisión de la persona
                usuaria;
              </li>
              <li>
                ofrecer opciones visibles para aceptar, rechazar o configurar
                por finalidades;
              </li>
              <li>
                permitir retirar el consentimiento con la misma facilidad con
                la que se otorgó;
              </li>
              <li>
                identificar cada tecnología, proveedor, finalidad y duración en
                esta política.
              </li>
            </ul>
          </section>

          <section className="cookies-page__section" aria-labelledby="control">
            <h2
              id="control"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              4. Control desde el navegador
            </h2>
            <p className="mt-3">
              Los navegadores permiten consultar, bloquear o borrar cookies
              desde sus ajustes de privacidad. Bloquear almacenamiento
              estrictamente necesario podría afectar al funcionamiento técnico
              de algunos sitios.
            </p>
          </section>

          <footer className="cookies-page__footer border-t border-current/10 pt-6 text-sm text-current/60">
            Última actualización:{" "}
            <time dateTime={lastModified}>27 de julio de 2026</time>. Para dudas,
            escribe a{" "}
            <a
              href={`mailto:${siteConfig.legal.email}`}
              className="font-semibold underline underline-offset-4"
            >
              {siteConfig.legal.email}
            </a>
            . Consulta también la{" "}
            <Link
              href="/privacidad"
              className="font-semibold underline underline-offset-4"
            >
              política de privacidad
            </Link>
            .
          </footer>
        </section>
      </article>
    </main>
  );
}
