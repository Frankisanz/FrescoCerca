import type { DestinationEditorial } from "@/lib/destination-editorial-types";

export const southDestinationEditorial = {
  grazalema: {
    seoTitle: "Grazalema en verano: planes para refrescarse",
    seoDescription:
      "Organiza un día de verano en Grazalema y Benamahoma con paseos cortos, patrimonio, agua y miradores, evitando las horas de calor intenso.",
    localOverview:
      "Grazalema reúne un casco blanco encajado entre sierras calizas y, dentro del mismo municipio, el paisaje de agua de Benamahoma. Es una base cómoda para alternar paseos breves, patrimonio y miradores sin convertir el día en una travesía exigente.",
    coolingFactors:
      "La cota del pueblo, las calles estrechas y el alivio nocturno suelen ayudar más que en la campiña baja; en Benamahoma, el nacimiento y la vegetación del arroyo aportan sombra ambiental. Aun así, los claros del sendero y las plazas se calientan al mediodía, y la presencia de agua no implica que el baño esté permitido.",
    stayAdvice:
      "En el casco histórico conviene priorizar una habitación con contraventanas, ventilación cruzada y climatización confirmada, no solo muros gruesos. Si llevas equipaje pesado o coche, pregunta por el acceso real y el aparcamiento: las calles centrales son estrechas y con pendiente.",
    accessAdvice:
      "Las carreteras de la sierra son sinuosas y los tiempos de conducción se alargan; evita encadenar demasiadas paradas. Aparca en zonas habilitadas, comprueba antes posibles cierres de senderos y no cuentes con El Pinsapar como paseo improvisado, pues su acceso está regulado y en verano tiene restricciones específicas.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Benamahoma y Arroyo del Descansadero",
        detail:
          "Empieza temprano junto al Nacimiento de Benamahoma y recorre el itinerario corto del Arroyo del Descansadero hacia el Molino del Susto y los Llanos del Campo. Hazlo de ida y vuelta antes de que suba el sol y sigue siempre la señalización vigente.",
      },
      {
        time: "Mediodía",
        title: "Ecomuseo del Agua y pausa larga",
        detail:
          "Si está abierto, visita el Ecomuseo del Agua en el antiguo Molino del Nacimiento para entender cómo movían el agua molinos, batanes y huertas. Después, almuerza en Benamahoma o Grazalema y reserva las horas centrales para descansar bajo techo.",
      },
      {
        time: "Tarde-noche",
        title: "Casco histórico y Los Asomaderos",
        detail:
          "Cuando baje el sol, pasea por la Plaza de España, las calles empedradas y las iglesias del centro. Termina en el Mirador de los Asomaderos, dentro del núcleo urbano, para contemplar el valle del Guadalete sin añadir otra ruta de montaña.",
      },
    ],
    checks: [
      "Confirma en la oficina de turismo el estado del Arroyo del Descansadero y cualquier limitación por obras, incendios o conservación.",
      "Consulta el horario del Ecomuseo del Agua el mismo día; la apertura puede variar por temporada.",
      "Revisa previsión, avisos de calor y restricciones del parque antes de plantear cualquier sendero adicional.",
    ],
    sources: [
      {
        label: "Turismo de Grazalema — Arroyo del Descansadero",
        url: "https://turismo.grazalema.es/index.php/rutas/rutas/137-ruta-arroyo-del-descansadero",
        supports:
          "Describe el itinerario corto entre Benamahoma y los Llanos del Campo, el Molino del Susto, la fuente y la vegetación del recorrido.",
      },
      {
        label: "Turismo de Grazalema — Ecomuseo del Agua",
        url: "https://turismo.grazalema.es/index.php/agua/177-ecomuseo-del-agua",
        supports:
          "Sitúa el museo en el antiguo Molino del Nacimiento y documenta los usos históricos del agua en Benamahoma.",
      },
      {
        label: "Turismo de Grazalema — Mirador de los Asomaderos",
        url: "https://turismo.grazalema.es/index.php/rutas/atalayas/156-mirador-de-los-asomaderos",
        supports:
          "Ubica este mirador en el casco de Grazalema y detalla sus vistas sobre el Guadalete y las sierras próximas.",
      },
    ],
  },
  capileira: {
    seoTitle: "Capileira en verano: planes y consejos",
    seoDescription:
      "Planifica Capileira en verano con rutas tempranas, arquitectura alpujarreña y acceso guiado a las altas cumbres, siempre con previsión oficial.",
    localOverview:
      "Capileira ocupa la parte alta del barranco del Poqueira, a unos 1.436 metros, y conserva tinaos, terraos, lavaderos y calles escalonadas de arquitectura alpujarreña. Su posición permite asomarse a la alta montaña, pero exige distinguir un paseo de pueblo de una ruta seria por Sierra Nevada.",
    coolingFactors:
      "La altitud favorece noches más llevaderas y los tinaos ofrecen pequeños tramos de sombra dentro del casco. Fuera del pueblo, el sol y la radiación son intensos, las acequias no son zonas de baño y la sensación térmica puede cambiar deprisa con viento o tormenta.",
    stayAdvice:
      "Busca alojamiento con persianas, ventilación cruzada y una descripción clara del acceso: muchas casas implican escaleras y acarreo desde el aparcamiento. Una terraza orientada al oeste puede ser muy calurosa por la tarde; confirma sombra y climatización si vas en una ola de calor.",
    accessAdvice:
      "La llegada se hace por carretera de montaña y los aparcamientos se concentran en los accesos al núcleo, por lo que conviene viajar ligero. El servicio de interpretación de las altas cumbres requiere reserva y confirmación; puede modificar o suspender salidas por meteorología o seguridad.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Primer tramo de las Acequias del Poqueira",
        detail:
          "Sal con la primera luz por el inicio señalizado del PR-A 23 y recorre solo un tramo asumible del Camino de la Sierra, entre arquitectura rural, acequias y vistas del barranco. Fija la hora de regreso antes de salir; la ruta completa no es un paseo para improvisar con calor.",
      },
      {
        time: "Mediodía",
        title: "Tinaos, lavaderos y casa-museo",
        detail:
          "Refúgiate en el entramado del pueblo para enlazar tinaos y los lavaderos públicos. Si coincide con su apertura, entra en la Casa Museo Pedro Antonio de Alarcón; completa la franja central con comida y descanso, sin subir cuestas innecesarias.",
      },
      {
        time: "Tarde-noche",
        title: "Altas cumbres con plaza confirmada",
        detail:
          "Si has reservado el último turno operativo del servicio de interpretación, sube en el microbús autorizado hacia Puerto Molina o Alto del Chorrillo y sigue las instrucciones del guía. Si la salida se cancela, cambia el plan por los miradores del propio Capileira al atardecer.",
      },
    ],
    checks: [
      "Reserva y reconfirma el servicio de altas cumbres; la ruta y el punto final pueden variar por seguridad o meteorología.",
      "Comprueba previsión de montaña, estado del PR-A 23 y cualquier restricción por riesgo de incendio.",
      "Pregunta al alojamiento por aparcamiento, escaleras y distancia real para mover el equipaje por el casco.",
    ],
    sources: [
      {
        label: "Ayuntamiento de Capileira — Turismo",
        url: "https://capileira.es/",
        supports:
          "Documenta la arquitectura alpujarreña, los tinaos y terraos, los lavaderos y la Casa Museo Pedro Antonio de Alarcón.",
      },
      {
        label: "MITECO — Servicio de Interpretación de Altas Cumbres",
        url: "https://www.miteco.gob.es/es/parques-nacionales-oapn/red-parques-nacionales/parques-nacionales/sierra-nevada/guia-visitante/interpretacion-altas-cumbres.html",
        supports:
          "Explica las salidas guiadas en microbús desde Capileira, sus paradas y la posibilidad de cambios o suspensión.",
      },
      {
        label: "Junta de Andalucía — Acequias del Poqueira",
        url: "https://www.juntadeandalucia.es/medioambiente/contenidoExterno/rutasysenderosSierraNevada/sendero-12.html",
        supports:
          "Describe el PR-A 23 desde Capileira, el Camino de la Sierra, La Cebadilla y el paisaje de acequias y pinares.",
      },
    ],
  },
  "guejar-sierra": {
    seoTitle: "Güéjar Sierra en verano: rutas y frescor",
    seoDescription:
      "Descubre Güéjar Sierra en verano: Vía Verde del Tranvía junto al Genil, centro de visitantes y un plan adaptado a las horas de calor del verano.",
    localOverview:
      "Güéjar Sierra combina un pueblo serrano a unos 1.088 metros con el corredor del Genil y el antiguo trazado del tranvía de Sierra Nevada. Es posible acercarse al río sin asumir la exigente Vereda de la Estrella, siempre que se limite la distancia y se madrugue.",
    coolingFactors:
      "La altitud, el arbolado de ribera y algunos túneles del viejo tranvía aportan alivio por tramos, mientras el río suaviza el entorno inmediato. No toda la vía está sombreada, las pozas no equivalen a zonas de baño autorizadas y el fondo del valle puede acumular calor a mediodía.",
    stayAdvice:
      "En el núcleo busca ventilación cruzada, persianas y aparcamiento confirmado, porque el centro tiene pendientes y calles ajustadas. Si eliges una casa junto al río, pregunta por el acceso nocturno, la cobertura y la presencia de mosquitos, además de la climatización.",
    accessAdvice:
      "El acceso hacia Maitena y Barranco de San Juan discurre por una carretera estrecha que reutiliza parte del corredor del tranvía, con túneles y aparcamiento limitado. No bloquees apartaderos ni avances si hay señalización temporal; para El Dornajo se accede por la carretera de Sierra Nevada, no por la pista del río.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Vía Verde del Tranvía junto al Genil",
        detail:
          "Recorre temprano un tramo de ida y vuelta del antiguo tranvía hacia Maitena o Barranco de San Juan, junto al Genil y sus túneles. Da la vuelta con margen suficiente: completar la Vereda de la Estrella añadiría mucha distancia y desnivel y no forma parte de este plan de calor.",
      },
      {
        time: "Mediodía",
        title: "Centro de Visitantes El Dornajo",
        detail:
          "Tras la caminata, desplázate a El Dornajo solo si su apertura está confirmada. Sus recursos interpretativos y mapas ayudan a leer Sierra Nevada bajo techo; después, almuerza y descansa en vez de iniciar otra ruta expuesta.",
      },
      {
        time: "Tarde-noche",
        title: "Plaza Mayor y casco de Güéjar Sierra",
        detail:
          "Regresa cuando las fachadas empiecen a dar sombra y pasea sin prisa por la Plaza Mayor y las calles en torno a la parroquia de Nuestra Señora del Rosario. Es un cierre sencillo que evita volver a mover el coche por el estrecho valle.",
      },
    ],
    checks: [
      "Verifica el estado del acceso y del firme en la Vía Verde del Tranvía, especialmente tras tormentas u obras.",
      "Consulta el horario vigente de El Dornajo antes de subir por la carretera de Sierra Nevada.",
      "Revisa calor, tormentas de montaña y riesgo de incendio; lleva agua aunque el recorrido siga el río.",
    ],
    sources: [
      {
        label: "Turismo de Granada — Güéjar Sierra",
        url: "https://turismo.granada.org/es/guejar-sierra",
        supports:
          "Presenta la Vía Verde del antiguo tranvía, el corredor del Genil, Barranco de San Juan y la exigencia de la Vereda de la Estrella.",
      },
      {
        label: "Junta de Andalucía — Tranvía de Sierra Nevada",
        url: "https://www.juntadeandalucia.es/medioambiente/contenidoExterno/rutasysenderosSierraNevada/sendero-19.html",
        supports:
          "Detalla el trazado del antiguo tranvía, sus túneles y el recorrido entre Güéjar Sierra, Maitena y Barranco de San Juan.",
      },
      {
        label: "MITECO — Centro de Visitantes El Dornajo",
        url: "https://www.miteco.gob.es/es/parques-nacionales-oapn/red-parques-nacionales/parques-nacionales/sierra-nevada/guia-visitante/dornajo.html",
        supports:
          "Ubica el centro en el término de Güéjar Sierra y describe sus servicios de información e interpretación del parque.",
      },
    ],
  },
  cazorla: {
    seoTitle: "Cazorla en verano: patrimonio y naturaleza",
    seoDescription:
      "Combina el Castillo de la Yedra, la Bóveda del Cerezuelo y las Ruinas de Santa María en un día de verano organizado alrededor del calor.",
    localOverview:
      "Cazorla se extiende en pendiente entre la Peña de los Halcones y el valle, con el Castillo de la Yedra dominando un casco de plazas, ruinas y callejas. En verano ofrece un día patrimonial completo sin necesidad de conducir hasta el interior del parque natural.",
    coolingFactors:
      "Los interiores de piedra, la bóveda sobre el Cerezuelo y la sombra cambiante de las calles ayudan a repartir las visitas. La subida al castillo y los miradores quedan expuestos, y la altitud del pueblo no impide tardes calurosas; conviene reservarlos para primera o última hora.",
    stayAdvice:
      "Dormir cerca de la Plaza de Santa María facilita caminar, pero puede implicar escaleras, ruido y ausencia de aparcamiento en la puerta. Confirma aire acondicionado o ventilación efectiva y valora un alojamiento en una cota más accesible si viajas con movilidad reducida o mucho equipaje.",
    accessAdvice:
      "El casco antiguo tiene pendientes fuertes y calles estrechas: aparca en una zona habilitada y continúa a pie en lugar de buscar cada monumento en coche. Si añades una excursión al parque, calcula carreteras lentas y consulta cierres, aforos y riesgo de incendio por separado.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Castillo de la Yedra y museo",
        detail:
          "Sube a primera hora al Castillo de la Yedra y entra en el Museo de Artes y Costumbres Populares del Alto Guadalquivir si está abierto. Haz el ascenso antes del calor y lleva calzado firme para el empedrado y las pendientes.",
      },
      {
        time: "Mediodía",
        title: "Bóveda del Cerezuelo y Ruinas de Santa María",
        detail:
          "Baja a la Plaza de Santa María para conocer la bóveda que encauza el río bajo la iglesia y la plaza. Enlaza la visita interior con las Ruinas de Santa María y la oficina de turismo, ajustándote a los turnos disponibles, y después haz una pausa larga para comer.",
      },
      {
        time: "Tarde-noche",
        title: "Balcón de Zabaleta y plazas del centro",
        detail:
          "Con la luz más baja, cruza el casco hacia el Balcón de Zabaleta y detente en sus vistas del castillo y la sierra. Continúa hasta la Plaza de la Corredera para cenar o tomar algo sin emprender un sendero a última hora.",
      },
    ],
    checks: [
      "Consulta el horario y las condiciones de visita del museo del Castillo de la Yedra.",
      "Pregunta por turnos o reservas de la Bóveda del Cerezuelo y por el acceso actual a las Ruinas de Santa María.",
      "Revisa aparcamientos, avisos de calor y restricciones del parque si piensas salir del núcleo urbano.",
    ],
    sources: [
      {
        label: "Turismo de Cazorla — Ruinas de Santa María",
        url: "https://cazorlaturismo.es/puntos-de-interes/ruinas-de-santa-maria/",
        supports:
          "Describe el principal conjunto monumental de la plaza y sitúa allí la oficina municipal de turismo.",
      },
      {
        label: "Turismo de Cazorla — Bóveda del Río Cerezuelo",
        url: "https://cazorlaturismo.es/puntos-de-interes/boveda-del-rio-cerezuelo/",
        supports:
          "Explica el encauzamiento del Cerezuelo bajo la iglesia y la plaza y la posibilidad de visitar su interior.",
      },
      {
        label: "Junta de Andalucía — Museo del Castillo de la Yedra",
        url: "https://www.juntadeandalucia.es/organismos/culturaydeporte/servicios/directorio-instituciones/detalle/2613.html",
        supports:
          "Identifica el museo oficial del castillo, sus colecciones etnográficas y la información práctica de acceso.",
      },
    ],
  },
  riopar: {
    seoTitle: "Riópar en verano: Río Mundo y patrimonio",
    seoDescription:
      "Prepara una escapada de verano a Riópar con el Nacimiento del Río Mundo, las Reales Fábricas y un tranquilo y sereno atardecer en Riópar Viejo.",
    localOverview:
      "Riópar permite leer tres paisajes en pocos kilómetros: el pueblo de servicios surgido junto a las Reales Fábricas, el núcleo histórico de Riópar Viejo y el valle donde nace el río Mundo. Repartirlos por franjas horarias evita concentrar coche y caminata en pleno calor.",
    coolingFactors:
      "Los pinares, la cota próxima a 950 metros y el entorno húmedo de Los Chorros favorecen un ambiente más llevadero por la mañana y al caer la noche. El sendero del nacimiento recibe sol y puede llenarse, el caudal varía y la visita no debe entenderse como una jornada de baño.",
    stayAdvice:
      "El Riópar actual es práctico para ir andando a comercios y al conjunto fabril; Riópar Viejo ofrece más silencio y vistas, pero obliga a usar el coche. En ambos casos confirma sombra, mosquiteras, ventilación y climatización, además de la distancia hasta el aparcamiento.",
    accessAdvice:
      "El acceso al Nacimiento del Río Mundo se regula en fechas de gran afluencia y puede cerrarse cuando se completa la capacidad del aparcamiento. Consulta el estado antes de salir, usa solo las zonas habilitadas y deja margen para carreteras comarcales lentas entre los tres núcleos del día.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Nacimiento del Río Mundo a primera hora",
        detail:
          "Accede temprano al aparcamiento oficial, solo si está abierto, y sigue el itinerario señalizado hacia Los Chorros. Mantente en pasarelas y senderos autorizados, no midas el éxito por el caudal y regresa antes de la franja más calurosa y concurrida.",
      },
      {
        time: "Mediodía",
        title: "Reales Fábricas de San Juan de Alcaraz",
        detail:
          "Vuelve al pueblo para recorrer el recinto histórico de las fábricas de latón y bronce y entrar en el museo cuando esté abierto. Es la visita adecuada para las horas centrales; después, almuerza y descansa sin sumar otro desplazamiento.",
      },
      {
        time: "Tarde-noche",
        title: "Riópar Viejo al atardecer",
        detail:
          "Sube cuando el sol pierda fuerza para ver la iglesia del Espíritu Santo, los restos del castillo y el caserío de la colina. Camina con calma por el firme irregular y contempla el paisaje desde las zonas seguras antes de que anochezca.",
      },
    ],
    checks: [
      "Comprueba el estado del acceso, el aforo y cualquier regulación especial del Nacimiento del Río Mundo.",
      "Consulta el horario del museo de las Reales Fábricas; no des por hecho que abre durante toda la tarde.",
      "Revisa previsión de tormenta, avisos de incendio y estado de las carreteras comarcales.",
    ],
    sources: [
      {
        label: "Turismo Castilla-La Mancha — Riópar",
        url: "https://www.turismocastillalamancha.es/es/destinos/encanto-rural/albacete/riopar.html",
        supports:
          "Distingue el núcleo fabril de Riópar Viejo y describe la iglesia, el castillo y las vistas del asentamiento histórico.",
      },
      {
        label: "Turismo Castilla-La Mancha — Nacimiento del Río Mundo",
        url: "https://www.turismocastillalamancha.es/es/naturaleza/monumentos-naturales/los-chorros-o-nacimiento-del-r-o-mundo",
        supports:
          "Presenta Los Chorros y advierte de la regulación del acceso en periodos de alta afluencia.",
      },
      {
        label: "Turismo Castilla-La Mancha — Real Fábrica de Metales",
        url: "https://www.turismocastillalamancha.es/es/cultura-y-patrimonio/museos/albacete/real-f-brica-de-metales-de-ri-par",
        supports:
          "Documenta la fundación de las fábricas en 1772, su patrimonio industrial y el espacio museístico.",
      },
    ],
  },
  ayna: {
    seoTitle: "Aýna en verano: miradores y ruta de cine",
    seoDescription:
      "Recorre Aýna en verano entre escenarios de cine, patrimonio y miradores sobre el río Mundo, con descansos pensados para las horas centrales.",
    localOverview:
      "Aýna cuelga de la ladera sobre la garganta del río Mundo, con calles muy inclinadas, cuevas, miradores y escenarios reconocibles de «Amanece, que no es poco». Su escala invita a recorrerla a pie, pero el desnivel obliga a dosificar incluso las distancias cortas.",
    coolingFactors:
      "La garganta, las orientaciones cambiantes de las calles y la brisa del valle pueden aliviar la mañana y el anochecer. Con unos 674 metros de altitud, Aýna no queda al margen del calor manchego: los miradores, escaleras y fachadas soleadas resultan duros en las horas centrales.",
    stayAdvice:
      "Prioriza alojamiento con aire acondicionado confirmado y acceso sencillo desde un aparcamiento; una dirección céntrica puede esconder muchas escaleras. Una terraza con vistas merece la pena al amanecer, pero pregunta por toldo o sombra si está orientada al sol de tarde.",
    accessAdvice:
      "La CM-3203 entra en un relieve de curvas y taludes, por lo que hay que conducir sin prisas y detenerse solo en apartaderos señalizados. Deja el coche en un estacionamiento permitido y reúne las visitas del casco a pie, evitando bajar hasta un punto que luego obligue a remontar a mediodía.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Ruta de «Amanece, que no es poco»",
        detail:
          "Empieza temprano en el casco y sigue los paneles de la ruta cinematográfica por los escenarios de Aýna. Es autoguiada y permite acortarla: selecciona las localizaciones cercanas, haz las cuestas con pausa y deja los miradores de carretera para más tarde.",
      },
      {
        time: "Mediodía",
        title: "Ermita de los Remedios e interpretación",
        detail:
          "Con apertura confirmada, entra en el centro de interpretación instalado en la antigua ermita de Nuestra Señora de los Remedios. Después, come cerca y descansa bajo techo; no uses esta franja para enlazar el castillo, las cuevas y el fondo del valle.",
      },
      {
        time: "Tarde-noche",
        title: "Mirador del Diablo con luz baja",
        detail:
          "Acércate al Mirador del Diablo por la CM-3203 cuando el sol haya perdido fuerza, estacionando únicamente en el espacio habilitado. Contempla la hoz y el caserío desde la plataforma y vuelve al pueblo antes de conducir de noche por la carretera de curvas.",
      },
    ],
    checks: [
      "Confirma la apertura o cita del centro de interpretación antes de organizar el mediodía.",
      "Comprueba incidencias en la CM-3203 y la disponibilidad del apartadero del Mirador del Diablo.",
      "Revisa avisos de calor, tormenta o incendio y adapta la ruta de cine a las cuestas que puedas remontar con comodidad.",
    ],
    sources: [
      {
        label: "Turismo Castilla-La Mancha — Aýna",
        url: "https://www.turismocastillalamancha.es/es/destinos/encanto-rural/albacete/ayna",
        supports:
          "Describe el emplazamiento sobre el río Mundo, el Mirador del Diablo, la ermita, el castillo y el patrimonio del casco.",
      },
      {
        label: "Turismo Castilla-La Mancha — Ruta de «Amanece, que no es poco»",
        url: "https://www.turismocastillalamancha.es/es/cultura-y-patrimonio/rutas/rutas-cine/ruta-de--amanece-que-no-es-poco-",
        supports:
          "Explica la ruta cinematográfica autoguiada y sus escenarios señalizados en Aýna y otros pueblos de la sierra.",
      },
      {
        label: "Turismo Castilla-La Mancha — Mirador del Diablo",
        url: "https://www.turismocastillalamancha.es/es/naturaleza/monumentos-naturales/mirador-del-diablo",
        supports:
          "Ubica el mirador junto a la carretera de acceso y documenta sus panorámicas sobre Aýna y la garganta.",
      },
    ],
  },
  aracena: {
    seoTitle: "Aracena en verano: gruta, castillo y sierra",
    seoDescription:
      "Visita Aracena en verano combinando la Gruta de las Maravillas, el Cerro del Castillo y su casco histórico con un ritmo protegido del calor.",
    localOverview:
      "Aracena reúne bajo el mismo cerro una fortaleza, un casco histórico protegido y la Gruta de las Maravillas. Esa concentración permite caminar casi todo el día y usar una visita subterránea con hora reservada como ancla para esquivar el tramo más caluroso.",
    coolingFactors:
      "La gruta ofrece un ambiente interior estable durante su recorrido y las callejas crean sombra a distintas horas; la sierra también favorece noches más suaves. El Cerro del Castillo está expuesto y exige subida, de modo que no conviene confundir un pueblo serrano con ausencia de calor.",
    stayAdvice:
      "Alojarse entre la gruta y el centro reduce desplazamientos, pero verifica aparcamiento, ruido y pendiente exacta. Busca climatización, persianas y patio sombreado; evita cargar maletas hasta las calles altas del castillo sin saber si el vehículo puede acercarse.",
    accessAdvice:
      "Compra con antelación la entrada de la Gruta de las Maravillas y llega con margen al turno asignado. Para el resto, deja el coche en un aparcamiento periférico y camina; las rampas del cerro y algunos pavimentos requieren calzado estable.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Sendero del Cerro del Castillo",
        detail:
          "Elige temprano uno de los recorridos cortos señalizados del Cerro del Castillo, ajustando la variante a tu movilidad. Sube sin prisa para ver la fortaleza y las panorámicas y regresa al centro antes de que la ladera quede a pleno sol.",
      },
      {
        time: "Mediodía",
        title: "Gruta de las Maravillas con reserva",
        detail:
          "Entra a la hora impresa en tu billete y sigue el recorrido guiado entre salas, formaciones y lagos subterráneos. No llegues tarde ni cuentes con comprar plaza sobre la marcha; al salir, almuerza y mantén una pausa tranquila.",
      },
      {
        time: "Tarde-noche",
        title: "Museo del Jamón y casco histórico",
        detail:
          "Si el horario encaja, visita el Museo del Jamón para conocer la dehesa y la cultura ibérica. Después recorre la Plaza Alta y las calles del conjunto histórico cuando vuelva la sombra, terminando con cena sin otra subida al cerro.",
      },
    ],
    checks: [
      "Reserva la Gruta de las Maravillas y revisa hora de acceso, normas y disponibilidad antes del viaje.",
      "Consulta la apertura del Museo del Jamón y del recinto del castillo para no solapar visitas.",
      "Comprueba calor, estado de los senderos y limitaciones por riesgo de incendio en el Cerro del Castillo.",
    ],
    sources: [
      {
        label: "Turismo de Aracena — Gruta de las Maravillas",
        url: "https://descubrearacena.es/recursosgruta/",
        supports:
          "Explica el valor geológico e histórico de la gruta y facilita la información oficial para organizar la entrada.",
      },
      {
        label: "Turismo de Aracena — Qué ver",
        url: "https://descubrearacena.es/que-ver/",
        supports:
          "Reúne la gruta, el Museo del Jamón, el castillo y los principales recursos del conjunto histórico.",
      },
      {
        label: "Turismo de Aracena — Senderos del Cerro del Castillo",
        url: "https://descubrearacena.es/senderos/red-de-senderos-cerro-del-castillo/",
        supports:
          "Describe la red de itinerarios cortos del cerro, sus variantes de dificultad y las vistas sobre la localidad.",
      },
    ],
  },
  constantina: {
    seoTitle: "Constantina en verano: sierra y patrimonio",
    seoDescription:
      "Explora Constantina en verano entre el Jardín Botánico El Robledo, los Castañares y la Morería, reservando las cuestas para última hora.",
    localOverview:
      "Constantina despliega su conjunto histórico en la ladera del castillo, con la Morería, las Cuestas y barrios que conservan trazas de distintas épocas. En el entorno inmediato, los castañares y el Jardín Botánico El Robledo permiten añadir naturaleza sin organizar una larga excursión por Sierra Morena.",
    coolingFactors:
      "Los castañares, patios y rincones estrechos de la Morería ofrecen sombra parcial, y el jardín ayuda a reconocer la vegetación de Sierra Morena. A unos 556 metros, el pueblo puede registrar tardes muy calurosas; los senderos forestales también tienen claros y no deben reservarse para el mediodía.",
    stayAdvice:
      "Una base en la parte baja o media del centro simplifica las comidas y reduce las cuestas con equipaje. Confirma aire acondicionado, persianas y patio realmente sombreado, y pregunta dónde dejar el coche si la casa está dentro del trazado estrecho de la Morería.",
    accessAdvice:
      "El Jardín Botánico El Robledo está fuera del casco, junto a la carretera entre Constantina y El Pedroso, y requiere comprobar apertura antes de conducir hasta allí. Dentro del pueblo conviene aparcar abajo y subir a pie; no intentes atravesar con el coche las calles más angostas de la ladera.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Los Castañares por el ramal corto",
        detail:
          "Sal temprano por el sendero municipal de Los Castañares y utiliza la opción de regreso que acorta el itinerario después del primer tramo. Lleva agua y mapa aunque camines entre árboles, y renuncia a completar el circuito si la temperatura o el riesgo de incendio lo desaconsejan.",
      },
      {
        time: "Mediodía",
        title: "Jardín Botánico El Robledo",
        detail:
          "Con la apertura confirmada, visita el jardín y el entorno del centro de visitantes para conocer los paisajes vegetales de Sierra Morena. Ajusta la duración a la sombra disponible y vuelve al pueblo para comer y descansar durante el pico de calor.",
      },
      {
        time: "Tarde-noche",
        title: "Morería, Las Cuestas y castillo",
        detail:
          "Empieza el paseo al final de la tarde por la trama de la Morería y asciende por Las Cuestas solo al ritmo que permita la temperatura. Acércate al entorno del castillo para ver el caserío con luz baja, sin entrar en zonas cerradas ni prolongar la bajada hasta oscuras.",
      },
    ],
    checks: [
      "Confirma el horario y los posibles cierres temporales del Jardín Botánico El Robledo.",
      "Consulta riesgo de incendio, estado de Los Castañares y cualquier prohibición de acceso al medio natural.",
      "Verifica el acceso al entorno del castillo y lleva calzado con agarre para las calles en pendiente.",
    ],
    sources: [
      {
        label: "Ayuntamiento de Constantina — Rutas y senderos",
        url: "https://www.constantina.org/es/temas/turismo/rutas-y-senderos/",
        supports:
          "Describe Los Castañares, su trazado circular, la posibilidad de acortarlo y su conexión con el castillo.",
      },
      {
        label: "Ayuntamiento de Constantina — Patrimonio",
        url: "https://www.constantina.org/es/municipio/patrimonio/",
        supports:
          "Documenta el conjunto histórico, la Morería, Las Cuestas y la posición del castillo sobre la ladera.",
      },
      {
        label: "Junta de Andalucía — Jardín Botánico El Robledo",
        url: "https://www.juntadeandalucia.es/medioambiente/portal/landing-page-%C3%ADndice/-/asset_publisher/zX2ouZa4r1Rf/content/jard-c3-adn-bot-c3-a1nico-el-robledo/20151",
        supports:
          "Ubica el jardín entre Constantina y El Pedroso y explica su función interpretativa dentro de Sierra Morena.",
      },
    ],
  },
  nerpio: {
    seoTitle: "Nerpio en verano: río, senderos y arte rupestre",
    seoDescription:
      "Descubre Nerpio en verano con el cañón del Taibilla, nogales y arte rupestre, comprobando antes el estado de senderos y visitas guiadas.",
    localOverview:
      "Nerpio es una base remota de la Sierra del Segura, a unos 1.082 metros, marcada por el Taibilla, los nogales monumentales y uno de los grandes conjuntos de arte rupestre de la provincia. Las distancias por carretera y el estado variable de los accesos obligan a preparar cada visita, no a improvisarla.",
    coolingFactors:
      "La altitud, el arbolado de ribera y el descenso nocturno de temperatura suelen favorecer mañanas y noches agradables. El cañón del Zarzalar alterna sombra y exposición, incluye pasos estrechos y pasarelas y no es una zona de baño garantizada; con calor fuerte deja de ser un paseo ligero.",
    stayAdvice:
      "En el núcleo tendrás más cerca alimentación y servicios; una aldea puede ofrecer silencio, pero implica conducir y tener menos cobertura. Confirma ventilación o climatización, mosquiteras y aparcamiento, y llega con combustible suficiente si vas a moverte por carreteras secundarias.",
    accessAdvice:
      "Nerpio exige trayectos largos por carreteras de montaña, con cobertura irregular y pocos servicios intermedios. La ruta del Zarzalar es de dificultad media y no resulta adecuada para movilidad reducida ni para niños pequeños; las visitas de arte rupestre dependen de guía y del estado de las pistas.",
    dayPlan: [
      {
        time: "Mañana",
        title: "Ruta del Zarzalar con salida temprana",
        detail:
          "Emprende los 8,6–9 kilómetros del cañón del Taibilla solo si tienes la forma física adecuada y el itinerario está abierto y en buenas condiciones. Sal con la primera luz, lleva agua y calzado con agarre y regresa antes del calor; ante dudas, limita el plan a un tramo señalizado.",
      },
      {
        time: "Mediodía",
        title: "Plaza y descanso en Nerpio",
        detail:
          "Recupérate en el núcleo, pasea únicamente por el entorno inmediato de la plaza y la parroquia de la Purísima y elige un almuerzo tranquilo. Reserva las horas centrales para descansar y para consultar en turismo el estado de las visitas, no para conducir a abrigos remotos.",
      },
      {
        time: "Tarde-noche",
        title: "Plantón del Covacho al caer el sol",
        detail:
          "Acércate con luz baja al Plantón del Covacho, el gran nogal ligado al paisaje cultural de Nerpio, usando el acceso indicado localmente. Mantente fuera de fincas o pistas cerradas y termina el día de vuelta en el pueblo antes de que la conducción serrana sea nocturna.",
      },
    ],
    checks: [
      "La web turística local advierte de una suspensión temporal de la visita al arte rupestre: confirma con la oficina si se ha restablecido antes de reservar.",
      "Comprueba el estado del Zarzalar tras lluvias o tormentas y no lo recorras si hay cierre, crecida o pasarelas dañadas.",
      "Revisa combustible, cobertura, avisos de incendio y tiempo de conducción antes de salir hacia aldeas o accesos rurales.",
    ],
    sources: [
      {
        label: "Turismo Castilla-La Mancha — Nerpio",
        url: "https://www.turismocastillalamancha.es/es/destinos/encanto-rural/albacete/nerpio",
        supports:
          "Presenta el valle del Taibilla, el patrimonio rupestre, el Zarzalar y los nogales como elementos centrales del destino.",
      },
      {
        label: "Turismo Castilla-La Mancha — Ruta del Zarzalar",
        url: "https://www.turismocastillalamancha.es/es/naturaleza/rutas/senderismo/ruta-del-zarzalar---ca--n-del-taibilla",
        supports:
          "Detalla longitud, duración, dificultad y características del sendero por el cañón del Taibilla.",
      },
      {
        label: "Turismo de Nerpio — Arte rupestre",
        url: "https://turismonerpio.com/nuevo/arte-rupestre-nerpio/",
        supports:
          "Explica la visita guiada a los abrigos y publica el aviso vigente de suspensión temporal por el mal estado del camino.",
      },
    ],
  },
} satisfies Record<string, DestinationEditorial>;
