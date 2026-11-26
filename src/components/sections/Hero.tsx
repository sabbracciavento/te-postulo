import { hero } from "@/content/home";
import { site } from "@/content/site";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { BanderaAR } from "@/components/ui/BanderaAR";
import { HeroDispositivos } from "@/components/mail/HeroDispositivos";

/**
 * Hero. Escritorio y tablet: la ventana de Gmail de la compu atrás y el celular entero adelante (proporción real), superpuesto
 * abajo a la derecha, mostrando en secuencia los tres tipos de mail (HeroDispositivos). El hero mide lo que su contenido (tope de una pantalla).
 * Celular: la compu y el celular en una composición propia (HeroDuoMovil). Celular en horizontal con poca altura: sin dispositivos.
 */
export function Hero() {
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

        <HeroDispositivos />
      </div>
    </section>
  );
}
