import { site } from "@/content/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Props = {
  /** primary: azul acción · light: blanco sobre fondos oscuros · icon: solo ícono (header móvil) */
  variant?: "primary" | "light" | "icon";
  className?: string;
  label?: string;
};

const base =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-control font-sans text-[16px] font-semibold transition-colors duration-150";

const variants = {
  primary: "bg-action px-6 text-white hover:bg-action-hover active:bg-action-pressed",
  light: "bg-white px-6 text-brand hover:bg-ice active:bg-ice",
  icon: "h-12 w-12 bg-action text-white hover:bg-action-hover active:bg-action-pressed",
};

/**
 * CTA único del sitio (kit: "Escribinos por WhatsApp"). Sin número configurado no hay link roto ni éxito
 * simulado: se muestra el bloqueo de lanzamiento (falta NEXT_PUBLIC_WHATSAPP_NUMBER).
 */
export function WhatsAppButton({ variant = "primary", className = "", label }: Props) {
  const url = buildWhatsAppUrl(site.whatsapp.number, site.whatsapp.message);
  const text = label ?? site.whatsapp.label;
  const content = (
    <>
      <WhatsAppIcon className={variant === "icon" ? "h-6 w-6" : "h-5 w-5 shrink-0"} />
      {variant === "icon" ? <span className="sr-only">{text}</span> : <span>{text}</span>}
    </>
  );
  if (url === null) {
    // en producción el build ya corta si falta el número (next.config.ts); acá solo se avisa en desarrollo
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <span
        role="link"
        aria-disabled="true"
        title="Falta configurar el número de WhatsApp"
        className={`${base} ${variants[variant]} cursor-not-allowed opacity-60 ${className}`}
      >
        {content}
      </span>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]} ${className}`}>
      {content}
    </a>
  );
}
