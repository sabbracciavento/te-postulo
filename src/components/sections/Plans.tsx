import { plans } from "@/content/home";
import { Icon } from "@/components/ui/Icon";

/** PlanComparison del kit: sin precios, cuotas ni mínimos. */
export function Plans() {
  const { base, plus } = plans;
  return (
    <section id="planes" className="scroll-mt-16 bg-white py-16 lg:scroll-mt-[73px] lg:py-24">
      <div className="container-site">
        <h2 className="t-h2">{plans.title}</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-12 lg:gap-6">
          <article className="rounded-panel border border-line p-6 lg:p-10">
            <p className="kicker text-slate">{base.tag}</p>
            <h3 className="t-h3 mt-2">{base.title}</h3>
            <ul className="mt-6 space-y-3">
              {base.items.map((t) => (
                <li key={t} className="flex gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="flex flex-col rounded-panel border-2 border-brand p-6 lg:p-10">
            <p className="kicker text-brand">{plus.tag}</p>
            <h3 className="t-h3 mt-2">{plus.title}</h3>
            {/* misma lista que el Base: lo que suma el Plus, con check en azul de marca */}
            <ul className="mt-6 space-y-3">
              {plus.items.map((t) => (
                <li key={t} className="flex gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            {/* el precio, al pie de la tarjeta (las dos tarjetas tienen el mismo alto) */}
            <p className="mt-auto border-t border-line pt-5 text-[15px] text-slate max-md:mt-8">{plans.footer}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
