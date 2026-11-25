import type { Metadata } from "next";
import Link from "next/link";
import { EditorialByline } from "@/app/components/editorial-byline";
import { breadcrumbJsonLd } from "@/lib/content";
import {
  createArticleJsonLd,
  createArticleMetadata,
  serializeJsonLd,
} from "@/lib/site";

const title = "Eclipse total de Sol del 2 de agosto de 2027 en España";
const description =
  "Dónde será total el eclipse del 2 de agosto de 2027 (Cádiz, Málaga, Ceuta y Melilla), a qué hora, cuánto dura la totalidad según el IGN y cómo planificar el viaje y el calor de agosto.";
const path = "/eclipse-2027" as const;
const updatedDate = "2026-11-25";

const links = {
  ignEclipse:
    "https://astronomia.ign.es/es/eclipses-de-sol-y-luna/eclipse-total-sol-de-2-de-agosto-2027",
  ignPortal: "https://eclipses.ign.es/home.html",
  ignPrecautions: "https://astronomia.ign.es/web/guest/eclipses-de-sol#preca",
  ignGlasses:
    "https://eclipses.ign.es/src/img/eclipses/como-observar-eclipses/calidad_gafas_eclipse_CNE.pdf",
  esaMap:
    "https://www.esa.int/ESA_Multimedia/Images/2026/05/Total_solar_eclipse_2_August_2027_Map_of_totality_in_Spain",
  aemetForecast: "https://www.aemet.es/es/eltiempo/prediccion/municipios",
  aemetWarnings: "https://www.aemet.es/es/eltiempo/prediccion/avisos",
  healthHeat:
    "https://www.sanidad.gob.es/areas/sanidadAmbiental/riesgosAmbientales/calorExtremo/home.htm",
} as const;

const officialSources = Object.values(links);

export const metadata: Metadata = createArticleMetadata({
  title,
  description,
  path,
  modifiedTime: updatedDate,
});

const ignTimes = [
  {
    place: "Ceuta",
    start: "10:45",
    detail: "Totalidad de 10:45 a 10:50",
    duration: "4 min 48 s",
    note: "Máxima duración en territorio español",
  },
  {
    place: "Melilla",
    start: "10:48",
    detail: "Comienzo de la totalidad",
    duration: "4 min 34 s",
    note: "",
  },
  {
    place: "Cádiz",
    start: "10:45",
    detail: "Comienzo de la totalidad",
    duration: "2 min 54 s",
    note: "",
  },
  {
    place: "Málaga",
    start: "10:48",
    detail: "Comienzo de la totalidad",
    duration: "1 min 48 s",
    note: "Cerca del borde de la franja",
  },
] as const;

const faqs = [
  {
    question: "¿Dónde se verá total el eclipse de 2027 en España?",
    answer:
      "Según el IGN, la franja de totalidad cruza el estrecho de Gibraltar y cubre Ceuta, Melilla, casi toda la provincia de Cádiz, parte de la de Málaga y las zonas más meridionales de Granada y Almería. En el resto de España será parcial.",
  },
  {
    question: "¿A qué hora es el eclipse del 2 de agosto de 2027?",
    answer:
      "Por la mañana. El IGN sitúa el eclipse en torno a las 10:50, hora peninsular, y la totalidad en el sur entre aproximadamente las 10:45 y las 10:50, según el punto. La hora exacta de tu municipio está en las tablas del IGN.",
  },
  {
    question: "¿Cuánto durará la totalidad?",
    answer:
      "Depende de lo cerca que estés del centro de la franja. El IGN da 4 min 48 s en Ceuta, 4 min 34 s en Melilla, 2 min 54 s en Cádiz y 1 min 48 s en Málaga. El máximo mundial, 6 min 23 s, será en Egipto.",
  },
  {
    question: "¿Se verá en Madrid, Sevilla o Barcelona?",
    answer:
      "Sí, pero como eclipse parcial. El IGN indica que en cualquier punto de España, de norte a Canarias, la Luna tapará al menos un 70 % del Sol. Un eclipse parcial, aunque sea muy alto, exige protección ocular todo el tiempo.",
  },
  {
    question: "¿Hace falta reservar alojamiento ya?",
    answer:
      "Es una fecha de plena temporada en la costa de Cádiz y Málaga, a la que se sumará la demanda del eclipse. Si quieres dormir dentro o cerca de la franja, conviene reservar pronto y con cancelación flexible, y confirmar en el IGN que el municipio está dentro de la totalidad.",
  },
] as const;

export default function Eclipse2027Page() {
  const articleJsonLd = createArticleJsonLd({
    title,
    description,
    path,
    articleSection: "Eclipse solar de 2027",
    citations: officialSources,
    modifiedTime: updatedDate,
  });
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Eclipse solar 2027", path },
  ]);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return (
    <main id="contenido" className="article-page eclipse-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([articleJsonLd, breadcrumbSchema, faqSchema]),
        }}
      />

      <header className="article-hero eclipse-article-hero">
        <div className="site-shell article-hero-inner">
          <nav className="breadcrumbs" aria-label="Migas de pan">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Eclipse 2027</span>
          </nav>
          <p className="eyebrow">
            Guía de planificación · Actualizada el{" "}
            <time dateTime={updatedDate}>25/11/2026</time>
          </p>
          <h1>Eclipse total de Sol del 2 de agosto de 2027: dónde y cuándo verlo en España</h1>
          <p className="article-deck">
            Un año después del eclipse de 2026, la Luna vuelve a tapar el Sol
            por completo en España, esta vez por la mañana y en el extremo sur:
            Cádiz, parte de Málaga, Ceuta y Melilla. Datos del IGN y pautas para
            preparar el viaje en pleno agosto.
          </p>
          <div className="article-meta-row">
            <span>Lunes 2 de agosto de 2027</span>
            <span>Hacia las 10:45–10:50</span>
            <span>Fuentes: IGN · ESA · AEMET</span>
          </div>
          <EditorialByline
            reviewedOn="25 de noviembre de 2026"
            sourceSummary="Franja, horarios y duraciones contrastados con la página oficial del IGN para el eclipse de 2027; mapa de la ESA elaborado con datos del IGN; predicción y avisos con AEMET."
          />
        </div>
      </header>

      <div className="site-shell article-layout">
        <article className="article-body">
          <section className="eclipse-answer" aria-labelledby="respuesta-rapida">
            <p className="eyebrow">Respuesta rápida</p>
            <h2 id="respuesta-rapida">Total en el sur, parcial en el resto</h2>
            <p>
              El eclipse del <strong>lunes 2 de agosto de 2027</strong> será{" "}
              <strong>total</strong> en una franja que cruza el estrecho de
              Gibraltar: Ceuta, Melilla, casi toda la provincia de Cádiz, parte
              de la de Málaga y el extremo sur de Granada y Almería. Ocurrirá{" "}
              <strong>por la mañana</strong>, en torno a las 10:50 hora
              peninsular según el IGN, con el Sol alto. En el resto de España
              será parcial, con al menos un 70 % del Sol cubierto.
            </p>
            <a
              className="button button-primary"
              href={links.ignEclipse}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver la página oficial del IGN ↗
            </a>
          </section>

          <div className="eclipse-facts" role="list" aria-label="Datos esenciales">
            <div role="listitem">
              <strong>2 agosto 2027</strong>
              <span>Lunes, por la mañana</span>
            </div>
            <div role="listitem">
              <strong>4 min 48 s</strong>
              <span>Totalidad en Ceuta (IGN)</span>
            </div>
            <div role="listitem">
              <strong>≥ 70 %</strong>
              <span>Cobertura mínima en toda España</span>
            </div>
            <div role="listitem">
              <strong>ISO 12312-2</strong>
              <span>Protección ocular adecuada</span>
            </div>
          </div>

          <nav className="article-toc" aria-label="Contenido de la guía">
            <strong>En esta guía</strong>
            <ol>
              <li><a href="#donde">Dónde será total</a></li>
              <li><a href="#horarios">Horarios y duración</a></li>
              <li><a href="#diferencias">Qué cambia respecto a 2026</a></li>
              <li><a href="#viaje">Viaje, alojamiento y calor</a></li>
              <li><a href="#seguridad">Gafas y cámaras</a></li>
              <li><a href="#preguntas">Preguntas frecuentes</a></li>
            </ol>
          </nav>

          <h2 id="donde">¿Dónde se verá total el eclipse de 2027?</h2>
          <p>
            La sombra de la Luna entra por el Atlántico, cruza el norte de
            África y el estrecho de Gibraltar y sigue hacia Egipto, donde la
            totalidad alcanzará su máximo: <strong>6 min 23 s</strong>, uno de
            los eclipses totales más largos del siglo según el IGN. En España,
            la franja de totalidad cubre:
          </p>
          <ul className="article-checklist">
            <li><strong>Ceuta y Melilla</strong>, las dos con más de cuatro minutos y medio.</li>
            <li><strong>Casi toda la provincia de Cádiz</strong>, incluida la capital.</li>
            <li><strong>Parte de la provincia de Málaga</strong>; la capital queda cerca del borde.</li>
            <li><strong>Las zonas más meridionales de Granada y Almería.</strong></li>
          </ul>
          <aside className="source-callout">
            <strong>La provincia no basta</strong>
            <p>
              Cerca del límite de la franja, unos kilómetros separan una
              totalidad breve de un eclipse parcial muy alto. Antes de reservar,
              busca tu municipio en las tablas del IGN o en su portal de
              eclipses. El{" "}
              <a href={links.esaMap} target="_blank" rel="noopener noreferrer">
                mapa de la ESA
              </a>
              , elaborado con cálculos del Observatorio Astronómico Nacional,
              ayuda a ver de un vistazo el trazado.
            </p>
            <a href={links.ignPortal} target="_blank" rel="noopener noreferrer">
              Portal de eclipses del IGN ↗
            </a>
          </aside>

          <h2 id="horarios">Horarios y duración de la totalidad</h2>
          <p>
            Estos son los valores que publica el IGN para las localidades de
            la franja que aparecen en su página, en <strong>hora peninsular</strong>.
            Otras fuentes internacionales dan cifras que varían algunos
            segundos según el modelo; para planificar, usa la del IGN de tu
            municipio.
          </p>
          <div
            className="eclipse-table-wrap"
            role="region"
            aria-label="Horarios por localidad; tabla desplazable horizontalmente"
            tabIndex={0}
          >
            <table className="eclipse-table">
              <caption>
                Totalidad del eclipse solar del 2 de agosto de 2027 en
                localidades españolas, según el IGN
              </caption>
              <thead>
                <tr>
                  <th scope="col">Localidad</th>
                  <th scope="col">Inicio de la totalidad</th>
                  <th scope="col">Duración</th>
                  <th scope="col">Dato útil</th>
                </tr>
              </thead>
              <tbody>
                {ignTimes.map((row) => (
                  <tr key={row.place}>
                    <th scope="row">{row.place}</th>
                    <td>{row.start}</td>
                    <td>{row.duration}</td>
                    <td>{row.note || row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="eclipse-table-note">
            Fuente:{" "}
            <a href={links.ignEclipse} target="_blank" rel="noopener noreferrer">
              IGN, eclipse total de Sol del 2 de agosto de 2027
            </a>
            . Las fases parciales empiezan y terminan alrededor de una hora
            antes y después de la totalidad; consulta los contactos exactos de
            tu punto en el IGN.
          </p>

          <h2 id="diferencias">Qué cambia respecto al eclipse de 2026</h2>
          <div className="eclipse-compare">
            <section>
              <span>2026</span>
              <h3>Al atardecer y en el norte</h3>
              <p>
                El eclipse del 12 de agosto de 2026 fue total en la mitad norte
                y Baleares, con el Sol muy bajo sobre el horizonte oeste. Un
                edificio o una loma podían arruinar la observación. Lo
                conservamos en el{" "}
                <Link href="/eclipse-2026">archivo del eclipse de 2026</Link>.
              </p>
            </section>
            <section>
              <span>2027</span>
              <h3>Por la mañana y en el sur</h3>
              <p>
                En 2027 el Sol estará alto a media mañana, así que el horizonte
                deja de ser el problema principal. A cambio, la franja es
                estrecha y queda en una de las zonas con más demanda turística
                de agosto, y la espera se hace al sol.
              </p>
            </section>
          </div>

          <h2 id="viaje">Viaje, alojamiento y calor: cómo prepararlo</h2>
          <p>
            Para FrescoCerca, que se dedica a buscar noches de verano más
            llevaderas, este eclipse tiene una particularidad: cae a principios
            de agosto en el sur. No damos por hecho qué tiempo hará ese día, pero
            sí conviene preparar el viaje pensando en el calor y en la
            afluencia.
          </p>
          <div className="timeline-list">
            <section>
              <span>01</span>
              <div>
                <small>Con meses de antelación</small>
                <h3>Confirma el municipio y reserva con cancelación</h3>
                <p>
                  Comprueba en el IGN que el lugar donde vas a dormir o a
                  observar está dentro de la totalidad, y prioriza tarifas
                  flexibles. Si te alojas fuera de la franja, calcula el
                  trayecto de la mañana con mucho margen.
                </p>
              </div>
            </section>
            <section>
              <span>02</span>
              <div>
                <small>Elige el punto de observación</small>
                <h3>Sombra cerca, espacio autorizado y salida fácil</h3>
                <p>
                  La observación dura poco, pero la llegada y la espera no. Busca
                  un lugar con sombra próxima, agua, aseos y aparcamiento
                  autorizado. No bloquees cunetas, caminos ni accesos de
                  emergencia.
                </p>
              </div>
            </section>
            <section>
              <span>03</span>
              <div>
                <small>De 7 a 1 días antes</small>
                <h3>Mira la predicción y los avisos de AEMET</h3>
                <p>
                  Revisa nubosidad, viento y temperatura por municipios y los
                  avisos por calor. Ten un segundo punto dentro de la franja por
                  si el primero amanece cubierto, sin plantear persecuciones de
                  cientos de kilómetros.
                </p>
              </div>
            </section>
            <section>
              <span>04</span>
              <div>
                <small>El 2 de agosto</small>
                <h3>Llega pronto y protégete del sol, no solo los ojos</h3>
                <p>
                  Gorra, crema, agua y ropa clara. Vigila a niños y mayores, que
                  toleran peor el calor, y evita esperar horas al sol directo. Al
                  terminar, no salgas todos a la vez: deja que baje el tráfico.
                </p>
              </div>
            </section>
          </div>
          <p>
            Si después del eclipse quieres alargar la escapada con noches más
            frescas, mira nuestro catálogo de{" "}
            <Link href="/destinos">destinos con noches de verano más suaves</Link>{" "}
            o la{" "}
            <Link href="/guias/donde-hace-menos-calor-en-espana">
              guía de dónde hace menos calor en España
            </Link>
            . Recuerda que la mayoría quedan fuera de la franja de totalidad.
          </p>
          <a href={links.aemetForecast} target="_blank" rel="noopener noreferrer">
            Predicción por municipios de AEMET ↗
          </a>

          <div id="seguridad" className="safety-panel">
            <span className="safety-symbol" aria-hidden="true">!</span>
            <div>
              <h2>Gafas de eclipse: la protección ocular no es opcional</h2>
              <p>
                Mirar el Sol sin protección puede dañar la retina de forma
                permanente, sin dolor en el momento. Para la observación
                directa usa gafas con referencia <strong>EN ISO 12312-2</strong>,
                marcado CE y fabricante identificable, y descarta cualquier
                filtro rayado, doblado o perforado. No sirven gafas de sol,
                radiografías ni cristales ahumados.
              </p>
              <p>
                Solo durante la <strong>totalidad real</strong>, dentro de la
                franja, puede mirarse sin filtro; en cuanto reaparece el primer
                punto de Sol, las gafas vuelven a ser obligatorias. Fuera de la
                franja, aunque la cobertura sea muy alta, se llevan puestas
                todo el tiempo. Para cámaras, prismáticos o telescopios hace
                falta un filtro solar específico <strong>delante del
                objetivo</strong>.
              </p>
              <a href={links.ignGlasses} target="_blank" rel="noopener noreferrer">
                Requisitos para unas gafas seguras (PDF del IGN) ↗
              </a>
            </div>
          </div>

          <h2 id="preguntas">Preguntas frecuentes</h2>
          {faqs.map((faq) => (
            <section key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </section>
          ))}

          <div className="article-updated">
            <strong>Fuentes y alcance</strong>
            <p>
              Revisado el <time dateTime={updatedDate}>25 de noviembre de 2026</time>.
              Franja, horarios y duraciones: IGN. Mapa: ESA con datos del IGN.
              Tiempo y avisos: AEMET. Actualizaremos esta guía cuando el IGN y
              las administraciones publiquen recomendaciones de movilidad para
              2027. No es información en directo.
            </p>
          </div>
        </article>

        <aside className="article-sidebar" aria-label="Recursos de la guía">
          <div className="sidebar-card sidebar-cta">
            <span className="sidebar-label">Comprueba tu punto</span>
            <h2>¿Tu municipio está en la franja?</h2>
            <a
              className="button button-primary"
              href={links.ignEclipse}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tablas del IGN ↗
            </a>
          </div>
          <div className="sidebar-card">
            <span className="sidebar-label">Fuentes oficiales</span>
            <a href={links.ignEclipse} target="_blank" rel="noopener noreferrer">
              Franja y horarios · IGN ↗
            </a>
            <a href={links.ignPrecautions} target="_blank" rel="noopener noreferrer">
              Precauciones · IGN ↗
            </a>
            <a href={links.esaMap} target="_blank" rel="noopener noreferrer">
              Mapa de la totalidad · ESA ↗
            </a>
            <a href={links.aemetWarnings} target="_blank" rel="noopener noreferrer">
              Avisos · AEMET ↗
            </a>
            <a href={links.healthHeat} target="_blank" rel="noopener noreferrer">
              Calor extremo · Ministerio de Sanidad ↗
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}
