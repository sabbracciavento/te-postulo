import { mailBrand, mailFooter, mailPerson, type MailAction, type MailItem, type MailScenario } from "@/content/mail";

/**
 * El cuerpo del mail tal como lo manda el servicio. Misma estructura y mismos colores que el HTML real
 * (papel, tinta, naranja; logo "Te" como cuadrado). Se adapta al ancho con container queries.
 */
export function EmailSummary({ scenario, compact = false }: { scenario: MailScenario; compact?: boolean }) {
  return (
    <div className="@container bg-papel-2 font-mail text-tinta">
      <div className="flex items-center justify-between px-3 pb-3 pt-3 @md:px-4">
        <p className="m-0 flex items-center gap-2 font-display font-black">
          <span className="grid size-7 place-items-center rounded-[7px] bg-naranja text-[12px] text-tinta @md:size-8 @md:text-[13px]">{mailBrand.te}</span>
          <span className="text-[16px] @md:text-[18px]">{mailBrand.word}</span>
        </p>
        <p className="m-0 text-[11px] text-tinta-2">
          {mailBrand.kicker} · {scenario.dateShort}
        </p>
      </div>

      <div className="rounded-xl bg-white px-4 py-4 text-[13px] leading-normal @md:px-6 @md:py-6 @md:text-[14px]">
        <p className="m-0 text-[12.5px] text-tinta-2 @md:text-[13.5px]">
          Hola {mailPerson}, este es tu resumen del {scenario.dateLong}.
        </p>
        <p className="mb-1.5 mt-1 font-display text-[20px] font-black leading-tight tracking-tight @md:text-[25px]">{scenario.headline}</p>
        <p className="mb-4 mt-0 text-[13.5px] text-tinta-2 @md:text-[15px]">{scenario.importante}</p>

        {scenario.paraVos.length > 0 && <ParaVos items={scenario.paraVos} />}

        <ul className="m-0 mt-5 grid list-none grid-cols-3 gap-2 p-0">
          {scenario.kpis.map((k) => (
            <li key={k.label} className="rounded-[10px] bg-papel px-1.5 py-3 text-center">
              <div className="font-display text-[24px] font-black leading-none @md:text-[30px]">{k.n}</div>
              <div className="mt-1.5 text-[10.5px] leading-tight text-tinta-2 @md:text-[11.5px]">{k.label}</div>
            </li>
          ))}
        </ul>

        {!compact && (
          <>
            <Kicker>Postulaciones de hoy · {scenario.hoy.length + (scenario.masHoy ?? 0)}</Kicker>
            <Lista items={scenario.hoy} />
            {scenario.masHoy ? <p className="mb-0 mt-2 text-[12px] text-tinta-2">… y {scenario.masHoy} más. Todas quedaron registradas y se siguen igual.</p> : null}

            {scenario.mails && scenario.mails.length > 0 && (
              <>
                <Kicker>Mails enviados con tu CV · {scenario.mails.length}</Kicker>
                <Lista items={scenario.mails} />
              </>
            )}

            {scenario.movimientos.length > 0 && (
              <>
                <Kicker verde>Movimientos de empresas</Kicker>
                {scenario.movimientos.map((m) => (
                  <p key={m} className="mb-1.5 mt-0">
                    {m}
                  </p>
                ))}
              </>
            )}

            <p className="mb-0 mt-6 border-t border-papel-2 pt-3 text-[12px] leading-relaxed text-tinta-2">
              {scenario.totales}
              <br />
              {scenario.operativo}
            </p>
          </>
        )}
      </div>

      {!compact && (
        <p className="m-0 px-3 py-3 text-center text-[11.5px] leading-relaxed text-tinta-2">
          {mailFooter[0]}
          <br />
          {mailFooter[1]}
        </p>
      )}
    </div>
  );
}

function Kicker({ children, verde = false }: { children: React.ReactNode; verde?: boolean }) {
  return <p className={`mb-2 mt-6 text-[10.5px] font-bold uppercase tracking-[0.14em] ${verde ? "text-verde" : "text-tinta-2"}`}>{children}</p>;
}

function Lista({ items }: { items: MailItem[] }) {
  return (
    <ul className="m-0 list-none p-0">
      {items.map((it) => (
        <li key={it.title + it.meta} className="flex items-start justify-between gap-3 border-b border-papel-2 py-2 last:border-0">
          <div>
            <b>{it.title}</b>
            <div className="text-[12px] text-tinta-2">{it.meta}</div>
          </div>
          {it.portal && <span className="mt-0.5 shrink-0 rounded-full bg-papel px-2 py-0.5 text-[10.5px] text-tinta-2">{it.portal}</span>}
        </li>
      ))}
    </ul>
  );
}

function ParaVos({ items }: { items: MailAction[] }) {
  return (
    <div className="border-l-4 border-naranja pl-3.5 @md:pl-4">
      <p className="m-0 text-[10.5px] font-bold uppercase tracking-[0.14em] text-naranja">Para vos · {items.length}</p>
      <ul className="m-0 list-none p-0">
        {items.map((it) => (
          <li key={it.title} className="border-b border-papel-2 py-3 last:border-0">
            <div className="text-[14px] font-bold leading-snug">{it.title}</div>
            <div className="mt-0.5 text-[12px] text-tinta-2">{it.meta}</div>
            <div className="mt-1.5 text-[13px]">{it.action}</div>
            {it.button && <span className="mt-2 inline-block rounded-[7px] bg-tinta px-3 py-2 text-[12px] font-bold text-papel">{it.button}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
