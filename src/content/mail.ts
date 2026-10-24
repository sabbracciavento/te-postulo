export type MailItem = { title: string; meta: string; note?: string };

export type MailBlock =
  | { kind: "interview"; title: string; items: MailItem[]; footer: string; extra?: string }
  | { kind: "jobs"; title: string; items: MailItem[]; tag?: string }
  | { kind: "needs"; title: string; items: MailItem[]; footer: string }
  | { kind: "rejections"; title: string; footer: string };

export type MailScenario = {
  id: string;
  chip: string;
  subject: string;
  date: string;
  dateShort: string;
  dateLong: string;
  dateLongGmail: string;
  kpis: { n: number; label: string }[];
  blocks: MailBlock[];
};

export const mailPerson = "Caro";
export const mailSender = "Te Postulo · resumen de tu búsqueda";
export const mailFooter =
  "Mañana se revisa todo de nuevo. Si querés cambiar zonas, horarios o tipo de puesto, respondé este mail.";
export const mailSignature = "Tu asistente de búsqueda";

const kpis = (a: number, b: number, c: number, d: number) => [
  { n: a, label: "postulaciones hoy" },
  { n: b, label: "acumuladas" },
  { n: c, label: "avisos nuevos revisados" },
  { n: d, label: "en cola" },
];

export const mailScenarios: MailScenario[] = [
  {
    id: "normal",
    chip: "Un día normal",
    subject: "Caro, hoy se enviaron 6 postulaciones",
    date: "jue 14/11",
    dateShort: "14 nov",
    dateLong: "jueves 14/11",
    dateLongGmail: "jue, 14 nov, 18:02 (hace 2 horas)",
    kpis: kpis(6, 38, 41, 5),
    blocks: [
      {
        kind: "jobs",
        title: "Portales de empleo · 4 postulaciones",
        items: [
          { title: "Administrativa contable", meta: "Empresa de servicios · Retiro" },
          { title: "Asistente de dirección", meta: "Estudio contable · Belgrano" },
          { title: "Recepcionista", meta: "Centro médico · Palermo" },
          { title: "Auxiliar administrativa", meta: "Empresa de logística · Munro" },
        ],
      },
      {
        kind: "jobs",
        title: "Consultoras · 1 postulación",
        items: [{ title: "Administrativa de compras", meta: "Consultora de RRHH · Vicente López" }],
      },
      {
        kind: "jobs",
        title: "Mails enviados con tu CV · 1",
        tag: "plan Plus",
        items: [{ title: "Pyme de distribución", meta: "Núñez · casilla laboral" }],
      },
    ],
  },
  {
    id: "entrevista",
    chip: "Te escribieron",
    subject: "Caro, te escribieron para una entrevista (1)",
    date: "mar 12/11",
    dateShort: "12 nov",
    dateLong: "martes 12/11",
    dateLongGmail: "mar, 12 nov, 18:05",
    kpis: kpis(3, 41, 27, 4),
    blocks: [
      {
        kind: "interview",
        title: "Te escribieron para una entrevista",
        items: [{ title: "Estudio contable · Belgrano", meta: "Entrevista: ¿podés el jueves a las 10?" }],
        footer: "Conviene responder hoy mismo.",
        extra: "Te preparamos la respuesta; la revisás y sale desde tu casilla.",
      },
      {
        kind: "jobs",
        title: "Portales de empleo · 3 postulaciones",
        items: [
          { title: "Administrativa de facturación", meta: "Empresa de salud · Caballito" },
          { title: "Asistente administrativa", meta: "Estudio jurídico · Tribunales" },
          { title: "Recepcionista", meta: "Clínica · Villa Urquiza" },
        ],
      },
    ],
  },
  {
    id: "necesitan",
    chip: "Necesitan algo tuyo",
    subject: "Caro, resumen de la búsqueda del 11/11",
    date: "lun 11/11",
    dateShort: "11 nov",
    dateLong: "lunes 11/11",
    dateLongGmail: "lun, 11 nov, 17:58",
    kpis: kpis(2, 43, 19, 6),
    blocks: [
      {
        kind: "needs",
        title: "Necesitan algo tuyo · 2",
        items: [
          { title: "Administrativa de facturación", meta: "Empresa de salud · Caballito", note: "Piden certificado de un sistema de facturación." },
          { title: "Recepcionista bilingüe", meta: "Hotel · Retiro", note: "Piden un nivel de inglés que no tenés; se descarta si confirmás." },
        ],
        footer: "No contestamos por vos lo que no sabemos. Decinos y seguimos.",
      },
      {
        kind: "jobs",
        title: "Portales de empleo · 2 postulaciones",
        items: [
          { title: "Auxiliar administrativa", meta: "Empresa de logística · Munro" },
          { title: "Administrativa de compras", meta: "Pyme industrial · San Martín" },
        ],
      },
      { kind: "rejections", title: "Rechazos recibidos: 1", footer: "Es parte del proceso; no cambian nada en la búsqueda." },
    ],
  },
];

export const mailListExtra = { subject: "Resumen semanal", date: "dom 10/11" };
