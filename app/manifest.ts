import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8f4e8",
    theme_color: "#153a43",
    lang: siteConfig.language,
    categories: ["travel", "weather", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Buscar destinos frescos",
        short_name: "Buscar",
        description: "Compara escapadas según origen, trayecto y preferencias.",
        url: "/#buscador",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Explorar destinos",
        short_name: "Destinos",
        description: "Abre el atlas de destinos de FrescoCerca.",
        url: "/destinos",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Escapadas desde tu ciudad",
        short_name: "Desde tu ciudad",
        description: "Consulta las guías organizadas por ciudad de salida.",
        url: "/desde",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
    ],
    prefer_related_applications: false,
  };
}
