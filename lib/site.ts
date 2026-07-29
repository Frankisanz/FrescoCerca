import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://frescocerca.es";

function resolveSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  try {
    const url = new URL(configuredUrl || DEFAULT_SITE_URL);
    url.hash = "";
    url.search = "";
    url.pathname = url.pathname.replace(/\/+$/, "") || "/";
    return url;
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

export const SITE_URL = resolveSiteUrl();

export const siteConfig = {
  name: "FrescoCerca",
  shortName: "FrescoCerca",
  description:
    "Descubre destinos cercanos con temperaturas más suaves mediante datos orientativos y comparaciones transparentes.",
  locale: "es_ES",
  language: "es-ES",
  url: SITE_URL,
  legal: {
    owner: "Francisco Javier Sanchez Fuentes",
    nif: "15514272J",
    address: "Calle Andalucía nº 5, 1º D, Úbeda (Jaén)",
    email: "Amargued@gmail.com",
  },
} as const;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  noIndex?: boolean;
};

export function absoluteUrl(path: string = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}

export function createWebPageJsonLd({
  title,
  description,
  path,
  type = "WebPage",
}: {
  title: string;
  description: string;
  path: `/${string}` | "/";
  type?: "AboutPage" | "ContactPage" | "WebPage";
}) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description,
    url,
    inLanguage: siteConfig.language,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    dateModified: "2026-07-29",
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
