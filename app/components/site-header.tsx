import Link from "next/link";

const navigation = [
  { href: "/#buscador", label: "Buscador" },
  { href: "/destinos", label: "Destinos" },
  { href: "/desde/madrid", label: "Desde tu ciudad" },
  { href: "/guias", label: "Guías" },
  { href: "/metodologia", label: "Cómo calculamos" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <Link className="brand" href="/" aria-label="FrescoCerca, inicio">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-sun" />
            <span className="brand-moon">◒</span>
          </span>
          <span>FrescoCerca</span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="header-cta" href="/#buscador">
          Buscar aire fresco
        </Link>

        <details className="mobile-menu">
          <summary aria-label="Abrir menú">
            <span />
            <span />
            <span />
          </summary>
          <nav aria-label="Navegación móvil">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
