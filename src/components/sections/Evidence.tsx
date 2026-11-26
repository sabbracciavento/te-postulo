import { evidence } from "@/content/home";

/**
 * MetricGrid + EvidenceNote del kit. Las cifras nunca van sin su pie (período, perfil, no garantizado).
 * Escritorio y tablet (≥ 768 px): banda cobalto de borde a borde. Móvil (≤ 767 px): tarjeta con degradé suave y aire alrededor,
 * como la entrevista del mail (el cobalto plano de borde a borde se veía duro en el celular). Una sola estructura: en ≥ 768 la
 * tarjeta no tiene fondo ni padding y el trazo se posiciona contra la sección, igual que antes.
 */
export function Evidence() {
  return (
    <section
      className="on-dark relative overflow-hidden bg-white py-10 md:bg-brand md:py-16 md:text-white lg:py-24"
      aria-labelledby="evidencia-titulo"
    >
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[20px] bg-[#1E40D8] bg-[linear-gradient(135deg,#3358F0_0%,#1E40D8_55%,#1530C8_100%)] px-6 py-10 text-white md:static md:overflow-visible md:rounded-none md:bg-none md:bg-transparent md:p-0">
          {/* gesto: un trazo inclinado del TP asomando por la derecha */}
          <span
            aria-hidden="true"
            className="tp-slant pointer-events-none absolute -right-16 -top-10 bottom-[-40px] w-36 bg-white/[0.07] md:w-40 md:bg-white/[0.06] lg:right-10 lg:w-56"
          />
          <div className="relative">
            <h2 id="evidencia-titulo" className="t-h2">{evidence.title}</h2>
            <dl className="mt-8 grid gap-7 md:mt-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/25 lg:mt-14">
              {evidence.metrics.map((m) => (
                <div key={m.label} className="flex flex-col-reverse md:px-6 md:first:pl-0 lg:px-10">
                  <dt className="mt-1 text-[17px] text-white/90 md:text-white/85 lg:text-[18px]">{m.label}</dt>
                  <dd className="font-display text-[52px] font-extrabold leading-none tracking-[-0.03em] md:text-[56px] lg:text-[80px]">{m.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 max-w-[44rem] border-t border-[#6A86F4] pt-5 text-[14px] leading-relaxed text-white/90 md:mt-10 md:border-white/25 md:text-white/85 lg:mt-14">
              {evidence.perfil} · {evidence.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
