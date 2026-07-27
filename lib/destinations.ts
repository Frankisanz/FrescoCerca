export type DestinationTag =
  | "naturaleza"
  | "ninos"
  | "perro"
  | "bano"
  | "montana";

export type Coordinates = {
  lat: number;
  lng: number;
};

export type SummerTemperatureRange = {
  maximasC: readonly [number, number];
  minimasC: readonly [number, number];
  periodo: "julio-agosto";
};

export type Destination = {
  slug: string;
  nombre: string;
  provincia: string;
  comunidad: string;
  coordenadas: Coordinates;
  altitudM: number;
  climaVerano: SummerTemperatureRange;
  etiquetas: readonly DestinationTag[];
  descripcion: string;
  mejorPara: readonly string[];
  fuente: string;
  fuenteUrl: string;
  metodologia: string;
  /** Alias numéricos derivados para cálculos editoriales y páginas relacionadas. */
  lat: number;
  lng: number;
  altitude: number;
  summerHigh: number;
  summerLow: number;
};

type DestinationInput = Omit<
  Destination,
  "lat" | "lng" | "altitude" | "summerHigh" | "summerLow"
>;

export type OriginCity = {
  slug: string;
  nombre: string;
  provincia: string;
  coordenadas: Coordinates;
  maximaEstivalOrientativaC: number;
  minimaNocturnaEstivalOrientativaC: number;
};

export const DESTINATION_TAG_LABELS: Record<DestinationTag, string> = {
  naturaleza: "Naturaleza",
  ninos: "Con niños",
  perro: "Con perro",
  bano: "Zonas de baño",
  montana: "Montaña",
};

export const CLIMATE_METHODOLOGY = {
  fuente:
    "AEMET, valores climatológicos normales 1991-2020 y estaciones representativas cercanas",
  fuenteUrl:
    "https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/valoresclimatologicos",
  metodologia:
    "Rangos editoriales redondeados para julio y agosto, contrastados con la altitud y la geografía local. Representan condiciones habituales, no récords ni una predicción para fechas concretas. Conviene consultar AEMET antes de viajar.",
  revisado: "2026-07-27",
} as const;

export const ORIGIN_CLIMATE_METHODOLOGY =
  "Las máximas y mínimas de las ciudades de origen son referencias editoriales redondeadas para noches y días habituales de julio y agosto. Sirven únicamente para comparar el alivio térmico potencial; no describen una fecha concreta ni sustituyen la observación o la previsión de AEMET.";

const CLIMATE_BASIS = {
  fuente: CLIMATE_METHODOLOGY.fuente,
  fuenteUrl: CLIMATE_METHODOLOGY.fuenteUrl,
  metodologia: CLIMATE_METHODOLOGY.metodologia,
} as const;

const DESTINATION_DATA: readonly DestinationInput[] = [
  {
    slug: "otxandio",
    nombre: "Otxandio",
    provincia: "Bizkaia",
    comunidad: "País Vasco",
    coordenadas: { lat: 43.04, lng: -2.655 },
    altitudM: 549,
    climaVerano: {
      maximasC: [22, 27],
      minimasC: [11, 15],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Una villa de piedra entre los hayedos de Urkiola, con sombra abundante y rutas cortas que empiezan casi en el casco urbano.",
    mejorPara: ["Bosques y paseos sencillos", "Escapadas desde Bilbao"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "puebla-de-sanabria",
    nombre: "Puebla de Sanabria",
    provincia: "Zamora",
    comunidad: "Castilla y León",
    coordenadas: { lat: 42.055, lng: -6.634 },
    altitudM: 941,
    climaVerano: {
      maximasC: [24, 29],
      minimasC: [9, 13],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Combina un conjunto medieval elevado con el lago de Sanabria, una opción versátil para refrescar el día y dormir con noches suaves.",
    mejorPara: ["Baño en agua dulce", "Viajes familiares de fin de semana"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "pola-de-somiedo",
    nombre: "Pola de Somiedo",
    provincia: "Asturias",
    comunidad: "Principado de Asturias",
    coordenadas: { lat: 43.1, lng: -6.256 },
    altitudM: 700,
    climaVerano: {
      maximasC: [20, 25],
      minimasC: [9, 13],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Base pequeña y verde para descubrir lagos glaciares, brañas y valles donde el relieve y la vegetación moderan el calor.",
    mejorPara: ["Senderismo con paisajes", "Noches especialmente frescas"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "espinama",
    nombre: "Espinama",
    provincia: "Cantabria",
    comunidad: "Cantabria",
    coordenadas: { lat: 43.145, lng: -4.751 },
    altitudM: 877,
    climaVerano: {
      maximasC: [20, 25],
      minimasC: [9, 13],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "montana"],
    descripcion:
      "Un núcleo tranquilo a los pies de los Picos de Europa, apropiado para madrugar, caminar y regresar a una noche de montaña.",
    mejorPara: ["Picos de Europa sin ambiente urbano", "Parejas senderistas"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "cangas-de-onis",
    nombre: "Cangas de Onís",
    provincia: "Asturias",
    comunidad: "Principado de Asturias",
    coordenadas: { lat: 43.351, lng: -5.129 },
    altitudM: 87,
    climaVerano: {
      maximasC: [22, 27],
      minimasC: [13, 17],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Una base con todos los servicios para acercarse a los Picos de Europa, seguir el Sella y combinar rutas, pozas y visitas familiares.",
    mejorPara: ["Primera escapada a Picos de Europa", "Naturaleza con servicios"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "ochagavia",
    nombre: "Ochagavía",
    provincia: "Navarra",
    comunidad: "Comunidad Foral de Navarra",
    coordenadas: { lat: 42.905, lng: -1.091 },
    altitudM: 764,
    climaVerano: {
      maximasC: [22, 27],
      minimasC: [9, 14],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Casas con tejados inclinados, río y acceso a la Selva de Irati convierten el pueblo en una base fresca y muy caminable.",
    mejorPara: ["Hayedos y fotografía", "Rutas para distintos niveles"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "valdelinares",
    nombre: "Valdelinares",
    provincia: "Teruel",
    comunidad: "Aragón",
    coordenadas: { lat: 40.391, lng: -0.606 },
    altitudM: 1_692,
    climaVerano: {
      maximasC: [19, 24],
      minimasC: [7, 11],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "montana"],
    descripcion:
      "Uno de los municipios más altos de España, con aire seco, cielos despejados y una caída térmica nocturna muy marcada.",
    mejorPara: ["Dormir realmente fresco", "Observación de estrellas"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "albarracin",
    nombre: "Albarracín",
    provincia: "Teruel",
    comunidad: "Aragón",
    coordenadas: { lat: 40.408, lng: -1.444 },
    altitudM: 1_171,
    climaVerano: {
      maximasC: [23, 28],
      minimasC: [9, 13],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Su casco histórico rojizo se asoma a un meandro del Guadalaviar y queda rodeado de pinares con rutas y pozas.",
    mejorPara: ["Patrimonio y naturaleza", "Escapadas desde Valencia o Zaragoza"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "bronchales",
    nombre: "Bronchales",
    provincia: "Teruel",
    comunidad: "Aragón",
    coordenadas: { lat: 40.511, lng: -1.589 },
    altitudM: 1_575,
    climaVerano: {
      maximasC: [20, 25],
      minimasC: [7, 11],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "montana"],
    descripcion:
      "Pinares de gran altitud y áreas recreativas accesibles hacen de Bronchales una alternativa sencilla para escapar del calor levantino.",
    mejorPara: ["Picnic bajo los pinos", "Familias que buscan tranquilidad"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "benasque",
    nombre: "Benasque",
    provincia: "Huesca",
    comunidad: "Aragón",
    coordenadas: { lat: 42.605, lng: 0.523 },
    altitudM: 1_138,
    climaVerano: {
      maximasC: [21, 26],
      minimasC: [9, 13],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Un valle amplio de alta montaña con servicios suficientes y acceso a paseos junto al Ésera, cascadas y cumbres pirenaicas.",
    mejorPara: ["Vacaciones activas de varios días", "Montaña con servicios"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "ezcaray",
    nombre: "Ezcaray",
    provincia: "La Rioja",
    comunidad: "La Rioja",
    coordenadas: { lat: 42.325, lng: -3.013 },
    altitudM: 813,
    climaVerano: {
      maximasC: [23, 28],
      minimasC: [10, 14],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "El valle del Oja reúne hayedos, río y un casco animado a los pies de la Demanda, útil para alternar descanso y rutas cortas.",
    mejorPara: ["Escapadas desde Bilbao o Zaragoza", "Bosque y gastronomía"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "boi",
    nombre: "Boí",
    provincia: "Lleida",
    comunidad: "Cataluña",
    coordenadas: { lat: 42.522, lng: 0.834 },
    altitudM: 1_263,
    climaVerano: {
      maximasC: [20, 25],
      minimasC: [8, 12],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Románico, prados y el cercano parque de Aigüestortes ofrecen días completos al aire libre con noches propias del Pirineo.",
    mejorPara: ["Patrimonio románico", "Lagos y senderos familiares"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "puigcerda",
    nombre: "Puigcerdà",
    provincia: "Girona",
    comunidad: "Cataluña",
    coordenadas: { lat: 42.432, lng: 1.928 },
    altitudM: 1_202,
    climaVerano: {
      maximasC: [21, 27],
      minimasC: [8, 13],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "La capital ceretana combina lago, comercios y caminos de valle a suficiente altitud para que la noche permita descansar.",
    mejorPara: ["Escapada cómoda desde Barcelona", "Viajes sin renunciar a servicios"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "camprodon",
    nombre: "Camprodon",
    provincia: "Girona",
    comunidad: "Cataluña",
    coordenadas: { lat: 42.311, lng: 2.365 },
    altitudM: 950,
    climaVerano: {
      maximasC: [21, 26],
      minimasC: [10, 14],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "El Ter atraviesa una villa pirenaica con paseos agradables, fuentes y excursiones cercanas para llenar un fin de semana.",
    mejorPara: ["Paseos junto al río", "Familias desde Cataluña"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "rupit",
    nombre: "Rupit",
    provincia: "Barcelona",
    comunidad: "Cataluña",
    coordenadas: { lat: 42.024, lng: 2.466 },
    altitudM: 845,
    climaVerano: {
      maximasC: [22, 27],
      minimasC: [11, 15],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Calles empedradas y saltos de agua entre hayedos y riscos crean una escapada fotogénica a una distancia razonable de Barcelona.",
    mejorPara: ["Fin de semana corto", "Paisaje y pueblos con encanto"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "cercedilla",
    nombre: "Cercedilla",
    provincia: "Madrid",
    comunidad: "Comunidad de Madrid",
    coordenadas: { lat: 40.742, lng: -4.057 },
    altitudM: 1_214,
    climaVerano: {
      maximasC: [23, 28],
      minimasC: [10, 14],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Tren, pinares y piscinas naturales la convierten en una de las huidas del asfalto más sencillas para quien sale de Madrid.",
    mejorPara: ["Escapada sin coche", "Baño y pinar en el día"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "rascafria",
    nombre: "Rascafría",
    provincia: "Madrid",
    comunidad: "Comunidad de Madrid",
    coordenadas: { lat: 40.904, lng: -3.879 },
    altitudM: 1_163,
    climaVerano: {
      maximasC: [22, 27],
      minimasC: [8, 13],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "El valle del Lozoya suma bosque, agua y una altitud que se nota sobre todo al caer la tarde y durante la madrugada.",
    mejorPara: ["Una noche fresca cerca de Madrid", "Rutas y zonas de baño"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "la-granja-de-san-ildefonso",
    nombre: "La Granja de San Ildefonso",
    provincia: "Segovia",
    comunidad: "Castilla y León",
    coordenadas: { lat: 40.901, lng: -4.006 },
    altitudM: 1_193,
    climaVerano: {
      maximasC: [23, 28],
      minimasC: [9, 14],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "montana"],
    descripcion:
      "Jardines históricos y pinares de Valsaín permiten alternar cultura y sombra en la vertiente norte de la sierra.",
    mejorPara: ["Patrimonio con niños", "Excursiones desde Madrid o Valladolid"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "siguenza",
    nombre: "Sigüenza",
    provincia: "Guadalajara",
    comunidad: "Castilla-La Mancha",
    coordenadas: { lat: 41.069, lng: -2.643 },
    altitudM: 1_005,
    climaVerano: {
      maximasC: [25, 30],
      minimasC: [10, 15],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro"],
    descripcion:
      "Una ciudad medieval elevada cuya principal ventaja estival aparece por la noche, cuando el aire seco facilita el descanso.",
    mejorPara: ["Historia y gastronomía", "Una noche cerca de Madrid"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "navarredonda-de-gredos",
    nombre: "Navarredonda de Gredos",
    provincia: "Ávila",
    comunidad: "Castilla y León",
    coordenadas: { lat: 40.361, lng: -5.132 },
    altitudM: 1_523,
    climaVerano: {
      maximasC: [21, 26],
      minimasC: [7, 11],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Praderas, pinos y gargantas de Gredos rodean un pueblo alto en el que incluso conviene llevar una capa para después del atardecer.",
    mejorPara: ["Noches frías en pleno verano", "Senderismo y cielo oscuro"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "candelario",
    nombre: "Candelario",
    provincia: "Salamanca",
    comunidad: "Castilla y León",
    coordenadas: { lat: 40.368, lng: -5.744 },
    altitudM: 1_126,
    climaVerano: {
      maximasC: [23, 28],
      minimasC: [9, 14],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Sus regaderas, calles con pendiente y proximidad a la sierra de Béjar forman una base con carácter para caminar temprano.",
    mejorPara: ["Pueblo histórico y montaña", "Escapadas desde el oeste peninsular"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "grazalema",
    nombre: "Grazalema",
    provincia: "Cádiz",
    comunidad: "Andalucía",
    coordenadas: { lat: 36.759, lng: -5.368 },
    altitudM: 812,
    climaVerano: {
      maximasC: [25, 30],
      minimasC: [14, 18],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "En plena sierra gaditana, sus casas blancas y senderos elevados ofrecen un respiro relativo frente al calor del valle y la costa.",
    mejorPara: ["Escapadas desde Sevilla o Málaga", "Senderismo de primera hora"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "capileira",
    nombre: "Capileira",
    provincia: "Granada",
    comunidad: "Andalucía",
    coordenadas: { lat: 36.961, lng: -3.359 },
    altitudM: 1_436,
    climaVerano: {
      maximasC: [23, 28],
      minimasC: [11, 16],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "La altura y la arquitectura de la Alpujarra suavizan la noche, mientras las acequias y barrancos aportan rutas con identidad propia.",
    mejorPara: ["Alpujarra y noches templadas", "Viajes desde Granada o Málaga"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "guejar-sierra",
    nombre: "Güéjar Sierra",
    provincia: "Granada",
    comunidad: "Andalucía",
    coordenadas: { lat: 37.16, lng: -3.438 },
    altitudM: 1_088,
    climaVerano: {
      maximasC: [25, 30],
      minimasC: [13, 17],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Muy cerca de Granada, enlaza caminos junto al Genil con accesos a cotas más altas de Sierra Nevada para regular el plan según el calor.",
    mejorPara: ["Improvisar desde Granada", "Río y media montaña"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "cazorla",
    nombre: "Cazorla",
    provincia: "Jaén",
    comunidad: "Andalucía",
    coordenadas: { lat: 37.914, lng: -3.003 },
    altitudM: 826,
    climaVerano: {
      maximasC: [26, 31],
      minimasC: [14, 18],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Una puerta monumental a un parque natural inmenso, con ríos, áreas sombreadas y carreteras que ganan altura con rapidez.",
    mejorPara: ["Fauna y rutas en familia", "Escapadas desde el sureste"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "riopar",
    nombre: "Riópar",
    provincia: "Albacete",
    comunidad: "Castilla-La Mancha",
    coordenadas: { lat: 38.5, lng: -2.417 },
    altitudM: 950,
    climaVerano: {
      maximasC: [25, 30],
      minimasC: [12, 17],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Los pinares y el nacimiento del río Mundo ofrecen agua, sombra y una base serrana accesible desde Murcia y el Levante.",
    mejorPara: ["Cascadas y bosque", "Familias del sureste"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "ayna",
    nombre: "Aýna",
    provincia: "Albacete",
    comunidad: "Castilla-La Mancha",
    coordenadas: { lat: 38.553, lng: -2.071 },
    altitudM: 674,
    climaVerano: {
      maximasC: [27, 32],
      minimasC: [14, 19],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Encajada en la hoz del Mundo, combina miradores, sombra de ribera y pequeñas rutas; el alivio es relativo pero cercano al sureste.",
    mejorPara: ["Viaje corto desde Murcia", "Paisaje sin grandes caminatas"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "aracena",
    nombre: "Aracena",
    provincia: "Huelva",
    comunidad: "Andalucía",
    coordenadas: { lat: 37.893, lng: -6.562 },
    altitudM: 732,
    climaVerano: {
      maximasC: [26, 31],
      minimasC: [14, 18],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "La sierra onubense aporta encinas, castaños y una famosa gruta para alternar paseos sombreados con visitas bajo tierra.",
    mejorPara: ["Escapada familiar desde Sevilla", "Gastronomía y visitas frescas"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "constantina",
    nombre: "Constantina",
    provincia: "Sevilla",
    comunidad: "Andalucía",
    coordenadas: { lat: 37.872, lng: -5.619 },
    altitudM: 556,
    climaVerano: {
      maximasC: [28, 33],
      minimasC: [16, 20],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Una alternativa próxima para subir a Sierra Morena, buscar sombra entre dehesas y rebajar varios grados frente a la campiña sevillana.",
    mejorPara: ["Salida rápida desde Sevilla", "Fines de semana rurales"],
    ...CLIMATE_BASIS,
  },
  {
    slug: "nerpio",
    nombre: "Nerpio",
    provincia: "Albacete",
    comunidad: "Castilla-La Mancha",
    coordenadas: { lat: 38.148, lng: -2.303 },
    altitudM: 1_082,
    climaVerano: {
      maximasC: [24, 29],
      minimasC: [11, 16],
      periodo: "julio-agosto",
    },
    etiquetas: ["naturaleza", "ninos", "perro", "bano", "montana"],
    descripcion:
      "Remoto y elevado, reúne nogales, arte rupestre y embalses en una comarca donde las noches suelen distinguirse claramente de las del litoral.",
    mejorPara: ["Desconexión y cielo oscuro", "Escapadas desde Murcia"],
    ...CLIMATE_BASIS,
  },
];

export const DESTINATIONS: readonly Destination[] = DESTINATION_DATA.map(
  (destination) => ({
    ...destination,
    lat: destination.coordenadas.lat,
    lng: destination.coordenadas.lng,
    altitude: destination.altitudM,
    summerHigh:
      (destination.climaVerano.maximasC[0] +
        destination.climaVerano.maximasC[1]) /
      2,
    summerLow:
      (destination.climaVerano.minimasC[0] +
        destination.climaVerano.minimasC[1]) /
      2,
  }),
);

export const ORIGIN_CITIES: readonly OriginCity[] = [
  {
    slug: "madrid",
    nombre: "Madrid",
    provincia: "Madrid",
    coordenadas: { lat: 40.4168, lng: -3.7038 },
    maximaEstivalOrientativaC: 34,
    minimaNocturnaEstivalOrientativaC: 20,
  },
  {
    slug: "barcelona",
    nombre: "Barcelona",
    provincia: "Barcelona",
    coordenadas: { lat: 41.3874, lng: 2.1686 },
    maximaEstivalOrientativaC: 29,
    minimaNocturnaEstivalOrientativaC: 23,
  },
  {
    slug: "valencia",
    nombre: "Valencia",
    provincia: "Valencia",
    coordenadas: { lat: 39.4699, lng: -0.3763 },
    maximaEstivalOrientativaC: 31,
    minimaNocturnaEstivalOrientativaC: 23,
  },
  {
    slug: "sevilla",
    nombre: "Sevilla",
    provincia: "Sevilla",
    coordenadas: { lat: 37.3891, lng: -5.9845 },
    maximaEstivalOrientativaC: 37,
    minimaNocturnaEstivalOrientativaC: 22,
  },
  {
    slug: "malaga",
    nombre: "Málaga",
    provincia: "Málaga",
    coordenadas: { lat: 36.7213, lng: -4.4214 },
    maximaEstivalOrientativaC: 30,
    minimaNocturnaEstivalOrientativaC: 23,
  },
  {
    slug: "bilbao",
    nombre: "Bilbao",
    provincia: "Bizkaia",
    coordenadas: { lat: 43.263, lng: -2.935 },
    maximaEstivalOrientativaC: 26,
    minimaNocturnaEstivalOrientativaC: 18,
  },
  {
    slug: "zaragoza",
    nombre: "Zaragoza",
    provincia: "Zaragoza",
    coordenadas: { lat: 41.6488, lng: -0.8891 },
    maximaEstivalOrientativaC: 35,
    minimaNocturnaEstivalOrientativaC: 21,
  },
  {
    slug: "valladolid",
    nombre: "Valladolid",
    provincia: "Valladolid",
    coordenadas: { lat: 41.6523, lng: -4.7245 },
    maximaEstivalOrientativaC: 33,
    minimaNocturnaEstivalOrientativaC: 17,
  },
  {
    slug: "murcia",
    nombre: "Murcia",
    provincia: "Murcia",
    coordenadas: { lat: 37.9922, lng: -1.1307 },
    maximaEstivalOrientativaC: 36,
    minimaNocturnaEstivalOrientativaC: 24,
  },
  {
    slug: "cordoba",
    nombre: "Córdoba",
    provincia: "Córdoba",
    coordenadas: { lat: 37.8882, lng: -4.7794 },
    maximaEstivalOrientativaC: 38,
    minimaNocturnaEstivalOrientativaC: 21,
  },
  {
    slug: "ubeda",
    nombre: "Úbeda",
    provincia: "Jaén",
    coordenadas: { lat: 38.0118, lng: -3.371 },
    maximaEstivalOrientativaC: 36,
    minimaNocturnaEstivalOrientativaC: 20,
  },
  {
    slug: "jaen",
    nombre: "Jaén",
    provincia: "Jaén",
    coordenadas: { lat: 37.7796, lng: -3.7849 },
    maximaEstivalOrientativaC: 37,
    minimaNocturnaEstivalOrientativaC: 22,
  },
  {
    slug: "granada",
    nombre: "Granada",
    provincia: "Granada",
    coordenadas: { lat: 37.1773, lng: -3.5986 },
    maximaEstivalOrientativaC: 35,
    minimaNocturnaEstivalOrientativaC: 19,
  },
  {
    slug: "toledo",
    nombre: "Toledo",
    provincia: "Toledo",
    coordenadas: { lat: 39.8628, lng: -4.0273 },
    maximaEstivalOrientativaC: 36,
    minimaNocturnaEstivalOrientativaC: 21,
  },
];

export const destinations = DESTINATIONS;
export const originCities = ORIGIN_CITIES;

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((destination) => destination.slug === slug);
}
