export const site = {
  name: "Te Postulo",
  shortName: "TP",
  city: "Buenos Aires",
  tagline: "Te buscamos trabajo en Buenos Aires",
  description:
    "Postulamos por vos todos los días en portales y empresas de CABA y GBA, con CV y carta para cada aviso. Sin usuario ni app: todo por mail.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  hours: "Atendemos de 12 a 20 hs.",
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    label: "Escribinos por WhatsApp",
    message:
      "Hola, quiero que busquen trabajo por mí. Me dedico a: ____. Busco en la zona de: ____. Horario: ____. Sueldo bruto pretendido: $____.",
  },
  nav: [
    { href: "#como-funciona", label: "Cómo funciona" },
    { href: "#planes", label: "Planes" },
    { href: "#preguntas", label: "Preguntas" },
  ],
  year: 2026,
} as const;
