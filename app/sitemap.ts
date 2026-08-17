import type { MetadataRoute } from "next";
import { fromCities, guides } from "@/lib/content";
import { CLIMATE_METHODOLOGY, destinations } from "@/lib/destinations";
import { absoluteUrl, EDITORIAL_REVIEW_DATE } from "@/lib/site";

const MANUAL_CONTENT_DATES = {
  coreEditorial: EDITORIAL_REVIEW_DATE,
  about: EDITORIAL_REVIEW_DATE,
} as const;

function latestIsoDate(values: readonly string[]) {
  return values.reduce((latest, value) => (value > latest ? value : latest));
}

function toLastModified(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}

const latestGuideUpdate = latestIsoDate(
  guides.map((guide) => guide.updated),
);
const latestSiteUpdate = latestIsoDate([
  MANUAL_CONTENT_DATES.coreEditorial,
  CLIMATE_METHODOLOGY.revisado,
  latestGuideUpdate,
]);

const staticRoutes = [
  {
    path: "/",
    lastModified: latestSiteUpdate,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/metodologia",
    lastModified: EDITORIAL_REVIEW_DATE,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/sobre-frescocerca",
    lastModified: MANUAL_CONTENT_DATES.about,
    changeFrequency: "monthly",
    priority: 0.5,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const destinationLastModified = toLastModified(EDITORIAL_REVIEW_DATE);
  const editorialLastModified = toLastModified(
    MANUAL_CONTENT_DATES.coreEditorial,
  );
  const destinationRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/destinos"),
      lastModified: destinationLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...destinations.map((destination) => ({
      url: absoluteUrl(`/destinos/${destination.slug}`),
      lastModified: destinationLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
  const editorialRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/desde"),
      lastModified: editorialLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...fromCities.map((city) => ({
      url: absoluteUrl(`/desde/${city.slug}`),
      lastModified: editorialLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: absoluteUrl("/guias"),
      lastModified: toLastModified(latestGuideUpdate),
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
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: toLastModified(route.lastModified),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...destinationRoutes,
    ...editorialRoutes,
  ];
}
