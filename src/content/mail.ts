/**
 * Maqueta del resumen diario: el mismo mail que recibe la persona (diseño v3 editorial del 26/11/2026: estructura, palabras,
 * botones y jerarquía), con datos ficticios.
 * Orden: cabecera blanca (TP + fecha) → saludo, título y frase → entrevista (placa cobalto) → cifra del día con el trazo →
 * "Para hacer hoy" → "A dónde te postulamos" (índice 01…) → "Novedades de empresas" (estado en versalitas) →
 * "Tu búsqueda desde…" (banda hielo, 3 cifras) → pie fuera de la tarjeta.
 * Regla de aislamiento: sin nombres de sitios de empleo, salvo LinkedIn (permitido desde el 26-11: el plan Plus se vende con él).
 * Donde el mail real nombra otro sitio, acá va "desde la web de la empresa".
 * Coherencia: fechas reales y hábiles de 2026; los acumulados crecen con la fecha (9 → 10 → 12/11) y la entrevista destacada no se repite
 * en las novedades.
 */
export type MailTarea = { titulo: string; detalle: string; accion: string; boton?: string };
export type MailAviso = { n: number; titulo: string; detalle: string };
export type MailEntrevista = { empresa: string; puesto: string; nota: string; mes: string; dia: number; hora?: string };
export type MailEstado = "visto" | "avanzo" | "entrevista" | "recibido" | "cerrado";
export type MailNovedad = { estado: MailEstado; texto: string };

export type MailScenario = {
  id: string;
  chip: string;
  subject: string;
  titulo: string;
  frase: string;
  fecha: string;
  fechaCorta: string;
  dateShort: string;
  dateLongGmail: string;
  /** hora de llegada del mail: Gmail la muestra en lugar de la fecha cuando el mail es de hoy */
  hora: string;
  hoy: number;
  revisados: number;
  entrevista?: MailEntrevista;
  tareas: MailTarea[];
  avisos: MailAviso[];
  postulaciones: { titulo: string; meta: string }[];
  mas?: number;
  novedades: MailNovedad[];
  busqueda: { postulaciones: number; vistos: number; enProceso: number; entrevistas: number };
};

export const mailPersona = "Ana";
export const mailDesde = "4/11";
export const mailPie = "Mañana seguimos. Para cambiar zonas, horarios o puestos, respondé este mail.";
export const mailFirma = "Nos postulamos por vos.";
export const mailAvisosTitulo = "Avisos de LinkedIn";
export const mailAvisosInstruccion = (nums: number[]) =>
  `Postulate desde tu LinkedIn (son 2 minutos, tu CV ya está listo). Después respondé este mail solo con los números (por ejemplo: ${nums.slice(0, 2).join(", ")}).`;

/* estado → etiqueta de la píldora (colores en EmailSummary, los mismos pares AA del mail) */
export const estadoLabel: Record<MailEstado, string> = {
  visto: "CV visto",
  avanzo: "Avanzó",
  entrevista: "Entrevista",
  recibido: "Recibido",
  cerrado: "Sin avance",
};

export const mailScenarios: MailScenario[] = [
  {
    id: "normal",
    chip: "Un día normal",
    subject: `${mailPersona}, hoy te postulamos a 9 avisos`,
    titulo: "Hoy te postulamos a 9 avisos",
    frase: "Hoy 2 empresas vieron tu CV.",
    fecha: "jueves 12 de noviembre",
    fechaCorta: "12/11",
    dateShort: "12 nov",
    dateLongGmail: "jue, 12 nov, 18:02",
    hora: "18:02",
    hoy: 9,
    revisados: 143,
    tareas: [],
    avisos: [],
    postulaciones: [
      { titulo: "Administrativa contable", meta: "Estudio Ríos · Belgrano, CABA" },
      { titulo: "Recepcionista", meta: "Clínica del Parque · Belgrano, CABA" },
      { titulo: "Asistente administrativa", meta: "Empresa confidencial · Núñez, CABA" },
      { titulo: "Auxiliar de facturación", meta: "Distribuidora Sur · Colegiales, CABA" },
      { titulo: "Data entry", meta: "Logística Norte · Saavedra, CABA" },
    ],
    mas: 4,
    novedades: [
      { estado: "visto", texto: "Estudio Ríos · Administrativa contable" },
      { estado: "visto", texto: "Clínica del Parque · Recepcionista" },
    ],
    busqueda: { postulaciones: 45, vistos: 9, enProceso: 2, entrevistas: 1 },
  },
  {
    id: "entrevista",
    chip: "Te escribieron",
    subject: `${mailPersona}, ¡tenés una entrevista con Consultora Ejemplo!`,
    titulo: "¡Tenés una entrevista con Consultora Ejemplo!",
    frase: "¡Felicitaciones! Consultora Ejemplo quiere conocerte para el puesto de Asistente administrativa contable.",
    fecha: "martes 10 de noviembre",
    fechaCorta: "10/11",
    dateShort: "10 nov",
    dateLongGmail: "mar, 10 nov, 18:05",
    hora: "18:05",
    hoy: 3,
    revisados: 97,
    entrevista: {
      empresa: "Consultora Ejemplo",
      puesto: "Asistente administrativa contable · CABA",
      nota: "Miércoles 18/11 a las 10:00 por videollamada. El link está en tu casilla.",
      mes: "nov",
      dia: 18,
      hora: "10:00",
    },
    tareas: [],
    avisos: [],
    postulaciones: [
      { titulo: "Auxiliar de facturación", meta: "Empresa de salud · Caballito, CABA" },
      { titulo: "Asistente administrativa", meta: "Estudio jurídico · San Nicolás, CABA" },
      { titulo: "Recepcionista", meta: "Clínica Norte · Villa Urquiza, CABA" },
    ],
    novedades: [
      { estado: "visto", texto: "Distribuidora Oeste · Recepcionista" },
    ],
    busqueda: { postulaciones: 30, vistos: 7, enProceso: 2, entrevistas: 1 },
  },
  {
    id: "necesitan",
    chip: "Necesitan algo tuyo",
    subject: `${mailPersona}, hoy te postulamos a 2 avisos`,
    titulo: "Hoy te postulamos a 2 avisos",
    frase: "Las empresas suelen responder entre una y dos semanas después. Te avisamos apenas pase algo.",
    fecha: "lunes 9 de noviembre",
    fechaCorta: "9/11",
    dateShort: "9 nov",
    dateLongGmail: "lun, 9 nov, 17:58",
    hora: "17:58",
    hoy: 2,
    revisados: 88,
    tareas: [
      {
        titulo: "Analista administrativa",
        detalle: "Empresa Tres · Caballito, CABA",
        accion: "A este te postulás desde la web de la empresa, con tu cuenta. Tu CV ya está listo.",
        boton: "Postularme",
      },
    ],
    avisos: [
      { n: 24, titulo: "Administrativa de compras", detalle: "Empresa Uno · Palermo, CABA" },
      { n: 25, titulo: "Recepcionista", detalle: "Empresa confidencial · Núñez, CABA" },
    ],
    postulaciones: [
      { titulo: "Auxiliar administrativa", meta: "Logística Sur · Barracas, CABA" },
      { titulo: "Administrativa de compras", meta: "Fábrica Centro · San Martín" },
    ],
    novedades: [
      { estado: "cerrado", texto: "1 empresa eligió a otra persona (es normal)." },
    ],
    busqueda: { postulaciones: 27, vistos: 6, enProceso: 1, entrevistas: 0 },
  },
];
