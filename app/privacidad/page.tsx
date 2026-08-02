import type { Metadata } from "next";
import Link from "next/link";
import {
  createPageMetadata,
  createWebPageJsonLd,
  serializeJsonLd,
  siteConfig,
} from "@/lib/site";

const title = "Política de privacidad";
const description =
  "Qué datos personales puede tratar FrescoCerca, para qué los utiliza y cómo ejercer tus derechos.";
const path = "/privacidad";
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

export default function PrivacidadPage() {
  return (
    <main
      id="contenido"
      className="content-page privacy-page mx-auto min-h-screen w-full max-w-4xl px-5 py-10 sm:px-8 lg:py-16"
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
            Tus datos
          </p>
          <h1 className="content-page__title mt-3 text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
            Política de privacidad
          </h1>
          <p className="content-page__lead mt-5 max-w-3xl text-lg leading-8 text-current/70">
            Esta política describe el funcionamiento real de la versión inicial
            de FrescoCerca: no hay cuentas, formularios, analítica ni publicidad.
          </p>
        </header>

        <section className="content-page__body mt-10 space-y-10 text-base leading-8 text-current/80">
          <section className="privacy-page__section" aria-labelledby="responsable">
            <h2
              id="responsable"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              1. Responsable del tratamiento
            </h2>
            <address className="mt-3 not-italic">
              <p>
                <strong className="text-current">{siteConfig.legal.owner}</strong>
                <br />
                NIF: {siteConfig.legal.nif}
                <br />
                {siteConfig.legal.address}
                <br />
                <a
                  href={`mailto:${siteConfig.legal.email}`}
                  className="font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
                >
                  {siteConfig.legal.email}
                </a>
              </p>
            </address>
          </section>

          <section className="privacy-page__section" aria-labelledby="datos">
            <h2
              id="datos"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              2. Datos que pueden tratarse
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                <strong className="text-current">Navegación ordinaria:</strong>{" "}
                FrescoCerca no crea perfiles ni utiliza analítica en esta
                versión. La infraestructura de alojamiento puede generar
                registros técnicos mínimos, como dirección IP, fecha, recurso
                solicitado o información del navegador, para entregar el sitio,
                mantenerlo disponible y protegerlo frente a abusos.
              </li>
              <li>
                <strong className="text-current">Contacto por correo:</strong>{" "}
                si escribes voluntariamente, se tratarán tu dirección, el
                contenido del mensaje y los datos que decidas incluir para poder
                responder.
              </li>
            </ul>
            <p className="mt-4">
              No se solicitan categorías especiales de datos. Evita enviar
              información sensible que no sea necesaria para tu consulta.
            </p>
          </section>

          <section className="privacy-page__section" aria-labelledby="finalidades">
            <h2
              id="finalidades"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              3. Finalidades y bases jurídicas
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                Responder mensajes y gestionar solicitudes, sobre la base de tu
                petición y del interés legítimo en atenderla.
              </li>
              <li>
                Prestar el sitio, prevenir usos maliciosos y resolver errores
                técnicos, sobre la base del interés legítimo en mantener un
                servicio seguro y operativo.
              </li>
              <li>
                Cumplir obligaciones legales cuando resulte necesario.
              </li>
            </ul>
          </section>

          <section className="privacy-page__section" aria-labelledby="conservacion">
            <h2
              id="conservacion"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              4. Conservación
            </h2>
            <p className="mt-3">
              Los correos se conservan durante el tiempo necesario para tramitar
              la consulta y, después, solo mientras puedan derivarse
              responsabilidades legales. Los registros técnicos se conservan
              durante el plazo mínimo configurado por el proveedor para fines de
              seguridad y funcionamiento.
            </p>
          </section>

          <section className="privacy-page__section" aria-labelledby="destinatarios">
            <h2
              id="destinatarios"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              5. Destinatarios y proveedores
            </h2>
            <p className="mt-3">
              No se venden ni ceden datos personales con fines comerciales.
              Pueden acceder a los datos los proveedores técnicos de alojamiento
              o correo cuando sea imprescindible para prestar sus servicios,
              actuando bajo las garantías contractuales aplicables. También
              podrán comunicarse a una autoridad cuando exista una obligación
              legal.
            </p>
            <p className="mt-3">
              Si un proveedor tratara información fuera del Espacio Económico
              Europeo, se exigiría un mecanismo válido conforme a la normativa,
              como una decisión de adecuación o cláusulas contractuales tipo.
            </p>
          </section>

          <section className="privacy-page__section" aria-labelledby="derechos">
            <h2
              id="derechos"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              6. Tus derechos
            </h2>
            <p className="mt-3">
              Puedes solicitar el acceso, rectificación, supresión, oposición,
              limitación o portabilidad de tus datos escribiendo a{" "}
              <a
                href={`mailto:${siteConfig.legal.email}`}
                className="font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
              >
                {siteConfig.legal.email}
              </a>
              . Para proteger tu información, podremos pedir datos razonables
              para verificar tu identidad.
            </p>
            <p className="mt-3">
              También puedes reclamar ante la{" "}
              <a
                href="https://www.aepd.es/"
                className="font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
              >
                Agencia Española de Protección de Datos
              </a>
              .
            </p>
          </section>

          <section className="privacy-page__section" aria-labelledby="normativa">
            <h2
              id="normativa"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              7. Normativa y cambios futuros
            </h2>
            <p className="mt-3">
              Esta política se apoya en el{" "}
              <a
                href="https://eur-lex.europa.eu/eli/reg/2016/679/oj"
                className="font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
              >
                Reglamento General de Protección de Datos
              </a>{" "}
              y la{" "}
              <a
                href="https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673"
                className="font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
              >
                Ley Orgánica 3/2018
              </a>
              . Si se incorporan cuentas, formularios, analítica, publicidad u
              otros tratamientos, se actualizará antes esta información y se
              solicitará el consentimiento cuando sea necesario.
            </p>
          </section>

          <footer className="privacy-page__footer border-t border-current/10 pt-6 text-sm text-current/60">
            Última actualización:{" "}
            <time dateTime={lastModified}>27 de julio de 2026</time>. Consulta
            también la{" "}
            <Link
              href="/cookies"
              className="font-semibold underline underline-offset-4"
            >
              política de cookies
            </Link>
            .
          </footer>
        </section>
      </article>
    </main>
  );
}
