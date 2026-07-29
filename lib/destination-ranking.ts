import type {
  Coordinates,
  Destination,
  DestinationTag,
  OriginCity,
} from "@/lib/destinations";

export const CITY_GUIDE_MAX_TRAVEL_HOURS = 5;

const DEFAULT_RESULT_LIMIT = 6;
const DEFAULT_MAX_DESTINATIONS_PER_REGION = 2;
const DISCOVERY_DAY_REFERENCE_C = 35;
const DISCOVERY_NIGHT_REFERENCE_C = 24;

export type RankedDestination = {
  destination: Destination;
  directDistanceKm: number;
  estimatedRoadDistanceKm: number;
  estimatedTravelHours: number;
  typicalMaximumC: number;
  typicalNightMinimumC: number;
  daytimeReliefC: number;
  nighttimeReliefC: number;
  preferenceMatches: number;
  score: number;
};

export type RankDestinationsOptions = {
  origin?: OriginCity;
  maxTravelHours?: number;
  preferences?: readonly DestinationTag[];
  limit?: number;
  diversify?: boolean;
  maxDestinationsPerRegion?: number;
};

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function calculateDirectDistanceKm(
  from: Coordinates,
  to: Coordinates,
) {
  const earthRadiusKm = 6_371;
  const latitudeDelta = toRadians(to.lat - from.lat);
  const longitudeDelta = toRadians(to.lng - from.lng);
  const fromLatitude = toRadians(from.lat);
  const toLatitude = toRadians(to.lat);

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(fromLatitude) *
      Math.cos(toLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;

  return (
    2 *
    earthRadiusKm *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
}

export function estimateRoadTrip(directDistanceKm: number) {
  // Estimación de comparación, no ruta: 24 % adicional, 12 km de accesos
  // y una velocidad efectiva de 78 km/h más 9 minutos de margen.
  const estimatedRoadDistanceKm = directDistanceKm * 1.24 + 12;
  const estimatedTravelHours = estimatedRoadDistanceKm / 78 + 0.15;

  return { estimatedRoadDistanceKm, estimatedTravelHours };
}

export function formatTravelTime(hours: number) {
  const totalMinutes = Math.round((hours * 60) / 5) * 5;
  const wholeHours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (wholeHours === 0) {
    return `${minutes} min`;
  }

  if (minutes === 0) {
    return `${wholeHours} h`;
  }

  return `${wholeHours} h ${minutes} min`;
}

function rangeMidpoint(range: readonly [number, number]) {
  return (range[0] + range[1]) / 2;
}

function rankDestination(
  destination: Destination,
  origin: OriginCity | undefined,
  preferences: readonly DestinationTag[],
): RankedDestination {
  const directDistanceKm = origin
    ? calculateDirectDistanceKm(origin.coordenadas, destination.coordenadas)
    : 0;
  const { estimatedRoadDistanceKm, estimatedTravelHours } = origin
    ? estimateRoadTrip(directDistanceKm)
    : { estimatedRoadDistanceKm: 0, estimatedTravelHours: 0 };
  const typicalMaximumC = rangeMidpoint(destination.climaVerano.maximasC);
  const typicalNightMinimumC = rangeMidpoint(
    destination.climaVerano.minimasC,
  );
  const daytimeReliefC =
    (origin?.maximaEstivalOrientativaC ?? DISCOVERY_DAY_REFERENCE_C) -
    typicalMaximumC;
  const nighttimeReliefC =
    (origin?.minimaNocturnaEstivalOrientativaC ??
      DISCOVERY_NIGHT_REFERENCE_C) - typicalNightMinimumC;
  const preferenceMatches = preferences.filter((preference) =>
    destination.etiquetas.includes(preference),
  ).length;
  const preferenceCoverage =
    preferences.length === 0 ? 0 : preferenceMatches / preferences.length;

  // El descanso nocturno pesa más que la máxima diurna. La distancia resta
  // solo cuando existe un origen; la altitud aporta un ajuste pequeño y acotado.
  const score =
    preferenceCoverage * 24 +
    preferenceMatches * 5 +
    nighttimeReliefC * 4.8 +
    daytimeReliefC * 1.8 -
    estimatedTravelHours * 2.4 +
    Math.min(destination.altitudM / 400, 4);

  return {
    destination,
    directDistanceKm,
    estimatedRoadDistanceKm,
    estimatedTravelHours,
    typicalMaximumC,
    typicalNightMinimumC,
    daytimeReliefC,
    nighttimeReliefC,
    preferenceMatches,
    score,
  };
}

function selectDiversified(
  ranked: readonly RankedDestination[],
  limit: number,
  maxDestinationsPerRegion: number,
) {
  if (ranked.length <= limit) {
    return [...ranked];
  }

  const selected: RankedDestination[] = [];
  const deferred: RankedDestination[] = [];
  const regionCounts = new Map<string, number>();

  for (const candidate of ranked) {
    const region = candidate.destination.comunidad;
    const count = regionCounts.get(region) ?? 0;

    if (selected.length < limit && count < maxDestinationsPerRegion) {
      selected.push(candidate);
      regionCounts.set(region, count + 1);
    } else {
      deferred.push(candidate);
    }
  }

  for (const candidate of deferred) {
    if (selected.length >= limit) break;
    selected.push(candidate);
  }

  return selected;
}

export function rankDestinations(
  destinations: readonly Destination[],
  {
    origin,
    maxTravelHours,
    preferences = [],
    limit = DEFAULT_RESULT_LIMIT,
    diversify = false,
    maxDestinationsPerRegion = DEFAULT_MAX_DESTINATIONS_PER_REGION,
  }: RankDestinationsOptions = {},
): RankedDestination[] {
  const normalizedLimit = Math.max(0, Math.floor(limit));
  const normalizedRegionLimit = Math.max(
    1,
    Math.floor(maxDestinationsPerRegion),
  );

  const ranked = destinations
    .map((destination) => rankDestination(destination, origin, preferences))
    .filter(
      (candidate) =>
        !origin ||
        maxTravelHours === undefined ||
        candidate.estimatedTravelHours <= maxTravelHours,
    )
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.estimatedTravelHours - right.estimatedTravelHours ||
        left.destination.nombre.localeCompare(
          right.destination.nombre,
          "es",
        ),
    );

  if (!diversify) {
    return ranked.slice(0, normalizedLimit);
  }

  return selectDiversified(ranked, normalizedLimit, normalizedRegionLimit);
}
