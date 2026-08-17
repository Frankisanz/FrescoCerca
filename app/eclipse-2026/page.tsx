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

const title = "Archivo del eclipse solar total de 2026 en España";
const description =
  "Archivo editorial del eclipse total celebrado en España el 12 de agosto de 2026, con horarios, fuentes oficiales y recomendaciones publicadas antes del evento.";
const path = "/eclipse-2026" as const;
const updatedDate = "2026-08-17";

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

export const metadata: Metadata = {
  ...createArticleMetadata({
    title,
    description,
    path,
    modifiedTime: updatedDate,
  }),
  robots: {
    index: false,
    follow: true,
  },
};

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
    when: "Preparación inicial",
    title: "Comprobar el punto exacto, no solo la provincia",
    text: "La guía recomendaba introducir el municipio o la ubicación en el visualizador del IGN y anotar inicio, máximo, totalidad, altura y azimut del Sol. Madrid y Barcelona, por ejemplo, tuvieron un eclipse parcial aunque la cobertura rondara el 99 % en los datos de NASA.",
  },
  {
    when: "De 7 a 3 días antes",
    title: "Mantener dos zonas con meteorología distinta",
    text: "Se aconsejaba comparar la predicción oficial y conservar una alternativa razonable, sin emprender una persecución de nubes que obligara a conducir con prisas o a cruzar media España.",
  },
  {
    when: "El día anterior",
    title: "Revisar el horizonte y el acceso",
    text: "La comprobación previa incluía obstáculos hacia el oeste, aparcamiento autorizado, transporte público, agua, cobertura, avisos y una salida que no bloqueara caminos de emergencia.",
  },
  {
    when: "El 12 de agosto",
    title: "Llegar con margen y proteger los ojos",
    text: "Durante el evento era imprescindible seguir las indicaciones de tráfico y protección civil, utilizar protección adecuada en las fases parciales y supervisar continuamente a los menores.",
  },
] as const;

export default function Eclipse2026Page() {
  const articleJsonLd = createArticleJsonLd({
    title,
    description,
    path,
    articleSection: "Archivo del eclipse solar de 2026",
    citations: officialSources,
    modifiedTime: updatedDate,
  });
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Archivo del eclipse solar 2026", path },
  ]);
  return (
    <main id="contenido" className="article-page eclipse-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([articleJsonLd, breadcrumbSchema]),
        }}
      />

      <header className="article-hero eclipse-article-hero">
        <div className="site-shell article-hero-inner">
          <nav className="breadcrumbs" aria-label="Migas de pan">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Archivo del eclipse 2026</span>
          </nav>
          <p className="eyebrow">
            Archivo histórico · Archivado el{" "}
            <time dateTime={updatedDate}>17/08/2026</time>
          </p>
          <h1>
            Archivo del eclipse solar total celebrado el 12 de agosto de 2026
            en España.
          </h1>
          <p className="article-deck">
            Esta página conserva las fuentes, horarios y recomendaciones que se
            publicaron antes del evento. Ya no es una guía de planificación ni
            una fuente de información en directo.
          </p>
          <div className="article-meta-row">
            <span>Evento celebrado</span>
            <span>Archivo editorial</span>
            <span>IGN · AEMET · DGT · NASA</span>
          </div>
          <EditorialByline
            reviewedOn="17 de agosto de 2026"
            sourceSummary="Archivo de la guía previa al evento: horarios y franja contrastados con IGN y NASA; nubosidad con AEMET; seguridad con el IGN y movilidad con la DGT."
          />
        </div>
      </header>

      <div className="site-shell">
        <EditorialHeroImage
          caption="Durante el eclipse de 2026 el Sol estuvo muy bajo y la línea de visión hacia el oeste fue una condición esencial."
        />
      </div>

      <div className="site-shell article-layout">
        <article className="article-body">
          <section className="eclipse-answer" aria-labelledby="respuesta-rapida">
            <p className="eyebrow">Aviso de archivo</p>
            <h2 id="respuesta-rapida">
              El eclipse de 2026 ya se celebró
            </h2>
            <p>
              El eclipse solar del <strong>miércoles 12 de agosto de 2026</strong>{" "}
              se produjo al atardecer. Fue <strong>total</strong> dentro de una
              franja que cruzó buena parte de la mitad norte de oeste a este y
              alcanzó Baleares; fuera de ella fue parcial. Esta página se
              conserva como archivo editorial de la información disponible
              antes del evento.
            </p>
            <p>
              Los horarios, predicciones y medidas de tráfico que aparecen a
              continuación son históricos. Para otros eclipses y futuras
              observaciones consulta siempre la información vigente del{" "}
              <a href={links.ignLocal} target="_blank" rel="noopener noreferrer">
                Instituto Geográfico Nacional (IGN)
              </a>
              . No reutilices esta planificación para una fecha distinta.
            </p>
            <a
              className="button button-primary"
              href={links.ignLocal}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar documentación del IGN ↗
            </a>
          </section>

          <div className="eclipse-facts" role="list" aria-label="Datos esenciales">
            <div role="listitem">
              <strong>12 agosto 2026</strong>
              <span>Evento ya celebrado</span>
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
            </ol>
          </nav>

          <h2 id="hora-por-ciudad">
            ¿A qué hora fue el eclipse de 2026 en Madrid, Barcelona, Valencia,
            Zaragoza y otras ciudades?
          </h2>
          <p>
            No hubo una única hora válida para toda España. Esta tabla conserva
            ejemplos publicados por el IGN y NASA en <strong>hora local</strong>.
            Los horarios están redondeados al minuto y documentan la guía
            previa; no son datos para planificar un evento futuro.
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
            ¿Dónde se vio total y qué diferencia hubo con un eclipse parcial
            del 99 %?
          </h2>
          <p>
            El IGN situó la totalidad en casi toda la mitad norte peninsular y
            citó capitales como A Coruña, Oviedo, León, Bilbao, Zaragoza,
            València y Palma. En la mitad sur se observó de forma parcial.
            Cerca del borde, unos pocos kilómetros separaron una totalidad
            breve de una cobertura muy alta pero todavía parcial.
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
            Cómo se planteó la elección del lugar de observación
          </h2>
          <p>
            La guía previa evitó proclamar un mirador ganador y comparó cinco
            criterios: totalidad, horizonte, nubes, acceso y salida. El propio
            IGN señaló que ganar unos segundos cerca del eje no compensaba el
            tráfico o la falta de espacio.
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
                València y Palma estuvieron entre los ejemplos de totalidad,
                pero el Sol quedó extremadamente bajo: el IGN calculó unos 2°
                en Palma durante el máximo. Un edificio o una loma lejana podía
                impedir la observación.
              </p>
            </section>
            <section>
              <span>Mitad sur</span>
              <h3>Más despejado históricamente, pero eclipse parcial</h3>
              <p>
                AEMET encontró mayor frecuencia histórica de cielos despejados
                en el sur, pero el IGN indicó que allí el eclipse de 2026 sería
                parcial. La guía previa planteó elegir entre la totalidad y una
                observación cercana y segura.
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
            Qué información meteorológica se consultó antes del evento
          </h2>
          <p>
            Hay que separar <strong>climatología</strong> y{" "}
            <strong>predicción</strong>. El{" "}
            <a href={links.aemetStudy} target="_blank" rel="noopener noreferrer">
              estudio de nubosidad de AEMET
            </a>{" "}
            cuenta con el historial 2010–2025 para fechas y horas semejantes:
            ayudó a elegir zonas candidatas, pero no permitía asegurar dónde
            estaría despejado el día del eclipse. La predicción municipal y el
            detalle horario se consultaron de nuevo al acercarse el evento.
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
            Tráfico, aparcamiento y pernocta: cómo se preparó el viaje
          </h2>
          <p>
            La{" "}
            <a href={links.dgtMeasures} target="_blank" rel="noopener noreferrer">
              DGT previó medidas especiales
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
            El eclipse y las Perseidas coincidieron la misma noche
          </h2>
          <p>
            La noche del 12 al 13 de agosto reunió los dos fenómenos. El IGN
            situó el máximo de las Perseidas entre las{" "}
            <strong>04:00 y las 06:00</strong> del día 13, con actividad intensa
            desde aproximadamente las 23:00 del día 12. La Luna nueva ofreció
            una condición favorable donde el cielo estuvo despejado.
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

          <h2>Guías que acompañaron la planificación desde cada ciudad</h2>
          <p>
            Estas páginas ayudaron a comparar distancias, descanso y
            alternativas de viaje. No certificaron la visibilidad del eclipse;
            la comprobación final correspondía al visualizador del IGN.
          </p>
          <div className="eclipse-city-links">
            <Link href="/desde/madrid">Desde Madrid</Link>
            <Link href="/desde/barcelona">Desde Barcelona</Link>
            <Link href="/desde/valencia">Desde Valencia</Link>
            <Link href="/desde/zaragoza">Desde Zaragoza</Link>
            <Link href="/desde/bilbao">Desde Bilbao</Link>
            <Link href="/desde/valladolid">Desde Valladolid</Link>
          </div>

          <div className="article-updated">
            <strong>Archivo editorial y alcance</strong>
            <p>
              Archivado el <time dateTime={updatedDate}>17 de agosto de 2026</time>.
              El evento ya se celebró y esta página no se mantiene como guía de
              planificación. Astronomía y condiciones locales: IGN y NASA.
              Climatología: AEMET. Movilidad: DGT. Los horarios de la tabla son
              ejemplos oficiales conservados como referencia histórica.
            </p>
          </div>
        </article>

        <aside className="article-sidebar" aria-label="Recursos de la guía">
          <div className="sidebar-card sidebar-cta">
            <span className="sidebar-label">Archivo oficial</span>
            <h2>Consulta la documentación del evento.</h2>
            <a
              className="button button-primary"
              href={links.ignLocal}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir documentación del IGN ↗
            </a>
          </div>
          <div className="sidebar-card">
            <span className="sidebar-label">Fuentes del archivo</span>
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
