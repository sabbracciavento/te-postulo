import { site } from "@/content/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { InstagramIcon } from "./InstagramIcon";

type Props = {
  /** botones: los dos con texto (en el celular, dos columnas iguales) · iconos: dos cuadrados de 44 px · compacto: "Contacto" + dos íconos */
  variante?: "botones" | "iconos" | "compacto";
  /** oscuro: sobre fondo tinta (Instagram con contorno blanco) */
  tono?: "claro" | "oscuro";
  className?: string;
};

const ARIA = { whatsapp: "Escribinos por WhatsApp", instagram: `Escribinos por Instagram (${site.instagram.handle})` };

/**
 * Contacto del sitio: dos canales igual de válidos, WhatsApp (relleno) e Instagram (contorno), del mismo alto.
 * Sin número de WhatsApp: en producción el build ya corta (next.config.ts); en desarrollo se ve deshabilitado, sin el nombre de la variable.
 */
export function ContactButtons({ variante = "botones", tono = "claro", className = "" }: Props) {
  const wa = buildWhatsAppUrl(site.whatsapp.number, site.whatsapp.message);
  const tamaño = variante === "botones" ? "min-h-12 min-w-0 px-5 text-[16px] sm:min-w-[10.5rem]" : "h-11 w-11";
  const base = `inline-flex items-center justify-center gap-2.5 rounded-control border-2 font-sans font-semibold transition-colors duration-150 ${tamaño}`;
  const claseWa = `${base} border-action bg-action text-white hover:border-action-hover hover:bg-action-hover active:bg-action-pressed`;
  const claseIg =
    tono === "oscuro"
      ? `${base} border-white bg-transparent text-white hover:bg-white/10`
      : `${base} border-action bg-white text-action hover:bg-ice`;
  const conTexto = variante === "botones";

  const botonWa =
    wa === null ? (
      process.env.NODE_ENV === "development" ? (
        <span role="link" aria-disabled="true" title="Falta configurar el número de WhatsApp" className={`${claseWa} cursor-not-allowed opacity-60`}>
          <WhatsAppIcon className="h-5 w-5 shrink-0" />
          {conTexto ? <span>WhatsApp</span> : <span className="sr-only">{ARIA.whatsapp}</span>}
        </span>
      ) : null
    ) : (
      <a href={wa} target="_blank" rel="noopener noreferrer" aria-label={ARIA.whatsapp} className={claseWa}>
        <WhatsAppIcon className="h-5 w-5 shrink-0" />
        {conTexto && <span>WhatsApp</span>}
      </a>
    );
  const botonIg = (
    <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={ARIA.instagram} className={claseIg}>
      <InstagramIcon className="h-5 w-5 shrink-0" />
      {conTexto && <span>Instagram</span>}
    </a>
  );

  if (variante === "botones") {
    return (
      <div className={`grid grid-cols-2 gap-3 sm:flex sm:flex-wrap ${className}`}>
        {botonWa}
        {botonIg}
      </div>
    );
  }
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {variante === "compacto" && <span className="t-ui mr-1 text-slate">Contacto</span>}
      {botonWa}
      {botonIg}
    </div>
  );
}
