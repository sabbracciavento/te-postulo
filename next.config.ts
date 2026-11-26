import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "DENY" },
];

// Producción en Vercel sin número de WhatsApp: la web quedaría sin su único botón de contacto. Mejor no publicarla.
if (process.env.VERCEL_ENV === "production" && !process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) {
  throw new Error(
    "Falta NEXT_PUBLIC_WHATSAPP_NUMBER en las variables de entorno de producción de Vercel (formato 549 + área + número, sin \"+\"). El build se detiene para no publicar la web sin el botón de WhatsApp.",
  );
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
