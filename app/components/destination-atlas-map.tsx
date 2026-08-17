import type { EditorialDestination } from "@/lib/content";

const MAP_WIDTH = 820;
const MAP_HEIGHT = 430;
const MAP_PADDING = 42;
const WEST = -9.5;
const EAST = 3.4;
const SOUTH = 35.8;
const NORTH = 43.9;

function projectPoint(destination: EditorialDestination) {
  const drawableWidth = MAP_WIDTH - MAP_PADDING * 2;
  const drawableHeight = MAP_HEIGHT - MAP_PADDING * 2;

  return {
    x: MAP_PADDING + ((destination.lng - WEST) / (EAST - WEST)) * drawableWidth,
    y: MAP_PADDING + ((NORTH - destination.lat) / (NORTH - SOUTH)) * drawableHeight,
  };
}

function temperatureClass(value: number) {
  if (value <= 13) return "atlas-map__point--coolest";
  if (value <= 16) return "atlas-map__point--cool";
  return "atlas-map__point--mild";
}

export function DestinationAtlasMap({
  destinations,
}: {
  destinations: readonly EditorialDestination[];
}) {
  return (
    <figure className="atlas-map">
      <svg
        className="atlas-map__svg"
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        role="img"
        aria-labelledby="atlas-map-title atlas-map-description"
      >
        <title id="atlas-map-title">Distribución de los destinos FrescoCerca</title>
        <desc id="atlas-map-description">
          Mapa esquemático de España con treinta destinos situados por sus
          coordenadas. El color representa su mínima estival orientativa.
        </desc>

        <rect className="atlas-map__background" width={MAP_WIDTH} height={MAP_HEIGHT} rx="24" />
        {[37, 39, 41, 43].map((latitude) => {
          const y = MAP_PADDING + ((NORTH - latitude) / (NORTH - SOUTH)) * (MAP_HEIGHT - MAP_PADDING * 2);
          return (
            <g className="atlas-map__grid" key={latitude}>
              <line x1={MAP_PADDING} y1={y} x2={MAP_WIDTH - MAP_PADDING} y2={y} />
              <text x={12} y={y + 4}>{latitude}° N</text>
            </g>
          );
        })}
        {[-8, -4, 0, 2].map((longitude) => {
          const x = MAP_PADDING + ((longitude - WEST) / (EAST - WEST)) * (MAP_WIDTH - MAP_PADDING * 2);
          return (
            <g className="atlas-map__grid" key={longitude}>
              <line x1={x} y1={MAP_PADDING} x2={x} y2={MAP_HEIGHT - MAP_PADDING} />
              <text x={x - 10} y={MAP_HEIGHT - 13}>{longitude}°</text>
            </g>
          );
        })}

        {destinations.map((destination, index) => {
          const point = projectPoint(destination);
          return (
            <a
              href={"/destinos/" + destination.slug}
              aria-label={
                destination.name +
                ", mínima orientativa " +
                destination.summerLowRange[0] +
                " a " +
                destination.summerLowRange[1] +
                " grados"
              }
              key={destination.slug}
            >
              <circle
                className={`atlas-map__point ${temperatureClass(destination.summerLow)}`}
                cx={point.x}
                cy={point.y}
                r={index < 6 ? 7 : 5}
              >
                <title>
                  {destination.name}: {destination.summerLowRange[0]}–{destination.summerLowRange[1]} °C
                </title>
              </circle>
              {index < 6 ? (
                <text className="atlas-map__label" x={point.x + 10} y={point.y - 8}>
                  {destination.name}
                </text>
              ) : null}
            </a>
          );
        })}
      </svg>

      <figcaption>
        <span>Mapa esquemático, no apto para navegación.</span>
        <span className="atlas-map__legend">
          <i className="atlas-map__point--coolest" aria-hidden="true" /> 13 °C o menos
          <i className="atlas-map__point--cool" aria-hidden="true" /> 14–16 °C
          <i className="atlas-map__point--mild" aria-hidden="true" /> 17 °C o más
        </span>
      </figcaption>
    </figure>
  );
}
