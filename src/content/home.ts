/**
 * Textos de la home. Base: Master Kit v3 (03-WEB/ESPECIFICACION y 04-MARKETING/CONTENIDO).
 * Presupuesto: título ≤ 6 palabras, cuerpo ≤ 30, ítem ≤ 12. Lo largo va a Preguntas frecuentes.
 */
export const hero = {
  title: "Nos postulamos por vos.",
  lead: "Buscamos avisos que encajan con tu perfil, adaptamos tu CV y te contamos cada avance por mail.",
  notification: {
    app: "Gmail",
    sender: "TePostulo",
    text: "Ana, hoy te postulamos a 9 avisos",
    time: "ahora",
  },
};

export const benefits = {
  title: "Lo que hacemos por vos",
  items: [
    { title: "Avisos que encajan", text: "Filtramos por rubro, zona, horario y sueldo. Ante la duda, te consultamos.", icon: "filter" },
    { title: "Dos versiones de tu CV", text: "Una para personas y otra para los sistemas de selección.", icon: "cv" },
    { title: "Cada postulación verificada", text: "Solo contamos una postulación cuando quedó confirmada.", icon: "check" },
  ],
} as const;

export const steps = {
  title: "Cómo funciona",
  items: [
    { title: "Nos escribís", text: "Por WhatsApp o Instagram, nos contás qué buscás. Con o sin CV: si no tenés, lo armamos." },
    { title: "Armamos tu perfil", text: "Tu CV en dos versiones y una casilla de mail solo para la búsqueda." },
    { title: "Postulamos por vos", text: "Los días hábiles, a lo que encaja con vos, con una carta para cada aviso." },
    { title: "Recibís tu resumen", text: "Un mail por día con lo que hicimos y lo que avanzó." },
  ],
  pedimos: {
    title: "Para empezar te pedimos",
    items: ["Tu CV, o los datos para armarlo", "Qué puesto buscás y en qué rubro", "Zona y horario en los que podés trabajar", "El sueldo bruto que pretendés"],
  },
};

/*
 * Caso real (27-11-2026, aprobado por el dueño): Karen S. con su foto y SUS palabras, tal como las publicó en sus historias de
 * Instagram (solo se corrigió "cv" → "CV" y las tildes). Nunca se le inventa un texto a una persona real: un testimonio nuevo
 * va solo con su OK escrito. Las cifras son las del registro del kit, con su pie.
 */
export const evidence = {
  kicker: "Un caso real",
  title: "3 entrevistas en cinco semanas.",
  persona: {
    nombre: "Karen S.",
    perfil: "Administrativa · Belgrano, CABA",
    foto: "/casos/caso-1.jpg",
    fuente: "Lo contó en sus historias de Instagram",
  },
  quote: "Te llegan mails con el resumen de postulaciones en el día, si alguna empresa se interesó en tu CV y si te escriben por alguna entrevista.",
  quote2: "En el perfil de @te.postulo podés encontrar toda la info, y cualquier duda, escribile para que te expliquen bien bien todo.",
  metrics: [
    { value: "3", label: "entrevistas" },
    { value: "185", label: "postulaciones verificadas" },
    { value: "4.142", label: "avisos revisados" },
  ],
  note: "Del 21/10 al 25/11/2026 · 12 días con postulaciones. Resultados individuales, no garantizados.",
};

export const mailSection = {
  title: "Todo lo que hacemos, en un mail.",
  lead: "Un mail por día: a dónde te postulamos, qué empresas se movieron y qué tenés que hacer vos, si hay algo.",
  note: "Datos ficticios. En el resumen solo contamos las postulaciones confirmadas. El mail real llega a una casilla creada solo para tu búsqueda.",
};

export const plans = {
  title: "Dos planes: Base y Plus",
  footer: "El precio depende de tu perfil. Consultanos por WhatsApp o Instagram.",
  base: {
    tag: "Base",
    title: "Todo el servicio",
    items: [
      "Postulación diaria en portales de empleo y por mail",
      "CV en dos versiones y carta para cada aviso",
      "Tu CV a empresas que encajan, aunque no tengan aviso",
      "Casilla de mail solo para la búsqueda",
      "Resumen diario y aviso si una empresa te escribe",
      "Avisos de LinkedIn numerados: te postulás vos en 2 minutos",
      "Guía para dejar tu perfil de LinkedIn listo",
    ],
  },
  plus: {
    tag: "Plus",
    title: "Todo lo de Base, y además",
    // solo lo que hace el plan 2 (cv/docs/PLANES.md): sin "más por día" (la primera semana el tope es menor que lo que el Base delega)
    items: [
      "Nos postulamos por vos en LinkedIn, desde tu cuenta",
      "Te contamos en el resumen a cuáles te postulamos",
      "Con tu autorización: iniciás sesión una vez",
      "Con un tope diario, para cuidar tu cuenta",
    ],
  },
};

export const trust = {
  title: "No necesitamos la contraseña de tu mail personal.",
  items: [
    "Trabajamos con una casilla de mail aparte, solo para la búsqueda.",
    "Completamos formularios solo con datos reales tuyos.",
    "No te postulamos a lo que no encaja con vos.",
    "En LinkedIn, solo con tu autorización por escrito.",
    "Podés pedirnos que frenemos cuando quieras.",
  ],
  link: "Cómo cuidamos tus datos",
};

export const faq = {
  title: "Preguntas frecuentes",
  items: [
    { q: "¿Me mandan a cualquier trabajo?", a: "No. Filtramos por rubro, zona, horario y sueldo, y te consultamos los avisos dudosos." },
    { q: "¿Me garantizan trabajo?", a: "No. Nos ocupamos de las postulaciones y del seguimiento; las empresas deciden a quién entrevistan y contratan." },
    { q: "¿Tengo que darles mis contraseñas?", a: "No pedimos la de tu mail personal: trabajamos con una casilla de búsqueda aparte, que también es tuya. En el plan Plus, para LinkedIn iniciás sesión vos una vez." },
    { q: "¿Cómo sé qué hicieron?", a: "Recibís un resumen por mail con las postulaciones del día, los avances que informan las empresas y lo que necesitamos de vos." },
    { q: "¿Y si una empresa me escribe para una entrevista?", a: "Te avisamos apenas recibimos la comunicación y podemos prepararte una respuesta." },
    { q: "¿Y LinkedIn?", a: "En el plan Base te pasamos los avisos de LinkedIn numerados en el resumen: te postulás vos (son 2 minutos) y respondés con los números. En el Plus nos postulamos nosotros desde tu cuenta, con tu autorización." },
    { q: "No tengo CV, ¿sirve igual?", a: "Sí. Lo armamos con vos, en dos versiones." },
    { q: "¿Sirve para mi rubro?", a: "Trabajamos con perfiles administrativos, de atención al cliente, recepción, logística, comunicación y redes, primer empleo y más. Antes de empezar miramos cuántos avisos hay para tu perfil y te contamos qué esperar." },
    { q: "¿Dónde trabajan?", a: "En CABA y Gran Buenos Aires. Filtramos los avisos por la zona en la que podés trabajar." },
    { q: "¿Cuánto cuesta?", a: "Hay dos planes, Base y Plus. El precio depende de tu perfil: consultanos por WhatsApp o Instagram." },
    { q: "¿Puedo frenar el servicio?", a: "Sí, cuando quieras. También podés pedirnos ver, corregir o borrar tus datos, como explica la política de privacidad." },
  ],
};

export const closing = {
  title: "Contanos qué trabajo buscás.",
  text: "Escribinos por WhatsApp o Instagram y vemos juntos si el servicio te sirve.",
};
