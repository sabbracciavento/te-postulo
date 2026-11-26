import { hero } from "@/content/home";
import { site } from "@/content/site";
import { mailScenarios } from "@/content/mail";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { BanderaAR } from "@/components/ui/BanderaAR";
import { PhoneFrame } from "@/components/mail/PhoneFrame";
import { GmailDesktop } from "@/components/mail/GmailDesktop";
import { EmailSummary } from "@/components/mail/EmailSummary";
import { HeroDuoMovil } from "@/components/mail/HeroDuoMovil";

/** Banda inclinada (el trazo del TP): único gesto gráfico del hero, detrás de los dispositivos. */
function Slant({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`tp-slant pointer-events-none absolute bg-brand ${className}`} />;
}

/**
 * Hero. Escritorio y tablet: el mismo mail en los dos formatos en que llega, la ventana de Gmail de la compu atrás y el celular
 * entero adelante (proporción real), superpuesto abajo a la derecha. El hero mide lo que su contenido (tope de una pantalla).
 * Celular: la compu y el celular en una composición propia (HeroDuoMovil). Celular en horizontal con poca altura: sin dispositivos.
 */
export function Hero() {
  const scenario = mailScenarios[0];
  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      <div className="container-site flex min-h-[calc(100svh-4rem)] flex-col pt-10 max-md:pb-12 max-[359px]:pt-7 md:min-h-0 md:pb-16 md:pt-14 apaisado:min-h-0 apaisado:pb-10 apaisado:pt-6 lg:grid lg:min-h-[min(calc(100svh-73px),760px)] lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-12">
        <div className="lg:col-span-5">
          <h1 className="t-h1 max-w-[11ch] motion-safe:animate-rise max-[359px]:text-[32px] md:max-w-none apaisado:text-[30px]">{hero.title}</h1>
          <p className="t-lead mt-5 max-w-[34rem] text-slate max-[359px]:text-[16px] apaisado:mt-3 apaisado:text-[17px]">{hero.lead}</p>
          <p className="mt-7 text-[15px] font-medium apaisado:mt-4">Escribinos por WhatsApp o Instagram</p>
          <ContactButtons className="mt-3" />
          <p className="mt-4 flex items-center gap-2 text-[14px] text-slate">
            {site.area} <BanderaAR />
          </p>
        </div>

        {/* Celular (< 768): compu + celular en versión propia, entera y legible (no el escritorio achicado) */}
        <HeroDuoMovil scenario={scenario} notificacion={hero.notification.text} className="mt-10 md:hidden apaisado:hidden" />

        {/* Tablet y escritorio: compu atrás + celular entero adelante, el mismo mail */}
        <div aria-hidden="true" className="relative mt-12 hidden md:block apaisado:hidden! lg:col-span-7 lg:mt-0">
          <Slant className="-bottom-12 -top-12 left-[44%] w-[30%]" />
          {/* margen a la derecha: el celular (~216 px) tapa solo el borde derecho de la ventana, ~15–19 % de su ancho */}
          <div className="relative pb-16 pr-36 xl:pr-32">
            <GmailDesktop scenario={scenario} inboxCount={38} position={1} variante="hero" />
          </div>
          {/* el teléfono se dibuja a 360 px (su diseño real) y se muestra al 60 %: ~216 × 444 px, proporción ~2,05 */}
          <div className="absolute bottom-0 right-0" style={{ zoom: 0.6, width: 360 }}>
            <PhoneFrame notification={hero.notification} hora={scenario.hora} pantalla={720} className="w-[360px]">
              <EmailSummary scenario={scenario} compact />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
