import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://frescocerca.es";

export const EDITORIAL_IMAGE_PATH =
  "/images/frescocerca-refugio-editorial-og.jpg";
export const EDITORIAL_PUBLISHED_DATE = "2026-07-27";
export const EDITORIAL_REVIEW_DATE = "2026-08-17";

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
  editorial: {
    responsible: "Francisco Javier Sanchez Fuentes",
    profilePath: "/sobre-frescocerca",
    methodologyPath: "/metodologia",
  },
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

type ArticleMetadataOptions = Omit<PageMetadataOptions, "noIndex"> & {
  publishedTime?: string;
  modifiedTime?: string;
  image?: EditorialImage | null;
};

type EditorialImage = {
  path: string;
  alt: string;
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
      images: [
        {
          url: absoluteUrl("/og.png"),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name}: escapadas para dormir más fresco`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/og.png")],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}

export function createArticleMetadata({
  title,
  description,
  path,
  publishedTime = EDITORIAL_PUBLISHED_DATE,
  modifiedTime = EDITORIAL_REVIEW_DATE,
  image = null,
}: ArticleMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = image ? absoluteUrl(image.path) : null;
  const authorUrl = absoluteUrl(siteConfig.editorial.profilePath);

  return {
    title,
    description,
    authors: [
      {
        name: siteConfig.editorial.responsible,
        url: authorUrl,
      },
    ],
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      publishedTime,
      modifiedTime,
      authors: [authorUrl],
      images: image
        ? [
            {
              url: absoluteUrl(image.path),
              width: 1200,
              height: 630,
              alt: image.alt,
            },
          ]
        : [],
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export function createArticleJsonLd({
  title,
  description,
  path,
  citations = [],
  articleSection,
  publishedTime = EDITORIAL_PUBLISHED_DATE,
  modifiedTime = EDITORIAL_REVIEW_DATE,
  image = null,
}: {
  title: string;
  description: string;
  path: `/${string}` | "/";
  citations?: readonly string[];
  articleSection?: string;
  publishedTime?: string;
  modifiedTime?: string;
  image?: EditorialImage | null;
}) {
  const url = absoluteUrl(path);
  const author = {
    "@type": "Person",
    "@id": `${absoluteUrl(siteConfig.editorial.profilePath)}#responsable-editorial`,
    name: siteConfig.editorial.responsible,
    url: absoluteUrl(siteConfig.editorial.profilePath),
  };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: image
      ? {
          "@type": "ImageObject",
          url: absoluteUrl(image.path),
          width: 1200,
          height: 630,
          caption: image.alt,
        }
      : undefined,
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author,
    editor: author,
    publisher: {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icons/icon-512.png"),
        width: 512,
        height: 512,
      },
    },
    articleSection,
    citation: citations.length > 0 ? [...citations] : undefined,
  };
}

export function createWebPageJsonLd({
  title,
  description,
  path,
  type = "WebPage",
  modifiedTime = EDITORIAL_REVIEW_DATE,
}: {
  title: string;
  description: string;
  path: `/${string}` | "/";
  type?: "AboutPage" | "ContactPage" | "WebPage";
  modifiedTime?: string;
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
    dateModified: modifiedTime,
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
