import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dónde ver el eclipse solar de 2026: horizonte, tiempo y viaje",
  description:
    "Prepara tu escapada para el eclipse total del 12 de agosto de 2026 en España: horizonte oeste, meteorología, seguridad ocular, tráfico y plan B.",
  alternates: { canonical: "/eclipse-2026" },
  openGraph: {
    title: "Dónde ver el eclipse de 2026 y cómo preparar la escapada",
    description:
      "Una guía práctica para elegir lugar, revisar el cielo y viajar con seguridad el 12 de agosto.",
    url: "/eclipse-2026",
  },
};

const checklist = [
  {
    when: "Una semana antes",
    title: "Elige dos zonas, no un único punto",
    text: "Comprueba en el visor del IGN si tendrás totalidad, cuánto durará y hacia qué punto del oeste debes mirar. Guarda una alternativa a una distancia asumible.",
  },
  {
    when: "48 horas antes",
    title: "Compara nubes, no solo temperatura",
    text: "Revisa la predicción oficial y la evolución, no una captura aislada. Las tormentas de verano y las nubes bajas pueden cambiar el mejor lugar.",
  },
  {
    when: "Ese mismo día",
    title: "Llega pronto y evita improvisar",
    text: "Confirma accesos, aparcamiento permitido, agua, cobertura y la ruta de salida. No ocupes caminos de emergencia ni fincas privadas.",
  },
  {
    when: "Durante el eclipse",
    title: "Protege los ojos siempre",
    text: "Usa filtros solares certificados y en perfecto estado. Unas gafas de sol normales no sirven. Sigue las instrucciones del IGN para las fases parciales.",
  },
];

const eclipseFaq = [
  {
    q: "¿Cuándo es el eclipse total de Sol de 2026 en España?",
    a: "Será durante el atardecer del miércoles 12 de agosto de 2026. El horario y la duración exactos dependen del municipio, por lo que deben consultarse en el visor oficial del IGN.",
  },
  {
    q: "¿Se verá total desde toda España?",
    a: "No. La franja de totalidad cruza principalmente la mitad norte y Baleares; desde otras zonas se verá de forma parcial. El visor oficial permite comprobar cada localidad.",
  },
  {
    q: "¿Dónde conviene colocarse?",
    a: "En un lugar autorizado, accesible y con horizonte oeste despejado. Como el Sol estará muy bajo, un edificio, una loma o árboles pueden ocultarlo aunque el municipio esté dentro de la franja.",
  },
  {
    q: "¿Puedo mirar con gafas de sol normales?",
    a: "No. Para la observación directa hacen falta filtros solares adecuados y certificados, usados según las instrucciones de seguridad. Mirar al Sol sin protección puede causar lesiones irreversibles.",
  },
];

export default function Eclipse2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline:
          "Dónde ver el eclipse solar de 2026: horizonte, tiempo y viaje",
        datePublished: "2026-07-27",
        dateModified: "2026-07-27",
        inLanguage: "es-ES",
        author: { "@type": "Organization", name: "FrescoCerca" },
        publisher: { "@type": "Organization", name: "FrescoCerca" },
      },
      {
        "@type": "FAQPage",
        mainEntity: eclipseFaq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <main id="contenido" className="article-page eclipse-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="article-hero eclipse-article-hero">
        <div className="site-shell article-hero-inner">
          <nav className="breadcrumbs" aria-label="Migas de pan">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span>Eclipse 2026</span>
          </nav>
          <p className="eyebrow">Guía práctica · Actualizada el 27/07/2026</p>
          <h1>Dónde ver el eclipse de 2026 sin dejar el viaje al azar.</h1>
          <p className="article-deck">
            El lugar perfecto no es solo el que tiene más segundos de
            totalidad. Necesitas horizonte oeste, una previsión favorable, un
            acceso seguro y una alternativa realista.
          </p>
          <div className="article-meta-row">
            <span>12 de agosto de 2026</span>
            <span>Lectura: 8 min</span>
            <span>Fuentes oficiales enlazadas</span>
          </div>
        </div>
      </header>

      <div className="site-shell article-layout">
        <article className="article-body">
          <aside className="source-callout">
            <strong>Primero, comprueba tu localidad</strong>
            <p>
              El Instituto Geográfico Nacional ofrece el cálculo astronómico,
              la franja de totalidad y las condiciones del relieve para cada
              punto.
            </p>
            <a
              href="https://eclipses.ign.es/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir el visor oficial del IGN ↗
            </a>
          </aside>

          <h2>Por qué el horizonte importa tanto en 2026</h2>
          <p>
            El eclipse ocurrirá cerca de la puesta de Sol. Esto significa que
            estar dentro de la franja de totalidad no basta: el astro puede
            quedar oculto por una loma, árboles, edificios o el propio relieve
            local. El IGN recomienda buscar un horizonte oeste despejado y
            comprobar el lugar con antelación.
          </p>
          <p>
            Antes de reservar, separa dos decisiones. Primero confirma la
            visibilidad astronómica en el mapa oficial. Después valora cómo
            llegarás, dónde podrás colocarte sin invadir espacios restringidos
            y qué alternativa tendrás si aparecen nubes.
          </p>

          <h2>Un plan de viaje en cuatro momentos</h2>
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

          <h2>Cómo leer la meteorología sin engañarte</h2>
          <p>
            Una predicción a muchos días sirve para detectar tendencias, no
            para elegir un aparcamiento concreto. Acorta el radio de búsqueda a
            medida que se acerque la fecha y compara nubosidad baja, media y
            alta, tormentas y visibilidad. La decisión final debe apoyarse en la
            información actualizada de AEMET.
          </p>
          <ul>
            <li>
              Guarda lugares en dos sectores distintos de la franja, no dos
              miradores separados por diez minutos.
            </li>
            <li>
              Considera la hora de regreso: la salida simultánea puede
              concentrar mucho tráfico.
            </li>
            <li>
              No cambies de ubicación a última hora si eso implica conducir con
              prisas o estacionar en un lugar inseguro.
            </li>
          </ul>

          <div className="safety-panel">
            <span className="safety-symbol" aria-hidden="true">
              !
            </span>
            <div>
              <h2>La protección ocular no es opcional</h2>
              <p>
                No mires directamente al Sol con gafas de sol, radiografías,
                cristales ahumados, cámaras, prismáticos o telescopios sin el
                filtro profesional apropiado. Revisa que las gafas específicas
                estén intactas y cumplan la norma indicada por el IGN.
              </p>
              <a
                href="https://eclipses.ign.es/como-observar-eclipses.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Leer las instrucciones oficiales de seguridad ↗
              </a>
            </div>
          </div>

          <h2>Preguntas frecuentes</h2>
          <div className="article-faq">
            {eclipseFaq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>

          <div className="article-updated">
            <strong>Fuentes y alcance</strong>
            <p>
              Información astronómica y de seguridad: Instituto Geográfico
              Nacional. Meteorología: AEMET. FrescoCerca no calcula la franja,
              no vende filtros solares y no sustituye las indicaciones de
              emergencias o tráfico.
            </p>
          </div>
        </article>

        <aside className="article-sidebar">
          <div className="sidebar-card">
            <span className="sidebar-label">Enlaces oficiales</span>
            <a
              href="https://eclipses.ign.es/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visor del eclipse · IGN ↗
            </a>
            <a
              href="https://eclipses.ign.es/recomendaciones-practicas.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Recomendaciones prácticas · IGN ↗
            </a>
            <a
              href="https://www.aemet.es/es/eltiempo/prediccion"
              target="_blank"
              rel="noopener noreferrer"
            >
              Predicción meteorológica · AEMET ↗
            </a>
            <a
              href="https://www.dgt.es/conoce-el-estado-del-trafico/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Estado del tráfico · DGT ↗
            </a>
          </div>
          <div className="sidebar-card sidebar-cta">
            <span className="sidebar-label">Después del eclipse</span>
            <h2>Busca una noche más fresca cerca.</h2>
            <Link className="button button-primary" href="/#buscador">
              Probar el buscador
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
