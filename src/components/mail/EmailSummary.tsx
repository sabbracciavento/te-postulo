import { mailFooter, mailPerson, mailSender, mailSignature, type MailBlock, type MailScenario } from "@/content/mail";

/** El cuerpo del mail tal como lo manda el servicio (HTML del resumen). Se adapta al ancho con container queries. */
export function EmailSummary({ scenario, compact = false }: { scenario: MailScenario; compact?: boolean }) {
  return (
    <div className="@container overflow-hidden rounded-xl bg-mail-bg font-mail text-mail-ink">
      <div className="bg-mail-head px-4 py-3.5 text-white @md:px-6 @md:py-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/70 @md:text-[11px]">{mailSender}</p>
        <p className="mt-1 text-[15px] font-semibold leading-snug @md:text-lg">{scenario.subject}</p>
      </div>
      <div className="bg-mail-card px-4 py-4 text-[13px] leading-normal @md:px-6 @md:py-5 @md:text-[14px]">
        <p className="m-0 text-[14px] @md:text-[15px]">Hola, {mailPerson},</p>
        <p className="mb-3.5 mt-0.5 text-mail-muted">Esto es lo que se hizo por tu búsqueda el {scenario.dateLong}.</p>

        <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 @md:grid-cols-4">
          {scenario.kpis.map((k) => (
            <li key={k.label} className="rounded-[10px] bg-mail-tile px-2 py-2.5 text-center">
              <div className="text-[22px] font-bold leading-none @md:text-[26px]">{k.n}</div>
              <div className="mt-1 text-[11px] leading-tight text-mail-muted">{k.label}</div>
            </li>
          ))}
        </ul>

        {!compact && scenario.blocks.map((b, i) => <Block key={i} block={b} />)}

        {!compact && (
          <>
            <p className="mb-0 mt-6 text-[12px] text-mail-muted">{mailFooter}</p>
            <p className="mb-0 mt-2 text-[12px] text-mail-muted">— {mailSignature}</p>
          </>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ children, accent = false, tag }: { children: React.ReactNode; accent?: boolean; tag?: string }) {
  return (
    <p
      className={`mb-2 mt-5 flex items-baseline justify-between gap-2 border-b border-mail-line pb-1.5 text-[13px] font-semibold @md:text-[14px] ${
        accent ? "text-mail-accent" : "text-mail-ink"
      }`}
    >
      <span>{children}</span>
      {tag && <span className="rounded-full bg-mail-tile px-2 py-0.5 text-[10px] font-medium text-mail-muted">{tag}</span>}
    </p>
  );
}

function Block({ block }: { block: MailBlock }) {
  if (block.kind === "rejections") {
    return (
      <>
        <SectionTitle>{block.title}</SectionTitle>
        <p className="m-0 text-mail-muted">{block.footer}</p>
      </>
    );
  }
  if (block.kind === "interview") {
    return (
      <>
        <SectionTitle accent>{block.title}</SectionTitle>
        {block.items.map((it) => (
          <p key={it.title} className="my-1.5">
            <b>{it.title}</b>
            <br />
            <span className="text-mail-muted">{it.meta}</span>
          </p>
        ))}
        <p className="my-1.5 font-semibold text-mail-accent">{block.footer}</p>
        {block.extra && <p className="my-1.5 text-mail-muted">{block.extra}</p>}
      </>
    );
  }
  if (block.kind === "needs") {
    return (
      <>
        <SectionTitle>{block.title}</SectionTitle>
        <ul className="m-0 list-none p-0">
          {block.items.map((it) => (
            <li key={it.title} className="border-b border-mail-line py-1.5 last:border-0">
              <b>{it.title}</b>
              <div className="text-[12px] text-mail-muted">{it.meta}</div>
              {it.note && <div className="mt-0.5 text-[12px]">{it.note}</div>}
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-2 text-[12px] text-mail-muted">{block.footer}</p>
      </>
    );
  }
  return (
    <>
      <SectionTitle tag={block.tag}>{block.title}</SectionTitle>
      <ul className="m-0 list-none p-0">
        {block.items.map((it) => (
          <li key={it.title} className="flex items-start justify-between gap-3 border-b border-mail-line py-1.5 last:border-0">
            <div>
              <b>{it.title}</b>
              <div className="text-[12px] text-mail-muted">{it.meta}</div>
            </div>
            <span className="shrink-0 pt-0.5 text-[11px] text-[#0b57d0] underline">ver aviso</span>
          </li>
        ))}
      </ul>
    </>
  );
}
