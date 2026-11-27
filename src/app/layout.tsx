import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Manrope, Plus_Jakarta_Sans, Roboto } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});

/* Solo para el wordmark "TePostulo" (logo y cabecera del mail de muestra); no reemplaza a Manrope ni a Instrument Sans. */
const wordmark = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "800",
  style: "italic",
  variable: "--font-wordmark",
  display: "swap",
  // sin precarga: no compite con las fuentes del título (LCP); el logo la toma apenas llega
  preload: false,
});

/* Solo para el marco de Gmail de la muestra del mail; no se precarga. */
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${manrope.variable} ${instrument.variable} ${wordmark.variable} ${roboto.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Ir al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
