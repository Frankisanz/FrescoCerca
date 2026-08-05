import type { Metadata } from "next";
import Link from "next/link";
import { EditorialByline } from "@/app/components/editorial-byline";
import { EditorialHeroImage } from "@/app/components/editorial-hero-image";
import { breadcrumbJsonLd } from "@/lib/content";
import {
  createArticleJsonLd,
  createArticleMetadata,
  serializeJsonLd,
} from "@/lib/site";

const title = "Eclipse solar total 2026 en España: hora y dónde verlo";
const description =
  "Guía actualizada del eclipse total del 12 de agosto de 2026: hora por ciudad, franja de totalidad, nubes, horizonte oeste, tráfico, gafas y plan B.";
const path = "/eclipse-2026" as const;
const updatedDate = "2026-08-05";

const links = {
  ignEclipse:
    "https://astronomia.ign.es/es/eclipses-de-sol-y-luna/eclipse-total-sol-de-12-de-agosto-2026",
  ignLocal: "https://visualizadores.ign.es/eclipses/2026",
  ignConditions: "https://eclipses.ign.es/condiciones-de-observacion.html",
  ignPlanning: "https://eclipses.ign.es/recomendaciones-practicas.html",
  ignSafety: "https://eclipses.ign.es/como-observar-eclipses.html",
  ignGlasses:
    "https://eclipses.ign.es/src/img/eclipses/como-observar-eclipses/calidad_gafas_eclipse_CNE.pdf",
  ignPhotography: "https://eclipses.ign.es/astrofotografia.html",
  ignPerseids: "https://astronomia.ign.es/perseidas",
  aemetStudy:
    "https://www.aemet.es/es/noticias/2026/05/estudio_nubosidad_eclipse",
  aemetForecast:
    "https://www.aemet.es/es/eltiempo/prediccion/municipios",
  dgtMeasures:
    "https://www.dgt.es/comunicacion/notas-de-prensa/20260122-resolucion-medidas-especiales-trafico-2026/",
  dgtTraffic: "https://www.dgt.es/conoce-el-estado-del-trafico/",
  nasaEclipse:
    "https://science.nasa.gov/eclipses/future-eclipses/total-solar-eclipse-on-august-12-2026/",
} as const;

const officialSources = Object.values(links);

export const metadata: Metadata = createArticleMetadata({
  title,
  description,
  path,
  modifiedTime: updatedDate,
});

const cityExamples = [
  {
    city: "A Coruña",
    type: "Total",
    start: "19:31",
    keyTime: "Máximo 20:28",
    detail: "76 s de totalidad · Sol a 12°",
    source: "IGN",
  },
  {
    city: "Burgos",
    type: "Total",
    start: "19:33",
    keyTime: "Máximo 20:29",
    detail: "104 s de totalidad · Sol a 8°",
    source: "IGN",
  },
  {
    city: "León",
    type: "Total",
    start: "19:32",
    keyTime: "Totalidad 20:28–20:30",
    detail: "El parcial termina a las 21:22",
    source: "NASA",
  },
  {
    city: "Zaragoza",
    type: "Total",
    start: "19:34",
    keyTime: "Totalidad 20:29–20:30",
    detail: "El Sol se pone a las 21:07",
    source: "NASA",
  },
  {
    city: "València / Valencia",
    type: "Total",
    start: "19:38",
    keyTime: "Totalidad 20:32–20:33",
    detail: "El Sol se pone a las 21:01",
    source: "NASA",
  },
  {
    city: "Palma",
    type: "Total",
    start: "19:38",
    keyTime: "Máximo 20:32",
    detail: "Sol muy bajo, a unos 2°",
    source: "IGN",
  },
  {
    city: "Madrid",
    type: "Parcial",
    start: "19:36",
    keyTime: "Máximo 20:32",
    detail: "99 % de cobertura · ocaso 21:16",
    source: "NASA",
  },
  {
    city: "Barcelona",
    type: "Parcial",
    start: "19:35",
    keyTime: "Máximo 20:29",
    detail: "99 % de cobertura · ocaso 20:54",
    source: "NASA",
  },
] as const;

const checklist = [
  {
    when: "Ahora",
    title: "Comprueba tu punto exacto, no solo la provincia",
    text: "Introduce el municipio o la ubicación en el visualizador del IGN. Anota inicio, máximo, totalidad si existe, altura y azimut del Sol. Madrid y Barcelona, por ejemplo, tendrán un eclipse parcial aunque la cobertura ronde el 99 % en los datos de NASA.",
  },
  {
    when: "De 7 a 3 días antes",
    title: "Mantén dos zonas con meteorología distinta",
    text: "Compara la predicción oficial, no una sola aplicación. Conserva una alternativa razonable, pero evita una persecución de nubes que te obligue a conducir con prisas o a cruzar media España.",
  },
  {
    when: "El día anterior",
    title: "Revisa el horizonte y el acceso",
    text: "Confirma que árboles, edificios o una loma no tapan el oeste. Verifica aparcamiento autorizado, transporte público, agua, cobertura, avisos y una salida que no bloquee caminos de emergencia.",
  },
  {
    when: "El 12 de agosto",
    title: "Llega con margen y protege los ojos",
    text: "Sigue las indicaciones de tráfico y protección civil. Usa gafas de eclipse adecuadas durante todas las fases parciales y supervisa de forma continua a los menores.",
  },
] as const;

const eclipseFaq = [
  {
    q: "¿Cuándo y a qué hora es el eclipse solar del 12 de agosto de 2026 en España?",
    a: "Será al atardecer del miércoles 12 de agosto de 2026. En los ejemplos oficiales españoles la fase parcial comienza aproximadamente entre las 19:31 y las 19:38 y el momento principal llega en torno a las 20:28–20:33, pero la hora exacta cambia con la localidad. Hay que consultarla en el visualizador del IGN.",
  },
  {
    q: "¿Se verá total desde toda España?",
    a: "No. La franja de totalidad cruza España de oeste a este por buena parte de la mitad norte peninsular y Baleares. Fuera de esa franja se verá parcial, aunque la cobertura pueda ser muy alta.",
  },
  {
    q: "¿El eclipse será total en Madrid?",
    a: "En la tabla de NASA para la ciudad de Madrid figura como parcial, con un 99 % de cobertura y máximo a las 20:32. Dentro de la Comunidad puede haber diferencias, así que no extrapoles el dato de la capital: comprueba el punto exacto en el IGN.",
  },
  {
    q: "¿El eclipse será total en Barcelona?",
    a: "En la tabla de NASA para la ciudad de Barcelona figura como parcial, con un 99 % de cobertura y máximo a las 20:29. Consulta la ubicación exacta en el visualizador del IGN porque estar muy cerca del límite no equivale a estar dentro de la totalidad.",
  },
  {
    q: "¿Cuál es el mejor sitio de España para ver el eclipse de 2026?",
    a: "No existe un ganador seguro. El mejor punto será uno dentro de la totalidad, con horizonte oeste despejado, previsión favorable, acceso autorizado y una salida razonable. Unos segundos extra no compensan nubes, obstáculos o un acceso peligroso.",
  },
  {
    q: "¿Por qué necesito un horizonte oeste despejado?",
    a: "Porque en España la totalidad ocurrirá muy cerca de la puesta de Sol. El astro estará bajo y puede quedar oculto por árboles, edificios o relieve incluso si el punto está dentro de la franja.",
  },
  {
    q: "¿Qué tiempo hará durante el eclipse?",
    a: "La climatología solo indica qué ocurrió otros años; no predice el 12 de agosto. Consulta la predicción municipal y los avisos de AEMET, repite la revisión al acercarse la hora y conserva un plan B prudente.",
  },
  {
    q: "¿Sirven las gafas de sol normales para mirar el eclipse?",
    a: "No. Tampoco sirven radiografías, CDs, cristales ahumados ni filtros caseros. El IGN advierte de que mirar el Sol sin protección adecuada puede causar daños permanentes sin sensación inmediata de dolor.",
  },
  {
    q: "¿Cómo sé si unas gafas de eclipse son seguras?",
    a: "Busca la referencia EN ISO 12312-2:2015, marcado CE en productos vendidos en la UE, fabricante e instrucciones trazables, y revisa que el filtro no tenga rayas, perforaciones, dobleces ni zonas claras. Un logotipo impreso por sí solo no sustituye la documentación y los ensayos.",
  },
  {
    q: "¿Puedo quitarme las gafas durante la totalidad?",
    a: "Solo durante los breves instantes de totalidad real y únicamente si tu punto está dentro de la franja. En un eclipse parcial, incluso con un 99 % de cobertura, nunca es seguro mirar sin protección. Vuelve a cubrirte antes de que reaparezca cualquier parte brillante del Sol.",
  },
  {
    q: "¿Puedo fotografiar el eclipse con el móvil o una cámara?",
    a: "No apuntes ni mires a través de una cámara, prismáticos o telescopio sin un filtro solar específico colocado delante de la óptica. Las gafas que llevas en los ojos no protegen el equipo ni hacen segura la observación a través de él.",
  },
  {
    q: "¿Cómo puedo ver el eclipse con niños?",
    a: "Mantén supervisión continua, ajusta y revisa sus gafas y ensaya antes. Una alternativa indirecta es proyectar la imagen con cartulinas y un pequeño orificio, siempre de espaldas al Sol y sin mirar por el agujero.",
  },
  {
    q: "¿Qué hago si está nublado?",
    a: "Evita desplazamientos desesperados de última hora. Si tu alternativa segura también está cubierta, sigue una retransmisión oficial o disfruta del cambio ambiental sin mirar al Sol. Las nubes no convierten en segura la observación directa.",
  },
  {
    q: "¿Coinciden el eclipse y las Perseidas de 2026?",
    a: "Sí. El IGN sitúa el máximo de las Perseidas entre las 04:00 y las 06:00 de la madrugada del 13 de agosto, con actividad intensa desde aproximadamente las 23:00 del día 12. La Luna nueva favorece la observación si el cielo está despejado.",
  },
] as const;

export default function Eclipse2026Page() {
  const articleJsonLd = createArticleJsonLd({
    title,
    description,
    path,
    articleSection: "Eclipse solar de 2026",
    citations: officialSources,
    modifiedTime: updatedDate,
  });
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Eclipse solar 2026", path },
  ]);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: eclipseFaq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main id="contenido" className="article-page eclipse-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([
            articleJsonLd,
            breadcrumbSchema,
            faqJsonLd,
          ]),
        }}
      />

      <header className="article-hero eclipse-article-hero">
        <div className="site-shell article-hero-inner">
          <nav className="breadcrumbs" aria-label="Migas de pan">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Eclipse 2026</span>
          </nav>
          <p className="eyebrow">
            Guía práctica · Actualizada el{" "}
            <time dateTime={updatedDate}>05/08/2026</time>
          </p>
          <h1>
            Eclipse solar total del 12 de agosto de 2026 en España: dónde
            verlo, hora y mapa por localidad.
          </h1>
          <p className="article-deck">
            Respuestas verificadas para saber si será total en tu ciudad,
            elegir un horizonte oeste sin obstáculos, seguir las nubes y
            observarlo sin riesgos.
          </p>
          <div className="article-meta-row">
            <span>Miércoles 12 de agosto</span>
            <span>Lectura: 16 min</span>
            <span>IGN · AEMET · DGT · NASA</span>
          </div>
          <EditorialByline
            reviewedOn="5 de agosto de 2026"
            sourceSummary="Horarios y franja contrastados con IGN y NASA; nubosidad y predicción con AEMET; seguridad con el IGN y movilidad con la DGT."
          />
        </div>
      </header>

      <div className="site-shell">
        <EditorialHeroImage
          caption="En 2026 no basta con estar dentro de la franja: el Sol estará muy bajo y hace falta una línea de visión limpia hacia el oeste."
        />
      </div>

      <div className="site-shell article-layout">
        <article className="article-body">
          <section className="eclipse-answer" aria-labelledby="respuesta-rapida">
            <p className="eyebrow">Respuesta rápida</p>
            <h2 id="respuesta-rapida">
              ¿Cuándo es y dónde se verá el eclipse de 2026?
            </h2>
            <p>
              El eclipse solar del <strong>miércoles 12 de agosto de 2026</strong>{" "}
              llegará a España al atardecer. Será <strong>total</strong> dentro
              de una franja que cruza buena parte de la mitad norte de oeste a
              este y alcanza Baleares; fuera de ella será parcial. En ejemplos
              oficiales, la fase parcial empieza alrededor de las 19:31–19:38
              y el momento principal llega hacia las 20:28–20:33, pero cada
              municipio tiene su propio horario.
            </p>
            <p>
              La decisión correcta empieza por el{" "}
              <a href={links.ignLocal} target="_blank" rel="noopener noreferrer">
                visualizador oficial del Instituto Geográfico Nacional (IGN)
              </a>
              : introduce tu punto, confirma si hay totalidad y anota la altura
              y el azimut del Sol. Después compara nubes, horizonte, acceso y
              tráfico. No elijas un mirador solo por una lista de internet.
            </p>
            <a
              className="button button-primary"
              href={links.ignLocal}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar mi localidad en el IGN ↗
            </a>
          </section>

          <div className="eclipse-facts" role="list" aria-label="Datos esenciales">
            <div role="listitem">
              <strong>12 agosto</strong>
              <span>Miércoles, al atardecer</span>
            </div>
            <div role="listitem">
              <strong>Oeste</strong>
              <span>Horizonte imprescindible</span>
            </div>
            <div role="listitem">
              <strong>99 % ≠ total</strong>
              <span>La franja exacta importa</span>
            </div>
            <div role="listitem">
              <strong>ISO 12312-2</strong>
              <span>Protección ocular adecuada</span>
            </div>
          </div>

          <nav className="article-toc" aria-label="Contenido de la guía">
            <strong>En esta guía</strong>
            <ol>
              <li><a href="#hora-por-ciudad">Hora por ciudad</a></li>
              <li><a href="#total-o-parcial">Total o parcial</a></li>
              <li><a href="#mejor-lugar">Cómo elegir lugar</a></li>
              <li><a href="#nubes">Nubes y plan B</a></li>
              <li><a href="#viaje">Tráfico y pernocta</a></li>
              <li><a href="#seguridad">Gafas y cámaras</a></li>
              <li><a href="#perseidas">Eclipse y Perseidas</a></li>
              <li><a href="#preguntas">Preguntas frecuentes</a></li>
            </ol>
          </nav>

          <h2 id="hora-por-ciudad">
            ¿A qué hora es el eclipse de 2026 en Madrid, Barcelona, Valencia,
            Zaragoza y otras ciudades?
          </h2>
          <p>
            No hay una única hora válida para toda España. Esta tabla reúne
            ejemplos publicados por el IGN y NASA en <strong>hora local</strong>{" "}
            para responder las consultas más frecuentes. Los horarios están
            redondeados al minuto y sirven para orientarse, no para decidir si
            una calle o mirador está dentro de la totalidad.
          </p>

          <div
            className="eclipse-table-wrap"
            role="region"
            aria-label="Horarios por ciudad; tabla desplazable horizontalmente"
            tabIndex={0}
          >
            <table className="eclipse-table">
              <caption>
                Horarios oficiales de referencia del eclipse solar del 12 de
                agosto de 2026 en ciudades españolas
              </caption>
              <thead>
                <tr>
                  <th scope="col">Ciudad</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Inicio parcial</th>
                  <th scope="col">Momento clave</th>
                  <th scope="col">Dato útil</th>
                </tr>
              </thead>
              <tbody>
                {cityExamples.map((row) => (
                  <tr key={row.city}>
                    <th scope="row">{row.city}</th>
                    <td>
                      <span className={`eclipse-status eclipse-status--${row.type.toLowerCase()}`}>
                        {row.type}
                      </span>
                    </td>
                    <td>{row.start}</td>
                    <td>{row.keyTime}</td>
                    <td>{row.detail} · {row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="eclipse-table-note">
            Fuentes: datos locales publicados por el{" "}
            <a href={links.ignEclipse} target="_blank" rel="noopener noreferrer">IGN</a>{" "}
            y tabla de ciudades de{" "}
            <a href={links.nasaEclipse} target="_blank" rel="noopener noreferrer">NASA</a>.
            El IGN advierte de que pequeñas diferencias de coordenadas, relieve
            y modelo pueden alterar ligeramente los parámetros locales.
          </p>

          <h2 id="total-o-parcial">
            ¿Dónde se verá total y qué diferencia hay con un eclipse parcial
            del 99 %?
          </h2>
          <p>
            El IGN sitúa la totalidad en casi toda la mitad norte peninsular y
            cita capitales como A Coruña, Oviedo, León, Bilbao, Zaragoza,
            València y Palma. En la mitad sur se verá parcial. Cerca del borde,
            unos pocos kilómetros pueden separar una totalidad breve de una
            cobertura muy alta pero todavía parcial.
          </p>
          <div className="eclipse-compare">
            <section>
              <span>Totalidad real</span>
              <h3>Dentro de la umbra</h3>
              <p>
                El disco solar queda completamente cubierto durante un
                intervalo breve. Solo en esos instantes exactos y en un punto
                confirmado dentro de la franja puede retirarse la protección
                ocular; antes y después vuelve a ser obligatoria.
              </p>
            </section>
            <section>
              <span>Parcial, incluso al 99 %</span>
              <h3>Fuera de la franja</h3>
              <p>
                Siempre queda una parte brillante del Sol. No aparecen las
                condiciones de una totalidad y nunca es seguro mirar sin
                filtros solares adecuados. Madrid y Barcelona figuran como
                parciales en la tabla de NASA.
              </p>
            </section>
          </div>
          <aside className="source-callout">
            <strong>La provincia no basta</strong>
            <p>
              El visualizador del IGN calcula cada punto y considera el
              relieve, pero no edificios ni árboles. Comprueba después el
              horizonte sobre el terreno. Si estás cerca del límite, evita
              deducir el resultado a partir de una ciudad vecina.
            </p>
            <a href={links.ignConditions} target="_blank" rel="noopener noreferrer">
              Cómo calcula el IGN las condiciones locales ↗
            </a>
          </aside>

          <h2 id="mejor-lugar">
            ¿Cuál es el mejor lugar para ver el eclipse de 2026 en España?
          </h2>
          <p>
            No hay un mirador que pueda proclamarse ganador una semana antes.
            El lugar más sensato equilibra cinco criterios: totalidad,
            horizonte, nubes, acceso y salida. El propio IGN señala que ganar
            unos segundos cerca del eje no suele compensar tráfico o falta de
            espacio.
          </p>
          <div className="eclipse-region-grid">
            <section>
              <span>Noroeste y Cantábrico</span>
              <h3>Sol algo más alto, más riesgo climático histórico</h3>
              <p>
                A Coruña ofrece en el ejemplo oficial un Sol a 12° y Burgos a
                8°. En el litoral de Galicia, Asturias, Cantabria y País Vasco,
                AEMET observó solo un 30–50 % de cielos poco nubosos o
                despejados en fechas y horas equivalentes entre 2010 y 2025.
              </p>
            </section>
            <section>
              <span>Interior y valle del Ebro</span>
              <h3>Mejor frecuencia histórica, con tormentas posibles</h3>
              <p>
                Amplias zonas de Castilla y León, Castilla-La Mancha y el
                valle del Ebro alcanzan históricamente un 50–70 % de cielo poco
                nuboso o despejado. Eso no garantiza el 12 de agosto y cada
                punto debe seguir dentro de la franja.
              </p>
            </section>
            <section>
              <span>Mediterráneo y Baleares</span>
              <h3>La línea de visión se vuelve decisiva</h3>
              <p>
                València y Palma están entre los ejemplos de totalidad, pero
                el Sol estará extremadamente bajo: el IGN calcula unos 2° en
                Palma durante el máximo. Un edificio o una loma lejana pueden
                arruinar la observación.
              </p>
            </section>
            <section>
              <span>Mitad sur</span>
              <h3>Más despejado históricamente, pero eclipse parcial</h3>
              <p>
                AEMET encuentra mayor frecuencia de cielos despejados en el
                sur, pero el IGN indica que allí el eclipse de 2026 será
                parcial. Decide si priorizas la totalidad o verlo cerca de casa
                con seguridad.
              </p>
            </section>
          </div>

          <h3>Cómo comprobar el horizonte oeste antes de viajar</h3>
          <ol>
            <li>
              Consulta en el IGN el azimut y la altura del Sol para tu punto.
              No uses una captura de otra localidad.
            </li>
            <li>
              Visita el lugar a una hora similar o usa herramientas de relieve
              como primera criba. Busca el punto exacto por el que se pone el Sol.
            </li>
            <li>
              Comprueba obstáculos cercanos: árboles, gradas, edificios,
              tendidos, vallas y personas que puedan situarse delante.
            </li>
            <li>
              Elige un espacio autorizado y estable. No subas a cunetas,
              tejados, taludes ni zonas con riesgo de incendio para ganar vista.
            </li>
          </ol>

          <h2 id="nubes">
            ¿Qué tiempo hará el 12 de agosto? Cómo usar AEMET y preparar un
            plan B
          </h2>
          <p>
            Hay que separar <strong>climatología</strong> y{" "}
            <strong>predicción</strong>. El{" "}
            <a href={links.aemetStudy} target="_blank" rel="noopener noreferrer">
              estudio de nubosidad de AEMET
            </a>{" "}
            cuenta con el historial 2010–2025 para fechas y horas semejantes:
            ayuda a elegir zonas candidatas, pero no dice dónde estará
            despejado el día del eclipse. La predicción municipal alcanza
            siete días y el detalle horario, hasta 48 horas; ambas se
            actualizan.
          </p>
          <div className="eclipse-weather-plan">
            <section>
              <strong>De 7 a 4 días</strong>
              <p>
                Observa el patrón general y conserva dos sectores. No reserves
                una persecución de nubes de cientos de kilómetros por un único
                icono meteorológico.
              </p>
            </section>
            <section>
              <strong>De 72 a 24 horas</strong>
              <p>
                Compara nubosidad baja, media y alta, tormentas, viento y
                avisos. Valora también las condiciones de la ruta y no solo las
                del mirador.
              </p>
            </section>
            <section>
              <strong>El mismo día</strong>
              <p>
                Revisa la última actualización de AEMET. Cambia únicamente si
                el plan alternativo sigue siendo legal, accesible y alcanzable
                sin prisas.
              </p>
            </section>
          </div>
          <p>
            Si ambos planes están cubiertos, evita una carrera peligrosa. Una
            retransmisión oficial es mejor alternativa que conducir deprisa o
            estacionar en un arcén. Y recuerda: las nubes atenúan la luz, pero
            no convierten en segura la observación directa del Sol.
          </p>
          <a href={links.aemetForecast} target="_blank" rel="noopener noreferrer">
            Consultar la predicción por municipios de AEMET ↗
          </a>

          <h2 id="viaje">
            Tráfico, aparcamiento y pernocta: cómo llegar sin estropear el plan
          </h2>
          <p>
            La{" "}
            <a href={links.dgtMeasures} target="_blank" rel="noopener noreferrer">
              DGT ha previsto medidas especiales
            </a>{" "}
            por el aumento de desplazamientos en Aragón, Asturias,
            Castilla-La Mancha, Castilla y León, La Rioja, Baleares y
            Comunidad Valenciana. El IGN recomienda salir con suficiente
            antelación, considerar transporte colectivo, reservar pronto si
            vas a dormir fuera y esperar antes del regreso para que baje la
            concentración de tráfico.
          </p>
          <ul className="article-checklist">
            <li>Comprueba cortes, restricciones y aparcamiento municipal el mismo día.</li>
            <li>No bloquees cunetas, caminos agrícolas, accesos de emergencia ni fincas privadas.</li>
            <li>Lleva agua, comida sencilla, batería externa, linterna, medicación y ropa para la noche.</li>
            <li>Descarga el punto y la ruta: la cobertura puede saturarse en una concentración grande.</li>
            <li>Acuerda un punto de encuentro si viajas en grupo y evita salir todos justo al terminar.</li>
          </ul>
          <p>
            Si quieres plantear el viaje sin coche, consulta nuestra{" "}
            <Link href="/guias/escapadas-frescas-sin-coche">
              guía de escapadas en transporte público
            </Link>
            . Para reservar una noche y no conducir inmediatamente después,
            usa la{" "}
            <Link href="/guias/escapadas-frescas-de-fin-de-semana">
              guía de fin de semana
            </Link>{" "}
            y verifica después la ubicación exacta en el IGN.
          </p>

          <div className="timeline-list">
            {checklist.map((item, index) => (
              <section key={item.when}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>{item.when}</small>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </section>
            ))}
          </div>

          <div id="seguridad" className="safety-panel">
            <span className="safety-symbol" aria-hidden="true">!</span>
            <div>
              <h2>Gafas de eclipse: la protección ocular no es opcional</h2>
              <p>
                El IGN advierte de que la retina puede lesionarse de forma
                permanente sin dolor inmediato. Para la observación directa,
                busca gafas con referencia <strong>EN ISO 12312-2:2015</strong>,
                marcado CE cuando se vendan en la UE, fabricante identificable
                e instrucciones. Descarta cualquier filtro rayado, perforado,
                doblado, suelto o con zonas claras.
              </p>
              <p>
                No sirven gafas de sol, radiografías, CDs, cristales ahumados
                ni otros remedios caseros. Con niños, prueba el ajuste antes y
                mantén supervisión continua. La proyección con dos cartulinas y
                un pequeño orificio permite observar de forma indirecta sin
                mirar a través del agujero.
              </p>
              <a href={links.ignGlasses} target="_blank" rel="noopener noreferrer">
                Requisitos oficiales para unas gafas seguras (PDF) ↗
              </a>
            </div>
          </div>

          <h3>¿Se pueden quitar las gafas durante la totalidad?</h3>
          <p>
            NASA indica que solo se puede mirar sin protección durante los
            breves instantes de <strong>totalidad real</strong>, dentro de la
            franja y entre los contactos exactos. En una ubicación parcial —aun
            con 99 % de cobertura— las gafas permanecen puestas todo el tiempo.
            Si no sabes con certeza si la totalidad ha comenzado o terminado,
            mantén la protección.
          </p>

          <h3>Fotografiar con móvil, cámara, prismáticos o telescopio</h3>
          <p>
            Las gafas delante de tus ojos no hacen seguro mirar a través de una
            óptica. El IGN exige un filtro solar específico situado{" "}
            <strong>delante del objetivo</strong> y recomienda probar el equipo
            con antelación. No improvises ajustes universales ni sostengas unas
            gafas de cartón delante de la cámara. Si no tienes material y
            experiencia adecuados, fotografía la proyección indirecta o el
            ambiente, no el Sol.
          </p>
          <a href={links.ignPhotography} target="_blank" rel="noopener noreferrer">
            Guía oficial de astrofotografía del IGN ↗
          </a>

          <h2 id="perseidas">
            Eclipse y Perseidas la misma noche: por qué puede compensar dormir
            cerca
          </h2>
          <p>
            La noche del 12 al 13 de agosto reúne dos fenómenos. El IGN sitúa
            el máximo de las Perseidas entre las <strong>04:00 y las 06:00</strong>{" "}
            del día 13, con actividad que puede ser intensa desde las 23:00 del
            día 12. Además habrá Luna nueva, una condición favorable si el
            cielo está despejado.
          </p>
          <p>
            Esto permite evitar el peor momento del regreso: cena, descansa y
            espera a que baje el tráfico. Para las Perseidas busca oscuridad,
            abrigo ligero, una zona segura y una vista amplia del cielo; a
            diferencia del eclipse solar, se observan a simple vista y no
            requieren mirar hacia un único punto. Respeta el descanso local,
            las normas del espacio y cualquier restricción por incendios.
          </p>
          <p>
            Puedes comparar ideas en nuestro catálogo de{" "}
            <Link href="/destinos">destinos con noches de verano más suaves</Link>,
            pero confirma por separado la franja, el horizonte y el acceso.
          </p>
          <a href={links.ignPerseids} target="_blank" rel="noopener noreferrer">
            Consultar las Perseidas de 2026 en el IGN ↗
          </a>

          <h2>Planifica desde tu ciudad sin asumir que el destino será total</h2>
          <p>
            Estas páginas ayudan a comparar distancias, descanso y alternativas
            de viaje. No certifican la visibilidad del eclipse: termina siempre
            la decisión en el visualizador del IGN.
          </p>
          <div className="eclipse-city-links">
            <Link href="/desde/madrid">Desde Madrid</Link>
            <Link href="/desde/barcelona">Desde Barcelona</Link>
            <Link href="/desde/valencia">Desde Valencia</Link>
            <Link href="/desde/zaragoza">Desde Zaragoza</Link>
            <Link href="/desde/bilbao">Desde Bilbao</Link>
            <Link href="/desde/valladolid">Desde Valladolid</Link>
          </div>

          <h2 id="preguntas">Preguntas frecuentes sobre el eclipse de 2026</h2>
          <div className="article-faq">
            {eclipseFaq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>

          <div className="article-updated">
            <strong>Revisión editorial y alcance</strong>
            <p>
              Revisado el <time dateTime={updatedDate}>5 de agosto de 2026</time>.
              Astronomía y condiciones locales: IGN y NASA. Climatología y
              predicción: AEMET. Movilidad: DGT. FrescoCerca no calcula la
              franja, no certifica miradores ni gafas y no sustituye las
              indicaciones de protección civil, tráfico, salud o emergencias.
              Los horarios de la tabla son ejemplos oficiales y pueden existir
              pequeñas diferencias entre modelos o coordenadas.
            </p>
          </div>
        </article>

        <aside className="article-sidebar" aria-label="Recursos de la guía">
          <div className="sidebar-card sidebar-cta">
            <span className="sidebar-label">Paso imprescindible</span>
            <h2>Comprueba tu punto exacto.</h2>
            <a
              className="button button-primary"
              href={links.ignLocal}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir visor del IGN ↗
            </a>
          </div>
          <div className="sidebar-card">
            <span className="sidebar-label">Enlaces oficiales</span>
            <a href={links.ignEclipse} target="_blank" rel="noopener noreferrer">
              Horarios y franja · IGN ↗
            </a>
            <a href={links.ignPlanning} target="_blank" rel="noopener noreferrer">
              Planificación · IGN ↗
            </a>
            <a href={links.ignSafety} target="_blank" rel="noopener noreferrer">
              Seguridad ocular · IGN ↗
            </a>
            <a href={links.aemetStudy} target="_blank" rel="noopener noreferrer">
              Estudio de nubosidad · AEMET ↗
            </a>
            <a href={links.aemetForecast} target="_blank" rel="noopener noreferrer">
              Predicción municipal · AEMET ↗
            </a>
            <a href={links.dgtTraffic} target="_blank" rel="noopener noreferrer">
              Estado del tráfico · DGT ↗
            </a>
          </div>
          <div className="sidebar-card">
            <span className="sidebar-label">Ir a una sección</span>
            <a href="#hora-por-ciudad">Hora por ciudad</a>
            <a href="#nubes">Nubes y plan B</a>
            <a href="#seguridad">Gafas y cámaras</a>
            <a href="#perseidas">Perseidas</a>
          </div>
        </aside>
      </div>
    </main>
  );
}
