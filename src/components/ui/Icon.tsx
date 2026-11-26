/** Íconos planos de trazo (24 × 24). Siempre decorativos: el texto de al lado dice lo mismo. */
const paths = {
  filter: "M4 5h16l-6 7.5V19l-4 1.5v-8L4 5z",
  cv: "M7 3h7l5 5v13H7V3zm7 0v5h5M10 12h6M10 16h6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  eye: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12zm9.5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  arrow: "M5 12h14m-5-5 5 5-5 5",
  alert: "M12 8v5m0 3.5v.5M10.3 4.2 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z",
  plus: "M12 5v14M5 12h14",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={paths[name]} />
    </svg>
  );
}
