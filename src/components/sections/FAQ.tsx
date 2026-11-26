import { faq } from "@/content/home";
import { Icon } from "@/components/ui/Icon";

/** Accordion del kit con <details>: accesible por teclado y lector de pantalla sin JS. */
function Item({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-line">
      <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-left lg:min-h-[84px] xl:min-h-14 font-display text-[18px] font-bold leading-snug tracking-[-0.02em] lg:text-[19px]">
        <span>{q}</span>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ice text-brand transition-transform duration-200 group-open:rotate-45">
          <Icon name="plus" className="h-4 w-4" />
        </span>
      </summary>
      <p className="pb-5 pr-12 text-slate max-md:pr-0">{a}</p>
    </details>
  );
}

export function FAQ() {
  // Dos columnas independientes en escritorio: abrir una pregunta no mueve la de al lado.
  const half = Math.ceil(faq.items.length / 2);
  const cols = [faq.items.slice(0, half), faq.items.slice(half)];
  return (
    <section id="preguntas" className="scroll-mt-16 bg-white py-16 lg:scroll-mt-[73px] lg:py-24">
      <div className="container-site">
        <h2 className="t-h2">{faq.title}</h2>
        <div className="mt-6 border-t border-line lg:mt-10 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 lg:border-0">
          {cols.map((items, i) => (
            <div key={i} className="lg:border-t lg:border-line">
              {items.map((it) => (
                <Item key={it.q} q={it.q} a={it.a} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
