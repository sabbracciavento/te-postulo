type Props = { items: readonly string[]; className?: string };

/** Franja continua (solo CSS). La copia duplicada va con aria-hidden. */
export function Marquee({ items, className = "" }: Props) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-6 bg-tinta pr-6">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-6 whitespace-nowrap">
          <span>{t}</span>
          <span className="h-2.5 w-2.5 rounded-full bg-naranja" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`flex overflow-hidden bg-tinta ${className}`}>
      <div className="flex motion-safe:animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
