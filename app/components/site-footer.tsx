import Link from "next/link";

const explore = [
  { href: "/destinos", label: "Todos los destinos" },
  { href: "/guias", label: "Guías para viajar fresco" },
  { href: "/desde", label: "Escapadas desde tu ciudad" },
  { href: "/desde/sevilla", label: "Escapadas desde Sevilla" },
];

const trust = [
  { href: "/metodologia", label: "Metodología" },
  { href: "/sobre-frescocerca", label: "Sobre FrescoCerca" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/cookies", label: "Cookies" },
  { href: "/aviso-legal", label: "Aviso legal" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <div className="footer-brand">
          <Link className="brand brand-footer" href="/">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-sun" />
              <span className="brand-moon">◒</span>
            </span>
            <span>FrescoCerca</span>
          </Link>
          <p>
            Ideas cercanas para dormir más fresco, con datos explicados y
            decisiones sencillas.
          </p>
          <p className="footer-note">
            Consulta siempre la predicción y los avisos oficiales antes de
            viajar.
          </p>
        </div>
        <div>
          <h2>Explora</h2>
          <ul>
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Transparencia</h2>
          <ul>
            {trust.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="site-shell footer-bottom">
        <span>© {new Date().getFullYear()} FrescoCerca</span>
        <span>Hecho en Úbeda para viajar con cabeza.</span>
      </div>
    </footer>
  );
}
