import type { Metadata } from "next";
import Link from "next/link";
import { CLIMATE_METHODOLOGY } from "@/lib/destinations";
import {
  createPageMetadata,
  createWebPageJsonLd,
  serializeJsonLd,
  siteConfig,
} from "@/lib/site";

const title = "Metodología";
const description =
  "Cómo interpreta FrescoCerca los datos climáticos, las distancias y los tiempos estimados, y qué límites tienen sus recomendaciones.";
const path = "/metodologia";

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

export default function MetodologiaPage() {
  return (
    <main
      id="contenido"
      className="content-page methodology-page mx-auto min-h-screen w-full max-w-4xl px-5 py-10 sm:px-8 lg:py-16"
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
            Transparencia
          </p>
          <h1 className="content-page__title mt-3 text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
            Cómo elaboramos las recomendaciones
          </h1>
          <p className="content-page__lead mt-5 max-w-3xl text-lg leading-8 text-current/70">
            FrescoCerca ayuda a comparar destinos que pueden resultar más
            agradables para una escapada. Sus resultados sirven para orientarse,
            no para sustituir una previsión meteorológica, un navegador ni una
            alerta oficial.
          </p>
        </header>

        <section className="content-page__body mt-10 space-y-10 text-base leading-8 text-current/80">
          <section
            className="methodology-page__section"
            aria-labelledby="clima-orientativo"
          >
            <h2
              id="clima-orientativo"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              Datos climáticos orientativos
            </h2>
            <p className="mt-3">
              Las fichas parten de{" "}
              <a
                href={CLIMATE_METHODOLOGY.fuenteUrl}
                className="content-page__external-link font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
              >
                valores climatológicos normales de AEMET para 1991–2020
              </a>{" "}
              y estaciones representativas cercanas. Los valores se presentan
              como rangos editoriales redondeados para julio y agosto, revisados
              junto con la altitud y la geografía local para facilitar la
              comparación.
            </p>
            <p className="mt-3">
              Estos rangos describen condiciones habituales. No son mediciones
              en tiempo real, predicciones para una fecha concreta ni avisos de
              fenómenos adversos. Para comparar destinos, el buscador utiliza el
              punto medio de cada rango, no una temperatura futura.
            </p>
            <p className="mt-3">
              El tiempo puede cambiar con rapidez y variar dentro de un mismo
              municipio por la altitud, la orientación, la cercanía al mar y
              otros factores locales. Antes de viajar, consulta siempre la{" "}
              <a
                href="https://www.aemet.es/es/eltiempo/prediccion/avisos"
                className="content-page__external-link font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
              >
                predicción y los avisos oficiales de AEMET
              </a>
              .
            </p>
          </section>

          <section
            className="methodology-page__section"
            aria-labelledby="distancias-tiempos"
          >
            <h2
              id="distancias-tiempos"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              Distancias y tiempos estimados
            </h2>
            <p className="mt-3">
              Primero calculamos la distancia geográfica entre las coordenadas
              de referencia del origen y el destino mediante la fórmula de
              Haversine. Para obtener una aproximación por carretera, aplicamos
              un 24% adicional y sumamos 12 km por accesos urbanos y de montaña.
            </p>
            <p className="mt-3">
              El tiempo orientativo divide esa distancia estimada entre una
              velocidad efectiva de 78 km/h, añade 9 minutos por accesos y se
              redondea a intervalos de cinco minutos. Es un modelo sencillo de
              planificación, no el resultado de un navegador.
            </p>
            <p className="mt-3">
              La ruta real puede cambiar por el lugar exacto de salida, el
              tráfico, las obras, los cortes, las paradas, el tipo de vía y las
              condiciones meteorológicas.
            </p>
            <p className="mt-3">
              No uses estas cifras como instrucciones de navegación ni como
              garantía de llegada. Comprueba el itinerario antes de salir y
              revisa la{" "}
              <a
                href="https://www.dgt.es/conoce-el-estado-del-trafico/informacion-e-incidencias-de-trafico/"
                className="content-page__external-link font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
              >
                información e incidencias de tráfico de la DGT
              </a>
              .
            </p>
          </section>

          <section
            className="methodology-page__section"
            aria-labelledby="interpretar-resultados"
          >
            <h2
              id="interpretar-resultados"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              Cómo interpretar un resultado
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                Una temperatura más suave en una referencia climática no
                garantiza que haga fresco el día de la visita.
              </li>
              <li>
                El primer destino de una lista no es necesariamente el mejor
                para todas las personas: accesibilidad, salud, presupuesto y
                preferencias personales también importan.
              </li>
              <li>
                Las estimaciones pueden redondearse para facilitar la
                comparación y deben contrastarse antes de tomar una decisión.
              </li>
              <li>
                Cuando se incorporen nuevas fuentes o criterios, esta página se
                actualizará para explicar el cambio.
              </li>
            </ul>
          </section>

          <section
            className="methodology-page__section"
            aria-labelledby="orden-resultados"
          >
            <h2
              id="orden-resultados"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              Cómo se ordenan los resultados
            </h2>
            <p className="mt-3">
              Primero se descartan los destinos cuyo tiempo estimado supera el
              límite elegido. Los restantes reciben una puntuación de
              comparación, no una valoración absoluta:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                las preferencias seleccionadas tienen el mayor peso y se premia
                tanto su cobertura como cada coincidencia;
              </li>
              <li>
                el alivio nocturno orientativo pesa más que la diferencia
                diurna, porque el objetivo principal es facilitar el descanso;
              </li>
              <li>
                el tiempo estimado de viaje resta puntuación y la altitud aporta
                un pequeño ajuste, limitado a cuatro puntos;
              </li>
              <li>
                si dos opciones empatan, aparece primero la que requiere menos
                tiempo estimado.
              </li>
            </ul>
            <p className="mt-4">
              La puntuación solo ordena el catálogo disponible. No incorpora
              precios, disponibilidad, accesibilidad, riesgo de incendio ni el
              pronóstico del día, por lo que esas comprobaciones siguen siendo
              responsabilidad de quien organiza el viaje.
            </p>
          </section>

          <aside className="methodology-page__warning rounded-2xl border border-amber-600/25 bg-amber-500/10 p-5 text-current">
            <h2 className="text-lg font-semibold">Seguridad primero</h2>
            <p className="mt-2">
              FrescoCerca no emite alertas. Si existe una situación de riesgo,
              sigue las instrucciones de las autoridades. Ante una emergencia,
              llama al{" "}
              <a
                href="https://europa.eu/youreurope/citizens/travel/security-and-emergencies/emergency/index_es.htm"
                className="content-page__external-link font-semibold underline underline-offset-4"
              >
                112
              </a>
              .
            </p>
          </aside>

          <section
            className="methodology-page__section"
            aria-labelledby="correcciones"
          >
            <h2
              id="correcciones"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              Correcciones y actualización
            </h2>
            <p className="mt-3">
              Revisamos los contenidos cuando cambian las fuentes o detectamos
              un error. Puedes comunicar una corrección escribiendo a{" "}
              <a
                href={`mailto:${siteConfig.legal.email}`}
                className="content-page__email-link font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
              >
                {siteConfig.legal.email}
              </a>
              .
            </p>
            <p className="mt-3 text-sm text-current/60">
              Última actualización: 29 de julio de 2026.
            </p>
          </section>
        </section>
      </article>
    </main>
  );
}
