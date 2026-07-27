"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  DESTINATIONS,
  DESTINATION_TAG_LABELS,
  ORIGIN_CITIES,
  type Coordinates,
  type Destination,
  type DestinationTag,
} from "@/lib/destinations";

const TRAVEL_HOUR_OPTIONS = [3, 4, 5, 6] as const;
const RESULT_LIMIT_OPTIONS = [3, 4, 5, 6] as const;
const PREFERENCE_OPTIONS = Object.entries(DESTINATION_TAG_LABELS) as [
  DestinationTag,
  string,
][];

type RankedDestination = {
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

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function haversineDistanceKm(from: Coordinates, to: Coordinates) {
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

function estimateRoadTrip(directDistanceKm: number) {
  // A transparent planning estimate, not a routing result: 24% extra distance,
  // 12 km for urban access and an average effective speed of 78 km/h.
  const estimatedRoadDistanceKm = directDistanceKm * 1.24 + 12;
  const estimatedTravelHours = estimatedRoadDistanceKm / 78 + 0.15;

  return { estimatedRoadDistanceKm, estimatedTravelHours };
}

function rangeMidpoint(range: readonly [number, number]) {
  return (range[0] + range[1]) / 2;
}

function formatTravelTime(hours: number) {
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

function rankDestinations(
  originSlug: string,
  maxTravelHours: number,
  preferences: readonly DestinationTag[],
) {
  const origin = ORIGIN_CITIES.find((city) => city.slug === originSlug);

  if (!origin) {
    return [];
  }

  return DESTINATIONS.map<RankedDestination>((destination) => {
    const directDistanceKm = haversineDistanceKm(
      origin.coordenadas,
      destination.coordenadas,
    );
    const { estimatedRoadDistanceKm, estimatedTravelHours } =
      estimateRoadTrip(directDistanceKm);
    const typicalMaximumC = rangeMidpoint(
      destination.climaVerano.maximasC,
    );
    const typicalNightMinimumC = rangeMidpoint(
      destination.climaVerano.minimasC,
    );
    const daytimeReliefC =
      origin.maximaEstivalOrientativaC - typicalMaximumC;
    const nighttimeReliefC =
      origin.minimaNocturnaEstivalOrientativaC - typicalNightMinimumC;
    const preferenceMatches = preferences.filter((preference) =>
      destination.etiquetas.includes(preference),
    ).length;
    const preferenceCoverage =
      preferences.length === 0 ? 1 : preferenceMatches / preferences.length;

    // Sleeping comfort has more weight than daytime relief. Both inputs are
    // rounded climate references rather than a forecast for a specific date.
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
  })
    .filter((result) => result.estimatedTravelHours <= maxTravelHours)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.estimatedTravelHours - right.estimatedTravelHours;
    });
}

export function EscapeFinder() {
  const [originSlug, setOriginSlug] = useState("madrid");
  const [maxTravelHours, setMaxTravelHours] = useState<number>(4);
  const [preferences, setPreferences] = useState<DestinationTag[]>([]);
  const [resultLimit, setResultLimit] = useState<number>(6);
  const [shareStatus, setShareStatus] = useState("");

  const selectedOrigin = ORIGIN_CITIES.find(
    (origin) => origin.slug === originSlug,
  );
  const rankedDestinations = useMemo(
    () => rankDestinations(originSlug, maxTravelHours, preferences),
    [originSlug, maxTravelHours, preferences],
  );
  const visibleDestinations = rankedDestinations.slice(0, resultLimit);

  function togglePreference(preference: DestinationTag) {
    setPreferences((current) =>
      current.includes(preference)
        ? current.filter((item) => item !== preference)
        : [...current, preference],
    );
  }

  function resetFilters() {
    setOriginSlug("madrid");
    setMaxTravelHours(4);
    setPreferences([]);
    setResultLimit(6);
    setShareStatus("");
  }

  async function shareTopResult() {
    const topResult = visibleDestinations[0];

    if (!topResult || !selectedOrigin) {
      return;
    }

    const roundedNightDifference = Math.max(
      0,
      Math.round(topResult.nighttimeReliefC),
    );
    const resultUrl = new URL(
      `/destinos/${topResult.destination.slug}`,
      window.location.origin,
    ).toString();
    const text =
      roundedNightDifference > 0
        ? `Desde ${selectedOrigin.nombre}, FrescoCerca recomienda ${topResult.destination.nombre}: alrededor de ${roundedNightDifference} °C menos por la noche y un trayecto orientativo de ${formatTravelTime(topResult.estimatedTravelHours)}.`
        : `Desde ${selectedOrigin.nombre}, FrescoCerca recomienda ${topResult.destination.nombre} para una escapada de verano.`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `Una noche más fresca en ${topResult.destination.nombre}`,
          text,
          url: resultUrl,
        });
        setShareStatus("Recomendación compartida.");
      } else {
        await navigator.clipboard.writeText(`${text} ${resultUrl}`);
        setShareStatus("Enlace copiado.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      setShareStatus("No se pudo compartir. Abre la guía y copia su enlace.");
    }
  }

  return (
    <section
      className="finder"
      aria-labelledby="escape-finder-title"
      aria-describedby="finder-disclaimer"
    >
      <div className="finder-heading">
        <p className="finder-eyebrow">Buscador de escapadas</p>
        <h2 id="escape-finder-title" className="finder-title">
          Encuentra un lugar más fresco cerca de ti
        </h2>
        <p className="finder-intro">
          Comparamos distancia, altitud y temperaturas estivales habituales para
          proponerte destinos que encajen con tu plan.
        </p>
      </div>

      <form className="finder-form" onSubmit={(event) => event.preventDefault()}>
        <div className="finder-field">
          <label className="finder-label" htmlFor="finder-origin">
            ¿Desde dónde sales?
          </label>
          <select
            className="finder-select"
            id="finder-origin"
            value={originSlug}
            onChange={(event) => setOriginSlug(event.target.value)}
          >
            {ORIGIN_CITIES.map((origin) => (
              <option key={origin.slug} value={origin.slug}>
                {origin.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="finder-field">
          <label className="finder-label" htmlFor="finder-hours">
            Tiempo máximo orientativo en coche
          </label>
          <select
            className="finder-select"
            id="finder-hours"
            value={maxTravelHours}
            onChange={(event) => setMaxTravelHours(Number(event.target.value))}
            aria-describedby="finder-distance-note"
          >
            {TRAVEL_HOUR_OPTIONS.map((hours) => (
              <option key={hours} value={hours}>
                Hasta {hours} horas
              </option>
            ))}
          </select>
          <p className="finder-help" id="finder-distance-note">
            Es una estimación geográfica; la ruta y el tráfico reales pueden
            cambiar el tiempo.
          </p>
        </div>

        <fieldset className="finder-preferences">
          <legend className="finder-label">¿Qué te apetece?</legend>
          <div className="finder-preference-list">
            {PREFERENCE_OPTIONS.map(([value, label]) => (
              <label className="finder-check" key={value}>
                <input
                  className="finder-check-input"
                  type="checkbox"
                  value={value}
                  checked={preferences.includes(value)}
                  onChange={() => togglePreference(value)}
                />
                <span className="finder-check-label">{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="finder-form-footer">
          <div className="finder-result-limit">
            <label className="finder-label" htmlFor="finder-result-limit">
              Resultados
            </label>
            <select
              className="finder-select finder-select-compact"
              id="finder-result-limit"
              value={resultLimit}
              onChange={(event) => setResultLimit(Number(event.target.value))}
            >
              {RESULT_LIMIT_OPTIONS.map((limit) => (
                <option key={limit} value={limit}>
                  {limit}
                </option>
              ))}
            </select>
          </div>
          <button
            className="finder-reset"
            type="button"
            onClick={resetFilters}
          >
            Restablecer
          </button>
        </div>
      </form>

      <div
        className="finder-results"
        aria-live="polite"
        aria-atomic="false"
      >
        <div className="finder-results-heading">
          <div>
            <p className="finder-results-kicker">
              {visibleDestinations.length === 0
                ? "Prueba a ampliar el viaje"
                : `${visibleDestinations.length} propuestas para ti`}
            </p>
            <h3 className="finder-results-title">
              {selectedOrigin
                ? `Escapadas desde ${selectedOrigin.nombre}`
                : "Escapadas recomendadas"}
            </h3>
          </div>
          <div className="finder-results-actions">
            <p className="finder-results-summary">
              Priorizamos el alivio nocturno y después tus preferencias, el día
              y la cercanía.
            </p>
            {visibleDestinations.length > 0 ? (
              <button
                className="finder-share"
                type="button"
                onClick={shareTopResult}
              >
                Compartir la mejor opción
              </button>
            ) : null}
            <span className="finder-share-status" aria-live="polite">
              {shareStatus}
            </span>
          </div>
        </div>

        {visibleDestinations.length > 0 ? (
          <ol className="finder-result-grid">
            {visibleDestinations.map((result, index) => {
              const { destination } = result;
              const [nightMinimum, nightMaximum] =
                destination.climaVerano.minimasC;
              const roundedNightDifference = Math.round(
                result.nighttimeReliefC,
              );

              return (
                <li className="finder-result-item" key={destination.slug}>
                  <article className="finder-card">
                    <div className="finder-card-topline">
                      <span className="finder-rank">Opción {index + 1}</span>
                      <span className="finder-altitude">
                        {destination.altitudM.toLocaleString("es-ES")} m
                      </span>
                    </div>

                    <div className="finder-card-heading">
                      <div>
                        <h4 className="finder-card-title">
                          {destination.nombre}
                        </h4>
                        <p className="finder-location">
                          {destination.provincia} · {destination.comunidad}
                        </p>
                      </div>
                      <p
                        className={`finder-temperature-difference ${
                          roundedNightDifference > 0
                            ? "finder-temperature-difference-positive"
                            : ""
                        }`}
                      >
                        {roundedNightDifference > 0
                          ? `≈ ${roundedNightDifference} °C menos por la noche`
                          : "Noche de temperatura similar"}
                      </p>
                    </div>

                    <p className="finder-description">
                      {destination.descripcion}
                    </p>

                    <dl className="finder-metrics">
                      <div className="finder-metric">
                        <dt>Trayecto estimado</dt>
                        <dd>
                          {formatTravelTime(result.estimatedTravelHours)}
                        </dd>
                      </div>
                      <div className="finder-metric">
                        <dt>Distancia orientativa</dt>
                        <dd>
                          {Math.round(result.estimatedRoadDistanceKm)} km
                        </dd>
                      </div>
                      <div className="finder-metric">
                        <dt>Máximas habituales</dt>
                        <dd>
                          {destination.climaVerano.maximasC[0]}–
                          {destination.climaVerano.maximasC[1]} °C
                        </dd>
                      </div>
                      <div className="finder-metric">
                        <dt>Noches habituales</dt>
                        <dd>
                          {nightMinimum}–{nightMaximum} °C
                        </dd>
                      </div>
                    </dl>

                    <ul
                      className="finder-tags"
                      aria-label={`Características de ${destination.nombre}`}
                    >
                      {destination.etiquetas.map((tag) => (
                        <li className="finder-tag" key={tag}>
                          {DESTINATION_TAG_LABELS[tag]}
                        </li>
                      ))}
                    </ul>

                    <div className="finder-best-for">
                      <span className="finder-best-for-label">Ideal para</span>
                      <span>{destination.mejorPara.join(" · ")}</span>
                    </div>

                    <Link
                      className="finder-card-link"
                      href={`/destinos/${destination.slug}`}
                    >
                      Ver guía de {destination.nombre}
                      <span aria-hidden="true"> →</span>
                    </Link>
                  </article>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="finder-empty" role="status">
            <p className="finder-empty-title">
              No hay destinos curados dentro de ese límite.
            </p>
            <p>
              Amplía el tiempo máximo de viaje para obtener recomendaciones.
            </p>
          </div>
        )}
      </div>

      <p className="finder-disclaimer" id="finder-disclaimer">
        Los datos climáticos son rangos históricos orientativos para julio y
        agosto, no una previsión meteorológica en tiempo real. La distancia por
        carretera también es estimada. Comprueba la ruta, los avisos y el
        pronóstico de AEMET antes de salir.
      </p>
    </section>
  );
}
