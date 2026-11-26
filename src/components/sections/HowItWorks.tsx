import { steps } from "@/content/home";
import { Icon } from "@/components/ui/Icon";

/** Número del paso con la barra inclinada del TP (único gesto de la sección). */
function StepNumber({ n }: { n: number }) {
  return (
    <span className="flex items-center gap-2.5 font-display text-[15px] font-extrabold text-brand" aria-hidden="true">
      <span className="tp-slant ml-1 inline-block h-6 w-2 bg-brand" />
      {String(n).padStart(2, "0")}
    </span>
  );
}

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-16 bg-white py-16 lg:scroll-mt-[73px] lg:py-24">
      <div className="container-site">
        <h2 className="t-h2">{steps.title}</h2>

        {/* Móvil: lista vertical unida por una línea */}
        <ol className="mt-8 border-l-2 border-line pl-6 lg:hidden">
          {steps.items.map((s, i) => (
            <li key={s.title} className="relative pb-8 last:pb-0">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-brand" aria-hidden="true" />
              <StepNumber n={i + 1} />
              <h3 className="t-h3 mt-2">{s.title}</h3>
              <p className="mt-1 text-slate">{s.text}</p>
            </li>
          ))}
        </ol>

        {/* Escritorio: cuatro columnas con regla superior */}
        <ol className="mt-12 hidden grid-cols-4 gap-8 lg:grid">
          {steps.items.map((s, i) => (
            <li key={s.title} className="border-t-2 border-ink pt-6">
              <StepNumber n={i + 1} />
              <h3 className="t-h3 mt-4 lg:min-h-[2.6em] xl:min-h-0">{s.title}</h3>
              <p className="mt-2 text-slate">{s.text}</p>
            </li>
          ))}
        </ol>

        {/* lo que pedimos para empezar (lista cerrada del producto) */}
        <div className="mt-10 rounded-panel bg-ice p-6 lg:mt-14 lg:flex lg:items-start lg:gap-10 lg:p-8">
          <h3 className="t-h3 lg:w-56 lg:shrink-0">{steps.pedimos.title}</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:flex-1 lg:grid-cols-4 lg:gap-6">
            {steps.pedimos.items.map((t) => (
              <li key={t} className="flex gap-2.5 lg:flex-col lg:gap-2">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
