import { hero } from "@/content/home";
import { site } from "@/content/site";
import { mailScenarios } from "@/content/mail";
import { Kicker } from "@/components/ui/Tag";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { PhoneFrame } from "@/components/mail/PhoneFrame";
import { GmailMobile } from "@/components/mail/GmailMobile";

export function Hero() {
  const scenario = mailScenarios[0];
  return (
    <section id="hero" className="relative overflow-hidden bg-papel">
      <div className="container-site flex min-h-[calc(100svh-4rem)] flex-col pt-8 lg:grid lg:min-h-0 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-0 lg:pt-16">
        <div className="lg:col-span-8 lg:pb-24">
          <Kicker>{hero.kicker}</Kicker>
          <h1 className="mt-4 text-[2.65rem] wide motion-safe:animate-rise lg:text-[clamp(3.6rem,4.7vw,4.8rem)]">
            {hero.title.map((line, i) => (
              <span key={line} className={i === hero.title.length - 1 ? "block text-naranja" : "block"}>
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 hidden max-w-[36rem] text-lg text-tinta-2 lg:block lg:text-xl">{hero.lead}</p>
          <div className="mt-7 flex flex-col items-start gap-3 lg:mt-9 lg:flex-row lg:items-center lg:gap-6">
            <WhatsAppButton size="lg" className="w-full lg:w-auto" />
            <p className="text-sm text-tinta-2">{site.hours}</p>
          </div>
        </div>

        {/* Móvil: teléfono cortado por el borde inferior de la pantalla */}
        <div className="mt-auto h-[340px] overflow-hidden pt-10 lg:hidden" aria-hidden="true">
          <PhoneFrame notification={hero.notification} cropped>
            <GmailMobile scenario={scenario} compact />
          </PhoneFrame>
        </div>

        {/* Escritorio: teléfono rotado, asoma por el borde inferior de la sección */}
        <div className="relative hidden lg:col-span-4 lg:block lg:self-end">
          <div className="max-h-[600px] origin-top translate-y-6 -rotate-3 overflow-hidden rounded-t-[2.4rem] motion-safe:animate-rise [animation-delay:120ms]">
            <PhoneFrame notification={hero.notification}>
              <GmailMobile scenario={scenario} />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
