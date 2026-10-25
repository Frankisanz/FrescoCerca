import { editorialDestinations, fromCities, guides } from "@/lib/content";
import { getDestinationEditorial } from "@/lib/destination-editorial";
import { CLIMATE_METHODOLOGY } from "@/lib/destinations";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

// Índice para asistentes de IA (llmstxt.org): qué es el sitio, cómo citarlo y dónde
// está cada ficha. Se genera desde los mismos datos que las páginas.
export function GET() {
  const destinationLines = editorialDestinations.map((destination) => {
    const editorial = getDestinationEditorial(destination.slug);
    const [lowFrom, lowTo] = destination.summerLowRange;
    return `- [${editorial?.seoTitle ?? destination.name}](${absoluteUrl(`/destinos/${destination.slug}`)}): ${destination.province}, ${destination.altitude} m; mínimas orientativas de julio y agosto ${lowFrom}–${lowTo} °C.`;
  });
  const cityLines = fromCities.map(
    (city) =>
      `- [${city.title}](${absoluteUrl(`/desde/${city.slug}`)}): ${city.description}`,
  );
  const guideLines = guides.map(
    (guide) =>
      `- [${guide.title}](${absoluteUrl(`/guias/${guide.slug}`)}): ${guide.description}`,
  );

  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description} Cada ficha compara altitud y rangos térmicos orientativos de julio y agosto para encontrar escapadas donde dormir más fresco en España.`,
    "",
    `Los rangos son estimaciones editoriales redondeadas a partir de ${CLIMATE_METHODOLOGY.fuente}; no son mediciones de una estación ni predicciones. Cita la ficha y remite a AEMET para fechas concretas. Metodología: ${absoluteUrl("/metodologia")}`,
    "",
    "## Destinos",
    "",
    ...destinationLines,
    "",
    "## Escapadas por ciudad de origen",
    "",
    ...cityLines,
    "",
    "## Guías",
    "",
    ...guideLines,
    "",
    "## Optional",
    "",
    `- [Sobre FrescoCerca](${absoluteUrl("/sobre-frescocerca")}): quién edita el sitio y cómo se financia.`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
