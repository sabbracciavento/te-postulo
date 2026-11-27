/**
 * Wordmark "TePostulo": Plus Jakarta Sans ExtraBold itálica, "Te" plano y "Postulo" con degradé (clases `.wordmark` en
 * globals.css y tokens --tp-wordmark-* en tokens.css). `oscuro` para fondos azules u oscuros. El tamaño lo da quien lo usa.
 */
export function Wordmark({ oscuro = false, className = "" }: { oscuro?: boolean; className?: string }) {
  return (
    <span className={`wordmark ${oscuro ? "wordmark-oscuro" : ""} ${className}`}>
      Te<span>Postulo</span>
    </span>
  );
}
