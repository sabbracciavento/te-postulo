import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

type Size = "sm" | "md" | "lg";

/** Altura del símbolo en px; el wordmark acompaña en proporción. */
const SIZES: Record<Size, { mark: number; text: string }> = {
  sm: { mark: 28, text: "text-[17px]" },
  md: { mark: 36, text: "text-[20px] lg:text-[22px]" },
  lg: { mark: 56, text: "text-[30px]" },
};

/**
 * Lockup horizontal del kit: monograma TP a la izquierda (PNG original, sin redibujar) y wordmark "TePostulo"
 * a la derecha, separados 0,25 × la altura del símbolo. El wordmark en Manrope es el logo tipográfico provisional
 * del kit; el SVG definitivo está pendiente (vectorizar el monograma).
 */
export function Logo({ size = "md", href = "/", asLink = true, onDark = false, className = "" }:
  { size?: Size; href?: string; asLink?: boolean; onDark?: boolean; className?: string }) {
  const s = SIZES[size];
  const inner = (
    <>
      <Image
        src={onDark ? "/brand/tp-blanco.png" : "/brand/tp-circulo-96.png"}
        alt=""
        width={onDark ? Math.round(s.mark * 1.3) : s.mark}
        height={s.mark}
        className={onDark ? "h-auto" : "rounded-full"}
        priority={size === "md"}
      />
      <span className={`font-display font-extrabold tracking-[-0.03em] ${s.text} ${onDark ? "text-white" : "text-ink"}`} style={{ marginLeft: s.mark * 0.25 }}>
        {site.name}
      </span>
    </>
  );
  const cls = `inline-flex min-h-11 items-center ${className}`;
  if (!asLink) {
    return (
      <span className={cls} role="img" aria-label={site.name}>
        {inner}
      </span>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={`${site.name}, inicio`}>
      {inner}
    </Link>
  );
}
