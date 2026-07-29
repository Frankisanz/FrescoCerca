import type { Guide } from "@/lib/content";

export type GrowthGuide = Guide & {
  sources: { title: string; url: string }[];
};

export const growthGuides = [
  {
    slug: "pueblos-con-noches-frescas-en-verano",
    title:
      "Pueblos con noches frescas en verano: cómo elegir dónde dormir mejor",
    seoTitle: "Pueblos con noches frescas en verano",
    description:
      "Aprende a comparar pueblos para dormir mejor en verano usando mínima prevista, humedad, viento, altitud, alojamiento y avisos oficiales.",
    eyebrow: "Descanso nocturno",
    readingMinutes: 11,
    published: "2026-07-29",
    updated: "2026-07-29",
    introduction: [
      "Buscar un pueblo con noches frescas no consiste en ordenar un mapa por altitud. La mínima cambia con cada situación atmosférica, y el alivio depende también de humedad, viento, entorno construido y capacidad del alojamiento para perder el calor acumulado. Un pueblo que suele refrescar puede atravesar una noche cálida: decide con datos de tus fechas.",
      "Esta guía propone un método para crear una lista corta y comprobarla con información oficial. No ofrece un ranking eterno ni promete una temperatura. El objetivo es saber qué datos miraste, cuándo los revisaste y qué alternativa conservarás si cambian la previsión, los avisos o el acceso.",
    ],
    sections: [
      {
        heading: "Define qué significa para ti una noche fresca",
        paragraphs: [
          "La mínima diaria es un buen punto de partida, pero no cuenta toda la noche. Puede alcanzarse cerca del amanecer, después de varias horas poco confortables. Consulta la predicción horaria y observa la evolución entre la cena y la mañana: temperatura, sensación térmica, humedad, viento, nubosidad y probabilidad de precipitación. Si quieres dormir con la ventana abierta, también importan el ruido, la seguridad y si el aire exterior baja lo suficiente antes de acostarte.",
          "Establece el objetivo antes de comparar. Puede ser descansar sin climatización, pasear a primera hora, proteger a una persona vulnerable o simplemente evitar una habitación recalentada. No existe un umbral universal de confort y la tolerancia individual varía. Para decisiones relacionadas con la salud, atiende las recomendaciones sanitarias y no conviertas una cifra orientativa en una garantía de seguridad.",
        ],
        bullets: [
          "Mira la franja completa desde las 22:00 hasta las 08:00, no solo la mínima.",
          "Compara humedad y viento junto a la temperatura prevista.",
          "Anota las necesidades de niños, mayores, embarazadas o personas enfermas.",
          "Decide de antemano qué condición te haría cambiar de alojamiento o destino.",
        ],
      },
      {
        heading: "Usa el territorio para encontrar candidatos, no ganadores",
        paragraphs: [
          "La altitud suele reducir la temperatura respecto a zonas cercanas, pero su efecto no es idéntico todos los días. La orientación del valle, la exposición al sol, la vegetación, el tipo de suelo y la circulación local del aire pueden separar mucho dos núcleos de la misma comarca. Una localidad situada en una hondonada puede enfriarse con cielo despejado y viento débil, pero también sufrir aire estancado; una ladera ventilada se comportará de otra manera.",
          "El tamaño y la forma urbana también cuentan. Pavimento, fachadas y cubiertas almacenan energía durante el día y la liberan por la noche. Un casco compacto y mineral puede conservar calor, mientras que un alojamiento en el borde del pueblo, con sombra y ventilación cruzada, puede resultar más llevadero. Utiliza clima habitual, altitud y entorno para descubrir lugares; deja que la previsión concreta decida entre ellos.",
        ],
      },
      {
        heading: "Comprueba la previsión en tres momentos",
        paragraphs: [
          "Una primera revisión con varios días de margen sirve para detectar el patrón general y mantener abiertas dos o tres opciones. A unas 72 horas, compara la predicción municipal y los avisos de AEMET: el sistema Meteoalerta informa de fenómenos adversos y sus niveles de peligro, pero el impacto final depende también de la exposición y la vulnerabilidad. Un destino sin aviso no queda automáticamente libre de calor, tormentas o dificultades locales.",
          "Repite la comprobación el día anterior y antes de salir. La predicción horaria municipal de AEMET ofrece detalle para las horas próximas, pero sigue siendo una predicción, no una medición futura garantizada. Observa si las distintas actualizaciones mantienen la ventaja nocturna y revisa avisos, tormentas, rachas de viento y lluvia. Si la diferencia entre candidatos se ha reducido, prioriza el viaje más sencillo y el alojamiento mejor preparado.",
        ],
        bullets: [
          "Primera criba: patrón previsto, distancia y disponibilidad.",
          "A 72 horas: municipio, avisos y política de cancelación.",
          "A 24 horas: evolución horaria y condiciones de acceso.",
          "Antes de salir: última actualización y plan alternativo.",
        ],
      },
      {
        heading: "Audita el alojamiento antes de pagar",
        paragraphs: [
          "La etiqueta «casa de montaña» no describe la temperatura del dormitorio. Pregunta por orientación, planta, persianas o contraventanas, aislamiento, ventilación cruzada y climatización disponible en la estancia exacta. Una buhardilla bajo cubierta puede calentarse más que una habitación en planta baja. Si el anuncio dice «ventilador», aclara cuántos hay y dónde; si anuncia aire acondicionado, confirma que llega al dormitorio y que su uso está incluido.",
          "Busca respuestas concretas, no adjetivos como «fresco» o «acogedor». Pregunta a qué hora recibe sol la habitación, si se pueden abrir ventanas con seguridad y qué ruido hay por la noche. Las reseñas recientes pueden aportar pistas, pero comprueba su fecha y contexto. Mantén una reserva flexible cuando el viaje dependa especialmente de las condiciones meteorológicas y guarda por escrito las características que hayan condicionado tu elección.",
        ],
      },
      {
        heading: "Compara con una ficha de cinco datos",
        paragraphs: [
          "Para evitar decidir por intuición, crea una ficha idéntica para cada candidato: evolución nocturna prevista, humedad y viento, tiempo real de viaje, calidad térmica del alojamiento y disponibilidad de alternativas bajo techo. Añade el estado de los accesos si se trata de una zona de montaña. La puntuación no necesita ser científica; basta con que te obligue a comparar las mismas variables y a justificar por qué una opción encaja mejor.",
          "No premies automáticamente la mínima más baja. Una diferencia pequeña puede no compensar una carretera larga, una llegada tardía o una habitación incierta. Un pueblo algo menos fresco puede ser mejor si permite llegar temprano, descansar en un espacio acondicionado y cambiar de actividad. Elige la opción que reduzca exposición y fricción para todo el grupo.",
        ],
      },
      {
        heading: "Organiza el día para que la noche no cargue con todo",
        paragraphs: [
          "Incluso en un destino elevado puede hacer calor durante las horas centrales. Programa los paseos exigentes al comienzo del día, reserva mediodía y primera tarde para sombra o interiores y vuelve a salir cuando las condiciones hayan mejorado. Bebe agua con regularidad, usa ropa adecuada y protección solar, y presta atención a quienes tienen mayor riesgo. Las recomendaciones del Ministerio de Sanidad deben prevalecer sobre cualquier itinerario turístico.",
          "Evita confiar en ríos, embalses o piscinas naturales como única solución. Comprueba si el baño está autorizado, las condiciones del agua, la vigilancia y los accesos. Ante avisos, síntomas preocupantes o cambios bruscos del tiempo, reduce o cancela la actividad. Encontrar una noche potencialmente más llevadera no elimina los riesgos del calor durante el trayecto ni convierte todas las horas del destino en frescas.",
        ],
      },
    ],
    takeaways: [
      "Compara toda la evolución nocturna y no solo la mínima diaria.",
      "Usa altitud y paisaje para descubrir candidatos, nunca como garantía.",
      "Revisa municipio y avisos a 72 horas, a 24 horas y antes de salir.",
      "Pregunta por la habitación exacta: orientación, planta, sombra y climatización.",
      "Elige la opción más sólida para el grupo, no necesariamente la cifra más baja.",
    ],
    faqs: [
      {
        question: "¿Qué dato indica mejor si podré dormir?",
        answer:
          "La evolución horaria de temperatura y sensación térmica es más útil que una mínima aislada. Complétala con humedad, viento y condiciones del dormitorio. Ningún dato garantiza confort.",
      },
      {
        question: "¿Un pueblo más alto siempre tendrá noches más frescas?",
        answer:
          "No siempre. La altitud ayuda a formar una lista inicial, pero la situación atmosférica, el relieve local, el viento, la nubosidad y el entorno urbano pueden cambiar el resultado. Comprueba la predicción del municipio y del periodo concreto.",
      },
      {
        question: "¿Con cuánta antelación conviene reservar?",
        answer:
          "Depende de la demanda y de tu tolerancia al riesgo. Si reservas pronto, prioriza condiciones flexibles; después revisa el patrón a varios días, confirma avisos alrededor de 72 horas y consulta el detalle horario el día anterior.",
      },
    ],
    sources: [
      {
        title: "AEMET — Predicción meteorológica",
        url: "https://www.aemet.es/es/eltiempo/prediccion",
      },
      {
        title: "AEMET — Predicción por horas en municipios",
        url: "https://www.aemet.es/es/zona_portada_destacada/predicion_municipios_horas",
      },
      {
        title: "AEMET — Interpretación de avisos Meteoalerta",
        url: "https://www.aemet.es/es/eltiempo/prediccion/avisos/ayuda",
      },
      {
        title: "Ministerio de Sanidad — Calor extremo",
        url: "https://www.sanidad.gob.es/areas/sanidadAmbiental/riesgosAmbientales/calorExtremo/",
      },
    ],
  },
  {
    slug: "escapadas-frescas-sin-coche",
    title:
      "Escapadas frescas sin coche: cómo llegar, moverte y volver sin improvisar",
    seoTitle: "Escapadas frescas sin coche",
    description:
      "Método para organizar escapadas frescas en tren y autobús verificando horarios, último tramo, incidencias, accesibilidad y alternativa de regreso.",
    eyebrow: "Viaje en transporte público",
    readingMinutes: 12,
    published: "2026-07-29",
    updated: "2026-07-29",
    introduction: [
      "Una escapada sin coche empieza por la red de transporte, no por una lista de pueblos bonitos. Solo es viable si puedes completar la ida, el último tramo y la vuelta con horarios confirmados. En áreas rurales, pocos kilómetros entre estación y alojamiento pueden ser la parte más difícil.",
      "Primero construye cadenas de transporte verificables y después compara las condiciones de tus fechas. El tren o el autobús evita conducir, pero no garantiza frescor, puntualidad ni acceso hasta la puerta. Confirma por separado meteorología y operación en fuentes oficiales.",
    ],
    sections: [
      {
        heading: "Empieza por conexiones que puedas comprar y comprobar",
        paragraphs: [
          "Busca desde tu origen salidas que lleguen con margen suficiente para hacer el enlace o caminar hasta el alojamiento antes de las horas más calurosas. Da prioridad a trayectos directos o con transbordos protegidos por una sola compra cuando sea posible. Una opción algo más lenta puede ser mejor si tiene varias frecuencias, estaciones atendidas y una vuelta alternativa el mismo día.",
          "Consulta horarios en el operador que presta el servicio. Renfe ofrece recorridos ferroviarios; los servicios autonómicos, metropolitanos y concesionarios publican sus calendarios. Comprueba el día correcto, porque fines de semana y festivos pueden tener otra oferta. No reserves basándote solo en un agregador o una captura antigua.",
        ],
        bullets: [
          "Hora real de salida y llegada para la fecha elegida.",
          "Tiempo y condiciones de cada transbordo.",
          "Última vuelta posible y una vuelta anterior de respaldo.",
          "Normas para equipaje, bicicleta, mascota o silla de ruedas.",
        ],
      },
      {
        heading: "Distingue estación, municipio y alojamiento",
        paragraphs: [
          "Que un tren pare en un municipio de montaña no significa que te deje en el casco urbano ni a la misma cota. Localiza la estación, la parada de autobús, el alojamiento y los servicios básicos en un mapa. Calcula distancia a pie, desnivel, sombra y tipo de vía. Un kilómetro con equipaje por una carretera sin acera puede ser peor que un enlace adicional bien coordinado.",
          "Pregunta al alojamiento cómo llega habitualmente la gente sin coche y exige una respuesta concreta. Si ofrece recogida, confirma horario, precio, capacidad y un contacto operativo. Si depende de taxi, comprueba disponibilidad antes de viajar; en áreas pequeñas puede no haber vehículos esperando. Si el último tramo solo funciona bajo demanda, averigua cómo y con cuánta antelación se reserva.",
        ],
      },
      {
        heading: "Verifica obras e incidencias en el canal adecuado",
        paragraphs: [
          "El horario vendido describe el servicio previsto, pero una obra o incidencia puede modificarlo. Antes de salir revisa las comunicaciones del operador y el estado de la infraestructura. Adif publica información del tráfico ferroviario y avisos sobre afectaciones de red; el operador informa del tren, la reserva y, cuando corresponde, de alternativas. Consulta ambos cuando el viaje dependa de un enlace ajustado.",
          "Guarda billetes y datos del alojamiento sin depender de cobertura. Decide qué harás si pierdes el último autobús o el tren llega tarde: esperar en una estación con servicios, tomar otra conexión o cancelar el tramo. No improvises una caminata por carretera para salvar una reserva.",
        ],
        bullets: [
          "La víspera: confirma que el horario sigue publicado.",
          "Antes de salir: revisa avisos del operador y estado de la red.",
          "Durante el viaje: sigue las instrucciones del personal y la señalización.",
          "Ante una incidencia: protege primero un regreso seguro, no el itinerario turístico.",
        ],
      },
      {
        heading: "Compara el tiempo en los puntos de la cadena",
        paragraphs: [
          "Consulta AEMET para el destino, pero también para el lugar del transbordo y la franja de llegada. Puedes encontrar una noche suave en el pueblo y, aun así, esperar al sol en una estación durante la tarde. Revisa temperatura, sensación térmica, viento, precipitación, tormentas y avisos. Una marquesina o sala de espera no debe darse por supuesta en una parada rural.",
          "A varios días vista, la predicción sirve para mantener opciones abiertas; cerca de la salida, el detalle horario ayuda a decidir ropa, agua y margen. Si aparecen avisos adversos, no interpretes «ir en tren» como inmunidad: pueden afectar el acceso, el servicio o las actividades. Cambia el plan siguiendo la información de autoridades y operadores.",
        ],
      },
      {
        heading: "Diseña un equipaje que puedas mover con calor",
        paragraphs: [
          "Lleva lo necesario sin convertir cada enlace en un esfuerzo excesivo. El agua debe estar accesible, no al fondo de la maleta. Añade protección solar, una capa ligera para la noche, medicación personal, batería y una pequeña comida compatible con el viaje. Consulta las normas del operador si transportas bicicleta, equipaje voluminoso o animales; la admisión puede variar según el tren o autobús.",
          "Planifica descansos y evita correr para enlazar. El Ministerio de Sanidad recomienda limitar la exposición y prestar especial atención a personas vulnerables durante episodios de calor. Si el grupo incluye niños, mayores, embarazo, movilidad reducida o una condición médica, reduce transbordos y confirma aseos, sombra y asistencia. La escapada debe poder completarse sin exigir un esfuerzo que el destino pretendía evitar.",
        ],
      },
      {
        heading: "Incluye accesibilidad desde el primer filtro",
        paragraphs: [
          "No basta con marcar una casilla al final de la compra. Revisa accesibilidad de estaciones, necesidad de asistencia, tiempo para solicitarla y compatibilidad del último tramo. Adif Acerca presta apoyo a personas con discapacidad o movilidad reducida en estaciones incluidas, con condiciones y antelaciones que deben consultarse para el viaje concreto. El autobús local o el alojamiento pueden requerir gestiones separadas.",
          "Describe las necesidades con precisión al operador y pide confirmación. Comprueba ascensores, andenes, espacio para silla, distancia entre paradas y superficie del recorrido final. Una ruta accesible en el tren principal deja de serlo si termina con escaleras o una pendiente sin alternativa. Si falta una pieza fiable, elige otro destino aunque su previsión parezca mejor.",
        ],
      },
      {
        heading: "Puntúa la escapada por robustez, no solo por duración",
        paragraphs: [
          "Compara tres rutas con una ficha sencilla: número de transbordos, frecuencia, margen, calidad del último tramo, servicios en espera, flexibilidad de la vuelta y previsión meteorológica. Penaliza con claridad cualquier enlace que dependa del último servicio del día. Premia una llegada desde la que puedas caminar con seguridad o usar transporte local confirmado.",
          "Antes de pagar, recorre la cadena completa en ambos sentidos. Debes saber cuánto margen tienes y qué alternativa tomarás en cada paso. Si la respuesta es «ya veremos al llegar», falta información. El plan no elimina la incertidumbre, pero evita que una demora deje al grupo aislado.",
        ],
      },
    ],
    takeaways: [
      "Construye primero una cadena completa de transporte y después elige destino.",
      "Comprueba dónde está realmente la estación y cómo resolverás el último tramo.",
      "Revisa operador y estado de la red antes de cada salida.",
      "Incluye transbordos y esperas al consultar la predicción meteorológica.",
      "Conserva una vuelta anterior y una alternativa segura si falla un enlace.",
    ],
    faqs: [
      {
        question: "¿Cómo encuentro pueblos frescos a los que se llegue en tren?",
        answer:
          "Parte del buscador oficial del operador y crea una lista de estaciones alcanzables para tus fechas. Después comprueba distancia, desnivel y transporte local hasta el alojamiento, y compara la previsión municipal. La estación por sí sola no confirma que el viaje sea viable.",
      },
      {
        question: "¿Cuánto margen debo dejar en un transbordo?",
        answer:
          "Depende de si los servicios forman una misma compra, la estación, la frecuencia posterior y la movilidad del grupo. Si perder el enlace te deja sin alternativa, el plan es frágil aunque el margen parezca razonable.",
      },
      {
        question: "¿Dónde compruebo si hay incidencias ferroviarias?",
        answer:
          "Revisa los avisos del operador responsable de tu tren y el estado de la red publicado por Adif. Hazlo la víspera y de nuevo antes de salir, y sigue las indicaciones del personal durante el viaje.",
      },
    ],
    sources: [
      {
        title: "Renfe — Consulta de horarios",
        url: "https://www.renfe.com/es/es/viajar/informacion-util/horarios.html",
      },
      {
        title: "Renfe — Prepara tu viaje",
        url: "https://www.renfe.com/es/es/viajar/prepara-tu-viaje.html",
      },
      {
        title: "Adif — Estado de la red",
        url: "https://www.adif.es/viajeros/estado-de-la-red",
      },
      {
        title: "Adif — Estaciones de viajeros",
        url: "https://www.adif.es/viajeros/estaciones",
      },
      {
        title: "Adif — Accesibilidad en estaciones y servicio Acerca",
        url: "https://www.adif.es/viajeros/accesibilidad-estaciones",
      },
      {
        title: "AEMET — Predicción por horas en municipios",
        url: "https://www.aemet.es/es/zona_portada_destacada/predicion_municipios_horas",
      },
      {
        title: "Ministerio de Sanidad — Calor extremo",
        url: "https://www.sanidad.gob.es/areas/sanidadAmbiental/riesgosAmbientales/calorExtremo/",
      },
    ],
  },
  {
    slug: "escapadas-frescas-de-fin-de-semana",
    title:
      "Escapadas frescas de fin de semana: un plan realista para 48 horas",
    seoTitle: "Escapadas frescas de fin de semana",
    description:
      "Organiza una escapada fresca de 48 horas con previsión, alojamiento flexible, ruta segura, planes por franjas y alternativas ante calor o avisos.",
    eyebrow: "Plan de 48 horas",
    readingMinutes: 12,
    published: "2026-07-29",
    updated: "2026-07-29",
    introduction: [
      "Un fin de semana deja poco margen para corregir una mala elección. Si el viernes se pierde en tráfico, el sábado obliga a caminar al mediodía y la habitación conserva calor, una buena cifra en el mapa sirve de poco. Viaje, alojamiento, horarios y alternativa deben formar una sola decisión.",
      "Este método está pensado para dos noches y se adapta a una. Busca una mejora razonable con un desplazamiento asumible, no el punto más frío. Ningún destino garantiza frescor: la previsión, los avisos, incendios, tormentas o incidencias pueden exigir cambiar o cancelar.",
    ],
    sections: [
      {
        heading: "Fija el objetivo y el radio antes de buscar alojamiento",
        paragraphs: [
          "Define qué quieres mejorar: dormir, hacer una actividad temprana o reducir la exposición de alguien vulnerable. Limita el tiempo de puerta a puerta, no solo los kilómetros. En 48 horas, una ruta larga puede consumir el beneficio térmico en cansancio, esperas y llegada tardía.",
          "Crea tres candidatos y compáralos con los mismos criterios: evolución nocturna prevista, máxima y sensación térmica, calidad del alojamiento, duración real del viaje, servicios y alternativa interior. Si viajas en coche, incluye tráfico y descanso; si vas en transporte público, cuenta transbordos y último tramo. Descarta cualquier opción que solo parezca buena en una de esas columnas.",
        ],
        bullets: [
          "Objetivo principal expresado en una frase.",
          "Máximo de horas aceptable para la ida y para la vuelta.",
          "Necesidades del grupo y condiciones que obligarían a cancelar.",
          "Presupuesto completo, incluidos transporte, comidas y cambios.",
        ],
      },
      {
        heading: "Reserva con una puerta de salida",
        paragraphs: [
          "Elige condiciones de cambio o cancelación coherentes con la dependencia meteorológica del viaje. Lee la hora límite, las penalizaciones y qué parte queda fuera del reembolso. Si pagas una tarifa rígida por ahorrar poco, puedes sentirte obligado a viajar bajo un aviso o hacia una zona afectada por humo, tormentas o accesos cerrados.",
          "Confirma por escrito la climatización, ventilación, orientación y planta de la habitación. Pregunta por la llegada tardía y por un espacio confortable durante las horas centrales. Una piscina no sustituye un dormitorio habitable ni garantiza que el baño sea posible. Guarda dirección, teléfono y condiciones de reserva sin depender de conexión.",
        ],
      },
      {
        heading: "Convierte la previsión en puntos de decisión",
        paragraphs: [
          "A varios días, usa AEMET para comparar el patrón general de tus candidatos. Alrededor de 72 horas, revisa municipio y avisos Meteoalerta; el nivel de peligro informa sobre el fenómeno, mientras que el riesgo concreto depende de exposición y vulnerabilidad. El día anterior, mira la evolución horaria del viernes al domingo, no una única máxima o el icono principal de una aplicación.",
          "Escribe dos reglas: una para cambiar de destino y otra para cancelar. Pueden activarse por un aviso incompatible, una noche peor de lo esperado, un incendio cercano, una carretera afectada o síntomas en el grupo. Así evitarás negociar con el riesgo cuando ya hay dinero y expectativas implicados.",
        ],
        bullets: [
          "Primera revisión: conserva tres opciones.",
          "A 72 horas: decide si mantienes, cambias o reduces el plan.",
          "A 24 horas: ajusta horarios, ropa, agua y actividades.",
          "Antes de salir: comprueba avisos y accesos una última vez.",
        ],
      },
      {
        heading: "Viernes: protege la llegada",
        paragraphs: [
          "Consulta las recomendaciones y el mapa de incidencias de la DGT si conduces. Los viernes de verano pueden concentrar tráfico en salidas urbanas y rutas turísticas, por lo que una hora estimada sin tráfico no basta. Revisa el vehículo, descansa y sitúa paradas seguras. No fijes una cena o recogida con un margen que te empuje a correr.",
          "Evita convertir la llegada en la actividad principal. Instálate, comprueba la habitación, bebe agua y da un paseo corto cuando las condiciones lo permitan. Si llegas en transporte público, conserva una alternativa para el último enlace. El viernes debe dejarte preparado para descansar; una ruta nocturna improvisada o una caminata con equipaje añade exposición sin aportar valor al fin de semana.",
        ],
      },
      {
        heading: "Sábado: diseña tres franjas, no una lista interminable",
        paragraphs: [
          "Reserva la mañana temprana para la actividad exterior que más te importa. Ajusta duración y dificultad al grupo, lleva agua y protección, y consulta restricciones del espacio. Las horas centrales deben tener un plan bajo techo o en un lugar realmente sombreado y accesible. La tarde puede recuperar el exterior si la observación y la previsión horaria muestran condiciones adecuadas.",
          "Prepara planes A, B y C: exterior, visita interior o descanso en el alojamiento. No dependas de una zona de baño sin confirmar autorización, vigilancia, caudal y acceso. Cambiar a tiempo es parte de una escapada bien diseñada.",
        ],
        bullets: [
          "Mañana: prioridad exterior con hora de regreso definida.",
          "Mediodía: comida, descanso y actividad interior.",
          "Tarde: nueva comprobación antes de volver a salir.",
          "Noche: ventilación y preparación de la salida del domingo.",
        ],
      },
      {
        heading: "Domingo: deja margen para volver con seguridad",
        paragraphs: [
          "No programes la actividad más remota justo antes de regresar. Elige un paseo corto, una visita local o una mañana flexible y deja tiempo para comer, recoger y revisar la ruta. La DGT publica incidencias y recomendaciones de tráfico; consulta el estado actualizado y ajusta la salida. La señalización y las instrucciones de las autoridades prevalecen sobre cualquier navegación.",
          "El cansancio acumulado y el calor dentro del vehículo afectan la conducción. Descansa, mantén hidratación y haz las paradas necesarias sin convertir la hora de llegada en una obligación. Si utilizas tren o autobús, confirma el servicio de vuelta y llega con margen. Guarda una conexión anterior a la última posible para que un retraso local no convierta el domingo en una emergencia logística.",
        ],
      },
      {
        heading: "Integra calor, tormentas e incendios en el mismo plan",
        paragraphs: [
          "Una escapada de montaña puede combinar alta insolación, tormentas rápidas y riesgo de incendio. Revisa avisos meteorológicos, información autonómica del espacio y comunicaciones de Protección Civil. Respeta cierres y prohibiciones, no enciendas fuego y no entres en una zona afectada para «ver cómo está». Si observas humo o fuego, avisa al 112 y sigue las indicaciones oficiales.",
          "Limita exposición al sol, bebe agua con frecuencia y presta atención a niños, mayores y personas enfermas, siguiendo al Ministerio de Sanidad. Nunca dejes personas ni animales dentro de un vehículo. Ante confusión, pérdida de conciencia u otros síntomas graves, solicita ayuda de emergencia. Ninguna reserva ni fotografía justifica continuar una actividad cuando las condiciones o el estado del grupo han dejado de ser seguros.",
        ],
      },
    ],
    takeaways: [
      "Limita el radio según tiempo de puerta a puerta, no solo kilómetros.",
      "Reserva alojamiento flexible y confirma cómo se comporta la habitación.",
      "Define por adelantado cuándo cambiarás o cancelarás.",
      "Organiza el sábado por franjas con planes A, B y C.",
      "Protege la vuelta del domingo con margen e información actualizada.",
    ],
    faqs: [
      {
        question: "¿Cuántos candidatos conviene comparar?",
        answer:
          "Tres suelen bastar. Compáralos con la misma ficha: noche prevista, alojamiento, trayecto, servicios, avisos y plan interior. Descarta los que dependan de una sola condición favorable.",
      },
      {
        question: "¿Cuándo debería cancelar una escapada por calor?",
        answer:
          "No hay una cifra universal. Decide según avisos oficiales, exposición prevista, vulnerabilidad del grupo, alojamiento y actividad. Cancela o cambia si las condiciones superan lo que puedes gestionar con seguridad o si las autoridades restringen el acceso.",
      },
      {
        question: "¿Cómo evito perder el domingo en retenciones?",
        answer:
          "Consulta las recomendaciones y las incidencias actualizadas de la DGT, deja margen y evita una actividad remota antes de salir. Ajusta el horario a la situación real, descansa y acepta llegar más tarde si necesitas parar.",
      },
    ],
    sources: [
      {
        title: "AEMET — Predicción meteorológica",
        url: "https://www.aemet.es/es/eltiempo/prediccion",
      },
      {
        title: "AEMET — Interpretación de avisos Meteoalerta",
        url: "https://www.aemet.es/es/eltiempo/prediccion/avisos/ayuda",
      },
      {
        title: "DGT — Información e incidencias de tráfico",
        url: "https://www.dgt.es/conoce-el-estado-del-trafico/informacion-e-incidencias-de-trafico/index.html",
      },
      {
        title: "DGT — Recomendaciones de tráfico",
        url: "https://www.dgt.es/conoce-el-estado-del-trafico/recomendaciones-de-trafico/",
      },
      {
        title: "Ministerio de Sanidad — Calor extremo",
        url: "https://www.sanidad.gob.es/areas/sanidadAmbiental/riesgosAmbientales/calorExtremo/",
      },
      {
        title:
          "Protección Civil — Recomendaciones ante altas temperaturas e incendios",
        url: "https://www.proteccioncivil.es/-/protecci%C3%B3n-civil-y-emergencias-alerta-por-altas-temperaturas-persistentes-en-la-pen%C3%ADnsula-y-baleares",
      },
    ],
  },
] satisfies GrowthGuide[];
