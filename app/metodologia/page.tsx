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
const METHODOLOGY_UPDATED = "2026-08-17";
const editorialReviewLabel = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${METHODOLOGY_UPDATED}T00:00:00Z`));

const editorialHistory = [
  {
    date: "2026-08-17",
    label: "17 de agosto de 2026",
    title: "Atlas comparativo y revisión posterior al eclipse",
    detail:
      "Se incorporó el atlas comparativo, se reforzaron las fuentes y las listas de comprobación, y la cobertura del eclipse del 12 de agosto pasó a tratarse como contenido de archivo.",
  },
  {
    date: "2026-08-05",
    label: "5 de agosto de 2026",
    title: "Preparación técnica para AdSense",
    detail:
      "Se añadieron las señales de titularidad y los archivos técnicos necesarios para solicitar la revisión de AdSense, sin presentar esa preparación como una aprobación ni activar anuncios por sí sola.",
  },
  {
    date: "2026-08-02",
    label: "2 de agosto de 2026",
    title: "Ampliación de destinos y fuentes",
    detail:
      "Se desarrollaron las fichas locales de destino, se incorporaron fuentes públicas específicas y se hizo más visible la responsabilidad editorial.",
  },
  {
    date: "2026-07-29",
    label: "29 de julio de 2026",
    title: "Nuevas guías de planificación",
    detail:
      "Se ampliaron las guías sobre noches frescas, transporte público y escapadas de fin de semana, junto con los criterios para ordenar recomendaciones.",
  },
  {
    date: "2026-07-27",
    label: "27 de julio de 2026",
    title: "Publicación inicial",
    detail:
      "Se lanzó la primera versión pública de FrescoCerca con el buscador, el catálogo inicial y la explicación básica de sus límites.",
  },
] as const;

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path,
});

const jsonLd = createWebPageJsonLd({
  title,
  description,
  path,
  modifiedTime: METHODOLOGY_UPDATED,
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
            aria-labelledby="tipos-de-datos"
          >
            <h2
              id="tipos-de-datos"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              Qué es medido y qué es estimado
            </h2>
            <p className="mt-3">
              FrescoCerca no opera estaciones meteorológicas ni realiza
              mediciones propias en los destinos. Cuando enlaza un dato medido
              u observado, ese dato pertenece a la fuente pública identificada;
              el sitio se limita a explicarlo y organizarlo.
            </p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-current/10 p-5">
                <dt className="font-semibold text-current">
                  Medición u observación
                </dt>
                <dd className="mt-1">
                  Es un valor registrado por una fuente oficial. FrescoCerca no
                  lo genera y solo debe tratarse como medición cuando se
                  identifica su fuente y periodo.
                </dd>
              </div>
              <div className="rounded-2xl border border-current/10 p-5">
                <dt className="font-semibold text-current">
                  Referencia climatológica
                </dt>
                <dd className="mt-1">
                  Resume periodos históricos largos. Ayuda a comparar lugares,
                  pero no describe el tiempo que hará durante un viaje.
                </dd>
              </div>
              <div className="rounded-2xl border border-current/10 p-5">
                <dt className="font-semibold text-current">
                  Estimación editorial
                </dt>
                <dd className="mt-1">
                  Es un cálculo de FrescoCerca, como los rangos redondeados o
                  los tiempos orientativos. Siempre debe leerse junto a su
                  método y sus límites.
                </dd>
              </div>
              <div className="rounded-2xl border border-current/10 p-5">
                <dt className="font-semibold text-current">
                  Predicción y aviso
                </dt>
                <dd className="mt-1">
                  Proceden de organismos competentes como AEMET. FrescoCerca no
                  produce previsiones ni alertas y remite a la información
                  oficial vigente.
                </dd>
              </div>
            </dl>
          </section>

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
              Las fichas usan como fuente marco los{" "}
              <a
                href={CLIMATE_METHODOLOGY.fuenteUrl}
                className="content-page__external-link font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-current dark:text-emerald-300"
              >
                mapas y valores climatológicos normales de AEMET para
                1991–2020
              </a>
              . A partir de esa información abierta, la altitud y el contexto
              geográfico, FrescoCerca construye estimaciones editoriales
              redondeadas para julio y agosto que permiten una primera
              comparación. No se atribuyen a una estación concreta cuando la
              ficha no identifica expresamente esa estación.
            </p>
            <p className="mt-3">
              Estos rangos son orientativos: no son mediciones directas del
              municipio, tablas oficiales reproducidas literalmente,
              observaciones en tiempo real, predicciones para una fecha concreta
              ni avisos de fenómenos adversos. Para comparar destinos, el
              buscador utiliza el punto medio de cada estimación, no una
              temperatura futura.
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
            aria-labelledby="responsabilidad-editorial"
          >
            <h2
              id="responsabilidad-editorial"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              Responsabilidad editorial
            </h2>
            <p className="mt-3">
              {siteConfig.editorial.responsible} es el responsable editorial
              de FrescoCerca. Su función es mantener separados los datos de las
              interpretaciones, revisar la coherencia de las comparaciones y
              atender las correcciones. Esta identificación no atribuye
              titulaciones ni credenciales profesionales que el sitio no haya
              documentado.
            </p>
            <p className="mt-3">
              Las fichas identifican la fuente marco usada para las estimaciones
              climáticas y enlazan las fuentes locales que respaldan sus demás
              afirmaciones verificables. FrescoCerca interpreta y organiza esa
              información, pero no habla en nombre de AEMET, la DGT, el IGN ni
              ninguna administración enlazada.
            </p>
          </section>

          <section
            className="methodology-page__section"
            aria-labelledby="herramientas-editoriales"
          >
            <h2
              id="herramientas-editoriales"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              Herramientas y asistencia generativa
            </h2>
            <p className="mt-3">
              FrescoCerca utiliza herramientas de automatización y asistencia
              generativa para ayudar a estructurar comparaciones, detectar
              incoherencias y preparar borradores de texto o código. Esas
              herramientas no son una fuente meteorológica, turística ni de
              seguridad y sus resultados no se publican como mediciones.
            </p>
            <p className="mt-3">
              La responsabilidad final corresponde a la persona identificada
              en el sitio. Las afirmaciones verificables deben apoyarse en las
              fuentes enlazadas; cuando una cifra no procede de una observación
              local reproducible, se presenta expresamente como estimación y se
              explican sus límites.
            </p>
          </section>

          <section
            className="methodology-page__section"
            aria-labelledby="historial-editorial"
          >
            <h2
              id="historial-editorial"
              className="content-page__section-title text-2xl font-semibold tracking-tight text-current"
            >
              Historial de cambios editoriales
            </h2>
            <p className="mt-3">
              Este registro recoge cambios de contenido y método que afectan a
              la utilidad o interpretación del sitio. No se añaden aquí ajustes
              puramente tipográficos.
            </p>
            <ol className="mt-5 space-y-5">
              {editorialHistory.map((entry) => (
                <li
                  className="rounded-2xl border border-current/10 p-5"
                  key={entry.date}
                >
                  <time
                    className="text-sm font-semibold text-emerald-700 dark:text-emerald-300"
                    dateTime={entry.date}
                  >
                    {entry.label}
                  </time>
                  <h3 className="mt-1 text-lg font-semibold text-current">
                    {entry.title}
                  </h3>
                  <p className="mt-1">{entry.detail}</p>
                </li>
              ))}
            </ol>
          </section>

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
            <p className="mt-3">
              Si una corrección cambia una cifra, una fuente o una conclusión
              práctica, actualizamos la fecha de revisión de la página. Los
              cambios puramente tipográficos no se presentan como una nueva
              revisión de los datos.
            </p>
            <p className="mt-3 text-sm text-current/60">
              Última actualización: {" "}
              <time dateTime={METHODOLOGY_UPDATED}>
                {editorialReviewLabel}
              </time>
              .
            </p>
          </section>
        </section>
      </article>
    </main>
  );
}
