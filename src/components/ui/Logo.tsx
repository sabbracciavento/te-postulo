import Link from "next/link";
import { site } from "@/content/site";
import { LOGO_RATIO, LOGO_VIEWBOX, SQUARE, TE_PATHS, TILE_VIEWBOX, WORD_PATHS } from "./logo-geometry";

type Size = "sm" | "md" | "lg" | "xl";

/** Ancho del lockup en px (el alto sale de la proporción fija). */
const WIDTHS: Record<Size, { base: number; lg: number }> = {
  sm: { base: 150, lg: 150 },
  md: { base: 172, lg: 190 },
  lg: { base: 300, lg: 400 },
  xl: { base: 420, lg: 720 },
};

/**
 * Logo "Te Postulo" como un solo SVG con las letras en trazados (Archivo Black Expanded):
 * no depende de la carga de la fuente web, no cambia con el zoom ni el sistema, y la geometría
 * (cuadrado dimensionado desde la tinta, misma altura de letra y misma línea de base) es la misma
 * en header, footer, favicon e imagen para redes. Ver logo-geometry.ts.
 */
export function Logo({ size = "md", href = "/", className = "", asLink = true, onDark = false }:
  { size?: Size; href?: string; className?: string; asLink?: boolean; onDark?: boolean }) {
  const w = WIDTHS[size];
  const style = { "--logo-w": `${w.base}px`, "--logo-w-lg": `${w.lg}px`, "--logo-ratio": LOGO_RATIO } as React.CSSProperties;
  const inner = (
    <svg viewBox={LOGO_VIEWBOX} className="logo-svg" role="img" aria-label={site.name}>
      <rect className="logo-tile" x={SQUARE.x} y={SQUARE.y} width={SQUARE.s} height={SQUARE.s} rx={SQUARE.r} fill="var(--color-naranja)" />
      <g fill="var(--color-tinta)">
        {TE_PATHS.map((d, i) => (
          <path key={`t${i}`} d={d} />
        ))}
      </g>
      <g fill={onDark ? "var(--color-papel)" : "var(--color-tinta)"}>
        {WORD_PATHS.map((d, i) => (
          <path key={`w${i}`} d={d} />
        ))}
      </g>
    </svg>
  );
  const cls = `logo ${className}`.trim();
  if (!asLink) {
    return (
      <span className={cls} style={style}>
        {inner}
      </span>
    );
  }
  return (
    <Link href={href} className={cls} style={style} aria-label={`${site.name}, inicio`}>
      {inner}
    </Link>
  );
}

/** Solo el cuadrado con "Te" (para favicon, avatar o sello). */
export function TeTile({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg viewBox={TILE_VIEWBOX} width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <rect x={SQUARE.x} y={SQUARE.y} width={SQUARE.s} height={SQUARE.s} rx={SQUARE.r} fill="var(--color-naranja)" />
      <g fill="var(--color-tinta)">
        {TE_PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}
