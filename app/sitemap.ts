import type { MetadataRoute } from "next";
import { fromCities, guides } from "@/lib/content";
import { destinations } from "@/lib/destinations";
import { absoluteUrl } from "@/lib/site";

const staticRoutes = [
  "/",
  "/eclipse-2026",
  "/metodologia",
  "/sobre-frescocerca",
  "/aviso-legal",
  "/privacidad",
  "/cookies",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-29T00:00:00+02:00");
  const destinationRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/destinos"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...destinations.map((destination) => ({
      url: absoluteUrl(`/destinos/${destination.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
  const editorialRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/desde"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...fromCities.map((city) => ({
      url: absoluteUrl(`/desde/${city.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: absoluteUrl("/guias"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...guides.map((guide) => ({
      url: absoluteUrl(`/guias/${guide.slug}`),
      lastModified: new Date(`${guide.updated}T00:00:00+02:00`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency:
        path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority:
        path === "/"
          ? 1
          : path === "/eclipse-2026"
            ? 0.9
            : path === "/metodologia"
              ? 0.7
              : 0.5,
    })),
    ...destinationRoutes,
    ...editorialRoutes,
  ];
}
