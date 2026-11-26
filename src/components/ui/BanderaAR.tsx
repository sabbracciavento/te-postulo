/**
 * Bandera argentina en SVG (no el emoji: en Windows el emoji de bandera se ve como las letras "AR").
 * Tres franjas celeste/blanco/celeste con el sol simplificado y un borde sutil para que la franja blanca se vea sobre blanco.
 */
export function BanderaAR({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 12" width="18" height="12" role="img" aria-label="Argentina" className={`inline-block shrink-0 align-[-1px] ${className}`}>
      <rect width="18" height="4" fill="#74ACDF" />
      <rect y="4" width="18" height="4" fill="#FFFFFF" />
      <rect y="8" width="18" height="4" fill="#74ACDF" />
      <circle cx="9" cy="6" r="1.45" fill="#F6B40E" stroke="#85340A" strokeWidth="0.3" />
      <rect x="0.25" y="0.25" width="17.5" height="11.5" fill="none" stroke="#DCE3EE" strokeWidth="0.5" />
    </svg>
  );
}
