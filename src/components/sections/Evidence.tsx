import Image from "next/image";
import { evidence } from "@/content/home";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

/**
 * Un caso real: el testimonio de la persona (foto circular, sus palabras tal como las publicó) y las cifras verificadas, con la
 * entrevista como cifra principal. Escritorio y tablet (≥ 768 px): banda cobalto de borde a borde, testimonio a la izquierda y
 * cifras a la derecha. Celular: tarjeta con el degradé del kit y todo apilado (persona → cita → cifras).
 * Las cifras nunca van sin su pie (período, perfil, no garantizado).
 */
export function Evidence() {
  const { persona, metrics } = evidence;
  const [principal, ...resto] = metrics;
  return (
    <section
      className="on-dark relative overflow-hidden bg-white py-10 md:bg-brand md:py-16 md:text-white lg:py-24"
      aria-labelledby="evidencia-titulo"
    >
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[20px] bg-[#1E40D8] bg-[linear-gradient(135deg,#4268F5_0%,#1E40D8_50%,#14289E_100%)] px-6 py-10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] md:static md:overflow-visible md:rounded-none md:bg-none md:bg-transparent md:p-0 md:shadow-none">
          {/* gesto: un trazo inclinado del TP asomando por la derecha */}
          <span
            aria-hidden="true"
            className="tp-slant pointer-events-none absolute -right-16 -top-10 bottom-[-40px] w-36 bg-white/[0.07] md:w-40 md:bg-white/[0.06] lg:right-10 lg:w-56"
          />
          <div className="relative">
            <p className="kicker text-white/80">{evidence.kicker}</p>
            <h2 id="evidencia-titulo" className="t-h2 mt-2">{evidence.title}</h2>

            <div className="mt-8 grid gap-10 md:mt-10 lg:mt-14 lg:grid-cols-12 lg:gap-14">
              {/* el testimonio, con sus palabras */}
              <figure className="m-0 lg:col-span-7">
                <figcaption className="flex items-center gap-4">
                  <Image
                    src={persona.foto}
                    alt={`Foto de ${persona.nombre}`}
                    width={72}
                    height={72}
                    className="h-16 w-16 shrink-0 rounded-full object-cover ring-[3px] ring-white/90 ring-offset-2 ring-offset-[#1E40D8] md:h-[72px] md:w-[72px] md:ring-offset-brand"
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-[19px] font-extrabold leading-tight">{persona.nombre}</span>
                    <span className="block text-[15px] text-white/85">{persona.perfil}</span>
                    <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-white/[0.12] px-2.5 py-1 text-[13px] font-medium text-white/90">
                      <InstagramIcon className="h-3.5 w-3.5" />
                      {persona.fuente}
                    </span>
                  </span>
                </figcaption>

                <blockquote className="relative m-0 mt-7 lg:mt-9">
                  <span aria-hidden="true" className="pointer-events-none absolute -left-1 -top-9 font-display text-[88px] font-extrabold leading-none text-white/25 md:-left-2 md:-top-12 md:text-[120px]">
                    “
                  </span>
                  <p className="relative m-0 font-display text-[23px] font-bold leading-[1.3] tracking-[-0.02em] md:text-[28px] lg:text-[32px]">
                    {evidence.quote}
                  </p>
                  <p className="relative m-0 mt-4 text-[17px] leading-relaxed text-white/85 lg:text-[18px]">{evidence.quote2}</p>
                </blockquote>
              </figure>

              {/* las cifras verificadas: la entrevista primero y más grande */}
              <div className="lg:col-span-5 lg:border-l lg:border-white/25 lg:pl-12">
                <dl className="m-0">
                  <div className="flex flex-col-reverse">
                    <dt className="mt-1 text-[18px] font-medium text-white/90 lg:text-[20px]">{principal.label}</dt>
                    <dd className="m-0 font-display text-[88px] font-extrabold leading-[0.9] tracking-[-0.04em] lg:text-[120px]">{principal.value}</dd>
                  </div>
                  <div className="mt-7 grid grid-cols-2 gap-6 border-t border-white/25 pt-6">
                    {resto.map((m) => (
                      <div key={m.label} className="flex flex-col-reverse justify-end">
                        <dt className="mt-1 text-[15px] leading-snug text-white/85">{m.label}</dt>
                        <dd className="m-0 font-display text-[36px] font-extrabold leading-none tracking-[-0.03em] lg:text-[44px]">{m.value}</dd>
                      </div>
                    ))}
                  </div>
                </dl>
                <p className="mt-7 text-[14px] leading-relaxed text-white/80">{evidence.note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
