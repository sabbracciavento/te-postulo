/**
 * Contenido de la maqueta del resumen diario. Replica la estructura del mail real que manda el servicio:
 * título con la cifra del día → una frase con lo importante → "Para vos" (lo que depende de la persona) →
 * tres cifras → postulaciones del día con el portal → movimientos de empresas → totales. Datos ficticios.
 */
export type MailItem = { title: string; meta: string; portal?: string };
export type MailAction = { title: string; meta: string; action: string; button?: string };

export type MailScenario = {
  id: string;
  chip: string;
  subject: string;
  headline: string;
  importante: string;
  date: string;
  dateShort: string;
  dateLong: string;
  dateLongGmail: string;
  paraVos: MailAction[];
  kpis: { n: number; label: string }[];
  hoy: MailItem[];
  masHoy?: number;
  mails?: MailItem[];
  movimientos: string[];
  totales: string;
  operativo: string;
};

export const mailPerson = "Caro";
export const mailBrand = { te: "Te", word: "Postulo", kicker: "Resumen diario" };
export const mailFooter = ["Mañana a la mañana se vuelve a revisar todo.", "Para cambiar zonas, horarios o tipo de puesto, respondé este mail."];

const kpis = (hoy: number, total: number, movidas: number) => [
  { n: hoy, label: "postulaciones hoy" },
  { n: total, label: "en total" },
  { n: movidas, label: "empresas que se movieron" },
];

export const mailScenarios: MailScenario[] = [
  {
    id: "normal",
    chip: "Un día normal",
    subject: "Caro, hoy se enviaron 6 postulaciones",
    headline: "Hoy se enviaron 6 postulaciones",
    importante: "Hoy 2 empresas miraron tu CV.",
    date: "jue 14/11",
    dateShort: "14 nov",
    dateLong: "jueves 14 de noviembre",
    dateLongGmail: "jue, 14 nov, 18:02 (hace 2 horas)",
    paraVos: [],
    kpis: kpis(6, 38, 2),
    hoy: [
      { title: "Administrativa contable", meta: "Empresa de servicios · Retiro", portal: "Computrabajo" },
      { title: "Asistente de dirección", meta: "Estudio contable · Belgrano", portal: "Bumeran" },
      { title: "Recepcionista", meta: "Centro médico · Palermo", portal: "Zonajobs" },
      { title: "Auxiliar administrativa", meta: "Empresa de logística · Munro", portal: "Computrabajo" },
      { title: "Administrativa de compras", meta: "Consultora de RRHH · Vicente López", portal: "Bumeran" },
      { title: "Administrativa", meta: "Pyme de distribución · Núñez", portal: "Email" },
    ],
    mails: [{ title: "Candidatura espontánea con tu CV", meta: "a una consultora de RRHH · Belgrano", portal: "Casilla laboral" }],
    movimientos: ["Estudio contable (Belgrano) vio tu CV (Asistente de dirección).", "Centro médico (Palermo) vio tu CV (Recepcionista).", "4 portales confirmaron la recepción de postulaciones."],
    totales: "Tu búsqueda desde el 4/11: 38 postulaciones · 9 CV vistos · 2 en proceso.",
    operativo: "Hoy se revisaron 41 avisos nuevos; 5 quedaron para revisar mañana.",
  },
  {
    id: "entrevista",
    chip: "Te escribieron",
    subject: "Caro, te escribieron para una entrevista",
    headline: "Te escribieron para una entrevista",
    importante: "Una empresa quiere entrevistarte. Conviene responder hoy.",
    date: "mar 12/11",
    dateShort: "12 nov",
    dateLong: "martes 12 de noviembre",
    dateLongGmail: "mar, 12 nov, 18:05",
    paraVos: [
      {
        title: "Entrevista: Asistente de dirección",
        meta: "De un estudio contable · Belgrano · “¿Podés el jueves a las 10?”",
        action: "Respondé hoy desde esta casilla; si querés, te armamos la respuesta.",
      },
    ],
    kpis: kpis(3, 41, 1),
    hoy: [
      { title: "Administrativa de facturación", meta: "Empresa de salud · Caballito", portal: "Computrabajo" },
      { title: "Asistente administrativa", meta: "Estudio jurídico · Tribunales", portal: "Bumeran" },
      { title: "Recepcionista", meta: "Clínica · Villa Urquiza", portal: "Zonajobs" },
    ],
    movimientos: ["Estudio contable (Belgrano) pasó tu postulación a “en proceso” (Asistente de dirección)."],
    totales: "Tu búsqueda desde el 4/11: 41 postulaciones · 11 CV vistos · 3 en proceso · 1 entrevista.",
    operativo: "Hoy se revisaron 27 avisos nuevos; 4 quedaron para revisar mañana.",
  },
  {
    id: "necesitan",
    chip: "Necesitan algo tuyo",
    subject: "Caro, hoy se enviaron 2 postulaciones",
    headline: "Hoy se enviaron 2 postulaciones",
    importante: "Dos avisos buenos necesitan algo que solo podés hacer vos.",
    date: "lun 11/11",
    dateShort: "11 nov",
    dateLong: "lunes 11 de noviembre",
    dateLongGmail: "lun, 11 nov, 17:58",
    paraVos: [
      {
        title: "Analista administrativa comercial",
        meta: "Consultora de RRHH · Munro",
        action: "Postulá vos desde LinkedIn (botón “Solicitud sencilla”, 2 minutos). Tu CV ya está listo.",
        button: "Abrir el aviso",
      },
      {
        title: "Administrativa de facturación",
        meta: "Empresa de salud · Caballito",
        action: "El formulario pregunta por un certificado de un sistema de facturación. Si lo tenés, entrá y completalo.",
        button: "Abrir el aviso",
      },
    ],
    kpis: kpis(2, 43, 0),
    hoy: [
      { title: "Auxiliar administrativa", meta: "Empresa de logística · Munro", portal: "Computrabajo" },
      { title: "Administrativa de compras", meta: "Pyme industrial · San Martín", portal: "Bumeran" },
    ],
    movimientos: ["1 rechazo: es parte del proceso y no cambia nada en la búsqueda."],
    totales: "Tu búsqueda desde el 4/11: 43 postulaciones · 11 CV vistos · 3 en proceso · 1 entrevista.",
    operativo: "Hoy se revisaron 19 avisos nuevos; 6 quedaron para revisar mañana.",
  },
];

export const mailListExtra = { subject: "Caro, hoy se enviaron 4 postulaciones", date: "dom 10/11" };
