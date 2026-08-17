import {
  destinations as destinationRecords,
  DESTINATION_TAG_LABELS,
  originCities as originRecords,
  type Destination as DestinationRecord,
} from "@/lib/destinations";
import {
  calculateDirectDistanceKm,
  CITY_GUIDE_MAX_TRAVEL_HOURS,
  rankDestinations,
} from "@/lib/destination-ranking";
import { growthGuides } from "@/lib/guide-growth";
import {
  absoluteUrl,
  serializeJsonLd,
  SITE_URL,
  siteConfig,
} from "@/lib/site";

export { absoluteUrl, serializeJsonLd, SITE_URL };
export const SITE_NAME = siteConfig.name;

export function formatCelsius(value: number) {
  return `${new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: 1,
  }).format(value)} °C`;
}

export type EditorialDestination = {
  slug: string;
  name: string;
  province: string;
  region: string;
  lat: number;
  lng: number;
  altitude: number;
  summerHigh: number;
  summerLow: number;
  summerHighRange: readonly [number, number];
  summerLowRange: readonly [number, number];
  tags: string[];
  description: string;
  bestFor: string;
  sourceNote: string;
  sourceUrl: string;
};

export const editorialDestinations: EditorialDestination[] =
  destinationRecords.map((destination: DestinationRecord) => ({
    slug: destination.slug,
    name: destination.nombre,
    province: destination.provincia,
    region: destination.comunidad,
    lat: destination.lat,
    lng: destination.lng,
    altitude: destination.altitude,
    summerHigh: destination.summerHigh,
    summerLow: destination.summerLow,
    summerHighRange: destination.climaVerano.maximasC,
    summerLowRange: destination.climaVerano.minimasC,
    tags: destination.etiquetas.map((tag) => DESTINATION_TAG_LABELS[tag]),
    description: destination.descripcion,
    bestFor: destination.mejorPara.join(" · "),
    sourceNote: `${destination.fuente}. ${destination.metodologia}`,
    sourceUrl: destination.fuenteUrl,
  }));

const editorialDestinationBySlug = new Map(
  editorialDestinations.map((destination) => [destination.slug, destination]),
);

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export type FromCity = {
  slug: string;
  name: string;
  province: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
  introduction: string[];
  strategy: string;
  routeAdvice: string;
  usefulFor: string[];
  areaIdeas: { name: string; reason: string }[];
  faqs: { question: string; answer: string }[];
};

export const fromCities: FromCity[] = [
  {
    slug: "madrid",
    name: "Madrid",
    province: "Comunidad de Madrid",
    lat: 40.4168,
    lng: -3.7038,
    title: "Escapadas frescas desde Madrid",
    description:
      "Compara destinos de montaña y zonas verdes para organizar una escapada con menos calor desde Madrid, con datos climáticos orientativos y criterios prácticos.",
    introduction: [
      "Salir de Madrid para buscar una noche más llevadera no consiste únicamente en conducir hacia el norte. La altitud, la orientación del alojamiento, la vegetación y la temperatura mínima habitual suelen importar más que el nombre de la provincia.",
      "Esta selección prioriza lugares elevados o con un entorno natural capaz de ofrecer planes a primera y última hora del día. Las temperaturas mostradas son referencias de verano del destino: antes de reservar hay que comprobar el pronóstico y los avisos oficiales para las fechas concretas.",
    ],
    strategy:
      "Desde Madrid conviene comparar primero la sierra cercana con destinos algo más lejanos del Sistema Central e Ibérico. Para una sola noche puede compensar reducir kilómetros; para dos o tres, una diferencia térmica mayor y un alojamiento bien acondicionado suelen pesar más.",
    routeAdvice:
      "Las salidas de viernes y los regresos de domingo pueden cambiar mucho la duración real del viaje. Comprueba el itinerario en la DGT, evita fijar una actividad exigente en la franja central del día y conserva una alternativa por si el pronóstico cambia.",
    usefulFor: [
      "Una noche improvisada con poco equipaje",
      "Senderismo temprano y descanso por la tarde",
      "Familias que buscan naturaleza sin recorrer media península",
      "Teletrabajo de dos o tres días en un entorno más templado",
    ],
    areaIdeas: [
      {
        name: "Sistema Central",
        reason:
          "Permite comparar pueblos de sierra a distancias razonables, prestando atención a altitud, sombra y mínima nocturna.",
      },
      {
        name: "Serranía de Cuenca",
        reason:
          "Puede encajar en una escapada de más de una noche por su combinación de altitud, pinares y planes de naturaleza.",
      },
      {
        name: "Sistema Ibérico",
        reason:
          "Amplía el radio de búsqueda cuando el objetivo principal es descansar por la noche y no solo estar cerca.",
      },
    ],
    faqs: [
      {
        question: "¿Dónde hace menos calor cerca de Madrid?",
        answer:
          "No hay un único ganador para todo el verano. Los destinos elevados de los sistemas Central e Ibérico suelen ser buenos candidatos, pero la mejor opción depende del episodio concreto, especialmente de la mínima nocturna, el viento y la nubosidad.",
      },
      {
        question: "¿Cuánta distancia merece la pena recorrer?",
        answer:
          "Para una noche suele ser práctico limitar el radio; para un fin de semana puede compensar ampliar la búsqueda si la diferencia nocturna prevista es clara. FrescoCerca usa distancia geográfica como orientación, no como tiempo exacto de conducción.",
      },
    ],
  },
  {
    slug: "sevilla",
    name: "Sevilla",
    province: "Sevilla",
    lat: 37.3891,
    lng: -5.9845,
    title: "Escapadas frescas desde Sevilla",
    description:
      "Ideas para escapar del calor desde Sevilla comparando sierras, altitud, noches de verano y planes tranquilos sin confundir clima habitual con previsión.",
    introduction: [
      "Cuando Sevilla encadena días muy calurosos, buscar únicamente una máxima algo menor puede quedarse corto. Para descansar, la mínima nocturna, la ventilación y las características reales del alojamiento son decisivas.",
      "En esta guía de salida se comparan destinos con altitud y entornos serranos, desde opciones relativamente cercanas hasta alternativas para un fin de semana completo. Ninguna referencia sustituye el pronóstico de AEMET para la fecha del viaje.",
    ],
    strategy:
      "Empieza por las sierras occidentales si prima la cercanía y amplía hacia áreas más elevadas de Cádiz, Málaga o Granada cuando puedas pasar dos noches. En episodios extensos, la costa no siempre garantiza una noche confortable por la humedad.",
    routeAdvice:
      "Sal con agua suficiente, evita dejar personas o animales dentro del coche y revisa avisos por calor e incendios. Si el alojamiento no especifica climatización o ventilación, pregunta antes de reservar: estar en un pueblo serrano no garantiza que todas las habitaciones sean frescas.",
    usefulFor: [
      "Dormir fuera durante una noche especialmente cálida",
      "Combinar piscina natural y paseo al atardecer",
      "Buscar un alojamiento rural con sombra",
      "Viajar con perro evitando el asfalto en las horas centrales",
    ],
    areaIdeas: [
      {
        name: "Sierra de Aracena",
        reason:
          "Es una primera zona lógica por cercanía relativa, arbolado y oferta rural; conviene comparar pueblo, cota y alojamiento.",
      },
      {
        name: "Sierra de Grazalema",
        reason:
          "Su relieve ofrece alternativas interesantes, aunque la previsión local y el acceso concreto deben decidir el plan.",
      },
      {
        name: "Sierras altas de Granada",
        reason:
          "Para una estancia de varias noches, la altitud puede aportar una diferencia más clara que una escapada muy próxima.",
      },
    ],
    faqs: [
      {
        question: "¿Es siempre más fresca la costa que Sevilla?",
        answer:
          "No necesariamente en términos de confort nocturno. La brisa puede ayudar, pero una humedad alta reduce la sensación de alivio. Conviene comparar temperatura mínima, humedad, viento y condiciones del alojamiento.",
      },
      {
        question: "¿Qué dato debo mirar primero?",
        answer:
          "Si la prioridad es dormir, mira la mínima prevista y no solo la máxima. Después comprueba altitud, ventilación, sombra y si el alojamiento dispone de climatización.",
      },
    ],
  },
  {
    slug: "cordoba",
    name: "Córdoba",
    province: "Córdoba",
    lat: 37.8882,
    lng: -4.7794,
    title: "Escapadas frescas desde Córdoba",
    description:
      "Encuentra candidatos para una escapada con noches más suaves desde Córdoba, comparando altitud, entorno, distancia aproximada y servicios.",
    introduction: [
      "Desde Córdoba hay una diferencia importante entre cambiar de paisaje y cambiar de condiciones térmicas. Un destino rural cercano puede ser agradable, pero la altitud y la mínima nocturna son las que indican si permitirá descansar mejor.",
      "La selección favorece destinos interiores elevados y zonas serranas donde sea posible organizar el día alrededor de paseos tempranos, sombra y actividades tranquilas. Los valores son climáticos y orientativos, nunca una predicción para una fecha concreta.",
    ],
    strategy:
      "Para una escapada corta, compara Sierra Morena con destinos de mayor cota hacia Jaén y Granada. Si la previsión regional muestra calor generalizado, puede ser más sensato escoger un buen alojamiento cercano que sumar horas de carretera por una diferencia pequeña.",
    routeAdvice:
      "Planifica la llegada fuera de las horas de máxima insolación y confirma aparcamiento sombreado si viajas con niños o animales. Las carreteras de sierra pueden alargar el último tramo aunque la distancia en línea recta parezca reducida.",
    usefulFor: [
      "Parejas que buscan una noche rural tranquila",
      "Familias que valoran piscina y zonas sombreadas",
      "Rutas cortas al amanecer",
      "Escapadas de dos noches hacia cotas más altas",
    ],
    areaIdeas: [
      {
        name: "Sierra Morena cordobesa",
        reason:
          "Funciona como primer radio de búsqueda para reducir conducción, verificando siempre la mínima prevista.",
      },
      {
        name: "Sierras de Jaén",
        reason:
          "Ofrecen pueblos y espacios naturales a distintas cotas, útiles para comparar alternativas de fin de semana.",
      },
      {
        name: "Entornos elevados de Granada",
        reason:
          "Pueden justificar un trayecto mayor cuando la prioridad es obtener noches claramente más templadas.",
      },
    ],
    faqs: [
      {
        question: "¿Basta con ir a la sierra para encontrar menos calor?",
        answer:
          "No. Dentro de una misma sierra cambian mucho la cota, la orientación y la ventilación. La previsión local y el tipo de alojamiento siguen siendo imprescindibles.",
      },
      {
        question: "¿Cómo comparo dos destinos?",
        answer:
          "Usa la mínima nocturna como criterio principal, después la máxima, la altitud, la distancia real por carretera y los servicios que necesitarás durante las horas centrales.",
      },
    ],
  },
  {
    slug: "jaen",
    name: "Jaén",
    province: "Jaén",
    lat: 37.7796,
    lng: -3.7849,
    title: "Escapadas frescas desde Jaén",
    description:
      "Compara pueblos de sierra y destinos elevados para preparar una escapada menos calurosa desde Jaén con criterios verificables.",
    introduction: [
      "Jaén tiene la ventaja de estar rodeada por sistemas montañosos, pero no todos los pueblos de la provincia ofrecen la misma noche de verano. Cota, exposición y forma urbana producen diferencias que merece la pena comprobar.",
      "Estas propuestas sirven para elaborar una lista corta de candidatos. Antes de salir, compara el pronóstico horario, los avisos oficiales, el acceso por carretera y los servicios disponibles.",
    ],
    strategy:
      "Prioriza primero la cota y la mínima nocturna, y utiliza la distancia para desempatar. Cazorla, Segura, Las Villas y las sierras hacia Granada permiten explorar perfiles distintos sin convertir necesariamente la escapada en un viaje largo.",
    routeAdvice:
      "En zonas de montaña la distancia lineal oculta curvas y desnivel. Consulta el tiempo real de ruta, reposta con antelación y no improvises actividades en áreas afectadas por avisos meteorológicos o restricciones por incendio.",
    usefulFor: [
      "Escapadas de naturaleza sin desplazamientos extremos",
      "Observación de estrellas con planificación responsable",
      "Alojamientos rurales para dos noches",
      "Planes de amanecer y atardecer",
    ],
    areaIdeas: [
      {
        name: "Sierras de Cazorla, Segura y Las Villas",
        reason:
          "Reúnen localidades a cotas diferentes, por lo que conviene comparar el punto exacto y no solo el parque natural.",
      },
      {
        name: "Sierra Mágina",
        reason:
          "La proximidad permite valorar una salida breve, siempre condicionada por el pronóstico local.",
      },
      {
        name: "Altiplanos granadinos",
        reason:
          "Amplían el abanico para un fin de semana cuando se busca una noche potencialmente más fresca.",
      },
    ],
    faqs: [
      {
        question: "¿Cuál es el pueblo más fresco de Jaén?",
        answer:
          "No existe un ganador permanente: cambia según la situación atmosférica. La altitud ayuda, pero deben compararse la mínima prevista, el viento, la exposición y el alojamiento concreto.",
      },
      {
        question: "¿Sirven las medias de verano para decidir?",
        answer:
          "Sirven para descubrir candidatos, no para cerrar el viaje. La decisión final debe hacerse con previsiones cercanas a la fecha y fuentes oficiales.",
      },
    ],
  },
  {
    slug: "ubeda",
    name: "Úbeda",
    province: "Jaén",
    lat: 38.011,
    lng: -3.371,
    title: "Escapadas frescas desde Úbeda",
    description:
      "Descubre destinos serranos y elevados para salir del calor desde Úbeda, con una comparación honesta de clima, distancia y comodidad.",
    introduction: [
      "Desde Úbeda, la cercanía de varias sierras permite diseñar escapadas cortas, pero elegir bien exige bajar al detalle. Dos alojamientos separados por pocos kilómetros pueden tener distinta altitud, orientación y capacidad para ventilar durante la noche.",
      "FrescoCerca utiliza datos estivales de referencia para ordenar posibilidades, no para afirmar qué tiempo hará. La previsión oficial de los días próximos debe ser siempre la última comprobación.",
    ],
    strategy:
      "El radio inicial puede centrarse en Cazorla, Segura y puntos altos del entorno. Para dos o tres noches, amplía hacia Albacete o Granada y compara la diferencia térmica prevista con el tiempo total de carretera.",
    routeAdvice:
      "Verifica el último tramo antes de salir: algunos alojamientos rurales requieren accesos lentos. Lleva agua, evita recorridos sin sombra a mediodía y confirma las condiciones para mascotas si viajas con ellas.",
    usefulFor: [
      "Fin de semana rural desde La Loma",
      "Dormir a mayor cota sin cruzar España",
      "Viajes con flexibilidad para cambiar de destino",
      "Planes tranquilos cerca de espacios naturales",
    ],
    areaIdeas: [
      {
        name: "Entorno de Cazorla",
        reason:
          "Es una búsqueda natural desde Úbeda, pero la cota exacta y el acceso pueden importar más que la distancia.",
      },
      {
        name: "Sierra de Segura",
        reason:
          "Aporta candidatos para estancias de varias noches y planes centrados en naturaleza.",
      },
      {
        name: "Sierras de Albacete",
        reason:
          "Ofrecen una dirección alternativa cuando la previsión aconseja ampliar el radio hacia el este.",
      },
    ],
    faqs: [
      {
        question: "¿Qué destino fresco queda más cerca de Úbeda?",
        answer:
          "La respuesta cambia con el tiempo y el acceso por carretera. Las sierras jiennenses son el primer ámbito a comparar, pero FrescoCerca muestra distancia geográfica, no promete tiempos de conducción.",
      },
      {
        question: "¿Es mejor reservar en el pueblo o en un alojamiento aislado?",
        answer:
          "Depende de la ventilación, la sombra y los servicios que necesites. Un alojamiento aislado puede tener buen entorno, pero conviene comprobar acceso, cobertura, agua y climatización.",
      },
    ],
  },
  {
    slug: "murcia",
    name: "Murcia",
    province: "Región de Murcia",
    lat: 37.9922,
    lng: -1.1307,
    title: "Escapadas frescas desde Murcia",
    description:
      "Compara montaña, interior y costa para encontrar una escapada potencialmente más fresca desde Murcia sin guiarte solo por la máxima.",
    introduction: [
      "Desde Murcia, elegir entre costa y montaña requiere mirar el confort completo. La brisa marina puede aliviar durante el día, pero la humedad puede mantener noches difíciles; la altitud suele favorecer mínimas menores, aunque no todos los episodios se comportan igual.",
      "Esta página propone candidatos basados en referencias de verano, altitud y distancia geográfica. Consulta siempre la predicción horaria y los avisos oficiales antes de desplazarte.",
    ],
    strategy:
      "Compara primero las sierras del noroeste murciano y de Albacete con opciones interiores de mayor cota. Deja la costa como una alternativa que debe evaluarse por humedad, viento y mínima, no solo por la temperatura máxima anunciada.",
    routeAdvice:
      "En verano, una salida temprana reduce exposición y retenciones. Si vas a un espacio natural, confirma restricciones de acceso, disponibilidad de agua y nivel de riesgo de incendio; no dependas únicamente de un mapa turístico.",
    usefulFor: [
      "Escapadas de montaña desde el sureste",
      "Comparar costa y altitud con datos",
      "Viajes con actividades antes de las 11:00",
      "Estancias rurales de dos o tres noches",
    ],
    areaIdeas: [
      {
        name: "Noroeste de Murcia",
        reason:
          "Combina proximidad relativa y mayor altitud; cada localidad debe contrastarse con la previsión concreta.",
      },
      {
        name: "Sierras de Albacete",
        reason:
          "Pueden ofrecer noches más llevaderas en determinados episodios y una oferta natural distinta.",
      },
      {
        name: "Interior de Alicante",
        reason:
          "Permite ampliar la comparación sin asumir que la franja costera será automáticamente la opción más fresca.",
      },
    ],
    faqs: [
      {
        question: "¿La playa es la mejor escapatoria al calor de Murcia?",
        answer:
          "No siempre. La brisa puede mejorar la tarde, pero la humedad y una mínima alta pueden empeorar el descanso. Compara el pronóstico horario completo.",
      },
      {
        question: "¿Qué aporta la altitud?",
        answer:
          "Suele favorecer temperaturas menores, especialmente por la noche, pero no garantiza confort. También influyen viento, orientación, superficie urbana y características del alojamiento.",
      },
    ],
  },
  {
    slug: "zaragoza",
    name: "Zaragoza",
    province: "Zaragoza",
    lat: 41.6488,
    lng: -0.8891,
    title: "Escapadas frescas desde Zaragoza",
    description:
      "Busca escapadas de montaña desde Zaragoza comparando Pirineos y Sistema Ibérico con distancia, altitud y noches estivales de referencia.",
    introduction: [
      "Zaragoza ocupa una posición útil para comparar dos grandes direcciones: Pirineos y Sistema Ibérico. La mejor no es siempre la más alta ni la más conocida; también cuentan la ruta, la exposición del valle y la previsión nocturna.",
      "Los destinos se ordenan como candidatos de planificación. Las medias estivales ayudan a explorar, pero no describen el tiempo de un fin de semana concreto.",
    ],
    strategy:
      "Para una noche, busca el equilibrio entre cota y tiempo de viaje. En una estancia más larga puedes ampliar hacia valles pirenaicos o sierras turolenses, comparando la mínima prevista y evitando añadir carretera por una diferencia marginal.",
    routeAdvice:
      "El cierzo, las tormentas de montaña y los cambios rápidos de tiempo requieren revisar el pronóstico incluso en días cálidos. Consulta accesos y aparcamiento, y lleva una capa ligera si el plan incluye cotas altas al amanecer.",
    usefulFor: [
      "Escapadas de montaña de una o dos noches",
      "Comparar Pirineo y Sistema Ibérico",
      "Rutas tempranas con regreso antes de la tarde",
      "Viajes que combinan naturaleza y pueblos con servicios",
    ],
    areaIdeas: [
      {
        name: "Pirineo aragonés",
        reason:
          "Ofrece un gradiente amplio de altitudes, pero conviene revisar valle, orientación y tiempo real de acceso.",
      },
      {
        name: "Sierra de Albarracín",
        reason:
          "Es una alternativa hacia el Sistema Ibérico para fines de semana centrados en paisaje y descanso nocturno.",
      },
      {
        name: "Moncayo y entorno",
        reason:
          "Permite plantear escapadas más próximas, siempre contrastando la previsión de la localidad elegida.",
      },
    ],
    faqs: [
      {
        question: "¿Pirineos o Teruel para huir del calor desde Zaragoza?",
        answer:
          "Depende del episodio, la duración del viaje y el presupuesto. Compara la mínima prevista, la altitud del alojamiento y el tiempo real de acceso; no solo la reputación fresca del área.",
      },
      {
        question: "¿Por qué puede refrescar mucho por la noche?",
        answer:
          "La altitud, el aire seco y la pérdida de calor nocturna pueden producir cambios amplios. Aun en verano, lleva una capa adecuada si vas a estar fuera temprano o al anochecer.",
      },
    ],
  },
  {
    slug: "toledo",
    name: "Toledo",
    province: "Toledo",
    lat: 39.8628,
    lng: -4.0273,
    title: "Escapadas frescas desde Toledo",
    description:
      "Selecciona una escapada con noches potencialmente más suaves desde Toledo comparando montes, sierras y destinos de mayor altitud.",
    introduction: [
      "Desde Toledo, desplazarse hacia un entorno rural no garantiza por sí solo una diferencia térmica. Los valles interiores pueden conservar mucho calor, mientras que algunas zonas elevadas ofrecen noches más favorables.",
      "La selección combina distancia geográfica, altitud y referencias estivales para reducir opciones. Confirma después la previsión y la ruta exacta; FrescoCerca no muestra observaciones meteorológicas en directo.",
    ],
    strategy:
      "Comienza por Montes de Toledo y Sierra de San Vicente si buscas proximidad. Para dos noches, compara también Gredos, Sistema Central y Serranía de Cuenca, valorando si la diferencia prevista compensa el trayecto.",
    routeAdvice:
      "No conviertas la distancia en línea recta en tiempo de viaje: los últimos kilómetros hacia la sierra pueden ser lentos. Comprueba DGT, combustible, acceso y disponibilidad de sombra o climatización.",
    usefulFor: [
      "Una escapada corta desde el centro peninsular",
      "Alojamiento rural con planes tranquilos",
      "Viajes en familia con piscina o río autorizado",
      "Comparar sierras en varias direcciones",
    ],
    areaIdeas: [
      {
        name: "Montes de Toledo",
        reason:
          "Son la referencia más próxima, pero la elevación y la mínima cambian entre municipios y alojamientos.",
      },
      {
        name: "Gredos",
        reason:
          "Amplía la búsqueda hacia cotas mayores para una estancia de fin de semana.",
      },
      {
        name: "Serranía de Cuenca",
        reason:
          "Puede ser una alternativa cuando se dispone de más tiempo y la previsión favorece el este.",
      },
    ],
    faqs: [
      {
        question: "¿Dónde puedo dormir con menos calor cerca de Toledo?",
        answer:
          "Los destinos de sierra son buenos candidatos, pero no hay una respuesta fija. Compara la mínima de cada localidad y pregunta por las condiciones de la habitación.",
      },
      {
        question: "¿Qué diferencia térmica justifica el viaje?",
        answer:
          "Es una decisión personal. Valora especialmente la mínima nocturna, el tiempo de conducción, el coste y la calidad del alojamiento en lugar de perseguir únicamente la máxima más baja.",
      },
    ],
  },
  {
    slug: "valladolid",
    name: "Valladolid",
    province: "Valladolid",
    lat: 41.6523,
    lng: -4.7245,
    title: "Escapadas frescas desde Valladolid",
    description:
      "Explora destinos montañosos para una escapada más fresca desde Valladolid, con criterios sobre altitud, mínima nocturna y distancia.",
    introduction: [
      "Las noches de la meseta pueden variar mucho, por lo que una escapada desde Valladolid debe decidirse con el episodio concreto en mente. La cercanía a montaña abre varias direcciones, pero la mejor combinación depende de la duración y del acceso.",
      "Los datos estivales de referencia permiten descubrir lugares; no sustituyen una previsión meteorológica ni garantizan una temperatura durante la estancia.",
    ],
    strategy:
      "Para reducir carretera, compara primero áreas elevadas de Palencia, León y Segovia. Si dispones de varios días, la Cordillera Cantábrica permite ampliar opciones, teniendo en cuenta que la meteorología de montaña puede cambiar deprisa.",
    routeAdvice:
      "Presta atención a tormentas, viento y descensos nocturnos. Confirma la ruta y los servicios antes de partir, especialmente en localidades pequeñas donde los horarios y la oferta pueden ser limitados.",
    usefulFor: [
      "Fin de semana en la Cordillera Cantábrica",
      "Escapadas de pueblo y montaña",
      "Senderismo suave a primera hora",
      "Viajes que priorizan la mínima nocturna",
    ],
    areaIdeas: [
      {
        name: "Montaña Palentina",
        reason:
          "Es una dirección natural para combinar mayor cota y una estancia de naturaleza.",
      },
      {
        name: "Sierras de León",
        reason:
          "Ofrecen distintas alternativas para ampliar la búsqueda durante episodios cálidos.",
      },
      {
        name: "Sistema Central segoviano",
        reason:
          "Permite comparar una ruta hacia el sur con las opciones cantábricas del norte.",
      },
    ],
    faqs: [
      {
        question: "¿Cuál es la zona de montaña más práctica desde Valladolid?",
        answer:
          "Depende de la carretera, el municipio y la duración. Montaña Palentina y áreas de León o Segovia son buenos puntos de partida para comparar, no una garantía meteorológica.",
      },
      {
        question: "¿Necesito ropa de abrigo en verano?",
        answer:
          "En cotas altas la temperatura puede bajar al anochecer y cambiar con tormentas o viento. Revisa la previsión y lleva una capa ligera adecuada al plan.",
      },
    ],
  },
  {
    slug: "barcelona",
    name: "Barcelona",
    province: "Barcelona",
    lat: 41.3874,
    lng: 2.1686,
    title: "Escapadas frescas desde Barcelona",
    description:
      "Encuentra ideas de montaña e interior para dormir con más frescor desde Barcelona, comparando altitud, humedad, distancia y condiciones reales del alojamiento.",
    introduction: [
      "Desde Barcelona, la temperatura no cuenta toda la historia: la humedad y la isla de calor urbana pueden hacer que una mínima aparentemente moderada se sienta pesada. Por eso una escapada debe compararse por la noche prevista, la ventilación y el tipo de entorno, no solo por una máxima inferior.",
      "Los candidatos de FrescoCerca ayudan a explorar cotas y paisajes distintos. Antes de reservar, contrasta el pronóstico horario, el estado de las carreteras y las condiciones de la habitación para las fechas exactas del viaje.",
    ],
    strategy:
      "Para una sola noche, empieza por el interior cercano y evita convertir una diferencia térmica pequeña en un trayecto largo. Para un fin de semana, amplía la comparación hacia el Prepirineo y los valles de montaña, dando prioridad a la mínima nocturna prevista y a la ventilación del alojamiento.",
    routeAdvice:
      "Las rutas hacia zonas de montaña y costa interior pueden concentrar tráfico en viernes y domingo. Confirma el tiempo real de desplazamiento, reserva aparcamiento si es necesario y mantén un plan alternativo ante tormentas, restricciones de acceso o episodios de calor persistente.",
    usefulFor: [
      "Escapadas de una o dos noches desde el área metropolitana",
      "Viajes que priorizan dormir mejor frente a una máxima aislada",
      "Planes de bosque, pueblo y paseos al atardecer",
      "Alojamientos rurales con sombra y ventilación comprobable",
    ],
    areaIdeas: [
      {
        name: "Montseny y sierras prelitorales",
        reason:
          "Permiten comparar una salida relativamente próxima, verificando siempre la cota exacta y la temperatura nocturna prevista.",
      },
      {
        name: "Prepirineo catalán",
        reason:
          "Amplía la búsqueda para estancias de más de una noche con perfiles de altitud y valle muy diferentes.",
      },
      {
        name: "Interior de Tarragona y Lleida",
        reason:
          "Ofrece alternativas que conviene valorar por viento, sequedad, sombra y acceso, no solo por distancia.",
      },
    ],
    faqs: [
      {
        question: "¿Dónde dormir con menos calor cerca de Barcelona?",
        answer:
          "Las zonas elevadas e interiores son buenos puntos de partida, pero no existe una respuesta fija. Compara la mínima prevista, la humedad, la ventilación y el alojamiento concreto antes de decidir.",
      },
      {
        question: "¿La montaña garantiza una noche fresca?",
        answer:
          "No. Un valle poco ventilado, una habitación orientada al oeste o varios días de calor acumulado pueden reducir el alivio. La montaña sirve para descubrir candidatos, no para prometer el tiempo.",
      },
    ],
  },
  {
    slug: "valencia",
    name: "Valencia",
    province: "Valencia",
    lat: 39.4699,
    lng: -0.3763,
    title: "Escapadas frescas desde Valencia",
    description:
      "Compara sierras e interior desde Valencia para preparar una escapada con noches potencialmente más llevaderas, sin confundir brisa, humedad y altitud.",
    introduction: [
      "Desde Valencia, una tarde de costa puede resultar agradable por la brisa, pero eso no asegura una noche cómoda si la humedad se mantiene alta. Al buscar descanso, comparar la mínima y la sensación de humedad suele ser más útil que perseguir una máxima menor.",
      "Esta guía propone direcciones de interior y montaña como punto de partida. Las referencias climáticas ordenan posibilidades, mientras que la previsión oficial, la ruta real y el alojamiento deciden si la escapada encaja en tus fechas.",
    ],
    strategy:
      "Empieza por sierras valencianas y castellonenses si quieres contener el trayecto. Para dos o tres noches, compara también altiplanos de Teruel y la Serranía de Cuenca; la clave es valorar si la ventaja nocturna prevista compensa las horas de carretera.",
    routeAdvice:
      "En verano conviene salir pronto y revisar los últimos kilómetros hacia casas rurales o áreas de baño autorizadas. Comprueba avisos, restricciones por incendio, disponibilidad de sombra y condiciones de acceso antes de depender de un plan al aire libre.",
    usefulFor: [
      "Escapadas de interior desde la costa mediterránea",
      "Comparar humedad nocturna y mayor altitud",
      "Fines de semana de pueblo, bosque y baño autorizado",
      "Viajes en familia con alternativas para las horas centrales",
    ],
    areaIdeas: [
      {
        name: "Sierras del interior valenciano",
        reason:
          "Permiten crear una lista corta sin asumir que cualquier localidad de interior tendrá el mismo comportamiento nocturno.",
      },
      {
        name: "Interior de Castellón",
        reason:
          "Aporta cotas y orientaciones distintas para comparar con la previsión de un episodio concreto.",
      },
      {
        name: "Teruel y Serranía de Cuenca",
        reason:
          "Son alternativas para una estancia más larga cuando se busca ampliar el radio y priorizar el descanso.",
      },
    ],
    faqs: [
      {
        question: "¿La costa de Valencia es siempre la opción más fresca?",
        answer:
          "No necesariamente para dormir. La brisa puede ayudar durante la tarde, pero una humedad alta y una mínima elevada pueden restar confort. Compara la previsión horaria completa.",
      },
      {
        question: "¿Qué debo preguntar al alojamiento?",
        answer:
          "Pregunta por sombra de tarde, ventilación cruzada, ventilador o climatización, acceso y condiciones de piscina o zonas interiores. Esos detalles cambian mucho la experiencia en una noche cálida.",
      },
    ],
  },
  {
    slug: "malaga",
    name: "Málaga",
    province: "Málaga",
    lat: 36.7213,
    lng: -4.4214,
    title: "Escapadas frescas desde Málaga",
    description:
      "Explora escapadas de sierra desde Málaga para comparar noches, altitud, humedad y accesos antes de reservar una salida de verano.",
    introduction: [
      "Málaga permite elegir entre costa e interior, pero la decisión no se reduce a alejarse del mar. La costa puede ofrecer brisa, mientras que la humedad mantiene algunas noches cálidas; la montaña puede bajar la temperatura, aunque exige comprobar carretera, cota y exposición.",
      "FrescoCerca presenta candidatos para orientar una búsqueda responsable. Los datos son referencias de verano y no sustituyen la predicción oficial ni las condiciones concretas de un alojamiento.",
    ],
    strategy:
      "Para una salida breve, compara sierras próximas sin dar por hecho que el pueblo más cercano será el que mejor se duerma. Para un fin de semana completo, amplía hacia cotas altas de Granada o Cádiz y elige según mínima prevista, servicios y tiempo de ruta.",
    routeAdvice:
      "La carretera de montaña puede ser lenta aunque el destino parezca cercano en el mapa. Revisa avisos de calor, viento e incendio, evita iniciar rutas a mediodía y confirma si el alojamiento cuenta con sombra, ventilación y aparcamiento adecuado.",
    usefulFor: [
      "Escapadas de montaña desde la Costa del Sol",
      "Planes tranquilos de dos noches con alojamiento rural",
      "Comparar brisa costera y frescor de altitud",
      "Viajes con mascota fuera de las horas de máxima insolación",
    ],
    areaIdeas: [
      {
        name: "Sierras del interior malagueño",
        reason:
          "Son un primer radio razonable para comparar altitud, sombra y la previsión nocturna de cada localidad.",
      },
      {
        name: "Serranía de Ronda y Grazalema",
        reason:
          "Aportan relieves y orientaciones distintas para una estancia de fin de semana, siempre con comprobación previa del acceso.",
      },
      {
        name: "Alpujarras y sierras granadinas",
        reason:
          "Permiten ampliar la búsqueda hacia cotas más altas cuando la duración del viaje justifica más carretera.",
      },
    ],
    faqs: [
      {
        question: "¿Montaña o costa para escapar del calor desde Málaga?",
        answer:
          "Depende de la previsión, la humedad y el objetivo del viaje. Compara la mínima nocturna, el viento y las condiciones de la habitación; no hay una dirección ganadora todo el verano.",
      },
      {
        question: "¿Es suficiente con elegir un alojamiento rural?",
        answer:
          "No. Revisa orientación, ventilación, sombra y acceso. Un alojamiento rural puede seguir acumulando calor si recibe sol de tarde o no permite crear corriente durante la noche.",
      },
    ],
  },
  {
    slug: "bilbao",
    name: "Bilbao",
    province: "Bizkaia",
    lat: 43.263,
    lng: -2.935,
    title: "Escapadas frescas desde Bilbao",
    description:
      "Prepara una escapada desde Bilbao comparando valles, costa y montaña con atención a humedad, lluvia, altitud y el tipo de plan que buscas.",
    introduction: [
      "En Bilbao, buscar una escapada más fresca no siempre significa buscar una temperatura mucho menor. En muchos episodios el factor decisivo es la humedad, la ventilación, la lluvia o la posibilidad de encontrar actividades cómodas si el tiempo cambia.",
      "Esta guía sirve para ordenar alternativas de montaña y costa con honestidad. Las referencias estivales ayudan a descubrir destinos, pero la decisión debe apoyarse en la previsión horaria, los avisos y las condiciones de carretera del día de salida.",
    ],
    strategy:
      "Si buscas una noche tranquila, compara primero la mínima, la humedad y la ventilación del alojamiento. Para una escapada más activa, añade previsión de lluvia, visibilidad y estado de senderos; una cota mayor no compensa si el plan depende de un acceso o una actividad que no será segura.",
    routeAdvice:
      "El tiempo puede cambiar rápido entre costa, valle y montaña. Lleva capa impermeable incluso en verano, confirma aparcamiento y normas de los espacios naturales, y prepara una alternativa interior si la lluvia o la niebla cambian el plan.",
    usefulFor: [
      "Escapadas de naturaleza de una o dos noches",
      "Planes que equilibran frescor y previsión de lluvia",
      "Paseos tempranos y gastronomía de pueblo",
      "Viajes con alternativas bajo techo",
    ],
    areaIdeas: [
      {
        name: "Montes y parques del entorno vasco",
        reason:
          "Permiten comparar proximidad, exposición y servicios sin depender de un trayecto largo.",
      },
      {
        name: "Valles de Cantabria y norte de Burgos",
        reason:
          "Amplían la búsqueda con perfiles de humedad, relieve y alojamiento diferentes.",
      },
      {
        name: "Navarra atlántica y prepirenaica",
        reason:
          "Ofrece una dirección alternativa para estancias más largas, revisando siempre el tiempo de ruta y la meteorología local.",
      },
    ],
    faqs: [
      {
        question: "¿Hace falta escapar del calor desde Bilbao?",
        answer:
          "Depende del episodio. Esta guía no presupone una ola de calor: ayuda a comparar descanso, humedad, lluvia y tipo de plan cuando quieres salir de la ciudad.",
      },
      {
        question: "¿Qué pesa más: altitud o humedad?",
        answer:
          "Ambas importan. La altitud puede ayudar a enfriar, pero una noche húmeda o un alojamiento mal ventilado puede reducir el confort. Consulta la previsión horaria y las condiciones reales de la habitación.",
      },
    ],
  },
  {
    slug: "granada",
    name: "Granada",
    province: "Granada",
    lat: 37.1773,
    lng: -3.5986,
    title: "Escapadas frescas desde Granada",
    description:
      "Compara escapadas de altitud desde Granada para buscar noches más llevaderas con datos orientativos, acceso real y una planificación responsable.",
    introduction: [
      "Granada tiene cerca cotas muy diferentes, pero esa ventaja exige elegir con precisión. Un cambio de altitud puede ofrecer una noche más llevadera, aunque el relieve, la orientación y el tipo de edificio siguen influyendo mucho en cómo se descansa.",
      "Las propuestas de FrescoCerca sirven para descubrir candidatos, no para sustituir una previsión. Confirma la temperatura nocturna, los avisos, la carretera y las condiciones del alojamiento antes de convertir una referencia climática en una reserva.",
    ],
    strategy:
      "Para una noche, compara primero áreas elevadas con acceso sencillo y evita sumar carretera por una diferencia marginal. Para dos o tres noches, amplía hacia las Alpujarras, el altiplano y sierras vecinas, valorando tanto la mínima prevista como la exposición solar del alojamiento.",
    routeAdvice:
      "En rutas de montaña, el último tramo puede requerir más tiempo del que sugiere el mapa. Lleva agua, protección solar y una capa ligera para el atardecer; consulta restricciones, tormentas y riesgo de incendio antes de iniciar actividades fuera de zonas urbanas.",
    usefulFor: [
      "Dormir a mayor cota sin alejarse demasiado",
      "Escapadas rurales de una o dos noches",
      "Planes de amanecer, sombra y paseo al atardecer",
      "Viajes que comparan varias sierras antes de reservar",
    ],
    areaIdeas: [
      {
        name: "Alpujarras y laderas de Sierra Nevada",
        reason:
          "Aportan variedad de altitudes y orientaciones; conviene comparar el municipio y el alojamiento exactos.",
      },
      {
        name: "Altiplano granadino",
        reason:
          "Permite valorar otra dirección para una estancia tranquila, con atención al viento y al descenso nocturno.",
      },
      {
        name: "Sierras de Jaén y Albacete",
        reason:
          "Amplían el radio para un fin de semana cuando la previsión favorece una alternativa fuera de la provincia.",
      },
    ],
    faqs: [
      {
        question: "¿A qué zona debo ir desde Granada para dormir más fresco?",
        answer:
          "No hay una respuesta permanente. Las zonas de mayor cota son buenos candidatos, pero la elección final depende de la mínima prevista, la exposición, el acceso y la ventilación del alojamiento.",
      },
      {
        question: "¿La altitud elimina el riesgo de calor?",
        answer:
          "No. Puede haber sol intenso, poca sombra y cambios rápidos de tiempo. Planifica agua, horarios y descanso, y consulta siempre los avisos oficiales para tus fechas.",
      },
    ],
  },
];

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type GuideSource = {
  title: string;
  url: string;
  supports: string;
};

export type GuideToolkit = {
  title: string;
  introduction: string;
  checklistTitle: string;
  checklist: string[];
  messageTitle: string;
  messageLines: string[];
  decisionTitle: string;
  decisionRows: { label: string; text: string }[];
};

export type Guide = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  readingMinutes: number;
  published: string;
  updated: string;
  introduction: string[];
  sections: GuideSection[];
  takeaways: string[];
  faqs: { question: string; answer: string }[];
  sources: GuideSource[];
  toolkit?: GuideToolkit;
};

const foundationGuides: Guide[] = [
  {
    slug: "como-elegir-destino-fresco",
    title: "Cómo elegir un destino fresco sin dejarte engañar por una cifra",
    seoTitle: "Cómo elegir un destino fresco en verano",
    description:
      "Método práctico para comparar temperatura nocturna, altitud, humedad, alojamiento, ruta y previsión antes de reservar una escapada de verano.",
    eyebrow: "Guía de planificación",
    readingMinutes: 9,
    published: "2026-07-27",
    updated: "2026-08-17",
    introduction: [
      "Buscar «un sitio donde no haga calor» parece sencillo hasta que aparecen diez listas con pueblos distintos. El problema no suele estar en los nombres, sino en el criterio: una máxima media de julio no dice qué ocurrirá el sábado, ni cómo se sentirá una habitación a medianoche.",
      "Un destino fresco es el resultado de varias decisiones pequeñas. Esta guía propone un proceso verificable para pasar de una lista llamativa a una escapada que tenga sentido para tus fechas, tu origen y tu forma de viajar.",
    ],
    sections: [
      {
        heading: "Empieza por la noche, no por el récord de temperatura",
        paragraphs: [
          "Si tu objetivo principal es descansar, la mínima prevista suele ser más útil que la máxima. Una tarde moderada seguida de una noche cálida y húmeda puede resultar peor que un día soleado en un lugar donde refresca claramente después del atardecer.",
          "Compara el pronóstico horario de dos o tres localidades para la misma franja. Mira cuándo comienza a bajar la temperatura y qué valor mantiene entre la medianoche y las siete. Esa curva cuenta más que una cifra aislada publicada en una red social.",
        ],
        bullets: [
          "Temperatura mínima y hora a la que se alcanza",
          "Humedad relativa y viento durante la noche",
          "Persistencia del calor durante varios días",
          "Avisos oficiales y posibilidad de tormentas",
        ],
      },
      {
        heading: "Usa la altitud para descubrir, no para sentenciar",
        paragraphs: [
          "La altitud es un buen filtro inicial porque, en condiciones comparables, el aire suele enfriarse al ascender. Sin embargo, no existe una resta fija aplicable a todos los viajes: intervienen la masa de aire, el relieve, el viento, la nubosidad y la acumulación de calor en el entorno construido.",
          "Dos pueblos a una cota parecida pueden comportarse de manera diferente si uno ocupa un valle cerrado y el otro una ladera ventilada. Por eso FrescoCerca combina altitud con referencias climáticas, pero presenta cada lugar como candidato, no como promesa.",
        ],
      },
      {
        heading: "Comprueba el alojamiento como si fuera parte del clima",
        paragraphs: [
          "Una casa de piedra puede conservar una temperatura agradable o acumular calor tras varios días, según su orientación, ventilación y uso. Las fotografías rara vez responden a las preguntas que importan: si la habitación recibe sol de tarde, si se puede crear corriente o si el equipo de climatización alcanza el dormitorio.",
          "Escribe al alojamiento antes de pagar una tarifa no reembolsable. Una respuesta concreta vale más que una etiqueta genérica como «casa en la sierra». También conviene leer reseñas de los meses de julio y agosto, buscando comentarios sobre sueño, ruido y temperatura.",
        ],
        bullets: [
          "Orientación y presencia de sombra por la tarde",
          "Ventanas enfrentadas, ventilador o aire acondicionado",
          "Planta de la habitación y aislamiento del tejado",
          "Piscina, zonas interiores y política para mascotas",
        ],
      },
      {
        heading: "Calcula el alivio neto del viaje",
        paragraphs: [
          "Recorrer más kilómetros no siempre produce una escapada mejor. Suma combustible, peajes, atascos, hora de llegada y energía invertida. Para una sola noche, una diferencia térmica moderada cerca de casa puede ser más valiosa que una mínima espectacular tras cuatro horas de carretera.",
          "La distancia geográfica que mostramos sirve para ordenar candidatos, no equivale al itinerario. Abre la ruta real, revisa incidencias y comprueba el último tramo. En montaña, pocos kilómetros pueden requerir bastante tiempo.",
        ],
      },
      {
        heading: "Haz una comprobación final en tres momentos",
        paragraphs: [
          "Una semana antes puedes decidir la zona y reservar con cancelación razonable. Entre 72 y 48 horas antes, compara modelos y avisos; la víspera revisa el pronóstico horario, la carretera y las restricciones locales. Esta secuencia evita tanto improvisar tarde como confiar demasiado pronto en una previsión lejana.",
          "Guarda un plan B en otra dirección. Durante un episodio cálido, una tormenta, humo de incendios o un cambio de viento puede convertir el segundo candidato en una opción más responsable.",
        ],
      },
    ],
    takeaways: [
      "Prioriza la mínima nocturna si quieres dormir mejor.",
      "La altitud ayuda a filtrar, pero no garantiza el resultado.",
      "Verifica orientación y ventilación del alojamiento.",
      "Compara beneficio térmico con tiempo y coste de carretera.",
      "Toma la decisión final con previsión y avisos oficiales.",
    ],
    faqs: [
      {
        question: "¿Con cuánta antelación es fiable elegir el destino?",
        answer:
          "Puedes explorar y reservar con condiciones flexibles antes, pero la comprobación meteorológica decisiva debe hacerse en los días próximos al viaje. La incertidumbre aumenta cuanto más lejano está el plazo.",
      },
      {
        question: "¿La altitud garantiza noches frescas?",
        answer:
          "No. Es un indicador útil, pero intervienen la situación atmosférica, el relieve, la humedad, el viento y el propio alojamiento.",
      },
      {
        question: "¿FrescoCerca ofrece previsión en tiempo real?",
        answer:
          "No. Las fichas se basan en referencias climáticas y geográficas para descubrir candidatos. Antes de viajar debes consultar la predicción y los avisos de fuentes oficiales.",
      },
    ],
    sources: [
      {
        title: "AEMET — Predicción por horas para municipios",
        url: "https://www.aemet.es/es/zona_portada_destacada/predicion_municipios_horas",
        supports:
          "Evolución horaria de temperatura, sensación térmica, humedad, viento y avisos.",
      },
      {
        title: "AEMET — Avisos meteorológicos",
        url: "https://www.aemet.es/es/eltiempo/prediccion/avisos",
        supports:
          "Comprobación de fenómenos adversos antes de confirmar o iniciar el viaje.",
      },
      {
        title: "IDAE — Recomendaciones de ahorro energético en hogares",
        url: "https://www.idae.es/ahorra-energia/recomendaciones-para-el-ahorro-energetico-en-hogares",
        supports:
          "Protección solar, persianas y ventilación nocturna para reducir el calentamiento interior.",
      },
      {
        title: "Ministerio de Sanidad — Calor extremo",
        url: "https://www.sanidad.gob.es/areas/sanidadAmbiental/riesgosAmbientales/calorExtremo/home.htm",
        supports:
          "Riesgos para la salud, población vulnerable y medidas preventivas ante temperaturas excesivas.",
      },
    ],
  },
  {
    slug: "donde-hace-menos-calor-en-espana",
    title: "Dónde hace menos calor en España: cómo buscar por regiones y relieve",
    seoTitle: "Dónde hace menos calor en España en verano",
    description:
      "Una explicación útil de las zonas españolas que suelen ofrecer veranos más suaves y de por qué ningún mapa climático sustituye el pronóstico de tus fechas.",
    eyebrow: "Clima y territorio",
    readingMinutes: 10,
    published: "2026-07-27",
    updated: "2026-08-17",
    introduction: [
      "La pregunta «¿dónde hace menos calor en España?» no tiene una sola respuesta. Puede referirse a la tarde más suave, a la noche más fría, a menor sensación térmica o a un lugar donde sea fácil pasar las horas centrales bajo techo o entre árboles.",
      "España reúne costa atlántica, valles interiores, mesetas y cordilleras en distancias relativamente cortas. Entender esos patrones permite buscar mejor y evitar listas que presentan una media histórica como si fuera una garantía para el próximo fin de semana.",
    ],
    sections: [
      {
        heading: "Norte atlántico: máximas contenidas, pero atención a la humedad",
        paragraphs: [
          "Galicia, Asturias, Cantabria y País Vasco suelen aparecer en las búsquedas estivales porque la influencia atlántica modera muchos días. La nubosidad y la brisa pueden reducir la insolación, y la oferta de costa, valles y montaña permite cambiar de plan sin recorrer grandes distancias.",
          "Eso no significa ausencia de episodios cálidos. Las entradas de aire del sur pueden elevar las temperaturas, y una humedad alta modifica el confort. Compara el interior con el litoral y no presupongas que cualquier localidad del norte tendrá la misma noche.",
        ],
      },
      {
        heading: "Montaña: la cota crea oportunidades en casi todas las regiones",
        paragraphs: [
          "Pirineos, Cordillera Cantábrica, Sistema Central, Sistema Ibérico y las sierras Béticas contienen localidades elevadas capaces de ofrecer un contraste respecto a ciudades próximas. La ventaja de pensar en relieve es que abre opciones en Aragón, Castilla y León, Castilla-La Mancha, Andalucía y otras comunidades, no solo en la franja norte.",
          "Los valles pueden acumular calor durante el día y las tormentas cambian las condiciones con rapidez. Comprueba la altitud exacta del núcleo y del alojamiento: compartir comarca no implica compartir temperatura.",
        ],
        bullets: [
          "Pirineos y valles altos",
          "Montaña Cantábrica y macizos del noroeste",
          "Sistemas Central e Ibérico",
          "Sierras altas del sureste y Andalucía oriental",
        ],
      },
      {
        heading: "Mesetas elevadas: noches que pueden compensar días soleados",
        paragraphs: [
          "Algunas localidades de las dos mesetas y del Sistema Ibérico combinan aire relativamente seco y altitud. Pueden registrar tardes calurosas y, aun así, perder temperatura con mayor rapidez al anochecer que un entorno costero húmedo.",
          "Este perfil es interesante cuando el objetivo es dormir. No obstante, durante olas de calor prolongadas también se elevan las mínimas, por lo que la ventaja histórica debe confirmarse fecha a fecha.",
        ],
      },
      {
        heading: "Costa: brisa no equivale siempre a descanso nocturno",
        paragraphs: [
          "La proximidad del mar suaviza muchas máximas, pero también puede mantener humedad y mínimas elevadas. Una terraza con brisa puede sentirse agradable mientras una habitación mal ventilada conserva calor durante horas.",
          "Cuando compares costa e interior, revisa temperatura, humedad, viento y tipo de alojamiento. El mejor lugar para pasar la tarde no tiene por qué ser el mejor para dormir.",
        ],
      },
      {
        heading: "Cómo convertir un mapa de España en tres candidatos",
        paragraphs: [
          "Define primero tu radio real de viaje y el número de noches. Después filtra por altitud o influencia atlántica, descarta destinos bajo avisos o con acceso problemático y compara el pronóstico horario. Finalmente, revisa alojamiento y actividades compatibles con las horas centrales.",
          "No necesitas localizar el punto más frío del país. Necesitas una opción accesible, segura y suficientemente confortable para tu grupo. Esa diferencia convierte una curiosidad climática en una decisión útil.",
        ],
        bullets: [
          "Para una noche, reduce radio y prioriza facilidad de llegada.",
          "Para varias noches, amplía opciones y compara servicios.",
          "Con niños o mascotas, añade sombra, agua y acceso sanitario.",
          "Mantén una alternativa con cancelación razonable.",
        ],
      },
    ],
    takeaways: [
      "El norte atlántico y la montaña son buenos puntos de partida, no garantías.",
      "Para dormir, compara mínimas, humedad y ventilación.",
      "La altitud del alojamiento importa más que la etiqueta de la comarca.",
      "Un destino cercano y bien preparado puede superar al lugar más frío.",
      "La previsión oficial siempre decide el viaje concreto.",
    ],
    faqs: [
      {
        question: "¿Cuál es la región más fresca de España en verano?",
        answer:
          "El norte atlántico y las áreas de montaña suelen concentrar condiciones más suaves, pero no existe una región ganadora todos los días. Depende de la situación atmosférica y de qué entiendas por frescor.",
      },
      {
        question: "¿Dónde bajan más las temperaturas por la noche?",
        answer:
          "Las zonas elevadas, secas y poco urbanizadas pueden perder calor con rapidez, pero cada episodio es distinto. Consulta la mínima prevista para el municipio y el alojamiento.",
      },
      {
        question: "¿Las medias climáticas sirven para reservar?",
        answer:
          "Sirven para descubrir destinos y entender patrones. Para reservar una escapada sensible al calor, combínalas con condiciones flexibles y una previsión cercana a la fecha.",
      },
    ],
    sources: [
      {
        title: "AEMET — Valores climatológicos normales: ayuda",
        url: "https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/valoresclimatologicos/ayuda",
        supports:
          "Definición, alcance y límites de los valores climatológicos normales.",
      },
      {
        title: "AEMET — Publicación de valores normales",
        url: "https://www.aemet.es/es/conocermas/recursos_en_linea/publicaciones_y_estudios/publicaciones/detalles/Valores_normales",
        supports:
          "Contexto oficial para comparar patrones climáticos sin tratarlos como pronósticos.",
      },
      {
        title: "AEMET — Predicción por horas para municipios",
        url: "https://www.aemet.es/es/zona_portada_destacada/predicion_municipios_horas",
        supports:
          "Variables que deben comprobarse para una fecha concreta: temperatura, humedad, viento y sensación térmica.",
      },
    ],
  },
  {
    slug: "escapadas-frescas-con-ninos",
    title: "Escapadas frescas con niños: seguridad, descanso y planes que sí funcionan",
    seoTitle: "Escapadas frescas con niños en verano",
    description:
      "Planifica una escapada familiar de verano valorando temperatura nocturna, sombra, agua, trayecto, alojamiento y alternativas para las horas de más calor.",
    eyebrow: "Viajes en familia",
    readingMinutes: 9,
    published: "2026-07-27",
    updated: "2026-08-17",
    introduction: [
      "Viajar con niños durante un episodio cálido no consiste en encontrar una piscina y dar el plan por resuelto. El trayecto, la siesta, la temperatura de la habitación y la posibilidad de cambiar de actividad importan tanto como el destino.",
      "Una buena escapada familiar reduce decisiones sobre la marcha. El lugar más frío puede no ser el más cómodo si obliga a conducir demasiado, carece de sombra o no ofrece una alternativa interior cuando cambia el tiempo.",
    ],
    sections: [
      {
        heading: "Elige por ritmo familiar, no por una foto",
        paragraphs: [
          "Anota las horas a las que vuestra familia suele comer, descansar y acostarse. Después busca un destino donde esas franjas puedan transcurrir en un espacio confortable. Una ruta preciosa sin sombra a las doce no será útil si es el único plan disponible.",
          "Para bebés y niños pequeños, pregunta por persianas, ventilación, cuna y ubicación de la habitación. No asumas que una casa rural de montaña mantiene todas las estancias a la misma temperatura.",
        ],
      },
      {
        heading: "Reduce el riesgo durante el trayecto",
        paragraphs: [
          "Programa la salida fuera de las horas más calurosas cuando sea posible y evita depender de una única parada. Lleva más agua de la prevista, protectores solares adecuados y ropa accesible sin tener que vaciar el maletero.",
          "Nunca dejes a un menor dentro del vehículo, ni siquiera con una ventana abierta o durante una gestión breve. Comprueba el estado del tráfico, la autonomía y dónde podrías detenerte con seguridad.",
        ],
        bullets: [
          "Agua accesible para cada persona",
          "Paradas localizadas antes de salir",
          "Protección solar, gorra y ropa ligera",
          "Teléfonos cargados y ubicación del alojamiento guardada",
        ],
      },
      {
        heading: "Busca tres capas de plan",
        paragraphs: [
          "El plan A puede ser una actividad temprana al aire libre; el B, una visita interior o zona sombreada durante las horas centrales; el C, una tarde tranquila en el alojamiento. Esta estructura evita forzar una excursión porque ya estaba pagada.",
          "Piscinas naturales, ríos y embalses requieren información local: baño autorizado, corriente, profundidad, vigilancia y accesibilidad. Que un lugar aparezca en fotografías no significa que el baño sea legal o seguro ese día.",
        ],
      },
      {
        heading: "Evalúa la noche como parte de la salud familiar",
        paragraphs: [
          "Dormir mal afecta al día siguiente y puede agravar el cansancio por calor. Compara mínimas previstas y pregunta si la climatización llega al dormitorio infantil, si hay ruido al abrir ventanas y si se puede oscurecer la habitación.",
          "Lleva una capa ligera si el alojamiento está a mayor cota. El objetivo no es perseguir frío extremo, sino mantener un entorno estable y adaptable.",
        ],
      },
      {
        heading: "Cuándo cambiar o cancelar el plan",
        paragraphs: [
          "Replantea la salida si hay avisos meteorológicos adversos, humo o incendios próximos, tormentas intensas, acceso restringido o si algún miembro del grupo se encuentra enfermo. Una reserva no justifica asumir un riesgo evitable.",
          "Busca tarifas con cancelación razonable cuando el viaje dependa especialmente del tiempo. Guarda una alternativa urbana con climatización o una salida más corta para no sentir que cancelar equivale a perder todo el fin de semana.",
        ],
      },
    ],
    takeaways: [
      "El alojamiento y la noche importan tanto como el destino.",
      "Planifica las horas centrales antes de reservar.",
      "Verifica que el baño esté permitido y sea adecuado.",
      "Acorta el viaje si reduce estrés y exposición.",
      "Cambia el plan ante avisos o síntomas relacionados con el calor.",
    ],
    faqs: [
      {
        question: "¿Qué temperatura es segura para viajar con niños?",
        answer:
          "No hay una cifra única aplicable a todas las edades y situaciones. Sigue las recomendaciones sanitarias, limita la exposición, mantén hidratación y consulta a un profesional ante síntomas o condiciones médicas.",
      },
      {
        question: "¿Es mejor montaña o playa con niños?",
        answer:
          "Depende de la previsión, la humedad, el trayecto y los servicios. La montaña puede ofrecer noches más frescas; la playa puede tener brisa y más infraestructura. Compara el conjunto.",
      },
      {
        question: "¿Qué debe tener un alojamiento familiar en verano?",
        answer:
          "Sombra o buen aislamiento, ventilación o climatización efectiva, agua, un espacio para descansar en las horas centrales y una ubicación accesible para las necesidades de la familia.",
      },
    ],
    sources: [
      {
        title: "Ministerio de Sanidad — Calor extremo",
        url: "https://www.sanidad.gob.es/areas/sanidadAmbiental/riesgosAmbientales/calorExtremo/home.htm",
        supports:
          "Prevención, colectivos vulnerables y actuación frente a síntomas relacionados con el calor.",
      },
      {
        title: "DGT — Viajar seguro con niños",
        url: "https://www.dgt.es/muevete-con-seguridad/viaja-seguro/con-ninos/",
        supports:
          "Preparación del trayecto y seguridad de los menores dentro del vehículo.",
      },
      {
        title: "Protección Civil — Altas temperaturas",
        url: "https://www.proteccioncivil.es/coordinacion/gestion-de-riesgos/meterologicos/altas-temperaturas",
        supports:
          "Medidas de autoprotección y consulta de avisos durante episodios cálidos.",
      },
    ],
  },
  {
    slug: "escapadas-frescas-con-perro",
    title: "Escapadas frescas con perro: cómo elegir destino y evitar el calor",
    seoTitle: "Escapadas frescas con perro en verano",
    description:
      "Guía para preparar un viaje de verano con perro: suelo, sombra, agua, horarios, alojamiento, coche y señales para detener la actividad.",
    eyebrow: "Viajar con animales",
    readingMinutes: 9,
    published: "2026-07-27",
    updated: "2026-08-17",
    introduction: [
      "Un destino que resulta agradable para una persona puede seguir siendo demasiado caluroso para un perro. El suelo, la falta de sombra, el esfuerzo y el transporte cambian la exposición. Además, raza, edad, peso y estado de salud modifican el riesgo.",
      "Esta guía ayuda a filtrar lugares y alojamientos, pero no sustituye el consejo veterinario. Ante dudas sobre la tolerancia de tu animal o cualquier síntoma, consulta a un profesional.",
    ],
    sections: [
      {
        heading: "Busca una noche fresca y mañanas aprovechables",
        paragraphs: [
          "La mínima nocturna es útil porque determina si el animal podrá descansar y si habrá una ventana segura para pasear al amanecer. No confíes solo en una máxima inferior a la de tu ciudad: revisa el pronóstico horario y la humedad.",
          "Los destinos con bosque o calles sombreadas ofrecen más alternativas, pero comprueba las normas locales. Algunos espacios protegidos exigen correa, restringen accesos o no admiten animales en determinadas áreas.",
        ],
      },
      {
        heading: "El alojamiento debe aceptar al perro de verdad",
        paragraphs: [
          "La etiqueta «admite mascotas» puede ocultar límites de peso, suplementos, número máximo o prohibición de dejar al animal solo. Pide las condiciones por escrito y confirma qué zonas puede utilizar.",
          "Pregunta también por climatización, suelo, terraza segura y distancia a un paseo sombreado. Una habitación fresca a la que el perro no puede acceder no resuelve el viaje.",
        ],
        bullets: [
          "Suplementos, fianza y límites de tamaño",
          "Acceso del animal a dormitorio y zonas comunes",
          "Climatización y posibilidad de ventilar con seguridad",
          "Entorno inmediato para salidas cortas",
        ],
      },
      {
        heading: "Protege las patas y reduce el ejercicio",
        paragraphs: [
          "El asfalto y otras superficies pueden calentarse mucho más que el aire. Elige tierra o sombra, sal temprano y al anochecer, y reduce intensidad y duración. Una ruta habitual puede ser excesiva en condiciones cálidas.",
          "Lleva agua y recipiente, pero no fuerces al animal a beber grandes cantidades de golpe. Aprende a reconocer jadeo desproporcionado, debilidad, desorientación o dificultad para caminar y detén el ejercicio si aparecen.",
        ],
      },
      {
        heading: "Haz seguro el viaje en coche",
        paragraphs: [
          "Planifica paradas, utiliza un sistema de retención adecuado y mantén ventilación. No dejes nunca al perro dentro del vehículo estacionado, aunque sea por pocos minutos, haya sombra o el día parezca moderado.",
          "Lleva su documentación, medicación, contacto veterinario y una fotografía reciente. Localiza antes de salir una clínica cercana al destino, especialmente si el animal es mayor o tiene una condición previa.",
        ],
      },
      {
        heading: "Agua no siempre significa baño permitido",
        paragraphs: [
          "Antes de acercarte a un río, embalse o playa, revisa normativa, calidad del agua, corriente, accesos y presencia de algas o fauna peligrosa. No todos los perros saben nadar ni todos los puntos de baño son seguros.",
          "Una zona arbolada y un paseo corto pueden ser mejores que una actividad acuática improvisada. La escapada debe adaptarse al animal, no al contenido que esperabas fotografiar.",
        ],
      },
    ],
    takeaways: [
      "Compara la mínima y reserva los paseos para franjas seguras.",
      "Confirma por escrito las condiciones del alojamiento.",
      "Evita asfalto caliente y reduce la intensidad.",
      "Nunca dejes al perro solo dentro del coche.",
      "Consulta normas y seguridad antes de cualquier baño.",
    ],
    faqs: [
      {
        question: "¿Qué perros tienen más riesgo con el calor?",
        answer:
          "El riesgo puede ser mayor en animales braquicéfalos, mayores, cachorros, con sobrepeso o con ciertas enfermedades, pero cualquier perro puede sufrirlo. Consulta a tu veterinario según su caso.",
      },
      {
        question: "¿Cómo sé si el suelo está demasiado caliente?",
        answer:
          "El suelo puede superar ampliamente la temperatura del aire. Evita superficies expuestas, prioriza sombra y tierra y, ante duda, cambia el paseo; una prueba informal no sustituye una evaluación prudente.",
      },
      {
        question: "¿Puede quedarse el perro en el coche con el aire puesto?",
        answer:
          "No es una opción segura: el sistema puede fallar y la situación cambiar rápidamente. Organiza el viaje para que el animal nunca quede solo en el vehículo.",
      },
    ],
    sources: [
      {
        title: "Derechos Sociales — Guía para animales en una ola de calor",
        url: "https://www.dsca.gob.es/es/publicacion/guia-cuidar-tu-animal-compania-ola-calor",
        supports:
          "Hidratación, horarios, suelo, ejercicio, ventilación y actuación ante un golpe de calor.",
      },
      {
        title: "DGT — Cómo viajar con tu mascota",
        url: "https://www.dgt.es/muevete-con-seguridad/viaja-seguro/con-tu-mascota/",
        supports:
          "Documentación, sistemas de retención, paradas y seguridad dentro del vehículo.",
      },
      {
        title: "AEMET — Predicción por horas para municipios",
        url: "https://www.aemet.es/es/zona_portada_destacada/predicion_municipios_horas",
        supports:
          "Comprobación horaria de temperatura, humedad, viento y avisos antes de los paseos.",
      },
    ],
  },
];

export const guides: Guide[] = [...growthGuides, ...foundationGuides];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getFromCity(slug: string) {
  return fromCities.find((city) => city.slug === slug);
}

export function getDestination(slug: string) {
  return editorialDestinations.find(
    (destination) => destination.slug === slug,
  );
}

export function distanceKm(
  first: { lat: number; lng: number },
  second: { lat: number; lng: number },
) {
  return Math.round(calculateDirectDistanceKm(first, second));
}

export type DestinationCandidate = {
  destination: EditorialDestination;
  distance: number;
  estimatedRoadDistanceKm: number;
  estimatedTravelHours: number;
  indicativeDifference: number;
};

export function getDestinationCandidates(
  city: FromCity,
  limit = 6,
): DestinationCandidate[] {
  const origin = originRecords.find((candidate) => candidate.slug === city.slug);

  if (!origin) {
    return [];
  }

  return rankDestinations(destinationRecords, {
    origin,
    maxTravelHours: CITY_GUIDE_MAX_TRAVEL_HOURS,
    limit,
    diversify: true,
  }).flatMap((candidate) => {
    const destination = editorialDestinationBySlug.get(
      candidate.destination.slug,
    );

    if (!destination) {
      return [];
    }

    return [
      {
        destination,
        distance: Math.round(candidate.directDistanceKm),
        estimatedRoadDistanceKm: Math.round(
          candidate.estimatedRoadDistanceKm,
        ),
        estimatedTravelHours: candidate.estimatedTravelHours,
        indicativeDifference: Math.max(
          0,
          Math.round(candidate.nighttimeReliefC * 10) / 10,
        ),
      },
    ];
  });
}

export function getRankedDestinations() {
  return rankDestinations(destinationRecords, {
    limit: destinationRecords.length,
  }).flatMap((candidate) => {
    const destination = editorialDestinationBySlug.get(
      candidate.destination.slug,
    );
    return destination ? [destination] : [];
  });
}

function median(values: number[]) {
  const ordered = [...values].sort((left, right) => left - right);
  const middle = Math.floor(ordered.length / 2);

  if (ordered.length % 2 === 0) {
    return (ordered[middle - 1] + ordered[middle]) / 2;
  }

  return ordered[middle];
}

export function getDestinationCatalogSummary() {
  const byNight = [...editorialDestinations].sort(
    (left, right) =>
      left.summerLow - right.summerLow ||
      left.summerHigh - right.summerHigh ||
      left.name.localeCompare(right.name, "es"),
  );
  const byAltitude = [...editorialDestinations].sort(
    (left, right) =>
      right.altitude - left.altitude || left.name.localeCompare(right.name, "es"),
  );

  return {
    total: editorialDestinations.length,
    regionCount: new Set(
      editorialDestinations.map((destination) => destination.region),
    ).size,
    medianSummerLow: median(
      editorialDestinations.map((destination) => destination.summerLow),
    ),
    coolestNightReference: byNight[0],
    highestAltitude: byAltitude[0],
  };
}

export function getDestinationCatalogBenchmark(
  destination: EditorialDestination,
) {
  const summary = getDestinationCatalogSummary();
  const byNight = [...editorialDestinations].sort(
    (left, right) =>
      left.summerLow - right.summerLow ||
      left.summerHigh - right.summerHigh ||
      left.name.localeCompare(right.name, "es"),
  );
  const byAltitude = [...editorialDestinations].sort(
    (left, right) =>
      right.altitude - left.altitude || left.name.localeCompare(right.name, "es"),
  );

  return {
    total: summary.total,
    nightPosition:
      byNight.findIndex((candidate) => candidate.slug === destination.slug) + 1,
    altitudePosition:
      byAltitude.findIndex((candidate) => candidate.slug === destination.slug) + 1,
    medianSummerLow: summary.medianSummerLow,
    differenceFromMedian:
      Math.round(
        (destination.summerLow - summary.medianSummerLow) * 10,
      ) / 10,
  };
}

export type NearbyDestinationCandidate = {
  destination: EditorialDestination;
  distance: number;
  indicativeDifference: number;
};

export function getNearbyDestinations(
  destination: EditorialDestination,
  limit = 3,
): NearbyDestinationCandidate[] {
  return editorialDestinations
    .filter((candidate) => candidate.slug !== destination.slug)
    .map((candidate) => ({
      destination: candidate,
      distance: distanceKm(destination, candidate),
      indicativeDifference:
        Math.round((destination.summerHigh - candidate.summerHigh) * 10) / 10,
    }))
    .sort((left, right) => left.distance - right.distance)
    .slice(0, limit);
}
