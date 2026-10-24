import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";
import { LOGO_RATIO, LOGO_VIEWBOX, SQUARE, TE_PATHS, WORD_PATHS } from "@/components/ui/logo-geometry";

export const alt = `${site.name} · ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const font = await readFile(join(process.cwd(), "src/app/fonts/ArchivoBlack.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#f4efe6",
          color: "#141414",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>
          <div style={{ background: "#1b3a6b", color: "#f4efe6", padding: "8px 14px" }}>Búsqueda laboral</div>
          <div style={{ color: "#1b3a6b" }}>CABA y GBA</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 82, lineHeight: 1.0, letterSpacing: -2, whiteSpace: "nowrap" }}>
          <div>Te buscamos trabajo.</div>
          <div>Todos los días.</div>
          <div style={{ color: "#f0532d" }}>Vos solo mirás el mail.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 32 }}>
          <svg viewBox={LOGO_VIEWBOX} width={300} height={Math.round(300 / LOGO_RATIO)}>
            <rect x={SQUARE.x} y={SQUARE.y} width={SQUARE.s} height={SQUARE.s} rx={SQUARE.r} fill="#f0532d" />
            {TE_PATHS.map((d, i) => (
              <path key={`t${i}`} d={d} fill="#141414" />
            ))}
            {WORD_PATHS.map((d, i) => (
              <path key={`w${i}`} d={d} fill="#141414" />
            ))}
          </svg>
          <div style={{ fontSize: 22, color: "#3a3a3a" }}>Sin usuario ni app · Todo por mail</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: font, weight: 400, style: "normal" }] },
  );
}
