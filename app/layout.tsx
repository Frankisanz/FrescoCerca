import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  absoluteUrl,
  serializeJsonLd,
  SITE_URL,
  siteConfig,
} from "@/lib/site";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Encuentra pueblos y destinos donde dormir más fresco. Compara clima estival orientativo, distancia y tipo de escapada desde tu ciudad.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#153a43",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  applicationName: siteConfig.name,
  title: {
    default: `${siteConfig.name} — Escapadas para dormir más fresco`,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  authors: [{ name: siteConfig.name, url: SITE_URL.toString() }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "travel",
  alternates: { canonical: "/" },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "FrescoCerca",
    url: "/",
    title: "FrescoCerca — Duerme más fresco. Cerca de casa.",
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "FrescoCerca: de la ciudad calurosa a una escapada fresca en la montaña",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FrescoCerca — Duerme más fresco. Cerca de casa.",
    description,
    images: ["/og.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/og.png"),
      email: siteConfig.legal.email,
    },
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      inLanguage: siteConfig.language,
      description,
      publisher: { "@id": `${absoluteUrl("/")}#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(organizationJsonLd),
          }}
        />
        <a className="skip-link" href="#contenido">
          Saltar al contenido principal
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
