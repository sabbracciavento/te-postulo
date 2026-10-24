import { steps } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-16 bg-papel py-16 lg:scroll-mt-[72px] lg:py-24">
      <div className="container-site">
        <h2 className="text-[2rem] wide lg:text-[3.2rem]">{steps.title}</h2>

        {/* Móvil: lista vertical, número a la izquierda */}
        <ol className="mt-8 divide-y divide-tinta/25 border-y border-tinta/25 lg:hidden">
          {steps.items.map((s) => (
            <li key={s.n} className="grid grid-cols-[84px_1fr] gap-3 py-6">
              <span className="font-display text-[3rem] font-black leading-none wide text-naranja">{s.n}</span>
              <div className="pt-1">
                <h3 className="text-[1.3rem] leading-tight">{s.title}</h3>
                <p className="mt-1.5 text-[15.5px] text-tinta-2">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Escritorio: 3 columnas unidas por una línea trazada con el scroll */}
        <div className="relative mt-12 hidden lg:block">
          <svg className="trace-line absolute inset-x-0 top-[46px] h-6 w-full" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 12 C 200 2, 400 22, 600 12 S 1000 2, 1200 12" fill="none" stroke="var(--color-naranja)" strokeWidth="4" strokeLinecap="round" pathLength="1" />
          </svg>
          <ol className="grid grid-cols-3 gap-12">
            {steps.items.map((s, i) => (
              <li key={s.n} className="relative">
                <Reveal delay={i * 0.08}>
                  <span className="relative z-10 inline-block bg-papel pr-4 font-display text-[5.5rem] font-black leading-none wide text-naranja">{s.n}</span>
                  <h3 className="mt-4 max-w-[16ch] text-[1.6rem] leading-tight">{s.title}</h3>
                  <p className="mt-2 max-w-[30ch] text-tinta-2">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
