import { plans } from "@/content/home";
import { Tag } from "@/components/ui/Tag";
import { Seal } from "@/components/ui/Seal";

function PlanCard({ plan }: { plan: (typeof plans.items)[number] }) {
  return (
    <article className="flex h-full flex-col border-2 border-tinta bg-papel p-6 lg:p-9">
      <Tag tone={plan.accent ? "naranja" : "tinta"}>{plan.tag}</Tag>
      <h3 className="mt-4 text-2xl lg:text-[2rem]">{plan.title}</h3>
      <ul className="mt-5 space-y-3">
        {plan.items.map((t) => (
          <li key={t} className="flex gap-3 text-[16px] leading-snug lg:text-lg">
            <span className="mt-[0.5em] h-2.5 w-2.5 shrink-0 bg-tinta" aria-hidden="true" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
      {"highlight" in plan && plan.highlight && (
        <div className="mt-6 border-t-2 border-tinta pt-5">
          <p className="font-display text-[1.7rem] font-black leading-none wide text-naranja lg:text-[2.2rem]">{plan.highlight}</p>
          <p className="mt-3 text-[16px] leading-snug lg:text-lg">{plan.highlightText}</p>
        </div>
      )}
    </article>
  );
}

export function Plans() {
  return (
    <section id="planes" className="scroll-mt-16 bg-papel py-16 lg:scroll-mt-[72px] lg:py-24">
      <div className="container-site">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="kicker text-azul">{plans.kicker}</p>
            <h2 className="mt-3 text-[2rem] wide lg:text-[3.2rem]">{plans.title}</h2>
          </div>
          <Seal text="Postulación verificada · Buenos Aires · " className="hidden h-28 w-28 shrink-0 text-tinta lg:block" spin />
        </div>

        {/* Móvil: carrusel con la segunda ficha asomando */}
        <div className="no-scrollbar snap-row -mx-5 mt-8 px-5 lg:hidden">
          {plans.items.map((p) => (
            <div key={p.tag} className="w-[86%]">
              <PlanCard plan={p} />
            </div>
          ))}
        </div>

        {/* Escritorio: lado a lado */}
        <div className="mt-10 hidden grid-cols-2 gap-8 lg:grid">
          {plans.items.map((p) => (
            <PlanCard key={p.tag} plan={p} />
          ))}
        </div>

        <p className="mt-8 text-center text-[15px] text-tinta-2 lg:text-lg">{plans.footer}</p>
      </div>
    </section>
  );
}
