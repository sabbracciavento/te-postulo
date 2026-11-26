import { hero } from "@/content/home";
import { site } from "@/content/site";
import { mailScenarios } from "@/content/mail";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { PhoneFrame } from "@/components/mail/PhoneFrame";
import { GmailMobile } from "@/components/mail/GmailMobile";

/** Banda inclinada (el trazo del TP): único gesto gráfico del hero, detrás del teléfono. */
function Slant({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`tp-slant pointer-events-none absolute bg-brand ${className}`} />;
}

/**
 * Hero de una pantalla. Escritorio (≥ 1024): alto de la ventana menos el encabezado (73 px), con tope de 860; el texto centrado
 * en vertical y el teléfono recortado contra el borde inferior, así el botón entra siempre en la primera pantalla.
 * Tablet: sin el alto de pantalla (no queda hueco). Celular en horizontal con poca altura: compacto y sin teléfono.
 */
export function Hero() {
  const scenario = mailScenarios[0];
  const phone = (
    <PhoneFrame notification={hero.notification} hora={scenario.hora} cropped>
      <GmailMobile scenario={scenario} compact hoy />
    </PhoneFrame>
  );
  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      <div className="container-site flex min-h-[calc(100svh-4rem)] flex-col pt-10 max-[359px]:pt-7 md:min-h-0 apaisado:min-h-0 apaisado:pb-10 apaisado:pt-6 lg:grid lg:min-h-[min(calc(100svh-73px),860px)] lg:grid-cols-12 lg:items-stretch lg:gap-12 lg:py-0">
        <div className="lg:col-span-7 lg:self-center lg:py-16">
          <h1 className="t-h1 max-w-[11ch] motion-safe:animate-rise max-[359px]:text-[32px] md:max-w-none apaisado:text-[30px]">{hero.title}</h1>
          <p className="t-lead mt-5 max-w-[34rem] text-slate max-[359px]:text-[16px] apaisado:mt-3 apaisado:text-[17px]">{hero.lead}</p>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:gap-6 apaisado:mt-5">
            <WhatsAppButton className="w-full md:w-auto md:shrink-0 md:whitespace-nowrap" />
            <p className="text-[14px] leading-snug text-slate">
              <span className="block">{site.area}</span>
              {site.hours}
            </p>
          </div>
        </div>

        {/* Celular y tablet: el teléfono asoma desde abajo, cortado por el borde */}
        <div className="relative -mx-6 mt-auto h-[300px] overflow-hidden px-6 pt-12 max-[359px]:h-[220px] md:mt-12 md:h-[360px] apaisado:hidden lg:hidden">
          <Slant className="bottom-0 left-[58%] top-6 w-[34%]" />
          <div className="relative">{phone}</div>
        </div>

        {/* Escritorio: el teléfono sobre la banda, recortado contra el borde inferior del hero */}
        <div className="relative hidden lg:col-span-5 lg:block lg:h-[min(calc(100svh-73px),860px)] lg:overflow-hidden lg:pt-12">
          <Slant className="-bottom-24 -top-24 left-[46%] w-[38%]" />
          <div className="relative motion-safe:animate-rise [animation-delay:120ms]">{phone}</div>
        </div>
      </div>
    </section>
  );
}
