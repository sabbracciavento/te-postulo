import { faq } from "@/content/home";

function Item({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-tinta/30">
      <summary className="flex cursor-pointer items-start justify-between gap-4 py-4 text-left font-display text-[1.15rem] font-bold leading-tight tracking-tight lg:text-[1.3rem]">
        <span>{q}</span>
        <span className="mt-0.5 shrink-0 text-naranja transition-transform duration-200 group-open:rotate-45" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </summary>
      <p className="pb-5 pr-10 text-tinta-2">{a}</p>
    </details>
  );
}

export function FAQ() {
  // Dos columnas independientes en escritorio: abrir una pregunta no mueve la de al lado.
  const half = Math.ceil(faq.items.length / 2);
  const cols = [faq.items.slice(0, half), faq.items.slice(half)];
  return (
    <section id="preguntas" className="scroll-mt-16 bg-papel py-16 lg:scroll-mt-[72px] lg:py-28">
      <div className="container-site">
        <h2 className="text-[2rem] wide lg:text-[3.4rem]">{faq.title}</h2>
        <div className="mt-6 lg:mt-10 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          {cols.map((items, i) => (
            <div key={i}>
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
