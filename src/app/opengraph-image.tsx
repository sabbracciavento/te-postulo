/* eslint-disable @next/next/no-img-element -- ImageResponse (satori) solo acepta <img>; next/image no aplica acá */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name}: nos postulamos por vos. ${site.area}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [manrope, instrument, jakarta, tp] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/Manrope-ExtraBold.ttf")),
    readFile(join(process.cwd(), "src/app/fonts/InstrumentSans-Medium.ttf")),
    readFile(join(process.cwd(), "src/app/fonts/PlusJakartaSans-ExtraBoldItalic.woff")),
    readFile(join(process.cwd(), "public/brand/tp-blanco.png")),
  ]);
  const tpSrc = `data:image/png;base64,${tp.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0025CE", color: "#FFFFFF", position: "relative" }}>
        {/* monograma grande, recortado por el borde: el mismo gesto que el cierre de la web */}
        <img src={tpSrc} alt="" width={560} height={429} style={{ position: "absolute", right: -60, bottom: -70, opacity: 0.12 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={tpSrc} alt="" width={68} height={52} />
            {/* wordmark sobre fondo azul: "Te" blanco y "Postulo" con el degradé claro (background-clip: text) */}
            <div style={{ display: "flex", fontFamily: "Plus Jakarta Sans", fontStyle: "italic", fontSize: 44, letterSpacing: -1.76, paddingRight: 4 }}>
              <span>Te</span>
              <span
                style={{
                  backgroundImage: "linear-gradient(100deg, #FFFFFF 0%, #CFE0FF 45%, #D9D2FF 100%)",
                  backgroundClip: "text",
                  color: "transparent",
                  paddingRight: 4,
                  marginLeft: -2,
                }}
              >
                Postulo
              </span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Manrope", fontSize: 80, lineHeight: 1.05, letterSpacing: -2.4 }}>Nos postulamos por vos.</div>
            <div style={{ fontFamily: "Instrument Sans", fontSize: 30, marginTop: 24, opacity: 0.9 }}>
              {`CV adaptado y seguimiento por mail · ${site.area}`}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: manrope, weight: 800, style: "normal" },
        { name: "Instrument Sans", data: instrument, weight: 500, style: "normal" },
        { name: "Plus Jakarta Sans", data: jakarta, weight: 800, style: "italic" },
      ],
    },
  );
}
