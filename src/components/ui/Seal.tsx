type Props = { text: string; className?: string; spin?: boolean };

export function Seal({ text, className = "", spin = false }: Props) {
  const ring = text.toUpperCase();
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className} ${spin ? "motion-safe:animate-spin-slow" : ""}`}
      role="img"
      aria-label={text.replace(/ · $/, "")}
    >
      <defs>
        <path id="seal-ring" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="100" cy="100" r="52" fill="none" stroke="currentColor" strokeWidth="3" />
      <text fontSize="14" fontWeight="700" letterSpacing="2.2" fill="currentColor" fontFamily="var(--font-sans)">
        <textPath href="#seal-ring">{ring}</textPath>
      </text>
      <text x="100" y="112" textAnchor="middle" fontSize="38" fontWeight="900" fill="currentColor" fontFamily="var(--font-display)">
        TP
      </text>
    </svg>
  );
}
