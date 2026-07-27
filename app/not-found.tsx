import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página solicitada no existe o ha cambiado de dirección.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main
      id="contenido"
      className="not-found-page mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-5 py-16 sm:px-8"
    >
      <section className="not-found-page__content">
        <p className="not-found-page__code text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
          Error 404
        </p>
        <h1 className="not-found-page__title mt-4 text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-6xl">
          Este camino no lleva a ningún destino
        </h1>
        <p className="not-found-page__description mt-5 max-w-xl text-lg leading-8 text-current/70">
          La página puede haber cambiado de dirección o ya no estar disponible.
          Vuelve al inicio para seguir buscando un lugar más fresco cerca.
        </p>
        <Link
          href="/"
          className="not-found-page__home-link mt-8 inline-flex min-h-11 items-center rounded-full bg-emerald-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
        >
          Volver a {siteConfig.name}
        </Link>
      </section>
    </main>
  );
}
