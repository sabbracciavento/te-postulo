export const site = {
  name: "TePostulo",
  title: "TePostulo | Gestionamos tus postulaciones laborales en Buenos Aires",
  description:
    "Postulamos por vos en avisos que encajan con tu perfil. CV adaptado, seguimiento y resumen por mail. CABA y Gran Buenos Aires.",
  area: "CABA y Gran Buenos Aires",
  // Producción en Vercel: si falta NEXT_PUBLIC_SITE_URL, el dominio de producción del proyecto (lo expone Vercel al construir).
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  hours: "Atención por WhatsApp de 12 a 20 h",
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    label: "Escribinos por WhatsApp",
    // Sin datos personales en el texto precargado (kit, ESPECIFICACION).
    message: "Hola, quiero saber cómo funciona TePostulo para mi perfil.",
  },
  nav: [
    // con "/" adelante: también funcionan desde /privacidad y la 404
    { href: "/#como-funciona", label: "Cómo funciona" },
    { href: "/#planes", label: "Planes" },
    { href: "/#preguntas", label: "Preguntas frecuentes" },
  ],
  year: 2026,
} as const;
