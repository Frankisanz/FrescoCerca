import type { DestinationEditorial } from "@/lib/destination-editorial-types";

export const interiorDestinationEditorial = {
  valdelinares: {
    seoTitle: "Valdelinares en verano: guía para escapar",
    seoDescription:
      "Qué hacer en Valdelinares en verano: pinares, miradores y paseos de altura, con un plan diario para evitar el sol fuerte y dormir fresco.",
    localOverview:
      "Valdelinares no es solo una estación de esquí fuera de temporada. El pueblo ocupa una ladera escalonada de la sierra de Gúdar, a 1.692 metros, entre pastizales, bancales y algunas de las cumbres más altas del Sistema Ibérico turolense. El mirador de la calle del Sol, la ermita de San Cristóbal y las calles en torno a la iglesia permiten entender el paisaje ganadero sin convertir la visita en una ascensión exigente.",
    coolingFactors:
      "La altitud favorece noches sensiblemente más frías y el pino silvestre aporta sombra en las masas forestales situadas entre las zonas altas. Aun así, el aire seco, el cielo despejado y los pastizales abiertos pueden intensificar la radiación durante las horas centrales: aquí se está mejor por la mañana y después del atardecer, no necesariamente al sol del mediodía.",
    stayAdvice:
      "Para notar de verdad el alivio térmico, conviene dormir en el propio Valdelinares y no bajar a una localidad mucho más cálida. Pregunta si la habitación puede ventilarse con seguridad por la noche y lleva una capa ligera: incluso tras un día soleado, la temperatura puede caer con rapidez.",
    accessAdvice:
      "El último tramo se hace por carreteras de montaña con curvas y servicios dispersos. Revisa el estado de la vía y la previsión antes de salir, llega con combustible suficiente y aparca sin invadir accesos agrícolas o ganaderos. Si quieres enlazar un sendero, descarga previamente el trazado oficial: la cobertura puede ser irregular.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Pueblo alto y miradores sin prisa",
        detail:
          "Recorre temprano la iglesia de la Virgen de las Nieves, el mirador de la calle del Sol y la ermita de San Cristóbal. Es una introducción corta al relieve abancalado antes de que la exposición solar sea intensa.",
      },
      {
        time: "Mediodía",
        title: "Pausa larga bajo techo",
        detail:
          "Reserva las horas centrales para comer y descansar en el casco urbano. La altitud refresca el aire, pero la radiación sigue siendo fuerte en praderas y lomas sin arbolado.",
      },
      {
        time: "Tarde-noche",
        title: "Primer tramo del sendero y cielo abierto",
        detail:
          "Cuando baje el sol, toma solo un tramo asumible del PR-TE 29 en dirección al río Linares y regresa con margen de luz. Termina en el borde del pueblo, lejos de la calzada, para contemplar el cielo sin adentrarte de noche en el monte.",
      },
    ],
    checks: [
      "Consulta AEMET y el estado de las carreteras de montaña antes de subir.",
      "Confirma en la oficina local cualquier incidencia o restricción en los senderos.",
      "Lleva agua, protección solar y una capa de abrigo aunque el día amanezca despejado.",
    ],
    sources: [
      {
        label: "Ayuntamiento de Valdelinares: patrimonio natural",
        url: "https://www.valdelinares.es/turismo/natural/",
        supports:
          "Altitud del entorno, cumbres, ríos, pastizales y masas de pino silvestre y pino negro.",
      },
      {
        label: "Turismo de Aragón: Valdelinares",
        url: "https://www.turismodearagon.com/ficha/valdelinares/",
        supports:
          "Información turística oficial del municipio y recursos próximos.",
      },
      {
        label: "Senderos Turísticos de Aragón: PR-TE 29",
        url: "https://senderosturisticos.turismodearagon.com/ruta/ficha/3390",
        supports:
          "Trazado oficial que enlaza Valdelinares con Linares de Mora, Gúdar y Alcalá de la Selva.",
      },
    ],
  },
  albarracin: {
    seoTitle: "Albarracín en verano: sombra, río y Rodeno",
    seoDescription:
      "Organiza Albarracín en verano con paseo fluvial, casco medieval y Pinares de Rodeno: horarios sensatos, accesos y consejos contra el calor.",
    localOverview:
      "Albarracín permite combinar patrimonio y naturaleza sin hacer grandes desplazamientos: el casco medieval se alza sobre el meandro del Guadalaviar y, a pocos kilómetros, las areniscas rojas y el pinar del Paisaje Protegido de los Pinares de Rodeno conservan abrigos con arte rupestre. Sus cuestas y escaleras exigen más esfuerzo del que sugiere una visita urbana convencional.",
    coolingFactors:
      "El río, la vegetación de ribera y el pinar ofrecen ambientes más amables, mientras la altitud ayuda especialmente al caer la tarde. Sin embargo, las fachadas y rocas rojizas acumulan sol y la parte alta del casco tiene poca sombra; la ventaja térmica se aprovecha mejor alternando exteriores tempranos con una pausa interior.",
    stayAdvice:
      "Dormir dentro o junto al casco permite disfrutar de las calles cuando se vacían, pero implica equipaje sobre pendientes y posible distancia al aparcamiento. Si priorizas facilidad de acceso, busca alojamiento cerca de la entrada y confirma dónde dejar el coche antes de llegar.",
    accessAdvice:
      "Turismo de Aragón recomienda usar los aparcamientos de la entrada y continuar a pie. Lleva calzado con buena suela para piedra, escaleras y tramos irregulares. Para el Rodeno, utiliza los accesos y aparcamientos señalizados y comprueba avisos del espacio protegido antes de desplazarte.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Casco medieval antes de las cuestas calientes",
        detail:
          "Empieza en la plaza Mayor y sube por las calles históricas hacia los miradores cuando todavía hay sombra. Desciende con calma; el pavimento y los desniveles aconsejan calzado estable.",
      },
      {
        time: "Mediodía",
        title: "Patrimonio interior y sobremesa",
        detail:
          "Traslada las horas de más sol a una visita interior que esté abierta y a una comida tranquila. Comprueba previamente horarios de catedral, museos o visitas guiadas, porque varían por temporada.",
      },
      {
        time: "Tarde-noche",
        title: "Guadalaviar o sendero familiar del Navazo",
        detail:
          "Elige un solo cierre de jornada: paseo fluvial junto al meandro o el SL-TE 20 del Navazo, circular y familiar. En el Rodeno no salgas del itinerario señalizado ni toques los abrigos de arte rupestre.",
      },
    ],
    checks: [
      "Revisa aperturas del patrimonio y evita construir el día alrededor de un horario no confirmado.",
      "Consulta avisos, riesgo de incendio y estado de senderos de la Red Natural de Aragón.",
      "No confundas proximidad al río con zona de baño autorizada; verifica la normativa local.",
    ],
    sources: [
      {
        label: "Turismo de Aragón: Albarracín",
        url: "https://www.turismodearagon.com/ficha/albarracin/",
        supports:
          "Casco histórico, paseo del Guadalaviar, aparcamientos de entrada y relación con el Rodeno.",
      },
      {
        label: "Red Natural de Aragón: Pinares de Rodeno",
        url: "https://www.rednaturaldearagon.com/paisaje-protegido-de-los-pinares-de-rodeno/",
        supports:
          "Valores geológicos, forestales, culturales y ámbito del paisaje protegido.",
      },
      {
        label: "Red Natural de Aragón: SL-TE 20",
        url: "https://www.rednaturaldearagon.com/senderos/s2-pinturas-rupestres/",
        supports:
          "Recorrido circular familiar del pinar hasta el abrigo de la Cocinilla del Obispo.",
      },
    ],
  },
  bronchales: {
    seoTitle: "Bronchales en verano: pinares y rutas frescas",
    seoDescription:
      "Planifica Bronchales en verano entre pinares, fuentes y senderos señalizados: rutas oficiales, momentos más frescos y consejos prácticos de acceso.",
    localOverview:
      "Bronchales funciona como base de montaña más que como una visita de un único monumento. Desde la plaza de la Fuente parten senderos municipales hacia Fuente del Canto, Sierra Alta y El Borrocal, atravesando pinares, manantiales, prados y miradores. La red permite adaptar el día, pero sus rutas completas requieren tiempo y no deben encadenarse sin valorar distancia y desnivel.",
    coolingFactors:
      "A unos 1.575 metros, el pueblo suele recuperar temperaturas agradables por la noche, y el pino albar protege buena parte de los caminos. Las fuentes mejoran la sensación ambiental, pero no sustituyen el agua de la mochila ni garantizan que sea potable; las zonas altas y los claros siguen expuestos al sol y a tormentas rápidas.",
    stayAdvice:
      "Elige el casco urbano si quieres salir caminando desde la plaza y cenar sin mover el coche. Los alojamientos en el pinar aportan ambiente forestal, aunque conviene comprobar distancia real a servicios, cobertura y condiciones de acceso antes de reservar.",
    accessAdvice:
      "El coche facilita llegar a Bronchales, pero el Ayuntamiento también publica la información vigente de autobuses. No bases el viaje en un horario visto en una página antigua: confirma la conexión de ida y vuelta. Dentro del pueblo, deja libres la plaza, las salidas de rutas y los accesos de emergencia.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Fuente del Canto por el PR-TE 130",
        detail:
          "Sal temprano desde la plaza de la Fuente. La circular oficial pasa por las fuentes del Pilar, Tío Pelús y Ojuelo antes de Fuente del Canto; si no quieres completar sus 10,6 kilómetros, fija de antemano un punto de regreso.",
      },
      {
        time: "Mediodía",
        title: "Comida y descanso en el pueblo",
        detail:
          "Vuelve al casco para comer y recuperarte. Evita improvisar una segunda ruta en las horas centrales: los tramos de pista y los claros pierden la protección del pinar.",
      },
      {
        time: "Tarde-noche",
        title: "Fuentes cercanas y paseo corto",
        detail:
          "Con luz más suave, recorre únicamente el inicio señalizado hacia la fuente del Chorrillo o del Pilar. Reserva Sierra Alta para otra mañana: la circular oficial suma desnivel y no es un paseo breve al atardecer.",
      },
    ],
    checks: [
      "Descarga el GPX oficial y comprueba si el itinerario elegido está abierto y señalizado.",
      "Consulta el nivel de alerta por incendios y evita cualquier uso de fuego fuera de lo autorizado.",
      "No bebas de una fuente sin confirmación sanitaria expresa de potabilidad.",
    ],
    sources: [
      {
        label: "Ayuntamiento de Bronchales: senderismo",
        url: "https://bronchales.es/senderismo-btt-y-trail-en-bronchales/",
        supports:
          "Catálogo municipal de rutas GR, PR y senderos locales desde Bronchales.",
      },
      {
        label: "Ayuntamiento de Bronchales: PR-TE 130",
        url: "https://bronchales.es/pr-te-130-bronchales-fuente-del-canto-bronchales/",
        supports:
          "Itinerario, distancia, desnivel y puntos de paso de la circular de Fuente del Canto.",
      },
      {
        label: "Ayuntamiento de Bronchales: PR-TE 131",
        url: "https://bronchales.es/pr-te-131-bronchales-sierra-alta-bronchales/",
        supports:
          "Características y recorrido oficial de la circular de Sierra Alta.",
      },
    ],
  },
  benasque: {
    seoTitle: "Benasque en verano: plan fresco en el Pirineo",
    seoDescription:
      "Descubre Benasque en verano con un plan fresco entre Aigualluts, Posets-Maladeta y el casco histórico, más accesos y seguridad en montaña.",
    localOverview:
      "Benasque reúne servicios de una pequeña capital de valle y acceso directo a alta montaña. El casco conserva arquitectura pirenaica, mientras los valles de Estós y del alto Ésera, Llanos del Hospital y el Forau d'Aigualluts abren opciones desde paseos hasta jornadas alpinas. Esa variedad obliga a distinguir una excursión familiar de una ascensión técnica.",
    coolingFactors:
      "La masa montañosa, los bosques y los cursos de agua moderan el ambiente, y las noches suelen ser el gran alivio. En cambio, los senderos por encima del bosque reciben radiación intensa y el tiempo puede cambiar deprisa. La presencia de agua glaciar no convierte torrentes, ibones o sumideros en lugares seguros para bañarse.",
    stayAdvice:
      "Benasque es la base más práctica para tener tiendas y restauración a pie. Anciles ofrece una noche más tranquila y sigue cerca, mientras los alojamientos valle arriba reducen desplazamiento a ciertas rutas pero alejan de servicios. Compara ubicación exacta, no solo el nombre comercial «Valle de Benasque».",
    accessAdvice:
      "La carretera remonta un valle largo y los accesos finales pueden regularse en temporada. Para La Besurta y Aigualluts consulta el transporte y las limitaciones vigentes el mismo día; no des por hecho que podrás llegar con vehículo particular. Sal con margen y evita estacionar fuera de espacios habilitados.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Aigualluts con acceso confirmado",
        detail:
          "Usa el acceso oficial vigente hasta La Besurta y camina temprano hacia el Forau y el Plan d'Aigualluts. Es terreno de montaña: lleva agua, alimento, abrigo, impermeable y calzado adecuado aunque el recorrido esté concurrido.",
      },
      {
        time: "Mediodía",
        title: "Regreso al valle y pausa real",
        detail:
          "No alargues la excursión hacia ibones o collados por impulso. Regresa según tu horario de transporte y reserva el centro del día para comer y descansar en Benasque.",
      },
      {
        time: "Tarde-noche",
        title: "Casco de Benasque y paseo hacia Anciles",
        detail:
          "Visita las calles en torno a Santa María y las casas históricas con el sol bajo. Si aún apetece caminar, toma el paseo de fondo de valle hacia Anciles y vuelve antes de perder luz.",
      },
    ],
    checks: [
      "Consulta meteorología de montaña y riesgo de tormenta, no solo la previsión del casco urbano.",
      "Verifica regulación, billetes y última salida del transporte de acceso a La Besurta.",
      "Ajusta la ruta al miembro menos experimentado y no abandones los senderos señalizados.",
    ],
    sources: [
      {
        label: "Turismo Valle de Benasque: Forau d'Aigualluts",
        url: "https://www.benasque.com/es/todo-valle-de-benasque/excursion-forau-aigualluts",
        supports:
          "Descripción del paraje, alternativas de acceso y equipamiento aconsejado para la excursión.",
      },
      {
        label: "Red Natural de Aragón: Posets-Maladeta",
        url: "https://www.rednaturaldearagon.com/parque-natural-posets-maladeta/",
        supports:
          "Ámbito protegido, valles, glaciares y valores naturales del parque.",
      },
      {
        label: "Senderos Turísticos de Aragón: GR 11.5",
        url: "https://senderosturisticos.turismodearagon.com/ruta/ficha/2046",
        supports:
          "Enlace oficial entre La Besurta y el Plan d'Aigualluts y contexto del sendero de montaña.",
      },
    ],
  },
  rupit: {
    seoTitle: "Rupit en verano: rutas, sombra y Salt de Sallent",
    seoDescription:
      "Guía práctica de Rupit en verano: ruta al Salt de Sallent, calles de piedra, aparcamiento regulado y un plan para caminar fuera del calor.",
    localOverview:
      "Rupit concentra mucho atractivo en poco espacio: un núcleo de piedra sobre la riera, un puente colgante y caminos que salen hacia Santa Magdalena, Sant Joan de Fàbregues y el Salt de Sallent. Forma parte del espacio protegido del Collsacabra, un paisaje de riscos, bosques y cursos de agua que exige respeto por fincas, ganado y bordes de precipicio.",
    coolingFactors:
      "La riera, las umbrías y los bosques del Collsacabra crean tramos agradables, y la altitud ayuda al anochecer. Pero el sendero al salto alterna sombra y exposición, la humedad puede elevar la sensación de calor y el caudal varía. El mirador de una cascada no es una zona de baño ni un lugar para acercarse al borde.",
    stayAdvice:
      "Pasar la noche permite recorrer el pueblo fuera de las horas de excursiones. Confirma si el alojamiento está dentro del núcleo peatonal y cómo trasladar el equipaje desde el aparcamiento; las calles empedradas y con escalones pueden complicar maletas y carritos.",
    accessAdvice:
      "El aparcamiento de visitantes está regulado y situado en la entrada para evitar tráfico en las calles estrechas. Consulta la información municipal antes de ir, especialmente en fines de semana, y no intentes acercar el coche al centro. El transporte público rural requiere comprobar combinaciones y frecuencia para la fecha concreta.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Camino temprano al Salt de Sallent",
        detail:
          "Sal desde la oficina de turismo siguiendo el itinerario municipal y regresa antes de las horas más cálidas. Mantente en el sendero, extrema la precaución en terreno húmedo y no te acerques al borde del salto.",
      },
      {
        time: "Mediodía",
        title: "Piedra, sombra y comida en el núcleo",
        detail:
          "Dedica el centro del día a las calles junto a la riera, la plaza y una comida pausada. El puente colgante es un paso, no un mirador donde bloquear la circulación.",
      },
      {
        time: "Tarde-noche",
        title: "Santa Magdalena con luz suave",
        detail:
          "El itinerario municipal hacia Santa Magdalena y el mirador del Soler ofrece una alternativa más corta para cerrar el día. Regresa con luz y respeta parcelas, ganado y señalización.",
      },
    ],
    checks: [
      "Comprueba estado de caminos, riesgo de tormenta y avisos municipales antes de salir.",
      "Revisa el sistema de aparcamiento regulado y llega con una alternativa si está completo.",
      "No planifiques baño en la riera o el salto sin una autorización local expresa y vigente.",
    ],
    sources: [
      {
        label: "Ayuntamiento de Rupit i Pruit: rutas a pie",
        url: "https://www.rupitpruit.cat/turisme/que-fer/rutes-a-peu",
        supports:
          "Itinerarios oficiales, protección del Collsacabra y recomendaciones de senderismo responsable.",
      },
      {
        label: "Ayuntamiento de Rupit i Pruit: Salt de Sallent",
        url: "https://www.rupitpruit.cat/turisme/llocs-dinteres/riera-de-rupit-i-salt-del-sallent.html",
        supports:
          "Recorrido de la riera, localización del salto y valores naturales del entorno.",
      },
      {
        label: "Ayuntamiento de Rupit i Pruit: información útil",
        url: "https://www.rupitpruit.cat/turisme/informacio-util",
        supports:
          "Oficina de turismo, aparcamiento de entrada y gestión de visitantes del núcleo histórico.",
      },
    ],
  },
  cercedilla: {
    seoTitle: "Cercedilla en verano: Fuenfría y Las Berceas",
    seoDescription:
      "Organiza un día fresco en Cercedilla: Camino del Agua, Valle de la Fuenfría y piscinas de Las Berceas, con reservas y acceso sin sorpresas.",
    localOverview:
      "Cercedilla es una de las escapadas serranas que mejor funciona sin coche: el tren llega al casco y desde la estación parte el Camino del Agua hacia el Valle de la Fuenfría. En Las Dehesas se concentran el centro de visitantes, rutas históricas y el parque recreativo de Las Berceas, por lo que conviene elegir un plan principal en lugar de intentar abarcar toda la sierra.",
    coolingFactors:
      "Los pinares de pino silvestre, los arroyos y la cota de la Fuenfría rebajan la exposición respecto a Madrid. El efecto se nota sobre todo bajo cubierta forestal y al final del día; los caminos de subida siguen exigiendo agua y protección solar. Las piscinas de Las Berceas son una instalación controlada, no un baño libre en el río.",
    stayAdvice:
      "Cerca de la estación resulta práctico si llegas en transporte público y quieres cenar en el pueblo. Las zonas altas acercan al pinar, pero pueden depender de coche o taxi. Comprueba la pendiente y la distancia peatonal real: en Cercedilla, un kilómetro en el mapa puede incluir una subida considerable.",
    accessAdvice:
      "La línea de Cercanías permite llegar al pueblo y caminar desde la estación. Si vas a Las Berceas en temporada, entrada y aparcamiento son gestiones separadas y las plazas de coche son limitadas; consulta la página municipal y utiliza el transporte local habilitado cuando corresponda.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Camino del Agua desde la estación",
        detail:
          "Sigue las marcas azul claro desde Cercedilla hacia el centro de visitantes de la Fuenfría. La ruta oficial atraviesa pinar y suma subida moderada; comienza temprano y reserva fuerzas para el resto del día.",
      },
      {
        time: "Mediodía",
        title: "Las Berceas con todo reservado",
        detail:
          "Accede únicamente con la entrada y, si vas en coche, la reserva de estacionamiento que exija el Ayuntamiento. El recinto tiene piscinas y zonas de estancia; no admite animales y puede completar aforo.",
      },
      {
        time: "Tarde-noche",
        title: "Regreso al casco y paseo ligero",
        detail:
          "Baja al pueblo con el servicio disponible o caminando solo si aún tienes margen y luz. Termina alrededor de la plaza y la estación, evitando añadir otra senda de montaña después de un día activo.",
      },
    ],
    checks: [
      "Comprueba entradas, aparcamiento y transporte de Las Berceas en la web municipal.",
      "Revisa avisos del Parque Nacional y posibles limitaciones por incendio o trabajos forestales.",
      "Confirma el servicio ferroviario para la fecha, incluida cualquier sustitución temporal.",
    ],
    sources: [
      {
        label: "Ayuntamiento de Cercedilla: Las Berceas",
        url: "https://cercedilla.es/piscinas/",
        supports:
          "Condiciones de acceso, reservas, servicios, aforo y normas del parque recreativo.",
      },
      {
        label: "Parque Nacional: Camino del Agua",
        url: "https://www.parquenacionalsierraguadarrama.es/visita/rutas/1308-pnsg-034",
        supports:
          "Trazado desde la estación, señalización, distancia, perfil y acceso en transporte público.",
      },
      {
        label: "Parque Nacional: Centro Valle de la Fuenfría",
        url: "https://www.parquenacionalsierraguadarrama.es/?catid=81&id=11&option=com_contact&view=contact",
        supports:
          "Ubicación, alternativas de transporte y recursos de visita del valle.",
      },
    ],
  },
  rascafria: {
    seoTitle: "Rascafría en verano: El Paular y Las Presillas",
    seoDescription:
      "Plan fresco en Rascafría con El Paular, Bosque de Finlandia y Las Presillas: ruta familiar, baño autorizado y controles antes de viajar.",
    localOverview:
      "Rascafría ocupa el fondo del alto valle del Lozoya, con un casco manejable y un corredor verde que enlaza El Paular, el Puente del Perdón, Los Batanes y el llamado Bosque de Finlandia. A diferencia de otros destinos serranos, aquí es posible organizar una jornada familiar de poca pendiente sin renunciar a bosque, patrimonio y agua.",
    coolingFactors:
      "La vegetación de ribera, los robledales y la altitud del valle suavizan el paseo, especialmente al amanecer y por la tarde. Las Presillas añaden una zona de baño permitida y gestionada, pero el agua es fría y el área puede sufrir cierres o cambios operativos. Fuera de ese recinto no debe asumirse que el baño está autorizado.",
    stayAdvice:
      "Alojarse en el casco facilita hacer a pie la circular hacia El Paular y salir a cenar sin coche. Las casas dispersas del valle pueden ser muy tranquilas, aunque conviene confirmar acceso peatonal, sombra y distancia a servicios, no solo las vistas.",
    accessAdvice:
      "El acceso habitual asciende por el valle desde la A-1 y concentra tráfico los días de calor. Sal temprano, usa únicamente aparcamientos habilitados y no bloquees cunetas ni entradas. Si dependes del autobús, verifica ida y vuelta para la fecha exacta porque la frecuencia no equivale a la de un servicio urbano.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Circular de El Paular y Los Batanes",
        detail:
          "Parte temprano del casco por la ruta oficial de 4,3 kilómetros. Enlaza vegetación de ribera, El Paular, el Puente del Perdón y el entorno del Bosque de Finlandia con un recorrido catalogado como familiar.",
      },
      {
        time: "Mediodía",
        title: "Baño solo en Las Presillas",
        detail:
          "Si el área está abierta y autorizada, usa exclusivamente sus pozas habilitadas y sigue las indicaciones municipales. La entrada al área y el estacionamiento tienen condiciones distintas; consulta ambas antes de ir.",
      },
      {
        time: "Tarde-noche",
        title: "Regreso tranquilo por el valle",
        detail:
          "Vuelve al casco antes del cierre de accesos y deja que baje la temperatura. Un paseo corto por las calles de Rascafría es mejor cierre que empezar otra ruta forestal con poca luz.",
      },
    ],
    checks: [
      "Consulta la página municipal de Las Presillas por cierres, condiciones y aparcamiento.",
      "Comprueba la información sanitaria vigente de zonas de baño de la Comunidad de Madrid.",
      "Revisa avisos del Parque Nacional y el estado de la ruta antes de caminar.",
    ],
    sources: [
      {
        label: "Parque Nacional: El Paular y Los Batanes",
        url: "https://www.parquenacionalsierraguadarrama.es/visita/rutas/1303-pnsg-029",
        supports:
          "Recorrido circular familiar, distancia y puntos de interés naturales y culturales.",
      },
      {
        label: "Ayuntamiento de Rascafría: Las Presillas",
        url: "https://www.rascafria.org/zona-recreativa-las-presillas/",
        supports:
          "Zona en la que está permitido el baño, condiciones de acceso y advertencias municipales.",
      },
      {
        label: "Ayuntamiento de Rascafría: ruta a El Paular",
        url: "https://www.rascafria.org/desde-rascafria-a-el-paular/",
        supports:
          "Alternativas locales del paseo entre el casco, El Paular y Las Presillas.",
      },
    ],
  },
  "la-granja-de-san-ildefonso": {
    seoTitle: "La Granja en verano: jardines y Valsaín",
    seoDescription:
      "Visita La Granja de San Ildefonso en verano con jardines, palacio y pinares de Valsaín: plan por horas, accesos y comprobaciones esenciales.",
    localOverview:
      "La Granja combina un conjunto palaciego del siglo XVIII con la vertiente segoviana de Guadarrama. Los jardines históricos, el Palacio Real y la trama urbana ocupan la mañana cultural; muy cerca, Valsaín y las Pesquerías Reales permiten cambiar esculturas y fuentes por pinar y ribera sin plantear una ascensión de alta montaña.",
    coolingFactors:
      "La cota cercana a 1.200 metros, la orientación norte de la sierra y el arbolado de jardines y Valsaín aportan sombra y mejores noches. Las explanadas del palacio y algunos tramos de las Pesquerías siguen expuestos; el agua ornamental refresca el paisaje, pero las fuentes históricas no son zonas de baño y no funcionan todas a diario.",
    stayAdvice:
      "Dormir en el Real Sitio deja el palacio y los jardines a pie y permite pasear cuando se marchan las visitas del día. Valsaín es preferible si buscas ambiente forestal, pero comprueba la conexión con restaurantes y monumentos para no depender continuamente del coche.",
    accessAdvice:
      "Se llega por carretera desde Segovia y existen conexiones regulares que deben verificarse para la fecha del viaje. Aparca en las zonas urbanas habilitadas y recorre el núcleo a pie. Para Valsaín y Boca del Asno, respeta la señalización y no estaciones en márgenes forestales cuando los aparcamientos estén completos.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Jardines de La Granja a primera hora",
        detail:
          "Entra cuando abra el recinto y recorre primero los ejes más alejados y arbolados. Consulta aparte el calendario de funcionamiento de fuentes: el acceso a los jardines no implica que todos los surtidores estén activos.",
      },
      {
        time: "Mediodía",
        title: "Palacio y comida sin exposición",
        detail:
          "Traslada el centro del día al interior del Palacio Real, si está abierto y tienes entrada, y a una comida en el casco. Verifica el último acceso y posibles cierres por actos oficiales.",
      },
      {
        time: "Tarde-noche",
        title: "Un tramo de las Pesquerías en Valsaín",
        detail:
          "Con el sol más bajo, elige un tramo corto y de ida y vuelta junto al río desde un acceso oficial de Valsaín o Boca del Asno. No intentes completar la ruta larga si no has calculado tiempo y regreso.",
      },
    ],
    checks: [
      "Consulta horarios y cierres del Palacio y los jardines en Patrimonio Nacional.",
      "Comprueba por separado el calendario oficial de encendido de las fuentes monumentales.",
      "Revisa avisos forestales y accesos de Valsaín antes de desplazarte al pinar.",
    ],
    sources: [
      {
        label: "Patrimonio Nacional: Palacio Real de La Granja",
        url: "https://www.patrimonionacional.es/visita/palacio-real-de-la-granja",
        supports:
          "Historia, espacios visitables, horarios, cierres y medios de acceso al Real Sitio.",
      },
      {
        label: "Patrimonio Nacional: Jardines de La Granja",
        url: "https://www.patrimonionacional.es/visita/jardines-de-la-granja",
        supports:
          "Diseño, sistema hidráulico, fuentes y horarios propios del recinto ajardinado.",
      },
      {
        label: "Turismo de Castilla y León: Real Sitio-El Espinar",
        url: "https://www.turismocastillayleon.com/es/naturaleza/real-sitio-san-ildefonso-espinar",
        supports:
          "Entorno natural protegido, Pesquerías Reales, Valsaín y red oficial de sendas.",
      },
    ],
  },
  siguenza: {
    seoTitle: "Sigüenza en verano: guía para evitar el calor",
    seoDescription:
      "Recorre Sigüenza en verano con catedral, castillo y Alameda: itinerario adaptado al calor, acceso al casco y escapadas cercanas al río Dulce.",
    localOverview:
      "Sigüenza es una ciudad histórica completa, no solo una fotografía del castillo. Desde la estación y la Alameda, el casco asciende hacia la catedral, la plaza Mayor, las Travesañas, la Casa del Doncel y la fortaleza convertida en Parador. Sus pedanías también alcanzan el Parque Natural del Barranco del Río Dulce, que merece una jornada propia.",
    coolingFactors:
      "La altitud y el aire seco favorecen noches agradables, pero el casco de piedra puede calentarse mucho en las horas centrales. La Alameda ofrece arbolado en la parte baja y los interiores monumentales permiten alternar la subida. El Barranco del Río Dulce tiene tramos de ribera, aunque no debe añadirse a mediodía como una excursión improvisada.",
    stayAdvice:
      "La parte alta tiene más atmósfera medieval y más pendiente; la zona de la Alameda y la estación facilita llegada, aparcamiento y un regreso llano al final del día. Si el calor condiciona tu descanso, pregunta por ventilación o climatización: la noche fresca no garantiza que una habitación cerrada se enfríe rápido.",
    accessAdvice:
      "Sigüenza está conectada por carretera y ferrocarril, pero conviene confirmar el servicio del día. Si llegas en coche, evita buscar paso por las calles más estrechas del recinto histórico: aparca fuera de la zona alta y realiza la ruta a pie, contando con el desnivel.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Del castillo a la plaza Mayor",
        detail:
          "Sube temprano hasta el castillo y desciende por las Travesañas, San Vicente, la Casa del Doncel y la calle Mayor. Hacer el recorrido de arriba abajo reduce esfuerzo cuando el sol ya empieza a apretar.",
      },
      {
        time: "Mediodía",
        title: "Catedral, museo y mesa seguntina",
        detail:
          "Usa las horas centrales para la catedral u otro interior abierto y reserva tiempo para comer. Los horarios pueden cambiar por culto o actividades, así que consulta las páginas oficiales antes de comprar o desplazarte.",
      },
      {
        time: "Tarde-noche",
        title: "Alameda y fachadas con la última luz",
        detail:
          "Descansa bajo el arbolado de la Alameda y vuelve a la plaza Mayor cuando las fachadas pierdan sol. Deja la Hoz de Pelegrina o La Cabrera para otra mañana preparada con agua y ruta oficial.",
      },
    ],
    checks: [
      "Confirma horarios de catedral, Casa del Doncel, visitas municipales y espacios del castillo.",
      "Comprueba el tren o autobús de regreso antes de comenzar la subida al casco.",
      "Si visitas el Río Dulce, revisa avisos del parque y elige una ruta acorde a calor y experiencia.",
    ],
    sources: [
      {
        label: "Turismo municipal de Sigüenza: propuestas",
        url: "https://www.visitasiguenza.es/propuestas-monumentales/",
        supports:
          "Recorrido histórico, principales monumentos, Alameda y opciones oficiales de acceso.",
      },
      {
        label: "Turismo de Castilla-La Mancha: Sigüenza",
        url: "https://www.turismocastillalamancha.es/es/destinos/encanto-rural/guadalajara/siguenza.html",
        supports:
          "Conjunto histórico, patrimonio, gastronomía y relación con el Barranco del Río Dulce.",
      },
      {
        label: "Áreas Protegidas CLM: guía del Río Dulce",
        url: "https://medionatural.castillalamancha.es/sites/default/files/documentos/pdf/20240115//pn_barranco_rio_dulce_interactivo.pdf",
        supports:
          "Rutas, sombra, centros de visitantes y valores naturales del parque.",
      },
    ],
  },
  "navarredonda-de-gredos": {
    seoTitle: "Navarredonda de Gredos en verano: guía fresca",
    seoDescription:
      "Planifica Navarredonda de Gredos en verano: Chorreras, pinar y rutas familiares, con consejos de altitud, accesos y seguridad en la sierra.",
    localOverview:
      "Navarredonda y su anejo Barajas forman una base elevada en la cara norte de Gredos. Desde el pueblo salen rutas municipales hacia el Tormes, Las Chorreras, el pinar y el Parador, mientras la Plataforma abre itinerarios de alta montaña. No hace falta subir a la Laguna Grande para disfrutar del paisaje: los recorridos locales son más sensatos en una escapada contra el calor.",
    coolingFactors:
      "A más de 1.500 metros, el descenso nocturno suele ser notable. El pinar de Navarredonda y los cursos del Tormes aportan sombra y ambiente fresco, pero las praderas y canchales quedan muy expuestos y el tiempo de Gredos cambia con rapidez. Las pozas solo deben usarse si la normativa y las condiciones sanitarias vigentes permiten el baño.",
    stayAdvice:
      "Dormir en el pueblo maximiza la ventaja térmica y deja servicios y rutas locales cerca. Lleva ropa para una noche fría incluso en julio o agosto. Si reservas un alojamiento aislado, pregunta por el estado del camino, cobertura y distancia a pie: «en Gredos» puede abarcar un área extensa.",
    accessAdvice:
      "La carretera de acceso atraviesa puertos y tramos de montaña; consulta meteorología y estado vial. El Ayuntamiento publica conexiones desde Madrid y Ávila, pero deben confirmarse con el operador. Para la Plataforma, comprueba regulación y ocupación antes de salir y nunca aparques fuera de lo habilitado.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Las Chorreras junto al Tormes",
        detail:
          "Sal temprano por el Camino Navatormes y sigue la ruta municipal que enlaza Navarredonda con Barajas junto al río y pequeñas cascadas. Lleva el trazado descargado y no presupongas que cualquier poza admite baño.",
      },
      {
        time: "Mediodía",
        title: "Comida, sombra y descanso en altura",
        detail:
          "Regresa al casco para comer. Si la piscina municipal está abierta, consulta allí mismo condiciones y acceso; si no, aprovecha la sobremesa y evita empezar una ruta a la Plataforma con el sol alto.",
      },
      {
        time: "Tarde-noche",
        title: "Pinar y entorno del Parador",
        detail:
          "La ruta municipal del Pinar y Parador es prácticamente llana y pasa por Prado Viejo, la fuente de la Ladera y Peña Histórica. Hazla con luz suficiente y vuelve al pueblo antes de que caiga la temperatura.",
      },
    ],
    checks: [
      "Consulta la previsión de montaña, tormentas y riesgo de incendio en Gredos.",
      "Verifica apertura de piscina, oficina turística y cualquier regulación de la Plataforma.",
      "Pregunta por estado del agua y autorización antes de bañarte en una garganta o poza.",
    ],
    sources: [
      {
        label: "Ayuntamiento de Navarredonda: Las Chorreras",
        url: "https://navarredondadegredos.net/rutas/ruta-5-las-chorreras/",
        supports:
          "Itinerario local entre Navarredonda, el Tormes, Las Chorreras y Barajas.",
      },
      {
        label: "Ayuntamiento de Navarredonda: Pinar y Parador",
        url: "https://navarredondadegredos.net/rutas/ruta-6-pinar-y-parador/",
        supports:
          "Recorrido fácil y casi llano por el pinar, fuentes y entorno del Parador.",
      },
      {
        label: "Patrimonio Natural: Sierra de Gredos",
        url: "https://patrimonionatural.org/espacios-naturales/parque-regional/parque-regional-sierra-de-gredos",
        supports:
          "Ámbito protegido, relieve, vegetación, fauna y red oficial de rutas del parque regional.",
      },
    ],
  },
  candelario: {
    seoTitle: "Candelario en verano: pueblo, agua y sierra",
    seoDescription:
      "Descubre Candelario en verano con regaderas, Casa Chacinera y senderos de la sierra: un plan fresco, realista y útil para organizar la visita.",
    localOverview:
      "Candelario asciende por una ladera de la sierra de Béjar entre casas chacineras, batipuertas y regaderas que conducen agua por las calles. La ruta urbana explica ese patrimonio y los caminos municipales alcanzan robledales, pinares y miradores. El encanto está en combinar pueblo y sierra, no en atravesar el casco deprisa para subir directamente a una cumbre.",
    coolingFactors:
      "La altitud, los arroyos y las calles estrechas ayudan a crear rincones agradables, mientras el robledal de la Garganta del Oso aporta sombra en parte del recorrido. Las pendientes orientadas al sol pueden calentarse y las regaderas no son un juego de agua: forman parte del sistema tradicional y deben mantenerse limpias y libres.",
    stayAdvice:
      "Un alojamiento dentro del conjunto histórico permite pasear al amanecer y después de cenar, pero implica cuestas, escalones y acceso limitado con vehículo. Si llevas equipaje pesado o movilidad reducida, confirma dónde se puede detener el coche y la distancia hasta la entrada.",
    accessAdvice:
      "Entra por los accesos señalizados y aparca antes de las calles más estrechas. Si llegas mediante Béjar, verifica la conexión local de la fecha. Para los senderos, descarga la ficha municipal, evita depender de cobertura y no sigas hacia alta montaña sin equipo, experiencia y previsión específica.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Garganta del Oso entre robles",
        detail:
          "Empieza temprano la ruta municipal, de dificultad media-baja, que alcanza la confluencia de los arroyos del Águila y del Oso. El primer tramo puede implicar carretera: estudia la alternativa indicada por el Ayuntamiento y lleva el trazado.",
      },
      {
        time: "Mediodía",
        title: "Casa Chacinera y cocina serrana",
        detail:
          "Reserva la franja de más calor para el Museo de la Casa Chacinera si hay visita disponible. Comprueba horario o reserva; su interior explica las batipuertas, las regaderas y la vida tradicional mejor que una fotografía exterior.",
      },
      {
        time: "Tarde-noche",
        title: "Ruta urbana siguiendo las regaderas",
        detail:
          "Con luz suave, sigue la señalización de la Ruta Urbana 2.0 por el conjunto histórico. Camina con atención sobre piedra y junto a los canales, y termina en un mirador sin bloquear portales ni pasos vecinales.",
      },
    ],
    checks: [
      "Confirma las visitas del Museo Casa Chacinera y la apertura de la oficina de turismo.",
      "Revisa previsión, tormentas y riesgo de incendio antes de entrar en la sierra.",
      "Distingue las rutas familiares de las ascensiones de alta montaña y descarga la ficha correcta.",
    ],
    sources: [
      {
        label: "Ayuntamiento de Candelario: Ruta Urbana 2.0",
        url: "https://www.candelario.es/ruta-urbana-2-0-candelario/",
        supports:
          "Señalización e interpretación oficial de los puntos de interés del conjunto histórico.",
      },
      {
        label: "Ayuntamiento de Candelario: Casa Chacinera",
        url: "https://www.candelario.es/museo-casa-chacinera-de-candelario/",
        supports:
          "Contenido etnográfico, batipuertas, regaderas y modalidad de visita del museo.",
      },
      {
        label: "Ayuntamiento de Candelario: rutas",
        url: "https://www.candelario.es/rutas-por-candelario/",
        supports:
          "Clasificación municipal de rutas familiares y de alta montaña en la sierra.",
      },
    ],
  },
} satisfies Record<string, DestinationEditorial>;
